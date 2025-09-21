# 📝 Post-it Notes Manager

<div align="center">
  <img src="./src/assets/postit.png" alt="Post-it Logo" width="120" height="120">
</div>

> Une application web moderne de gestion de post-it développée avec Vue.js 3

![Vue.js](https://img.shields.io/badge/Vue.js-3.2.13-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-FFD859?style=for-the-badge&logo=pinia&logoColor=black)

## **À propos du projet**

Post-it Notes Manager est une application web interactive permettant la gestion complète de notes adhésives numériques. Développée dans le cadre du module **C-DEV-121 MVVM frameworks**, cette application démontre la maîtrise des concepts avancés de Vue.js et des architectures modernes.

###  **Fonctionnalités principales**

-  **Gestion CRUD complète** : Créer, lire, modifier et supprimer des post-its
-  **Interface colorée** : Post-its avec couleurs aléatoires générées automatiquement
-  **Recherche intelligente** : Filtrage en temps réel par titre et contenu
-  **Design responsive** : Optimisé pour mobile, tablette et desktop
-  **Double persistance** : API distante avec fallback localStorage
-  **Interface moderne** : Animations fluides et UX soignée
-  **Contenu tronqué** : Aperçu avec ellipsis, détails au clic

##  **Technologies utilisées**

### **Frontend**
- **Vue.js 3.2.13** - Framework JavaScript réactif
- **Vue Router 4.5.1** - Routage SPA officiel
- **Pinia 3.0.3** - State management moderne (successeur de Vuex)
- **Tailwind CSS 4.1.13** - Framework CSS utility-first

### **HTTP & API**
- **Axios 1.12.2** - Client HTTP pour les requêtes API
- **API REST** - Endpoints CRUD complets

### **Outils de développement**
- **ESLint** - Linting et qualité de code
- **Jest** - Framework de tests unitaires
- **Vue Test Utils** - Utilitaires de test pour Vue
- **Babel** - Transpilation JavaScript

## **Architecture du projet**

```
src/
├── components/           
│   ├── PostCard.vue     
│   ├── PostModal.vue    
│   ├── PostDetails.vue  
│   ├── HeaderBar.vue    
│   └── ...
├── views/               
│   ├── AllPostView.vue  
│   └── ...
├── stores/              # Gestion d'état Pinia
│   └── notes.js        # Store des post-its
├── services/            # Services externes
│   ├── api.js          # Service API REST
│   └── notification.js  # Service de notifications
├── router/              # Configuration des routes
│   └── index.js
└── __tests__/           # Tests unitaires
    ├── components/
    ├── services/
    └── integration/
```

##  **Installation et lancement**

### **Prérequis**
- Node.js >= 14.0.0
- npm >= 6.0.0

### **Installation**
```bash
# Cloner le repository
git clone https://github.com/marieorens/postit.git
cd postit

# Installer les dépendances
npm install
```

### **Développement**
```bash
# Démarrer le serveur de développement
npm run serve
# Accéder à http://localhost:8080
```

### **Production**
```bash
# Build de production
npm run build

# Lint du code
npm run lint

# Tests unitaires
npm test
```

## **Les Tests**

Le projet inclut une suite complète de tests unitaires :

```bash
npm test
```

**Les tests du projet couvrent les points suivants :**
-  Composants Vue (PostCard, PostModal, HeaderBar)
-  Store Pinia (actions, state, getters)
-  Services (API, notifications)
-  Tests d'intégration

##  **Concepts Vue.js démontrés**

### **Composants**
- **Single File Components** (.vue)
- **Props** et communication parent-enfant
- **Events** et communication enfant-parent
- **Slots** pour la réutilisabilité

### **Réactivité**
- **Composition API** (setup, ref, reactive)
- **Computed properties** pour les données dérivées
- **Watchers** pour les effets de bord
- **Lifecycle hooks** (onMounted, onUnmounted...)

### **State Management**
- **Pinia stores** pour l'état global
- **Actions** asynchrones pour l'API
- **State** réactif partagé
- **Getters** pour les données calculées

### **Routage**
- **Vue Router** pour la navigation SPA
- **Routes dynamiques** avec paramètres
- **Navigation guards** pour la sécurité
- **Lazy loading** des composants

## **Développeur**

**Orens TONON** - Étudiant Coding Academy

## **Licence**

Ce projet est développé dans un cadre pédagogique pour le module C-DEV-121.

---

> J'utilise Pinia au lieu de Vuex car il s'agit de la solution officiellement recommandée pour Vue 3, offrant une meilleure expérience développeur avec TypeScript et une API plus simple.
