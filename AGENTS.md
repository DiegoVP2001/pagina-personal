# AGENTS.md

## Descripcion del proyecto

Este repositorio contiene la pagina personal y CV digital de Diego Vargas Palominos. Es un sitio web estatico pensado para presentar su trayectoria profesional, academica, educativa, deportiva y tecnica en un solo lugar, ademas de servir como vitrina para sus proyectos publicos.

La pagina comunica un perfil centrado en ingenieria, datos, educacion y liderazgo social. Destaca experiencia en Ensenanza, Khan Academy Chile, Puntaje Nacional, PSU Diego, investigacion aplicada, analisis de datos educativos, publicaciones, habilidades tecnicas, premios, atletismo competitivo y canales de contacto.

## Que hace la pagina

- Presenta una portada con nombre, foto, descripcion profesional, enlaces sociales y descarga del CV en PDF.
- Organiza el CV en secciones navegables: About, Education, Experience, Projects, Publications, Skills, Awards, Athletics, GitHub, YouTube y Contact.
- Muestra proyectos destacados como la implementacion de Khan Academy Chile, PSU Diego, analisis de datos educativos a gran escala y diseno de contenido educativo.
- Carga dinamicamente repositorios publicos recientes desde la API de GitHub para el usuario `DiegoVP2001`.
- Carga dinamicamente videos recientes del canal de YouTube `@psudiego` usando el feed RSS convertido mediante `rss2json`.
- Incluye interacciones de interfaz: menu responsive, efecto typewriter, animaciones al hacer scroll, tabs para experiencia profesional y estado activo en la navegacion.
- Permite contacto mediante un formulario que abre el cliente de correo con un enlace `mailto:`.

## Estructura principal

- `index.html`: contenido principal del sitio, estructura de secciones, enlaces, tarjetas, formulario y referencias a recursos.
- `style.css`: sistema visual, layout responsive, colores, tarjetas, grillas, animaciones y estilos de cada seccion.
- `script.js`: comportamiento interactivo del sitio, carga de GitHub/YouTube, menu movil, tabs, animaciones y formulario de contacto.
- `assets/foto.jpg`: imagen usada en el hero.
- `CV - Diego Vargas Palominos (english).pdf`: archivo descargable desde los botones de CV.

## Estilo y experiencia

El sitio usa una estetica oscura tipo portfolio tecnico, con acento turquesa, tipografias `Inter` y `Fira Code`, tarjetas sobrias, secciones amplias y animaciones suaves. La experiencia debe mantenerse clara, profesional y responsive.

Al modificar la pagina, conservar:

- Navegacion por anclas con IDs estables.
- Diseno responsive para escritorio y movil.
- Paleta definida en las variables CSS de `:root`.
- Carga progresiva y fallbacks para GitHub y YouTube.
- Enlaces externos con `target="_blank"` y `rel="noopener"`.
- El CV descargable en la ruta actual, salvo que tambien se actualicen todos los enlaces.

## Consideraciones tecnicas

No hay framework ni proceso de build. La pagina puede abrirse directamente desde `index.html` o servirse con cualquier servidor estatico local.

Las dependencias externas son:

- Google Fonts para `Inter` y `Fira Code`.
- GitHub REST API para listar repositorios publicos.
- Feed RSS de YouTube y `rss2json` para listar videos recientes.

Si alguna API externa falla, el sitio debe seguir mostrando un mensaje util y enlaces directos a GitHub o YouTube.

## Reglas para futuros cambios

- Mantener los cambios acotados a `index.html`, `style.css` y `script.js` cuando sea posible.
- No introducir frameworks, bundlers ni dependencias pesadas sin una razon clara.
- Si se agregan nuevos proyectos, mantener el formato de tarjetas existente y usar tags breves.
- Si se agregan nuevas secciones, actualizar la navegacion superior y verificar el estado activo del menu.
- Probar visualmente en escritorio y movil despues de cambios de layout.
- Cuidar nombres de archivos con espacios, especialmente el PDF del CV.
