/**
 * ==============================================================================
 * RESTAURANT "LES MERVEILLES" - SCRIPT JAVASCRIPT PRINCIPAL
 * ==============================================================================
 * Ce fichier gère toute l'interactivité du site web :
 * 1. Configuration (Numéro WhatsApp et infos du restaurant)
 * 2. Menu mobile responsive (Ouverture / Fermeture)
 * 3. En-tête dynamique au défilement (Changement de style de la barre de navigation)
 * 4. Liens actifs selon la section visible (ScrollSpy)
 * 5. Filtre interactif des plats du menu par catégorie
 * 6. Galerie photos avec prévisualisation agrandie (Lightbox)
 * 7. Gestion du formulaire de réservation et envoi direct vers WhatsApp
 * ==============================================================================
 */

// ------------------------------------------------------------------------------
// 1. CONFIGURATION FACILE DU RESTAURANT
// Changez ici votre numéro WhatsApp et le nom de votre établissement.
// ------------------------------------------------------------------------------
const RESTAURANT_CONFIG = {
    name: "Les Merveilles",
    // Numéro au format international sans le signe + ni espaces (Exemple : 33612345678 pour la France)
    whatsappPhone: "33612345678"
};

// Exécuter le code une fois que tout le document HTML est chargé
document.addEventListener("DOMContentLoaded", () => {

    // --------------------------------------------------------------------------
    // 2. GESTION DU MENU MOBILE (SMARTPHONES & TABLETTES)
    // --------------------------------------------------------------------------
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link, .nav-cta");

    if (menuToggle && navMenu) {
        // Clic sur l'icône burger pour ouvrir/fermer le menu
        menuToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("open");
            
            // Changer l'icône entre les trois barres et la croix
            const icon = menuToggle.querySelector("i");
            if (icon) {
                if (isOpen) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                } else {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        });

        // Fermer automatiquement le menu mobile lorsqu'on clique sur un lien
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                if (navMenu.classList.contains("open")) {
                    navMenu.classList.remove("open");
                    const icon = menuToggle.querySelector("i");
                    if (icon) {
                        icon.classList.remove("fa-xmark");
                        icon.classList.add("fa-bars");
                    }
                }
            });
        });
    }

    // --------------------------------------------------------------------------
    // 3. EFFET DE LA NAVBAR AU SCROLL & SCROLLSPY
    // --------------------------------------------------------------------------
    const navbar = document.getElementById("navbar");
    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", () => {
        // Ajouter un fond opaque et flouté à la navbar après 50px de défilement
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        // Mettre en surbrillance le lien correspondant à la section active
        let currentSectionId = "";
        const scrollPosition = window.pageYOffset + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });

    // --------------------------------------------------------------------------
    // 4. FILTRE DES PLATS DU MENU PAR CATÉGORIE
    // --------------------------------------------------------------------------
    const categoryButtons = document.querySelectorAll(".category-btn");
    const menuItems = document.querySelectorAll(".menu-item");

    categoryButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Retirer l'état actif de tous les boutons et l'ajouter sur le bouton cliqué
            categoryButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const selectedCategory = button.getAttribute("data-category");

            // Afficher ou masquer les plats selon la catégorie sélectionnée
            menuItems.forEach(item => {
                const itemCategory = item.getAttribute("data-category");

                if (selectedCategory === "tous" || selectedCategory === itemCategory) {
                    item.classList.remove("hide");
                    // Petite animation d'apparition fluide
                    item.style.opacity = "0";
                    item.style.transform = "translateY(10px)";
                    setTimeout(() => {
                        item.style.transition = "all 0.3s ease";
                        item.style.opacity = "1";
                        item.style.transform = "translateY(0)";
                    }, 50);
                } else {
                    item.classList.add("hide");
                }
            });
        });
    });

    // --------------------------------------------------------------------------
    // 5. GALERIE PHOTOS AVEC VUE AGRANDIE (LIGHTBOX)
    // --------------------------------------------------------------------------
    const galleryItems = document.querySelectorAll(".gallery-item");
    const lightboxModal = document.getElementById("lightbox-modal");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxClose = document.getElementById("lightbox-close");
    const lightboxBackdrop = document.querySelector(".lightbox-backdrop");

    // Ouvrir la photo agrandie au clic
    galleryItems.forEach(item => {
        item.addEventListener("click", () => {
            const fullImageUrl = item.getAttribute("data-full");
            if (lightboxImg && fullImageUrl) {
                lightboxImg.src = fullImageUrl;
                lightboxModal.classList.add("active");
                document.body.style.overflow = "hidden"; // Empêcher le défilement de la page
            }
        });
    });

    // Fermer la lightbox
    const closeLightbox = () => {
        if (lightboxModal) {
            lightboxModal.classList.remove("active");
            document.body.style.overflow = "auto";
        }
    };

    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener("click", closeLightbox);

    // Fermer aussi avec la touche Échap (Escape) du clavier
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && lightboxModal && lightboxModal.classList.contains("active")) {
            closeLightbox();
        }
    });

    // --------------------------------------------------------------------------
    // 6. GESTION DU FORMULAIRE DE RÉSERVATION
    // --------------------------------------------------------------------------
    const reservationForm = document.getElementById("reservation-form");
    const dateInput = document.getElementById("date");
    const reservationModal = document.getElementById("reservation-modal");
    const modalSummary = document.getElementById("modal-summary");
    const modalWhatsappAction = document.getElementById("modal-whatsapp-action");
    const modalCloseBtn = document.getElementById("modal-close-btn");
    const modalBackdrop = document.querySelector(".reservation-modal .modal-backdrop");

    // Définir la date minimale de réservation à aujourd'hui (empêcher de choisir hier)
    if (dateInput) {
        const today = new Date().toISOString().split("T")[0];
        dateInput.min = today;
    }

    if (reservationForm) {
        reservationForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Empêche le rechargement de la page

            // Récupérer les valeurs saisies par le client
            const name = document.getElementById("name").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const date = document.getElementById("date").value;
            const time = document.getElementById("time").value;
            const guests = document.getElementById("guests").value;
            const email = document.getElementById("email").value.trim();
            const notes = document.getElementById("notes").value.trim();

            // Formater la date en français (JJ/MM/AAAA)
            let formattedDate = date;
            if (date) {
                const parts = date.split("-");
                if (parts.length === 3) {
                    formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
                }
            }

            // Générer le texte récapitulatif dans la fenêtre modale
            if (modalSummary) {
                modalSummary.innerHTML = `
                    <strong>Nom :</strong> ${name}<br>
                    <strong>Téléphone :</strong> ${phone}<br>
                    <strong>Date & Heure :</strong> le ${formattedDate} à ${time}<br>
                    <strong>Nombre de convives :</strong> ${guests === "plus" ? "Groupe (7+ personnes)" : guests + " personne(s)"}<br>
                    ${email ? `<strong>E-mail :</strong> ${email}<br>` : ""}
                    ${notes ? `<strong>Remarque :</strong> ${notes}` : ""}
                `;
            }

            // Préparer un message WhatsApp pré-rempli avec les détails de la réservation
            let whatsappMessage = `*DEMANDE DE RÉSERVATION - ${RESTAURANT_CONFIG.name}*\n\n`;
            whatsappMessage += `👤 *Nom :* ${name}\n`;
            whatsappMessage += `📞 *Téléphone :* ${phone}\n`;
            whatsappMessage += `📅 *Date :* ${formattedDate}\n`;
            whatsappMessage += `⏰ *Heure :* ${time}\n`;
            whatsappMessage += `👥 *Couverts :* ${guests === "plus" ? "7+ personnes (Groupe)" : guests + " personne(s)"}\n`;
            if (email) whatsappMessage += `✉️ *Email :* ${email}\n`;
            if (notes) whatsappMessage += `💬 *Remarques :* ${notes}\n`;

            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappUrl = `https://wa.me/${RESTAURANT_CONFIG.whatsappPhone}?text=${encodedMessage}`;

            // Assigner le lien au bouton WhatsApp de la modale
            if (modalWhatsappAction) {
                modalWhatsappAction.href = whatsappUrl;
            }

            // Afficher la fenêtre modale de succès
            if (reservationModal) {
                reservationModal.classList.add("active");
                document.body.style.overflow = "hidden";
            }

            // Réinitialiser le formulaire
            reservationForm.reset();
            if (dateInput) dateInput.min = today;
        });
    }

    // Fermeture de la modal de confirmation
    const closeReservationModal = () => {
        if (reservationModal) {
            reservationModal.classList.remove("active");
            document.body.style.overflow = "auto";
        }
    };

    if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeReservationModal);
    if (modalBackdrop) modalBackdrop.addEventListener("click", closeReservationModal);

    // --------------------------------------------------------------------------
    // 7. LIEN UNIFIÉ DU BOUTON FLOTTANT WHATSAPP
    // --------------------------------------------------------------------------
    const floatingWhatsappBtn = document.getElementById("whatsapp-btn");
    if (floatingWhatsappBtn) {
        const welcomeMessage = encodeURIComponent(`Bonjour Restaurant ${RESTAURANT_CONFIG.name}, je souhaite des informations ou réserver une table.`);
        floatingWhatsappBtn.href = `https://wa.me/${RESTAURANT_CONFIG.whatsappPhone}?text=${welcomeMessage}`;
    }
});
