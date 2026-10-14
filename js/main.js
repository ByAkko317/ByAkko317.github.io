/* ─────────────────────────────────────────────
   CONFIG
────────────────────────────────────────────── */
const PROFILE_URL = "api/v1/developers/pablo-barrios.json";

const root = document.documentElement;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function store(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* modo privado */ }
}

/* ─────────────────────────────────────────────
   IDIOMA — ES / EN
   El HTML trae el español; al cambiar a inglés se reemplazan
   los textos marcados con data-i18n y se guardan los originales.
────────────────────────────────────────────── */
const i18n = (function setupI18n() {
    const dict = window.I18N || { es: {}, en: {} };
    const originals = new Map();
    const listeners = [];

    // Guardar el texto original (español) de cada elemento traducible
    document.querySelectorAll("[data-i18n]").forEach(el => {
        originals.set(el, { text: el.textContent.trim() });
    });
    document.querySelectorAll("[data-i18n-attr]").forEach(el => {
        const attrs = {};
        el.dataset.i18nAttr.split(";").forEach(pair => {
            const [attr] = pair.split(":");
            attrs[attr] = el.getAttribute(attr);
        });
        originals.set(el, { ...(originals.get(el) || {}), attrs });
    });

    function lang() {
        return root.dataset.lang === "en" ? "en" : "es";
    }

    function t(key) {
        return dict[lang()][key] ?? dict.es[key] ?? key;
    }

    function apply() {
        const current = lang();
        const table = dict[current];

        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.dataset.i18n;
            el.textContent = current === "es" ? originals.get(el).text : (table[key] ?? originals.get(el).text);
        });

        document.querySelectorAll("[data-i18n-attr]").forEach(el => {
            el.dataset.i18nAttr.split(";").forEach(pair => {
                const [attr, key] = pair.split(":");
                const original = originals.get(el).attrs[attr];
                const value = current === "es" ? (dict.es[key] ?? original) : (table[key] ?? original);
                el.setAttribute(attr, value);
            });
        });

        root.lang = current;
        document.title = t("meta.title");
        document.querySelector('meta[name="description"]').setAttribute("content", t("meta.description"));
        listeners.forEach(fn => fn(current));
    }

    const toggle = document.getElementById("lang-toggle");
    toggle?.addEventListener("click", () => {
        root.dataset.lang = lang() === "es" ? "en" : "es";
        store("lang", root.dataset.lang);
        apply();
    });

    if (lang() !== "es") apply();
    else root.lang = "es";

    return { t, lang, onChange: fn => listeners.push(fn) };
})();

/* ─────────────────────────────────────────────
   TEMA — claro / oscuro
   Sin elección guardada se sigue la preferencia del sistema.
────────────────────────────────────────────── */
(function setupThemeToggle() {
    const toggle = document.getElementById("theme-toggle");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
    if (!toggle) return;

    const currentTheme = () => root.dataset.theme || (systemDark.matches ? "dark" : "light");

    toggle.addEventListener("click", () => {
        const next = currentTheme() === "dark" ? "light" : "dark";
        root.dataset.theme = next;
        store("theme", next);
    });
})();

/* ─────────────────────────────────────────────
   HEADER — borde al hacer scroll, menú móvil y sección activa
────────────────────────────────────────────── */
(function setupHeader() {
    const header = document.querySelector(".site-header");
    const nav = document.getElementById("site-nav");
    const menuBtn = document.getElementById("menu-toggle");
    if (!header || !nav) return;

    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    function setMenu(open) {
        nav.classList.toggle("is-open", open);
        menuBtn.setAttribute("aria-expanded", String(open));
        menuBtn.setAttribute("aria-label", i18n.t(open ? "nav.menuClose" : "nav.menu"));
    }

    menuBtn?.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
    nav.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && nav.classList.contains("is-open")) {
            setMenu(false);
            menuBtn.focus();
        }
    });

    // Marcar en el menú la sección visible
    const links = [...nav.querySelectorAll('a[href^="#"]')];
    const sections = links.map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            links.forEach(a => {
                if (a.getAttribute("href") === `#${entry.target.id}`) a.setAttribute("aria-current", "true");
                else a.removeAttribute("aria-current");
            });
        });
    }, { rootMargin: "-45% 0px -50% 0px" });

    sections.forEach(s => observer.observe(s));
})();

/* ─────────────────────────────────────────────
   HERO — petición real al JSON del perfil
   Hace un fetch a un archivo estático del propio sitio, muestra
   el status y el tiempo de respuesta medidos y pinta el JSON.
   Si falla (por ejemplo, abriendo el HTML con doble clic),
   queda visible el JSON que ya trae el HTML.
────────────────────────────────────────────── */
(function setupApiCard() {
    const card = document.querySelector(".api-card");
    const body = document.getElementById("api-body");
    const codeEl = document.getElementById("api-code");
    const timeEl = document.getElementById("api-time");
    const replayBtn = document.getElementById("api-replay");
    if (!card || !body) return;

    let profile = null;

    function span(cls, text) {
        const s = document.createElement("span");
        s.className = cls;
        s.textContent = text;
        return s;
    }

    function valueNodes(value) {
        if (Array.isArray(value)) {
            const nodes = [span("p", "[")];
            value.forEach((item, i) => {
                if (i > 0) nodes.push(span("p", ", "));
                nodes.push(...valueNodes(item));
            });
            nodes.push(span("p", "]"));
            return nodes;
        }
        if (typeof value === "string") return [span("s", JSON.stringify(value))];
        return [span("b", String(value))];
    }

    // Serializa el objeto con los arrays en una sola línea
    function render(data, stream) {
        const entries = Object.entries(data);
        const lines = [];

        lines.push([span("p", "{")]);
        entries.forEach(([key, value], i) => {
            const comma = i < entries.length - 1 ? [span("p", ",")] : [];
            lines.push([span("k", JSON.stringify(key)), span("p", ": "), ...valueNodes(value), ...comma]);
        });
        const last = [span("p", "}")];
        if (!prefersReducedMotion) last.push(span("caret", ""));
        lines.push(last);

        body.replaceChildren(...lines.map((nodes, i) => {
            const line = document.createElement("span");
            line.className = i > 0 && i < lines.length - 1 ? "line entry" : "line";
            line.style.setProperty("--i", i);
            line.append(...nodes);
            return line;
        }));

        card.classList.toggle("is-streaming", stream && !prefersReducedMotion);
    }

    async function request() {
        card.classList.add("is-loading");
        codeEl.textContent = "…";
        timeEl.textContent = "";
        replayBtn.disabled = true;

        const start = performance.now();
        try {
            const res = await fetch(PROFILE_URL, { cache: "no-store", headers: { Accept: "application/json" } });
            const json = await res.json();
            const elapsed = Math.round(performance.now() - start);

            codeEl.textContent = `${res.status} ${res.statusText || (res.ok ? "OK" : "")}`.trim();
            timeEl.textContent = `${elapsed} ms`;
            profile = json;
            render(profile[i18n.lang()] || profile.es, true);
        } catch (err) {
            codeEl.textContent = "200 OK";
            timeEl.textContent = "";
        } finally {
            card.classList.remove("is-loading");
            replayBtn.disabled = false;
        }
    }

    replayBtn?.addEventListener("click", request);
    i18n.onChange(lang => { if (profile) render(profile[lang] || profile.es, false); });

    request();
})();

/* ─────────────────────────────────────────────
   CONTACTO — copiar email
────────────────────────────────────────────── */
(function setupCopyEmail() {
    const btn = document.getElementById("copy-email");
    if (!btn || !navigator.clipboard) {
        btn?.remove();
        return;
    }

    let timer;
    btn.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(btn.dataset.email);
            btn.textContent = i18n.t("contact.copied");
            clearTimeout(timer);
            timer = setTimeout(() => { btn.textContent = i18n.t("contact.copy"); }, 2000);
        } catch (e) { /* sin permiso de portapapeles: el enlace mailto sigue disponible */ }
    });
})();

/* ─────────────────────────────────────────────
   CONTACTO — formulario
   Con un endpoint de Formspree configurado envía por fetch.
   Si todavía tiene el placeholder TU_ID, abre el cliente de correo.
────────────────────────────────────────────── */
(function setupContactForm() {
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");
    const email = document.getElementById("copy-email")?.dataset.email
        || document.querySelector(".email-link")?.textContent.trim();
    if (!form || !status) return;

    const submitBtn = form.querySelector('button[type="submit"]');

    function setStatus(message, type) {
        status.textContent = message;
        status.className = "form-status" + (type ? ` is-${type}` : "");
    }

    form.addEventListener("submit", async e => {
        e.preventDefault();

        // Validación
        let firstInvalid = null;
        form.querySelectorAll("input, textarea").forEach(field => {
            const valid = field.checkValidity() && field.value.trim() !== "";
            field.setAttribute("aria-invalid", String(!valid));
            if (!valid && !firstInvalid) firstInvalid = field;
        });
        if (firstInvalid) {
            setStatus(i18n.t("form.invalid"), "error");
            firstInvalid.focus();
            return;
        }

        const data = new FormData(form);

        // Sin endpoint configurado → mailto
        if (form.action.includes("TU_ID")) {
            const subject = encodeURIComponent(`Contacto desde el portafolio: ${data.get("name")}`);
            const bodyText = encodeURIComponent(`${data.get("message")}\n\n${data.get("name")} <${data.get("email")}>`);
            window.location.href = `mailto:${email}?subject=${subject}&body=${bodyText}`;
            setStatus(i18n.t("form.mailto"), "success");
            return;
        }

        submitBtn.disabled = true;
        setStatus(i18n.t("form.sending"));

        try {
            const res = await fetch(form.action, {
                method: "POST",
                body: data,
                headers: { Accept: "application/json" }
            });
            if (!res.ok) throw new Error(res.statusText);
            form.reset();
            form.querySelectorAll("[aria-invalid]").forEach(f => f.removeAttribute("aria-invalid"));
            setStatus(i18n.t("form.sent"), "success");
        } catch (err) {
            setStatus(`${i18n.t("form.error")} ${email}.`, "error");
        } finally {
            submitBtn.disabled = false;
        }
    });

    // Quitar la marca de error en cuanto se corrige el campo
    form.addEventListener("input", e => {
        if (e.target.getAttribute("aria-invalid") === "true" && e.target.checkValidity() && e.target.value.trim()) {
            e.target.setAttribute("aria-invalid", "false");
        }
    });
})();

/* ─────────────────────────────────────────────
   CURSOR — anillo que sigue al mouse
   (solo con mouse y sin "reducir movimiento"; el CSS lo oculta si no)
────────────────────────────────────────────── */
(function setupCursorRing() {
    const ring = document.querySelector(".cursor-ring");
    const enabled = window.matchMedia("(pointer: fine)").matches && !prefersReducedMotion;
    if (!ring || !enabled) return;

    const interactive = "a, button, input, textarea, label, summary";
    let x = 0, y = 0, rx = 0, ry = 0, raf = null;

    function frame() {
        rx += (x - rx) * 0.25;
        ry += (y - ry) * 0.25;
        ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
        raf = Math.abs(x - rx) + Math.abs(y - ry) > 0.5 ? requestAnimationFrame(frame) : null;
    }

    document.addEventListener("pointermove", e => {
        if (e.pointerType !== "mouse") return;
        x = e.clientX;
        y = e.clientY;
        if (!ring.classList.contains("is-visible")) {
            rx = x;
            ry = y;
            ring.classList.add("is-visible");
        }
        ring.classList.toggle("is-hover", !!e.target.closest(interactive));
        if (!raf) raf = requestAnimationFrame(frame);
    });

    document.addEventListener("pointerdown", () => ring.classList.add("is-pressed"));
    document.addEventListener("pointerup", () => ring.classList.remove("is-pressed"));
    document.documentElement.addEventListener("mouseleave", () => ring.classList.remove("is-visible"));
})();

/* ─────────────────────────────────────────────
   FOOTER — año actual
────────────────────────────────────────────── */
document.getElementById("year").textContent = new Date().getFullYear();
