# CineBouti — Spécification du projet et conception UI/UX

> Version 1 — HTML, CSS et JavaScript, sans framework. Ce document ne contient pas encore de code.

---

## Partie 1 — Spécification du projet

### 1. Problème à résoudre
Quand on cherche un film à regarder, on navigue souvent entre plusieurs sites chargés de publicités, et on finit par oublier les films qui nous intéressaient. CineBouti propose un endroit simple et agréable pour **parcourir des films, trouver rapidement celui qu'on cherche et garder une liste de favoris**.

### 2. Objectifs du projet
**Objectifs pour l'utilisatrice ou l'utilisateur**
- Parcourir un catalogue de films présenté de façon visuelle.
- Trouver un film en quelques secondes grâce à la recherche et aux filtres.
- Retrouver ses films favoris, même après avoir fermé la page.

**Objectifs pédagogiques**
- Structurer une page avec du HTML sémantique.
- Construire une mise en page responsive avec Flexbox, Grid et les variables CSS.
- Manipuler le DOM en JavaScript : créer des éléments, gérer des événements, filtrer un tableau.
- Sauvegarder des données dans le navigateur avec `localStorage`.

### 3. Public cible
- Étudiantes, étudiants et jeunes adultes de 16 à 30 ans qui aiment le cinéma.
- Personnes qui utilisent surtout leur téléphone, mais aussi un ordinateur.
- Aucune connaissance technique nécessaire : l'interface doit se comprendre sans explication.

### 4. Fonctionnalités principales
| # | Fonctionnalité | Description |
|---|---|---|
| F1 | Affichage des films | Chaque film apparaît sous forme de carte : affiche, titre, année, genre, note. |
| F2 | Recherche par titre | Les cartes se mettent à jour à chaque lettre tapée, sans tenir compte des majuscules ni des accents. |
| F3 | Filtre par genre | Des boutons (Tous, Action, Comédie, Drame, Science-fiction, Animation…) n'affichent que les films du genre choisi. La recherche et le filtre fonctionnent ensemble. |
| F4 | Favoris | Un bouton cœur sur chaque carte ajoute ou retire le film des favoris. Un filtre « Favoris » affiche uniquement ces films. Les favoris sont gardés avec `localStorage`. |
| F5 | Changement de thème | Un bouton bascule entre thème sombre (par défaut) et thème clair. Le choix est mémorisé. |
| F6 | Message « aucun résultat » | Un message clair s'affiche si aucun film ne correspond. |

**Hors périmètre de la version 1** : API externe de films, comptes utilisateurs, page de détails, avis ou commentaires.

### 5. Technologies utilisées
| Technologie | Rôle |
|---|---|
| HTML5 | Structure sémantique (`header`, `nav`, `main`, `section`, `article`, `footer`). |
| CSS3 | Mise en forme, variables CSS pour les thèmes, Flexbox, Grid, media queries, transitions. |
| JavaScript (ES6+) | Données des films, affichage des cartes, recherche, filtres, favoris, thème. |
| `localStorage` | Sauvegarde des favoris et du thème choisi. |
| Google Fonts | Polices de l'interface. |
| Git et GitHub | Suivi des versions et mise en ligne possible avec GitHub Pages. |

### 6. Fichiers nécessaires
```
cinebouti/
├── index.html        → structure de la page
├── css/
│   └── style.css     → styles, thèmes, responsive
├── js/
│   └── script.js     → tableau des films + affichage, recherche, filtres, favoris, thème
├── images/           → affiches des films et logo
└── README.md         → présentation et instructions
```

### 7. Critères de vérification
| Critère | Comment vérifier | Résultat attendu |
|---|---|---|
| Affichage | Ouvrir `index.html` | Toutes les cartes s'affichent, sans erreur dans la console. |
| Recherche | Taper « mat » puis « MAT » | Les mêmes films apparaissent dans les deux cas. |
| Recherche vide | Effacer le champ | Tous les films reviennent. |
| Aucun résultat | Taper « zzzz » | Le message « Aucun film trouvé » s'affiche. |
| Filtre | Cliquer sur « Drame » | Seuls les drames s'affichent et le bouton est mis en évidence. |
| Recherche + filtre | Choisir un genre puis taper un mot | Seuls les films qui respectent les deux conditions apparaissent. |
| Favoris | Cliquer sur le cœur, puis recharger la page | Le cœur reste rempli et le film est dans le filtre « Favoris ». |
| Thème | Changer de thème, puis recharger | Le thème choisi est conservé. |
| Responsive | Tester à 375 px, 768 px et 1280 px | Pas de défilement horizontal, mise en page adaptée. |
| Accessibilité | Naviguer avec la touche Tab | Tous les boutons sont atteignables et le focus est visible. |

---

## Partie 2 — Conception de l'interface (UI/UX)

### Idée générale
L'ambiance s'inspire d'une **salle de cinéma** : fond très sombre comme une salle éteinte, affiches lumineuses comme l'écran, et une seule couleur d'accent chaude, rouge-orangé comme les fauteuils et les rideaux. Les affiches doivent être les éléments les plus visibles. Le reste de l'interface reste discret pour ne pas leur faire concurrence.

### Disposition des éléments

**Sur ordinateur (à partir de 1024 px)**
```
┌────────────────────────────────────────────────────────────┐
│  🎬 CineBouti                       Favoris (3)   [☀/🌙]    │  ← barre de navigation fixe
├────────────────────────────────────────────────────────────┤
│                                                            │
│        Ton prochain film préféré t'attend.                 │  ← accueil
│        Explore, filtre et garde tes coups de cœur.         │
│        [ 🔍  Rechercher un film...                    ]    │  ← recherche
│                                                            │
├────────────────────────────────────────────────────────────┤
│ [Tous] [Action] [Comédie] [Drame] [SF] [Animation] [♥]     │  ← filtres
│ 12 films                                                   │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐              │
│ │affi- │ │      │ │      │ │      │ │      │              │  ← galerie
│ │che ♥ │ │    ♥ │ │    ♥ │ │    ♥ │ │    ♥ │              │    (4 à 5 colonnes)
│ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘              │
│  Titre     Titre    ...                                    │
│  2019·Drame ★ 8.2                                          │
├────────────────────────────────────────────────────────────┤
│  © 2026 CineBouti — projet étudiant                        │  ← pied de page
└────────────────────────────────────────────────────────────┘
```
- Contenu centré, largeur maximale de **1200 px**.
- **Barre de navigation** collée en haut : logo à gauche, lien Favoris (avec compteur) et bouton de thème à droite. Elle devient légèrement floutée et transparente quand on fait défiler la page.
- **Accueil** centré, avec un léger dégradé rouge en arrière-plan, comme la lumière d'un projecteur. La recherche y est placée parce que c'est la première action qu'on veut faire.
- **Filtres** : une ligne de boutons arrondis (« pastilles ») au-dessus de la galerie, avec le nombre de films trouvés juste en dessous.
- **Galerie** : grille CSS dont le nombre de colonnes s'adapte tout seul (cartes d'au moins 200 px).

**Sur tablette (600 à 1023 px)** : 3 colonnes, même structure.

**Sur téléphone (moins de 600 px)**
```
┌─────────────────────────┐
│ 🎬 CineBouti   ♥3  [🌙] │
├─────────────────────────┤
│ Ton prochain film       │
│ préféré t'attend.       │
│ [🔍 Rechercher...     ] │
│ [Tous][Action][Comé→    │  ← défilement horizontal des filtres
│ ┌─────────┐┌─────────┐  │
│ │       ♥ ││       ♥ │  │  ← 2 colonnes
│ └─────────┘└─────────┘  │
│  Titre      Titre       │
└─────────────────────────┘
```
- **2 colonnes** de cartes, pour voir plusieurs affiches à la fois.
- Les filtres restent sur une seule ligne et **défilent horizontalement** avec le doigt, au lieu de prendre plusieurs lignes.
- Le titre d'accueil est plus petit et le texte d'accompagnement peut être masqué pour faire remonter la galerie.
- Toutes les zones cliquables font **au moins 44 × 44 px**, pour être faciles à toucher.

### Composants

**Carte de film**
- Affiche au format cinéma **2:3**, coins arrondis de 12 px.
- Bouton cœur rond en haut à droite de l'affiche, sur un fond semi-transparent pour rester lisible quelle que soit l'image.
- Sous l'affiche : titre (2 lignes au maximum, puis « … »), puis une ligne discrète « année · genre » et la note avec une étoile dorée.
- Toute la carte reste lisible même si l'image ne charge pas : un fond gris avec le titre en remplacement.

**Barre de recherche**
- Champ large (jusqu'à 560 px), coins très arrondis, icône loupe à gauche, bouton « × » pour effacer quand du texte est saisi.
- Texte indicatif : « Rechercher un film… ».

**Filtres par genre**
- Pastilles arrondies. Inactives : contour discret et texte gris clair. Active : fond rouge d'accent et texte blanc.
- La pastille « ♥ Favoris » est placée à la fin, séparée des genres.

**Bouton de thème**
- Bouton rond avec une icône lune (thème sombre) ou soleil (thème clair). L'icône tourne doucement lors du changement.

**État vide**
- Une icône de bobine de film, le message « Aucun film trouvé », et un bouton « Réinitialiser les filtres ».

### Couleurs

| Rôle | Thème sombre (par défaut) | Thème clair |
|---|---|---|
| Fond de la page | `#0E0E12` presque noir, légèrement bleuté | `#F6F5F2` blanc cassé |
| Surface (cartes, barre) | `#18181F` | `#FFFFFF` |
| Surface au survol | `#22222B` | `#EDECE8` |
| Bordures | `#2C2C36` | `#DDDBD5` |
| Texte principal | `#F2F2F5` | `#16161C` |
| Texte secondaire | `#9A9AA8` | `#5C5C68` |
| Accent (boutons actifs, logo) | `#D13438` rouge cinéma | `#D13438` |
| Note (étoile) | `#F5B83D` doré | `#B7791F` |
| Favori actif (cœur) | `#FF5A72` | `#E0284A` |

Pourquoi ces choix :
- **Un fond qui n'est pas noir pur** : il fatigue moins les yeux et permet de distinguer les cartes du fond.
- **Une seule couleur d'accent** : l'œil comprend tout de suite ce qui est actif ou important.
- **Contraste suffisant** : le texte principal et secondaire respectent le niveau AA des règles d'accessibilité (WCAG).
- Toutes les couleurs seront écrites comme **variables CSS**. Changer de thème revient à changer ces variables, sans réécrire les styles.

### Typographie
- **Titres et logo** : *Bebas Neue* (ou *Oswald*), une police haute et étroite qui rappelle les affiches de cinéma. Elle est utilisée seulement pour le logo et le grand titre d'accueil.
- **Texte et interface** : *Inter* (ou *Poppins*), très lisible à petite taille sur écran.

| Élément | Ordinateur | Téléphone | Graisse |
|---|---|---|---|
| Titre d'accueil | 56 px | 34 px | Bebas Neue |
| Logo | 28 px | 24 px | Bebas Neue |
| Titre de section | 24 px | 20 px | Inter 600 |
| Titre de carte | 16 px | 15 px | Inter 600 |
| Texte courant, filtres | 15 px | 14 px | Inter 400–500 |
| Infos secondaires | 13 px | 12 px | Inter 400 |

- Interligne de **1,5** pour le texte, **1,1** pour les grands titres.
- La taille du titre d'accueil change de façon fluide entre téléphone et ordinateur.

### Espacements
On utilise une échelle basée sur **8 px** pour que tout reste régulier : **4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 px**.

| Zone | Ordinateur | Téléphone |
|---|---|---|
| Marges sur les côtés | 32 px | 16 px |
| Hauteur de la barre de navigation | 72 px | 60 px |
| Espace haut/bas de l'accueil | 80 px | 40 px |
| Espace entre les filtres | 8 px | 8 px |
| Espace entre les cartes | 24 px | 12 px |
| Espace intérieur sous l'affiche | 12 px | 10 px |
| Rayon des coins (cartes / pastilles) | 12 px / 999 px | 12 px / 999 px |

### Animations
Les animations sont **courtes (150 à 300 ms) et discrètes** : elles servent à confirmer une action, pas à décorer.

| Moment | Animation | Durée |
|---|---|---|
| Arrivée sur la page | Les cartes apparaissent l'une après l'autre en montant légèrement (fondu + 12 px). | 300 ms, décalage de 40 ms par carte |
| Survol d'une carte (ordinateur) | La carte monte de 4 px, l'ombre grandit, l'affiche zoome à 105 %. | 200 ms |
| Clic sur le cœur | Le cœur grossit puis revient à sa taille (effet « pop ») et se remplit de couleur. | 250 ms |
| Changement de filtre ou recherche | Les cartes s'effacent et réapparaissent en fondu. | 150 ms |
| Changement de thème | Les couleurs changent en douceur, l'icône tourne de 180°. | 300 ms |
| Défilement | La barre de navigation devient floutée et une ombre fine apparaît. | 200 ms |
| Focus clavier | Contour rouge d'accent bien visible autour de l'élément. | immédiat |

- Si la personne a activé l'option « réduire les animations » sur son appareil (`prefers-reduced-motion`), les mouvements sont désactivés et seuls les fondus restent.
- Sur téléphone, il n'y a pas de survol : l'effet est remplacé par un léger enfoncement de la carte au toucher.

### Règles UX à retenir
1. **Le contenu d'abord** : les affiches sont au centre, l'interface reste en retrait.
2. **Un retour visuel immédiat** : chaque clic (filtre, cœur, thème) change visiblement quelque chose.
3. **Toujours savoir où l'on est** : filtre actif mis en évidence et nombre de résultats affiché.
4. **Ne jamais laisser un écran vide** : un message et une action pour revenir en arrière.
5. **Accessible à tous** : contrastes suffisants, navigation au clavier, textes alternatifs sur les affiches, boutons avec un libellé (`aria-label`, par exemple « Ajouter Inception aux favoris »).
