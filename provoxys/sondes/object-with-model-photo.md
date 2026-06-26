# Photos d’aperçu des modèles 3D — Atlas des sondes & satellites

> Pour **chaque objet de l’`atlas.html` qui possède un modèle 3D Sketchfab** (champ `uid`
> présent dans `data/engins.js`), une **image d’aperçu** a été téléchargée. Objectif :
> **afficher cette image dans la vignette de la carte AVANT de lancer le visualiseur 3D**
> (le modèle WebGL ne se charge qu’au clic sur « Charger en 3D »).
>
> L’image est le **rendu d’aperçu officiel du modèle** sur Sketchfab (le même visuel que
> la miniature du visualiseur) : la vignette et le modèle 3D montrent donc bien le même engin.
>
> **Non encore intégrées au HTML / au JS** — fichier de référence pour le câblage ultérieur
> (réalisé par l’utilisateur).
>
> Dossier des images : `provoxys/sondes/assets/models/` — chemin relatif depuis `atlas.html` :
> **`assets/models/<id>.jpeg`**.
>
> Source : **API Sketchfab v3** (`api.sketchfab.com/v3/models/<uid>` → plus grand thumbnail).
> Résolution récupérée : **1920×1080** quand disponible, sinon 1024×576.

**43 / 43 objets avec modèle 3D** dotés d’une image d’aperçu.

⚠️ **Licences** — les modèles Sketchfab sont surtout en **CC Attribution** (et quelques
modèles officiels **NASA**). Le crédit `auteur · licence` est déjà affiché sur chaque carte
(champs `mt`/`ma` de `engins.js`) et repris ci-dessous. L’aperçu suit la licence du modèle.

---

## Tableau récapitulatif

| id | Objet | Type | Année | Aperçu (local) | Résolution | Modèle 3D (Sketchfab) | Licence | Auteur |
|----|-------|------|-------|----------------|-----------|------------------------|---------|--------|
| sputnik1 | Sputnik 1 | Satellite | 1957 | `assets/models/sputnik1.jpeg` | 1024×576 | [Sputnik 1](https://sketchfab.com/models/a9ae7f57c7cf4c0ca9119cf3b6ef4c2f) | CC Attribution | uperesito |
| explorer1 | Explorer 1 | Satellite | 1958 | `assets/models/explorer1.jpeg` | 1024×576 | [Explorer 1](https://sketchfab.com/models/af6375620aaa43cb8ccf088c2f02ee1a) | CC Attribution | uperesito |
| vostok1 | Vostok 1 | Vol habité | 1961 | `assets/models/vostok1.jpeg` | 1024×576 | [Vostok 1](https://sketchfab.com/models/6dfff011b8df4b0891366aab8b6b0349) | CC Attribution-NonCommercial | tashtego |
| luna9 | Luna 9 | Atterrisseur | 1966 | `assets/models/luna9.jpeg` | 1920×1080 | [Luna 9 lander](https://sketchfab.com/models/9144a8c00e684052a5749f71a73e1bbc) | CC Attribution | engine9 |
| lunokhod1 | Lunokhod 1 | Rover | 1970 | `assets/models/lunokhod1.jpeg` | 1920×1080 | [Lunokhod 1](https://sketchfab.com/models/3f5a5f02ad53447b9dff335e42d2469c) | CC Attribution | sheffrator |
| lunokhod2 | Lunokhod 2 | Rover | 1973 | `assets/models/lunokhod2.jpeg` | 1024×576 | [Lunokhod-2](https://sketchfab.com/models/d7419015501640998bc5d00ca4c0f9f4) | CC Attribution-NonCommercial | tashtego |
| mars3 | Mars 3 | Atterrisseur | 1971 | `assets/models/mars3.jpeg` | 1920×1080 | [Mars 3 spacecraft](https://sketchfab.com/models/5b7853d53cd84b6ca6c16fe68a92c98a) | CC Attribution | Wieslaw Kruczala |
| pioneer | Pioneer 10 & 11 | Sonde | 1972 | `assets/models/pioneer.jpeg` | 1920×1080 | [Pioneer (3D printable)](https://sketchfab.com/models/22a3f655baeb42d8b7a3efd38d7bb09c) | CC Attribution-NonCommercial | NASA |
| voyager | Voyager 1 & 2 | Sonde | 1977 | `assets/models/voyager.jpeg` | 1920×1080 | [Voyager (3D printable)](https://sketchfab.com/models/81b6fa85964e4261b661aea487cc0fa8) | CC Attribution-NonCommercial | NASA |
| viking | Viking 1 & 2 | Atterrisseur | 1976 | `assets/models/viking.jpeg` | 1920×1080 | [Viking I Lander](https://sketchfab.com/models/eabeb7e3ed8f437c9022a9ccd0214760) | CC Attribution | someaurelius |
| galileo | Galileo | Sonde | 1989 | `assets/models/galileo.jpeg` | 1920×1080 | [Galileo Orbiter](https://sketchfab.com/models/19c3c6e0c1b548919d11681065fcf65a) | CC Attribution-NonCommercial | Planetshine Creations |
| soho | SOHO | Télescope spatial | 1995 | `assets/models/soho.jpeg` | 1024×576 | [SOHO](https://sketchfab.com/models/8a5e8b79665a40e7a579b8961f58ab2a) | — | tashtego |
| cassini | Cassini-Huygens | Sonde | 1997 | `assets/models/cassini.jpeg` | 1920×1080 | [Cassini (3D printable)](https://sketchfab.com/models/bdd5161f099c4767bc061df181e9b37c) | CC Attribution-NonCommercial | NASA |
| newhorizons | New Horizons | Sonde | 2006 | `assets/models/newhorizons.jpeg` | 1920×1080 | [New Horizons (3D printable)](https://sketchfab.com/models/d7f79077cc874a60a080c5a3cc0f7550) | CC Attribution-NonCommercial | NASA |
| juno | Juno | Sonde | 2011 | `assets/models/juno.jpeg` | 1920×1080 | [Juno (3D printable)](https://sketchfab.com/models/ba7321aecf6d46c9822aa7a4ae7f5966) | CC Attribution-NonCommercial | NASA |
| parker | Parker Solar Probe | Sonde | 2018 | `assets/models/parker.jpeg` | 1920×1080 | [NASA Parker Solar Probe](https://sketchfab.com/models/ce8b5da577104a11a1f76c3d81e46fdd) | CC Attribution-NonCommercial | Space Explorers Academy |
| solarorbiter | Solar Orbiter | Sonde | 2020 | `assets/models/solarorbiter.jpeg` | 1920×1080 | [Solar Orbiter](https://sketchfab.com/models/30650fe7bf624c8ca070efe9bd7d7a14) | CC Attribution | STIK-Visualisation |
| marsexpress | Mars Express | Satellite | 2003 | `assets/models/marsexpress.jpeg` | 1024×576 | [Mars Express](https://sketchfab.com/models/5461ecbfcc7c4ff098aa7acb3ee40a89) | — | tashtego |
| mro | Mars Reconnaissance Orbiter | Satellite | 2005 | `assets/models/mro.jpeg` | 1920×1080 | [MRO satellite image](https://sketchfab.com/models/0a3d4750526d4bc5a966c2b6e2a3bcee) | CC Attribution | Mars_Pics |
| rosetta | Rosetta + Philae | Sonde | 2004 | `assets/models/rosetta.jpeg` | 1920×1080 | [Rosetta (3D printable)](https://sketchfab.com/models/c2a2108ecc3d4e28ade6625b5a7d640f) | CC Attribution-NonCommercial | NASA |
| osirisrex | OSIRIS-REx / APEX | Sonde | 2016 | `assets/models/osirisrex.jpeg` | 1024×576 | [OSIRIS-REx](https://sketchfab.com/models/4502d7705147439eab474902fa283c89) | — | tashtego |
| hayabusa2 | Hayabusa2 | Sonde | 2014 | `assets/models/hayabusa2.jpeg` | 1920×1080 | [Haya2 enhanced](https://sketchfab.com/models/a8e3cee4ea9444a384fe1a4f2eef58ed) | CC Attribution | mcgyver2018 |
| dart | DART | Sonde | 2021 | `assets/models/dart.jpeg` | 1920×1080 | [NASA DART](https://sketchfab.com/models/076d822556334467aa358882cdc47899) | CC Attribution | brianpeiris |
| lucy | Lucy | Sonde | 2021 | `assets/models/lucy.jpeg` | 1920×1080 | [LUCY \| NASA Space Probe](https://sketchfab.com/models/bc3dc59eceb74b43a02cc2d51b5a0be5) | CC Attribution | murilo.kleine |
| persever | Perseverance + Ingenuity | Rover | 2020 | `assets/models/persever.jpeg` | 1920×1080 | [Perseverance](https://sketchfab.com/models/c1c94e1f69df45eeae4a0a1d0d27e85b) | CC0 Public Domain | Thomas Flynn |
| curiosity | Curiosity | Rover | 2011 | `assets/models/curiosity.jpeg` | 1920×1080 | [NASA Curiosity (Clean)](https://sketchfab.com/models/0696a383f3e841d2b5c7636ee8a58aba) | CC Attribution | Thomas Flynn |
| zhurong | Tianwen-1 / Zhurong | Rover | 2020 | `assets/models/zhurong.jpeg` | 1920×1080 | [Zhurong (rover)](https://sketchfab.com/models/e7640a3973274c4da5224e69a9f58222) | — | thaweverything |
| europaclipper | Europa Clipper | Sonde | 2024 | `assets/models/europaclipper.jpeg` | 1920×1080 | [Europa clipper](https://sketchfab.com/models/5e88f1eb8db446a8a22577624ae4af03) | CC Attribution | Cybertron B-127 |
| hubble | Hubble | Télescope spatial | 1990 | `assets/models/hubble.jpeg` | 1024×576 | [Hubble Space Telescope](https://sketchfab.com/models/640764e1a20a4c7ea9718a83a05bcb7f) | CC Attribution-NonCommercial | NASA |
| jwst | James Webb (JWST) | Télescope spatial | 2021 | `assets/models/jwst.jpeg` | 1920×1080 | [JWST](https://sketchfab.com/models/6c92c08a672640afb58ee44d248fd0fe) | CC Attribution | Paul (Sketchfab) |
| spitzer | Spitzer | Télescope spatial | 2003 | `assets/models/spitzer.jpeg` | 1024×576 | [Spitzer Space Telescope](https://sketchfab.com/models/cf7859160b3e485db98eb1964331d663) | CC Attribution | uperesito |
| kepler | Kepler | Télescope spatial | 2009 | `assets/models/kepler.jpeg` | 1920×1080 | [Kepler (3D printable)](https://sketchfab.com/models/943c1f4cb3224623ab6696f1f3407c4b) | CC Attribution-NonCommercial | NASA |
| starlink | Starlink (V2 mini) | Satellite | 2019 | `assets/models/starlink.jpeg` | 1920×1080 | [Starlink Spacex Satellite](https://sketchfab.com/models/0a60f6720c5141c9a1c6d71aac108b31) | CC Attribution | Malacodart |
| landsat | Landsat 9 | Satellite | 2021 | `assets/models/landsat.jpeg` | 1920×1080 | [Satellite Landsat 8](https://sketchfab.com/models/4cf892ee33b94978a3b70309bbc2a76f) | CC Attribution | wireframe |
| sentinel2 | Sentinel-2 (Copernicus) | Satellite | 2015 | `assets/models/sentinel2.jpeg` | 1920×1080 | [Sentinel2](https://sketchfab.com/models/36d8328a3c98447eadf0de08c277ede9) | CC Attribution | bernardo.bello |
| iss | Station spatiale (ISS) | Vol habité | 1998 | `assets/models/iss.jpeg` | 1920×1080 | [International Space Station](https://sketchfab.com/models/f6e4f7ba571f4b33948ba1da23280ee0) | CC Attribution | Paul (Sketchfab) |
| vlt | VLT | Télescope au sol | 1998 | `assets/models/vlt.jpeg` | 1920×1080 | [ESO VLT Unit telescope dome](https://sketchfab.com/models/9695be2ec99c4cea8963f777f264a6a5) | CC Attribution | europeansouthernobservatory |
| arecibo | Arecibo | Télescope au sol | 1963 | `assets/models/arecibo.jpeg` | 1920×1080 | [Arecibo Telescope (collapsed)](https://sketchfab.com/models/a6a84919914c4cb194ef43b614308036) | CC Attribution | Gabo Gatchava |
| artemis | Artemis II / Orion / SLS | Vol habité | 2026 | `assets/models/artemis.jpeg` | 1920×1080 | [Orion Spacecraft](https://sketchfab.com/models/fb89e865dcd446b89eaf78deaf213974) | CC Attribution | WISEMANmods |
| dragonfly | Dragonfly | Sonde | 2028 | `assets/models/dragonfly.jpeg` | 1920×1080 | [NASA Dragonfly Quadcopter](https://sketchfab.com/models/fa2d23cbce6642598f5e6e6f65b8b312) | CC Attribution | Emil van Dam |
| rosalind | Rosalind Franklin (ExoMars) | Rover | 2028 | `assets/models/rosalind.jpeg` | 1920×1080 | [ESA ExoMars Rover](https://sketchfab.com/models/4148a592193549c59c778a69fd45df5a) | CC Attribution | Marian |
| change6 | Chang'e-6 | Atterrisseur | 2024 | `assets/models/change6.jpeg` | 1920×1080 | [Chang'e 6](https://sketchfab.com/models/adb040629d854f8dbec71d297d627c6f) | — | thaweverything |
| chandrayaan3 | Chandrayaan-3 | Atterrisseur | 2023 | `assets/models/chandrayaan3.jpeg` | 1920×1080 | [Chandrayaan-3 Vikram Lander](https://sketchfab.com/models/27e8d9b94f324e6b9a25b58e64317213) | CC Attribution | Kulibin Space |

---

## Détail par objet (correspondance `uid` ↔ image)

### Sputnik 1 — `sputnik1`
- **Image d’aperçu** : `assets/models/sputnik1.jpeg` (1024×576, 21 Ko)
- **uid Sketchfab** : `a9ae7f57c7cf4c0ca9119cf3b6ef4c2f`
- **Modèle** : [Sputnik 1](https://sketchfab.com/models/a9ae7f57c7cf4c0ca9119cf3b6ef4c2f) — uperesito · CC Attribution
- **Source image** : https://media.sketchfab.com/models/a9ae7f57c7cf4c0ca9119cf3b6ef4c2f/thumbnails/09ec9a4ac0a745479b2281d861c6ba8a/1024x576.jpeg

### Explorer 1 — `explorer1`
- **Image d’aperçu** : `assets/models/explorer1.jpeg` (1024×576, 17 Ko)
- **uid Sketchfab** : `af6375620aaa43cb8ccf088c2f02ee1a`
- **Modèle** : [Explorer 1](https://sketchfab.com/models/af6375620aaa43cb8ccf088c2f02ee1a) — uperesito · CC Attribution
- **Source image** : https://media.sketchfab.com/models/af6375620aaa43cb8ccf088c2f02ee1a/thumbnails/b314d3dba9644549926f6858eb8d580a/1024x576.jpeg

### Vostok 1 — `vostok1`
- **Image d’aperçu** : `assets/models/vostok1.jpeg` (1024×576, 24 Ko)
- **uid Sketchfab** : `6dfff011b8df4b0891366aab8b6b0349`
- **Modèle** : [Vostok 1](https://sketchfab.com/models/6dfff011b8df4b0891366aab8b6b0349) — tashtego · CC Attribution-NonCommercial
- **Source image** : https://media.sketchfab.com/models/6dfff011b8df4b0891366aab8b6b0349/thumbnails/2e007b99f9e944aca92576b874a92930/1024x576.jpeg

### Luna 9 — `luna9`
- **Image d’aperçu** : `assets/models/luna9.jpeg` (1920×1080, 128 Ko)
- **uid Sketchfab** : `9144a8c00e684052a5749f71a73e1bbc`
- **Modèle** : [Luna 9 lander](https://sketchfab.com/models/9144a8c00e684052a5749f71a73e1bbc) — engine9 · CC Attribution
- **Source image** : https://media.sketchfab.com/models/9144a8c00e684052a5749f71a73e1bbc/thumbnails/3316a5f6e90c4a94b25f6e18d4916c14/5feb063f10b24126996f0bc75a216465.jpeg

### Lunokhod 1 — `lunokhod1`
- **Image d’aperçu** : `assets/models/lunokhod1.jpeg` (1920×1080, 111 Ko)
- **uid Sketchfab** : `3f5a5f02ad53447b9dff335e42d2469c`
- **Modèle** : [Lunokhod 1](https://sketchfab.com/models/3f5a5f02ad53447b9dff335e42d2469c) — sheffrator · CC Attribution
- **Source image** : https://media.sketchfab.com/models/3f5a5f02ad53447b9dff335e42d2469c/thumbnails/2701e82271dd44478be4f7ab55ad949f/dff58feb3167437fbd49129f2a942247.jpeg

### Lunokhod 2 — `lunokhod2`
- **Image d’aperçu** : `assets/models/lunokhod2.jpeg` (1024×576, 40 Ko)
- **uid Sketchfab** : `d7419015501640998bc5d00ca4c0f9f4`
- **Modèle** : [Lunokhod-2](https://sketchfab.com/models/d7419015501640998bc5d00ca4c0f9f4) — tashtego · CC Attribution-NonCommercial
- **Source image** : https://media.sketchfab.com/models/d7419015501640998bc5d00ca4c0f9f4/thumbnails/b47cfd3315ea403ab68dbccfa88c62e2/1024.jpeg

### Mars 3 — `mars3`
- **Image d’aperçu** : `assets/models/mars3.jpeg` (1920×1080, 165 Ko)
- **uid Sketchfab** : `5b7853d53cd84b6ca6c16fe68a92c98a`
- **Modèle** : [Mars 3 spacecraft](https://sketchfab.com/models/5b7853d53cd84b6ca6c16fe68a92c98a) — Wieslaw Kruczala · CC Attribution
- **Source image** : https://media.sketchfab.com/models/5b7853d53cd84b6ca6c16fe68a92c98a/thumbnails/079fc23f23fa49a79978cbe534f216ac/b5e8e19dded541ce8dc95b4f56accdda.jpeg

### Pioneer 10 & 11 — `pioneer`
- **Image d’aperçu** : `assets/models/pioneer.jpeg` (1920×1080, 96 Ko)
- **uid Sketchfab** : `22a3f655baeb42d8b7a3efd38d7bb09c`
- **Modèle** : [Pioneer (3D printable)](https://sketchfab.com/models/22a3f655baeb42d8b7a3efd38d7bb09c) — NASA · CC Attribution-NonCommercial
- **Source image** : https://media.sketchfab.com/models/22a3f655baeb42d8b7a3efd38d7bb09c/thumbnails/e0bebd6da6d141389528e1ac7e8e3838/847e183198734a63920c3c36f24a3e19.jpeg

### Voyager 1 & 2 — `voyager`
- **Image d’aperçu** : `assets/models/voyager.jpeg` (1920×1080, 67 Ko)
- **uid Sketchfab** : `81b6fa85964e4261b661aea487cc0fa8`
- **Modèle** : [Voyager (3D printable)](https://sketchfab.com/models/81b6fa85964e4261b661aea487cc0fa8) — NASA · CC Attribution-NonCommercial
- **Source image** : https://media.sketchfab.com/models/81b6fa85964e4261b661aea487cc0fa8/thumbnails/344f04bff3224ddeab3b2ed6d882634a/17fc4fee9ab24b8db45ed83aa8c8bd29.jpeg

### Viking 1 & 2 — `viking`
- **Image d’aperçu** : `assets/models/viking.jpeg` (1920×1080, 324 Ko)
- **uid Sketchfab** : `eabeb7e3ed8f437c9022a9ccd0214760`
- **Modèle** : [Viking I Lander](https://sketchfab.com/models/eabeb7e3ed8f437c9022a9ccd0214760) — someaurelius · CC Attribution
- **Source image** : https://media.sketchfab.com/models/eabeb7e3ed8f437c9022a9ccd0214760/thumbnails/eca120a2b3b94c52bec7067e0dfff17b/93394661d4294e4f87a478a9646fc7eb.jpeg

### Galileo — `galileo`
- **Image d’aperçu** : `assets/models/galileo.jpeg` (1920×1080, 154 Ko)
- **uid Sketchfab** : `19c3c6e0c1b548919d11681065fcf65a`
- **Modèle** : [Galileo Orbiter](https://sketchfab.com/models/19c3c6e0c1b548919d11681065fcf65a) — Planetshine Creations · CC Attribution-NonCommercial
- **Source image** : https://media.sketchfab.com/models/19c3c6e0c1b548919d11681065fcf65a/thumbnails/ad7ffe1235db421e9c877ef086ef5ae4/639e88989e3845aca164e74c1a2f773b.jpeg

### SOHO — `soho`
- **Image d’aperçu** : `assets/models/soho.jpeg` (1024×576, 40 Ko)
- **uid Sketchfab** : `8a5e8b79665a40e7a579b8961f58ab2a`
- **Modèle** : [SOHO](https://sketchfab.com/models/8a5e8b79665a40e7a579b8961f58ab2a) — tashtego · —
- **Source image** : https://media.sketchfab.com/models/8a5e8b79665a40e7a579b8961f58ab2a/thumbnails/7467cf93e6e14fa18ab5dea71da50271/1024.jpeg

### Cassini-Huygens — `cassini`
- **Image d’aperçu** : `assets/models/cassini.jpeg` (1920×1080, 99 Ko)
- **uid Sketchfab** : `bdd5161f099c4767bc061df181e9b37c`
- **Modèle** : [Cassini (3D printable)](https://sketchfab.com/models/bdd5161f099c4767bc061df181e9b37c) — NASA · CC Attribution-NonCommercial
- **Source image** : https://media.sketchfab.com/models/bdd5161f099c4767bc061df181e9b37c/thumbnails/39700731ffbb4f78af7fe0d3d8925b0a/60470f89ea1d420caca84c5ae50dc84e.jpeg

### New Horizons — `newhorizons`
- **Image d’aperçu** : `assets/models/newhorizons.jpeg` (1920×1080, 106 Ko)
- **uid Sketchfab** : `d7f79077cc874a60a080c5a3cc0f7550`
- **Modèle** : [New Horizons (3D printable)](https://sketchfab.com/models/d7f79077cc874a60a080c5a3cc0f7550) — NASA · CC Attribution-NonCommercial
- **Source image** : https://media.sketchfab.com/models/d7f79077cc874a60a080c5a3cc0f7550/thumbnails/596a149941b04558a1d1ca24a9e02072/ae6094d28c424aec88ad141b4a31db6c.jpeg

### Juno — `juno`
- **Image d’aperçu** : `assets/models/juno.jpeg` (1920×1080, 97 Ko)
- **uid Sketchfab** : `ba7321aecf6d46c9822aa7a4ae7f5966`
- **Modèle** : [Juno (3D printable)](https://sketchfab.com/models/ba7321aecf6d46c9822aa7a4ae7f5966) — NASA · CC Attribution-NonCommercial
- **Source image** : https://media.sketchfab.com/models/ba7321aecf6d46c9822aa7a4ae7f5966/thumbnails/6e63f702a9684047a0d4760002012903/2580cb257f734865b56ff44ad128e7f5.jpeg

### Parker Solar Probe — `parker`
- **Image d’aperçu** : `assets/models/parker.jpeg` (1920×1080, 235 Ko)
- **uid Sketchfab** : `ce8b5da577104a11a1f76c3d81e46fdd`
- **Modèle** : [NASA Parker Solar Probe](https://sketchfab.com/models/ce8b5da577104a11a1f76c3d81e46fdd) — Space Explorers Academy · CC Attribution-NonCommercial
- **Source image** : https://media.sketchfab.com/models/ce8b5da577104a11a1f76c3d81e46fdd/thumbnails/3309321965244c46b9ccdc68b0231a4d/f02a397181f5418e8663e3d4fd83a296.jpeg

### Solar Orbiter — `solarorbiter`
- **Image d’aperçu** : `assets/models/solarorbiter.jpeg` (1920×1080, 237 Ko)
- **uid Sketchfab** : `30650fe7bf624c8ca070efe9bd7d7a14`
- **Modèle** : [Solar Orbiter](https://sketchfab.com/models/30650fe7bf624c8ca070efe9bd7d7a14) — STIK-Visualisation · CC Attribution
- **Source image** : https://media.sketchfab.com/models/30650fe7bf624c8ca070efe9bd7d7a14/thumbnails/53cbed2cf05a4defac72c32fbb49a38d/5f8a3acd148245f195738bd83e7ab15b.jpeg

### Mars Express — `marsexpress`
- **Image d’aperçu** : `assets/models/marsexpress.jpeg` (1024×576, 45 Ko)
- **uid Sketchfab** : `5461ecbfcc7c4ff098aa7acb3ee40a89`
- **Modèle** : [Mars Express](https://sketchfab.com/models/5461ecbfcc7c4ff098aa7acb3ee40a89) — tashtego · —
- **Source image** : https://media.sketchfab.com/models/5461ecbfcc7c4ff098aa7acb3ee40a89/thumbnails/06975f7448454a3f85bd6f813af513f2/1024.jpeg

### Mars Reconnaissance Orbiter — `mro`
- **Image d’aperçu** : `assets/models/mro.jpeg` (1920×1080, 92 Ko)
- **uid Sketchfab** : `0a3d4750526d4bc5a966c2b6e2a3bcee`
- **Modèle** : [MRO satellite image](https://sketchfab.com/models/0a3d4750526d4bc5a966c2b6e2a3bcee) — Mars_Pics · CC Attribution
- **Source image** : https://media.sketchfab.com/models/0a3d4750526d4bc5a966c2b6e2a3bcee/thumbnails/224b3952a74149179847dca41071a5a6/37add2650b5641e7ba30bcd5162281fb.jpeg

### Rosetta + Philae — `rosetta`
- **Image d’aperçu** : `assets/models/rosetta.jpeg` (1920×1080, 95 Ko)
- **uid Sketchfab** : `c2a2108ecc3d4e28ade6625b5a7d640f`
- **Modèle** : [Rosetta (3D printable)](https://sketchfab.com/models/c2a2108ecc3d4e28ade6625b5a7d640f) — NASA · CC Attribution-NonCommercial
- **Source image** : https://media.sketchfab.com/models/c2a2108ecc3d4e28ade6625b5a7d640f/thumbnails/4ced49d4c8b64bc39051a9e4284606cf/67ffef2942a346c8ac4c103f46cad961.jpeg

### OSIRIS-REx / APEX — `osirisrex`
- **Image d’aperçu** : `assets/models/osirisrex.jpeg` (1024×576, 50 Ko)
- **uid Sketchfab** : `4502d7705147439eab474902fa283c89`
- **Modèle** : [OSIRIS-REx](https://sketchfab.com/models/4502d7705147439eab474902fa283c89) — tashtego · —
- **Source image** : https://media.sketchfab.com/models/4502d7705147439eab474902fa283c89/thumbnails/5c94c4883ab640938931b36684c8c923/1024x576.jpeg

### Hayabusa2 — `hayabusa2`
- **Image d’aperçu** : `assets/models/hayabusa2.jpeg` (1920×1080, 200 Ko)
- **uid Sketchfab** : `a8e3cee4ea9444a384fe1a4f2eef58ed`
- **Modèle** : [Haya2 enhanced](https://sketchfab.com/models/a8e3cee4ea9444a384fe1a4f2eef58ed) — mcgyver2018 · CC Attribution
- **Source image** : https://media.sketchfab.com/models/a8e3cee4ea9444a384fe1a4f2eef58ed/thumbnails/f27f97ed26d14df3b9d41e3aadbe0962/c83a4f208fd34c14b32d9c26d843421f.jpeg

### DART — `dart`
- **Image d’aperçu** : `assets/models/dart.jpeg` (1920×1080, 38 Ko)
- **uid Sketchfab** : `076d822556334467aa358882cdc47899`
- **Modèle** : [NASA DART](https://sketchfab.com/models/076d822556334467aa358882cdc47899) — brianpeiris · CC Attribution
- **Source image** : https://media.sketchfab.com/models/076d822556334467aa358882cdc47899/thumbnails/5470e7cf78a6467bad2c5a7f434af9df/e5dd30799f434809a2dfcdf684b76be3.jpeg

### Lucy — `lucy`
- **Image d’aperçu** : `assets/models/lucy.jpeg` (1920×1080, 516 Ko)
- **uid Sketchfab** : `bc3dc59eceb74b43a02cc2d51b5a0be5`
- **Modèle** : [LUCY | NASA Space Probe](https://sketchfab.com/models/bc3dc59eceb74b43a02cc2d51b5a0be5) — murilo.kleine · CC Attribution
- **Source image** : https://media.sketchfab.com/models/bc3dc59eceb74b43a02cc2d51b5a0be5/thumbnails/a3baf2abba78409ea038a6526f5139a5/cffa2c4576b14c04af2fcdde3ddead79.jpeg

### Perseverance + Ingenuity — `persever`
- **Image d’aperçu** : `assets/models/persever.jpeg` (1920×1080, 152 Ko)
- **uid Sketchfab** : `c1c94e1f69df45eeae4a0a1d0d27e85b`
- **Modèle** : [Perseverance](https://sketchfab.com/models/c1c94e1f69df45eeae4a0a1d0d27e85b) — Thomas Flynn · CC0 Public Domain
- **Source image** : https://media.sketchfab.com/models/c1c94e1f69df45eeae4a0a1d0d27e85b/thumbnails/88365fe977914d3a900c54de88a9eb95/15a1f5cb95c241e2871b776f6563267b.jpeg

### Curiosity — `curiosity`
- **Image d’aperçu** : `assets/models/curiosity.jpeg` (1920×1080, 362 Ko)
- **uid Sketchfab** : `0696a383f3e841d2b5c7636ee8a58aba`
- **Modèle** : [NASA Curiosity (Clean)](https://sketchfab.com/models/0696a383f3e841d2b5c7636ee8a58aba) — Thomas Flynn · CC Attribution
- **Source image** : https://media.sketchfab.com/models/0696a383f3e841d2b5c7636ee8a58aba/thumbnails/d677b4d6542a4e9998e41c91eab7b93e/c25a182d22564feb95e8d133f7a9d19b.jpeg

### Tianwen-1 / Zhurong — `zhurong`
- **Image d’aperçu** : `assets/models/zhurong.jpeg` (1920×1080, 402 Ko)
- **uid Sketchfab** : `e7640a3973274c4da5224e69a9f58222`
- **Modèle** : [Zhurong (rover)](https://sketchfab.com/models/e7640a3973274c4da5224e69a9f58222) — thaweverything · —
- **Source image** : https://media.sketchfab.com/models/e7640a3973274c4da5224e69a9f58222/thumbnails/54b14e03df994e4bbd11e62f802b4c95/42cc49d7ba194043a20dfea40c419ef7.jpeg

### Europa Clipper — `europaclipper`
- **Image d’aperçu** : `assets/models/europaclipper.jpeg` (1920×1080, 116 Ko)
- **uid Sketchfab** : `5e88f1eb8db446a8a22577624ae4af03`
- **Modèle** : [Europa clipper](https://sketchfab.com/models/5e88f1eb8db446a8a22577624ae4af03) — Cybertron B-127 · CC Attribution
- **Source image** : https://media.sketchfab.com/models/5e88f1eb8db446a8a22577624ae4af03/thumbnails/f4565a00a0ac4fa09e6302124c78035c/55cde4309a6a48c7bc6d304aa60e1c4a.jpeg

### Hubble — `hubble`
- **Image d’aperçu** : `assets/models/hubble.jpeg` (1024×576, 26 Ko)
- **uid Sketchfab** : `640764e1a20a4c7ea9718a83a05bcb7f`
- **Modèle** : [Hubble Space Telescope](https://sketchfab.com/models/640764e1a20a4c7ea9718a83a05bcb7f) — NASA · CC Attribution-NonCommercial
- **Source image** : https://media.sketchfab.com/models/640764e1a20a4c7ea9718a83a05bcb7f/thumbnails/38342fc8bdff43f99b6ef1ab4e2177bd/1024x576.jpeg

### James Webb (JWST) — `jwst`
- **Image d’aperçu** : `assets/models/jwst.jpeg` (1920×1080, 296 Ko)
- **uid Sketchfab** : `6c92c08a672640afb58ee44d248fd0fe`
- **Modèle** : [JWST](https://sketchfab.com/models/6c92c08a672640afb58ee44d248fd0fe) — Paul (Sketchfab) · CC Attribution
- **Source image** : https://media.sketchfab.com/models/6c92c08a672640afb58ee44d248fd0fe/thumbnails/694c5bb3140e44e28d0e7b2a6a8a2a5b/f9ad0d3546d44d59a449e7c515682c6a.jpeg

### Spitzer — `spitzer`
- **Image d’aperçu** : `assets/models/spitzer.jpeg` (1024×576, 29 Ko)
- **uid Sketchfab** : `cf7859160b3e485db98eb1964331d663`
- **Modèle** : [Spitzer Space Telescope](https://sketchfab.com/models/cf7859160b3e485db98eb1964331d663) — uperesito · CC Attribution
- **Source image** : https://media.sketchfab.com/models/cf7859160b3e485db98eb1964331d663/thumbnails/884b0907224c4b5ab6e0d61937ba84ad/1024x576.jpeg

### Kepler — `kepler`
- **Image d’aperçu** : `assets/models/kepler.jpeg` (1920×1080, 91 Ko)
- **uid Sketchfab** : `943c1f4cb3224623ab6696f1f3407c4b`
- **Modèle** : [Kepler (3D printable)](https://sketchfab.com/models/943c1f4cb3224623ab6696f1f3407c4b) — NASA · CC Attribution-NonCommercial
- **Source image** : https://media.sketchfab.com/models/943c1f4cb3224623ab6696f1f3407c4b/thumbnails/9a79b3d8ee604190b7853642264b88da/2b7599ccb3f144babb58cbc9a07b2373.jpeg

### Starlink (V2 mini) — `starlink`
- **Image d’aperçu** : `assets/models/starlink.jpeg` (1920×1080, 240 Ko)
- **uid Sketchfab** : `0a60f6720c5141c9a1c6d71aac108b31`
- **Modèle** : [Starlink Spacex Satellite](https://sketchfab.com/models/0a60f6720c5141c9a1c6d71aac108b31) — Malacodart · CC Attribution
- **Source image** : https://media.sketchfab.com/models/0a60f6720c5141c9a1c6d71aac108b31/thumbnails/2292ac0e8a11435c97cb68e3539c701f/b3afcc0be4f34f75ae86e4846e24b914.jpeg

### Landsat 9 — `landsat`
- **Image d’aperçu** : `assets/models/landsat.jpeg` (1920×1080, 93 Ko)
- **uid Sketchfab** : `4cf892ee33b94978a3b70309bbc2a76f`
- **Modèle** : [Satellite Landsat 8](https://sketchfab.com/models/4cf892ee33b94978a3b70309bbc2a76f) — wireframe · CC Attribution
- **Source image** : https://media.sketchfab.com/models/4cf892ee33b94978a3b70309bbc2a76f/thumbnails/2b2c549c8d3248379cf48ac7f53a47dd/1920x1080.jpeg

### Sentinel-2 (Copernicus) — `sentinel2`
- **Image d’aperçu** : `assets/models/sentinel2.jpeg` (1920×1080, 40 Ko)
- **uid Sketchfab** : `36d8328a3c98447eadf0de08c277ede9`
- **Modèle** : [Sentinel2](https://sketchfab.com/models/36d8328a3c98447eadf0de08c277ede9) — bernardo.bello · CC Attribution
- **Source image** : https://media.sketchfab.com/models/36d8328a3c98447eadf0de08c277ede9/thumbnails/1d399c56c7fc439aa2ac42338be00522/09d7791e3491482d8eb1072b83c0daa8.jpeg

### Station spatiale (ISS) — `iss`
- **Image d’aperçu** : `assets/models/iss.jpeg` (1920×1080, 438 Ko)
- **uid Sketchfab** : `f6e4f7ba571f4b33948ba1da23280ee0`
- **Modèle** : [International Space Station](https://sketchfab.com/models/f6e4f7ba571f4b33948ba1da23280ee0) — Paul (Sketchfab) · CC Attribution
- **Source image** : https://media.sketchfab.com/models/f6e4f7ba571f4b33948ba1da23280ee0/thumbnails/c85800e4650742319adad60de2cd8d3a/59d9f91f4d734e0c9adb0bcb90f84bd9.jpeg

### VLT — `vlt`
- **Image d’aperçu** : `assets/models/vlt.jpeg` (1920×1080, 92 Ko)
- **uid Sketchfab** : `9695be2ec99c4cea8963f777f264a6a5`
- **Modèle** : [ESO VLT Unit telescope dome](https://sketchfab.com/models/9695be2ec99c4cea8963f777f264a6a5) — europeansouthernobservatory · CC Attribution
- **Source image** : https://media.sketchfab.com/models/9695be2ec99c4cea8963f777f264a6a5/thumbnails/3c1e5231cfff41e697ed9048bfca1343/1d1cb583ba6f45a09b9a75f3931c91ab.jpeg

### Arecibo — `arecibo`
- **Image d’aperçu** : `assets/models/arecibo.jpeg` (1920×1080, 379 Ko)
- **uid Sketchfab** : `a6a84919914c4cb194ef43b614308036`
- **Modèle** : [Arecibo Telescope (collapsed)](https://sketchfab.com/models/a6a84919914c4cb194ef43b614308036) — Gabo Gatchava · CC Attribution
- **Source image** : https://media.sketchfab.com/models/a6a84919914c4cb194ef43b614308036/thumbnails/3dfd6fd47a0242178b1e17852b4cc6d7/a77865c423544fcaa802f88b8b17397f.jpeg

### Artemis II / Orion / SLS — `artemis`
- **Image d’aperçu** : `assets/models/artemis.jpeg` (1920×1080, 50 Ko)
- **uid Sketchfab** : `fb89e865dcd446b89eaf78deaf213974`
- **Modèle** : [Orion Spacecraft](https://sketchfab.com/models/fb89e865dcd446b89eaf78deaf213974) — WISEMANmods · CC Attribution
- **Source image** : https://media.sketchfab.com/models/fb89e865dcd446b89eaf78deaf213974/thumbnails/e908011ee61f423ca75be8e481d496ef/a4bb13596a66461c96bbc727a453a131.jpeg

### Dragonfly — `dragonfly`
- **Image d’aperçu** : `assets/models/dragonfly.jpeg` (1920×1080, 552 Ko)
- **uid Sketchfab** : `fa2d23cbce6642598f5e6e6f65b8b312`
- **Modèle** : [NASA Dragonfly Quadcopter](https://sketchfab.com/models/fa2d23cbce6642598f5e6e6f65b8b312) — Emil van Dam · CC Attribution
- **Source image** : https://media.sketchfab.com/models/fa2d23cbce6642598f5e6e6f65b8b312/thumbnails/4bfad38ffded4ac4b4ebd690da2de7d3/113bfa45887242efb9525d8959cfe32e.jpeg

### Rosalind Franklin (ExoMars) — `rosalind`
- **Image d’aperçu** : `assets/models/rosalind.jpeg` (1920×1080, 231 Ko)
- **uid Sketchfab** : `4148a592193549c59c778a69fd45df5a`
- **Modèle** : [ESA ExoMars Rover](https://sketchfab.com/models/4148a592193549c59c778a69fd45df5a) — Marian · CC Attribution
- **Source image** : https://media.sketchfab.com/models/4148a592193549c59c778a69fd45df5a/thumbnails/0536511d279a483e855f0358f224b4e7/bfed5580f86348d8b59564f65fc49894.jpeg

### Chang'e-6 — `change6`
- **Image d’aperçu** : `assets/models/change6.jpeg` (1920×1080, 331 Ko)
- **uid Sketchfab** : `adb040629d854f8dbec71d297d627c6f`
- **Modèle** : [Chang'e 6](https://sketchfab.com/models/adb040629d854f8dbec71d297d627c6f) — thaweverything · —
- **Source image** : https://media.sketchfab.com/models/adb040629d854f8dbec71d297d627c6f/thumbnails/ba796078912449db8114519b2a6c9145/ef176d623231452f81e01e2e81c0d296.jpeg

### Chandrayaan-3 — `chandrayaan3`
- **Image d’aperçu** : `assets/models/chandrayaan3.jpeg` (1920×1080, 152 Ko)
- **uid Sketchfab** : `27e8d9b94f324e6b9a25b58e64317213`
- **Modèle** : [Chandrayaan-3 Vikram Lander](https://sketchfab.com/models/27e8d9b94f324e6b9a25b58e64317213) — Kulibin Space · CC Attribution
- **Source image** : https://media.sketchfab.com/models/27e8d9b94f324e6b9a25b58e64317213/thumbnails/619d3f07a5a44b92863dc2fed4885db7/74539a2fe0c940f8b78bbf19a8d4d0fb.jpeg

---

## Note d’intégration (pour le câblage HTML)

Dans `atlas.html`, la fonction `placeholder(stage, e)` construit la vignette d’une carte.
Aujourd’hui, quand l’engin a un `uid`, elle n’affiche qu’un bouton « Charger en 3D » sur un
fond rayé. Pour montrer l’aperçu avant le chargement 3D, on pourra :

- ajouter un champ optionnel à chaque objet de `engins.js` (ex. `mimg:"<id>.jpeg"`), ou
  simplement dériver le chemin de l’`id` (`assets/models/${e.id}.jpeg`) puisque le nom de
  fichier == `id` de l’objet ;
- afficher cette image en fond de `.c-stage` (comme l’`img.c-fbimg` déjà utilisée pour les
  photos de repli), avec le bouton « Charger en 3D » par-dessus ;
- au clic, `loadViewer(stage, e)` remplace l’aperçu par l’`iframe` Sketchfab (comportement actuel inchangé).

Aucune modification du HTML n’a été faite ici : seules les **images** ont été téléchargées
et **référencées**.
