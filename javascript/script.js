// Variables globales
let blurEnabled = true;
let isDarkMode = false;

// Menu toggle
const toggleButton = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');

// Initialisation après le chargement du DOM
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
});

// Gestion du menu mobile
function initializeEventListeners() {
    // Menu toggle
    toggleButton.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Fermer le menu en cliquant à l'extérieur
    document.addEventListener('click', (e) => {
        if (!e.target.closest('header')) {
            nav.classList.remove('active');
        }
    });

    // Animations au scroll
    window.addEventListener('scroll', handleScroll);

    // Effet parallaxe léger
    window.addEventListener('mousemove', handleMouseMove);
}

// Gestion des applications
function openApp(appName) {
    const apps = {
        'portfolio': '../pagePortfolio/portfolio.html',
        'resources': '../pageRessources/ressources.html',
        'contact': '#contact',
        'blog': '#blog',
        'gallery': '#gallery',
        'tools': '#tools'
    };

    if (apps[appName] && apps[appName].startsWith('../')) {
        window.location.href = apps[appName];
    } else {
        showNotification(`Application ${appName} sera bientôt disponible !`);
    }
}

// Système de notifications
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(20px);
        color: white;
        padding: 15px 20px;
        border-radius: 15px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 10px 25px rgba(31, 38, 135, 0.2);
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Contrôles de thème
function toggleBlur() {
    blurEnabled = !blurEnabled;
    const elements = document.querySelectorAll('.glass-card, header, .apps-section, footer, nav a, .control-btn, .app-item');
    elements.forEach(el => {
        if (blurEnabled) {
            el.style.backdropFilter = 'blur(20px)';
        } else {
            el.style.backdropFilter = 'blur(0px)';
        }
    });
    showNotification(`Blur ${blurEnabled ? 'activé' : 'désactivé'}`);
}

function changeTheme(theme) {
    // Retirer la classe active de tous les boutons
    document.querySelectorAll('.control-btn').forEach(btn => btn.classList.remove('active'));
    
    // Ajouter la classe active au bouton cliqué
    event.target.classList.add('active');

    const elements = document.querySelectorAll('.glass-card, header, .apps-section, footer');
    
    switch(theme) {
        case 'acrylic':
            elements.forEach(el => {
                el.style.background = 'rgba(255, 255, 255, 0.08)';
                el.style.backdropFilter = 'blur(40px) saturate(200%)';
            });
            break;
        case 'glass':
            elements.forEach(el => {
                el.style.background = 'rgba(255, 255, 255, 0.15)';
                el.style.backdropFilter = 'blur(20px)';
            });
            break;
        case 'transparent':
            elements.forEach(el => {
                el.style.background = 'rgba(255, 255, 255, 0.05)';
                el.style.backdropFilter = 'blur(10px)';
            });
            break;
    }
    showNotification(`Thème ${theme} appliqué`);
}

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
    showNotification(`Mode ${isDarkMode ? 'sombre' : 'clair'} activé`);
}

// Animations au scroll
function handleScroll() {
    const header = document.getElementById('main-header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.1)';
        header.style.backdropFilter = 'blur(30px)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.15)';
        header.style.backdropFilter = 'blur(20px)';
    }
}

// Parallaxe légère
function handleMouseMove(e) {
    const cards = document.querySelectorAll('.glass-card');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    cards.forEach((card, index) => {
        const speed = (index + 1) * 0.5;
        card.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
}

// Fonction utilitaire pour créer des animations fluides
function animateElement(element, properties, duration = 300) {
    return new Promise((resolve) => {
        element.style.transition = `all ${duration}ms ease`;
        
        Object.keys(properties).forEach(property => {
            element.style[property] = properties[property];
        });
        
        setTimeout(() => {
            element.style.transition = '';
            resolve();
        }, duration);
    });
}

// Gestion des erreurs JavaScript
window.addEventListener('error', function(e) {
    console.error('Erreur JavaScript:', e.message);
    showNotification('Une erreur est survenue');
});

// Performance: Debounce pour les événements fréquents
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimiser les événements de scroll et resize
const debouncedScroll = debounce(handleScroll, 16); // ~60fps
const debouncedMouseMove = debounce(handleMouseMove, 16); // ~60fps

// Remplacer les event listeners pour une meilleure performance
window.removeEventListener('scroll', handleScroll);
window.removeEventListener('mousemove', handleMouseMove);
window.addEventListener('scroll', debouncedScroll);
window.addEventListener('mousemove', debouncedMouseMove);