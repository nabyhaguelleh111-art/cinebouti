/* ==========================================================================
   CineBouti — script.js
   Sommaire :
   1. Données : la liste des films
   2. Éléments HTML utilisés
   3. État de l'application
   4. Outils (normalisation du texte, localStorage)
   5. Favoris
   6. Thème clair / sombre
   7. Recherche et filtres
   8. Affichage des cartes
   9. Événements (clics, saisie, défilement)
   10. Démarrage
   ========================================================================== */


/* ==========================================================================
   1. Données : la liste des films
   - id : identifiant unique (sert à reconnaître un film dans les favoris)
   - genre : doit correspondre au texte d'un bouton de filtre
   - poster : chemin vers une image dans le dossier images/ (laisser "" si
     tu n'as pas d'image : une affiche de remplacement sera dessinée)
   ========================================================================== */
const movies = [
  { id: 1,  title: "Inception",                           year: 2010, genre: "Science-fiction", rating: 8.8, poster: "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg" },
  { id: 2,  title: "Interstellar",                        year: 2014, genre: "Science-fiction", rating: 8.7, poster: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg" },
  { id: 3,  title: "Matrix",                              year: 1999, genre: "Science-fiction", rating: 8.7, poster: "https://upload.wikimedia.org/wikipedia/en/d/db/The_Matrix.png" },
  { id: 4,  title: "Mad Max: Fury Road",                  year: 2015, genre: "Action",          rating: 8.1, poster: "https://upload.wikimedia.org/wikipedia/en/6/6e/Mad_Max_Fury_Road.jpg" },
  { id: 5,  title: "Gladiator",                           year: 2000, genre: "Action",          rating: 8.5, poster: "https://upload.wikimedia.org/wikipedia/en/f/fb/Gladiator_%282000_film_poster%29.png" },
  { id: 6,  title: "John Wick",                           year: 2014, genre: "Action",          rating: 7.4, poster: "https://upload.wikimedia.org/wikipedia/en/9/98/John_Wick_TeaserPoster.jpg" },
  { id: 7,  title: "Intouchables",                        year: 2011, genre: "Comédie",         rating: 8.5, poster: "https://upload.wikimedia.org/wikipedia/en/9/93/The_Intouchables.jpg" },
  { id: 8,  title: "Le Fabuleux Destin d'Amélie Poulain", year: 2001, genre: "Comédie",         rating: 8.3, poster: "https://upload.wikimedia.org/wikipedia/en/5/53/Amelie_poster.jpg" },
  { id: 9,  title: "The Grand Budapest Hotel",            year: 2014, genre: "Comédie",         rating: 8.1, poster: "https://upload.wikimedia.org/wikipedia/en/1/1c/The_Grand_Budapest_Hotel.png" },
  { id: 10, title: "Les Évadés",                          year: 1994, genre: "Drame",           rating: 9.3, poster: "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg" },
  { id: 11, title: "Parasite",                            year: 2019, genre: "Drame",           rating: 8.5, poster: "https://upload.wikimedia.org/wikipedia/en/5/53/Parasite_%282019_film%29.png" },
  { id: 12, title: "Whiplash",                            year: 2014, genre: "Drame",           rating: 8.5, poster: "https://upload.wikimedia.org/wikipedia/en/0/01/Whiplash_poster.jpg" },
  { id: 13, title: "Le Voyage de Chihiro",                year: 2001, genre: "Animation",       rating: 8.6, poster: "https://upload.wikimedia.org/wikipedia/en/d/db/Spirited_Away_Japanese_poster.png" },
  { id: 14, title: "Coco",                                year: 2017, genre: "Animation",       rating: 8.4, poster: "https://upload.wikimedia.org/wikipedia/en/9/98/Coco_%282017_film%29_poster.jpg" },
  { id: 15, title: "Là-haut",                             year: 2009, genre: "Animation",       rating: 8.3, poster: "https://upload.wikimedia.org/wikipedia/en/0/05/Up_%282009_film%29.jpg" }
];


/* ==========================================================================
   2. Éléments HTML utilisés (récupérés une seule fois, au démarrage)
   ========================================================================== */
const navbar = document.getElementById("navbar");
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const favoritesLink = document.getElementById("favorites-link");
const favoritesCount = document.getElementById("favorites-count");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchClear = document.getElementById("search-clear");
const filterButtons = document.querySelectorAll(".filter-btn");
const resultsCount = document.getElementById("results-count");
const movieGrid = document.getElementById("movie-grid");
const emptyState = document.getElementById("empty-state");
const emptyStateText = emptyState.querySelector(".empty-state__text");
const resetButton = document.getElementById("reset-filters");
const cardTemplate = document.getElementById("movie-card-template");


/* ==========================================================================
   3. État de l'application : ce que l'utilisatrice a choisi en ce moment
   ========================================================================== */
const FAVORITES_KEY = "cinebouti-favorites"; // nom de la "case" dans localStorage
const THEME_KEY = "cinebouti-theme";

let searchText = "";        // texte tapé dans la recherche
let activeGenre = "tous";   // valeur data-genre du filtre actif
let favoriteIds = [];       // liste des id des films favoris, ex. [1, 7]


/* ==========================================================================
   4. Outils
   ========================================================================== */

// Met un texte en minuscules et enlève les accents et les espaces autour.
// Exemple : normalizeText("  Comédie ") → "comedie"
function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")                 // sépare la lettre de son accent : "é" → "e" + "´"
    .replace(/[̀-ͯ]/g, "")  // supprime les accents séparés
    .trim();
}

// Lit une valeur dans localStorage sans faire planter la page.
// localStorage peut être bloqué (navigation privée, réglages du navigateur).
function readStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.warn("Impossible d'enregistrer dans localStorage :", error);
  }
}


/* ==========================================================================
   5. Favoris
   ========================================================================== */

// Charge les favoris enregistrés. localStorage ne stocke que du texte :
// on transforme le texte "[1,7]" en vrai tableau [1, 7] avec JSON.parse.
function loadFavorites() {
  const savedText = readStorage(FAVORITES_KEY);
  if (!savedText) {
    return [];
  }

  try {
    const savedIds = JSON.parse(savedText);
    // On garde seulement les id qui existent vraiment dans la liste des films
    if (Array.isArray(savedIds)) {
      return savedIds.filter((id) => movies.some((movie) => movie.id === id));
    }
  } catch (error) {
    // Texte abîmé ou modifié à la main : on repart d'une liste vide
  }
  return [];
}

// Enregistre les favoris : le tableau [1, 7] devient le texte "[1,7]"
function saveFavorites() {
  writeStorage(FAVORITES_KEY, JSON.stringify(favoriteIds));
}

function isFavorite(movieId) {
  return favoriteIds.includes(movieId);
}

// Ajoute le film s'il n'est pas favori, le retire s'il l'est déjà
function toggleFavorite(movieId) {
  if (isFavorite(movieId)) {
    favoriteIds = favoriteIds.filter((id) => id !== movieId);
  } else {
    favoriteIds.push(movieId);
  }
  saveFavorites();
  updateFavoritesCount();
}

function updateFavoritesCount() {
  favoritesCount.textContent = favoriteIds.length;
}

// Met à jour l'apparence et le texte lu par les lecteurs d'écran d'un bouton cœur
function updateFavoriteButton(button, movie) {
  const favorite = isFavorite(movie.id);
  button.setAttribute("aria-pressed", favorite ? "true" : "false");
  button.setAttribute(
    "aria-label",
    favorite ? `Retirer ${movie.title} des favoris` : `Ajouter ${movie.title} aux favoris`
  );
}


/* ==========================================================================
   6. Thème clair / sombre
   Le CSS change les couleurs selon l'attribut data-theme de <html>.
   ========================================================================== */
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);

  const isLight = theme === "light";
  themeIcon.textContent = isLight ? "☀️" : "🌙";
  themeToggle.setAttribute("aria-label", isLight ? "Activer le thème sombre" : "Activer le thème clair");
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  applyTheme(newTheme);
  writeStorage(THEME_KEY, newTheme);
}

function loadTheme() {
  const savedTheme = readStorage(THEME_KEY);
  // On n'accepte que les deux valeurs prévues, sinon thème sombre par défaut
  applyTheme(savedTheme === "light" ? "light" : "dark");
}


/* ==========================================================================
   7. Recherche et filtres
   ========================================================================== */

// Renvoie seulement les films qui respectent la recherche ET le filtre
function getFilteredMovies() {
  const search = normalizeText(searchText);

  return movies.filter((movie) => {
    const matchesSearch = normalizeText(movie.title).includes(search);

    let matchesGenre;
    if (activeGenre === "tous") {
      matchesGenre = true;
    } else if (activeGenre === "favoris") {
      matchesGenre = isFavorite(movie.id);
    } else {
      // "Science-fiction" → "science-fiction", comme data-genre du bouton
      matchesGenre = normalizeText(movie.genre) === activeGenre;
    }

    return matchesSearch && matchesGenre;
  });
}

// Change le filtre actif et met en évidence le bon bouton
function setActiveGenre(genre) {
  activeGenre = genre;

  filterButtons.forEach((button) => {
    const isActive = button.dataset.genre === genre;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });

  renderMovies();
}

function setSearchText(text) {
  searchText = text;
  searchClear.hidden = text === ""; // la croix n'apparaît que s'il y a du texte
  renderMovies();
}

function resetFilters() {
  searchInput.value = "";
  searchText = "";
  searchClear.hidden = true;
  setActiveGenre("tous"); // appelle aussi renderMovies()
}


/* ==========================================================================
   8. Affichage des cartes
   ========================================================================== */

// Fabrique une carte à partir du <template> du HTML
function createMovieCard(movie, position) {
  const card = cardTemplate.content.firstElementChild.cloneNode(true);

  // --i sert au CSS pour faire apparaître les cartes l'une après l'autre
  card.style.setProperty("--i", position);

  card.querySelector(".movie-card__title").textContent = movie.title;
  card.querySelector(".movie-card__info").textContent = `${movie.year} · ${movie.genre}`;
  card.querySelector(".movie-card__score").textContent = movie.rating.toFixed(1);

  const poster = card.querySelector(".movie-card__poster");
  const image = card.querySelector(".movie-card__img");
  if (movie.poster) {
    image.src = movie.poster;
    image.alt = `Affiche du film ${movie.title}`;
    // Si l'image ne se charge pas, on affiche l'affiche de remplacement
    image.addEventListener("error", () => showPosterFallback(poster, image, movie));
  } else {
    showPosterFallback(poster, image, movie);
  }

  const favoriteButton = card.querySelector(".favorite-btn");
  favoriteButton.dataset.id = movie.id;
  updateFavoriteButton(favoriteButton, movie);

  return card;
}

// Remplace l'image par un fond coloré avec le titre du film
function showPosterFallback(poster, image, movie) {
  image.remove();
  poster.classList.add("movie-card__poster--fallback");
  poster.style.setProperty("--poster-hue", (movie.id * 47) % 360); // une couleur différente par film

  const fallbackTitle = document.createElement("span");
  fallbackTitle.className = "movie-card__fallback-title";
  fallbackTitle.setAttribute("aria-hidden", "true"); // le titre est déjà lu dans <h3>
  fallbackTitle.textContent = movie.title;
  poster.prepend(fallbackTitle);
}

// Affiche les films filtrés, le nombre de résultats ou le message vide
function renderMovies() {
  const visibleMovies = getFilteredMovies();

  movieGrid.innerHTML = ""; // vide la galerie avant de la remplir
  visibleMovies.forEach((movie, position) => {
    movieGrid.appendChild(createMovieCard(movie, position));
  });

  const total = visibleMovies.length;
  resultsCount.textContent = total <= 1 ? `${total} film` : `${total} films`;

  emptyState.hidden = total > 0;
  if (total === 0) {
    const noFavoritesYet = activeGenre === "favoris" && favoriteIds.length === 0 && searchText === "";
    emptyStateText.textContent = noFavoritesYet
      ? "Tu n'as pas encore de favoris. Clique sur un cœur pour en ajouter."
      : "Aucun film trouvé.";
  }
}


/* ==========================================================================
   9. Événements
   ========================================================================== */

// Recherche : "input" se déclenche à chaque lettre tapée ou effacée
searchInput.addEventListener("input", () => {
  setSearchText(searchInput.value);
});

// Empêche la touche Entrée de recharger la page (comportement normal d'un formulaire)
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
});

searchClear.addEventListener("click", () => {
  searchInput.value = "";
  setSearchText("");
  searchInput.focus();
});

// Filtres : un écouteur par bouton
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveGenre(button.dataset.genre);
  });
});

// Un seul écouteur pour tous les cœurs de la galerie (délégation d'événement) :
// les cartes sont recréées à chaque recherche, cet écouteur, lui, reste en place.
movieGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".favorite-btn");
  if (!button) {
    return; // le clic n'était pas sur un cœur
  }

  const movieId = Number(button.dataset.id); // dataset renvoie du texte : "7" → 7
  const movie = movies.find((item) => item.id === movieId);
  toggleFavorite(movieId);

  if (activeGenre === "favoris") {
    renderMovies(); // le film retiré doit disparaître de la liste des favoris
    // Le bouton cliqué n'existe plus : on place le focus sur le filtre « Favoris »
    // pour qu'une personne qui navigue au clavier ne soit pas renvoyée en haut de la page
    document.querySelector('[data-genre="favoris"]').focus();
    return;
  }

  updateFavoriteButton(button, movie);
  // Petite animation "pop" : on retire la classe à la fin pour pouvoir la rejouer
  button.classList.add("is-popping");
  button.addEventListener("animationend", () => button.classList.remove("is-popping"), { once: true });
});

// Bouton "Favoris" de la barre de navigation : active le filtre et descend au catalogue
favoritesLink.addEventListener("click", () => {
  setActiveGenre("favoris");
  document.getElementById("catalog-title").scrollIntoView({ behavior: "smooth" });
});

resetButton.addEventListener("click", resetFilters);

themeToggle.addEventListener("click", toggleTheme);

// Barre de navigation floutée dès qu'on a un peu défilé
function updateNavbar() {
  navbar.classList.toggle("is-scrolled", window.scrollY > 10);
}
window.addEventListener("scroll", updateNavbar, { passive: true });


/* ==========================================================================
   10. Démarrage
   ========================================================================== */
loadTheme();
favoriteIds = loadFavorites();
updateFavoritesCount();
renderMovies();
updateNavbar();
