// ===================================
// SYSTÈME DE GESTION DES THÈMES
// ===================================

// Configuration des thèmes disponibles
const themes = {
    // Thèmes AMOLED
    'AMOLED': {
        file: 'css/AMOLED/AMOLED.css',
        class: 'theme-amoled',
        category: 'amoled'
    },
    'gold': {
        file: 'css/AMOLED/gold.css',
        class: 'theme-gold',
        category: 'amoled'
    },
    'galaxy': {
        file: 'css/AMOLED/galaxy.css',
        class: 'theme-galaxy',
        category: 'amoled'
    },
    'crimson': {
        file: 'css/AMOLED/crimson.css',
        class: 'theme-crimson',
        category: 'amoled'
    },
    
    // Thèmes OPAQUE
    'clair': {
        file: 'css/OPAQUE/clair.css',
        class: 'theme-clair',
        category: 'opaque'
    },
    'sombre': {
        file: 'css/OPAQUE/sombre.css',
        class: 'theme-sombre',
        category: 'opaque'
    },
    'capybara': {
        file: 'css/OPAQUE/capybara.css',
        class: 'theme-capybara',
        category: 'opaque'
    },
    'azure': {
        file: 'css/OPAQUE/azure.css',
        class: 'theme-azure',
        category: 'opaque'
    },
    
    // Thèmes TRANSLUCENT
    'glass': {
        file: 'css/TRANSLUCENT/glass.css',
        class: 'theme-glass',
        category: 'translucent'
    },
    'blur': {
        file: 'css/TRANSLUCENT/blur.css',
        class: 'theme-blur',
        category: 'translucent'
    },
    'Acrylic': {
        file: 'CSS/TRANSLUCENT/Acrylic.css',
        class: 'theme-acrylic',
        category: 'translucent'
    },
    'transparent': {
        file: 'CSS/TRANSLUCENT/transparent.css',
        class: 'theme-transparent',
        category: 'translucent'
    }
};

// Variable pour stocker le thème actuel
let currentTheme = null;
let themeStyleElement = null;

// ===================================
// FONCTIONS PRINCIPALES
// ===================================

/**
 * Change le thème de l'application
 * @param {string} themePath - Chemin du fichier CSS du thème
 */
function changeTheme(themePath) {
    try {
        // Extraire le nom du thème du chemin
        const themeName = extractThemeName(themePath);
        const theme = themes[themeName];

        if (!theme) {
            console.warn(`Thème "${themeName}" non trouvé`);
            showNotification(`Thème "${themeName}" non disponible`);
            return;
        }

        // Retirer toutes les anciennes classes de thème
        removeAllThemeClasses();

        // Appliquer la nouvelle classe de thème
        document.body.classList.add(theme.class);

        // Charger le fichier CSS du thème
        loadThemeCSS(theme.file);

        // Sauvegarder le thème sélectionné en mémoire
        currentTheme = themeName;
        
        // Mettre à jour l'affichage actif
        updateActiveThemeButton(themeName);

        // Notification
        showNotification(`Thème "${themeName}" appliqué`);

        console.log(`Thème changé: ${themeName}`);
    } catch (error) {
        console.error('Erreur lors du changement de thème:', error);
        showNotification('Erreur lors du changement de thème');
    }
}

/**
 * Extrait le nom du thème depuis le chemin du fichier
 * @param {string} themePath - Chemin complet du fichier CSS
 * @returns {string} - Nom du thème
 */
function extractThemeName(themePath) {
    // Extraire le nom du fichier sans l'extension
    const fileName = themePath.split('/').pop().replace('.css', '');
    
    // Vérifier si le nom existe dans la configuration
    if (themes[fileName]) {
        return fileName;
    }
    
    // Chercher par comparaison insensible à la casse
    const lowerFileName = fileName.toLowerCase();
    for (const [key, value] of Object.entries(themes)) {
        if (key.toLowerCase() === lowerFileName) {
            return key;
        }
    }
    
    return fileName;
}

/**
 * Retire toutes les classes de thème du body
 */
function removeAllThemeClasses() {
    const classList = Array.from(document.body.classList);
    classList.forEach(className => {
        if (className.startsWith('theme-')) {
            document.body.classList.remove(className);
        }
    });
}

/**
 * Charge le fichier CSS du thème
 * @param {string} filepath - Chemin du fichier CSS
 */
function loadThemeCSS(filepath) {
    // Supprimer l'ancien élément de style de thème s'il existe
    if (themeStyleElement) {
        themeStyleElement.remove();
    }

    // Vérifier si le CSS est déjà chargé
    const existingLink = document.querySelector(`link[href="${filepath}"]`);
    
    if (!existingLink) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = filepath;
        link.setAttribute('data-theme-style', 'true');
        
        // Ajouter un gestionnaire d'erreur
        link.onerror = () => {
            console.error(`Impossible de charger le thème: ${filepath}`);
            showNotification(`Erreur de chargement du thème`);
        };
        
        link.onload = () => {
            console.log(`Thème chargé: ${filepath}`);
        };
        
        document.head.appendChild(link);
        themeStyleElement = link;
    } else {
        themeStyleElement = existingLink;
    }
}

/**
 * Met à jour le bouton actif dans le sélecteur de thème
 * @param {string} themeName - Nom du thème actif
 */
function updateActiveThemeButton(themeName) {
    // Retirer la classe active de tous les boutons de thème
    document.querySelectorAll('.theme').forEach(btn => {
        btn.classList.remove('active');
    });

    // Ajouter la classe active au bouton correspondant
    const activeButton = Array.from(document.querySelectorAll('.theme')).find(btn => {
        const onclick = btn.getAttribute('onclick');
        return onclick && onclick.includes(themeName);
    });

    if (activeButton) {
        activeButton.classList.add('active');
    }
}

/**
 * Obtient le thème actuellement actif
 * @returns {string|null} - Nom du thème actif
 */
function getCurrentTheme() {
    return currentTheme;
}

/**
 * Obtient la liste de tous les thèmes disponibles
 * @returns {Object} - Objet contenant tous les thèmes
 */
function getAllThemes() {
    return themes;
}

/**
 * Obtient les thèmes par catégorie
 * @param {string} category - Catégorie de thèmes
 * @returns {Array} - Tableau des thèmes de la catégorie
 */
function getThemesByCategory(category) {
    return Object.entries(themes)
        .filter(([_, theme]) => theme.category === category)
        .map(([name, theme]) => ({ name, ...theme }));
}

// ===================================
// SYSTÈME DE NOTIFICATIONS
// ===================================

function showNotification(message) {
    // Vérifier si la fonction existe déjà dans script.js
    if (typeof window.showNotification === 'function') {
        window.showNotification(message);
        return;
    }

    // Créer notre propre notification
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(17, 17, 17, 0.95);
        backdrop-filter: blur(20px);
        color: #FF4500;
        padding: 15px 25px;
        border-radius: 15px;
        border: 1px solid rgba(255, 69, 0, 0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===================================
// INITIALISATION
// ===================================

/**
 * Initialise le système de thèmes au chargement de la page
 */
function initializeThemeSystem() {
    console.log('Système de thèmes initialisé');
    console.log(`${Object.keys(themes).length} thèmes disponibles`);

    // Charger le thème par défaut (AMOLED)
    const defaultTheme = 'css/AMOLED/AMOLED.css';
    changeTheme(defaultTheme);

    // Ajouter les événements pour les boutons de thème
    setupThemeButtons();
}

/**
 * Configure les événements pour tous les boutons de thème
 */
function setupThemeButtons() {
    document.querySelectorAll('.theme').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const onclick = this.getAttribute('onclick');
            if (onclick) {
                // Extraire le chemin du thème de l'attribut onclick
                const match = onclick.match(/changeTheme\(['"](.+?)['"]\)/);
                if (match) {
                    changeTheme(match[1]);
                }
            }
        });
    });
}

// ===================================
// GESTION DES SOUS-MENUS
// ===================================

function toggleSousMenu(menuId) {
    const menu = document.getElementById(menuId);
    const allMenus = document.querySelectorAll('.sous-menu');
    
    // Fermer tous les autres menus
    allMenus.forEach(m => {
        if (m.id !== menuId) {
            m.classList.remove('active');
        }
    });
    
    // Toggle le menu actuel
    if (menu) {
        menu.classList.toggle('active');
    }
}

// Fermer les menus si on clique en dehors
document.addEventListener('click', function(event) {
    if (!event.target.closest('.nav-buttons') && !event.target.closest('.sous-menu')) {
        document.querySelectorAll('.sous-menu').forEach(menu => {
            menu.classList.remove('active');
        });
    }
});

// ===================================
// CHARGEMENT AUTOMATIQUE
// ===================================

// Initialiser au chargement du DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeThemeSystem);
} else {
    // DOM déjà chargé
    initializeThemeSystem();
}

// Exposer les fonctions globalement pour l'utilisation dans le HTML
window.changeTheme = changeTheme;
window.getCurrentTheme = getCurrentTheme;
window.getAllThemes = getAllThemes;
window.getThemesByCategory = getThemesByCategory;
window.toggleSousMenu = toggleSousMenu;

// ===================================
// GESTION DES ERREURS
// ===================================

window.addEventListener('error', function(e) {
    if (e.filename && e.filename.includes('.css')) {
        console.error('Erreur de chargement CSS:', e.filename);
    }
});