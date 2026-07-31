/* ============================================================
   ACCÈS AU MODÈLE DE LANGAGE — OpenRouter, appel direct
   ------------------------------------------------------------
   Le navigateur interroge lui-même l'API : aucun serveur, aucune
   session à ouvrir. La clé est restreinte côté OpenRouter au seul
   modèle gratuit openai/gpt-oss-120b.

   Une précision qui compte pour l'honnêteté du chapitre :
   ce modèle n'expose PAS ses log-probabilités via l'API. Les
   probabilités affichées sont donc celles que le modèle
   *déclare*, pas celles qu'il calcule réellement. C'est une
   estimation introspective, à prendre pour ce qu'elle est — nos
   propres chiffres, eux, sont mesurés. L'interface le signale.
   ============================================================ */

export const LLM = {
  key: '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',
  model: 'openai/gpt-oss-120b',
  endpoint: 'https://openrouter.ai/api/v1/chat/completions',
  label: 'gpt-oss 120B'
};

/* gpt-oss est un modèle à raisonnement : la réflexion ne peut pas être
   désactivée, on la réduit au minimum et on prévoit assez de jetons. */
const SCHEMA = {
  type: 'json_schema',
  json_schema: {
    name: 'prediction',
    strict: true,
    schema: {
      type: 'object',
      properties: {
        mots: {
          type: 'array',
          items: {
            type: 'object',
            properties: { mot: { type: 'string' }, p: { type: 'number' } },
            required: ['mot', 'p'],
            additionalProperties: false
          }
        }
      },
      required: ['mots'],
      additionalProperties: false
    }
  }
};

/**
 * Demande au modèle les mots les plus probables pour continuer un texte.
 * @param {string} text      le texte à continuer
 * @param {string} langName  nom de la langue, pour cadrer la réponse
 * @param {number} k         nombre de candidats souhaités
 * @returns {Promise<{items, provider, ms, reasoningTokens, model}>}
 */
export async function predictWords(text, langName = 'français', k = 6) {
  const t0 = performance.now();

  const res = await fetch(LLM.endpoint, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + LLM.key,
      'Content-Type': 'application/json',
      'HTTP-Referer': location.origin,
      'X-Title': 'Entropia'
    },
    body: JSON.stringify({
      model: LLM.model,
      messages: [
        { role: 'system', content: 'Tu es un modèle de prédiction du mot suivant. Tu réponds uniquement en JSON, sans commentaire.' },
        { role: 'user', content:
`Texte en ${langName} à continuer :
"""${text.trim()}"""

Donne les ${k} mots les plus probables pour continuer IMMÉDIATEMENT ce texte, avec la probabilité que tu attribues à chacun.
Contraintes : un seul mot par entrée, ${k} mots TOUS DIFFÉRENTS (pas de variantes d'un même mot ni de groupes nominaux), pas de ponctuation, probabilités décroissantes qui somment à 1.` }
      ],
      max_tokens: 800,
      temperature: 0,
      reasoning: { effort: 'low' },
      response_format: SCHEMA,
      provider: { require_parameters: true }
    })
  });

  if (!res.ok) {
    let detail = '';
    try { detail = (await res.json()).error?.message || ''; } catch { /* corps illisible */ }
    throw new Error(`OpenRouter a répondu ${res.status}${detail ? ' — ' + detail : ''}`);
  }

  const data = await res.json();
  const choice = data.choices && data.choices[0];
  const content = choice && choice.message && choice.message.content;
  if (!content) throw new Error('Réponse vide (le modèle a épuisé ses jetons en raisonnement).');

  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch {
    const m = content.match(/\{[\s\S]*\}/);
    if (!m) throw new Error('Réponse illisible du modèle.');
    parsed = JSON.parse(m[0]);
  }

  // Le modèle répond parfois par un groupe (« four à pain ») : on ne garde
  // que le premier mot et l'on additionne les probabilités des réponses qui
  // commencent pareil — P(mot) est bien la somme des suites qui débutent ainsi.
  const merged = new Map();
  for (const x of parsed.mots || []) {
    if (!x || typeof x.mot !== 'string') continue;
    const word = x.mot.trim().split(/\s+/)[0].toLowerCase().replace(/[^\p{L}]/gu, '');
    if (!word) continue;
    merged.set(word, (merged.get(word) || 0) + Math.max(0, Number(x.p) || 0));
  }
  const items = [...merged.entries()]
    .map(([word, p]) => ({ word, p }))
    .sort((a, b) => b.p - a.p)
    .slice(0, k);

  if (!items.length) throw new Error('Le modèle n\'a proposé aucun mot.');

  return {
    items,
    provider: data.provider || '—',
    model: data.model || LLM.model,
    ms: Math.round(performance.now() - t0),
    reasoningTokens: data.usage?.completion_tokens_details?.reasoning_tokens ?? null,
    tokens: data.usage?.total_tokens ?? null
  };
}
