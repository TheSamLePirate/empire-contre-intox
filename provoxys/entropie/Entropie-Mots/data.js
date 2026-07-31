// Fréquences de référence des lettres (en %) par langue.
// Sources : analyses classiques de corpus linguistiques.
export const LANGUAGES = {
  fr: {
    name: "Français",
    flag: "🇫🇷",
    script: "latin",
    color: "#2563eb",
    freq: {
      a: 8.15, b: 0.90, c: 3.34, d: 3.67, e: 14.72, f: 1.07, g: 0.87,
      h: 0.74, i: 7.53, j: 0.55, k: 0.05, l: 5.46, m: 2.97, n: 7.10,
      o: 5.80, p: 3.02, q: 1.36, r: 6.55, s: 7.95, t: 7.24, u: 6.31,
      v: 1.63, w: 0.05, x: 0.39, y: 0.31, z: 0.14
    }
  },
  en: {
    name: "Anglais",
    flag: "🇬🇧",
    script: "latin",
    color: "#dc2626",
    freq: {
      a: 8.17, b: 1.49, c: 2.78, d: 4.25, e: 12.70, f: 2.23, g: 2.02,
      h: 6.09, i: 6.97, j: 0.15, k: 0.77, l: 4.03, m: 2.41, n: 6.75,
      o: 7.51, p: 1.93, q: 0.10, r: 5.99, s: 6.33, t: 9.06, u: 2.76,
      v: 0.98, w: 2.36, x: 0.15, y: 1.97, z: 0.07
    }
  },
  es: {
    name: "Espagnol",
    flag: "🇪🇸",
    script: "latin",
    color: "#d97706",
    freq: {
      a: 11.53, b: 2.22, c: 4.02, d: 5.01, e: 12.18, f: 0.69, g: 1.01,
      h: 0.70, i: 6.25, j: 0.44, k: 0.02, l: 4.97, m: 3.16, n: 6.71,
      o: 8.68, p: 2.51, q: 0.88, r: 6.87, s: 7.98, t: 4.63, u: 2.93,
      v: 1.05, w: 0.02, x: 0.22, y: 1.01, z: 0.47, "ñ": 0.31
    }
  },
  ru: {
    name: "Russe",
    flag: "🇷🇺",
    script: "cyrillic",
    color: "#7c3aed",
    freq: {
      "о": 10.98, "е": 8.45, "а": 8.01, "и": 7.35, "н": 6.70, "т": 6.26,
      "с": 5.47, "р": 4.73, "в": 4.54, "л": 4.40, "к": 3.49, "м": 3.21,
      "д": 2.98, "п": 2.81, "у": 2.62, "я": 2.01, "ы": 1.90, "ь": 1.74,
      "г": 1.70, "з": 1.65, "б": 1.59, "ч": 1.44, "й": 1.21, "х": 0.97,
      "ж": 0.94, "ш": 0.73, "ю": 0.64, "ц": 0.48, "щ": 0.36, "э": 0.32,
      "ф": 0.26, "ъ": 0.04, "ё": 0.04
    }
  }
};

// Phrases d'exemple pour tester rapidement la détection.
export const SAMPLES = {
  fr: "Le vent se lève, il faut tenter de vivre. La beauté du monde réside dans la diversité de ses langues et de ses cultures.",
  en: "The quick brown fox jumps over the lazy dog while the sun sets slowly behind the rolling green hills of the countryside.",
  es: "El sol brillaba sobre las montañas mientras los pájaros cantaban en los árboles cerca del antiguo pueblo tranquilo.",
  ru: "Солнце медленно опускалось за горизонт, освещая тихую реку и старый деревянный мост в маленькой деревне."
};

// Phrases utilisées pour le jeu de devinette de Shannon (1951) :
// l'utilisateur devine la lettre suivante, caractère par caractère.
export const GAME_TEXTS = {
  fr: [
    "il fait beau ce matin et les oiseaux chantent dans le jardin",
    "la redondance du langage nous permet de deviner la suite",
    "elle ouvrit la porte et regarda le ciel gris de novembre",
    "chaque langue possede sa propre structure statistique"
  ],
  en: [
    "the weather is fine this morning and the birds are singing",
    "the redundancy of language lets us guess what comes next",
    "she opened the door and looked at the grey november sky",
    "every language has its own statistical structure"
  ],
  es: [
    "hace buen tiempo esta manana y los pajaros cantan en el jardin",
    "la redundancia del lenguaje nos permite adivinar lo que sigue",
    "abrio la puerta y mira el cielo gris de noviembre",
    "cada lengua posee su propia estructura estadistica"
  ],
  ru: [
    "сегодня хорошая погода и птицы поют в саду",
    "избыточность языка позволяет нам угадать продолжение",
    "она открыла дверь и посмотрела на серое небо ноября",
    "каждый язык имеет свою статистическую структуру"
  ]
};

// Phrases de démonstration pour la carte de prévisibilité.
export const DEMO_SENTENCES = {
  fr: "Le petit chat dort sur le canape du salon depuis ce matin.",
  en: "The little cat sleeps on the living room sofa since this morning.",
  es: "El pequeño gato duerme en el sofá del salón desde esta mañana.",
  ru: "Маленький кот спит на диване в гостиной с самого утра."
};

// Corpus de référence plus longs, utilisés pour calculer l'entropie
// à des ordres croissants (lettres, digrammes, trigrammes, mots),
// à la manière de l'article de Shannon « A Mathematical Theory of Communication » (1948).
export const CORPORA = {
  fr: `On ne voit bien qu'avec le coeur, l'essentiel est invisible pour les yeux. Le temps que tu as perdu pour ta rose fait ta rose si importante. Les hommes n'ont plus le temps de rien connaître. Ils achètent des choses toutes faites chez les marchands. Mais comme il n'existe point de marchands d'amis, les hommes n'ont plus d'amis. Si tu veux un ami, apprivoise-moi. Il faut des rites, dit le renard. Le petit prince regarda le coucher du soleil et pensa qu'il aimait beaucoup les couchers de soleil. La nuit venait, les étoiles brillaient au-dessus du désert et le silence était immense.
Longtemps je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte, mes yeux se fermaient si vite que je n'avais pas le temps de me dire je m'endors. Et, une demi-heure après, la pensée qu'il était temps de chercher le sommeil m'éveillait. Je voulais poser le volume que je croyais avoir encore dans les mains et souffler ma lumière. Il me semblait, tandis que je dormais, que le livre parlait de moi et que je continuais à réfléchir à ce que je venais de lire.
La ville était calme ce matin-là. Les rues étaient encore humides de la pluie de la nuit et les volets des maisons restaient fermés. Un vieil homme traversait la place avec son chien, le boulanger allumait déjà son four et l'odeur du pain chaud se répandait dans le quartier. Les enfants partaient à l'école en riant, leurs cartables sur le dos, tandis que les voitures commençaient à remplir l'avenue. Le soleil montait lentement derrière les toits et la journée s'annonçait belle.
Aujourd'hui, la science étudie le langage comme un système de règles et de probabilités. Chaque langue a sa grammaire, son vocabulaire, ses habitudes. Après un article vient presque toujours un nom, après une préposition vient un groupe nominal, après un sujet vient un verbe. Cette structure rend le langage largement prévisible : lorsque nous lisons une phrase, nous anticipons sans effort les mots qui vont suivre. C'est exactement ce que mesure l'entropie. Plus le texte est prévisible, plus son entropie est faible, et plus la langue contient de redondance. La redondance n'est pas un défaut : elle nous permet de comprendre une conversation dans le bruit, de lire une écriture illisible et de corriger les fautes de frappe sans y penser.
Le langage humain possède une structure statistique remarquable. Chaque lettre, chaque groupe de lettres et chaque mot apparaît avec une fréquence propre à la langue. En français, la lettre e domine largement, suivie des voyelles a, i, o et u ainsi que des consonnes courantes comme s, t, r et n. Lorsque l'on considère non plus une lettre isolée mais des paires puis des triplets de lettres, l'incertitude moyenne diminue car certaines combinaisons sont beaucoup plus probables que d'autres. Ainsi les suites qu, ch, ou et ai reviennent sans cesse, tandis que d'autres n'apparaissent jamais. Cette redondance permet de deviner la suite d'un texte et de corriger les erreurs de transmission. Claude Shannon a montré que l'entropie d'une langue, mesurée en bits par caractère, décroît à mesure que l'on prend en compte un contexte plus long. Le vent se lève sur la mer et les vagues viennent mourir doucement sur le sable clair du rivage tranquille. Les enfants courent en riant pendant que le soleil descend lentement derrière les collines vertes et paisibles de la campagne endormie.`,
  en: `It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness. It was the season of light, it was the season of darkness, it was the spring of hope, it was the winter of despair. We had everything before us, we had nothing before us. Some of the noisiest authorities insisted on it being received, for good or for evil, in the superlative degree of comparison only.
The city was quiet that morning. The streets were still wet from the rain of the night and the shutters of the houses remained closed. An old man crossed the square with his dog, the baker was already lighting his oven and the smell of warm bread spread through the neighbourhood. Children walked to school laughing, their bags on their backs, while cars began to fill the avenue. The sun rose slowly behind the roofs and the day promised to be a fine one.
Today science studies language as a system of rules and probabilities. Every language has its grammar, its vocabulary, its habits. After an article there almost always comes a noun, after a preposition comes a noun phrase, after a subject comes a verb. This structure makes language largely predictable: when we read a sentence we effortlessly anticipate the words that will follow. That is exactly what entropy measures. The more predictable the text, the lower its entropy, and the more redundancy the language contains. Redundancy is not a flaw: it lets us follow a conversation in a noisy room, read terrible handwriting and correct typing mistakes without even noticing.
All happy families are alike; each unhappy family is unhappy in its own way. Everything was in confusion in the house. The wife had found out that the husband was having an affair with the governess, and she had told him that she could not go on living in the same house with him. This position of affairs had now lasted three days, and not only the husband and wife themselves, but all the members of their family and household, were painfully conscious of it.
Human language has a remarkable statistical structure. Every letter, every group of letters and every word appears with a frequency that is characteristic of the language. In English the letter e is by far the most common, followed by t, a, o, i and n, while letters such as q, z and x are quite rare. When we consider not a single letter but pairs and then triplets of letters, the average uncertainty decreases because some combinations are much more likely than others. The sequences th, he, in, er and an occur again and again, whereas many others never appear at all. This redundancy lets us guess how a text continues and correct errors in transmission. Claude Shannon showed that the entropy of a language, measured in bits per character, falls steadily as we take a longer context into account. The quick brown fox jumps over the lazy dog while the golden sun sinks slowly behind the rolling green hills of the quiet countryside far away.`,
  es: `En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor. Una olla de algo más vaca que carnero, salpicón las más noches, duélos y quebrantos los sábados, lentejas los viernes y algún palomino de añadidura los domingos, consumían las tres partes de su hacienda. Tenía en su casa una ama que pasaba de los cuarenta y una sobrina que no llegaba a los veinte.
La ciudad estaba tranquila aquella mañana. Las calles seguían húmedas por la lluvia de la noche y las persianas de las casas permanecían cerradas. Un anciano cruzaba la plaza con su perro, el panadero ya encendía su horno y el olor del pan caliente se extendía por el barrio. Los niños iban a la escuela riendo, con las mochilas a la espalda, mientras los coches empezaban a llenar la avenida. El sol subía despacio detrás de los tejados y el día prometía ser hermoso.
Hoy la ciencia estudia el lenguaje como un sistema de reglas y probabilidades. Cada lengua tiene su gramática, su vocabulario, sus costumbres. Después de un artículo viene casi siempre un nombre, después de una preposición viene un grupo nominal, después de un sujeto viene un verbo. Esta estructura hace que el lenguaje sea muy predecible: cuando leemos una frase anticipamos sin esfuerzo las palabras que van a seguir. Eso es exactamente lo que mide la entropía. Cuanto más predecible es el texto, menor es su entropía y más redundancia contiene la lengua. La redundancia no es un defecto: nos permite seguir una conversación en una sala ruidosa, leer una letra imposible y corregir errores de escritura sin darnos cuenta.
Muchos años después, frente al pelotón de fusilamiento, el coronel había de recordar aquella tarde remota en que su padre lo llevó a conocer el hielo. El pueblo era entonces una aldea de veinte casas de barro y cañabrava construidas a la orilla de un río de aguas diáfanas que se precipitaban por un lecho de piedras pulidas, blancas y enormes como huevos prehistóricos.
El lenguaje humano posee una estructura estadística notable. Cada letra, cada grupo de letras y cada palabra aparece con una frecuencia propia de la lengua. En español las vocales a, e y o son muy frecuentes, seguidas de consonantes como s, n, r, l y d, mientras que letras como k, w o x resultan muy raras. Cuando consideramos no una letra aislada sino pares y luego tríos de letras, la incertidumbre media disminuye porque algunas combinaciones son mucho más probables que otras. Las secuencias qu, ch, es y de aparecen una y otra vez, mientras que muchas otras no aparecen nunca. Esta redundancia nos permite adivinar cómo continúa un texto y corregir los errores de transmisión. Claude Shannon demostró que la entropía de una lengua, medida en bits por carácter, disminuye a medida que tenemos en cuenta un contexto más largo. El sol brillaba sobre las montañas mientras los pájaros cantaban en los árboles cerca del antiguo y tranquilo pueblo dormido.`,
  ru: `Все счастливые семьи похожи друг на друга, каждая несчастливая семья несчастлива по-своему. Всё смешалось в доме. Жена узнала, что муж был в связи с бывшей в их доме гувернанткою, и объявила мужу, что не может жить с ним в одном доме. Положение это продолжалось уже третий день и мучительно чувствовалось всеми членами семьи.
Город был тих в то утро. Улицы были ещё влажными от ночного дождя, а ставни домов оставались закрытыми. Старик шёл через площадь со своей собакой, пекарь уже разжигал печь, и запах тёплого хлеба разносился по кварталу. Дети шли в школу смеясь, с ранцами на спине, а машины начинали заполнять проспект. Солнце медленно поднималось за крышами, и день обещал быть прекрасным.
Сегодня наука изучает язык как систему правил и вероятностей. У каждого языка есть своя грамматика, свой словарь, свои привычки. После предлога почти всегда идёт существительное, после подлежащего идёт глагол. Эта структура делает язык во многом предсказуемым: читая фразу, мы без усилий предугадываем следующие слова. Именно это и измеряет энтропия. Чем предсказуемее текст, тем ниже его энтропия и тем больше избыточности в языке. Избыточность — не недостаток: она позволяет нам понимать разговор в шумной комнате, читать неразборчивый почерк и исправлять опечатки, даже не замечая этого.
Человеческий язык обладает удивительной статистической структурой. Каждая буква, каждая группа букв и каждое слово встречается с частотой, характерной для данного языка. В русском языке чаще всего встречается буква о, за ней следуют е, а, и, н и т, тогда как буквы ф, щ и ъ очень редки. Когда мы рассматриваем не отдельную букву, а пары и затем тройки букв, средняя неопределённость уменьшается, потому что некоторые сочетания гораздо более вероятны, чем другие. Сочетания ст, то, но, ен и на встречаются снова и снова, тогда как многие другие не появляются вовсе. Эта избыточность позволяет нам угадывать продолжение текста и исправлять ошибки передачи. Клод Шеннон показал, что энтропия языка, измеренная в битах на символ, неуклонно снижается по мере учёта более длинного контекста. Солнце медленно опускалось за горизонт, освещая тихую реку и старый деревянный мост в маленькой спящей деревне.`
};
