// Système de gestion des thèmes
const themes = {
    'amoled': {
        file: 'css/AMOLED/AMOLED.css',
        class: 'theme-amoled'
    },
    'gold': {
        file: 'css/AMOLED/gold.css',
        class: 'theme-gold'
    },
    // Ajoutez d'autres thèmes ici
};

function changeTheme(themePath) {
    // Supprimer les anciens thèmes
    document.body.classList.forEach(className => {
        if (className.startsWith('theme-')) {
            document.body.classList.remove(className);
        }
    });

    // Trouver le thème correspondant
    const themeName = themePath.split('/').pop().replace('.css', '');
    const theme = themes[themeName.toLowerCase()];

    if (theme) {
        // Appliquer la nouvelle classe de thème
        document.body.classList.add(theme.class);
        
        // Charger le fichier CSS si nécessaire
        loadThemeCSS(theme.file);
    }
}

function loadThemeCSS(filepath) {
    // Vérifier si le CSS est déjà chargé
    const existingLink = document.querySelector(`link[href="${filepath}"]`);
    if (!existingLink) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = filepath;
        document.head.appendChild(link);
    }
}

// Initialiser le thème par défaut
document.addEventListener('DOMContentLoaded', () => {
    // Charger le thème sauvegardé ou le thème par défaut
    const savedTheme = localStorage.getItem('selectedTheme') || 'css/AMOLED/AMOLED.css';
    changeTheme(savedTheme);
});
