# 🎬 CineBouti — Explorateur de films

CineBouti est une mini-application web qui permet de parcourir une sélection de films présentés sous forme de cartes, de rechercher un film par son titre, de filtrer par genre et de garder ses films préférés dans une liste de favoris. L'interface est sombre par défaut, avec un thème clair au choix.

Il s'agit d'un **projet étudiant** réalisé pour apprendre le développement web avec **HTML, CSS et JavaScript, sans framework ni bibliothèque**.

![Capture d'écran de CineBouti](images/capture-ecran.png)
> 📷 *À compléter : ajoute une capture d'écran dans le dossier `images/` sous le nom `capture-ecran.png`.*

| | |
|---|---|
| **Dépôt GitHub** | *À compléter : lien du dépôt* |
| **Application en ligne** | *À compléter : URL GitHub Pages (voir la section [Déploiement](#-déploiement-sur-github-pages))* |
| **Autrice** | *À compléter : ton nom* |

---

## 📌 Problème traité et objectifs

**Le problème :** pour choisir un film, on passe souvent par des sites chargés de publicités, et on oublie facilement les films qui nous intéressaient.

**La solution proposée :** un seul endroit, simple et agréable, pour parcourir des films, trouver rapidement celui qu'on cherche et garder une liste de favoris.

**Objectifs pédagogiques :**
- structurer une page avec du HTML sémantique ;
- créer une mise en page responsive avec Flexbox, CSS Grid et les variables CSS ;
- manipuler le DOM et gérer des événements en JavaScript ;
- enregistrer des données dans le navigateur avec `localStorage`.

---

## ✨ Fonctionnalités

- **Galerie de films** : 15 films affichés sous forme de cartes (titre, année, genre, note).
- **Recherche par titre** : les résultats se mettent à jour à chaque lettre tapée. La recherche ignore les majuscules et les accents (`evades` trouve *Les Évadés*). Un bouton × efface la recherche.
- **Filtres par genre** : Tous, Action, Comédie, Drame, Science-fiction, Animation. Le filtre et la recherche fonctionnent ensemble.
- **Favoris** : un bouton cœur sur chaque carte ajoute ou retire un film. Un filtre « Favoris » et un bouton dans la barre de navigation (avec compteur) affichent uniquement les favoris.
- **Sauvegarde** : les favoris et le thème choisi sont enregistrés dans `localStorage` et retrouvés après rechargement de la page.
- **Thème clair / sombre** : un bouton bascule entre les deux thèmes.
- **Message « Aucun film trouvé »** quand rien ne correspond, avec un bouton pour réinitialiser les filtres. Un message différent s'affiche quand la liste des favoris est vide.
- **Responsive** : 2 colonnes sur téléphone, 3 sur tablette, 4 à 5 sur ordinateur.
- **Accessibilité** : navigation au clavier, focus visible, libellés pour les lecteurs d'écran, prise en compte du réglage « réduire les animations ».

> ℹ️ **À savoir :** les films n'ont pas encore de vraies affiches. Chaque carte affiche une **affiche de remplacement** (un dégradé de couleur avec le titre). Pour ajouter une image, voir [Ajouter des affiches](#-ajouter-des-affiches).

---

## 🛠️ Technologies utilisées

| Technologie | Utilisation |
|---|---|
| **HTML5** | Structure sémantique de la page (`header`, `nav`, `main`, `section`, `article`, `template`…) |
| **CSS3** | Variables CSS (thèmes), Flexbox, CSS Grid, media queries, transitions et animations |
| **JavaScript (ES6+)** | Affichage des cartes, recherche, filtres, favoris, thème |
| **localStorage** | Sauvegarde des favoris et du thème dans le navigateur |
| **Google Fonts** | Polices *Bebas Neue* (titres) et *Inter* (texte) |

Aucun framework, aucune bibliothèque externe, aucune installation nécessaire.

---

## 📁 Structure des fichiers

```
cinebouti/
├── index.html          → structure de la page
├── css/
│   └── style.css       → styles, thèmes clair/sombre, responsive, animations
├── js/
│   └── script.js       → liste des films et toute la logique de l'application
├── images/             → dossier prévu pour les affiches et la capture d'écran (vide pour l'instant)
├── SPECIFICATION.md    → spécification du projet et choix de conception
└── README.md           → ce fichier
```

---

## ▶️ Exécuter le projet localement

**Méthode 1 — la plus simple**
1. Télécharge ou clone le dépôt :
   ```bash
   git clone <lien-du-dépôt>
   ```
2. Ouvre le dossier `cinebouti`.
3. Double-clique sur `index.html` : la page s'ouvre dans ton navigateur.

**Méthode 2 — avec un petit serveur local (recommandée)**
Dans Visual Studio Code, installe l'extension **Live Server**, fais un clic droit sur `index.html` puis choisis **« Open with Live Server »**. La page se recharge toute seule à chaque modification.

> Une connexion Internet est nécessaire uniquement pour charger les polices Google Fonts. Sans connexion, l'application fonctionne avec les polices du système.

---

## ✅ Tester les fonctionnalités

Ouvre la page, puis la console du navigateur (touche **F12**, onglet *Console*) pour vérifier qu'aucune erreur rouge n'apparaît.

| # | Fonctionnalité | Action | Résultat attendu |
|---|---|---|---|
| 1 | Affichage | Ouvrir la page | 15 cartes et le texte « 15 films » |
| 2 | Recherche | Taper `mat` puis `MAT` | Seul *Matrix* s'affiche dans les deux cas |
| 3 | Recherche sans accent | Taper `evades` | *Les Évadés* s'affiche |
| 4 | Effacer | Cliquer sur × | Les 15 films reviennent |
| 5 | Aucun résultat | Taper `zzzz` | Message « Aucun film trouvé » et « 0 film » |
| 6 | Réinitialiser | Cliquer sur « Réinitialiser les filtres » | Champ vide, filtre « Tous », 15 films |
| 7 | Filtre | Cliquer sur « Drame » | 3 films, bouton « Drame » en rouge |
| 8 | Filtre + recherche | « Science-fiction » puis taper `in` | *Inception* et *Interstellar* |
| 9 | Ajouter un favori | Cliquer sur un cœur | Le cœur se remplit, le compteur passe à 1 |
| 10 | Sauvegarde des favoris | Recharger la page (F5) | Le cœur est toujours rempli |
| 11 | Liste des favoris | Cliquer sur « Favoris » (barre du haut) | Seuls les films favoris s'affichent |
| 12 | Retirer un favori | Dans les favoris, cliquer sur un cœur | Le film disparaît de la liste |
| 13 | Favoris vides | Retirer tous les favoris | Message « Tu n'as pas encore de favoris… » |
| 14 | Thème | Cliquer sur 🌙 | Thème clair et icône ☀️ |
| 15 | Sauvegarde du thème | Recharger la page | Le thème clair est conservé |
| 16 | Téléphone | F12 → mode appareil mobile (Ctrl + Maj + M), largeur 360 px | 2 colonnes, pas de défilement horizontal, les filtres défilent avec le doigt |
| 17 | Clavier | Utiliser seulement Tab et Entrée | Tous les boutons sont atteignables, avec un contour rouge visible |

**Voir ce qui est enregistré :** F12 → onglet *Application* (Chrome) ou *Stockage* (Firefox) → *Local Storage*. Tu y trouveras :
- `cinebouti-favorites` : la liste des id des films favoris, par exemple `[1,7]` ;
- `cinebouti-theme` : `dark` ou `light`.

---

## 🌐 Déploiement sur GitHub Pages

GitHub Pages publie gratuitement un site à partir d'un dépôt GitHub.

1. Envoie ton code sur GitHub (branche `main`) :
   ```bash
   git add .
   git commit -m "Version 1 de CineBouti"
   git push origin main
   ```
2. Sur la page du dépôt, va dans **Settings** → **Pages**.
3. Dans **Build and deployment** → **Source**, choisis **Deploy from a branch**.
4. Sélectionne la branche **`main`** et le dossier **`/ (root)`**, puis clique sur **Save**.
5. Attends une à deux minutes, puis recharge la page *Settings → Pages* : l'adresse du site s'affiche en haut.

**Quelle sera l'adresse ?**
- Si `index.html` est à la racine du dépôt : `https://<ton-nom-utilisateur>.github.io/<nom-du-dépôt>/`
- Si le projet est dans un sous-dossier `cinebouti/` (c'est le cas actuellement) : `https://<ton-nom-utilisateur>.github.io/<nom-du-dépôt>/cinebouti/`

> 💡 Les chemins des fichiers (`css/style.css`, `js/script.js`) sont relatifs, ils fonctionnent donc aussi sur GitHub Pages. Attention aux majuscules : sur GitHub Pages, `Images/` et `images/` sont deux dossiers différents.

Pense ensuite à reporter l'URL obtenue en haut de ce README.

---

## 🖼️ Ajouter des affiches

1. Place l'image dans le dossier `images/`, par exemple `images/inception.jpg`.
2. Dans `js/script.js`, renseigne le champ `poster` du film :
   ```js
   { id: 1, title: "Inception", year: 2010, genre: "Science-fiction", rating: 8.8, poster: "images/inception.jpg" },
   ```
Si l'image est introuvable, l'affiche de remplacement s'affiche automatiquement.

> ⚠️ Les affiches de films sont protégées par le droit d'auteur. Pour un projet publié en ligne, utilise des images libres de droits ou tes propres visuels.

---

## 🚀 Améliorations futures possibles

Ces fonctionnalités **ne sont pas encore développées** :

- [ ] Ajouter de vraies affiches pour chaque film.
- [ ] Récupérer les films depuis une API (par exemple TMDB) au lieu d'un tableau écrit à la main.
- [ ] Afficher une fenêtre de détails (résumé, réalisateur, durée) au clic sur une carte.
- [ ] Trier les films par note, par année ou par ordre alphabétique.
- [ ] Combiner plusieurs genres en même temps.
- [ ] Suivre automatiquement le thème du système (`prefers-color-scheme`) lors de la première visite.
- [ ] Ajouter des tests automatisés.

---

## 📝 Informations à compléter

- **Licence :** *non définie pour l'instant*. Si tu veux en ajouter une, la licence MIT est souvent choisie pour les projets étudiants.
- **Cadre du projet :** *à compléter (cours, établissement, année)*.
