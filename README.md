# Sitio djantercapital.cl — versión SEO (24-09-2026)

## Qué hay en esta carpeta

| Archivo / carpeta | Para qué |
|---|---|
| `index.html` | Portada (mismo diseño oscuro, preloader y animaciones). Nuevo título, datos estructurados, enlaces a cada servicio |
| `evaluacion-psicolaboral-concepcion/` … (8 carpetas) | Una página por servicio, cada una con su URL, título, FAQ y datos estructurados |
| `blog/` | Índice del blog + 3 artículos |
| `assets/` | CSS y JS compartidos, logo, isotipo, imagen para compartir (og) |
| `robots.txt`, `sitemap.xml` | Para Google |
| `404.html` | Página de error propia |
| `favicon.ico`, `favicon-48.png`, `apple-touch-icon.png` | Íconos |
| `wrangler.jsonc` | Configuración del Worker de Cloudflare (ver paso 1) |
| `.assetsignore` | Evita publicar `wrangler.jsonc` y este LEEME |

## 1. Subir a GitHub

1. En el repo, **borra el `index.html` antiguo** y sube **todo el contenido** de esta carpeta a la raíz (no la carpeta `web` en sí, sino lo que está dentro).
2. `wrangler.jsonc`: si el tuyo tiene un `"name"` distinto de `djandjan`, conserva **tu** nombre y solo agrega dentro de `"assets"` estas dos líneas:
   ```
   "html_handling": "auto-trailing-slash",
   "not_found_handling": "404-page"
   ```
3. `.assetsignore` empieza con punto: en Windows puede quedar oculto. Asegúrate de subirlo.
4. Espera el despliegue y abre: `djantercapital.cl/sitemap.xml`, `djantercapital.cl/evaluacion-psicolaboral-concepcion/` y `djantercapital.cl/blog/`.

## 2. Redirección www → sin www (Cloudflare, 3 min)

Cloudflare → tu dominio → **Rules → Redirect Rules → Create rule → plantilla "Redirect from WWW to root"** → código 301 → Deploy.
Hoy `www.djantercapital.cl` muestra el mismo sitio sin redirigir: Google lo ve como contenido duplicado.

## 3. Search Console

1. **Sitemaps** → agrega `sitemap.xml` → Enviar.
2. **Inspección de URLs** → pega cada página de servicio → "Solicitar indexación" (hay un límite diario; reparte en 2–3 días).
3. Revisa **Páginas** y **Rendimiento** cada semana, las primeras 8 semanas.

## 4. Fuera del sitio (orden de impacto)

1. **Perfil de Empresa de Google** (business.google.com): categoría principal "Consultor de recursos humanos" o la más cercana; si no atiendes en una dirección pública, configúralo como **empresa de área de servicio** (sin mostrar dirección) cubriendo Gran Concepción y Biobío. Mismo nombre, teléfono y web que el sitio.
2. **Reseñas en Google** de clientes reales (Curanilahue, Coronel, Gendarmería u otros que acepten). Nunca inventadas ni pagadas.
3. **LinkedIn empresa** con enlace al sitio; comparte cada artículo nuevo.
4. Enlace al sitio en: firma de correo, perfil personal de LinkedIn, propuestas PDF, ficha de proveedor.

## 5. Contenido (lo que más mueve a mediano plazo)

- Un artículo nuevo al mes, respondiendo preguntas reales de clientes. Ideas: "CEAL-SM/SUSESO: qué hacer después de los resultados", "Cuánto cuesta una mala contratación", "Assessment center: cuándo vale la pena", "Burnout en equipos municipales".
- Para agregar un artículo: copia una carpeta de `blog/`, cambia textos, título, descripción, `canonical` y fecha; agrégalo a `blog/index.html` y a `sitemap.xml`.

## Pendientes de revisión antes de publicar

- **Artículo Ley Karin** (`blog/ley-karin-protocolo-prevencion-pymes/`): pasarlo por revisión legal antes de publicar.
- Afirmaciones comerciales ya existentes: "+12 años", "Proveedor registrado del Estado", "16 regiones".
- Contador de la portada corregido de **15+** a **12+** años, para que coincida con el resto del sitio.
