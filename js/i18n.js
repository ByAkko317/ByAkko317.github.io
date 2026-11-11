/* ─────────────────────────────────────────────
   TRADUCCIONES
   El español vive en el HTML (es el texto por defecto).
   Acá están el inglés y los mensajes que genera el JS.
   Para traducir un elemento nuevo: ponele data-i18n="clave"
   y agregá la clave en "en".
────────────────────────────────────────────── */
window.I18N = {
    es: {
        "meta.title": "Pablo Barrios | Desarrollador Full Stack",
        "meta.description": "Pablo Barrios, desarrollador full stack junior en Mendoza, Argentina. APIs REST con Python y FastAPI, frontends con React y TypeScript, automatizaciones con n8n. Disponible para trabajo remoto.",
        "lang.switch": "Switch to English",
        "nav.menu": "Abrir menú",
        "nav.menuClose": "Cerrar menú",
        "contact.copied": "Copiado",
        "form.sending": "Enviando…",
        "form.sent": "Mensaje enviado. Te respondo por email.",
        "form.error": "No se pudo enviar el mensaje. Escríbeme directamente a",
        "form.invalid": "Completa los campos marcados para enviar el mensaje.",
        "form.mailto": "Se abrió tu cliente de correo con el mensaje listo para enviar."
    },

    en: {
        "meta.title": "Pablo Barrios | Full-Stack Developer",
        "meta.description": "Pablo Barrios, junior full-stack developer based in Mendoza, Argentina. REST APIs with Python and FastAPI, React and TypeScript frontends, n8n automations. Available for remote work.",

        "skip": "Skip to content",
        "nav.label": "Main",
        "nav.about": "About",
        "nav.projects": "Projects",
        "nav.experience": "Experience",
        "nav.contact": "Contact",
        "nav.menu": "Open menu",
        "nav.menuClose": "Close menu",
        "lang.switch": "Cambiar a español",
        "theme.toggle": "Toggle theme",

        "hero.role": "Junior Full-Stack Developer",
        "hero.pitch": "I build web applications end to end: REST APIs with Python and FastAPI, interfaces with React and TypeScript, and automations with n8n.",
        "hero.location": "Mendoza, Argentina. Available for remote work.",
        "hero.ctaProjects": "See projects",
        "hero.ctaCv": "Download CV",
        "social.label": "Social links",
        "api.label": "Profile as JSON",
        "api.replay": "Send request again",

        "about.title": "About me",
        "about.p1": "I'm a junior full-stack developer and I've completed the coursework of the Programming degree (Tecnicatura Universitaria en Programación) at UTN Mendoza. I build complete web applications: the data model, the API and the interface.",
        "about.p2": "Since February 2026 I've been working in a remote development team that delivers solutions for real clients. My focus is the backend: REST APIs with Python and FastAPI and data modeling in PostgreSQL, along with React frontends.",
        "about.p3": "Before programming I spent five years in customer service. That's where my precision, sense of responsibility and ability to work under pressure come from.",
        "skills.data": "Databases",
        "skills.tools": "Tools",
        "skills.methods": "Methodologies",
        "skills.methodsList": "Scrum, remote teamwork, version control",
        "skills.languages": "Languages",
        "skills.languagesList": "Spanish (native), English (intermediate, technical reading and writing)",

        "projects.title": "Projects",
        "projects.inProgress": "In progress",
        "projects.tech": "Technologies",
        "projects.endpoints": "Some of the API endpoints",
        "projects.code": "View code",
        "projects.backend": "Backend",
        "projects.frontend": "Frontend",
        "projects.academic": "Academic projects",
        "projects.more": "More projects on GitHub",

        "f1.title": "Turnos: white-label booking platform",
        "f1.desc": "Multi-tenant appointment system for clinics, hair salons or studios. Each business sets up its own brand, hours, services and staff on the same installation. Includes step-by-step booking, deposits through Mercado Pago, and WhatsApp and email reminders with n8n.",
        "f1.h1": "Swappable data layer (Airtable, Firebase or mock data) behind a single access point: changing providers doesn't touch the UI.",
        "f1.h2": "Role-based permissions (patient, professional, admin) defined in one file shared by the UI and the server.",
        "f1.h3": "Sessions with an HMAC-signed cookie, scrypt password hashing and signed events sent to n8n.",
        "f1.h4": "Test environment with simulated Mercado Pago and n8n to run the whole flow without real accounts.",

        "f2.title": "Hair salon appointments",
        "f2.desc": "Web system to book and manage appointments. Clients pick a service and a free slot and get a confirmation and reminder by email; the admin manages the full schedule with business metrics.",
        "f2.h1": "FastAPI backend with SQLAlchemy 2, Alembic migrations and JWT authentication with two roles.",
        "f2.h2": "Scheduling rules validated on the server: no overlaps, within business hours and based on each service's duration.",
        "f2.h3": "n8n automations: confirmation, 24-hour reminder and cancellation notice.",
        "f2.h4": "Full environment with Docker Compose and continuous integration with GitHub Actions.",

        "p1.title": "E-commerce REST API",
        "p1.desc": "Users, categories, products, cart, orders and reviews, with role-based permissions and statistics built with MongoDB aggregations.",
        "p2.desc": "Team-built ordering system with a Java and Spring Boot backend, JWT authentication and an admin panel on MySQL.",
        "p3.title": "Weather app",
        "p3.desc": "Flask app that queries the OpenWeather API and stores search history and user preferences.",

        "exp.title": "Experience and education",
        "exp.e1.date": "Feb 2026 – present",
        "exp.e1.title": "Full-Stack Developer",
        "exp.e1.place": "Remote development team",
        "exp.e1.p1": "Backend development with Python and FastAPI (REST APIs and PostgreSQL data modeling) and React frontends as each project requires.",
        "exp.e1.p2": "Work in teams of 4 to 10 people, mentored by a developer with professional remote experience, using agile methodologies and Git.",
        "exp.e1.p3": "Delivered the appointment system for a hair salon and currently working on a second system for a psychology practice.",
        "exp.edu.title": "Programming degree (Tecnicatura Universitaria en Programación)",
        "exp.edu.place": "Universidad Tecnológica Nacional, Mendoza. Coursework completed.",
        "exp.e2.date": "2020 – present",
        "exp.e2.title": "Customer service and operations",
        "exp.e2.place": "Retail, hospitality and events in Mendoza",
        "exp.e2.p1": "Cash register with 300 to 400 customers per shift and no discrepancies, service at events of up to 200 guests, and stock control.",

        "contact.title": "Let's talk",
        "contact.text": "I'm looking for my next role as a full-stack or backend developer, remote or in Mendoza. The fastest way to reach me is by email or LinkedIn.",
        "contact.copy": "Copy",
        "contact.copied": "Copied",

        "form.name": "Name",
        "form.email": "Email",
        "form.message": "Message",
        "form.submit": "Send message",
        "form.sending": "Sending…",
        "form.sent": "Message sent. I'll reply by email.",
        "form.error": "The message couldn't be sent. Email me directly at",
        "form.invalid": "Fill in the highlighted fields to send your message.",
        "form.mailto": "Your email app opened with the message ready to send.",

        "footer.note": "Handmade with HTML, CSS and JavaScript."
    }
};
