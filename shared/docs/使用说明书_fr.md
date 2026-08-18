# Cube · Atelier de design 3D —— Mode d'emploi

## Manuel heuristique du niveau débutant à l'expert (Version Web · Version PC · Version Android, universel)

> Ce livre n'est pas une simple liste de fonctionnalités froide et impersonnelle, mais un manuel **que l'on peut suivre pour apprendre, pratiquer et réfléchir**.
> Nous supposons que vous n'avez jamais touché à la conception 3D, et même jamais utilisé de logiciel professionnel. Nous serons comme un professeur assis à côté de vous,
> en commençant par « qu'est-ce que la 3D », en utilisant des questions pour guider votre réflexion, des analogies pour vous aider à construire votre intuition, et des exercices pour consolider votre pratique,
> pour finalement vous faire passer de « savoir cliquer sur des boutons » à « pouvoir créer de manière indépendante ».

> 📦 **Un livre, quatre formes** : cet outil dispose de trois versions de distribution — Version Web, Version PC (Windows) et Version Android,
> parmi lesquelles la Version Web se divise automatiquement en **mode souris** et **mode tactile** selon votre appareil.
> Ce livre **couvre simultanément ces quatre formes** ; partout où les opérations diffèrent, une « annotation de forme » vous indiquera clairement ce que chaque plateforme doit faire.

---

## Au premier lancement : Conditions d'utilisation et Politique de confidentialité

Quelle que soit la plateforme utilisée, le **premier lancement** de cet outil affiche une porte de consentement « **Conditions d'utilisation et Politique de confidentialité** » :

- La page liste trois documents : le « Conditions d'utilisation », l'« Avertissement » et la « Politique de confidentialité » (cliquez sur les liens pour voir le texte intégral) ;
- Vous devez **d'abord lire et cocher l'acceptation de toutes les clauses**, puis cliquer sur « **Accepter et continuer** » pour accéder à l'éditeur ;
- Si vous choisissez « **Refuser et quitter** », le programme tentera de se fermer directement ; **le logiciel ne peut pas être utilisé**.
  - Dans la Version Web, la plupart des navigateurs bloquent les scripts qui ferment automatiquement une page que vous avez ouverte volontairement. Un panneau d'échec de fermeture affichant « **Les conditions doivent être acceptées pour utiliser** » s'affiche alors ; cliquez sur « **Relire** » pour revenir à la porte de consentement et relire puis accepter.

> ⚠️ Ceci est une étape préalable obligatoire : tant que vous n'avez pas accepté, aucune fonction n'est disponible. Veuillez faire attention à cette fenêtre lors du premier lancement, et ne la prenez pas pour un blocage.

---

## Mode d'emploi de ce manuel
> Astuce : cliquez sur la « Table des matières » au début du manuel pour accéder au chapitre correspondant ; les boutons « chapitre précédent / chapitre suivant » (◀ ▶) du lecteur de manuel se trouvent dans la **barre inférieure**, visibles **uniquement en forme tactile**, permettant de feuilleter les chapitres dans l'ordre sans revenir à la table des matières. Lorsqu'un appareil tactile ou un PC appuie sur le bouton de retour, il ferme d'abord les notes (une demande s'affiche en cas de contenu non enregistré), puis ferme la table des matières, et enfin quitte le manuel pour afficher les paramètres.

| Élément | Description |
| --- | --- |
| Public visé | Utilisateurs débutants ; également les amateurs souhaitant progresser de manière systématique |
| Style pédagogique | Heuristique : d'abord demander pourquoi, ensuite expliquer comment faire, enfin donner un exercice |
| Périmètre du contenu | Couvre toutes les fonctionnalités de l'éditeur (interface, graphiques, couleurs, transformations, texte, pinceau, gomme, points de vue, raccourcis, fichiers, avancé et pratique) |
| Formes applicables | Couverture complète des **quatre formes : Version Web (souris) / Version Web (tactile) / Version PC (Windows) / Version Android** |
| Référentiel du système de coordonnées | Ce livre **se conforme toujours aux annotations d'axe réellement affichées sur l'interface** (annotations de la page : X bleu = avant-arrière, Y rouge = gauche-droite, Z vert = hauteur, axe Z vers le haut). L'implémentation interne du code diffère des annotations de la page ; les lecteurs ordinaires n'ont pas à s'en soucier |
| Recommandation de lecture | Lisez d'abord [Chapitre 0 : Quatre formes et comment lire ce livre](jump:Chapitre 0 : Quatre formes et comment lire ce livre), et identifiez quelle plateforme vous utilisez ; lisez les quatre premières parties dans l'ordre ; les huit parties suivantes peuvent être consultées selon vos besoins. Les sections « Réfléchissez » et « Entraînez-vous » à la fin de chaque chapitre doivent impérativement être pratiquées |
| Adresse en ligne | [https://cub3d-editor.cn/Web/index.html](https://cub3d-editor.cn/Web/index.html) (recommandé en Chine, accès direct plus rapide) ou [https://yushichadao.github.io/Cub3D-Editor/Web/index.html](https://yushichadao.github.io/Cub3D-Editor/Web/index.html) (à l'étranger) |
| Site Web officiel | [https://cub3d-editor.cn](https://cub3d-editor.cn) (Chine, recommandé pour un accès direct) ou [https://yushichadao.github.io/Cub3D-Editor](https://yushichadao.github.io/Cub3D-Editor) (à l'étranger ; présentation du produit, commutation en neuf langues, entrée de téléchargement) |
| Dépôt du projet | [https://github.com/yushichadao/Cub3D-Editor](https://github.com/yushichadao/Cub3D-Editor) (code source, paquets d'installation et cette documentation s'y trouvent) |

**Conventions des annotations de forme**

Chaque fois que les opérations diffèrent selon les plateformes dans tout le livre, les quatre annotations suivantes apparaissent. **Lisez uniquement la ligne correspondant à votre appareil**, vous pouvez ignorer les autres :

| Annotation | Signification | Appareils typiques |
| --- | --- | --- |
| 🖥️ **Web · Souris** | Ouvert dans un navigateur, et le système dispose d'une souris/pavé tactile | Ordinateur de bureau, ordinateur portable |
| 📱 **Web · Tactile** | Ouvert dans un navigateur, et l'appareil est tactile | Navigateur de téléphone, tablette |
| 💻 **Version PC** | Programme de bureau Windows téléchargé et installé (.exe) | Ordinateur Windows |
| 🤖 **Version Android** | Application mobile installée (.apk) | Téléphone et tablette Android |

💡 Si un paragraphe d'opération **ne comporte pas** d'annotation de forme, cela signifie que **les quatre plateformes sont entièrement identiques** ; suivez simplement.

**Liens de saut (jump:) — comment cela fonctionne**

Chaque « Chapitre X … » de la table des matières est un lien de saut cliquable qui vous mène à ce chapitre. La correspondance **ne distingue pas les majuscules/minuscules, les espaces ni la ponctuation** (guillemets, parenthèses, deux-points chinois/anglais, etc.) — même si le texte du lien diffère du titre d'un signe de ponctuation ou deux, le système trouve quand même la cible avec une règle souple « retirer la ponctuation et les espaces, ne garder que lettres, chiffres et caractères chinois-japonais-coréens » ; si la correspondance exacte échoue, la souple s'applique automatiquement, donc les liens ne « sautent » pratiquement jamais. Si la cible n'est vraiment pas trouvée, rien ne se passe — sans erreur.

**Conventions des symboles**
- 💡 Astuce : expérience pour gagner du temps
- ❓ Réfléchissez : questions pour guider votre réflexion
- ✏️ Entraînez-vous : exercices pratiques
- ⚠️ Attention : pièges faciles à éviter

---

## Table des matières générale

**Partie Zéro : Formes (identifiez d'abord votre version)**

- [Chapitre 0 : Quatre formes et comment lire ce livre](jump:Chapitre 0 : Quatre formes et comment lire ce livre)

**Partie Un : Démarrage (prise en main pour débutants)**

- [Chapitre 1 : Redécouvrir la « 3D » : à partir d'une photo](jump:Chapitre 1 : Redécouvrir la « 3D » : à partir d'une photo)
- [Chapitre 2 : Pour bien faire, ouvrez cet outil](jump:Chapitre 2 : Pour bien faire, ouvrez cet outil)
- [Chapitre 3 : Vue d'ensemble de l'interface : les cinq espaces devant vous](jump:Chapitre 3 : Vue d'ensemble de l'interface : les cinq espaces devant vous)
- [Chapitre 4 : Système de coordonnées : les trois lignes X / Y / Z indiquées sur la page web](jump:Chapitre 4 : Le système de coordonnées : les trois traits marqués X / Y / Z sur la page web)
- [Chapitre 5 : Faites-le vous-même : votre première œuvre 3D](jump:Chapitre 5 : Passons à la pratique : votre première œuvre 3D)
- [Chapitre 6 : Enregistrement et partage : capture d'écran, exportation et sauvegarde](jump:Chapitre 6 : Sauvegarde et partage : capture, exportation et sauvegarde)

**Partie Deux : Bases d'opération (sélection · transformation · annulation)**

- [Chapitre 7 : L'art de sélectionner des objets : sélection simple, multiple et par cadre](jump:Chapitre 7 : L'art de sélectionner les objets : sélection simple, multiple et par cadre)
- [Chapitre 8 : Le trio des transformations : déplacer, pivoter, redimensionner](jump:Chapitre 8 : Le trio des transformations : déplacer, pivoter, redimensionner)
- [Chapitre 9 : Modes de transformation et mise à l'échelle proportionnelle](jump:Chapitre 9 : Modes de transformation et redimensionnement proportionnel)
- [Chapitre 10 : Annulation et historique : l'assurance de tester sans crainte](jump:Chapitre 10 : Annulation et historique : l'assurance de l'essai-erreur)

**Partie Trois : L'univers des graphiques (comment utiliser 20 + 20 types)**

- [Chapitre 11 : Vue d'ensemble des graphiques 3D (comment classer les 20 types)](jump:Chapitre 11 : Aperçu des formes 3D（comment classer les 20 types）)
- [Chapitre 12 : Vue d'ensemble des graphiques 2D (les 20 types et la pensée « autocollant »)](jump:Chapitre 12 : Aperçu des graphiques 2D（20 types et la pensée « autocollant »）)
- [Chapitre 13 : Détails des paramètres de chaque graphique 3D (1) : corps de base](jump:Chapitre 13 : Détails des paramètres de chaque graphique 3D（1re partie）: formes de base)
- [Chapitre 14 : Détails des paramètres de chaque graphique 3D (2) : formes spéciales](jump:Chapitre 14 : Détails des paramètres de chaque graphique 3D（2e partie）: formes spéciales)
- [Chapitre 15 : « Debout » et « allongé » : la différence essentielle entre 3D et 2D](jump:Chapitre 15 : « Debout » et « couché » : la différence essentielle entre 3D et 2D)

**Partie Quatre : Couleur et matériau**

- [Chapitre 16 : Initiation aux couleurs : le jeu de l'œil humain et de la lumière](jump:Chapitre 16 : Initiation à la couleur : le jeu de l'œil humain et de la lumière)
- [Chapitre 17 : 27 couleurs prédéfinies : coloriez en un clic](jump:Chapitre 17 : 27 couleurs prédéfinies : une touche pour colorer)
- [Chapitre 18 : Couleurs personnalisées : HEX, HSV et pipette d'écran](jump:Chapitre 18 : Couleur personnalisée : HEX, HSV et pipette d'écran)
- [Chapitre 19 : 12 motifs de texture : donnez une histoire aux surfaces](jump:Chapitre 19 : 12 motifs de texture : donner une histoire aux surfaces)
- [Chapitre 20 : Téléchargement d'images de texture et opacité](jump:Chapitre 20 : Coller une image importée et opacité)

**Partie Cinq : Texte et image**

- [Chapitre 21 : Ajouter du texte : faites parler la scène](jump:Chapitre 21 : Ajouter du texte : faire parler la scène)
- [Chapitre 22 : Police, taille, graisse et orientation horizontale/verticale](jump:Chapitre 22 : Police, taille, graisse et orientation horizontal/vertical)
- [Chapitre 23 : Objet image : mettez une photo dans le monde 3D](jump:Chapitre 23 : L'objet image : intégrer une photo dans le monde 3D)

**Partie Six : Pinceau et gomme**

- [Chapitre 24 : Pinceau 2D : dessiner des lignes au sol](jump:Chapitre 24 : Pinceau 2D : tracer sur le sol)
- [Chapitre 25 : Pinceau 3D et plan de référence](jump:Chapitre 25 : Pinceau 3D et plan de référence)
- [Chapitre 26 : Gomme : globale et partielle](jump:Chapitre 26 : Gomme : global et local)

**Partie Sept : Points de vue et observation**

- [Chapitre 27 : Sept points de vue prédéfinis : changez d'angle pour voir le monde](jump:Chapitre 27 : Sept angles de vue prédéfinis : voir le monde sous un autre angle)
- [Chapitre 28 : Masquer les辅助 et plein écran](jump:Chapitre 28 : Masquer les repères et plein écran)

**Partie Huit : Efficacité · Raccourcis (faites « voler » vos mains)**

- [Chapitre 29 : Pourquoi mémoriser les raccourcis : les intérêts composés de l'efficacité](jump:Chapitre 29 : Pourquoi mémoriser les raccourcis : les intérêts composés de l'efficacité)
- [Chapitre 30 : Opérations souris et gestuelles : expliquées pour les quatre formes](jump:Chapitre 30 : Opérations souris et gestuelles : les quatre formes expliquées)
- [Chapitre 31 : Opérations à une touche et combinaisons avec Shift](jump:Chapitre 31 : Opérations à une touche et combinaisons Shift)
- [Chapitre 32 : Barres de glissement / champs de saisie et combinaisons avec Ctrl](jump:Chapitre 32 : Curseur / champ de saisie et combinaisons Ctrl)

**Partie Neuf : Contrôles de transformation (les flèches qui « parlent »)**

- [Chapitre 33 : Première rencontre avec les contrôles de transformation : trois « outils de préhension »](jump:Chapitre 33 : Première rencontre avec le contrôle de transformation : trois « outils de préhension »)
- [Chapitre 34 : Mode translation : « attrapez » l'objet avec les flèches pour le déplacer](jump:Chapitre 34 : Mode translation : « attraper » l'objet avec les flèches et le déplacer)
- [Chapitre 35 : Mode rotation : l'anneau détermine « autour de quel axe tourner »](jump:Chapitre 35 : Mode rotation : l'anneau décide « autour de quel axe on tourne »)
- [Chapitre 36 : Mode mise à l'échelle : poignées carrées et interrupteur « proportionnel »](jump:Chapitre 36 : Mode mise à l'échelle : poignées carrées et interrupteur « proportionnel »)

**Partie Dix : Groupe (gérer « un groupe » d'objets à la fois)**

- [Chapitre 37 : Sélectionner un groupe d'un coup : découvrez l'« ensemble de sélection »](jump:Chapitre 37 : Sélectionner une foule d'un coup : connaître « l'ensemble de sélection »)
- [Chapitre 38 : Faire bouger tout un groupe : le « point de contrôle principal » de la transformation multiple](jump:Chapitre 38 : Tout bouger ensemble : le « point maître » de la transformation multiple)
- [Chapitre 39 : Production de masse : copie, clonage et « réseau »](jump:Chapitre 39 : Production de masse : copie, clonage et « réseau »)

**Partie Onze : L'œuvre quitte l'écran (partage · collaboration · alignement)**

- [Chapitre 40 : Enregistrement et partage : faites quitter l'écran à votre œuvre](jump:Chapitre 40 : Sauvegarde et partage : faire sortir l'œuvre de l'écran)

**Partie Douze : Pratique (construire une scène complète à partir de zéro)**

- [Chapitre 41 : Projet 1 : construire une petite maison](jump:Chapitre 41 : Projet 1 : construire une petite maison)
- [Chapitre 42 : Projet 2 : fabriquer une slogan en relief](jump:Chapitre 42 : Projet 2 : fabriquer une devise en texte 3D)
- [Chapitre 43 : Projet 3 : concevoir un emblème / une icône](jump:Chapitre 43 Projet trois : concevoir un emblème / une icône)
- [Chapitre 44 : Projet 4 : scène composite « Ma petite cour »](jump:Chapitre 44 Projet quatre : scène composite « Ma petite cour »)

**Partie Treize : Dépannage et annexes**

- [Chapitre 45 : Guide de dépannage des problèmes courants](jump:Chapitre 45 Manuel de dépannage des problèmes courants)
- [Chapitre 46 : Glossaire (français-anglais)](jump:Chapitre 46 Glossaire（chinois-anglais）)
- [Chapitre 47 : Tableau rapide des raccourcis](jump:Chapitre 47 : Tableau rapide des raccourcis)
- [Chapitre 48 : Index des graphiques · motifs · couleurs](jump:Chapitre 48 : Index des formes · motifs · couleurs)

**Partie Quatorze : Notes · Multilangue**

- [Chapitre 49 : Lire et noter : les notes dans le manuel](jump:Chapitre 49 : Lire et noter : les notes dans le manuel)
- [Chapitre 50 : Faire « flotter » les notes à l'écran](jump:Chapitre 50 : Faire « flotter » les notes à l'écran)
- [Chapitre 51 : Multilangue : le manuel « parle » aussi votre langue](jump:Chapitre 51 : Multilingue : le manuel « parle » aussi votre langue)

---

## Préface : à vous qui n'avez jamais touché à la 3D

Peut-être que lorsque vous ouvrez cette page web, vous ressentez un peu de tension : la 3D ? la modélisation ? n'est-ce pas un logiciel qui prend longtemps à apprendre ?

Respirez profondément. 🙂

L'outil devant vous est un **éditeur 3D purement web** — aucune installation, aucun pilote de carte graphique, aucun cours nécessaire. Il réduit « créer un monde 3D » au niveau de « cliquer, glisser-déposer, saisir quelques mots ».

Beaucoup de débutants bloquent à la première étape parce qu'ils sont effrayés par une série de termes : axe de coordonnées, transformation, grille, texture… En réalité, ils sont très proches de la vie quotidienne :

- **L'axe de coordonnées**, c'est comme les trois règles invisibles « avant-arrière, gauche-droite, haut-bas » dans votre chambre ;
- **La transformation**, c'est « déplacer, tourner, agrandir ou réduire » ;
- **La grille**, ce sont les carreaux au sol, qui vous aident à juger la taille et la distance ;
- **La texture**, c'est coller une image sur la surface d'un objet, comme coller du papier peint sur un mur.

Ce livre décompose ces concepts un par un, et les explique avec des mots que vous pouvez comprendre. Nous n'empruntons pas l'ancienne voie « mémoriser les définitions d'abord, puis opérer », mais **vous faisons d'abord créer des choses, puis revenons comprendre pourquoi elles sont ainsi**. C'est l'« approche heuristique ».

Après avoir lu ce livre, vous serez capable de :
1. Placer, ajuster et colorier indépendamment n'importe quel graphique ;
2. Enrichir votre scène avec du texte, des images et des pinceaux ;
3. Porter l'efficacité à un niveau « fluide comme l'eau » grâce aux raccourcis ;
4. Réaliser des œuvres complètes, de la maison au slogan en passant par l'emblème.

Êtes-vous prêt ? Consacrons cinq minutes à identifier la version que vous avez entre les mains.

---

# Partie Zéro : Formes (identifiez d'abord votre version)

## Chapitre 0 : Quatre formes et comment lire ce livre

Avant de vous lancer, prenez trois minutes pour confirmer : **quelle forme utilisez-vous maintenant ?** Cela détermine, dans chaque chapitre suivant, quelle annotation vous devez lire.

### 0.1 Trois versions de distribution, quatre formes d'utilisation

Cet outil propose **trois versions**, mais comme la Version Web s'adapte automatiquement à l'appareil, il existe en réalité **quatre formes** d'utilisation :

| Forme | Comment l'obtenir | Comment confirmer que vous l'utilisez |
| --- | --- | --- |
| 🖥️ **Web · Souris** | Ouvrir l'adresse en ligne dans un navigateur | Un curseur de souris à l'écran ; la zone d'aide « raccourcis clavier » s'affiche dans la fenêtre contextuelle « Paramètres → Opérations rapides » (ne réside dans aucun panneau) |
| 📱 **Web · Tactile** | Ouvrir la même adresse dans le navigateur d'un téléphone/tablette | Une barre d'outils en bas affiche les boutons « Sélection par cadre » et « Tout sélectionner » ; un tableau d'aide « Opérations gestuelles » est présent |
| 💻 **Version PC** | Télécharger et exécuter l'installation ou la décompression du `.exe` | Le coin supérieur droit de la fenêtre possède des boutons auto-dessinés « Réduire / Agrandir / Fermer » |
| 🤖 **Version Android** | Télécharger et installer le `.apk` | En bas se trouvent « Sélection par cadre » et « Tout sélectionner » ; appuyer sur le bouton retour du téléphone affiche une confirmation de sortie |

💡 **La Version Web se détermine automatiquement** : elle détecte si votre appareil est un « pointeur précis (souris) » ou un « pointeur grossier (doigt) », puis bascule automatiquement vers le mode correspondant, **vous n'avez aucun réglage à faire**.

⚠️ Si vous souhaitez **prévisualiser à quoi ressemble la version tactile** dans le navigateur de votre ordinateur (par exemple pour une démonstration pédagogique), ajoutez `?touch` après l'URL, par exemple :
[`https://cub3d-editor.cn/Web/index.html?touch`](https://cub3d-editor.cn/Web/index.html?touch) (Chine) ou [`https://yushichadao.github.io/Cub3D-Editor/Web/index.html?touch`](https://yushichadao.github.io/Cub3D-Editor/Web/index.html?touch) (à l'étranger). À l'inverse, la Version Android est par défaut toujours en disposition tactile.

### 0.2 Tableau comparatif global des capacités des quatre formes

Ce tableau est le tableau de référence rapide le plus important de tout le livre. **Il est recommandé de jeter un œil pour s'en faire une idée, puis de revenir le consulter face à une fonction précise.**

| Fonction | 🖥️ Web · Souris | 📱 Web · Tactile | 💻 Version PC | 🤖 Version Android |
| --- | :---: | :---: | :---: | :---: |
| Tous les graphiques / couleurs / transformations / texte / pinceau | ✅ | ✅ | ✅ | ✅ |
| Raccourcis clavier | ✅ Complet | ⛔ Pas de clavier physique | ✅ Complet | ⛔ Pas de clavier physique |
| Zone d'aide « raccourcis clavier » | ✅ Affichée | ⛔ Masquée | ✅ Affichée | ⛔ Masquée |
| Tableau d'aide « Opérations gestuelles » | ⛔ Masqué | ✅ Affiché | ⛔ Masqué | ✅ Affiché |
| Boutons « Sélection par cadre » / « Tout sélectionner » | ⛔ Remplacés par raccourcis | ✅ Affichés | ⛔ Remplacés par raccourcis | ✅ Affichés en permanence |
| Bouton « Plein écran » | ✅ Plein écran web | ✅ Plein écran web | ⛔ Utiliser F11 / bouton d'agrandissement de fenêtre | ⛔ Déjà application plein écran |
| Réduction/agrandissement/fermeture de fenêtre | ⛔ Ceux du navigateur | ⛔ | ✅ Propres à l'application | ⛔ |
| Calque de note épinglé (calque dans la page, non fenêtre indépendante) | ✅ | ✅ | ✅ | ✅ |
| Importation par glisser-déposer de fichiers | ✅ | ⛔ | ✅ | ⛔ |
| Récupération après crash / enregistrement automatique | ✅ | ✅ | ✅ | ✅ |
| Pipette d'écran (nom du bouton « Pipette d'écran », l'échantillonnage tactile se fait réellement dans le canevas) | ✅ N'importe où à l'écran | ✅ Échantillonnage dans le canevas uniquement | ✅ N'importe où à l'écran | ✅ Échantillonnage dans le canevas uniquement |
| Confirmation d'enregistrement à la sortie (fermeture de fenêtre / sortie) | ✅ | ✅ | ✅ | ⛔ (via confirmation du bouton retour) |
| Confirmation de sortie échelonnée par bouton retour du téléphone | ⛔ | ⛔ | ⛔ | ✅ |
| Utilisation hors ligne | ⛔ Connexion requise | ⛔ Connexion requise | ✅ Totalement hors ligne | ✅ Totalement hors ligne |

### 0.3 La différence la plus essentielle : les doigts n'ont ni « clic droit » ni « molette »

Parmi les quatre formes, la seule chose qui demande réellement de changer votre mémoire musculaire est : **le mode de saisie**.

La souris a trois signaux indépendants (bouton gauche, bouton droit, molette), le doigt n'en a qu'un (appuyer-déplacer-relâcher). La saisie tactile doit donc distinguer les intentions par **le nombre de doigts** :

| Ce que vous voulez faire | 🖥️💻 Souris (Web · Souris / PC) | 📱🤖 Tactile (Web · Tactile / Android) |
| --- | --- | --- |
| Sélectionner un objet | Clic gauche | Toucher d'un doigt |
| Placer un graphique | Clic gauche sur le sol | Toucher d'un doigt sur le sol |
| Pivoter la vue | Glisser avec le **bouton droit** | Glisser d'**un doigt** dans l'espace vide |
| Translater la vue | Glisser avec le **bouton du milieu** | Glisser **deux doigts** ensemble |
| Zoomer la vue | Défilement de la **molette** | Pincer / écarter **deux doigts** |
| Sélection multiple | `Shift` + clic gauche | Cliquer « Tout sélectionner », ou utiliser « Sélection par cadre » |
| Sélection par cadre | Glisser directement un rectangle avec le bouton gauche | D'abord cliquer le bouton « Sélection par cadre », puis glisser d'un doigt |

💡 **À retenir en une phrase** : **la souris regarde « quel bouton presser », le doigt regarde « combien de doigts utiliser ».**

### 0.4 Les deux boutons exclusifs de la saisie tactile

Parce qu'il n'y a pas de clavier, la forme tactile (📱 Web · Tactile et 🤖 Android) ajoute deux boutons dans la barre d'outils en bas, qui remplacent `Ctrl+A` et le « glisser-déposer de cadre » :

- **« Tout sélectionner »** : équivaut à `Ctrl + A` côté souris, sélectionne en un clic tous les objets de la scène ;
- **« Sélection par cadre »** : cliquez pour entrer en mode sélection par cadre (le bouton devient bleu), puis faites glisser un rectangle d'un doigt ; les objets entourés seront sélectionnés ensemble.
  ⚠️ **Attention** : la sélection par cadre **se quitte automatiquement après une sélection** (le bouton reprend sa couleur d'origine). Pour recadrer, vous devez **cliquer à nouveau** sur « Sélection par cadre ». C'est conçu pour éviter les fausses manipulations.

> 🤖 **Limite de la Version Android** : les boutons « Sélection par cadre » et « Tout sélectionner » ne sont disponibles que dans les modes **sélection / transformation** ; lorsque vous êtes dans les modes pinceau, texte, gomme ou autres outils, ils sont **grisés et désactivés** avec le message « Veuillez d'abord basculer en mode « Sélection/Transformation » ». C'est pour éviter un conflit avec la logique de clic de l'outil, et non une fonction manquante.

### 0.5 Exclusif à la Version PC : utilisez-le comme un « vrai logiciel »

La Version PC n'est pas simplement « une page web encapsulée », elle offre en plus les capacités propres à un logiciel de bureau :

- **Contrôle de fenêtre** : boutons auto-dessinés de réduction / agrandissement / fermeture en haut à droite ;
- **Importation par glisser-déposer** : faites directement glisser un projet .json dans la fenêtre pour l'ouvrir, sans passer par la boîte de dialogue « Importer » ; la 💻 Version PC prend également en charge le glisser-déposer de **fichiers image** dans la fenêtre, qui sont placés comme objets image à l'insertion ;
- **Récupération après crash et enregistrement automatique** : après une fermeture inattendue et une réouverture, un message « Une session non enregistrée a été détectée » s'affiche, vous demandant si vous souhaitez récupérer la progression enregistrée automatiquement (avec le nombre actuel d'objets affiché) ; fermer directement abandonne, mais **il est toujours recommandé d'exporter activement** ;
- **Calque de note épinglé** : vous pouvez déployer une note en une carte flottante **toujours au premier plan** (calque dans la page), pour consulter d'autres documents tout en prenant des notes ;
- **Notes** : vous pouvez sélectionner du texte dans le corps du manuel pour ajouter une note, et déployer la note en calque épinglé (voir les détails à la Partie Treize).

### 0.6 Exclusif à la Version Android : bouton retour et protection de sortie

Le point le plus important à surveiller pour la Version Android est le comportement du **bouton retour du téléphone**, qui est échelonné :

> Appuyer sur retour → si des notes sont ouvertes, les fermer une à une (une demande s'affiche en cas de contenu non enregistré) → fermer ensuite la table des matières → quitter ensuite le manuel → enfin demander si l'on quitte l'application.

Lors de la sortie de l'application, une boîte de confirmation s'affiche, vous offrant trois choix : **Enregistrer et quitter / Quitter sans enregistrer / Annuler**. C'est pour éviter qu'une scène patiemment construite ne soit effacée par une fausse manipulation.

💻 La **Version PC et la Version Web** disposent également d'une « confirmation d'enregistrement à la sortie » : lorsque vous **fermez la fenêtre / quittez le programme**, si la scène n'est pas enregistrée, une boîte de confirmation s'affiche — la Version PC affiche « La scène comporte des modifications non enregistrées / Enregistrer avant de fermer ? », la Version Web affiche « Voulez-vous enregistrer la scène actuelle ? Le contenu non enregistré sera perdu après la sortie. » — et propose trois options (dans l'ordre « Annuler / Ne pas enregistrer / Enregistrer ») ; si vous n'avez pas choisi d'emplacement d'enregistrement ou si l'enregistrement échoue, une confirmation supplémentaire demande si vous voulez toujours quitter. Cela diffère du déclenchement de la « sortie échelonnée par bouton retour » d'Android, mais le but est identique — protéger votre œuvre contre une perte accidentelle.

💡 La Version Android **n'a pas de bouton « Plein écran »**, car elle est déjà une application fonctionnant en plein écran.

### 0.7 À propos de la « connexion » et de la « sécurité des données »

| | Connexion requise ? | Où sont les données ? |
| --- | --- | --- |
| 🖥️📱 Version Web | Oui (lors du chargement de la page) | Tous les calculs sont effectués localement sur votre appareil, **aucune donnée d'œuvre n'est téléversée** |
| 💻 Version PC | **Totalement inutile** | Tout est sur la machine locale |
| 🤖 Version Android | **Totalement inutile** | Tout est sur la machine locale |

Les trois versions **ne transmettent jamais votre œuvre à aucun serveur**. La Version Web a besoin du réseau uniquement pour télécharger la page ; une fois ouverte, toute la création se déroule sur votre propre appareil.

❓ **Réfléchissez** : si vous devez donner un cours à des élèves dans une salle sans réseau, quelle version choisiriez-vous ? (Indice : voir la dernière ligne du tableau ci-dessus)

✏️ **Entraînez-vous** : en comparant le tableau global 0.2, cherchez sur votre propre appareil — pouvez-vous voir le bouton « Sélection par cadre » ? pouvez-vous voir la zone « raccourcis clavier » ? Confirmez ainsi laquelle des quatre formes vous utilisez, et retenez-la. Par la suite, à chaque annotation de forme dans les chapitres, vous saurez quelle ligne lire.

---

# Partie Un : Démarrage (prise en main pour débutants)

## Chapitre 1 : Redécouvrir la « 3D » : à partir d'une photo

### 1.1 En quoi la 2D et la 3D diffèrent-elles ?

Prenez votre téléphone et photographiez une table. La photo est en **2D** : elle a une largeur, une hauteur, mais au toucher elle est plate — elle a seulement « l'air » d'avoir du relief.

Maintenant contournez la table pour la regarder de côté. La vraie table est en **3D** : elle a une largeur, une hauteur, et aussi une **profondeur** (le tronçon des pieds qui s'étend vers l'avant). Lorsque vous bougez, la forme vue change ; la photo, elle, reste figée pour toujours.

💡 **À retenir en une phrase** : la 2D est une « image », la 3D est un « espace réel dans lequel vous pouvez vous déplacer ».

### 1.2 Cette page web vous offre une « scène 3D »

Ouvrez l'éditeur : le canevas au centre est une scène 3D. Vous choisissez un graphique à gauche, vous cliquez sur le « sol », et il « tombe » vraiment dans la scène — vous pouvez contourner pour le voir de derrière, le soulever, ou le survoler de haut en bas.

❓ **Réfléchissez** : si vous devez décrire à un ami « une balle rouge à gauche d'une boîte bleue », laquelle est moins sujette à malentendu, une photo 2D ou une scène 3D ? Pourquoi ?

### 1.3 Pourquoi faire une « version légère triplateforme » ?

Les logiciels 3D traditionnels (comme Blender, Maya) sont puissants, mais leurs paquets d'installation font souvent plusieurs centaines de mégaoctets, avec des interfaces ultra-denses. Cet outil a transformé les capacités de base en un moteur léger, encapsulé en trois versions :

- 🖥️📱 **Version Web** : ouvrez l'URL et c'est prêt, fermez et partez, aucun espace disque occupé ;
- 💻 **Version PC** : installez une fois, ensuite **totalement hors ligne**, et peut ouvrir des fichiers par glisser-déposer ;
- 🤖 **Version Android** : installez-la dans le téléphone, modélisez n'importe où pendant vos trajets.

Les avantages communs des trois :

- Tous les calculs sont effectués localement sur votre propre appareil, **aucune donnée n'est téléversée** ;
- L'exportation produit des fichiers JSON ordinaires et des images PNG, faciles à sauvegarder et partager ;
- **Les fichiers de projet sont compatibles entre les trois plateformes** — le `.json` que vous exportez sur téléphone peut être modifié dans la Version PC.

💡 Ceci est important : **une même œuvre peut être poursuivie d'une plateforme à l'autre**. Ayez une inspiration sur téléphone et esquissez un brouillon, puis peaufinez-le sur PC en rentrant.

✏️ **Entraînez-vous** : confirmez votre forme (voir [Chapitre 0](jump:Chapitre 0 : Quatre formes et comment lire ce livre)), ouvrez l'outil, et contentez-vous de voir le canevas central et les panneaux autour. Ne vous précipitez pas pour opérer, « familiarisez-vous simplement avec l'environnement ».

---

## Chapitre 2 : Pour bien faire, ouvrez cet outil

### 2.1 Trois façons d'y entrer, choisissez-en une

#### 🖥️📱 Façon 1 : Version Web (la plus rapide, zéro installation)

Ouvrez directement l'adresse publique ci-dessous dans un navigateur :

> 🌐 **Adresse en ligne** : [https://cub3d-editor.cn/Web/index.html](https://cub3d-editor.cn/Web/index.html) (recommandé en Chine) ou [https://yushichadao.github.io/Cub3D-Editor/Web/index.html](https://yushichadao.github.io/Cub3D-Editor/Web/index.html) (à l'étranger)

Copiez l'URL dans la barre d'adresse de n'importe quel navigateur moderne, et appuyez sur Entrée pour accéder à l'interface principale. Téléphone, tablette et ordinateur peuvent l'utiliser, tant qu'il y a un réseau et un navigateur. **Il détermine automatiquement si vous êtes un appareil souris ou tactile**, et bascule vers la disposition correspondante.

💡 Au premier lancement, un chargement très bref a lieu (initialisation du moteur 3D) ; une fois la couche de chargement disparue, l'interface principale apparaît.

#### 💻 Façon 2 : Version PC (Windows, hors ligne possible)

Téléchargez sur la page **Releases** du dépôt du projet. Il y a deux types de paquets, choisissez selon vos besoins :

| Type de paquet | Nom de fichier ressemblant à | Caractéristiques | Public recommandé |
| --- | --- | --- | --- |
| **Version installable** | `...-Setup-1.1.0.exe` | Double-clic pour installer, crée un menu Démarrer et un raccourci bureau, désinstallable via « Applications et fonctionnalités » | Ordinateur principal que vous utilisez sur le long terme |
| **Version portable** | `...-1.1.0-portable.exe` | **Sans installation**, double-clic pour exécuter directement, peut être placée sur clé USB | Ordinateur public, sans droits administrateur, vouloir transporter avec soi |

> 📥 Adresse de téléchargement : [https://github.com/yushichadao/Cub3D-Editor/releases](https://github.com/yushichadao/Cub3D-Editor/releases)

⚠️ Windows peut afficher « Éditeur inconnu » ou bloquer par SmartScreen — car le paquet d'installation n'est pas signé numériquement (courant pour un projet open source personnel). Cliquez « Plus d'informations » → « Exécuter quand même ».

#### 🤖 Façon 3 : Version Android (téléphone, hors ligne possible)

Toujours sur la page Releases, téléchargez le fichier `.apk`, transférez-le sur le téléphone puis cliquez pour installer.

⚠️ Avant l'installation, vous devez autoriser l'**installation d'applications de sources inconnues** dans « Paramètres → Sécurité » du téléphone (l'emplacement varie selon les marques, généralement dans les permissions de l'application qui installe).

### 2.2 Environnement d'exécution

| Forme | Exigences environnementales |
| --- | --- |
| 🖥️📱 Version Web | Navigateur moderne quelconque (Chrome, Edge, Firefox, Safari versions récentes) ; doit prendre en charge WebGL (appareils des ~5 dernières années le prennent généralement en charge) ; connexion requise pour ouvrir la page |
| 💻 Version PC | Windows 10 / 11 (64 bits) ; après installation **totalement hors ligne** utilisable |
| 🤖 Version Android | Android 6.0 et versions ultérieures ; après installation **totalement hors ligne** utilisable |

⚠️ **Attention** :
- 🖥️📱 Si la Version Web s'ouvre sur une page blanche, appuyez d'abord sur `F12` pour ouvrir la console et voir s'il y a des erreurs rouges ; essayer un autre navigateur résout souvent le problème.
- 💻 Si la Version PC affiche un écran blanc après le lancement, c'est généralement dû à un pilote de carte graphique trop ancien rendant WebGL indisponible ; mettez à jour le pilote de carte graphique.
- 🤖 Si l'installation de la Version Android est bloquée, vérifiez si l'installation de « sources inconnues » est autorisée.

### 2.3 Où regarder en premier

Une fois entré, votre regard devrait être entouré par cinq zones. Nous les détaillons une à une au chapitre suivant ; ici retenez une phrase : **« À gauche on choisit le matériau, au centre on crée, à droite on règle les paramètres, en haut on gère les fichiers, en bas on change de vue. »**

✏️ **Entraînez-vous** : en comparant la phrase ci-dessous, désignez à l'écran où se trouvent les cinq zones (barre supérieure / panneau gauche / canevas / panneau droit / barre inférieure).

---

## Chapitre 3 : Vue d'ensemble de l'interface : les cinq espaces devant vous

Nous divisons l'interface en cinq zones, chacune ayant sa fonction. Lisez tout en trouvant la position correspondante à l'écran.

### 3.1 Barre supérieure (tout en haut)

Une rangée horizontale de boutons, divisée en trois groupes :

- **Groupe fichier** : nouveau, importer, exporter, capture d'écran ;
- **Groupe édition** : annuler, refaire, copier, coller, cloner, effacer tout ;
- **Groupe affichage** : commutateur axe de coordonnées, commutateur surface de grille, commutateur sol, paramètres.

**Différences de la barre supérieure selon les plateformes** :

- 🖥️📱 **Version Web** : en plus des boutons ci-dessus, il y a un bouton « Plein écran » pour faire occuper toute la page à l'écran.
- 💻 **Version PC** : trois boutons de fenêtre auto-dessinés **Réduire / Agrandir / Fermer** en haut à droite de la fenêtre ; appuyer sur **F11** ou cliquer le bouton « Agrandir » de la barre de titre bascule entre **agrandissement / restauration de fenêtre** (pas de bouton « Plein écran » indépendant).
- 🤖 **Version Android** : **pas de bouton « Plein écran »** — l'application fonctionne déjà en plein écran, le garder n'a aucun sens.

💡 La plupart de ces boutons ont des raccourcis (comme `Ctrl+Z` pour annuler), traités ensemble dans la partie Efficacité plus loin.
⛔ 📱🤖 Les formes tactiles n'ayant pas de clavier physique, **cliquez directement sur les boutons** ; les boutons tactiles exclusifs « Tout sélectionner » et « Sélection par cadre » sont au 3.5.

### 3.2 Panneau gauche (prendre les ressources, choisir les outils)

Le panneau gauche comporte de haut en bas quatre zones :

1. **Graphiques 3D** : 20 formes solides (cube, sphère, cylindre…) ;
2. **Graphiques 2D** : 20 formes planes (cercle, cœur, flèche…), comme des autocollants ;
3. **Outils** : sélection/transformation, pinceau 3D, pinceau 2D, gomme, ajouter du texte, ajouter une image ;
4. **Modes de transformation** : translation, rotation, mise à l'échelle, ainsi que mise à l'échelle proportionnelle.

### 3.3 Canevas (scène centrale)

Tous les graphiques s'affichent ici. Les modes d'opération varient selon la forme :

- 🖥️💻 **Côté souris (Web · Souris / PC)** : glisser le **bouton droit** pour pivoter la vue, **molette** pour zoomer, **bouton gauche** pour sélectionner ou placer.
- 📱🤖 **Côté tactile (Web · Tactile / Android)** : glisser d'**un doigt** pour pivoter la vue, pincer **deux doigts** pour zoomer, glisser **deux doigts** pour translater, **toucher d'un doigt** pour sélectionner ou placer.

💡 La comparaison complète se trouve dans le tableau des modes de saisie de la [section 0.3 du Chapitre 0](jump:Chapitre 0 : Quatre formes et comment lire ce livre).

### 3.4 Panneau droit (réglage des paramètres après sélection)

Ce n'est qu'après avoir sélectionné un objet que le panneau droit « s'active » : changer la couleur, appliquer une texture, régler l'opacité, définir les valeurs de transformation, éditer le texte… C'est l'endroit où vous contrôlez finement votre œuvre.

### 3.5 Barre inférieure (tout en bas)

Une rangée de 7 boutons de vue : perspective, vue de dessus, vue de dessous, vue de face, vue arrière, vue gauche, vue droite. Changez d'angle d'un clic pour voir la scène.

📱🤖 **Le côté tactile ajoute deux boutons** :

- **« Tout sélectionner »** : sélectionne en un clic tous les objets de la scène (remplace `Ctrl + A` côté souris) ;
- **« Sélection par cadre »** : cliquez pour entrer en mode sélection par cadre, glissez un rectangle d'un doigt pour sélectionner un groupe d'objets. **Quitte automatiquement après le cadre**, recliquez pour recadrer.

🖥️💻 Le côté souris n'affiche pas ces deux boutons — car vous pouvez directement appuyer sur `Ctrl+A`, ou directement glisser-déposer un cadre avec le bouton gauche, sans bouton supplémentaire.

### 3.6 Aide des opérations rapides : consultez dans « Paramètres → Opérations rapides »

La liste des raccourcis / gestes n'est **pas affichée en permanence** sur l'interface. Les explications d'opérations correspondantes pour le côté souris et le côté tactile sont concentrées dans la fenêtre contextuelle « Paramètres → Opérations rapides » :

- 🖥️💻 **Côté souris** : la fenêtre affiche la liste « **Raccourcis clavier** » ;
- 📱🤖 **Côté tactile** : la fenêtre affiche le tableau comparatif « **Opérations gestuelles** ».

Pour consulter, cliquez le bouton « Paramètres » de la barre supérieure, puis choisissez « Opérations rapides ».

💡 C'est volontaire : ranger l'aide dans une fenêtre contextuelle plutôt que dans un panneau permanent évite d'occuper l'espace de création.

### 3.7 Que faire en écran étroit

Sur téléphone ou fenêtre étroite (largeur inférieure à environ 960 pixels), les panneaux gauche et droit **se replient automatiquement** ; cliquez sur le petit bouton du bord pour les déployer. La conception garantit que « même en petit écran, c'est utilisable ».

📱🤖 Le côté tactile entre généralement déjà en état replié ; ouvrez d'abord le panneau gauche pour prendre les ressources, et après placement repliez-le, pour obtenir le maximum d'espace de canevas.

❓ **Réfléchissez** : pourquoi « régler les paramètres » est placé à droite et « choisir les ressources » à gauche ? Derrière cela se trouve l'habitude commune de la plupart des logiciels de conception « matériau à gauche, paramètres à droite » ; êtes-vous d'accord ?


✏️ **À vous de pratiquer** :
- 🖥️💻 Survolez successivement chaque bouton de la barre supérieure avec la souris et vérifiez si une info-bulle (tooltip) apparaît.
- 📱🤖 Maintenez un appui prolongé (**long press**) sur chaque bouton de la barre supérieure, observez l'info-bulle ; puis repérez où se trouvent « Tout sélectionner » et « Sélection par cadre » dans la barre inférieure.

### 3.8 Style de thème : changer « d'habit » à l'interface

Dans « Réglages → Style de thème », vous avez le choix parmi **12 couleurs de thème**. Un simple clic applique le changement immédiatement, avec aperçu en direct, sans redémarrage :

| Thème | Nom | Thème | Nom |
| --- | --- | --- | --- |
| Neon | Bleu-violet néon | Gray | Gris sombre et calme |
| Sunset | Orange chaud du coucher | Light | Cyan-blanc limpide |
| Forest | Vert forêt | Aurora | Violet nuit profonde |
| Ember | Rouge braise | Bubblegum | Rouge séduisant |
| Slate | Jaune doré du crépuscule | Paper | Beige clair de l'aube |
| Sky | Vert menthe clair | Blossom | Jaune pâle et élégant |

💡 Votre choix est **mémorisé** : au prochain démarrage, le thème actuel est conservé et n'est pas remplacé par les réglages système.

---

## Chapitre 4 : Le système de coordonnées : les trois traits marqués X / Y / Z sur la page web

C'est le chapitre le plus crucial de tout le livre. Beaucoup de logiciels 3D découragent les débutants dès le « système d'axes incompréhensible ». Avançons pas à pas.

### 4.1 Débarrassez-vous d'abord du « fardeau des axes mathématiques »

Vous avez peut-être vu trois axes en cours de maths, et mémorisé la « règle de la main droite ». Oubliez-la pour l'instant. Dans cet outil, **les axes sont tout simplement trois flèches colorées, munies d'étiquettes alphabétiques**, servant à répondre à une question : « Où se trouve cet objet dans l'espace, et dans quelle direction pointe-t-il ? »

### 4.2 Les annotations que vous voyez réellement sur la page web

Activez l'affichage des « axes de coordonnées » (le bouton 📐 de la barre supérieure). Vous verrez trois flèches, dont l'extrémité porte respectivement les lettres **X, Y, Z**, de couleurs différentes.

> ⚠️ **Important** : Les X/Y/Z mentionnés dans ce livre ainsi que sur l'**interface de cet outil sont des annotations de page web** ; ils ne sont pas tout à fait identiques aux axes utilisés en interne par le logiciel. Les lecteurs ordinaires **n'ont qu'à se fier aux annotations de page web**. La correspondance ci-dessous est celle que vous voyez réellement à l'écran :

| Annotation web | Couleur de flèche | Direction représentée | Métaphore du quotidien |
| --- | --- | --- | --- |
| **X** | 🔵 Bleu | **Avant/arrière** (profondeur) | Vous « avancez / reculez » |
| **Y** | 🔴 Rouge | **Gauche/droite** | Vous « allez à gauche / à droite » |
| **Z** | 🟢 Vert | **Haut/bas** (hauteur) | Vous « vous mettez sur la pointe des pieds / vous accroupissez » |

Autrement dit, sur cette page web : **l'axe Z est celui qui pointe vers le haut (vert), X est avant/arrière (bleu), Y est gauche/droite (rouge).**

💡 Retenez un petit dicton : **« Bleu avant/arrière, rouge gauche/droite, vert haut/bas (Z vers le ciel). »**

### 4.3 Pourquoi la « hauteur » est Z et non Y ?

Dans bien des logiciels 3D, la hauteur est Y. Mais les **annotations de page** de cet outil placent la hauteur sur Z (la flèche verte). Ce n'est pas une erreur de votre part : **c'est bien ainsi que cette page web est annotée**. Ce livre explique tout, du début à la fin, selon les « annotations de page web ». Il vous suffit de vous fier à la couleur et à la lettre à l'écran pour ne pas vous perdre.

❓ **À réfléchir** : Si vous deviez reprendre la conception, quelle lettre attribueriez-vous à la « hauteur » ? La lettre n'est qu'un nom ; l'essentiel est que « nom, couleur et direction » se correspondent.

### 4.4 Le sol et « hauteur = 0 »

Le fond de la scène comporte une **grille de sol**. Le sol est la référence « hauteur zéro » : tout objet posé sur le sol a sa Z (hauteur) égale à 0 ; si on le soulève, Z augmente.

Sous les annotations de page web, le sol est le plan horizontal formé par **X (avant/arrière) et Y (gauche/droite)**, exprimé par la formule « Z = 0 ». Pas besoin de mémoriser la formule ; retenez simplement : **le sol est « là où l'on pose le pied », et vers le haut (axe vert Z) on s'élève.**

### 4.5 Ressentir les trois axes avec son corps

Levez-vous et faites trois mouvements :
- Un pas en avant, un pas en arrière → vous vous déplacez le long du **X (bleu)** ;
- Un pas latéral à gauche, un pas latéral à droite → vous vous déplacez le long du **Y (rouge)** ;
- Sur la pointe des pieds, accroupi → vous vous déplacez le long du **Z (vert)**.

Grav ez cela dans vos muscles : toutes les opérations de « déplacement d'objets » à venir auront une référence.

✏️ **À vous de pratiquer** : Activez les axes, basculez successivement en « vue de dessus » et en « vue de face » (boutons de la barre inférieure), et observez si la direction des trois flèches correspond à votre ressenti corporel. En vue de dessus, vous voyez le plan X–Y ; en vue de face, vous voyez le plan X–Z.

---

## Chapitre 5 : Passons à la pratique : votre première œuvre 3D

Voir sans faire n'est que faux-semblant. Dans ce chapitre, nous réalisons une vraie petite œuvre que l'on peut capturer et partager : **un cube coloré debout sur le sol.**

### 5.1 Première étape : choisir une forme

1. Regardez le panneau de gauche, repérez la zone « Formes 3D » (📱🤖 sur tactile, si le panneau est replié, cliquez d'abord sur le petit bouton sur le bord pour le déplier) ;
2. Cliquez sur le premier « Cube » (ou n'importe quelle solide que vous aimez) ;
3. Vous entrez en « mode placement » :
   - 🖥️💻 Version souris : une fois le curseur dans la zone de travail, un **aperçu suit le curseur** ;
   - 📱🤖 Version tactile : le doigt n'a pas de « survol », donc **pas d'aperçu suivant** ; on pose là où l'on touche.

### 5.2 Deuxième étape : poser l'objet

**Cliquez** une fois au centre du sol (📱🤖 version tactile : **tap d'un doigt**). Le cube tombe « clac » sur la grille. Félicitations, votre premier objet 3D est né.

💡 Si vous n'avez pas bien vu le point de chute, pas de panique — au chapitre suivant, après avoir appris la « sélection », vous pourrez le déplacer à tout moment.

### 5.3 Troisième étape : le sélectionner

Cliquez sur l'outil « Sélection / Transformation » du panneau de gauche, puis **cliquez** sur ce cube (📱🤖 version tactile : **tap d'un doigt**). Des flèches ou un cadre apparaissent autour, signifiant « sélectionné ». Le panneau de droite s'active alors.

### 5.4 Quatrième étape : le colorier

Dans la zone « Couleur » du panneau de droite :

- Cliquez directement sur une **couleur prédéfinie** (par exemple un orange vif), le cube change de couleur instantanément ;
- Pour plus de personnalisation, utilisez la fonction « Sélecteur » des couleurs personnalisées.
⚠️ **Attention** : si vous cliquez sur « Aucune couleur » ou ramenez l'opacité à 0.1, l'objet devient transparent, voire presque « invisible » ; ce n'est pas une disparition, il suffit de revenir en arrière.

### 5.5 Cinquième étape : bouger et pivoter

Restez en sélection, faites glisser les flèches pour déplacer (bleu avant/arrière / rouge gauche/droite / vert élévation), faites glisser l'anneau pour pivoter. Ressentez les trois axes du chapitre 4.

### 5.6 Sixième étape : sauvegarder le résultat

Cliquez sur « Capture » dans la barre supérieure (ou `Ctrl+P`) pour obtenir un PNG. Vous pouvez aussi « Exporter » le JSON comme sauvegarde, et le « Importer » la prochaine fois pour continuer.

✏️ **À vous de pratiquer** : Répétez les étapes ci-dessus pour créer une petite scène « cube rouge à gauche d'une sphère bleue », et sauvegardez une capture. Pouvez-vous décrire à un ami la position de chaque objet à l'aide de gestes corporels (avant/arrière, gauche/droite, haut/bas) ?

---

## Chapitre 6 : Sauvegarde et partage : capture, exportation et sauvegarde

Ce que vous faites, bien sûr, il faut le conserver et le montrer. Ce chapitre présente quatre façons de « stocker », et leurs cas d'usage.

### 6.1 Pourquoi « sauvegarder à temps » est une bonne habitude

Fermer la page, actualiser, ou toucher par erreur le bouton retour : la scène non exportée disparaît. Prendre l'habitude d'« exporter le JSON après chaque étape » vous sauvera d'innombrables fois.

💻 **L'exception : la Version PC (Windows) et la Version Web** : elles disposent d'une **sauvegarde automatique et de la récupération après crash** (par défaut, sauvegarde automatique toutes les 5 minutes, en conservant les 10 dernières instantanés). Après une fermeture accidentelle, la boîte de dialogue « Session non sauvegardée détectée » s'affiche au réouverture, demandant si l'on souhaite restaurer la progression de la dernière sauvegarde automatique (y compris le nombre d'objets). Mais ce n'est qu'une « corde de sécurité » et **ne remplace pas une exportation volontaire**.

### 6.2 Capture : prendre une photo de l'œuvre (Ctrl + P)

« Capture » enregistre l'image actuelle sous forme d'un **fichier PNG**.

- Idéal pour : publier sur les réseaux, faire une illustration, montrer le « rendu » à quelqu'un ;
- Conseil : avant la capture, cliquez dans la barre supérieure pour masquer les **axes de coordonnées et la grille**, l'image sera plus propre ;
- La taille de sortie est **agrandie automatiquement selon le ratio de pixels de l'appareil** (au moins **3×**), donc le PNG capturé est plus net et de plus haute résolution que ce que vous voyez à l'écran — il n'est pas simplement égal aux pixels d'affichage de la zone de travail actuelle.

**Où l'image est-elle enregistrée ? Cela diffère selon les plateformes :**

| Forme | Mode de stockage |
| --- | --- |
| 🖥️📱 Version Web | Via le **téléchargement** du navigateur, vers le dossier « Téléchargements » du système (le navigateur mobile peut d'abord afficher une demande « Enregistrer l'image ») |
| 💻 Version PC (Windows) | Boîte de dialogue de **sauvegarde système**, où vous choisissez le dossier et le nom de fichier |
| 🤖 Version Android | Enregistré dans le stockage de l'application, et peut être envoyé directement via le panneau de **partage système** vers WeChat / la galerie / d'autres applications |

💡 La capture ne sauvegarde que « l'apparence », sans les données rééditables. Pour pouvoir modifier plus tard, utilisez l'« Exportation » ci-dessous.

### 6.3 Exporter la scène : conserver le « projet éditable » (Ctrl + S / bouton `Exporter`)

« Exporter » génère un **fichier JSON** qui consigne la position, la couleur, les paramètres de chaque objet… La prochaine « Importation » restaurera tout à l'identique.

- Idéal pour : les travaux en cours, les œuvres nécessitant un peaufinage ;
- Le nom de fichier comporte généralement un horodatage ; il est conseillé de le renommer de façon explicite (ex. `maison_v1.json`).

Le mode de stockage est identique à la capture : 🖥️📱 la Version Web passe par le téléchargement du navigateur ; 💻 la Version PC (Windows) affiche la boîte de dialogue de sauvegarde système (choix du répertoire possible) ; 🤖 la Version Android enregistre dans le stockage de l'application et peut partager l'export.

> ✅ **Important** : Ce fichier `.json` est **commun aux trois plateformes**. Un projet exporté sur mobile peut être importé directement dans la Version PC (Windows) pour poursuivre l'édition, et réciproquement.

💻 **L'enregistrement de fichier de la Version PC (Windows) (différent de l'« Exportation » web)** : la Version PC (Windows) gère la scène comme un **fichier local**, et non comme une simple « exportation JSON » :
- **`Ctrl + S` = Enregistrer** : écrase directement et écrit dans le fichier de scène local actuellement ouvert (si aucun disque n'a encore été utilisé, une « Enregistrer sous » s'affiche pour choisir l'emplacement) ;
- **`Ctrl + Shift + S` = Enregistrer sous** : enregistre la scène actuelle dans un **nouveau** fichier local, le fichier d'origine restant intact.
> La Version Web·souris / Version Web·tactile n'a pas le concept de « fichier courant » ; `Ctrl + S` correspond à l'« Exportation de scène » du 6.3 (téléchargement d'un JSON), la sémantique diffère, veuillez donc faire la distinction.

### 6.4 Importer : relire le projet (Ctrl + O)

Choisissez un `.json` exporté précédemment, la scène est reconstruite. ⚠️ L'importation **remplace** la scène actuelle ; pensez à sauvegarder votre travail en cours.

La façon de récupérer le fichier selon les plateformes :

- 🖥️📱 **Version Web** : cliquez sur « Importer », puis choisissez le fichier dans la boîte de dialogue du navigateur ;
- 💻 **Version PC (Windows)** et 🖥️ **Version Web·souris** : outre cliquer sur « Importer », vous pouvez aussi **glisser directement le fichier `.json` dans la fenêtre** (les types de fichiers non pris en charge afficheront « Seuls les fichiers de scène sont pris en charge ») ; la 💻 **Version PC (Windows)** prend en outre le glisser-déposer de **fichiers image** dans la fenêtre, qui sont alors placés comme objets image ;
- 🤖 **Version Android** : cliquez sur « Importer », puis localisez votre `.json` dans le sélecteur de fichiers système.

### 6.5 Nouveau : repartir de zéro (Ctrl + N)

« Nouveau » vide entièrement la scène. Opération dangereuse, mais sûre si couplée à « exporter une sauvegarde d'abord ».

### 6.6 🤖 Exclusif Android : la touche retour ne vous fera pas « tout perdre »

Sur la Version Android, appuyer sur la touche retour pour quitter l'application affiche une boîte de confirmation proposant trois options :

- **Enregistrer et quitter** : exporte d'abord la scène actuelle avant de quitter (recommandé) ;
- **Quitter directement** : sans sauvegarde, à utiliser avec prudence ;
- **Annuler** : rester pour continuer l'édition.

💡 Ainsi, toucher par erreur la touche retour sur Android n'est pas grave — mais il reste conseillé de prendre l'habitude d'exporter par étapes.

### 6.7 Un rythme de sauvegarde fiable

> Exportez une fois avant de commencer → réexportez aux étapes clés (avec des noms de fichiers différents) → annulez et revenez en arrière à tout moment.
> (🖥️💻 Version souris : `Ctrl+Z` ; 📱🤖 Version tactile : bouton « Annuler » de la barre supérieure.)

✏️ **À vous de pratiquer** : Prenez la scène « cube rouge + sphère bleue » du chapitre 5, sauvegardez-la une fois par « Capture » et une fois par « Exporter », puis relisez-la par « Importer » pour vérifier la cohérence du contenu.
Avancé : si vous disposez à la fois d'un mobile et d'un ordinateur, essayez d'**exporter sur une plateforme et d'importer sur l'autre**, pour ressentir la portabilité inter-plateformes du fichier projet.

---

# Deuxième partie : Bases d'utilisation

## Chapitre 7 : L'art de sélectionner les objets : sélection simple, multiple et par cadre

Dans le monde 3D, **« d'abord sélectionner, ensuite opérer »** est une règle d'airain. Ce chapitre explique à fond cette petite affaire de « sélection ».

### 7.1 Pourquoi faut-il sélectionner d'abord

Les paramètres du panneau de droite et les flèches de transformation s'appliquent « à l'objet actuellement sélectionné ». Sans sélection, l'outil ne sait pas qui vous voulez modifier. C'est comme si vous ne pouviez pas remettre à toute la classe le même certificat ne portant qu'un seul nom — il faut d'abord appeler.

### 7.2 Sélection simple : un clic

Avec l'outil « Sélection / Transformation », cliquez une fois sur l'objet. Il s'illumine et affiche des contrôles, signifiant « sélectionné ».

- 🖥️💻 **Version souris** : **clic gauche** ;
- 📱🤖 **Version tactile** : **tap d'un doigt** (touchez puis relevez, sans glisser).

### 7.3 Sélection multiple : ajouter un deuxième, un troisième…

| Forme | Comment sélectionner plusieurs |
| --- | --- |
| 🖥️💻 Version Web·souris / PC | Maintenez `Shift` puis cliquez d'autres objets pour **ajouter** à la sélection ; recliquer sur un objet déjà sélectionné **l'annule** |
| 📱🤖 Version Web·tactile / Android | Pas de touche `Shift`, mais un **appui long d'un doigt** sur un objet — non sélectionné l'ajoute, sélectionné le retire (équivalent au Shift+clic de la version souris) ; vous pouvez aussi utiliser « **Sélection par cadre** » de la barre inférieure pour encercler une zone, ou « **Tout sélectionner** » pour tout prendre d'un coup |

💡 Après une sélection multiple, la transformation déplace tous les objets ensemble comme un tout, selon leur « centre de groupe ».

### 7.4 Sélection par cadre : glisser un rectangle

La sélection par cadre convient pour « attraper tout un tas d'un coup », mais les deux plateformes démarrent différemment — c'est l'endroit le plus facile à confondre :

**🖥️💻 Version souris (Version Web·souris / PC)**

Maintenez le bouton gauche dans une **zone vide et tirez un rectangle**, les objets dans le cadre sont tous sélectionnés. Utilisable à tout moment, sans changer de mode.

⚠️ La sélection par cadre doit démarrer d'un « endroit vide ». Si vous démarrez sur un objet, cela devient un **déplacement de cet objet**.

**📱🤖 Version tactile (Version Web·tactile / Android)**

Le glisser du doigt bascule par défaut « l'angle de vue », il faut donc d'abord indiquer au programme « je veux sélectionner par cadre » :

1. Cliquez sur le bouton « **Sélection par cadre** » de la barre inférieure ; le bouton bleuit, signifiant l'entrée en mode cadre ;
2. **Tirez d'un doigt** un rectangle englobant les objets à sélectionner ;
3. Relâchez, la sélection est terminée — **le mode cadre se ferme automatiquement**, le bouton reprend sa couleur.

⚠️ **Important** : la sélection par cadre sur tactile est **ponctuelle**. Pour refaire un cadre une deuxième fois, vous devez **recliquer** sur le bouton « Sélection par cadre ». Cela évite un cadre accidentel quand vous vouliez tourner la vue.

### 7.5 Tout sélectionner

Sélectionne d'un clic tous les objets de la scène. Pratique couplé à « Vider » ou à une transformation globale.

- 🖥️💻 **Version souris** : appuyez sur `Ctrl + A` ;
- 📱🤖 **Version tactile** : cliquez sur le bouton « **Tout sélectionner** » de la barre inférieure.

### 7.6 Annuler la sélection

- **Commun aux quatre plateformes** : cliquez dans une zone vide de la zone de travail ;
- 🖥️💻 **Version souris en plus** : appuyez sur `Esc`.

### 7.7 Indice de sélection : l'écran « vous dit ce que vous avez sélectionné »

Depuis cette version, à chaque changement d'état de sélection, une **barre d'indication légère** flotte en haut de la zone de travail (disparaît automatiquement après quelques secondes, sans gêner l'opération) :

| Cas | Contenu de l'indication |
| --- | --- |
| 1 seule forme sélectionnée | `Cube sélectionné` (affiche le nom de l'objet, entre crochets « ») |
| 1 seul texte sélectionné | `Texte sélectionné : contenu réel` (nom d'objet + deux-points + corps du texte) |
| 2 objets ou plus sélectionnés | `5 objets sélectionnés` (affiche le nombre total actuel) |
| Ajout/retrait via Shift | Rafraîchi à chaque clic au nombre **actuel**, ex. 3 → 4 → 3 |
| Annulation de toute sélection | `Sélection annulée` |

💡 L'usage le plus pratique de cette indication est la **sélection par cadre** et le **clic enchaîné Shift** : vous n'avez pas à compter un à un, un coup d'œil au chiffre suffit pour savoir si vous avez trop ou trop peu encadré.

### 7.8 Cliquer la barre d'outils en état de sélection : sortie automatique de la sélection

Après avoir sélectionné un objet, si vous cliquez l'un des **5 outils** suivants du panneau de gauche, l'éditeur **annule d'abord automatiquement la sélection actuelle**, puis entre dans l'outil et affiche `Mode de sélection quitté` :

- Texte
- Image
- Pinceau 3D
- Pinceau 2D
- Gomme

Ces 5 outils sont des opérations « qui posent un nouveau trait sur la zone de travail » ; conserver l'ancienne sélection ne ferait que gêner.

⚠️ Les autres outils (divers boutons de formes 3D / 2D) ne prennent **pas effet au clic s'il y a un objet sélectionné** — c'est une protection volontaire, pour éviter de poser par erreur une nouvelle forme alors que vous vouliez régler un paramètre. Pour poser une nouvelle forme, annulez d'abord la sélection (🖥️💻 `Esc` ou cliquez le vide ; 📱🤖 cliquez le vide de la zone de travail).

### 7.9 Impossible de sélectionner ? Vérifiez d'abord ces points

1. Êtes-vous encore en « mode placement » ? Revenez d'abord à l'outil « Sélection / Transformation » ;
2. L'objet à sélectionner est-il masqué par un autre ? Changez d'angle (barre inférieure) pour contourner vers la face ;
3. Est-il devenu transparent (opacité réglée au minimum 0.1) ? Ramenez-le d'abord ;
4. Est-ce un tracé 2D ? Certains objets de pinceau nécessitent la gomme ou une logique spécifique ; un simple clic ne le sélectionne pas forcément.

❓ **À réfléchir** : Sélection multiple et sélection par cadre, laquelle convient mieux à « choisir précisément trois objets non contigus » ? Laquelle à « sélectionner toute une rangée » ?

✏️ **À vous de pratiquer** : Posez 5 formes différentes, entraînez-vous ① sélection simple d'une seule ② ajout Shift jusqu'à trois (attention au changement du chiffre dans la barre d'indication) ③ cadre sur toute une zone ④ Ctrl+A tout sélectionner ⑤ cliquez l'outil « Texte », observez la sortie automatique de sélection.

---

## Chapitre 8 : Le trio des transformations : déplacer, pivoter, redimensionner

La « transformation » est l'action la plus fréquente de la création 3D ; en essence, ce sont trois choses : **changer de position, tourner l'orientation, modifier la taille**.

### 8.1 Que sont les trois transformations

| Transformation | Métaphore du quotidien | Contrôle à l'écran |
| --- | --- | --- |
| Translation (déplacement) | Déplacer la tasse de la gauche à la droite de la table | Trois flèches colorées |
| Rotation | Orienter l'ouverture de la tasse vers vous | Poignées en cercle / arc |
| Redimensionnement | Agrandir ou réduire la tasse | Poignées en carré |

### 8.2 Translation : glisser le long des trois axes

Une fois l'objet sélectionné, apparaissent des flèches rouge, vert, bleu (annotations web : Y rouge = gauche/droite, Z vert = hauteur, X bleu = avant/arrière).

- Glisser la **flèche rouge** → déplacement le long de Y (gauche/droite) ;
- Glisser la **flèche verte** → montée / descente le long de Z (hauteur) ;
- Glisser la **flèche bleue** → déplacement le long de X (avant/arrière).

💡 En ne tirant qu'une seule flèche, l'objet ne bouge que dans cette direction, sans dériver. Pour un déplacement libre en diagonale, tirez le « carré plan » entre les flèches.

### 8.3 Rotation : pivoter autour d'un axe

Basculez en mode « Rotation », l'objet est entouré d'anneaux :

- Tirez un anneau → rotation autour de l'axe correspondant. Par exemple, faire passer la « face » de l'avant vers la gauche revient à pivoter autour de Z (axe vert de hauteur).

⚠️ **Attention** : la rotation est « autour de quel axe ». Retenez le dicton : pivoter autour de l'axe vert (Z) = comme tourner sur soi-même ; autour de l'axe bleu (X, avant/arrière) = comme hocher la tête ; autour de l'axe rouge (Y, gauche/droite) = comme pencher la tête sur le côté.

### 8.4 Redimensionnement : modifier la taille

Basculez en « Redimensionnement », tirez les poignées pour agrandir ou réduire. Par défaut, c'est **proportionnel** (le verrou est expliqué au chapitre 9).

### 8.5 Besoin de précision ? Utilisez les valeurs à droite

Le glisser repose sur le toucher, les paramètres sur la saisie. Dans le panneau de droite, chaque transformation possède des champs numériques :

- Position : trois nombres X / Y / Z (sous annotations web : avant/arrière / gauche/droite / hauteur) ;
- Rotation : trois angles ;
- Redimensionnement : valeur de proportion.

💡 Pour un alignement « très net », saisissez directement les mêmes valeurs, bien plus précis qu'un glisser à l'œil.

✏️ **À vous de pratiquer** : Posez un cube, tirez d'abord les flèches pour le déplacer en haut à droite ; puis, dans les champs de droite, mettez X, Y, Z à des entiers (ex. 2, 0, 3), et observez son point de chute précis.

---

## Chapitre 9 : Modes de transformation et redimensionnement proportionnel

Le chapitre précédent a présenté les actions, celui-ci explique « comment changer de mode » et « comment verrouiller les proportions ».

### 9.1 Où changer les trois modes

En bas du panneau de droite (après sélection d'un objet) se trouvent les trois boutons « Translation / Rotation / Redimensionnement », accessibles aussi par raccourcis (détaillé dans la partie Efficacité). Après bascule, les contrôles de l'objet prennent l'apparence correspondante.

### 9.2 Qu'est-ce que le redimensionnement proportionnel

Lors du redimensionnement, il y a un interrupteur « Redimensionnement proportionnel » :

- **Activé** : redimensionnement synchrone dans toutes les directions, la forme **ne se déforme pas** (la sphère reste sphère, le cube reste cube) ;
- **Désactivé** : possibilité d'**étirer sur un seul axe**, par exemple aplatir la sphère en ellipse, ou étirer le cube en barre.

⚠️ **Attention** : la barre de redimensionnement proportionnel ne s'affiche que si « sélection unique et redimensionnement proportionnel activé ». En sélection multiple, elle est désactivée (utilisez les contrôles de transformation pour redimensionner l'ensemble).

### 9.3 Le texte ne prend pas en charge le redimensionnement proportionnel

Lorsque vous sélectionnez un **objet texte**, vous constatez :

- La ligne entière du curseur « Redimensionnement proportionnel » du panneau de droite est **masquée** ;
- La case à cocher « Redimensionnement proportionnel » est **masquée** ;
- Le bouton « Redimensionnement » dans les modes devient **gris et non cliquable** (si vous êtes en mode redimensionnement, il revient automatiquement à la translation).

Raison : le texte est une plaque de texture générée en temps réel à partir de paramètres typographiques (taille de police, police, graisse, etc.) ; un étirement direct floute et déforme les glyphes. **Pour changer la taille du texte, utilisez le paramètre « Taille de police » du panneau de droite** — c'est sans perte.

### 9.4 Quand désactiver le verrou

Pour faire « un joint plat », « une colonne allongée », « une lentille ovale plate », désactivez le verrou et tirez sur un seul axe. C'est la clé pour passer du « corps standard » au « corps personnalisé ».

❓ **À réfléchir** : Pourquoi « une sphère aplatie » et « une sphère standard » sont-elles deux langages visuels différents en 3D ? Que convient-il de représenter avec chacune ?

✏️ **À vous de pratiquer** : Posez une sphère, désactivez le verrou proportionnel, et aplatissez-la uniquement le long de Z (axe vert de hauteur) jusqu'à 0.3, pour obtenir un « OVNI / disque plat », et ressentez le redimensionnement sur un seul axe.

---

## Chapitre 10 : Annulation et historique : l'assurance de l'essai-erreur

Le plus grand blocage psychologique du débutant est la « peur de se tromper ». Ce chapitre vous donne un calmant.

### 10.1 Annuler et refaire

- `Ctrl + Z` : annuler l'étape précédente ;
- `Ctrl + Y` : refaire.

Vous pouvez revenir en arrière de plusieurs étapes consécutives, et avancer à nouveau (redo).

### 10.2 Qu'est-ce que la « pile d'historique »

Le logiciel mémorise en interne une **liste d'opérations** (comme l'historique de retour du navigateur). Chaque opération importante y est empilée ; annuler revient à dépiler la dernière.

⚠️ **Attention** : l'historique a une **limite de pas**. Les opérations très anciennes peuvent en être « expulsées » et ne plus être annulables — d'où l'importance d'exporter un JSON de sauvegarde aux étapes clés (voir [Chapitre 6](jump:Chapitre 6 : Sauvegarde et partage : capture, exportation et sauvegarde)).

### 10.3 Ce qui entre dans l'historique, ce qui n'y entre pas

- **Entre dans l'historique** : ajout/suppression d'objets, changement de couleur, transformation, texture, etc. — « les modifications du contenu de l'œuvre » ;
- **N'entre pas dans l'historique** : la simple rotation de la vue, le zoom d'observation (ce sont « vos façons de regarder », ne modifiant pas l'œuvre elle-même).

Vous pouvez donc tourner et observer en toute confiance, sans craindre que les changements de vue deviennent une série d'étapes d'annulation.

### 10.4 L'état d'esprit de l'essai-erreur

> Chaque opération est annulable + une sauvegarde aux étapes clés = il n'y a pas de « vraie catastrophe ».

Grav ez cette phrase dans votre cœur, et vous oserez cliquer partout.

✏️ **À vous de pratiquer** : Faites successivement 5 opérations différentes (ajouter un objet, changer de couleur, déplacer, redimensionner, en supprimer un), puis appuyez en continu sur `Ctrl+Z` pour le rembobinage pas à pas, puis `Ctrl+Y` pour la lecture normale, et ressentez la « machine à remonter le temps ».

---

# Troisième partie : L'univers des formes

La création 3D, en dernier ressort, c'est « à la bonne position, mettre la bonne forme ». Cette partie d'abord déploie sous vos yeux les **40 formes** au complet, puis clarifie la différence fondamentale entre 3D et 2D.

## Chapitre 11 : Aperçu des formes 3D (comment classer les 20 types)

### 11.1 Qu'est-ce qu'une « forme 3D »

Une forme 3D a du **volume** — elle peut recevoir l'ombre et la lumière, masquer ce qui est derrière elle, et se laisser contourner du regard. Cet outil propose 20 solides, du cube le plus courant au tore noué insolite.

### 11.2 Aperçu rapide des vingt types

| N° | Clé | Nom chinois | Reconnaissance au premier coup d'œil | Paramètres propres |
| --- | --- | --- | --- | --- |
| 1 | box | Cube | Six faces bien carrées | Longueur / Largeur / Hauteur |
| 2 | sphere | Sphère | Bien bombée | Rayon |
| 3 | cylinder | Cylindre | Deux cercles haut/bas, corps droit | Rayon / Hauteur |
| 4 | cone | Cône | Sommet pointu, base ronde | Rayon de base / Hauteur |
| 5 | torus | Tore | Beignet | Rayon extérieur / Rayon intérieur |
| 6 | knot | Nœud | Anneau en tire-bouchon | Rayon / Épaisseur du tube |
| 7 | icosa | Icosaèdre | 20 faces triangulaires | Arête |
| 8 | octa | Octaèdre | Pointe haut/bas, bombé au milieu | Arête |
| 9 | dodeca | Dodécaèdre | 12 faces pentagonales | Arête |
| 10 | capsule | Capsule | Colonne à tête ronde | Rayon / Longueur du cylindre |
| 11 | pyramid | Pyramide à base carrée | Base carrée, sommet pointu | Arête de base / Hauteur |
| 12 | prism | Prisme triangulaire | Colonne triangulaire | Arête de base / Hauteur |
| 13 | tube | Tube | Tuyau courbé | Portée / Hauteur de l'arc / Rayon du tube / Segments de courbure |
| 14 | lathe | Solide de révolution | Forme vase/toupie | Segments / Rayon de base / Rayon intermédiaire / Rayon maximal / Hauteur |
| 15 | tetra | Tétraèdre | Pyramide à quatre faces | Arête de base |
| 16 | barrel | Fût | Cylindre aux diamètres haut/bas variables | Rayon supérieur / Rayon inférieur / Hauteur |
| 17 | dome | Demi-sphère | Œuf coupé / demi-dôme | Rayon |
| 18 | helix | Tore ouvert | Anneau à une entaille | Rayon extérieur / Rayon intérieur / Angle de balayage principal |
| 19 | octaPrism | Prisme octogonal | Colonne droite à huit côtés | Arête de base / Hauteur |
| 20 | star3d | Étoile 3D | Étoile épaisse | Rayon extérieur / Rayon intérieur / Nombre de branches / Épaisseur |

💡 **« Où sont les paramètres propres ? »** Après sélection de l'objet, sous « Opacité » du panneau de droite apparaissent les curseurs propres à cette forme. La modification **reconstruit la géométrie en temps réel**, sans affecter la couleur, la texture et la transformation que vous avez déjà réglées.

### 11.3 Trois façons de classer (pour vous repérer vite parmi les 20)

- **Par familiarité quotidienne** : boîte (box), sphère (sphere), cylindre (cylinder), cône (cone) ressemblent le plus aux objets de la vie, choix de premier plan pour les débutants ;
- **Par « sentiment géométrique »** : les solides de Platon (icosa/octa/dodeca/tetra) sont très « maths » ; knot/helix/tube sont très « fluides » ;

- **Par usage** : pour l'architecture, utilisez box/cylinder/prism/pyramid/dome ; pour la décoration, torus/star3d/heart (2D)/lightning (2D) ; pour les formes organiques, sphere/capsule/lathe/barrel.

### 11.4 Comment choisir le premier

Vous ne savez pas lequel utiliser ? Commencez par **box** pour prendre le toucher, puis utilisez **sphere** pour ressentir le « clair-obscur des surfaces courbes », et enfin **torus** pour apprécier le plaisir de la profondeur « où l'on peut passer à travers le milieu ».

❓ **Réfléchissez** : parmi le cube, la sphère et le cône, lequel « utilise le moins de matériau pour contenir le plus de choses » ? C'est en réalité un problème du monde réel (conteneurs, réservoirs sont tous conçus sur cette base).

---

## Chapitre 12 : Aperçu des graphiques 2D (20 types et la pensée « autocollant »)

### 12.1 Qu'est-ce que le 2D

Un graphique 2D **n'a pas d'épaisseur**, comme un papier découpé, il **repose à plat sur le sol** (plan XY, Z=0). Il convient aux symboles, repères et motifs décoratifs.

### 12.2 Présentation des vingt types un par un

| Nom de clé | Chinois | Ressemble à / usage | Paramètres propres |
| --- | --- | --- | --- |
| square2 | Carré | Dalle au sol, fond de logo | Longueur / Largeur |
| circle2 | Cercle | Bouton, soleil, point | Rayon |
| triangle | Triangle isocèle | Avertissement, sommet de montagne | Longueur de la base / Hauteur |
| star | Étoile | Notation, décoration | Rayon extérieur / Rayon intérieur / Nombre de pointes |
| hexagon | Hexagone régulier | Rayon de miel, écrou, sensation technologique | Longueur du côté |
| heart | Cœur | Amour, like | Largeur / Hauteur / Creux de la pointe du cœur |
| pentagon | Pentagone régulier | Plan de maison, insigne | Longueur du côté |
| octagon | Octogone régulier | Panneau de stationnement, couvercle de puits | Longueur du côté |
| ellipse | Ellipse | Verre, orbite | Longueur du grand axe / Longueur du petit axe |
| parallelogram | Parallélogramme | Tension oblique, bloc en perspective | Longueur de base / Hauteur / Degré d'inclinaison |
| trapezoid | Trapèze | Corps tronconique, côté de toit | Largeur de la base inférieure / Largeur de la base supérieure / Hauteur |
| diamond | Losange | Diamant, indication | Longueur du côté / Angle interne A / Angle interne B / Diagonale p / Diagonale q |
| rightTri | Triangle rectangle | Rampe, marque d'angle droit | Longueur de la base / Hauteur |
| arrow | Flèche | Direction, flux | Longueur / Largeur |
| crescent | Croissant | Lune, crochet courbe | Rayon extérieur / Rayon intérieur / Décalage |
| semicircle | Demi-cercle | Arc, secteur | Rayon |
| ring2d | Anneau (percé) | Cible, halo | Rayon de l'anneau extérieur / Rayon de l'anneau intérieur |
| cross | Croix | Médical, localisation | Longueur / Largeur des bras |
| lightning | Éclair | Énergie, avertissement | Hauteur / Largeur |
| teardrop | Goutte d'eau | Larme, pendentif | Largeur / Hauteur / Acuité de la pointe |

💡 **Les 20 types de graphiques 2D ont désormais tous des paramètres propres**. Autrefois, heart / arrow / crescent / cross / lightning ne pouvaient être mis à l'échelle que globalement ; à présent, leurs dimensions peuvent être précisément spécifiées.

💡 **Deux détails faciles à négliger** :
- Le bord plat du **demi-cercle** est désormais orienté vers le **bas**, l'arc vers le haut, ce qui facilite la réalisation d'« arc de porte » ou de « lever de soleil » ;
- L'ordre des paramètres de l'**anneau (ring2d)** est « rayon de l'anneau extérieur d'abord, rayon de l'anneau intérieur ensuite », cohérent avec la surface torique 3D ; le rayon de l'anneau intérieur est toujours automatiquement limité à être **inférieur** au rayon de l'anneau extérieur.

### 12.3 La pensée « autocollant »

Imaginez le 2D comme un autocollant collé au sol : il reste toujours « couché », ne se dresse jamais. L'avantage est — en vue de dessus, c'est une image de symbole claire ; combiné avec des motifs et des couleurs, on peut réaliser des lignes de guidage au sol, des logos au sol d'entreprise, des damiers, etc.

### 12.4 Attention au masquage

Le 2D est collé au sol ; si un objet 3D vient le recouvrir, il le masquera ; sous certains angles, le fin 2D « disparaît » en une ligne. Pour le rendre visible, surélevez-le légèrement (le long de l'axe vert Z) ou placez-le dans un espace dégagé.

✏️ **Entraînez-vous** : placez successivement un square2, un heart, un arrow, un star, basculez en « vue de dessus » pour voir leur apparence la plus claire ; puis basculez en « perspective » pour voir comment ils « reposent » au sol.

---

## Chapitre 13 : Détails des paramètres de chaque graphique 3D (1re partie) : formes de base

> Cette section présente une à une les 10 solides les plus courants. Chacun suit quatre parties « apparence / analogie / usage / astuce » pour vous aider à développer votre intuition.

### 13.1 Cube box
- **Paramètres** : `长` (longueur) / `宽` (largeur) / `高` (hauteur) (les trois sont indépendants ; on peut directement obtenir un parallélépipède rectangle sans avoir à désactiver le verrou d'aspect pour étirer).
- **Apparence** : un corps à angles droits formé de six faces rectangulaires.
- **Analogie** : carton d'expédition, dé, brique.
- **Usage** : murs de bâtiment, socle, et tout ce qui est « carré ».
- **Astuce** : la forme de « fondation » la plus stable ; pour faire un mur bas, réduisez simplement `高` (hauteur), plus précis que la mise à l'échelle.

### 13.2 Sphère sphere
- **Paramètres** : `半径` (rayon).
- **Apparence** : une sphère parfaite.
- **Analogie** : ballon de basket, planète, bulle.
- **Usage** : tête, corps céleste, sphère décorative.
- **Astuce** : la surface de la sphère est celle où les motifs/images « s'étalent » le mieux ; idéal pour faire des sphères à icônes.

### 13.3 Cylindre cylinder
- **Paramètres** : `半径` (rayon) / `高度` (hauteur) (diamètre identique en haut et en bas, c'est un véritable cylindre droit ; si vous voulez des diamètres différents en haut et en bas, utilisez plutôt le **tonneau barrel**).
- **Apparence** : cercles égaux en haut et en bas, parois droites.
- **Analogie** : canette, pilier, bougie.
- **Usage** : poutres et colonnes, corps de tuyau, corps de tour.
- **Astuce** : retenez bien la répartition des tâches avec barrel — **cylinder ne gère qu'« un rayon », barrel gère « deux rayons »**.

### 13.4 Cône cone
- **Paramètres** : `底面半径` (rayon de la base) / `高度` (hauteur).
- **Apparence** : base ronde, sommet pointu.
- **Analogie** : cornet de glace, cône de signalisation, pointe de tente.
- **Usage** : sommet pointu, voyant, chaque étage d'un sapin de Noël.
- **Astuce** : empilez plusieurs cone en réduisant progressivement `底面半径` (rayon de la base) pour former une « tour à étages ».

### 13.5 Surface torique torus
- **Paramètres** : `外环半径` (rayon de l'anneau extérieur) / `内环半径` (rayon de l'anneau intérieur) (**décrivez directement les deux cercles que vous voyez** : la taille du cercle extérieur, la taille du trou au milieu. L'ancien « rayon du tube » a été supprimé).
- **Apparence** : beignet, avec un trou au milieu.
- **Analogie** : cerceau, pneu, bague.
- **Usage** : décoration annulaire, coude de tuyauterie, halo.
- **Astuce** : `内环半径` (rayon de l'anneau intérieur) est automatiquement limité à être inférieur à `外环半径` (rayon de l'anneau extérieur) ; plus les deux sont proches, plus l'anneau est fin, comme un anneau de fil de fer.

### 13.6 Nœud knot
- **Paramètres** : `半径` (rayon) / `管粗` (épaisseur du tube) (la limite supérieure de `管粗` (épaisseur du tube) suit automatiquement `半径` (rayon), environ 0,4 fois le rayon, pour éviter l'auto-intersection en un bloc).
- **Apparence** : comme une tresse torsadée formant un anneau.
- **Analogie** : nœud de corde, symbole d'énergie.
- **Usage** : décoration à sensation technologique, corps de logo.
- **Astuce** : forme complexe, recommandé en couleur unie ou motif simple, pour éviter un collage d'image confus.

### 13.7 Icosaèdre régulier icosa
- **Paramètres** : `边长` (longueur du côté) (**pas le rayon** — donnez directement la longueur réelle de chaque arête, conforme à l'intuition géométrique).
- **Apparence** : polyèdre quasi sphérique formé de 20 triangles équilatéraux.
- **Analogie** : ballon de foot (proche de la version classique à 32 faces), cristal minéral.
- **Usage** : gemme, dé, sphère de style low-poly.
- **Astuce** : représentant du style esthétique « low-poly », très élégant avec une couleur unie.

### 13.8 Octaèdre régulier octa
- **Paramètres** : `边长` (longueur du côté).
- **Apparence** : pointu en haut et en bas, renflé en huit faces au milieu.
- **Analogie** : taille de diamant, double cône.
- **Usage** : cristal, gemme, sculpture abstraite.
- **Astuce** : riche variation d'ombre et de lumière en rotation, idéal pour une « décoration focale ».

### 13.9 Dodécaèdre régulier dodeca
- **Paramètres** : `边长` (longueur du côté).
- **Apparence** : polyèdre à sensation sphérique avec 12 faces pentagonales régulières.
- **Analogie** : pierre magique, dé (D12).
- **Usage** : symbole mystérieux, objet décoratif.
- **Astuce** : avec la même longueur de côté, le dodécaèdre régulier paraît « une taille de plus » que l'icosaèdre régulier, car son coefficient de rayon de la sphère circonscrite est plus élevé.

### 13.10 Capsule capsule
- **Paramètres** : `半径` (rayon) / `圆柱长` (longueur du cylindre) (hauteur totale = longueur du cylindre + 2 × rayon).
- **Apparence** : cylindre avec demi-sphères aux deux extrémités.
- **Analogie** : gélule, piste d'athlétisme, quille de bowling.
- **Usage** : simplification du torse humain, tuyau souple, colonne arrondie.
- **Astuce** : plus « doux » qu'un cylindre pur, souvent utilisé pour personnages ou êtres vivants.

✏️ **Entraînez-vous** : avec box + cylinder + cone, assemblez un « lampadaire » : le cylindre fait le mât, le box fait la boîte lumineuse, le cone fait le capuchon supérieur. Ressentez la puissance de la combinaison des formes de base.

---

## Chapitre 14 : Détails des paramètres de chaque graphique 3D (2e partie) : formes spéciales

### 14.1 Pyramide à base carrée pyramid
- **Paramètres** : `底面边长` (longueur du côté de la base) / `高度` (hauteur) (l'ancien « nombre de côtés » a été supprimé — il devait être une pyramide à **base carrée**).
- **Apparence** : base carrée + un sommet pointu.
- **Analogie** : pyramide d'Égypte, toit.
- **Usage** : tour, bâtiment à sommet pointu, monument.
- **Astuce** : cette version recalcule ses normales, les quatre faces inclinées ont désormais un **clair-obscur plan net**, sans l'éclairage « brouillé en un bloc » de l'ancienne version.

### 14.2 Prisme triangulaire régulier prism
- **Paramètres** : `底面边长` (longueur du côté de la base) / `高度` (hauteur).
- **Apparence** : pilier droit à section triangulaire équilatérale.
- **Analogie** : prisme triangulaire, obstacle routier, poutre de toit.
- **Usage** : poutre triangulaire, bloc en coin, composant technologique.
- **Astuce** : les normales sont également corrigées, les trois côtés sont nets ; posé horizontalement, sert de « bloc en pente ».

### 14.3 Tuyau tube
- **Paramètres** : `跨度` (portée) / `拱高` (hauteur de l'arc) / `管半径` (rayon du tube) / `弯曲分段` (segments de courbure).
- **Apparence** : un tronçon de tube circulaire en arc surélevé, les deux extrémités au sol.
- **Analogie** : pont en arc, arc-en-ciel, poignée en forme de porte.
- **Usage** : pont, arc de porte, ruban décoratif.
- **Astuce** : `跨度` (portée) est la distance horizontale entre les deux extrémités, `拱高` (hauteur de l'arc) est la hauteur soulevée au milieu — **le rapport des deux détermine s'il s'agit d'« un arc plat » ou d'« un arc haut »**. La limite supérieure de `管半径` (rayon du tube) se resserre automatiquement selon la portée/hauteur de l'arc, pour éviter que le tube ne soit si épais qu'il bouche le trou de l'arc. Plus `弯曲分段` (segments de courbure) est grand, plus c'est arrondi ; plus il est petit, plus on a un effet de lignes brisées.

### 14.4 Corps de révolution lathe
- **Paramètres** : `分段` (segments) (≥ 3) / `底面半径` (rayon de la base) / `中间半径` (rayon intermédiaire) / `最宽半径` (rayon le plus large) / `高度` (hauteur).
- **Apparence** : un corps tourné autour de l'axe central à partir d'un profil (vase/toupie).
- **Analogie** : vase, ampoule, toupie, coupe à pied.
- **Usage** : récipient symétrique, vaisselle, sculpture.
- **Astuce** : les trois rayons contrôlent respectivement **le bas, la taille, le point le plus bombé**. Pour faire un « vase », faites en sorte que `最宽半径` (rayon le plus large) > `中间半径` (rayon intermédiaire) > `底面半径` (rayon de la base) ; pour faire une « toupie », l'inverse. `分段` (segments) contrôle la précision circulaire, minimum 3 segments (alors aspect de tronc à trois faces).

### 14.5 Tétraèdre régulier tetra
- **Paramètres** : `底面边长` (longueur du côté de la base).
- **Apparence** : le plus petit polyèdre à 4 faces triangulaires régulières.
- **Analogie** : pyramide triangulaire, fragment de cristal.
- **Usage** : gravier, décoration low-poly, symbole pointu.
- **Astuce** : peu de faces, arêtes dures, très adapté au style « dur/technologique ».

### 14.6 Corps cylindrique barrel
- **Paramètres** : `顶半径` (rayon supérieur) / `底半径` (rayon inférieur) / `高度` (hauteur) (l'ancien « rayon » ambigu a été supprimé).
- **Apparence** : cylindre dont les diamètres haut et bas peuvent différer.
- **Analogie** : tonneau en bois, pot de fleur, gobelet en papier, milieu de fusée.
- **Usage** : récipient, fuselage, réservoir.
- **Astuce** : **c'est le corps cylindrique le plus flexible** — diamètres égaux = cylindre ; plus petit en haut et plus grand en bas = pot de fleur ; plus grand en haut et plus petit en bas = gobelet en papier ; en réglant `顶半径` (rayon supérieur) proche de 0, on obtient un cône.

### 14.7 Demi-sphère dome
- **Paramètres** : `半径` (rayon).
- **Apparence** : une demi-sphère (partie supérieure).
- **Analogie** : toit de yourte, observatoire, cloche.
- **Usage** : toit, couvercle, planétarium.
- **Astuce** : combiné avec box, on obtient une « petite maison à toit » ; retourné (en rotation), c'est un « bol ».

### 14.8 Surface torique ouverte helix
- **Paramètres** : `外环半径` (rayon de l'anneau extérieur) / `内环半径` (rayon de l'anneau intérieur) / `主扫掠角` (angle de balayage principal) (l'ancien « rayon du tube » a été supprimé, remplacé par les doubles rayons intérieur/extérieur cohérents avec la surface torique).
- **Apparence** : un anneau à entaille — un arc de la surface torique a été coupé.
- **Analogie** : clip en C, bracelet ouvert, un tour de ressort.
- **Usage** : décoration dynamique, symbole de tourbillon, anneau d'énergie, structure de clip.
- **Astuce** : `主扫掠角` (angle de balayage principal) c'est « de combien de degrés l'anneau a tourné au total » : 360° est la surface torique complète, 270° est le C classique, 180° est la demi-anneau. **Modifier ce seul paramètre permet de passer en douceur de « fermé » à « ouvert »**.

### 14.9 Prisme à base octogonale octaPrism
- **Paramètres** : `底面边长` (longueur du côté de la base) / `高度` (hauteur) (l'ancien « rayon » devient la longueur du côté plus intuitive).
- **Apparence** : pilier droit à huit faces verticales.
- **Analogie** : colonne octogonale, phare, paroi de puits.
- **Usage** : colonne régulière, corps de tour, socle.
- **Astuce** : plus « anguleux » que le cylindre, plus « arrondi » que le box, bon compromis.

### 14.10 Étoile 3D star3d
- **Paramètres** : `外半径` (rayon extérieur) / `内半径` (rayon intérieur) / `角数` (nombre de pointes) / `厚度` (épaisseur).
- **Apparence** : une étoile extrudée en une forme tridimensionnelle avec épaisseur.
- **Analogie** : médaille, pendant étoile, insigne, engrenage.
- **Usage** : symbole de récompense, corps décoratif, Logo.
- **Astuce** : `角数` (nombre de pointes) peut être bien plus de 5 — réglé sur 3 c'est une étoile à trois branches, augmenté et combiné à « rayons intérieur/extérieur proches » devient un **engrenage**. `内半径` (rayon intérieur) est automatiquement limité à être inférieur à `外半径` (rayon extérieur).

❓ **Réfléchissez** : si l'on vous demandait d'assembler un « robot » avec pas plus de 4 types de graphiques 3D, quels 4 choisiriez-vous ? Pour quelles parties respectivement ?

---

## Chapitre 15 : « Debout » et « couché » : la différence essentielle entre 3D et 2D

### 15.1 Volume vs surface

- **Le 3D a un volume** : occupe l'espace, projette une ombre, peut se masquer mutuellement. Il « tient debout » sur le sol, a une hauteur (axe vert Z).
- **Le 2D n'a que la surface** : étalé en une nappe, épaisseur zéro. Il « repose » sur le sol (Z=0).

Comprendre cela, vous saisissez pourquoi les objets 3D peuvent « s'empiler », tandis que le 2D ne peut que « paver le sol ».

### 15.2 Pourquoi l'un est debout et l'autre couché

Dans le code, le 3D utilise `seatOnGround` pour faire tomber la base à y=0 (l'interface web indique Z=0) ; le 2D utilise `shape2D` pivoté vers le plan XZ (sol) et collé au sol. Ainsi :
(Remarque : le « sol / plan XY / Z=0 » ci-dessus est la dénomination de **l'interface web** ; ici le `y=0` / `plan XZ` est la dénomination du **système de coordonnées interne de Three.js** — les deux désignent le même sol, seules les conventions de nommage diffèrent : Three.js utilise en interne l'axe Y pour la « hauteur », correspondant à l'axe vert Z indiqué par l'UI de ce livre ; les axes internes X, Z correspondent aux X (avant/arrière), Y (gauche/droite) indiqués par l'UI de ce livre.)
- placez un box, il « s'assied » naturellement sur le sol ;
- placez un heart, il « adhère » naturellement au sol.

### 15.3 Astuces de combinaison

- Voulez-vous que le 2D « se dresse » ? Faites-le pivoter de 90° autour de l'axe rouge (Y), il passe de « couché » à « debout » — peut servir de panneau dressé, enseigne ;
- Voulez-vous que le 3D « s'allonge » ? Pivotez-le pour le faire tomber sur le côté, pour faire « un arbre renversé », « une planche appuyée en biais » ;
- symbole au sol (flèche de guidage) + bâtiment en volume, c'est la combinaison la plus courante des scènes.

✏️ **Entraînez-vous** : placez un arrow (2D), sélectionnez-le puis pivotez de 90° autour de Y (rouge/gauche-droite), observez son passage de « flèche couchée au sol » à « panneau de guidage dressé ». C'est le basculement libre « debout et couché ».

---

# Quatrième partie : Couleur et matériau

La couleur est « l'émotion » de l'œuvre. Ce chapitre part de « qu'est-ce que la lumière », passe par les 27 couleurs prédéfinies, la sélection personnalisée, les 12 motifs, et aborde enfin le collage d'image et l'opacité.

## Chapitre 16 : Initiation à la couleur : le jeu de l'œil humain et de la lumière

### 16.1 La couleur n'est pas « intrinsèque » à l'objet

Une pomme rouge dans le noir est noire — vous voyez du rouge parce que la lumière la frappe et est « réfléchie » dans vos yeux. Donc **couleur = objet + lumière**. Cet outil utilise `MeshStandardMaterial` (matériau sensible à la lumière) ; la scène comporte une lumière ambiante (intensité 1,0) et une lumière directionnelle (intensité 2,6), c'est ainsi que l'objet montre clair-obscur.

💡 C'est pourquoi, pour une même couleur, la face opposée à la lumière « s'assombrit » — ce n'est pas la couleur qui change, c'est la lumière qui manque.

### 16.2 RGB : l'écran mélange trois couleurs primaires

L'écran utilise **rouge(R), vert(G), bleu(B)** trois faisceaux de lumière pour composer toutes les couleurs. Dans les couleurs prédéfinies de cet outil, `0xff0000` est « rouge plein, sans vert ni bleu = rouge pur ».

### 16.3 HSV : l'intuition de l'esprit humain pour choisir les couleurs

Plutôt que RGB, l'homme a plutôt l'habitude de choisir par **teinte(H, quelle couleur), saturation(S, vive ou non), valeur(V, claire ou non)**. Lorsque vous faites glisser le sélecteur de couleur, vous réglez en réalité le HSV.

- teinte = rouge orange jaune vert cyan bleu violet en un tour ;
- saturation basse → grisâtre ; saturation haute → vif ;
- valeur basse → sombre ; haute → clair (voire blanchâtre).

### 16.4 Deux paramètres cachés du matériau

La surface de l'objet a `roughness` (rugosité/0,6, plus grand = plus mat) et `metalness` (aspect métallique/0,0, plus grand = plus métallique). Par défaut, c'est plutôt « plastique mat ». Vous changez la couleur, ces deux paramètres restent généralement intacts, mais savoir qu'ils existent permet de comprendre « pourquoi ce n'est pas un reflet miroir ».

### 16.5 Opacité : laisser la lumière passer

Outre la couleur, il y a « transparent ou non ». Détaillé au chapitre 20 plus loin ; retenez ici : opacité 1 = plein, 0 = invisible.

❓ **Réfléchissez** : pourquoi les murs des hôpitaux et les tenues chirurgicales utilisent-ils souvent « bleu clair/vert clair faiblement saturé » ? Comment la saturation haute ou basse de la couleur influence-t-elle l'émotion humaine ?

✏️ **Entraînez-vous** : placez une sphère blanche, basculez vers différentes vues, observez si sa face opposée à la lumière s'assombrit. C'est la preuve直观 que « la lumière sculpte la couleur ».

---

## Chapitre 17 : 27 couleurs prédéfinies : une touche pour colorer

Le moyen le plus rapide de colorer est de cliquer directement sur une prédéfinie. Cet outil en intègre **27**, réparties en quatre groupes selon les commentaires du code source :

### 17.1 Noir, blanc, gris (1–3)
| Nom | HEX | Ressemble à |
| --- | --- | --- |
| Noir | `#000000` | Encre, nuit, contour |
| Blanc | `#ffffff` | Papier, neige, reflet |
| Gris | `#888888` | Béton, fond neutre |

### 17.2 Trois primaires RGB (4–6)
| Rouge | Vert | Bleu |
| --- | --- | --- |
| `#ff0000` | `#00ff00` | `#0000ff` |

### 17.3 Trois secondaires CMY (7–9)
| Cyan | Magenta | Jaune |
| --- | --- | --- |
| `#00ffff` | `#ff00ff` | `#ffff00` |

### 17.4 Couleurs étendues (10–27, palette moderne plus douce)
Rouge vif `#ff4444`, orange `#ff8800`, jaune doré `#ffcc00`, vert vif `#44ff44`, bleu-vert `#00cc88`, bleu vif `#4488ff`, violet `#8844ff`, rose magenta `#ff44aa`, cyan clair `#6ee7ff`, violet clair `#c084fc`, rose clair `#fb7185`, vert émeraude `#34d399`, ambre `#fbbf24`, bleu ciel `#60a5fa`, rose `#f472b6`, lavande `#a78bfa`, rouge corail `#f87171`, gris ardoise `#94a3b8`.

💡 Les couleurs prédéfinies sont des « assortiments sûrs » réglés par le concepteur ; les débutants qui cliquent directement ne seront généralement pas laids. Pour une couleur de marque, utilisez la personnalisation du chapitre 18.

✏️ **Entraînez-vous** : avec les couleurs prédéfinies, colorez le « lampadaire » du chapitre 13 — mât en gris ardoise, boîte lumineuse en ambre, capuchon supérieur en rouge corail. Ressentez « l'assortiment, c'est le caractère ».

---

## Chapitre 18 : Couleur personnalisée : HEX, HSV et pipette d'écran

### 18.1 Qu'est-ce que le HEX

Le HEX est `#` suivi de 6 chiffres hexadécimaux, deux par deux représentant R, G, B. Par exemple la couleur de marque `#1e90ff` (bleu dodger). Pour reproduire précisément une couleur, saisir le HEX est le plus exact.

### 18.2 Comment faire glisser le sélecteur

Cliquez sur le bouton « Sélecteur » du panneau droit, une fenêtre de couleur apparaît, contenant « grand bloc de couleur + barre de teinte + champs de saisie HEX/RGB » :
- cliquer / glisser dans le grand bloc de couleur → choisir **saturation + valeur** (gauche-droite gère la densité, haut-bas gère la clarté) ;
- glisser la **barre de teinte** en dessous → régler la **teinte** (rouge orange jaune vert cyan bleu violet en un tour) ;
- pour une précision absolue, saisir directement des chiffres dans les champs HEX ou R/G/B est le plus sûr.

💡 Pour trouver « des tons clairs/foncés d'une même famille », gardez la barre de teinte **fixe** et ne glissez que haut-bas dans le grand bloc (changez la valeur), l'assortiment sera le plus harmonieux.

### 18.3 Pipette d'écran

Certaines versions offrent « prélever la couleur depuis l'image » : cliquez sur la pipette, puis cliquez n'importe où dans l'image (y compris la couleur d'un autre objet, l'arrière-plan), et cette couleur est prélevée. Très pratique pour un assortiment « tiré de la réalité ».

### 18.4 Qu'est-ce que « aucune couleur » (NO_COLOR)

Dans le code source, il y a le marqueur spécial `NO_COLOR = -1`. En le sélectionnant, l'objet **n'applique pas de couleur unie** (souvent combiné avec un collage d'image ou un matériau spécial, donnant un effet « sans couleur de fond »).

⚠️ **Attention** : cliquer par erreur sur « aucune couleur » fait paraître l'objet « non coloré/assombri », ce n'est pas cassé, il suffit de reselectionner une couleur normale.

✏️ **Entraînez-vous** : saisissez en HEX une couleur que vous aimez (ex. `#ff6b6b`), appliquez-la au cube ; puis avec la pipette, prélevez une couleur depuis un endroit de la page, et comparez les deux.

---

## Chapitre 19 : 12 motifs de texture : donner une histoire aux surfaces

La couleur unie est trop plate, les motifs donnent du « contenu » à l'objet. Cet outil intègre **12 motifs** (`PATTERNS`) :

| Motif | Ressemble à / usage |
| --- | --- |
| Uni | Sans motif, le plus propre |
| Damier | Échiquier, nappe, dalle au sol |
| Rayures | Zèbre, avertissement, tissu |
| Points | Robe à pois, bonbon |
| Dégradé | Ciel, transition métallique |
| Mur de briques | Mur, bâtiment |
| Diagonales | Sensation de vitesse, technologie |
| Vagues | Vague d'eau, soie |
| Pointillé | Pixel, panneau technologique |
| Croisé | Tissu grillagé, bandage |
| Grille | Papier millimétré, ingénierie |
| Filet | Tourbillon, tuyau fileté |

💡 La couleur du motif est déduite automatiquement de la « couleur / couleur de remplissage » actuelle (sans couleur, la couleur du motif est blanche) ; le panneau droit **n'a pas de contrôle séparé « couleur de motif »**, changer de couleur change la couleur globale.

⚠️ **Attention** : un motif complexe (comme mur de briques, grille) collé sur une sphère à peu de faces se « déforme par étirement », c'est normal ; pour un rendu net, privilégiez box/cylinder et autres corps à nombreuses faces planes.

✏️ **Entraînez-vous** : placez un box, essayez successivement « mur de briques » « damier » « rayures », ressentez comment le motif change instantanément « ce à quoi il ressemble » (un mur vs un tissu vs un panneau d'avertissement).

---

## Chapitre 20 : Coller une image importée et opacité

### 20.1 Importer une image : coller une photo sur la surface

Outre les motifs prédéfinis, vous pouvez aussi **importer votre propre image** (PNG/JPG) comme texture de surface — logo d'entreprise, photo, dessin à la main, tout va. Une fois collée, la surface de l'objet « imprime » cette image.

- Convient à : panneau avec photo réelle, médaille avec logo imprimé, sol avec carte collée ;
- Astuce : l'image doit être plutôt carrée et nette, collée sur la face avant du box c'est le plus clair.

### 20.2 Opacité (opacity)

Le panneau droit permet de régler « l'opacité » :

1 = entièrement plein ;
0,1 = presque invisible ;
valeur intermédiaire = semi-transparent (verre, fantôme, effet d'eau).

💡 Réaliser « cloche en verre » « glace » « fantôme » repose entièrement là-dessus. Semi-transparent, les objets derrière transparaissent, la profondeur s'enrichit aussitôt.

### 20.3 Combinaison

- motif + semi-transparent = voile flou ;
- uni + très transparent = brique de verre.

❓ **Réfléchissez** : pour représenter « un bloc de glace », comment combineriez-vous couleur, opacité, motif ? Pour représenter « un mur de briques mais semi-transparent », dans quel but ?

✏️ **Entraînez-vous** : importez une image de votre ordinateur et collez-la sur un box plat ; puis réglez l'opacité de ce box à 0,5, observez l'effet « l'image devient semi-transparente ».

---

# Cinquième partie : Texte et image

Outre les formes, la scène a besoin de « caractères » et de « photos » pour transmettre des informations. Cette partie traite des deux objets « de contenu » que sont le texte et l'image.

## Chapitre 21 : Ajouter du texte : faire parler la scène

### 21.1 Le texte est « une plaque mince qui parle »

Panneau, nom, indication, slogan… les caractères donnent une sémantique à la scène tridimensionnelle. L'objet texte est au fond une « plaque mince avec des caractères collés », pouvant être sélectionné, déplacé, pivoté, mis à l'échelle et coloré comme un objet ordinaire.

### 21.2 Trois étapes pour ajouter du texte

1. Dans le « Outils » du panneau gauche, choisissez « Ajouter du texte » ;
2. Cliquez une fois sur le sol central, une **zone de saisie** apparaît (texte placeholder « 输入文本······ ») ;
3. Saisissez le texte, appuyez sur **Enter** pour confirmer, le texte tombe au sol ; dans la zone de saisie, **Shift + Enter** permet un retour à la ligne (texte multiligne).

💡 Le placeholder « 输入文本······ » sert seulement à vous rappeler « tapez ici », ce n'est pas un contenu en soi ; il n'apparaîtra pas dans l'œuvre finale.

### 21.3 Modifier le contenu : double-clic

Après placement, voulez-vous changer le texte ? **Double-cliquez** sur l'objet texte, la zone de saisie réapparaît, modifiez puis validez. Inutile de supprimer et re-ajouter.

### 21.4 Le texte est aussi un objet complet

Le texte prend en charge toutes les opérations habituelles : sélection, translation (bleu avant/arrière / rouge gauche/droite / vert élévation), rotation, mise à l'échelle, changement de couleur, réglage d'opacité. Faire « texte lumineux » « texte semi-transparent » est possible.

✏️ **Entraînez-vous** : ajoutez une ligne « 欢迎 », déplacez-la à l'entrée de la scène ; puis double-cliquez pour la changer en « 欢迎光临 », ressentez la commodité de l'édition instantanée.

---

## Chapitre 22 : Police, taille, graisse et orientation horizontal/vertical

Après sélection du texte, le panneau droit affiche les contrôles propres au texte. Cet outil offre **plusieurs jeux de polices intégrées** (5 par langue, qui changent avec la langue d'interface courante) et plusieurs commutateurs de mise en page.

### 22.1 Comment choisir les polices (change avec la langue)

La liste des polices **n'est pas fixe** : elle change avec la langue d'interface courante — chaque langue a 5 polices intégrées propres. Par exemple, le chinois simplifié utilise par défaut 雅黑 / 宋体 / 楷体 / 黑体 / 仿宋 ; l'anglais utilise Arial / Georgia / Times / Courier / Verdana, etc. Le tableau ci-dessous est un exemple sous l'interface chinoise :

| Police | Tempérament / usage |
| --- | --- |
| 雅黑 | Moderne, clair, choix par défaut pour le chinois |
| 宋体 | Formel, allure de livre |
| 楷体 | Toucher manuscrit, traditionnel, plaque |
| 黑体 | Lourd, titre accrocheur |
| 仿宋 | Document officiel, délicat |
| Arial | Occidental moderne sans empattement |
| Times | Occidental avec empattement, formel |
| Courier | Occidental à chasse fixe, code/machine à écrire |

💡 Le contenu chinois privilégie les cinq premières ; l'anglais pur peut utiliser les trois dernières pour différents tempéraments. Après avoir changé la langue d'interface, la liste déroulante des polices affiche les polices propres à cette langue.

### 22.2 Taille de caractère (par défaut 80)

La taille par défaut est **80**, réglable dans le panneau droit. Trop grand risque de « percer » la proportion de la scène, trop petit illisible.

⚠️ **Attention** : la taille est relative aux unités de la scène, à assortir à la taille de vos formes — donner une taille de 500 à un cube de 1,2 unité, le texte sera bien plus grand que l'objet.

### 22.3 Graisse (commutateur gras)

Un clic pour mettre en gras, le titre ressort davantage. Avec les polices gras / régulières, l'effet « enseigne » est particulièrement réussi.

### 22.4 Alignement horizontal / vertical

- **Alignement horizontal** : une ligne de texte normale, de gauche à droite ;
- **Alignement vertical** : disposé de haut en bas, idéal pour les plaques chinoises, les titres de livres, les enseignes.

💡 Suggestion de combinaison : vertical + police régulière + grande taille = plaque traditionnelle ; horizontal + police grasse + taille moyenne = enseigne moderne.

⚠️ **Attention** : un texte trop long peut dépasser la largeur de la plaque ; vous pouvez appuyer sur **Shift + Enter** dans le champ de saisie pour aller à la ligne, ou réduire la taille du texte.

✏️ **À essayer** : réalisez une enseigne verticale « 茶馆 » (salon de thé) (police régulière, alignement vertical, grande taille, couleur bois), et ressentez le « caractère » de la combinaison des polices.

### 22.5 Lecture seule entre langues : changer de langue, on ne peut que voir

Un objet texte **se souvient de la langue dans laquelle il a été créé** (la langue des textes de l'interface). Lorsque vous changez la langue d'interface pour **une autre langue**, les contrôles propres à cette zone de texte **deviennent automatiquement en lecture seule / désactivés** : le champ d'édition du corps, la police, l'épaisseur et l'orientation horizontale/verticale ne peuvent plus être modifiés — on ne peut que voir. Cela évite, en réécrivant avec une police de langue non correspondante, que le texte se corrompe ou que la mise en page casse. À ce moment, la liste déroulante des polices ne conserve que la police propre à cette zone de texte, et ne liste plus tout le jeu de polices de la langue.

> 📌 Vous voulez continuer à éditer ? Revenez à la langue d'interface utilisée lors de la création de la zone de texte pour rétablir tous les contrôles.

### 22.6 L'arabe interdit l'alignement vertical

En passant à l'interface en **arabe (ar)**, le bouton d'alignement vertical est **désactivé de force et verrouillé sur l'horizontal** (l'arabe s'écrit de droite à gauche, et l'alignement vertical embrouillerait le sens de lecture). Il s'agit d'une interdiction stricte pour cette langue, indépendante de la « lecture seule entre langues » du 22.5 — elles ne sont pas en conflit.

---

## Chapitre 23 : L'objet image : intégrer une photo dans le monde 3D

### 23.1 Ajouter un objet image

Dans le panneau de gauche, « Outils », sélectionnez « Ajouter une image » → choisissez un fichier image local → cliquez sur le sol, l'image apparaît sous forme de **planche collée** (comme une photo dressée).

### 23.2 Manipuler comme un objet ordinaire

Une fois sélectionnée, elle peut être déplacée, pivotée, mise à l'échelle. Elle peut s'appuyer obliquement contre un mur, être posée à plat comme décoration au sol, ou être levée comme enseigne.

### 23.3 L'image peut aussi servir de « texture »

Comme expliqué au chapitre 20, une image peut être « collée » sur la surface de n'importe quel objet 3D (comme matériau de surface). Ainsi, une même image a deux usages :

- **Faire une planche indépendante** : servir de « photo » dans la scène ;
- **Faire une texture de surface** : être imprimée sur la surface d'un box / cylinder, etc.

### 23.4 Image vs forme 2D

| | Objet image | Forme 2D |
| --- | --- | --- |
| Contenu | Vos propres photos / Logo | Formes générées par le logiciel |
| Changement de couleur | Généralement ajusté globalement en tant que texture | Couleur unie / motif modifiable |
| Usage typique | Photos réalistes, Logo réels | Symboles, repères, décoration |

Les deux sont « minces », peuvent être dressés ou couchés, à choisir selon vos besoins.

✏️ **À essayer** : importez une de vos photos, faites-en une « planche collée » dressée dans la scène ; puis collez la même image comme texture sur la face avant d'un box, et comparez les différences entre les deux usages.

---

# Sixième partie : Pinceau et gomme

Les deux parties précédentes parlaient des « formes standard », celle-ci parle du « dessin à main levée » — le pinceau vous permet de tracer des lignes dans la scène comme avec un stylo, et la gomme les efface.

## Chapitre 24 : Pinceau 2D : tracer sur le sol

### 24.1 Qu'est-ce que le pinceau 2D

Le pinceau 2D dessine des **lignes planes** sur le **sol (plan XZ)**, comme si l'on traçait sur du papier. Il convient pour dessiner des motifs collés au sol, des chemins, des graffitis, des repères au sol.

### 24.2 Comment l'utiliser

1. Dans le panneau de gauche, « Outils », sélectionnez « Pinceau 2D » ;
2. Sur le sol central, **maintenez le bouton gauche et faites glisser**, relâcher termine le trait ;
3. Vous pouvez tracer plusieurs traits à la suite.

### 24.3 Maintenir Shift pour contraindre en ligne droite

En faisant glisser tout en maintenant **Shift**, la ligne est **contrainte en ligne droite** (entre deux points). Très pratique pour tracer « une route bien droite » ou « un bord bien régulier ».

> Verrouillage de direction : une fois en mode ligne droite contrainte, **tant que ce trait (dessiné en maintenant le bouton gauche) n'est pas terminé, la direction reste verrouillée sur la direction horizontale / verticale / 45° déterminée au départ**, même si la souris s'écarte en cours de route. Pour changer de direction, il faut relâcher le bouton gauche et recommencer un trait.

### 24.4 Les quatre propriétés du pinceau

Dans le panneau de droite (lorsque le pinceau est actif), vous pouvez régler :

| Propriété | Fonction |
| --- | --- |
| Couleur | La couleur de la ligne |
| Épaisseur | La largeur de la ligne |
| Opacité | Si la ligne est pleine ou non |
| Espacement minimal | Distance minimale entre les points d'échantillonnage ; plus petit = plus lisse et plus dense |

💡 Plus l'« espacement minimal » est petit, plus la ligne est fine mais avec plus de sommets ; plus il est grand, plus c'est économique mais avec un effet de lignes brisées. Réduisez-le pour des courbes fines, augmentez-le pour des esquisses.

### 24.5 Pinceau vs forme 2D

- La forme 2D est une « forme standard » (cercle, cœur…), dont on peut changer la couleur et le motif ;
- Le pinceau 2D est « n'importe quelle ligne dessinée à la main », libre mais irrégulière.

Pour des symboles standard, utilisez les formes ; pour un graffiti au hasard, utilisez le pinceau.

✏️ **À essayer** : avec le pinceau 2D, tracez un symbole « ∞ » sur le sol, puis maintenez Shift pour tracer une ligne droite qui le traverse, et ressentez la différence entre ligne libre et ligne contrainte.

---

## Chapitre 25 : Pinceau 3D et plan de référence

### 25.1 Qu'est-ce que le pinceau 3D

Le pinceau 3D dessine des **tuyaux tridimensionnels dans l'espace** — pas collés au sol, mais des « lignes-tuyaux » suspendues dans les airs. Il vous permet de « dessiner dans l'air ».

### 25.2 Plan de référence : le premier trait détermine « sur quelle couche on dessine »

Lors du premier clic du pinceau 3D, un **« plan de référence » semi-transparent** est déterminé. Les glissements suivants se réfèrent à ce plan, et les lignes tombent à proximité.

💡 Vous voulez tracer une **ligne horizontale** ? Passez d'abord en « vue de dessus », cliquez pour déterminer un plan de référence horizontal ; vous voulez tracer une **ligne verticale** ? Passez en « vue de face / gauche / droite » puis déterminez un plan vertical. L'orientation du plan de référence détermine la « dimension » de ce que vous dessinez.

### 25.3 Dessiner sur le plan, Shift contraint la ligne droite

- Faites glisser librement sur le plan de référence ;
- En faisant glisser tout en maintenant **Shift**, contraint en ligne droite (identique à la contrainte Shift du pinceau 2D, mais appliquée aux tuyaux spatiaux).

> Verrouillage de direction : idem, après la contrainte Shift en ligne droite, **la direction reste verrouillée tant que le trait n'est pas terminé**, impossible à changer en cours de route, il faut relâcher et recommencer un trait pour changer de direction.

### 25.4 Embouts en forme de boule

Les deux extrémités de chaque trait reçoivent automatiquement un **embout en forme de boule**, les lignes sont arrondies aux bouts sans trou, comme des tuyaux réels avec des bouchons aux extrémités.

### 25.5 Usages

- Sculpter au hasard des rubans, des connexions, des faisceaux d'énergie ;
- Dessiner des « lignes dynamiques » dans la scène (plus organique que de placer des corps standards) ;
- Faire de l'art abstrait, des schémas de circuits.

❓ **À réfléchir** : le concept de « plan de référence » du pinceau 3D, est-ce la même chose que le peintre qui « monte d'abord une feuille de papier » ? Pourquoi, en 3D, a-t-on particulièrement besoin de ce « papier virtuel » ?

✏️ **À essayer** : passez en « vue de dessus », avec le pinceau 3D déterminez un plan de référence horizontal et tracez une ligne ondulée ; puis passez en « vue de face » et tracez une autre ligne verticale, et ressentez la différence de dimension des lignes spatiales.

---

## Chapitre 26 : Gomme : global et local

Quand on se trompe, il faut pouvoir effacer. Cet outil a deux modes de gomme, au comportement différent, à bien distinguer.

### 26.1 Où basculer entre les deux modes

Dans les propriétés de la gomme du panneau de droite se trouve « Mode de gomme » : **Effacement global / Effacement local**.

### 26.2 Effacement global (par défaut)

En faisant glisser le cercle de gomme, tout ce qu'il touche est **supprimé en tant qu'objet entier** (tout un pinceau, toute une forme). C'est un nettoyage « à la hache ».

💡 Pour supprimer rapidement d'un coup tout un tracé 3D ou toute une forme, utilisez le mode global : enfermez et supprimez.

### 26.3 Effacement local

Après avoir activé « Effacement local » :

- **Trace 2D** : n'efface que le **segment qui intersecte** le cercle de gomme, le reste est conservé (retouche fine des lignes) ;
- **Trace 3D** : de même, n'efface que les **points de trajectoire qui intersectent** le cercle de gomme, le reste est conservé (les traces 2D et 3D prennent toutes deux en charge l'effacement local segment par segment) ;
- **Autres objets** (formes 3D/2D standard, texte, image) : restent supprimés en tant qu'**objet entier** (suppression globale).

⚠️ **Attention** : le mode local n'efface segment par segment que les « traces de pinceau (2D et 3D) » ; pour les formes standard, le texte, les images, c'est toujours la suppression de l'objet entier. Ne comptez pas sur le mode local pour « ronger un coin du cube ».

### 26.4 Taille de la gomme

Utilisez le curseur « Taille de la gomme » pour régler le rayon du cercle de gomme, indispensable pour retoucher les détails ou nettoyer en grand. Un cercle trop petit demande beaucoup de passages, trop grand risque de supprimer par erreur les voisins.

### 26.5 Les erreurs d'effacement peuvent être récupérées

Les objets supprimés par la gomme entrent dans l'historique comme les autres opérations — appuyez sur `Ctrl+Z` pour les récupérer. Donc effacez sans crainte.

✏️ **À essayer** : avec le pinceau 2D, tracez une longue courbe, activez d'abord « Effacement local » pour effacer un petit segment (le reste reste) ; puis passez en « Effacement global » et enfermez un autre tracé, voyez-le supprimé en entier. Comparez les deux modes.

---

# Septième partie : Angles de vue et observation

« Changer d'angle », on comprend souvent mieux. Cette partie explique comment observer et fixer votre angle d'observation.

## Chapitre 27 : Sept angles de vue prédéfinis : voir le monde sous un autre angle

### 27.1 Pourquoi changer d'angle

L'œil humain n'a qu'un seul angle, ce qui amène facilement à mal juger « avant-arrière-gauche-droite, qui est haut qui est bas ». Changer d'angle en un clic revient à faire le tour de l'œuvre. La barre du bas comporte **7 boutons de vue**.

### 27.2 Les sept angles un par un

| Vue | Vous êtes comme… | Plan principal vu (annotation Web) |
| --- | --- | --- |
| Perspective | Debout, regard normal | Plus grand près, plus petit loin, le plus naturel |
| Vue de dessus | Regardant vers le bas depuis le vrai-dessus | Plan X (bleu/avant-arrière) × Y (rouge/gauche-droite) |
| Vue de dessous | Regardant vers le haut depuis le vrai-dessous | Même que vue de dessus, mais retourné |
| Vue de face | Regardant de face, à hauteur | Plan Y (rouge/gauche-droite) × Z (vert/hauteur) |
| Vue arrière | Regardant de l'arrière, à hauteur | Même que vue de face, sens inverse |
| Vue gauche | Regardant de la vraie gauche, à hauteur | Plan X (bleu/avant-arrière) × Z (vert/hauteur) |
| Vue droite | Regardant de la vraie droite, à hauteur | Même que vue gauche, sens inverse |

💡 Retenez l'annotation Web : **X bleu = avant-arrière, Y rouge = gauche-droite, Z vert = hauteur**. La vue de dessus montre « avant-arrière × gauche-droite » (le sol), la vue de face montre « gauche-droite × hauteur » (la façade).

### 27.3 Quand utiliser laquelle

- **Perspective** : observation globale, capture d'écran de présentation ;
- **Vue de dessus** : positionnement précis, aligner une rangée d'objets (la vue en plan du sol est la plus précise) ;
- **Vue de face / gauche / droite** : vérifier « bien droit » « bien aligné », faire une composition symétrique ;
- **Vue de dessous / arrière** : rare mais permet de vérifier si « dos / dessous » correspond à l'attente.

❓ **À réfléchir** : pourquoi les architectes dessinent-ils « plan, élévation, élévation latérale » ? Parmi ces sept angles, lesquels correspondent à ces trois dessins techniques ?

✏️ **À essayer** : placez 3 formes différentes, cliquez respectivement sur vue de dessus, vue de face, vue droite, et observez la différence d'aspect de la même scène sous différents angles.

---

## Chapitre 28 : Masquer les repères et plein écran

### 28.1 Masquer les axes et la grille

Dans la barre supérieure se trouvent trois interrupteurs : « Axes », « Grille », « Sol » :

- Masquer les axes : retire les trois flèches avec lettres ;
- Masquer la grille : retire les carreaux du sol ;
- Basculer le sol : contrôle l'affichage et le masquage du plan de référence semi-transparent (plan de référence où les objets atterrissent). Lors de l'export de l'œuvre ou pour une image pure, on peut les masquer ensemble.

⚠️ **Attention** : avant de capturer / exporter une image de présentation, il est recommandé de **masquer d'abord les axes et la grille**, pour une image plus propre et plus « finie ». Ce ne sont que des repères, ils n'affectent pas l'œuvre elle-même.

### 28.2 Plein écran

| Forme | Mode plein écran |
| --- | --- |
| 🖥️📱 **Version Web** | Cliquez le bouton « Plein écran » de la barre supérieure ; 🖥️ côté souris, vous pouvez aussi appuyer sur **F11**. On entre en **plein écran navigateur**, la page occupe tout l'écran |
| 💻 **Version PC (Windows)** | Pas de bouton « Plein écran » ; appuyer sur **F11** ou le bouton « Maximiser » de la barre de titre donne **maximisation / restauration de fenêtre** (pas un vrai plein écran) |
| 🤖 **Version Android** | **Pas de bouton plein écran** — l'application tourne déjà en plein écran, aucun basculement nécessaire |

🖥️ Côté Web·souris, appuyer sur **Esc** ne fait que fermer les contrôles / annuler la sélection, et **ne quitte pas** le plein écran ; pour quitter le plein écran, appuyez à nouveau sur **F11** ou recliquez le bouton « Plein écran ». 💻 **Version PC (Windows)** : appuyer sur **F11** maximise/restaure, un nouvel appui sur **F11** quitte cet état (la version PC n'a pas de bouton « Plein écran »).

### 28.3 Une combinaison pratique

> Pour obtenir une image de présentation propre : masquer les axes + masquer la grille + vue perspective + (🖥️📱💻 optionnel) plein écran + capture d'écran.

✏️ **À essayer** : faites une petite scène, masquez d'abord axes/grille et capturez une « image propre » ; puis affichez-les et capturez une « image avec repères », comparez la différence de perception pour autrui.

---

# Huitième partie : Efficacité — faire « voler » vos mains

> Si les sept parties précédentes sont « apprendre les techniques », celle-ci est « cultiver le fond ». Même maîtrisées, si à chaque déplacement d'objet vous devez tirer le curseur de droite, et à chaque suppression cliquer un bouton, la vitesse ne montera pas.
>
> Ceux qui utilisent vraiment bien presque ne touchent pas aux curseurs — ils utilisent le **clavier**. Ce chapitre vous libère de votre « dépendance à la souris ».

> 📌 **Comment lire cette partie (important)**
> - 🖥️💻 **Web·souris / Version PC (Windows)** : toute cette partie s'applique, c'est la clé de votre rapidité, lisez-la attentivement.
> - 📱🤖 **Web·tactile / Version Android** : pas de clavier physique, les **raccourcis clavier** des chapitres 29, 31, 32 ne s'appliquent pas,
>   la zone d'aide « Raccourcis clavier » n'apparaît pas non plus dans l'application. **Sautez directement à la [table des gestes du chapitre 30](jump:Chapitre 30 : Opérations souris et gestuelles : les quatre formes expliquées)**, c'est votre outil d'efficacité.
>   (Si vous connectez un clavier physique à votre tablette, les raccourcis sont aussi disponibles, vous pouvez lire en même temps.)

---

## Chapitre 29 : Pourquoi mémoriser les raccourcis : les intérêts composés de l'efficacité

### 29.1 Un fait sous-estimé

Faites une petite expérience : placez un cube dans la scène, puis avec la souris faites aller-retour 10 fois le curseur « Mise à l'échelle uniforme » du « panneau de propriétés à droite », puis avec le clavier appuyez 10 fois sur les touches `+` / `-`.

Vous découvrirez quasi certainement : **le clavier est plus rapide, plus précis, moins fatigant.**

Trois raisons :
1. **La main ne quitte pas la zone centrale du clavier** — l'œil fixé sur l'image, les doigts sur les touches, le cerveau n'a pas à basculer sans cesse entre « regarder l'image → chercher le panneau → déplacer la souris → tirer le curseur ».
2. **Pas fixe** — une pression sur une flèche déplace l'objet précisément de « 0,1 grille », 10 pressions font exactement 1 grille. Tirer le curseur 10 fois, vous ne saurez plus du tout de combien vous avez bougé.
3. **Superposable, annulable** — chaque opération clavier entre dans la pile d'historique (voir [chapitre 32](jump:Chapitre 32 : Curseur / champ de saisie et combinaisons Ctrl)), une erreur se corrige d'un `Ctrl+Z` ; tandis que tirer le curseur est un changement continu, dont l'annulation « saute » souvent brutalement.

💡 **Une phrase-clé** : la souris gère « sélectionner » et « dessiner », le clavier gère « modifier » et « régler ». Travaillez en分工, l'efficacité double.

### 29.2 Les raccourcis dépendent aussi des « circonstances »

Les raccourcis de cet outil ne veulent pas dire « une seule chose globalement », mais **selon si un objet est sélectionné actuellement** :

| État actuel | Que font les flèches / A D W S |
|---|---|
| **Aucun objet sélectionné** | C'est la **caméra** qui bouge (vous tournez autour de la scène) |
| **Objet sélectionné** | C'est **cet objet** qui bouge (l'objet se déplace/pivote dans la scène) |

Une même touche `↑`, sans sélection, c'est « la caméra avance », avec sélection, c'est « l'objet avance ». Cette distinction est le cœur de tout le système de raccourcis, à graver d'abord dans la tête pour ne pas s'embrouiller ensuite.

❓ **À réfléchir** : pourquoi « bouger la caméra sans sélection » est une conception raisonnable ? — parce qu'à ce moment vous cherchez probablement « un angle, la vue d'ensemble », laisser le clavier translater/pivoter la vue directement est plus précis que tirer le vide (tirer le vide est continu, sans pas fixe).

### 29.3 Révisons d'abord le « langage des axes »

Toutes les expressions « le long des axes X / Y / Z » de cette partie se mémorisent selon l'**annotation de la page** (cohérente avec les étiquettes d'axes que vous voyez à l'écran) :

- **Axe X (bleu) = direction avant-arrière** (bleu ≈ « profondeur »)
- **Axe Y (rouge) = direction gauche-droite** (rouge ≈ « gauche-droite »)
- **Axe Z (vert) = direction hauteur, positif vers le haut** (vert ≈ « haut »)

> ⚠️ Rappel : ce sont les « axes annotés de la page ». En interne, le code utilise un autre jeu (X rouge Y vert Z bleu, Y vers le haut), mais ce que vous voyez à l'interface, dans le manuel et dans le panneau d'aide, c'est toujours l'annotation ci-dessus. Retenir les axes annotés suffit, ne vous laissez pas perturber par l'implémentation interne.

Retenez ce tableau, chaque chapitre suivant « construit des phrases » avec lui.

---

## Chapitre 30 : Opérations souris et gestuelles : les quatre formes expliquées

Les « opérations rapides » de cet outil **basculent automatiquement selon l'appareil** :

- 🖥️💻 **Web·souris et Version PC (Windows)** → affichent et utilisent les « opérations liées à la souris » (30.1) ;
- 📱🤖 **Web·tactile et Version Android** → affichent et utilisent les « gestes » (30.2).

Les deux tableaux ci-dessous sont **strictement identiques** à « opérations liées à la souris » et « gestes » dans « Paramètres → Opérations rapides » de l'application, à consulter selon votre forme.

### 30.1 Opérations liées à la souris (🖥️ Web·souris / 💻 Version PC (Windows))

| Opération | Description |
|---|---|
| Clic gauche | Sélectionner un objet/contrôle |
| Double-clic gauche | Éditer le texte |
| Maintenir gauche | Manipuler un objet/contrôle |
| Maintenir droit | Rotation de la vue |
| Maintenir molette | Translation de la vue |
| Molette | Zoom de la vue |

### 30.2 Opérations gestuelles (📱 Web·tactile / 🤖 Version Android)

| Opération | Description |
|---|---|
| Toucher simple (un doigt) | Sélectionner un objet/contrôle |
| Double toucher (un doigt) | Éditer le texte |
| Maintenir un objet (un doigt) | Ajouter/retirer de la sélection (équivalent clic Shift) |
| Glisser un objet (un doigt) | Manipuler un objet/contrôle |
| Glisser le vide (un doigt) | Rotation de la vue |
| Tapoter le vide (un doigt) | Annuler la sélection |
| Bouton « Tout sélectionner » | Sélectionner tous les objets |
| Bouton « Sélection rectangulaire » | Après activation, glisser un doigt pour sélectionner des objets en rectangle |
| Glisser deux doigts | Translation de la vue |
| Pincer deux doigts | Zoom de la vue |
| Cliquer retour (🤖 **Version Android uniquement**) | Même effet que `Esc` : ferme couche par couche les fenêtres supérieures (notes, sommaire, manuel, etc.), puis ferme les contrôles / annule la sélection ; sans fenêtre, sans outil, sans sélection, affiche une **confirmation de quitter** |

⚠️ 📱🤖 Côté tactile, seul la **Version Android** a le comportement « cliquer retour » (le bouton retour du navigateur/système du téléphone **quitte la page** ou l'application, ne déclenche pas cette logique). Pour le Web·tactile hors jeu mobile, utilisez plutôt le bouton de fermeture de l'interface et l'équivalent `Esc` (tapoter le vide pour annuler la sélection).

### 30.3 Table de correspondance souris ↔ gestes

Les deux jeux d'opérations sont au fond deux modes de saisie d'une même chose :

| Intention | 🖥️💻 Souris | 📱🤖 Geste |
|---|---|---|
| Sélectionner | Clic gauche | Toucher simple (un doigt) |
| Éditer le texte | Double-clic gauche | Double toucher (un doigt) |
| Ajouter/retirer | `Shift` + clic | Maintenir un objet (un doigt) |
| Manipuler un objet | Maintenir gauche + glisser | Glisser un objet (un doigt) |
| Rotation de la vue | Maintenir droit | Glisser le vide (un doigt) |
| Translation de la vue | Maintenir molette | Glisser deux doigts |
| Zoom de la vue | Molette | Pincer deux doigts |
| Tout sélectionner | `Ctrl + A` | Bouton « Tout sélectionner » |
| Sélection rectangulaire | Glisser directement le vide | Bouton « Sélection rectangulaire » → glisser un doigt |
| Annuler / Retour | `Esc` | Tapoter le vide (un doigt) |

💡 Seul « l'organe de saisie » diffère. Côté tactile sans clavier, ces gestes et les deux boutons dédiés sont tout votre « opérations rapides ».

---

## Chapitre 31 : Opérations à une touche et combinaisons Shift

Les raccourcis clavier obéissent à une règle centrale : **selon si un objet est sélectionné actuellement**. Les deux tableaux ci-dessous sont **strictement identiques** à « opérations à une touche » et « combinaisons Shift » dans « Paramètres → Opérations rapides » de l'application, à utiliser directement en correspondance.

### 31.1 Opérations à une touche

> Objet sélectionné : translation 0,1 grille (0,15 longueur) / rotation 5° ; non sélectionné : translation de la vue 0,1 grille / rotation 5°.

| Touche | Objet sélectionné | Non sélectionné |
|---|---|---|
| `↓` / `↑` | Translation le long de X +/− | Vue arrière / avant |
| `→` / `←` | Translation le long de Y +/− | Vue droite / gauche |
| `PgUp` / `PgDn` | Translation le long de Z +/− | Vue haut / bas |
| `A` / `D` | Rotation autour de Z horaire / anti-horaire | Vue gauche / droite |
| `W` / `S` | Rotation autour de Y horaire / anti-horaire | Vue haut / bas |
| `E` / `Q` | Rotation autour de X horaire / anti-horaire | — |
| `+` / `-` | Agrandir / réduire 5% | — |
| `Esc` | Annuler l'opération | Fermer les contrôles |
| `F11` | 🖥️📱 Plein écran / quitter plein écran ; 💻 Maximiser / restaurer | (idem) |
| `Del` / `Backspace` | Supprimer l'objet sélectionné | — |

✏️ **À essayer** : placez un cube → sélectionnez-le et appuyez `↑` pour le voir « avancer » ; annulez la sélection (cliquez le vide) et appuyez `↑`, cette fois la caméra avance. Une même touche, deux identités.

### 31.2 Combinaisons Shift

> Objet sélectionné : translation 1 grille (1,5 longueur) / rotation 90° ; non sélectionné : translation de la vue 1 grille / rotation 90°.

| `Shift` + touche | Objet sélectionné | Non sélectionné |
|---|---|---|
| `↓` / `↑`, `→` / `←`, `PgUp` / `PgDn` | Translation 1 grille | Translation de la vue 1 grille |
| `A` / `D`, `W` / `S`, `E` / `Q` | Rotation 90° | Rotation de la vue 90° |
| `+` / `-` | Agrandir ×2 / réduire ×0,5 | — |
| Clic gauche | Ajouter un objet à la sélection (clic) | (idem) |
| Maintenir gauche (outil pinceau) | — | Mode ligne droite contrainte du pinceau (le tracé est contraint horizontal / vertical / 45° lors du dessin, même effet que la contrainte `Shift`) |

💡 Formule : **touche normale pour approcher, touche Shift pour mettre en place**. Ajustez d'abord avec les flèches jusqu'à peu près, puis `Shift`+flèche pour le dernier grand saut d'1 grille et aligner instantanément ; idem pour la rotation, d'abord `A` pour 5°, puis `Shift+A` pour compléter directement à 90° et redresser.

---

## Chapitre 32 : Curseur / champ de saisie et combinaisons Ctrl

### 32.1 Curseur / champ de saisie

Quand votre curseur est dans un curseur ou un champ numérique, les touches ci-dessous « modifient le nombre de ce champ » au lieu de manipuler l'objet — les raccourcis originaux **sont temporairement désactivés**. Ce tableau est **strictement identique** à « curseur / champ de saisie » dans « Paramètres → Opérations rapides » de l'application.

| Touche | Curseur | Champ de saisie |
|---|---|---|
| `→` / `←` | Augmenter / diminuer | Déplacer le curseur |
| `↑` / `↓` | Augmenter / diminuer | Augmenter / diminuer |
| `+` / `-` | — | Saisir le signe + / − |
| `PgUp` / `PgDn` | Augmenter / diminuer fortement | Faire défiler la barre de droite haut / bas |

⚠️ Pour utiliser les raccourcis d'objet, cliquez d'abord sur le vide de l'image ou sur un objet, pour que le focus quitte le champ de saisie.

### 32.2 Combinaisons Ctrl

| `Ctrl` + touche | Combinaison |
|---|---|
| `A` | Tout sélectionner |
| `N` | Nouvelle scène |
| `O` | Importer la scène |
| `S` | Exporter la scène |
| `P` | Capture d'écran / exporter l'image |
| `Z` | Annuler |
| `Y` | Rétablir |
| `C` | Copier |
| `V` | Coller |
| `D` | Cloner |
| `Del` / `Backspace` | Vider la scène (affiche « Vider la scène ? Cette opération est annulable. » boîte de confirmation, puis vide après confirmation ; le `Delete`/`Backspace` normal sans `Ctrl` ne supprime que les objets sélectionnés) |

⚠️ `Ctrl + Del` supprime tous les objets d'un coup, mais **affiche une boîte de confirmation** et le vidage **est annulable** (restauré par `Ctrl + Z`). Il reste recommandé d'exporter une sauvegarde avec `Ctrl + S` avant de vider.

### 32.3 Exercice complet : construire un « petit phare » au clavier seul

Enchaînez ce que cette partie a appris en une ligne de production :

1. Glissez un **cylindre** depuis le panneau dans la scène (la souris est inévitable, acceptez-le) ;
2. Sélectionnez-le, `Shift + PgUp` quelques fois pour l'« allonger » à la bonne position ;
3. `Ctrl + D` pour cloner un « bloc lumineux », `PgUp` pour le monter au sommet du pilier ;
4. `Shift + A` pour redresser le bloc lumineux à 90° (si besoin) ;
5. `Ctrl + A` tout sélectionner, `Ctrl + S` sauvegarder ;
6. Cliquez le bouton « Vue de face » pour redresser la vue, `Ctrl + P` pour capturer et livrer.

Hormis le placement de la forme à l'étape 1, presque aucun panneau souris touché — c'est le point d'arrivée de « l'efficacité » : laisser vos mains pousser sur le clavier.

---

✏️ **Bilan de la partie** : l'essence des raccourcis est « mapper les actions courantes sur les points de chute les plus naturels des doigts ». Retenez deux axes principaux — **non sélectionné = bouger la caméra, sélectionné = bouger l'objet** ; retenez trois axes — **X avant-arrière, Y gauche-droite, Z hauteur** ; retenez une touche d'accélération — **Shift pour les grands pas**. La partie suivante parle du « contrôle de transformation (les flèches directement déplaçables) » et de sa combinaison avec le clavier, pour un contrôle plus fluide.

---

# Neuvième partie : Transformation — les flèches qui « parlent »

> Au chapitre 32, vous avez déplacé les objets au clavier, c'est déjà rapide. Mais le clavier a un « pas fixe » — il convient aux déplacements précis et répétitifs, mais pas à « tirer au feeling pour être bien collé à un autre objet ».
>
> Le héros de cette partie, c'est ce groupe de **flèches colorées / anneaux / cubes** qui apparaît sur l'objet sélectionné, nommé en jargon « contrôle de transformation » (gizmo). Il vous permet de « saisir » l'objet directement à la souris et de le tirer.

---

## Chapitre 33 : Première rencontre avec le contrôle de transformation : trois « outils de préhension »

### 33.1 Quand il apparaît

Dès que vous **sélectionnez un objet** (cliquez dessus, apparaît un cadre de sélection), un groupe de poignées flotte au centre de l'objet. C'est le contrôle de transformation.
Il possède trois « habillages », correspondant à trois modes d'opération, commutables depuis la zone « Mode de transformation » du panneau droit (une petite zone avec trois boutons carrés portant les icônes ⇔ ↻ ⤢) :

| Mode | Icône du bouton | Apparence de la poignée | À quoi ça sert |
|---|---|---|---|
| **Translation** | ⇔ | Trois **flèches** | Déplacer l'objet d'un endroit à un autre |
| **Rotation** | ↻ | Trois **anneaux** | Faire pivoter l'objet |
| **Mise à l'échelle** | ⤢ | Trois **cubes** (petits cubes aux coins) | Agrandir ou réduire l'objet |

Par défaut, on démarre en mode **Translation**. Pour changer de mode, cliquez simplement sur le bouton correspondant ; lors du basculement, un texte d'indice défile aussi en bas (« Translation / Rotation / Mise à l'échelle »).

💡 Petit rappel : les contrôles de transformation et les raccourcis clavier sont **deux entrées pour une même opération** — le clavier fait du « pas précis », les contrôles font du « glisser libre ». On peut les mélanger : d'abord glisser à peu près avec les contrôles, puis affiner de quelques cases avec le clavier `↑` pour aligner. Le chapitre 36 expliquera spécialement comment les combiner.

### 33.2 Un « piège des couleurs » qu'il faut clarifier à l'avance

⚠️ **L'avertissement le plus important de tout le document, lisez absolument ce paragraphe.**

Les **étiquettes des axes** de coordonnées dans la scène utilisent les « couleurs d'annotation de la page » :
- **X = bleu = avant/arrière**
- **Y = rouge = gauche/droite**
- **Z = vert = hauteur**

Mais la coloration des poignées des contrôles de transformation suit la **convention des axes du code three.js** (rouge = X, vert = Y, bleu = Z), qui ne correspond **pas** à la série ci-dessus ! Ainsi, les couleurs des poignées que vous voyez se traduisent ainsi :

| Couleur de la poignée | Axe de code qu'elle représente réellement | Axe d'annotation de la page correspondant | Ce que ça signifie à l'écran |
|---|---|---|---|
| 🔴 Poignée rouge | Code X | Page **Y** | Déplacement **gauche/droite** / autour de l'axe gauche-droite |
| 🟢 Poignée verte | Code Y | Page **Z** | **Hauteur** (haut/bas) / autour de l'axe de hauteur |
| 🔵 Poignée bleue | Code Z | Page **X** | **Avant/arrière** / autour de l'axe avant-arrière |

> Pas besoin de retenir par cœur : retenez une phrase : **poignée rouge = gauche/droite, poignée verte = haut/bas, poignée bleue = avant/arrière** (à comprendre selon l'annotation de la page). Ne vous laissez pas piéger par le rouge/vert/bleu de surface en essayant d'appliquer « les couleurs des étiquettes d'axes de la scène ».

✏️ **Entraînez-vous (pour vérifier)** : sélectionnez un cube, passez en mode translation. D'abord tirez la **flèche rouge**, l'objet glisse-t-il « gauche/droite » ou « avant/arrière » ? — Il devrait glisser gauche/droite. Ensuite tirez la **flèche bleue**, glisse-t-elle « avant/arrière » ? Gravurez ce tableau dans votre tête avec cette expérience ; par la suite, aucun axe de rotation/mise à l'échelle ne vous perturbera.

### 33.3 Peut-on bouger la vue en tirant une poignée ?

Oui, et c'est un design très agréable de cet outil :

- **Clic gauche + glisser une poignée** = manipuler l'objet ;
- **Clic droit + glisser** = faire pivoter la vue (rotation caméra) ;
- **Clic molette + glisser** = translater la vue ;
- **Molette** = zoomer la vue.

Autrement dit, de la main gauche vous maintenez le clic droit pour tourner l'angle et voir le côté de l'objet, tandis que l'autre main (ou en changeant de touche) continue de tirer la poignée — la vue et la transformation **ne se gênent pas**. Plus besoin de « d'abord quitter la transformation, tourner la vue, puis revenir ».

---

## Chapitre 34 : Mode translation : « attraper » l'objet avec les flèches et le déplacer

### 34.1 Trois façons de tirer

En mode translation, outre les trois flèches d'axe, les contrôles proposent aussi **deux carrés de plan** (collés sur le plan formé par deux axes). Vous avez donc trois façons de saisir :

1. **Saisir une seule flèche** (rouge/vert/bleu) → on ne peut se déplacer que le long de cet axe, c'est le plus précis, ça ne dévie pas ;
2. **Saisir un carré de plan** (par exemple la face entre la flèche rouge et la flèche verte) → glisser librement dans ce plan, contraint par les deux axes en même temps ;
3. Pour « traîner librement collé au sol », basculez d'abord sur le plan correspondant puis tirez.

💡 Expérience : pour un « alignement précis », saisissez **toujours une seule flèche**, pas un plan — le plan risque d'entraîner l'objet dans une direction non voulue.

### 34.2 Comment reconnaître les plans (en lien avec le piège des couleurs)

En mode translation, un plan est « la zone triangulaire/carrée entre deux flèches adjacentes ». Selon la traduction de la section 33.2 :

- Le plan entre la flèche rouge (gauche/droite) + la flèche verte (haut/bas) = plan **gauche/droite × hauteur** (le « côté » de l'objet) ;
- Le plan entre la flèche verte (haut/bas) + la flèche bleue (avant/arrière) = plan **hauteur × avant/arrière** (le « visage de face / de dos » de l'objet) ;
- Le plan entre la flèche rouge (gauche/droite) + la flèche bleue (avant/arrière) = plan **gauche/droite × avant/arrière** = **sol** (le plan sur lequel l'objet « pose le pied »).

✏️ **Entraînez-vous** : posez l'objet sur le sol, saisissez le carré de plan entre « rouge + bleu » et tirez — glisse-t-il sagement collé au sol, sans monter ni s'enfoncer ? C'est la posture la plus stable pour une « translation au sol ».

### 34.3 Apprendre en comparant avec la translation clavier

| Action voulue | Avec les contrôles | Avec le clavier (chapitre 32) |
|---|---|---|
| Déplacer précisément de 0,1 case avant/arrière | Tirer la **flèche bleue** | `↑`/`↓` |
| Déplacer précisément de 0,1 case gauche/droite | Tirer la **flèche rouge** | `←`/`→` |
| Monter/descendre précisément en hauteur | Tirer la **flèche verte** | `PgUp`/`PgDn` |
| Déplacer d'un grand pas d'1 case | Tirer fermement une flèche avec les contrôles | `Shift` + touches fléchées |

💡 Formule : **les contrôles gèrent le « toucher », le clavier gère la « précision »**. D'abord tirez avec les contrôles jusqu'à être presque bon, puis affinez de quelques cases avec le clavier `↑`/`←`/`PgUp` pour coller aux lignes de la grille.

---

## Chapitre 35 : Mode rotation : l'anneau décide « autour de quel axe on tourne »

### 35.1 Trois anneaux = rotation autour des trois axes

Passez en mode rotation (↻), l'objet devient trois anneaux colorés, chaque anneau représentant « tourner autour de cet axe » :

| Couleur de l'anneau | Axe de code | Axe d'annotation de la page | Apparence (rappel de la métaphore du chapitre 32) |
|---|---|---|---|
| 🔴 Anneau rouge | Code X | Page **Y** (axe gauche/droite) | Comme une roulade **vers l'avant / vers l'arrière** |
| 🟢 Anneau vert | Code Y | Page **Z** (axe de hauteur) | Comme un plateau/toupie qui tourne sur place |
| 🔵 Anneau bleu | Code Z | Page **X** (axe avant/arrière) | Comme une chute latérale **vers la gauche / vers la droite** |

⚠️ La correspondance entre la couleur de l'anneau et « autour de quel axe on tourne » suit aussi le tableau de traduction de la section 33.2 — **anneau rouge autour de l'axe gauche/droite, anneau vert autour de l'axe de hauteur (le plus utilisé, pour redresser), anneau bleu autour de l'axe avant/arrière**.

### 35.2 Tirer un anneau pour tourner, c'est la même chose que les touches A/D/W/S/E/Q

Au chapitre 32 vous avez fait tourner l'objet au clavier, où il était dit :
- `A`/`D` tourne autour de l'**axe de hauteur** (page Z, axe vertical) ;
- `W`/`S` tourne autour de l'**axe gauche/droite** (page Y) ;
- `E`/`Q` tourne autour de l'**axe avant/arrière** (page X).

Correspondant aux anneaux des contrôles :
- Clavier `A`/`D` ↔ tirer l'**anneau vert** (axe de hauteur) ;
- Clavier `W`/`S` ↔ tirer l'**anneau rouge** (axe gauche/droite) ;
- Clavier `E`/`Q` ↔ tirer l'**anneau bleu** (axe avant/arrière).

✏️ **Entraînez-vous** : sélectionnez un objet ayant un « devant », appuyez `Shift + A` pour le faire tourner d'exactement 90° (le redresser), puis passez en mode rotation et tirez l'**anneau vert** — vous verrez que tirer à la main tourne aussi autour du même axe vertical, et peut s'arrêter à n'importe quel angle (le clavier ne fait que des sauts de 5°/90°, les contrôles peuvent s'arrêter sur une valeur intermédiaire). C'est exactement complémentaire.

### 35.3 Rotation libre vs rotation précise

- Anneau des contrôles : peut s'arrêter à **n'importe quel angle**, idéal pour « tourner jusqu'à ce que ça ait l'air bien » ;
- Clavier `Shift` + lettre : ne fait que des sauts entiers de **90°**, idéal pour « doit être redressé, doit être à angle droit » ;
- Clavier lettre simple : ne fait que des pas de **5°**, idéal pour « ajuster quelques degrés ».

💡 Pratique : d'abord tirer avec les contrôles jusqu'à l'angle approximatif → puis `Shift+A` (axe vert) pour compléter à exact 90°/180°, ce qui est le plus utilisé pour les textes 3D, les façades de bâtiments et autres travaux « qui doivent être droits ».

---

## Chapitre 36 : Mode mise à l'échelle : poignées carrées et interrupteur « proportionnel »

### 36.1 Poignées carrées : tirer un axe, ou gonfler l'ensemble

Passez en mode mise à l'échelle (⤢), de petits cubes apparaissent aux coins de l'objet. Tirer un seul cube = **ne s'étirer/écraser que le long de cet axe** (par exemple aplatir une sphère en ellipsoïde, allonger une colonne en haut-fin) ; tirer le cube central = mise à l'échelle globale.

| Couleur de la poignée | Axe d'annotation de la page | Effet en la tirant |
|---|---|---|
| 🔴 Cube rouge | Gauche/droite (Y) | Plus large / plus étroit |
| 🟢 Cube vert | Hauteur (Z) | Plus haut / plus bas |
| 🔵 Cube bleu | Avant/arrière (X) | Plus profond / moins profond |

### 36.2 Le verrouillage « mise à l'échelle proportionnelle » : l'interrupteur que les débutants doivent le plus activer

Sous la zone du mode de transformation du panneau droit se trouve une case à cocher **« Mise à l'échelle proportionnelle »** (cochée par défaut). Quand elle est cochée, peu importe le cube que vous tirez, l'objet est agrandi/réduit **globalement et proportionnellement**, sans se déformer — c'est généralement exactement ce que vous voulez.

⚠️ Si vous décochez, puis tirez un seul cube, l'objet se déformera par « étirement unidirectionnel ». Cela a des usages créatifs (par exemple des rondelles aplaties, des poutres allongées), mais les débutants risquent de la décocher par erreur puis de se demander « pourquoi c'est de travers ». En cas de doute, laissez cochée.

### 36.3 Comparaison avec la mise à l'échelle clavier, et « mise à l'échelle interdite en sélection multiple »

| Ce que vous voulez faire | Avec les contrôles | Avec le clavier (chapitre 32) |
|---|---|---|
| Agrandir globalement de 5 % | Tirer le cube central (proportionnel coché) | `+` |
| Réduire globalement de 5 % | Tirer le cube central | `-` |
| Doubler / réduire de moitié | Tirer fermement le cube central | `Shift`+`+` / `Shift`+`-` |
| Aplatir unidirectionnellement | Décocher proportionnel, tirer un cube seul | Non supporté par le clavier |

⚠️ **Limitation importante** : quand vous sélectionnez **plusieurs objets en une fois**, le mode mise à l'échelle est **automatiquement désactivé** (le bouton grise, et si vous étiez en mode mise à l'échelle il revient automatiquement à la translation). La raison est la même que pour le `+`/`-` clavier interdit en sélection multiple — forcer plusieurs objets de tailles différentes à se mettre à l'échelle ensemble donnerait un résultat bizarre.

💡 Alors comment ajuster la taille de manière uniforme en sélection multiple ? Deux solutions : ① après `Ctrl + A`, traiter un par un avec les contrôles/le clavier ; ② utiliser un autre moyen que « Mise à l'échelle proportionnelle » — par exemple les regrouper d'abord en catégories, et jouer sur la translation pour le placement plutôt que sur la mise à l'échelle.

### 36.4 Quand les contrôles de transformation « ne vous laissent pas faire »

Outre l'interdiction de mise à l'échelle en sélection multiple, il y a quelques autres cas où les boutons de mode de transformation grisent et deviennent non cliquables :

- Vous êtes dans un mode d'outil **pinceau / texte / gomme** (ces outils prennent en charge le clic eux-mêmes, les contrôles de transformation s'effacent d'abord) ;
- Vous **éditez du texte** (quand la boîte de saisie inline apparaît), les boutons de transformation sont temporairement désactivés, et réactivés après saisie ;
- L'**objet texte** ne supporte pas la mise à l'échelle proportionnelle ; le sélectionner masque les contrôles liés et désactive le mode mise à l'échelle, en revenant automatiquement à la translation ; les images et les traits de pinceau peuvent être mis à l'échelle normalement.

⚠️ Si vous trouvez que les trois boutons de mode ne répondent pas et sont gris, vérifiez d'abord : êtes-vous encore bloqué dans un outil sans en être sorti ? Appuyez `Esc` ou cliquez le bouton de type « Sélection » en haut pour quitter l'outil, et les contrôles de transformation revivent.

### 36.5 Contrôles et boîtes numériques : synchronisation bidirectionnelle

La zone « Transformation » à droite contient aussi des **curseurs/champs numériques** correspondants (position, angle de rotation, valeur de mise à l'échelle). Ils sont en **synchronisation bidirectionnelle** avec les contrôles :
- Vous tirez les contrôles, le champ numérique change en temps réel ;
- Vous saisissez directement une valeur précise dans le champ numérique (par exemple rotation à `45`, mise à l'échelle à `2.5`), l'objet change aussi immédiatement.

💡 Quand vous avez besoin d'« absolument précis » (par exemple rotation exactement 30°, mise à l'échelle exactement 1,5×), **saisir directement dans le champ numérique** est bien plus fiable que de tirer les contrôles. Les contrôles conviennent pour « trouver le feeling », le champ numérique pour « caler la valeur ».

---

✏️ **Résumé de la partie** : les contrôles de transformation sont la « version glisser libre » du clavier. Retenez trois choses — ① ils ont trois habillages translation/rotation/mise à l'échelle, correspondant à flèches/anneaux/cubes ; ② **poignée rouge = gauche/droite, verte = haut/bas, bleue = avant/arrière** (traduisez toujours selon l'annotation de la page, ne vous laissez pas piéger par la couleur de surface) ; ③ clic gauche pour l'objet, clic droit/molette/molette pour la vue, les trois ne se gênent pas. Dans la partie suivante, nous verrons « combinaison et regroupement, alignement et distribution », pour passer de « savoir déplacer un objet seul » à « savoir disposer une grande foule d'objets ».

---

# Onzième partie : La foule d'objets : gérer « un groupe » d'objets d'un coup

> À la fin de la partie précédente, j'avais annoncé « on verra combinaison/regroupement, alignement et distribution ». Ici je dois d'abord vous dire la vérité : **cet outil n'a pas de bouton « regrouper » indépendant, ni de bouton « aligner/distribuer en un clic »** — il suit une voie plus légère et aussi plus flexible : **sélection multiple + transformation ensemble + réseau de clonage**.
>
> Cette partie vous apprend « comment gérer efficacement une grande foule d'objets ». Pas de solution miracle, mais un ensemble de « méthodes artisanales » suffisantes, qui se rangent aussi bien proprement.

---

## Chapitre 37 : Sélectionner une foule d'un coup : connaître « l'ensemble de sélection »

### 37.1 Pourquoi la sélection multiple

Avant, vous « cliquiez un, modifiiez un ». Mais la création réelle implique souvent un tas de choses : une rangée d'arbres, une colonne de lampes, un sol de cailloux. Si vous ajustez 100 objets un par un, vous deviendrez fou en premier.

Solution : d'abord les sélectionner **en une fois dans « l'ensemble de sélection »**, puis opérer uniformément. C'est le sens de la sélection multiple.

### 37.2 Trois méthodes de sélection multiple

| Méthode | Comment opérer | Scénario adapté |
|---|---|---|
| **Tout sélectionner** | `Ctrl + A`, ou touchez le bouton « Tout sélectionner » en bas | Vouloir sélectionner tous les objets de la scène |
| **Ajouter / retirer** | Maintenez `Shift` puis cliquez un objet : cliquer sur un non sélectionné = l'ajouter ; cliquer sur un déjà sélectionné = l'expulser | Choisir quelques-uns spécifiques (par exemple « ces deux lampes + cet arbre ») |
| **Sélection par cadre** | Dans un espace vide, **maintenez et glissez**, tirez un cadre en pointillés, les objets dedans sont sélectionnés d'un coup | Une zone dense d'objets, trop paresseux pour cliquer un par un |

✏️ **Entraînez-vous** : placez 5 formes dispersées dans la scène. D'abord `Ctrl + A` pour voir si tout s'allume → cliquez dans le vide pour annuler → maintenez `Shift` et cliquez pour en retirer 2 (qui grisent) → puis tirez un cadre dans le vide pour encadrer les 3 restants. Ressentez « l'ensemble de sélection » comme une pile de post-it, librement ajouté/retiré.

💡 Détail de la sélection par cadre : c'est en glissant dans le vide à la souris que le cadre apparaît ; sur écran tactile, comme il n'y a pas de concept de « glisser dans le vide », un bouton « Sélection par cadre » a été spécialement prévu, une fois ouvert un glissement d'un doigt fait la sélection par cadre (une indication « Mode sélection par cadre » apparaît en bas à l'ouverture). Si le cadre ne touche aucun objet, un léger message « Aucun objet touché par la sélection par cadre » apparaît, sans échec silencieux.

### 37.3 Les « cas limites » de la sélection

- Cliquer dans le **vide** (sans glisser) = annuler toute sélection ;
- Si le cadre englobe **totalement le vide**, l'ensemble de sélection est vidé (équivalent à « inversement sélectionner en rien ») ;
- Pendant l'**édition de texte** ou dans l'outil **pinceau/gomme**, la logique de sélection cède la place à l'outil, la sélection multiple est temporairement indisponible.

❓ **Réfléchissez** : pourquoi « Shift+clic » peut ajouter et retirer à la fois ? — parce que l'ensemble de sélection n'est pas binaire « on/off », mais un **ensemble**. Cliquer un élément existant doit le retirer, cliquer un absent doit l'ajouter. Cette logique de « bascule » vous la rencontrerez partout par la suite, dans le gestionnaire de fichiers, la boîte mail, etc.

---

## Chapitre 38 : Tout bouger ensemble : le « point maître » de la transformation multiple

### 38.1 Le « point maître » invisible

Quand vous sélectionnez **plusieurs** objets, l'outil ne raccroche pas les contrôles à un objet concret précis (les raccrocher à l'un serait injuste), mais place un **point mandataire invisible** (**`multiTransformProxy`** dans le code) au **centre exact de ce groupe d'objets**.

Les contrôles de transformation que vous voyez (flèches/anneaux) sont en fait raccrochés à ce « point maître ». Quand vous le tirez, l'algorithme calcule l'**incrément** de déplacement/rotation du point maître, puis le **distribue en synchronisation à chaque objet sélectionné**.

> En langage humain : **vous tirez un « interrupteur général » invisible, toutes les choses sélectionnées bougent ensemble, et leurs positions relatives restent inchangées.**

### 38.2 Que peut faire la sélection multiple

| Opération | Disponible en sélection multiple ? | Explication |
|---|---|---|
| **Translation** ensemble (tirer flèche/plan) | ✅ Disponible | Tout le groupe se déplace globalement selon un axe |
| **Rotation autour du centre** ensemble (tirer anneau) | ✅ Disponible | Tout le groupe tourne autour du centre du groupe, comme retourner un plateau de pions |
| **Mise à l'échelle** ensemble | ❌ Désactivée | En sélection multiple le bouton de mode mise à l'échelle grise et revient automatiquement à la translation |

✏️ **Entraînez-vous** : sélectionnez 3 objets dispersés → passez en mode rotation → tirez l'**anneau vert** (autour de l'axe de hauteur) → voyez-les comme « tordues ensemble par une seule main », tournant autour du centre commun, l'écart entre elles inchangé. C'est le plaisir de la « rotation de groupe ».

### 38.3 Pourquoi la sélection multiple ne peut pas se mettre à l'échelle ensemble

⚠️ C'est une **limitation voulue**, pas un bug :

- Plusieurs objets de tailles et formes différentes mis à l'échelle proportionnelle ensemble donnent souvent un résultat bizarre (les grands deviennent énormes, les petits rétrécissent en graines de sésame) ;
- donc l'outil **désactive directement le mode mise à l'échelle** en sélection multiple, vous forçant à « soit réduire un par un, soit cloner d'abord puis ajuster ».

💡 Solutions de remplacement :
1. Vouloir un groupe « de même taille » — d'abord `Ctrl + D` pour cloner une rangée identique, elles ont déjà la même taille, puis ajustez un par un ;
2. Vraiment mettre à l'échelle un groupe entier — on pourrait **tout sélectionner, exporter le JSON, modifier les valeurs puis réimporter** ? Trop pénible. Plus concret : les traiter comme un « groupe temporaire », avec **mise à l'échelle individuelle + décalage uniforme** bien disposés.

### 38.4 Sélection multiple + Shift grand pas, reste tout aussi utile

Le grand pas `Shift` (1 grille / 90°) vu au chapitre 32 **s'applique aussi** à la sélection multiple. Après avoir sélectionné un groupe, maintenez `Shift` et tirez les touches fléchées, tout le groupe saute d'1 case d'un coup, parfait pour ranger des réseaux (utilisé au chapitre suivant).

---

## Chapitre 39 : Production de masse : copie, clonage et « réseau »

Pour les objets répétitifs, ne dessinez jamais à la main le 2e, le 3e… utilisez « copier/cloner » pour laisser l'ordinateur les générer.

### 39.1 Trois façons de « générer des copies »

| Touche | Nom | Particularité |
|---|---|---|
| `Ctrl + C` | Copier | Place l'objet sélectionné dans le **presse-papiers** (n'apparaît pas immédiatement) |
| `Ctrl + V` | Coller | **Récupère** depuis le presse-papiers, colle près de la position d'origine |
| `Ctrl + D` | **Cloner** | En une étape : copie sur place et **décale automatiquement un peu** |

💡 **Le plus utilisé est `Ctrl + D`**. Il économise une étape par rapport à « copier → coller », et la copie clonée se décale automatiquement un peu, vous la voyez immédiatement et pouvez la replacer tout de suite — le standard pour faire des réseaux.

✏️ **Entraînez-vous** : placez 1 cube → `Ctrl + D` une fois, un de plus apparaît-il, légèrement décalé ? → sélectionnez le nouveau → appuyez `→` pour le déplacer à la case suivante → encore `Ctrl + D` → encore `→`… en quelques coups une rangée est remplie. Tout cela sans toucher au panneau de la souris.

### 39.2 Disposer un réseau régulier avec « clonage + clavier »

Pas de bouton « aligner/distribuer » ? Pas grave, rangez manuellement avec le **pas de grille**, ça reste régulier :

1. Sélectionnez un objet, `Ctrl + D` pour cloner ;
2. Avec les touches fléchées déplacez-le à **exactement 1 case** (pas par défaut 0,1 grille, soit 10 appuis ; ou `Shift` + touche fléchée = 1 case d'un coup) ;
3. Répétez `Ctrl + D` + touches fléchées, une rangée sort ;
4. Rangée finie, faites `Ctrl + A` pour tout sélectionner, `Shift` + touche fléchée pour déplacer « toute la rangée » d'un grand pas à la ligne suivante, puis continuez à cloner — un réseau à deux dimensions (matrice) apparaît aussi.

💡 **Astuce pour ranger en cercle** : clonez un → déplacez-le à un rayon fixe du centre → tout le groupe tourne autour du centre (chapitre 38) → à chaque angle tourné, clonez une fois. Tournez quelques tours, un « réseau annulaire » sort. C'est la version manuelle de la « distribution ».

### 39.3 Les limites de copier-coller

⚠️ Deux avertissements que vous risquez de rencontrer (l'outil affiche un petit texte) :
- **« Transformation en cours, impossible de copier/cloner »** : si vous êtes en train de tirer un contrôle (transformation active), les boutons copier/cloner sont temporairement désactivés. Relâchez (fin du glissement) puis appuyez de nouveau.
- **« Veuillez d'abord sélectionner un objet avant de copier »** : si vous appuyez `Ctrl + C` sans rien sélectionner, il vous rappelle de sélectionner d'abord. Quand le presse-papiers est vide, `Ctrl + V` affiche aussi « Presse-papiers vide ».

❓ **Réfléchissez** : quelle est la différence sous-jacente entre cloner et copier-coller ? — le clonage « génère sur place une copie décalée », sans dépendre d'aucun stockage intermédiaire ; copier-coller « stocke d'abord au presse-papiers, puis récupère », donc vous pouvez copier la scène A, basculer à la scène B et coller (le presse-papiers de cet outil est de niveau mémoire, commun à l'intérieur d'une même page). Comprendre cela, vous savez pourquoi parfois `Ctrl + V` ne répond pas — le presse-papiers est probablement vide.

---

## Chapitre 40 : Sauvegarde et partage : faire sortir l'œuvre de l'écran

La scène que vous avez construite avec peine disparaît si on ferme la page web ? Non — cet outil peut **exporter** en fichier, **importer** de retour, **capturer** en image.

### 40.1 Trois touches « enregistrer/reprendre »

| Touche | Action | Produit |
|---|---|---|
| `Ctrl + S` | Exporter la scène | Un **fichier JSON** (description complète de la scène) |
| `Ctrl + O` | Importer la scène | Relit le JSON exporté précédemment |
| `Ctrl + P` | Exporter l'image | Une **image PNG** (photo du cadre actuel) |

💡 Flux de travail : **construire un peu → `Ctrl + S` pour sauvegarder → le lendemain `Ctrl + O` pour relire et continuer**. Le JSON est votre « fichier de projet », le PNG est votre « photo de résultat », les deux se partagent le travail.

### 40.2 Que stocke vraiment le JSON

Le JSON exporté n'est pas une image, mais une **liste d'objets**, enregistrant grosso modo :

- Le **type/forme** de chaque objet (sphère ou texte, paramètres longueur/largeur/hauteur) ;
- La **transformation** de chaque objet (position, rotation, mise à l'échelle — c'est-à-dire où il est, s'il est penché, sa taille) ;
- L'**apparence** de chaque objet (couleur, motif, transparence, texture) ;
- Les **réglages d'environnement** de la scène (axes de coordonnées, affichage/masquage de la grille, etc.).

⚠️ Comme ce qui est stocké est « paramètre » et non « pixel », vous pouvez **continuer à éditer** après import — ce n'est pas une image morte, mais un projet vivant. Cela explique aussi pourquoi toutes les opérations précédentes peuvent entrer dans la « pile d'historique » pour être annulées : elles modifient essentiellement ce paramètre.

### 40.3 Suggestions de partage et de collaboration

- **Montrer le rendu à un collègue** : envoyer le PNG (`Ctrl + P`) est le plus rapide ;
- **Laisser un collègue continuer à modifier** : envoyez le JSON (`Ctrl + S`), l'autre ouvre avec `Ctrl + O` et peut éditer ;
- **Multi-appareils** : transmettez le JSON à un disque cloud/WeChat, ouvrez la page web sur un autre ordinateur, importez — la scène vous suit partout.
- ⚠️ N'oubliez pas que `Ctrl + Del` **vide toute la scène**, une boîte de confirmation « Vider la scène ? » apparaît, et le vidage est annulable. Avant de vider, faites `Ctrl + S` pour sauvegarder, ne laissez pas votre travail s'évaporer d'un clic.

### 40.4 Alignement et distribution manuels : ranger sans bouton

Revenons à la promesse du début de la partie — comme il n'y a pas d'alignement/distribution en un clic, voici trois méthodes **purement manuelles** pour ranger proprement, combinées avec ce qui précède :

1. **S'appuyer sur la grille** : pas de déplacement par défaut 0,1 grille (=0,15 unité), un nombre entier d'appuis = tomber précisément sur la ligne de grille. `Shift` + touche fléchée = 1 case d'un coup, idéal pour « coller aux lignes de grille ».
2. **S'appuyer sur le clonage** : comme au chapitre 39, clonage + pas fixe = réseau équidistant (c'est la « distribution »).
3. **S'appuyer sur la vue** : d'abord cliquez « Vue de face / Vue de dessus » en bas pour redresser l'objet à la position standard, puis déplacez avec le clavier le long d'un seul axe, évitant de « ranger de travers ».

✏️ **Exercice combiné (travail de fin de partie)** : avec « cube + `Ctrl + D` cloner + `Shift` + touche fléchée » disposez une matrice 5×3 ; après `Ctrl + A` tout sélectionner, `PgUp` pour monter l'ensemble à une case du sol ; `Ctrl + S` pour sauvegarder. Vous savez maintenant « produire en masse + ranger proprement + sauvegarder le résultat ».

---

✏️ **Résumé de la partie** : cet outil ne s'appuie pas sur des boutons « regrouper/aligner », mais sur **sélection multiple + point maître mandataire + réseau de clonage** pour gérer la foule d'objets. Retenez — les trois méthodes de sélection multiple (tout sélectionner / Shift ajout / sélection par cadre), la sélection multiple peut translater et tourner mais pas mettre à l'échelle, le clonage `Ctrl + D` est l'arme miracle des réseaux, le JSON est votre fichier de projet vivant. Dans la partie suivante nous ferons un **projet pratique complet** : construire une petite scène complète de zéro (petite maison / petite cour), enchaînant les acquis des dix parties précédentes en une seule ligne, pour vivre le « dernier kilomètre de l'initiation à la maîtrise ».

---

# Douzième partie : Pratique : construire une scène complète de zéro

> Dans les dix parties précédentes, vous avez identifié toutes les « pièces » : formes, couleurs, motifs, texte, pinceau, vue, raccourcis clavier, contrôles de transformation, clonage multiple.
>
> Mais savoir utiliser les pièces ≠ savoir fabriquer. Cette partie n'explique plus de nouveaux boutons, mais vous guide pour enchaîner les acquis appris en **ligne de production**, en faisant quatre projets complets. Chaque projet donne « objectif → décomposition → étapes → points de crash fréquents → défi avancé ».
>
> ⚠️ Veuillez **suivre et faire de vos mains**. Regarder dix fois ne vaut pas construire une fois — la valeur de cette partie réside tout entière dans votre souris et votre clavier.

---

## Chapitre 41 : Projet 1 : construire une petite maison

### 41.1 Regardez d'abord le produit fini, puis pensez à la décomposition

Ce que nous allons faire est simple : une petite maison avec toit, porte, fenêtres, debout sur une pelouse.

Ne vous précipitez pas à tirer des formes. Prenez 10 secondes pour réfléchir à une question :

❓ **Réfléchissez** : une maison, si vous ne pouvez utiliser que « cube, cône, pyramide à base carrée, cylindre, plan » pour l'assembler, comment la décomposeriez-vous ?

C'est la pensée la plus centrale de la création 3D — **décomposer un objet complexe en combinaison de géométries simples**. En terme technique on appelle ça « analyse en volumes », mais en résumé c'est « empiler des blocs ».

Décomposition de référence :

| Pièce | Quelle forme utiliser | Pourquoi |
|---|---|---|
| Mur (corps) | `box` cube | Une maison est essentiellement une boîte |
| Toit | `pyramid` pyramide à base carrée | Base carrée et sommet pointu, s'emboîte parfaitement sur le mur carré |
| Porte | `box` plaque fine aplatie | Collée au mur, plus facile à disposer qu'une forme 2D |
| Fenêtre | `box` plaque plus petite | Idem, peut être semi-transparente pour faire verre |
| Cheminée | `cylinder` cylindre | Fin et haut, dépasse du toit |
| Pelouse au sol | `square2` carré | 2D allongée au sol, sert de gazon |

💡 **Méthode mentale** : pour toute forme, demandez d'abord « de combien de volumes elle se compose ». Même pour faire une voiture, un robot, la logique est exactement la même.

### 41.2 Étape 1 : les fondations (pelouse)

1. Panneau gauche basculez vers **Forme 2D**, tirez un `square2` **carré** au centre de la scène ;
2. Sélectionnez-le, panneau droit choisissez une couleur de la **gamme verte** ;
3. Motif choisissez **Damier** — de loin ressemble à une pelouse bien taillée ;
4. Avec la **mise à l'échelle proportionnelle** (curseur du panneau droit ou `Shift + +`) agrandissez-le nettement plus grand que la maison d'un tour.

⚠️ **Point de crash** : la forme 2D est un autocollant « allongé au sol (Z=0) ». Si vous la voyez « dressée », c'est probablement parce que vous l'avez tournée par inadvertance avec le contrôle de rotation — appuyez `Ctrl + Z` pour annuler, ne forcez pas.

✏️ Entraînement à côté : appuyez sur le bouton « **Vue de dessus** » en bas, regardez du dessus si la pelouse est assez grande ; puis appuyez « Perspective » pour revenir à la vue normale. Cette habitude de « changer de vue pour vérifier » est recommandée à chaque étape de cette partie.

### 41.3 Étape 2 : dresser le mur

1. Basculez vers **Forme 3D**, tirez un `box` **cube** au centre de la pelouse ;
2. Sélectionnez, avec `PgUp` soulevez-le pour qu'il **pose juste sur le sol** (base collée au sol, ni en l'air ni enfoncé) ;
3. Panneau droit changez vers **beige / jaune clair** (couleur du mur) ;
4. Motif choisissez **Mur de briques** — d'un coup « un bloc » devient « une maison ».

💡 **Astuce pour juger « posé au sol »** : cliquez le bouton « **Vue de face** » en bas, regardez de face droit, d'un coup on voit si l'objet flotte dans l'air ou s'enfonce dans le sol. En perspective on se trompe facilement, la vue de face ne ment pas.

⚠️ **Point de crash** : beaucoup de débutants règlent la hauteur en perspective, et peu importe comment ça reste « bizarre ». Basculez en vue de face, réglé en deux secondes.

### 41.4 Étape 3 : poser le toit

1. Tirez une `pyramid` **pyramide à base carrée** ;
2. Avec `PgUp` montez-la **juste au-dessus du mur**, que la base du cône presse juste le haut du mur ;
3. Positions gauche/droite avant/arrière pas alignées ? Ajustez avec `↑↓←→` (pas de 0,1 case) ; si le grand nombre ne tombe pas, `Shift +` touche fléchée pour sauter une case entière ;
4. Couleur changez vers **rouge-brun / gris foncé** (couleur de tuile).

❓ **Réfléchissez** : pourquoi le toit utilise « pyramide à base carrée » plutôt que « cône » ? — parce que le mur est carré. Toit carré sur mur carré, les bords s'emboîtent parfaitement ; cône sur mur carré, les quatre coins dépassent. **L'appariement des formes est la clé du « ça a l'air juste ou pas ».**

✏️ **Entraînez-vous** : changez exprès pour un `cone` cône une fois, regardez de la vue de face et de dessus, ressentez le inconfort des « coins qui dépassent ». Puis `Ctrl + Z` pour revenir.

### 41.5 Étape 4 : ouvrir porte et fenêtres

La méthode pour porte et fenêtres est « **plaque fine aplatie collée au mur** » :

1. Tirez un `box`, d'abord **décochez « Mise à l'échelle proportionnelle »** (section 36.2), étirez-le en **fine plaque** ;
2. Recochez la mise à l'échelle proportionnelle (pour éviter un étirement accidentel ensuite) ;
3. Avec les touches fléchées **collez-le au devant du mur** — attention à le faire dépasser « un tout petit peu » du mur, sinon il « se battra » avec le mur (voir point de crash ci-dessous) ;
4. Couleur choisissez **brun foncé** (porte en bois).

La fenêtre se fait pareil, faites deux plaques plus petites, couleur **bleu clair**, et réglez **l'opacité autour de 0,5** — le sentiment de verre sort immédiatement (section 20.2).

⚠️ **Point de crash important : Z-fighting (clignotement qui se bat)**
Si la plaque de porte et le mur **coïncident exactement dans le même plan**, vous les verrez clignoter, s'interpénétrer — ce n'est pas un bug, c'est deux surfaces « se disputant la position » à la même profondeur.
**Solution** : avec les touches fléchées poussez la porte un petit pas vers l'extérieur (1 à 2 fois 0,1 case suffit), pour qu'elle « flotte » clairement devant le mur.

💡 Pour la deuxième fenêtre, ne redessinez pas — sélectionnez la première, `Ctrl + D` pour cloner, puis `←` ou `→` pour la déplacer de l'autre côté. C'est la première apparition en pratique du réseau de clonage du chapitre 39.

### 41.6 Étape 5 : ajouter la cheminée et finir

1. Tirez un `cylinder` **cylindre**, avec la mise à l'échelle proportionnelle affinez-le fin, `PgUp` montez-le sur le pan du toit, faites-le dépasser un bout ;
2. Couleur **gris foncé** ;
3. Pour plus de vie ? Clonez quelques `sphere` sphères, empilez-les à l'embouchure de la cheminée comme « fumée », et réglez l'opacité à 0,3.

**Liste de vérification finale** (recommandée pour chaque projet) :

| Élément à vérifier | Comment vérifier |
|---|---|
| Flotte / s'enfonce dans le sol | Cliquez « Vue de face » pour regarder de face |
| Interpénétration avant/arrière | Cliquez « Vue de gauche » ou « Vue de droite » pour regarder |
| Disposition globale centrée | Cliquez « Vue de dessus » pour survoler |
| Esthétique du résultat | Cliquez « Perspective » pour revenir à la vue normale |

Une fois confirmé sans erreur : `Ctrl + S` exporte le JSON pour sauvegarder le projet, `Ctrl + P` capture un PNG pour rendre le travail.

### 41.7 Défi avancé

1. **Faire une rangée de villas jumelées** : tout sélectionner la maison (`Ctrl + A`) → `Ctrl + D` cloner → `Shift +` touche fléchée pour déplacer l'ensemble d'une case → répéter trois fois. Attention en clonage multiple, la position relative de tout le groupe reste inchangée (mécanisme du « point maître » du chapitre 38).
2. **Changer de saison** : changez le motif de la pelouse en « point », couleur en blanc → devient neige ; opacité du mur à 0,4 → devient igloo.
3. **Ajouter une plaque** : avec l'outil texte du chapitre 21, ajoutez une ligne « N° 1 » au-dessus de la porte, police **Heiti (sans empattement)**, taille réduite proportionnellement à la maison.

⚠️ Rappel : la taille de texte par défaut est **80**, alors que les volumes de la maison ne font généralement que 1 à 2 unités — ajouter du texte directement donne un « texte géant plus grand que la maison ». Il faut réduire la taille (ou réduire tout le texte) pour que ce soit harmonieux. C'est le point d'échec le plus fréquent des débutants sur les plaques, ne paniquez pas, changez la taille.

---

## Chapitre 42 : Projet 2 : fabriquer une devise en texte 3D

### 42.1 Objectif et idée

Faites une **enseigne debout dans la scène** : plaque de fond + texte + décoration, par exemple « Bienvenue », « Ouverture » ou une phrase que vous aimez.

⚠️ Clarifions d'abord un point souvent mal compris : le texte de cet outil est une « **plaque mince avec du texte collé dessus** » (section 21.1), pas une véritable extrusion 3D épaisse. L'« effet 3D » que nous recherchons repose donc sur la combinaison **plaque de fond + texte + décalage en couches**, et non sur l'épaisseur du texte lui-même.

Une fois ce point compris, la logique devient claire :

| Couche | Avec quoi | Rôle |
|---|---|---|
| Panneau arrière | `box` aplati en plaque mince | Donner au texte une « surface de support » |
| Texte principal | Objet texte | Corps du contenu |
| Texte ombre | Objet texte (couleur foncée, décalé vers l'arrière) | Créer l'illusion d'épaisseur |
| Support | Deux `cylinder` | Faire « tenir debout » la plaque au sol |

### 42.2 Première étape : faire la plaque de fond

1. Glissez un `box`, décochez « mise à l'échelle uniforme », aplatissez-le en une **plaque mince verticale** (largeur > hauteur > épaisseur) ;
2. Re-cochez la mise à l'échelle uniforme ;
3. Utilisez `PgUp` pour le monter à la hauteur des yeux (à une certaine distance du sol, ne pas le coller au sol) ;
4. Choisissez une **couleur foncée** (bleu foncé / vert bouteille / bois conviennent) — un fond sombre avec un texte clair est le plus lisible.

💡 **Principe de couleur** : le texte et la plaque de fond doivent présenter une **différence de luminance**. Fond sombre avec texte clair, ou fond clair avec texte sombre, choisissez l'une des deux options. Des associations de même luminance (par exemple fond gris moyen + texte vert moyen) se brouillent de loin, c'est la règle la plus basique et la plus souvent négligée du design.

### 42.3 Deuxième étape : inscrire le texte

1. Panneau gauche « Outils » → « **Ajouter un texte** » ;
2. Cliquez dans la scène, une boîte de saisie apparaît (texte placeholder « Saisir le texte······ ») ;
3. Saisissez votre slogan, appuyez sur **Enter** pour confirmer ;
4. Sélectionnez-le, ajustez dans le panneau droit :
   - **Police** : pour un style moderne utilisez « Heiti », pour un style traditionnel utilisez « Kaiti » ;
   - **Taille de police** : 80 par défaut, il faut généralement la **réduire** pour l'accorder aux volumes (voir le rappel de 41.7) ;
   - **Gras** : recommandé pour les slogans, plus percutant de loin ;
   - **Couleur** : choisissez une couleur claire contrastant fortement avec la plaque de fond.

5. À l'aide des flèches, déplacez le texte **juste devant** la plaque de fond, et faites-le dépasser un peu vers l'extérieur (évite le Z-fighting, cf. section 41.5).

✏️ **Entraînez-vous** : après avoir saisi le texte, **double-cliquez** dessus (section 21.3) pour changer le contenu en une autre phrase. Ressentez la fluidité de « pas besoin de supprimer et recommencer » — très pratique quand on peaufine le texte à répétition.

### 42.4 Troisième étape : faire un « texte ombre » pour créer l'épaisseur

C'est la technique centrale de ce chapitre, très simple mais extrêmement efficace :

1. Sélectionnez le texte principal, `Ctrl + D` pour en faire un **clone** ;
2. Changez cette copie en une **couleur foncée** (un peu plus foncée que la plaque de fond, ou noir pur) ;
3. À l'aide des flèches, décalez-la **vers l'arrière et vers le bas de 1 à 2 petits pas** (un pas de 0,1 unité suffit) ;
4. Si elle recouvre le texte principal, c'est que l'ordre avant/arrière est inversé — déplacez simplement le texte principal d'un pas supplémentaire vers l'avant.

Vu sous un angle en perspective : le texte sombre à l'arrière, le texte clair à l'avant, **visuellement cela « flotte »**. C'est la « méthode d'ombre portée » du design graphique, qui fonctionne aussi en 3D.

❓ **Réfléchissez** : pourquoi un décalage « vers l'arrière + vers le bas » est-il plus efficace que « seulement vers l'arrière » ? — Parce que dans la réalité la lumière vient généralement du **haut**, et l'ombre tombe naturellement **en bas et légèrement derrière** l'objet. Un décalage conforme à l'expérience quotidienne de l'éclairage est perçu comme « réel » par le cerveau.

💡 Pour un effet 3D plus fort ? **Clonez le texte ombre deux ou trois fois** supplémentaires, chaque copie décalée un peu plus vers l'arrière, la couleur s'assombrissant progressivement — vous obtenez un faux effet d'extrusion « multi-couches ». Plus il y a de couches, plus c'est épais, mais plus cela risque de brouiller ; environ 3 couches est l'idéal.

### 42.5 Quatrième étape : ajouter un support pour faire tenir la plaque

1. Glissez deux `cylinder` **cylindres**, affinez-les et allongez-les avec la mise à l'échelle uniforme ;
2. Avec `PgUp` / les flèches, enfoncez-les **de chaque côté sous la plaque de fond**, l'extrémité supérieure plongeant un peu dans la plaque (ici l'**interpénétration volontaire** est correcte, elle cache la jointure) ;
3. Choisissez une couleur **gris foncé / bois**.

💡 Pour la seconde colonne, ne la glissez pas à nouveau — sélectionnez la première et faites `Ctrl + D` pour la cloner, puis déplacez-la de l'autre côté avec `←` / `→`. **Pour tout élément symétrique, utilisez toujours le clonage, c'est toujours plus précis que de le positionner à la main.**

### 42.6 Cinquième étape : disposition horizontale vs verticale

Une même phrase, avec une mise en page différente, change totalement de caractère :

| Combinaison | Caractère | Convient à |
|---|---|---|
| Horizontal + Heiti + gras | Moderne, commercial | Enseigne de magasin, bannière d'événement |
| Vertical + Kaiti + grande taille | Traditionnel, solennel | Plaque commémorative, académie, maison de thé |
| Horizontal + Times + non gras | Occidental, formel | Signalétique anglaise, plaque explicative |
| Horizontal + Courier | Technique, rétro | Look technologique, style machine à écrire |

✏️ **Entraînez-vous (expérience comparative)** : faites deux versions du même caractère « thé » — une en Heiti horizontal, une en Kaiti verticale grande taille + plaque de fond bois. Placez-les côte à côte dans la scène et regardez sous « vue de face ». Vous ressentirez intuitivement que : **la police et la mise en page parlent d'elles-mêmes**, le contenu n'a pas changé, mais le caractère est déjà aux antipodes.

### 42.7 Récapitulatif des erreurs fréquentes

| Phénomène | Cause | Solution |
|---|---|---|
| Le texte est démesurément grand et recouvre toute la scène | Taille de police 80 par défaut, ne correspond pas à l'échelle des volumes | Réduisez la taille, ou mettez l'objet texte à l'échelle globalement |
| Le texte et la plaque de fond scintillent et s'interpénètrent | Ils sont coplanaires (Z-fighting) | Déplacez le texte vers l'extérieur de 1 à 2 pas avec les flèches |
| De loin tout se brouille | Différence de luminance insuffisante entre texte et plaque | Augmentez le contraste clair/sombre, ou mettez le texte en gras |
| Le texte dépasse le bord de la plaque | Texte trop long | Réduisez la taille, ou élargissez la plaque de fond |
| Impossible de changer la taille / flèches inopérantes | Le curseur est encore dans la boîte de saisie numérique | Cliquez d'abord sur une zone vide de l'écran (section 32.1) |

### 42.8 Défis avancés

1. **Faire une enseigne recto-verso** : sélectionnez tout le groupe (plaque + texte + ombre), clonez-le, faites un demi-tour de 180° avec `Shift + A`, placez-le à l'arrière, pour obtenir une enseigne debout lisible des deux côtés.
2. **Effet de texte lumineux** : passez la couleur du texte principal en jaune vif, la plaque de fond en noir profond, puis placez derrière le texte une plaque mince jaune clair semi-transparente (opacité 0,3) comme « halo ».
3. **Lier avec le projet un** : placez cette enseigne devant la petite maison du chapitre 41, faites `Ctrl + S` pour sauvegarder une scène complète. Vous avez maintenant un petit décor complet « maison + enseigne ».

---

## Chapitre 43 Projet trois : concevoir un emblème / une icône

### 43.1 Pourquoi l'emblème est le « meilleur exercice »

Les deux premiers projets faisaient des « choses en 3D ». Celui-ci fait l'inverse — nous allons faire un emblème qui **ressemble à du design graphique**, mais réalisé avec des moyens 3D.

C'est un excellent exercice, car :
- Il ne nécessite que des **formes 2D** (les 20 du chapitre 12) pour être complété, la charge de formes est légère ;
- Il vous force à réfléchir à de véritables problèmes de design : **alignement, couches, couleurs** ;
- Le résultat, une fois capturé en « **vue de dessus** », donne une icône propre, directement utilisable comme avatar / Logo.

❓ **Réfléchissez** : les emblèmes que vous avez vus (logo de voiture, blason d'école, icône d'app), combien d'éléments les composent-ils généralement ? — En général pas plus de 3 à 4 couches : forme de base + figure principale + ornement + texte. **Le peu, c'est le raffinement**, c'est la loi de fer du design d'emblème.

### 43.2 Prérequis clé : travailler en vue de dessus

⚠️ Pour ce projet, opérez **en permanence sous l'angle « vue de dessus »** (bouton de vue en bas).

Raison : l'emblème est une composition plane « vue de face », et toutes les formes 2D sont allongées au sol (Z=0). Vu de tout en haut, vous voyez le rendu final ; sous un angle en perspective, il y a une déformation du près au loin, et l'alignement se fait au pif.

💡 C'est une expérience générale : **faites quelque chose, regardez-le sous l'angle correspondant.** Pour une disposition au sol, utilisez la vue de dessus ; pour régler la hauteur, la vue de face ; pour voir l'effet global, la perspective. N'essayez pas de tout faire avec un seul angle.

### 43.3 Première étape : la forme de base (couche la plus extérieure)

1. Basculez le panneau gauche sur **Formes 2D**, choisissez-en une comme base :
   - `circle2` cercle → badge rond, le plus polyvalent ;
   - `hexagon` hexagone → sensation technologique, industrielle ;
   - `octagon` octogone → stable, signalétique ;
   - `pentagon` pentagone → bouclier, sensation académique.
2. Placez-la au **centre exact** de la scène ;
3. Agrandissez-la uniformément à la taille voulue ;
4. Choisissez une **couleur foncée** (bleu foncé / vert bouteille / bordeaux donne de superbes résultats).

### 43.4 Deuxième étape : couche interne et figure principale (créer les couches)

Le raffinement d'un emblème vient à 80 % de ses « **couches concentriques** ».

1. Sélectionnez la forme de base, faites `Ctrl + D` pour en faire un **clone** ;
2. Réduissez ce clone **à l'échelle uniforme** (appuyez plusieurs fois sur `-`, ou `Shift + -` pour réduire de moitié) ;
3. **Clé** : utilisez `PgUp` pour le monter d'**un petit pas** — le faire flotter juste au-dessus de la forme de base ;
4. Changez-le en une **couleur claire** (blanc / ivoire / or brillant).

Vous avez maintenant une structure concentrique « cercle extérieur foncé + cœur intérieur clair ».

⚠️ **Piège incontournable** : si les deux formes 2D sont à Z=0, elles scintilleront et s'interpénètrent frénétiquement (encore du Z-fighting, vu à la section 41.5). **Lors de la superposition de formes 2D, chaque couche doit être montée d'un petit pas avec `PgUp`**, pour les séparer en hauteur. C'est la discipline d'opération la plus importante de ce chapitre.

💡 Retenez la formule : **à chaque couche empilée, montez d'un pas.** Trois formes = trois hauteurs différentes.

Ensuite, placez la figure principale (le « protagoniste » de l'emblème) :

| Pour exprimer | Quelle forme 2D utiliser |
|---|---|
| Honneur, classement | `star` étoile à cinq branches |
| Amour, bienfaisance | `heart` cœur |
| Énergie, rapidité | `lightning` éclair |
| Médical, secours | `cross` croix |
| Direction, logistique | `arrow` flèche |
| Nature, eau | `teardrop` goutte |
| Nuit, calme | `crescent` croissant |
| Technologie, connexion | `hexagon` hexagone |

Placez-la, montez d'un pas, mettez une couleur contrastée, alignez au centre.

💡 Astuce : `heart / arrow / crescent / cross / lightning` possèdent **chacun des contrôles de paramètres de forme indépendants** (voir section 12.2, comme la `largeur/hauteur/profondeur de la pointe` du cœur, la `longueur/largeur` de la flèche, le `rayon extérieur/rayon intérieur/décalage` du croissant, etc.), ajustables directement. Si vous voulez seulement changer la taille globale, vous pouvez aussi utiliser la mise à l'échelle uniforme ou le contrôle de transformation.

### 43.5 Troisième étape : comment aligner au centre

Cet outil **n'a pas de bouton « centrage en un clic »** (déjà expliqué dans la dixième partie), mais c'est précisément l'alignement qui compte le plus pour un emblème. Trois méthodes de centrage manuel :

1. **S'appuyer sur la grille** : en vue de dessus, les lignes de la grille au sol sont votre règle. Faites en sorte que le centre de chaque couche vise **le même point d'intersection de la grille**, ajustez finement avec les flèches (0,1 unité).
2. **S'appuyer sur le clonage** : la copie clonée ne fait **que la mise à l'échelle uniforme, pas de translation**, son centre reste donc à sa place — concentrique par nature. C'est la méthode la plus pratique, fortement recommandée.
3. **S'appuyer sur la boîte numérique** : la boîte de valeurs de position du panneau droit (section 36.5) permet de saisir directement des nombres. Remplissez la position horizontale de chaque couche avec **le même jeu de chiffres**, c'est un centrage absolument précis.

💡 **Meilleure pratique** : méthode 2 + méthode 3 combinées. Clonez d'abord pour garantir le concentrique, puis vérifiez une dernière fois avec la boîte numérique que les chiffres sont identiques. Cent fois plus fiable que de traîner la souris.

### 43.6 Quatrième étape : ajouter un anneau de texte / du texte en bas

1. « Ajouter un texte », saisissez le nom de marque ou l'année ;
2. **Réduisez** la taille de police (le texte d'un emblème est généralement très petit) ;
3. Police : Heiti pour le moderne, Times pour l'académique, Songti pour le traditionnel ;
4. Montez-le à **la couche la plus haute** (un pas au-dessus de toutes les formes) ;
5. Placez-le en bas de l'emblème ou dans un espace vide au centre.

⚠️ Le texte de cet outil **ne peut pas être disposé le long d'un arc** (impossible de faire un « texte annulaire »). Pour un effet similaire, il faut découper le texte lettre par lettre, cloner et faire pivoter chacune — très laborieux. Les débutants sont conseillés d'utiliser directement un **texte horizontal en bas**, tout aussi professionnel.

### 43.7 Cinquième étape : export de l'image

1. Cliquez « **Vue de dessus** », centrez l'emblème au milieu de l'écran ;
2. Si besoin, appuyez sur `F11` pour le plein écran, rendant l'image plus grande et plus propre ;
3. Pour enlever les distractions ? Masquez les axes de coordonnées et la grille (chapitre 28) — cette étape est cruciale, sinon la capture contiendra des lignes de grille ;
4. `Ctrl + P` pour capturer et exporter en PNG ;
5. `Ctrl + S` pour sauvegarder un projet JSON, pratique pour changer les couleurs plus tard.

💡 **Le trio de l'export** : vue de dessus + masquer les éléments d'aide + plein écran. À utiliser dans toute situation demandant une « image finale propre ».

### 43.8 Aide-mémoire des couleurs (à utiliser directement)

| Style | Couleur de fond | Couche interne | Figure principale | Texte |
|---|---|---|---|---|
| Affaires sérieuses | Bleu foncé | Blanc | Bleu foncé | Blanc |
| Nature écologique | Vert bouteille | Blanc cassé | Vert | Blanc cassé |
| Dynamique sportif | Orange vif | Blanc | Gris foncé | Blanc |
| Haut de gamme luxe | Noir pur | Or | Or | Or |
| Santé médicale | Blanc | Bleu clair | Croix rouge | Bleu foncé |

⚠️ L'erreur de couleur la plus fréquente chez les débutants est d'avoir **trop de couleurs**. Limitez l'emblème à **2 ou 3 couleurs** maximum, et il paraîtra immédiatement professionnel. Pour enrichir les couches, utilisez **les variations clair/foncé d'une même teinte** (section 18.2 : fixez la barre de teinte, ne faites que glisser dans le grand bloc de couleur), plutôt que d'ajouter des couleurs.

### 43.9 Défis avancés

1. **Faire une série d'icônes** : sélectionnez tout l'emblème et clonez-le trois fois, ne changez que la figure principale (étoile / cœur / éclair), le reste reste intact. Vous obtiendrez une série d'icônes au style unifié — exactement la méthode du vrai design de marque.
2. **Ajouter du relief** : clonez la figure principale en une couleur foncée, décalez-la d'un petit pas sur le côté, placez-la une couche en dessous (soit la technique du « texte ombre » de 42.4 appliquée aux formes).
3. **Faire un emblème physique** : sous tout l'emblème, placez un `cylinder` cylindre plat, repassez en perspective — l'emblème plat devient instantanément une « médaille métallique que l'on peut tenir dans la main ».

---

## Chapitre 44 Projet quatre : scène composite « Ma petite cour »

### 44.1 Ce chapitre est le « projet de fin »

Les trois premiers projets entraînent chacun une compétence : **assemblage de volumes** (maison), **mise en page de texte** (slogan), **composition plane** (emblème). Ce chapitre **les réunit tous dans une seule scène**, en y ajoutant le pinceau, les images, la semi-transparence et les autres compétences restantes, pour réaliser une œuvre complète.

Objectif : une **petite maison avec cour** — maison, clôture, sentier, arbre, bassin, plaque de porte, ambiance de ciel, tout y est.

⚠️ C'est le plus long exercice du livre, il est conseillé de le faire **par étapes**, en sauvegardant (`Ctrl + S`) après chaque partie. Prendre l'habitude de « sauvegarder par étapes » vaut plus que n'importe quel truc.

### 44.2 Processus de création : d'abord le grand puis le petit, d'abord le fixe puis la décoration

La plus grande différence entre un processus pro et un débutant n'est pas la vitesse, mais **l'ordre**. Veuillez suivre strictement cet ordre :

| Étape | Que faire | Pourquoi cet ordre |
|---|---|---|
| ① Fixer le sol | Étendre la pelouse, définir la cour | D'abord délimiter la « scène », pour avoir une référence ensuite |
| ② Placer le sujet | Mettre la maison (résultat du projet un) | Placer le plus gros objet en premier, il détermine les proportions globales |
| ③ Diviser | Tracer au pinceau le trajet du sentier | Planifier les zones fonctionnelles sur l'espace vide |
| ④ Ajouter les moyens | Arbre, bassin, clôture | Remplir le volume moyen, enrichir les couches |
| ⑤ Ajouter les petits | Cailloux, fleurs, plaque de porte | Les détails à la fin, pour éviter de gêner le jugement tôt |
| ⑥ Régler l'ambiance | Couleurs, opacité, angle de vue | Unifier le ton, finaliser et exporter |

❓ **Réfléchissez** : pourquoi « les détails à la fin » ? — Parce que les détails **gênent votre jugement sur l'ensemble**. Avec un tas de petits cailloux posés là, il est difficile de voir si la maison est bien placée. Fixez d'abord les grandes relations, alors les détails prennent sens. En peinture on appelle cela « du global au local », idem en 3D.

### 44.3 ① Étendre le sol

1. Formes 2D, glissez un `square2` carré, agrandissez-le en sol de cour ;
2. Vert + motif « damier » = pelouse ;
3. Passez en « **Vue de dessus** », assurez-vous que la surface est assez grande — **mieux vaut un peu plus grande**, car vous ajouterez de plus en plus de choses, difficile de modifier si c'est trop petit.

💡 Il est conseillé d'étendre une plaque claire plus grande encore tout à l'extérieur (n'oubliez pas `PgDn` pour la mettre **un pas plus bas** que la pelouse, évitant la scintillation coplanaire), servant de « terrain vague hors de la cour », l'image aura plus de sensation de limite.

### 44.4 ② Placer la maison

Réutilisez directement le résultat du chapitre 41 :

- Si vous avez sauvegardé le projet, importez-le avec `Ctrl + O` ;
- Si non, reconstruisez-le selon 41.2 à 41.6 (ce sera beaucoup plus rapide cette fois).

Conseil de placement : **ne pas la mettre au centre exact**. Placez la maison **en arrière et sur un côté** de la cour, en laissant un grand espace vide devant — la composition sera plus naturelle, et laisse de la place au sentier et au bassin.

💡 **Petit savoir sur la composition** : mettre le sujet au centre de l'image paraît rigide ; légèrement excentré, il paraît plus vivant. En photographie on appelle cela la « règle des tiers », vous pouvez utiliser les lignes de grille au sol pour estimer la position.

### 44.5 ③ Tracer le sentier au pinceau

C'est l'usage classique de l'outil pinceau (chapitre 24) en situation réelle :

1. Panneau gauche « Outils » → **Pinceau 2D** ;
2. Réglez la couleur (jaune terre / gris clair) et l'épaisseur du trait (assez épais, comme une route) ;
3. De l'entrée de la cour jusqu'à la porte de la maison, dessinez une ligne **légèrement courbée** ;
4. Après le dessin, quittez l'outil pinceau (appuyez sur `Esc` ou rebasculez sur la sélection).

⚠️ **Deux disciplines du pinceau** :
1. Une fois le trait dessiné, il est « figé » là — **impossible de le peaufiner comme une forme** — si vous l'avez raté, `Ctrl + Z` pour annuler et redessiner, ne cherchez pas à le corriger ;
2. La forme du trait du pinceau est **figée à la fin du dessin, impossible de la peaufiner comme une forme standard** (mais l'objet trait lui-même supporte la mise à l'échelle globale).

💡 Pourquoi le sentier doit-il être « légèrement courbé » plutôt que droit ? — une ligne droite ressemble à un plan, une ligne courbée ressemble à la vie. Ce petit détail donne instantanément « une âme humaine » à la scène.

✏️ **Entraînez-vous** : d'abord dessinez une route droite, regardez ; `Ctrl + Z` annulez, redessinez une courbée, comparez les sensations. Cette méthode de « faire deux versions et comparer » est le plus court chemin pour monter en esthétique.

### 44.6 ④ Ajouter l'arbre, le bassin et la clôture

**Arbre** (en deux parties) :
1. `cylinder` cylindre, affinez et allongez → tronc, brun foncé ;
2. `sphere` sphère → feuillage, vert, `PgUp` pour le mettre au sommet du tronc ;
3. Sélectionnez tronc et feuillage (`Shift` pour ajouter à la sélection, les deux sélectionnés) → `Ctrl + D` pour cloner l'arbre entier → déplacez ailleurs.

💡 Ici on utilise le mécanisme clé du chapitre 38 : **lors d'un clonage multi-sélection, la position relative des deux parties est conservée**, donc ce qui est copié est « un arbre entier complet », sans se disperser. Pour planter une rangée d'arbres, répétez « cloner + `Shift +` flèches ».

⚠️ Ne faites pas tous les arbres de taille identique — après le clonage, ajustez au hasard chaque arbre de ± 5 % environ avec `+` / `-`, la sensation naturelle monte instantanément. **Un peu d'aléatoire dans la régularité, c'est le secret pour rendre la scène réaliste.**

**Bassin** :
1. Formes 2D `ellipse` ellipse ou `circle2` cercle, allongé au sol ;
2. `PgUp` pour monter d'**un petit pas** (ne pas être coplanaire avec la pelouse) ;
3. Couleur bleu clair, motif « **vagues** » ;
4. **Opacité réglée à 0,6** — la sensation d'eau semi-transparente apparaît (section 20.2).

**Clôture** (usage type du clonage en réseau) :
1. `box` aplati en une planche fine verticale → une barre ;
2. `Ctrl + D` cloner → `Shift +` flèches pour déplacer d'une grille entière → encore `Ctrl + D` → encore déplacer……
3. Répétez jusqu'à remplir un côté ;
4. Une fois ce côté fait, `Shift` sélectionnez toute la rangée → `Ctrl + D` clonez la rangée entière → avec `Shift + A` faites pivoter de **90°** → déplacez de l'autre côté de la cour.

💡 La 4e étape est l'aboutissement des dix premières parties du livre : **multi-sélection + clonage + rotation du groupe entier de 90°**, trois compétences en une seule fois. Après cette étape, on peut dire que vous êtes « diplômé ».

### 44.7 ⑤ Ajouter les petits détails

- **Cailloux** : `sphere` ou `dodeca` dodécaèdre réduit, clonez-en quelques-uns éparpillés de chaque côté du sentier, en nuances de gris mais **d'intensités variées** ;
- **Fleurs** : `star` étoile à cinq branches (2D) ou petite sphère, couleur vive, parsemées sur la pelouse ;
- **Plaque de porte** : version réduite de l'enseigne du chapitre 42, accrochée à l'entrée, avec le numéro de porte ;
- **Mur de photos** : utilisez « Ajouter une image » pour mettre une de vos photos (chapitre 23), comme panneau d'exposition dans la cour.

⚠️ Les détails doivent être **contenus**. Arrêtez-vous quand c'est « riche à voir mais pas chaotique ». Critère : passez en « vue de dessus », si d'un coup d'œil on ne distingue pas le principal du secondaire, c'est qu'il y en a trop, supprimez-en.

### 44.8 ⑥ Régler l'ambiance et exporter

**Unifier la tonalité** (l'étape qui élève le plus la qualité) :

| Ambiance voulue | Comment régler |
|---|---|
| Matin | Globalement clair, froid (bleu clair, blanc cassé), opacité légèrement plus haute |
| Crépuscule | Globalement chaud (orange, brun, or), assombrit la couleur du côté ombre |
| Conte | Saturation haute (rose, cyan, jaune vif), motif « points » |
| Minimaliste | Uniquement noir/blanc/gris + une couleur d'accent |

💡 Utilisez la technique de 18.2 pour unifier la tonalité : **fixez la barre de teinte sans la bouger, ne changez que luminance et saturation**, et toutes les couleurs de la scène s'harmoniseront automatiquement. C'est la méthode de couleur la plus économique et la plus efficace.

**Processus d'export** (idem 43.7) :
1. Essayez les 7 angles en bas, choisissez le plus joli (généralement la « perspective » avec un léger plongeant) ;
2. Masquez les axes et la grille (chapitre 28), l'image est instantanément propre ;
3. `F11` plein écran ;
4. `Ctrl + P` capture ;
5. `Ctrl + S` sauvegarde le projet.

✏️ **Dernier entraînement** : capturez **trois angles différents** de la même scène — vue de dessus (plan de disposition), vue de face (élévation), perspective (rendu). C'est exactement le trio standard de livraison d'un architecte. Vous savez déjà le faire.

### 44.9 Liste de vérification en cas de blocage

Dans une grande scène, il est facile de « s'emmêler de plus en plus ». Si bloqué, vérifiez avec ce tableau :

| Symptôme | Probablement parce que | Comment sauver |
|---|---|---|
| De plus en plus chaotique, on ne sait plus quoi faire | Pas suivi l'ordre « d'abord le grand puis le petit » | Arrêtez, passez en vue de dessus pour voir l'ensemble, fixez d'abord la position des grands objets |
| Objets qui s'interpénètrent et scintillent | Coplanaires (Z-fighting) | Utilisez `PgUp`/`PgDn` pour séparer les couches |
| Proportions faussées, un objet démesurément grand | Pas de référence | Placez un objet de taille connue comme « règle », réglez le reste dessus |
| Couleurs chaotiques, paraît cheap | Trop de types de couleurs | Réduisez à 3 couleurs max, utilisez clair/foncé pour les couches |
| Impossible de sélectionner l'objet voulu | Masqué par un autre objet | Changez d'angle puis cliquez, ou déplacez d'abord l'obstacle |
| Les flèches ne bougent soudain plus l'objet | Non sélectionné / curseur dans la boîte | Voir section 32.1 le trio de dépannage |
| Tout a disparu par accident | `Ctrl + Del` vidage accidentel | `Ctrl + Z` annuler ; la prochaine fois sauvegardez d'abord |

### 44.10 Conclusion : de « savoir utiliser » à « savoir créer »

Regardez votre parcours :

- Dans la première partie, vous demandiez encore « qu'est-ce que le 3D » ;
- Dans la cinquième partie, vous avez appris à faire parler la scène ;
- Dans la huitième partie, votre main a quitté la souris ;
- Dans la dixième partie, vous pouvez commander un groupe d'objets d'un coup ;
- Maintenant, vous avez indépendamment réalisé une petite maison avec cour.

Les boutons de l'outil sont limités (20 formes 3D + 20 formes 2D + 12 motifs + 8 polices), mais **les combinaisons sont infinies**. Ce qui décide vraiment de la hauteur de l'œuvre n'est jamais le nombre de boutons que vous connaissez, mais :

1. **Capacité de décomposition** — savoir voir un objet complexe comme une combinaison de géométries simples ;
2. **Conscience de l'ordre** — d'abord le grand puis le petit, d'abord le fixe puis la décoration ;
3. **Judgement esthétique** — savoir quand s'arrêter.

Ces trois points, les quatre projets de cette partie les entraînent sans cesse. Le reste, à l'entraînement.

💡 **Conseil pour la suite** : trouvez une photo que vous aimez (chambre, coin de rue, jouet), essayez de la « recréer » avec cet outil. Peu importe si ce n'est pas ressemblant — **c'est là où ce n'est pas ressemblant que vous rencontrez vos propres problèmes**, c'est là que le progrès commence.

---

✏️ **Résumé de la partie** : les quatre projets correspondent à quatre compétences — la maison entraîne la **décomposition des volumes**, le slogan entraîne la **mise en page de texte et le faux 3D**, l'emblème entraîne les **couches, l'alignement et les couleurs**, la cour entraîne le **processus complet et la coordination**. Les trois lois de fer qui traversent tout : **Z-fighting → montez d'un pas**, **symétrie/répétition → utilisez le clonage**, **faites quelque chose → regardez sous l'angle correspondant**. La partie suivante est la dernière du livre : manuel de dépannage, glossaire, aide-mémoire des raccourcis et index, comme outil de consultation à portée de main pour votre création future.

---

# Douzième partie Dépannage et annexes

> Cette partie est un « ouvrage de référence », pas faite pour être lue du début, mais pour être **consultée quand vous êtes bloqué**.
>
> Si dans n'importe quelle partie précédente vous rencontrez un « eh, pourquoi ça ne va pas », consultez d'abord le chapitre 45 (table de dépannage) ; pour chercher le sens d'un mot, chapitre 46 ; pour les raccourcis oubliés, chapitre 47 ; pour confirmer comment s'appelle et à quoi ressemble une forme/motif/police, chapitre 48.
>
> Les trois tableaux (dépannage, raccourcis, index) sont à **favoriser ou imprimer**, gardés à portée de main lors de la création.

---

## Chapitre 45 Manuel de dépannage des problèmes courants

### 45.1 Dépannage des problèmes généraux

Le tableau ci-dessous est ordonné par « phénomène vu → cause probable → comment sauver ». La grande majorité des problèmes sont traçables, ne suspectez pas un bug trop vite.

| N° | Phénomène | Cause probable | Solution |
|---|---|---|---|
| 1 | Flèches, `+`/`−` sans effet sur l'objet | Objet non sélectionné, ou curseur dans la boîte numérique du panneau droit | Cliquez d'abord sur une zone vide, assurez-vous que l'objet est sélectionné et que la boîte a perdu le focus (section 32.1) |
| 2 | Deux faces scintillent, s'interpénètrent | Deux faces coplanaires (**Z-fighting**) | Utilisez `PgUp`/`PgDn` pour monter/descendre l'une d'un pas pour les séparer (sections 41.5, 43.4) |
| 3 | Texte démesurément grand recouvrant toute la scène | Taille de police par défaut **80**, bien supérieure à l'échelle des volumes | Réduisez la taille, ou mettez l'objet texte à l'échelle globalement (sections 21, 41.7, 42.3) |
| 4 | Changé la taille, mais flèches inopérantes | Curseur encore dans la boîte numérique, pas sorti | Cliquez d'abord sur une zone vide pour perdre le focus de la boîte (section 32.1) |
| 5 | `Ctrl+C`/`Ctrl+D`/`Ctrl+V` sans réponse | Contrôle de transformation en cours d'activation, ou objet non sélectionné | Appuyez d'abord sur `Esc` pour quitter le contrôle de transformation, puis sélectionnez l'objet avant d'opérer (chapitres 33, 39) |
| 6 | `+`/`−` refusés en multi-sélection | La mise à l'échelle globale est **interdite** en multi-sélection (message « NoScaleMulti ») | Annulez la multi-sélection et réduisez un par un, ou tirez la poignée du contrôle de transformation (section 36.4) |
| 7 | Mode de redimensionnement désactivé après sélection de texte | **Le texte ne supporte pas la mise à l'échelle uniforme**, revient automatiquement à la translation | Pour changer la taille du texte, utilisez le paramètre « taille de police » (chapitre 21) ; images et traits de pinceau peuvent être normalement mis à l'échelle (sections 24, 36.4) |
| 8 | Pinceau/forme ratés, veut corriger la forme | Le trait de pinceau est figé à la fin, impossible de peaufiner comme une forme | `Ctrl+Z` annuler et redessiner (sections 24, 44.5) |
| 9 | Veut centrer mais pas de bouton « centrage » | Cet outil **n'a pas de centrage en un clic** | Trois méthodes : grille, clonage concentrique, boîte numérique (section 43.5) |
| 10 | Texte le long d'un arc (texte annulaire) impossible | Cet outil **ne supporte pas le texte annulaire** | Utilisez un texte horizontal en bas, ou découpez lettre par lettre et faites pivoter chacune (section 43.6) |
| 11 | Certaines formes 2D (cœur/flèche/croissant/croix/éclair) : comment régler les paramètres de forme | Elles ont **chacune des paramètres de forme indépendants** (cœur `largeur/hauteur/profondeur de la pointe`, flèche `longueur/largeur`, croissant `rayon extérieur/rayon intérieur/décalage`, croix `longueur/largeur de bras`, éclair `hauteur/largeur`, etc., voir section 12.2) | Réglez directement dans les paramètres de forme correspondants du panneau droit (sections 12.2, 43.4) |
| 12 | Suppression accidentelle de toute la scène ou d'un contenu important | `Delete` glissé, ou scène vidée | `Ctrl+Z` annuler immédiatement ; et prenez l'habitude de `Ctrl+S` par étapes (section 44.1) |
| 13 | Import JSON « échec du chargement » | Fichier corrompu, ou format non exporté par cet outil | Confirmez l'export `.json` via `Ctrl+S` de cet outil (chapitre 6) |
| 14 | Bouton d'angle ne s'allume pas, caméra s'éteint après rotation | Après rotation libre le bouton « perspective » s'éteint (normal) | Cliquez un bouton d'angle pour réaligner (chapitre 28) |
| 15 | 📱🤖 Sur tactile, glisser ne fait que tourner la vue, impossible de faire un rectangle | La sélection rectangulaire tactile nécessite **d'entrer d'abord en mode sélection rectangulaire** | Cliquez d'abord le bouton « sélection rectangulaire » de la barre du bas (devient bleu) puis glissez avec un doigt ; **sort automatiquement après**, recommencez en recliquant si besoin (section 7.4) |
| 16 | Couleur globale changée, mais un objet ne change pas | Cet objet a un **remplacement de couleur indépendant**, ou est en état « sans couleur » | Sélectionnez-le et changez sa couleur séparément (chapitre 18) |
| 17 | Pipette d'écran inutilisable | Outil pipette pas activé d'abord | Cliquez le bouton pipette de la zone de couleur avant de prélever (chapitre 18) |
| 18 | Lignes de grille/axes dans la capture | Éléments d'aide non masqués | Masquez axes et grille puis `Ctrl+P` (sections 28, 43.7) |
| 19 | Objet cloné « éclaté » | Groupe pas entièrement sélectionné avant clonage multi | Utilisez `Shift` pour sélectionner tout le groupe puis `Ctrl+D` (chapitre 38) |
| 20 | Rotation de vue/objet inversée | Axes confondus : `A/D` autour de Z, `W/S` autour de Y, `Q/E` autour de X | Suivez la table de référence du chapitre 47, ou `Shift`+flèches pour tester à grand angle (chapitres 32, 34) |

💡 **Premier principe du dépannage** : 90 % des « bizarreries » n'ont que trois racines — **non sélectionné**, **curseur dans la boîte**, **deux faces coplanaires**. Récitez ces trois phrases d'abord, puis consultez la table, cela économise la moitié du temps.

### 45.2 Problèmes propres à chaque plateforme

Le tableau ci-dessus est généralement commun aux quatre plateformes. Ceux-ci n'apparaissent que dans certaines formes :

**🖥️📱 Version Web**

| Phénomène | Cause | Solution |
|---|---|---|
| Page blanche à l'ouverture | Ressources pas finies de charger, ou navigateur trop ancien | Actualisez ; appuyez sur `F12` pour voir les erreurs rouges de la console ; passez à Chrome / Edge récent |
| « WebGL non supporté » | Accélération matérielle désactivée par le navigateur | Dans les paramètres du navigateur, activez « utiliser l'accélération matérielle », redémarrez le navigateur |
| 📱 Sur mobile le panneau occupe tout l'écran | Logique de repli auto sur écran étroit non déclenchée | Utilisez en paysage, ou repliez manuellement le panneau via le bouton de bord |
| 📱 Touche retour mobile quitte directement la page | La version Web ne peut pas intercepter la touche retour du navigateur | Utilisez le bouton de fermeture de l'interface à la place ; exportez les œuvres importantes d'abord |

**💻 Version PC (Windows)**

| Phénomène | Cause | Solution |
|---|---|---|
| « Éditeur de publication inconnu » à l'installation | Paquet d'installation non signé numériquement | Cliquez « Plus d'informations » → « Exécuter quand même » ; cas courant pour un projet open source personnel |
| Écran blanc après lancement | Pilote graphique trop ancien, WebGL indisponible | Mettez à jour le pilote graphique puis redémarrez |
| Fermeture anormale précédente, progression perdue | — | La version PC a une **récupération après crash**, surveillez le message de récupération au redémarrage |
| Glisser un fichier dans la fenêtre sans effet | Ce n'est pas un fichier projet `.json` | Seul le `.json` exporté par cet outil est supporté |

**🤖 Version Android**

| Phénomène | Cause | Solution |
|---|---|---|
| Impossible d'installer l'apk | « Sources inconnues » non autorisées | Paramètres → Sécurité → autoriser cette app à installer des apps inconnues |
| Bouton « plein écran » introuvable | La version Android tourne en plein écran | C'est normal, inutile de le chercher |
| Fichiers exportés introuvables | Stockés dans le stockage de l'app | Utilisez le panneau de **partage** après export pour envoyer directement, ou le gestionnaire de fichiers pour voir le répertoire de l'app |
| Crainte de perdre l'œuvre en appuyant sur retour | — | Une boîte de confirmation apparaît avant de quitter, choisissez « **Enregistrer et quitter** » |

---

## Chapitre 46 Glossaire (chinois-anglais)

Glossaire de consultation rapide. Les termes avec `*` sont propres à cet outil.

| Chinois | Anglais | Explication en une phrase |
|---|---|---|
| Unité de grille* | GRID_UNIT | Longueur d'une case au sol, aussi base du pas de déplacement (0,1 case / 1 case) |
| Z vers le haut* | Z-up | Cet outil prend l'axe Z comme « haut », contrairement à la plupart des logiciels 3D qui prennent Y comme « haut » |
| Scintillement coplanaire | Z-fighting | Scintillement et traverssement mutuel de deux faces à même profondeur se disputant la position |
| Analyse de volumes | block analysis | Idée de décomposer un objet complexe en combinaison de géométries simples (pensée type jeu de construction) |
| Mise à l'échelle uniforme | uniform scale | Verrouille les proportions longueur/largeur/hauteur pour agrandir/réduire ensemble, évitant la déformation |
| Ensemble de sélection* | selection set | Groupe d'objets actuellement sélectionnés (composé via `Shift` ajout) |
| Pivot maître* | master pivot | Centre de contrôle commun du groupe lors d'une transformation multi-sélection (chapitre 38) |
| Clone | clone | Copier un objet identique (`Ctrl+D`) |

| 阵列* | array | clone répétitif et régulier (plusieurs `Ctrl+D` + flèches directionnelles) |
| 变换控件 | transform controls | les trois « outils de préhension » dans la scène : poignées flèche/anneau/cube |
| 平移模式 | translate mode | déplacer l'objet avec la flèche |
| 旋转模式 | rotate mode | choisir l'axe de rotation avec l'anneau |
| 缩放模式 | scale mode | agrandir/réduire avec la poignée cube |
| 花纹 | pattern / texture | les 12 textures procédurales appliquées à la surface de l'objet (pas de texture externe) |
| 不透明度 | opacity | 0.1 = quasi totalement transparent (limite basse du curseur, impossible d'être vraiment transparent), 1 = totalement opaque ; semi-transparent pour l'eau, le verre, la lueur |
| 视角 | view / camera | 7 positions de caméra prédéfinies : perspective/haut/bas/avant/arrière/gauche/droite |
| 画笔笔迹* | brush stroke | trait figé tracé par l'outil pinceau, non ajustable ni redimensionnable après traçage |
| 屏幕取色 | eyedropper | prélever une couleur depuis n'importe où sur la toile |
| 历史栈 | history stack | journal des opérations servant à l'annulation/refait (chapitre 10) |

---

## Chapitre 47 : Tableau rapide des raccourcis

> Tous les raccourcis ne **distinguent pas les majuscules/minuscules** ; `Ctrl` correspond à `Cmd` sur Mac.
> Note : tant que le curseur est dans une zone de saisie / une liste déroulante, le raccourci est désactivé — c'est un comportement normal, pas un bug (section 32.1).
>
> 📌 **Formes concernées** : les raccourcis clavier s'appliquent à 🖥️ **Version Web·souris** et 💻 **Version PC (Windows)**.
> 📱🤖 **Version Web·tactile / Version Android** n'ont pas de clavier physique, voir le tableau des gestes en 47.2 (sauf clavier externe connecté).

### 47.1 Opérations liées à la souris (🖥️ Version Web·souris / 💻 Version PC)

| Opération | Description |
|---|---|
| Clic gauche simple | sélectionner un objet/contrôle |
| Double-clic gauche | éditer le texte |
| Maintenir le clic gauche | manipuler l'objet/contrôle |
| Maintenir le clic droit | rotation de la vue |
| Maintenir la molette | translation de la vue |
| Faire défiler la molette | zoom de la vue |

### 47.2 Opérations gestuelles (📱 Version Web·tactile / 🤖 Version Android)

| Opération | Description |
|---|---|
| Toucher un doigt | sélectionner un objet/contrôle |
| Double toucher un doigt | éditer le texte |
| Maintenir un doigt sur un objet | ajouter/retirer de la sélection (équivaut à clic `Shift`) |
| Glisser un objet avec un doigt | manipuler l'objet/contrôle |
| Glisser dans le vide avec un doigt | rotation de la vue |
| Tapoter le vide avec un doigt | annuler la sélection |
| Bouton « Tout sélectionner » | sélectionner tous les objets (équivaut à `Ctrl+A`) |
| Bouton « Sélection rectangulaire » | après activation, glisser avec un doigt pour sélectionner ; **sort automatiquement après sélection**, il faut recliquer pour refaire |
| Glisser deux doigts | translation de la vue |
| Pincer deux doigts | zoom de la vue |
| Cliquer sur le bouton Retour (🤖 **Android uniquement**) | fermer couche par couche les notes / le sommaire / le manuel → annuler la sélection → confirmation de sortie |

### 47.3 Touches simples (🖥️💻 nécessite un clavier)

> Lorsqu'un objet est sélectionné : translation de 0,1 grille (0,15 longueur) / rotation de 5° ; sans sélection : translation de la vue de 0,1 grille / rotation de 5°.

| Touche | Objet sélectionné | Sans sélection |
|---|---|---|
| `↓` / `↑` | translation le long de X +/− | vue arrière / avant |
| `→` / `←` | translation le long de Y +/− | vue droite / gauche |
| `PgUp` / `PgDn` | translation le long de Z +/− | vue haut / bas |
| `A` / `D` | rotation autour de Z sens horaire / anti-horaire | vue gauche / droite |
| `W` / `S` | rotation autour de Y sens horaire / anti-horaire | vue haut / bas |
| `E` / `Q` | rotation autour de X sens horaire / anti-horaire | — |
| `+` / `-` | agrandir / réduire 5% | — |

> 📝 **Traitement spécial lorsqu'un « objet texte » est sélectionné** : le texte ne prend pas en charge la mise à l'échelle uniforme, alors `+` / `-` modifie la **taille de police** (environ ±10% à chaque fois, plage 24–220), et non l'échelle de l'objet. Pour redimensionner globalement, utilisez directement le paramètre « taille de police ».

| `Esc` | annuler l'opération | fermer le contrôle |
| `F11` | 🖥️📱 plein écran / quitter le plein écran ; 💻 maximiser / restaurer | (idem) |
| `Del` / `Backspace` | supprimer l'objet sélectionné | — |

### 47.4 Combinaisons avec Shift

> Lorsqu'un objet est sélectionné : translation de 1 grille (1,5 longueur) / rotation de 90° ; sans sélection : translation de la vue de 1 grille / rotation de 90°.

| `Shift` + touche | Objet sélectionné | Sans sélection |
|---|---|---|
| `↓` / `↑`, `→` / `←`, `PgUp` / `PgDn` | translation de 1 grille | translation de la vue de 1 grille |
| `A` / `D`, `W` / `S`, `E` / `Q` | rotation de 90° | rotation de la vue de 90° |
| `+` / `-` | agrandir ×2 / réduire ×0,5 | — |
| Clic gauche simple | ajouter à la sélection (clic) | (idem) |
| Maintenir le clic gauche (outil pinceau) | — | mode ligne contrainte du pinceau (le trait est contraint horizontal / vertical / 45° lors du tracé, même effet que la contrainte `Shift`) |

### 47.5 Barre de défilement / zone de saisie

> Prend effet lorsque la barre de défilement ou la zone de saisie est focalisée ; le raccourci d'origine est temporairement désactivé.

| Touche | Barre de défilement | Zone de saisie |
|---|---|---|
| `→` / `←` | augmenter / diminuer | déplacer le curseur |
| `↑` / `↓` | augmenter / diminuer | augmenter / diminuer |
| `+` / `-` | — | saisir le signe + / − |
| `PgUp` / `PgDn` | augmenter / diminuer fortement | faire défiler vers le haut / bas le panneau droit |

### 47.6 Combinaisons avec Ctrl

| `Ctrl` + touche | Combinaison |
|---|---|
| `A` | tout sélectionner |
| `N` | nouveau scénario |
| `O` | importer le scénario |
| `S` | exporter le scénario |
| `P` | capture d'écran et exportation d'image |
| `Z` | annuler |
| `Y` | refaire |
| `C` | copier |
| `V` | coller |
| `D` | cloner |
| `Del` | vider le scénario |

---

## Chapitre 48 : Index des formes · motifs · couleurs

Toutes les « pièces de matériau » de l'outil sont ici. La palette utilise une **palette prédéfinie + sélection de couleur personnalisée** (chapitre 18), sans « liste de couleurs » fixe, donc seules les quatre catégories forme, motif, police et vue sont listées ici, avec des conseils d'usage pour les couleurs.

### 48.1 20 formes 3D

| N° | id interne | Nom chinois | Usage typique |
|---|---|---|---|
| 1 | `box` | cube | mur, plaque, corps de maison, marches — corps de base universel |
| 2 | `sphere` | sphère | feuillage, planète, bille, tête |
| 3 | `cylinder` | cylindre | pilier, pot, tronc, cheminée, support |
| 4 | `cone` | cône | tour pointue, glace, panneau de signalisation, feu de joie |
| 5 | `torus` | tore | beignet, pneu, anneau, bracelet |
| 6 | `knot` | nœud | sculpture artistique trèfle, décoration |
| 7 | `icosa` | icosaèdre | cristal polyédrique, dé sci-fi |
| 8 | `octa` | octaèdre | gemme bipyramidale, cristal |
| 9 | `dodeca` | dodécaèdre | cristal à douze faces, objet décoratif |
| 10 | `capsule` | capsule | pilule, articulation, colonne à tête ronde |
| 11 | `pyramid` | pyramide à base carrée | pyramide, toit (mur de toit carré sur base carrée) |
| 12 | `prism` | prisme triangulaire | colonne triangulaire, cale, pente |
| 13 | `tube` | tuyau | tuyau courbe, tuyau souple, rail |
| 14 | `lathe` | corps de révolution | vase, bol, bouteille (corps tourné) |
| 15 | `tetra` | tétraèdre | pyramide à quatre côtés, fragment, éclat de cristal |
| 16 | `barrel` | tonneau | tonneau en bois, tonneau de vin, tambour |
| 17 | `dome` | hémisphère | dôme, couvercle de bol, radôme |
| 18 | `helix` | anneau hélicoïdal | ressort, escalier en spirale, sensation ADN |
| 19 | `octaPrism` | prisme octogonal | colonne à huit côtés, phare, pilier de pavillon |
| 20 | `star3d` | étoile 3D | décoration d'étoile tridimensionnelle, médaille |

💡 Parmi les 20, `box / sphere / cylinder / cone / pyramid` sont les cinq principales du « découpage de blocs » (chapitre 41), les autres servant surtout à la décoration et aux accents.

### 48.2 20 formes 2D (allongées au sol, utilisées comme autocollants/plans)

| N° | id interne | Nom chinois | Remarque |
|---|---|---|---|
| 1 | `square2` | carré | gazon, plaque de base, le plus utilisé |
| 2 | `circle2` | cercle | socle, bassin |
| 3 | `triangle` | triangle équilatéral | |
| 4 | `star` | étoile (pentagramme) | |
| 5 | `hexagon` | hexagone régulier | base au look tech/industriel |
| 6 | `heart` | cœur | inclut des paramètres de forme comme `échelle` (section 12.2) |
| 7 | `pentagon` | pentagone régulier | bouclier / ambiance académique |
| 8 | `octagon` | octogone régulier | sentiment d'identité stable |
| 9 | `ellipse` | ellipse | bassin, lentille |
| 10 | `parallelogram` | parallélogramme | |
| 11 | `trapezoid` | trapèze | |
| 12 | `diamond` | losange | |
| 13 | `rightTri` | triangle rectangle | |
| 14 | `arrow` | flèche | inclut des paramètres comme `longueur/largeur` (section 12.2) |
| 15 | `crescent` | croissant | inclut des paramètres comme `rayon extérieur/rayon intérieur/décalage` (section 12.2) |
| 16 | `semicircle` | demi-cercle | |
| 17 | `ring2d` | anneau (2D) | différent du `torus` 3D, c'est un anneau plan |
| 18 | `cross` | croix | inclut des paramètres comme `longueur de bras/largeur de bras` (section 12.2) |
| 19 | `lightning` | éclair | inclut des paramètres comme `hauteur/largeur` (section 12.2) |
| 20 | `teardrop` | goutte | |

💡 Les n° 6, 14, 15, 18, 19 (cœur/flèche/croissant/croix/éclair) **ont chacun leurs propres paramètres de forme indépendants** (voir section 12.2, par ex. cœur : `largeur/hauteur/creux de la pointe`, flèche : `longueur/largeur`, croissant : `rayon extérieur/rayon intérieur/décalage`, éclair : `hauteur/largeur`), ajustables directement dans le panneau droit ; les autres formes 2D sont surtout des polygones, pouvant ajuster des paramètres comme « nombre de côtés/angle ».

### 48.3 12 motifs (textures)

| N° | Nom chinois | Scène adaptée |
|---|---|---|
| 1 | couleur unie | par défaut, propre sans texture |
| 2 | damier | gazon, carrelage, échiquier |
| 3 | rayures | tissu, auvent, drapeau |
| 4 | pois | décoration à pois, neige (blanc + pois) |
| 5 | dégradé | ciel, arrière-plan, sensation lumineuse |
| 6 | mur de briques | mur (utilisé au chapitre 41 sur la maison) |
| 7 | diagonales | avertissement, sensation de vitesse |
| 8 | vagues | surface d'eau, pli de tissu |
| 9 | pointillé | ambiance tech, points de grille |
| 10 | croisillon | grille, sensation d'ingénierie |
| 11 | grille | repère au sol, base tech |
| 12 | filet | tourbillon, énergie, décoration tourbillonnante |

💡 Les motifs sont **générés procéduralement**, sans dépendre d'images externes ; la couleur est contrôlée uniformément par « couleur » dans le panneau droit, le motif ne modulant que la luminosité/motif (chapitre 19).

### 48.4 8 polices (outil texte)

| N° | Nom de police | Style | Usage |
|---|---|---|---|
| 1 | YaHei | sans-serif moderne | général, sensation d'interface |
| 2 | Song | serif | traditionnel, formel, livresque |
| 3 | Kai | kai manuscrit | traditionnel, plaque, académie |
| 4 | Hei | gras sans-serif | slogan, percutant |
| 5 | FangSong | FangSong | document officiel, solennel |
| 6 | Arial | sans-serif latin | identité anglaise |
| 7 | Times | Times New Roman serif | formel occidental, plaque explicative |
| 8 | Courier | Courier New monospace | technique, rétro, style machine à écrire |

⚠️ Taille de police par défaut **80**, à réduire selon l'échelle des blocs (sections 21, 42.3). Les polices chinoises dépendent des polices système, un changement d'appareil peut provoquer un repli.

### 48.5 7 vues (boutons en bas)

| N° | Vue | Que voir | Usage typique |
|---|---|---|---|
| 1 | perspective | 3D en oblique depuis le haut, rotation libre 360° (par défaut) | voir l'effet global, faire des rendus |
| 2 | vue de dessus | vue verticale depuis le haut | disposition au sol, logo, composition plane |
| 3 | vue de dessous | vue verticale depuis le bas | voir la face inférieure, composition spéciale |
| 4 | vue de face | vue horizontale de face | juger collé au sol/flottant, élévation |
| 5 | vue arrière | vue horizontale de derrière | voir le dos, vérification symétrique |
| 6 | vue gauche | vue horizontale côté gauche | vérifier le chevauchement gauche/droit |
| 7 | vue droite | vue horizontale côté droit | vérifier le chevauchement gauche/droit |

💡 **Expérience clé (l'une des règles de fer du livre entier)** : utilise la vue correspondante à ce que tu fais. Pour régler la hauteur, utilise la vue de face ; pour la disposition, la vue de dessus ; pour l'ensemble, la perspective. Après rotation libre, le bouton « perspective » s'éteint, c'est normal.

### 48.6 Conseils d'usage des couleurs

L'outil n'a pas de « table de numéros de couleurs » fixe, les couleurs sont obtenues via **palette prédéfinie + sélection personnalisée + sélection à l'écran** (chapitre 18) :

- Privilégiez la **palette prédéfinie** pour choisir les couleurs (groupée par teinte, barre de teinte fixe, idéale pour des couleurs harmonieuses) ;
- Pour une couleur précise, utilisez la **sélection personnalisée** (saisir la valeur de couleur) ;
- Pour « une couleur présente dans l'image », utilisez le **pipette à l'écran** pour la prélever ;
- Règle de couleur : **restez dans 2–3 couleurs**, en créant de la profondeur par les nuances d'une même teinte, ce qui paraît plus pro que d'ajouter brutalement des couleurs (section 43.8).

---

# Treizième partie : Notes · Multilingue

Arrivé ici, vous maîtrisez « comment utiliser l'outil ». Cette partie traite de deux petites choses « qui vous accompagnent dans l'apprentissage » : les notes à prendre en lisant, et le multilingue du manuel lui-même.

## Chapitre 49 : Lire et noter : les notes dans le manuel

Lors de l'apprentissage, vous voulez souvent « marquer » un paragraphe. Le manuel vous permet de **sélectionner un passage de texte → ajouter une note** :

1. En lisant le manuel, sélectionnez n'importe quel texte :
   - 🖥️💻 **Côté souris** : maintenez le clic gauche pour **glisser-sélectionner** ;
   - 📱 **Version Web·tactile** : maintenir le doigt sur le texte sélectionne automatiquement le mot sous le curseur et fait apparaître une superposition intégrée « Note / Surbrillance / Copier » (vous pouvez continuer à glisser pour ajuster la sélection) ; pour compatibilité avec les ROM chinoises (MIUI / ColorOS / vivo, etc.), la « super fonction glisser » et le menu long-press natif sont désactivés, la barre d'outils de copie/partage système ne s'affiche plus ;
     - Si le texte sélectionné **chevauche une surbrillance existante**, la superposition affiche à la place « Annuler la surbrillance / Étendre la surbrillance » : cliquer « Étendre la surbrillance » étend la plage à la limite de la sélection actuelle, cliquer « Annuler la surbrillance » retire la partie chevauchée.
   - 🤖 **Version Android** : maintenir le doigt sur le texte fait apparaître un point d'ancrage de sélection et deux poignées déplaçables, glissez-les pour balayer le texte ; la barre de copie/partage système ne s'affiche plus, remplacée par la superposition intégrée « Note / Surbrillance / Copier » ;
2. Après relâchement, un bouton « Ajouter une note » apparaît, cliquez dessus ;
3. Le passage sélectionné est surligné et enregistré dans la **liste de notes** ;
4. Chaque entrée de la liste de notes peut être **supprimée** individuellement — une boîte de confirmation apparaît avant suppression pour éviter les erreurs.

> 💡 La note « suit le texte » : elle est liée à la phrase que vous avez sélectionnée, pratique pour revenir voir « à quoi je pensais ».

## Chapitre 50 : Faire « flotter » les notes à l'écran

Si vous ne voulez pas aller-retour dans la liste de notes, vous pouvez déployer une note en **fenêtre de note flottante** :

- La fenêtre de note est une carte flottante déplaçable, survolant la toile sans gêner les manipulations ;
- La fenêtre de note a deux états, **lecture seule** et **édition** : en lecture seule elle ressemble à un Post-it, en édition le texte peut être modifié ;
- Lorsqu'elle n'est plus nécessaire, cliquez sur le bouton de fermeture de la note (`closeSticky`), elle disparaît de l'écran, mais la note elle-même reste dans la liste.

### 50.1 Couche de note et manipulation (identique sur les quatre côtés)

Une fois déployée, la note est une **carte flottante épinglée dans la page** (pas une fenêtre système indépendante), comportement identique sur les quatre côtés :

- Elle est **toujours au premier plan**, flottant au-dessus de la toile, pratique pour suivre le tutoriel tout en opérant ;
- Déplaçable, redimensionnable, avec bascule « épingler / désépingler » (`manPin` / `manUnpin`) ;
- Prend en charge **maximiser / restaurer** (`manMaximize` / `manRestore`) ;
- Prend en charge **exporter / importer** les notes (`manExport` / `manImport`), **tout sélectionner** et **suppression par lot** (`manSelectAll` / `manBatchDel`) ;
- Les touches listées dans « Paramètres → Opérations rapides » déclenchent ces actions (la Version PC peut aussi cliquer les boutons de la fenêtre).

> ⚠️ **Trois règles de validation à l'import des notes** (identiques sur les quatre plateformes) :
> 1. **Incohérence de langue → tout le paquet est ignoré** : si la langue étiquetée du paquet de notes importé diffère de la langue d'interface courante, le système affiche « langue non correspondante » et **refuse l'import**, évitant de mélanger des notes d'autres langues ;
> 2. **Avertissement de version ancienne** : si un paquet de notes contient un numéro de version plus ancien (ou différent) que le logiciel actuel, après import il affiche « notes de version ancienne détectées », pour vous alerter sur la compatibilité ;
> 3. **Anciennes notes sans étiquette de langue** : les très anciens paquets de notes n'ont pas d'étiquette de langue ; le système affiche « ancien format, sans langue » mais les importe quand même dans la langue courante pour vérification manuelle.

> 📌 Les notes des quatre côtés sont des couches dans la page, ne peuvent pas être tirées hors de la fenêtre de l'application ni passer au-dessus d'un autre programme.

### 50.2 Ordre de fermeture des notes (📱🤖 côté tactile, attention)

🤖 Lors d'un **clic sur le bouton Retour** de la Version Android, elle **ferme d'abord les notes une par une** (si l'une a un contenu non enregistré, elle vous demande d'abord), puis ferme le sommaire, puis quitte le manuel, et enfin demande si l'on quitte l'application.

> 📌 Les notes conviennent aux « rappels temporaires » : par ex. coller une explication de paramètre à côté, à lire en travaillant.

### 50.3 Limite de nombre et gestion par lot

- **Maximum 5 notes flottantes déployées simultanément** : au-delà, le système **ferme automatiquement la plus ancienne** pour garantir performances et clarté de l'interface. La note elle-même reste dans la liste, sans perte.
- La liste de notes prend en charge la **suppression par lot** : dans la liste, plusieurs notes peuvent être cochées et supprimées en une fois (avec confirmation au préalable), sans opération une par une.

## Chapitre 51 : Multilingue : le manuel « parle » aussi votre langue

L'interface et le manuel prennent en charge neuf langues :

| Langue | Interface | Manuel |
| --- | --- | --- |
| 简体中文 | ✅ | ✅ |
| 繁體中文 | ✅ | ✅ |
| English | ✅ | ✅ |
| 日本語 | ✅ | ✅ |
| 한국어 | ✅ | ✅ |
| Русский | ✅ | ✅ |
| Español | ✅ | ✅ |
| Français | ✅ | ✅ |
| العربية (arabe) | ✅ | ✅ |

Mode de bascule : dans les paramètres, choisissez la langue, le texte de l'interface et le corps du manuel basculent **simultanément** vers la version linguistique correspondante. Le contenu multilingue du manuel est stocké respectivement dans `docs/使用说明书.md` (chinois simplifié), `使用说明书_en.md`, `使用説明書_ja.md`, `使用說明書_zh-TW.md`, `사용설명서_ko.md`, `使用说明书_ru.md`, `使用说明书_es.md`, `使用说明书_fr.md`, `使用说明书_ar.md`.

💡 **Comment la langue est choisie** : au premier démarrage, la **langue système est détectée automatiquement** — selon les paramètres de langue du système/navigateur, correspondance automatique avec les langues courantes comme chinois simplifié, 繁體中文, English, 日本語, Español, Français, العربية ; ensuite, si vous avez changé de langue manuellement, le logiciel **mémorise votre choix et le respecte totalement**, sans être recouvert par la langue système. Autrement dit, la première fois suit le système, par la suite c'est votre choix qui prévaut.

✅ **Neuf langues × quatre formes entièrement intégrées** : quel que soit votre côté ou votre langue, vous lisez le même manuel adapté aux trois côtés. Pour les langues à écriture de droite à gauche (RTL, comme l'arabe), les tableaux et l'alignement dans le manuel sont automatiquement miroir.

> ⚠️ Concernant la confirmation de suppression : toutes les opérations de suppression (notes, objets de scène) passent par une **boîte de confirmation personnalisée** plutôt que native du système, donc elles s'affichent stablement même en **mode plein écran / immergé**, sans « clic sans réaction ».

---

✅ **Fin du livre.** Vous avez parcouru : identification des formes → bases 3D → formes et couleurs → texte, pinceau, image → vues → historique d'annulation → détail de chaque forme → raccourcis et gestes → contrôles de transformation → multi-sélection et clonage → quatre projets pratiques → notes et multilingue → annexe des problèmes.

🌐 **N'oubliez pas** : vos œuvres peuvent être **transmises librement entre Version Web, Version PC (Windows) et Version Android** — esquissées sur mobile, peaufinées sur ordinateur, le `.json` exporté est universel aux trois côtés.

📌 **La dernière phrase** : les outils deviennent obsolètes, mais les trois choses « découper — ordonner — esthétique » ne le sont pas. Fermez le document, allez construire quelque chose à vous.

<!-- __END__ -->
