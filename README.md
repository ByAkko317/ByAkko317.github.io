# Portafolio · Pablo Barrios

Portafolio personal de Pablo Barrios, Backend / Full-Stack Developer (Java, Spring Boot, Node.js, Python).

Sitio estático en HTML, CSS y JavaScript, sin paso de build ni dependencias.

## Estructura

```
index.html                         Página principal (el contenido en español vive acá)
404.html                           Página de error
css/
  base.css                         Tokens (colores, tipografía, espaciado), reset y botones
  layout.css                       Header, menú móvil y footer
  sections/                        Estilos de cada sección (hero, about, projects, contact)
  components/cursor.css            Anillo que sigue al mouse
js/
  i18n.js                          Traducciones al inglés y mensajes del JS
  main.js                          Idioma, tema, menú, tarjeta de la API, formulario, cursor
api/v1/developers/pablo-barrios.json   Perfil que consume la tarjeta del hero (ES y EN)
assets/                            Imágenes, favicon y og-image.png (vista previa al compartir)
```

## Desarrollo local

Hace falta servirlo por HTTP, porque la tarjeta del hero hace un `fetch` al JSON del perfil:

```bash
python3 -m http.server 8000
# o
npx serve .
```

Después abrí http://localhost:8000.

## Antes de publicar

Buscá `TODO`, `TU-USUARIO`, `TU-DOMINIO`, `TU_ID` y `tu-email@ejemplo.com` en el proyecto y reemplazalos:

- [ ] **Email**: en `index.html` (hero, contacto, botón *Copiar* con `data-email`).
- [ ] **LinkedIn**: `https://www.linkedin.com/in/TU-USUARIO` (hero, contacto y JSON-LD del `<head>`).
- [ ] **CV**: subí el PDF a `assets/cv/CV-Pablo-Barrios.pdf`.
- [ ] **Dominio**: en `og:url` y `og:image` poné la URL absoluta del sitio desplegado. LinkedIn necesita URLs absolutas para mostrar la vista previa.
- [ ] **Formulario** (opcional): creá un formulario gratis en [Formspree](https://formspree.io) y reemplazá `TU_ID` en el `action`. Mientras no esté configurado, el formulario abre el cliente de correo con el mensaje ya escrito.
- [ ] **Proyecto "API con Node.js y MongoDB"**: falta la URL real del repositorio (ahora apunta al perfil de GitHub).

## Cómo agregar un proyecto

1. Copiá un `<li class="project">` dentro de `.project-list` en `index.html`.
2. Cambiá imagen, título, descripción, tecnologías y enlaces.
3. Para la versión en inglés, poné `data-i18n="pN.title"` / `data-i18n="pN.desc"` y agregá esas claves en `js/i18n.js`.

## Despliegue

### Vercel

1. En [vercel.com/new](https://vercel.com/new) importá el repositorio.
2. *Framework preset*: **Other**. Sin comando de build; el directorio de salida es la raíz.
3. Cada push a la rama principal se despliega solo.

### GitHub Pages

1. En el repositorio: **Settings → Pages**.
2. *Source*: **Deploy from a branch**, rama `main`, carpeta `/ (root)`.
3. Queda en `https://byakko317.github.io/Mi-portfolio/`.

Todas las rutas del sitio son relativas, así que funciona tanto en la raíz de un dominio como en una subcarpeta.
