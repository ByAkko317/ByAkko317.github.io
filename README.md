# Portafolio · Pablo Barrios

Portafolio personal de Pablo Barrios, desarrollador full stack junior (Python, FastAPI, React, TypeScript, Java, Spring Boot).

Publicado en **https://byakko317.github.io/**

Sitio estático en HTML, CSS y JavaScript, sin paso de build ni dependencias.

## Estructura

```
index.html                         Página principal (el contenido en español vive acá)
404.html                           Página de error
css/
  base.css                         Tokens (colores, tipografía, espaciado), reset y botones
  layout.css                       Header, menú móvil y footer
  sections/                        Estilos de cada sección (hero, about, projects, experience, contact)
  components/cursor.css            Anillo que sigue al mouse
js/
  i18n.js                          Traducciones al inglés y mensajes del JS
  main.js                          Idioma, tema, menú, tarjeta de la API, formulario, cursor
api/v1/developers/pablo-barrios.json   Perfil que consume la tarjeta del hero (ES y EN)
assets/
  cv/CV-Pablo-Barrios.pdf          CV que se descarga desde el hero
  og-image.png                     Vista previa al compartir el enlace (LinkedIn, WhatsApp)
```

## Desarrollo local

Hace falta servirlo por HTTP, porque la tarjeta del hero hace un `fetch` al JSON del perfil:

```bash
python3 -m http.server 8000
# o
npx serve .
```

Después abrí http://localhost:8000.

## Pendiente (opcional)

- [ ] **Formulario**: creá un formulario gratis en [Formspree](https://formspree.io) y reemplazá `TU_ID` en el `action` del formulario en `index.html`. Mientras no esté configurado, el formulario abre el cliente de correo con el mensaje ya escrito.

## Cómo agregar o cambiar contenido

- **Proyecto destacado**: copiá un `<article class="featured">` dentro de `.featured-list` en `index.html`.
- **Proyecto académico**: copiá un `<li class="project">` dentro de `.project-list`.
- **Experiencia**: copiá un `<li class="timeline-item">` dentro de `.timeline`.
- **Inglés**: cada texto traducible tiene `data-i18n="clave"`; agregá esa clave en la sección `en` de `js/i18n.js`.
- **CV**: reemplazá `assets/cv/CV-Pablo-Barrios.pdf` manteniendo el nombre.
- **Perfil del hero**: editá `api/v1/developers/pablo-barrios.json` (y el bloque `<pre>` de `index.html`, que es lo que se ve sin JavaScript).

## Seguridad

GitHub Pages no permite configurar cabeceras HTTP, así que la política de seguridad de contenido (CSP) está en un `<meta http-equiv="Content-Security-Policy">` al inicio de `index.html`. Solo permite scripts propios, las fuentes de Google y envíos a Formspree.

El único script en línea (el que aplica tema e idioma antes de pintar la página) está autorizado por su hash. **Si lo modificás, recalculá el hash** o el navegador lo va a bloquear:

```bash
python3 -c "import re,hashlib,base64;s=open('index.html',encoding='utf-8').read();print(base64.b64encode(hashlib.sha256(re.findall(r'<script>(.*?)</script>',s,re.S)[0].encode()).digest()).decode())"
```

y reemplazá el valor que sigue a `'sha256-` en la meta CSP.

## Despliegue en GitHub Pages

1. **Renombrar el repositorio** a `ByAkko317.github.io` (Settings → General → Repository name). Con ese nombre, GitHub lo publica en la raíz: `https://byakko317.github.io/`.
2. **Settings → Pages** → *Source*: **Deploy from a branch** → rama `main`, carpeta `/ (root)` → Save.
3. Esperá uno o dos minutos y abrí https://byakko317.github.io/.
4. Verificá que **Enforce HTTPS** esté activado en la misma pantalla.
5. Para revisar la vista previa en LinkedIn: https://www.linkedin.com/post-inspector/ con la URL del sitio.

Cada push a `main` vuelve a publicar el sitio automáticamente.
