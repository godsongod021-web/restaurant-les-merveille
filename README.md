# 🍽️ Site Web du Restaurant "Les Merveilles"

Bienvenue dans le code source du site web de votre restaurant **Les Merveilles** ! Ce projet a été pensé pour être moderne, élégant, fluide et accessible aux débutants.

---

## 📁 1. Organisation des Fichiers

Voici à quoi sert chaque fichier présent dans ce dossier :

1. **`index.html`** *(Le squelette)* :
   - Contient l'ensemble des textes, la structure de la page, les liens, les boutons, le menu et les formulaires.
2. **`style.css`** *(L'habillage & les couleurs)* :
   - Définit le design visuel : couleurs dorées et sombres haut de gamme, polices typographiques, espacements, animations et adaptation pour les smartphones et tablettes (Responsive).
3. **`script.js`** *(L'interactivité)* :
   - Gère les comportements dynamiques : ouverture/fermeture du menu sur smartphone, filtrage des plats par catégorie, agrandissement des photos de la galerie (lightbox), et génération automatique du message WhatsApp lors d'une réservation.
4. **`README.md`** :
   - Ce guide qui vous explique comment tout lancer et personnaliser facilement.

---

## 🚀 2. Comment lancer et visualiser votre site

### Méthode 1 : Simple et immédiate (Sans installer de logiciel)
1. Ouvrez l'explorateur de fichiers de votre ordinateur dans ce dossier (`restaurant les merveille`).
2. Faites un double-clic sur le fichier **`index.html`**.
3. Il s'ouvrira immédiatement dans votre navigateur par défaut (Google Chrome, Microsoft Edge, Firefox, Safari).

### Méthode 2 : Avec l'extension "Live Server" de VS Code (Recommandé pour modifier le code)
1. Ouvrez ce dossier dans votre éditeur de code (VS Code ou Antigravity).
2. Si vous utilisez VS Code, installez l'extension **Live Server**.
3. Faites un clic droit sur `index.html` puis sélectionnez **"Open with Live Server"**.
4. Dès que vous modifierez et enregistrerez un fichier, le navigateur s'actualisera tout seul !

---

## ✏️ 3. Comment personnaliser votre site

### A. Modifier le numéro WhatsApp
Dans le fichier **`script.js`**, repérez tout en haut les premières lignes :
```javascript
const RESTAURANT_CONFIG = {
    name: "Les Merveilles",
    whatsappPhone: "33612345678" // <-- Remplacez ce numéro par le vôtre
};
```
> **Règle importante** : Indiquez l'indicatif de votre pays sans le signe `+` ni espaces.  
> Par exemple, pour un numéro français `06 12 34 56 78`, écrivez `"33612345678"`.

---

### B. Modifier les Plats, Descriptions et Prix du Menu
Ouvrez **`index.html`** et cherchez la section `<section class="menu"` (vers la ligne 125). Chaque plat est écrit sous cette forme :

```html
<article class="menu-item" data-category="entrees">
    <div class="menu-item-img">
        <img src="LIEN_DE_VOTRE_PHOTO" alt="Nom du plat">
        <span class="item-tag">Entrée</span>
    </div>
    <div class="menu-item-info">
        <div class="item-header">
            <h3 class="item-title">Nom de Votre Plat</h3>
            <span class="item-price">14 €</span> <!-- Changez le prix ici -->
        </div>
        <p class="item-desc">Description gourmande des ingrédients de votre plat.</p>
    </div>
</article>
```
- Pour ajouter un nouveau plat : copiez-collez simplement ce bloc `<article>`.
- Choisissez la bonne catégorie dans `data-category=""` : `entrees`, `plats`, `desserts` ou `boissons`.

---

### C. Remplacer les photos par vos propres images
Actuellement, le site utilise de superbes photos culinaires libres de droits issues d'Unsplash. Pour utiliser les vraies photos de votre restaurant :
1. Créez un dossier nommé `images` dans votre dossier de projet.
2. Déposez-y vos photos (par exemple `salle.jpg`, `saumon.jpg`, `logo.png`).
3. Dans **`index.html`**, remplacez l'adresse de l'image par son chemin local :
   ```html
   <img src="images/saumon.jpg" alt="Pavé de saumon">
   ```

---

### D. Modifier les coordonnées, adresse et horaires
Ouvrez **`index.html`** et descendez jusqu'à la section `<section class="contact"` (vers la ligne 340) et `<footer class="footer"` :
- Remplacez l'adresse postale `12 Rue des Délices Gourmands, 75001 Paris`.
- Modifiez les numéros de téléphone et adresses emails affichés.
- Ajustez les horaires d'ouverture selon vos jours de service.

---

## 📱 4. Fonctionnalités incluses

- **100% Adapté aux mobiles (Responsive)** : Navigation tactile, menu tiroir avec bouton burger, grille s'adaptant à toutes les tailles d'écrans.
- **Bouton WhatsApp Flottant** : Toujours visible en bas à droite pour permettre aux clients d'engager la conversation en un clic.
- **Filtres de Menu Instantanés** : Permet aux visiteurs de trier par Entrées, Plats, Desserts ou Boissons sans recharger la page.
- **Galerie Lightbox** : Agrandissement en plein écran au clic sur chaque photo avec fond estompé.
- **Formulaire de Réservation Intelligent** : Bloque les dates passées, récapitule les données et propose d'envoyer la demande automatiquement mise en forme par WhatsApp au restaurateur.
