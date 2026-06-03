# Portafolio de Julian Garcia

Sitio web estático e interactivo para presentar perfil profesional, proyectos de BI,
GIFs de tableros, scripts y casos de automatización.

## Cómo verlo localmente

Abre `index.html` en el navegador.

## Cómo publicar gratis

Opción recomendada: GitHub Pages.

1. Crea un repositorio en GitHub.
2. Sube los archivos `index.html`, `styles.css` y `script.js`.
3. En GitHub, ve a `Settings > Pages`.
4. Selecciona la rama principal y la carpeta raíz.
5. GitHub generará una URL pública.

También funciona en Netlify o Vercel arrastrando esta carpeta completa.

## Cómo agregar proyectos

Desde la web, usa el botón `Agregar proyecto`. Los proyectos quedan guardados en
el navegador mediante `localStorage`.

Para que los proyectos queden públicos para todos los visitantes, agrega esos
proyectos directamente en el arreglo `starterProjects` dentro de `script.js`.

## Qué personalizar

- El correo configurado es `julyan_gc@outlook.com`.
- Revisar que el enlace del CV en Google Drive mantenga permiso `Cualquier persona con el enlace puede ver`; si no, los visitantes no podrán abrirlo.
- Subir GIFs o imágenes de dashboards a una carpeta `assets` o a un hosting público.
- Agregar enlaces a GitHub, notebooks, demos, dashboards publicados o videos.
- Agregar enlaces a certificaciones o credenciales si se quieren mostrar públicamente.
