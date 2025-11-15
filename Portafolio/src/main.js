/* ───────────────────────────────────────────── 
    ABOUT SECTION — Text ES / EN Alternating 
────────────────────────────────────────────── */ 

(function setupAboutTextTransition() { 
    const es = document.getElementById("text-es"); 
    const en = document.getElementById("text-en"); 
    
    if (!es || !en) return; 
    
    let showingSpanish = true; 
    function toggleAboutText() { 
        if (showingSpanish) {
            es.classList.remove("active"); 
            en.classList.add("active"); 
        } else { 
            en.classList.remove("active"); 
            es.classList.add("active"); 
        } 
        
        showingSpanish = !showingSpanish; 
    } 
    // Ya arrancamos con ES activo en el HTML, así que solo alternamos a partir de los 10s 
    setInterval(toggleAboutText, 10000);
 })();

/* ─────────────────────────────────────────────
   LANDING — Professions Titles Animation
────────────────────────────────────────────── */
(function setupProfessionTitles() {
    const titles = document.querySelectorAll(".landing-professions_tittles span");
    const wrapper = document.querySelector(".landing-professions_tittles");

    if (!titles.length || !wrapper) return;

    let index = 0;

    function cycleLineTitles() {
        // Reset
        titles.forEach(t => t.classList.remove("active"));
        wrapper.classList.remove("animate-line");

        // Activar actual
        titles[index].classList.add("active");

        // Subrayado animado
        setTimeout(() => {
            wrapper.classList.add("animate-line");
        }, 100);

        // Siguiente índice
        index = (index + 1) % titles.length;
    }

    // Init
    cycleLineTitles();
    setInterval(cycleLineTitles, 3500);
})();



/* ─────────────────────────────────────────────
   THEME TOGGLE — Dark / Light Mode
────────────────────────────────────────────── */
(function setupThemeToggle() {
    const root = document.documentElement;
    const toggleBtn = document.getElementById("theme-toggle");
    const icon = document.getElementById("theme-icon");

    if (!toggleBtn || !icon) return;

    // Cargar preferencia guardada
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        root.classList.add("dark");
        icon.textContent = "☀️";
    } else {
        icon.textContent = "🌙";
    }

    // Listener del botón
    toggleBtn.addEventListener("click", () => {
        root.classList.toggle("dark");

        const isDark = root.classList.contains("dark");
        icon.textContent = isDark ? "☀️" : "🌙";

        localStorage.setItem("theme", isDark ? "dark" : "light");
    });
})();



/* ─────────────────────────────────────────────
   HEADER ↔ SIDEBAR — Cambio automático por scroll
────────────────────────────────────────────── */
(function setupHeaderSidebarSwitch() {
    const header = document.querySelector(".topnav");
    const sidebar = document.querySelector(".sidebar");
    const aboutSection = document.getElementById("about");

    if (!header || !sidebar || !aboutSection) return;

    function handleScroll() {
        const scrollY = window.scrollY || window.pageYOffset;
        const headerHeight = header.offsetHeight;
        const triggerPoint = aboutSection.offsetTop;

        if (scrollY + headerHeight >= triggerPoint) {
            // Llegamos a "Sobre mí" → ocultar header, mostrar sidebar
            header.classList.add("is-hidden");
            sidebar.classList.add("is-visible");
        } else {
            // Volvemos hacia arriba → mostrar header, ocultar sidebar
            header.classList.remove("is-hidden");
            sidebar.classList.remove("is-visible");
        }
    }

    // Ejecutar una vez al cargar
    handleScroll();
    window.addEventListener("scroll", handleScroll);
})();

/* ─────────────────────────────────────────────
   CUSTOM CURSOR — reactivo según entorno
────────────────────────────────────────────── */
(function setupCustomCursor() {
    const cursor = document.querySelector(".custom-cursor");
    const dot = document.querySelector(".cursor-dot");

    if (!cursor || !dot) return;

    let mouseX = 0, mouseY = 0;

    // Movimiento suave
    document.addEventListener("mousemove", e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.top = `${mouseY}px`;
        cursor.style.left = `${mouseX}px`;
    });

    // Invertir colores al pasar sobre elementos interactivos
    const interactiveTags = ["a", "button", "input", "textarea", "label"];

    document.addEventListener("mouseover", e => {
        const tag = e.target.tagName.toLowerCase();

        // Si es interactivo → invertir color
        if (interactiveTags.includes(tag) || e.target.closest("a") || e.target.closest("button")) {
            cursor.classList.add("hover");
        } else {
            cursor.classList.remove("hover");
        }

        // Detección de color complementario según elemento
        if (e.target.hasAttribute("data-cursor")) {
            const type = e.target.getAttribute("data-cursor");

            if (type === "orange") {
                cursor.style.borderColor = getComputedStyle(document.documentElement)
                    .getPropertyValue("--accent-green");
            }

            if (type === "green") {
                cursor.style.borderColor = getComputedStyle(document.documentElement)
                    .getPropertyValue("--accent-orange");
            }
        }
    });

    // Restablecer cuando el mouse sale
    document.addEventListener("mouseout", () => {
        cursor.classList.remove("hover");
        cursor.style.boxShadow = "none";
    });

})();

/* ─────────────────────────────────────────────
   CURSOR CLICK EFFECT — Ripple + Rebound + Highlight
────────────────────────────────────────────── */
(function setupCursorClickEffect() {
    const cursor = document.querySelector(".custom-cursor");
    if (!cursor) return;

    document.addEventListener("mousedown", () => {
        // Rebote + highlight
        cursor.classList.add("clicked");

        // Ripple
        cursor.classList.add("ripple");

        // Remover clases después de animación
        setTimeout(() => {
            cursor.classList.remove("clicked");
        }, 300);

        setTimeout(() => {
            cursor.classList.remove("ripple");
        }, 450);
    });
})();

/* ───────── PROYECTOS: ANIMACIÓN STAGGER ───────── */

const projectCards = document.querySelectorAll(".split-card");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add("reveal");
            }, index * 180); // stagger progresivo
        }
    });
}, { threshold: 0.25 });

projectCards.forEach(card => observer.observe(card));

/* Navegación con flechas izquierda/derecha */
const projectsTrack = document.querySelector(".projects-track");

window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
        projectsTrack.scrollBy({
            left: 400,
            behavior: "smooth"
        });
    }
    if (e.key === "ArrowLeft") {
        projectsTrack.scrollBy({
            left: -400,
            behavior: "smooth"
        });
    }
});

/* ───────────── PROYECTOS: MODAL DINÁMICO + SCROLL ───────────── */

const projectGallery = document.querySelector(".projects-track");
const modal = document.getElementById("project-modal");
const modalClose = document.getElementById("modal-close");
const modalTitle = modal.querySelector(".modal-title");
const modalDesc = modal.querySelector(".modal-description");
const modalImg = modal.querySelector(".modal-image");
const modalBadges = modal.querySelector(".modal-badges");
const modalLink = modal.querySelector(".modal-link");
const customCursor = document.querySelector(".custom-cursor"); 

// Scroll horizontal con rueda del mouse
projectGallery.addEventListener("wheel", e => {
  e.preventDefault();
  projectGallery.scrollBy({
    left: e.deltaY < 0 ? -160 : 160,
    behavior: "smooth"
  });
});

// Abrir modal dinámico
document.querySelectorAll(".project-card").forEach(card => {
  const link = card.querySelector(".project-link");
  link.addEventListener("click", e => {
    e.preventDefault();
    
    // Leer datos del card
    const title = card.dataset.title;
    const desc = card.dataset.description;
    const image = card.dataset.image;
    const badges = card.dataset.badges.split(",");
    const link1 = card.dataset.link1;
    const link2 = card.dataset.link2;
    const linkUrl = card.dataset.link;

    // Rellenar modal
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalImg.src = image;
    // Mostrar ambos links dentro del modal si existen
    if (link1 && link2) {
    modalLink.textContent = "Abrir proyectos →";
    modalLink.onclick = (e) => {
        e.preventDefault();
        window.open(link1, "_blank");
        window.open(link2, "_blank");
    };
    } else if (link1 || link2 || linkUrl) {
        const singleLink = link1 || link2 || linkUrl;
        modalLink.textContent = "Ver proyecto →";
        modalLink.href = singleLink;
        modalLink.target = "_blank";
        modalLink.onclick = null;
    }

    // --- CASO 3: sin link definido ---
    else {
        modalLink.textContent = "Sin enlace disponible";
        modalLink.removeAttribute("href");
        modalLink.style.pointerEvents = "none";
        modalLink.style.opacity = "0.5";
    }

    // Crear badges
    modalBadges.innerHTML = "";
    badges.forEach(b => {
      const span = document.createElement("span");
      span.classList.add("badge");
      span.textContent = b.trim();
      modalBadges.appendChild(span);
    });

    // Mostrar modal
    modal.classList.add("active");
    // === ANIMACIÓN DEL CURSOR ===
    customCursor.classList.add("cursor-modal-open");
    setTimeout(() => {
      customCursor.classList.remove("cursor-modal-open");
      customCursor.classList.add("cursor-modal-glow");
    }, 250);
  });
});

// Cerrar modal

const closeModal = () => {
  modal.classList.remove("active");

  // Animación del cursor al cerrar
  customCursor.classList.remove("cursor-modal-glow");
  customCursor.classList.add("cursor-modal-rebound");
  setTimeout(() => {
    customCursor.classList.remove("cursor-modal-rebound");
  }, 400);
};

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});
window.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

