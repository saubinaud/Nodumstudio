# NodumStudio - Landing Page

Landing page para NodumStudio: Growth Partner para negocios que quieren crecer.

## 🚀 Estructura del Proyecto

```
Nodumstudio/
├── index.html          # Página principal con 11 secciones
├── css/
│   └── styles.css     # Estilos modernos y responsivos
├── js/
│   └── main.js        # Interactividad y manejo de formularios
├── assets/
│   ├── images/        # Imágenes del sitio
│   └── logos/         # Logos de clientes
└── README.md          # Este archivo
```

## 📋 Secciones de la Landing Page

1. **Hero** - Headline principal y CTA
2. **Prueba Social** - Logos de clientes
3. **El Problema** - Identificación de puntos de dolor
4. **La Solución** - Servicios ofrecidos
5. **Comparativa Antes/Después** - Transformación del negocio
6. **Caso de Éxito** - AMAS Team Wolf
7. **Proceso** - Cómo trabajamos (8 semanas)
8. **Sobre Mí** - Sebastien
9. **FAQ** - Preguntas frecuentes
10. **CTA Final** - Formulario de contacto
11. **Footer** - Información de contacto

## 🎨 Diseño

- **Colores:**
  - Fondo: Negro (#0a0a0a)
  - Primario: Gris oscuro (#1a1a1a)
  - Acento: Dorado (#ffd700)
  - Texto: Blanco y gris claro

- **Tipografía:**
  - Headings: Georgia (serif)
  - Body: System fonts (sans-serif)

- **Características:**
  - Diseño responsive (mobile-first)
  - Animaciones suaves al hacer scroll
  - Efectos hover en tarjetas y botones
  - Formulario integrado con WhatsApp

## ⚙️ Funcionalidades

### JavaScript

- **Smooth Scrolling:** Navegación suave entre secciones
- **Navbar Effect:** Sombra dinámica al hacer scroll
- **Form Handling:** Envío de formulario a WhatsApp
- **Animations:** Fade-in al entrar en viewport
- **Phone Validation:** Validación de números peruanos

### Formulario de Contacto

El formulario redirige automáticamente a WhatsApp con los datos completados.

**⚠️ IMPORTANTE:** Actualizar el número de WhatsApp en `js/main.js` línea 49:

```javascript
const whatsappNumber = '51999999999'; // Reemplazar con tu número real
```

## 📝 Pendientes Antes de Publicar

### 1. Contenido

- [ ] Foto profesional de Sebastien (agregar a `assets/images/`)
- [ ] Testimonio del dueño de AMAS Team Wolf
- [ ] Logo de NodumStudio (agregar a `assets/logos/`)
- [ ] Logo de AMAS Team Wolf (agregar a `assets/logos/`)
- [ ] Logo de la guardería (opcional, agregar a `assets/logos/`)

### 2. Configuración

- [ ] Actualizar número de WhatsApp en `js/main.js`
- [ ] Actualizar email de contacto en el footer
- [ ] Agregar enlaces de redes sociales (LinkedIn, Instagram) si aplica

### 3. SEO y Meta Tags (Opcional pero recomendado)

- [ ] Agregar favicon
- [ ] Agregar Open Graph tags para redes sociales
- [ ] Agregar Google Analytics o similar
- [ ] Crear archivo `sitemap.xml`
- [ ] Crear archivo `robots.txt`

## 🖼️ Cómo Agregar Imágenes

### Foto de Sebastien

1. Guardar la foto en `assets/images/sebastien.jpg`
2. Actualizar en `index.html`, línea ~396:

```html
<div class="about-image">
    <img src="assets/images/sebastien.jpg" alt="Sebastien - Fundador de NodumStudio">
</div>
```

### Logo de NodumStudio

1. Guardar el logo en `assets/logos/nodumstudio-logo.png`
2. Actualizar en `index.html`, navbar:

```html
<div class="logo">
    <img src="assets/logos/nodumstudio-logo.png" alt="NodumStudio">
</div>
```

### Logos de Clientes

1. Guardar logos en `assets/logos/`
2. Reemplazar el placeholder en la sección de prueba social:

```html
<div class="client-logo">
    <img src="assets/logos/amas-team-wolf.png" alt="AMAS Team Wolf">
</div>
```

## 🚀 Deployment

### Opción 1: GitHub Pages (Gratis)

1. Crear repositorio en GitHub
2. Hacer push del código
3. Ir a Settings → Pages
4. Seleccionar branch `main` y carpeta `/ (root)`
5. El sitio estará disponible en `https://tuusuario.github.io/nodumstudio`

### Opción 2: Netlify (Gratis)

1. Crear cuenta en [Netlify](https://www.netlify.com)
2. Conectar repositorio de GitHub
3. Deploy automático en cada push
4. Dominio personalizado disponible

### Opción 3: Vercel (Gratis)

1. Crear cuenta en [Vercel](https://vercel.com)
2. Importar repositorio
3. Deploy automático
4. Excelente para proyectos estáticos

### Opción 4: Hosting tradicional

1. Subir todos los archivos vía FTP
2. Asegurarse de mantener la estructura de carpetas
3. El `index.html` debe estar en la raíz

## 🔧 Personalización

### Cambiar Colores

Editar variables CSS en `css/styles.css` (líneas 1-15):

```css
:root {
    --color-primary: #1a1a1a;
    --color-accent: #ffd700;
    /* ... otros colores ... */
}
```

### Modificar Contenido

Todo el texto está en `index.html`. Buscar la sección correspondiente y editar directamente.

### Ajustar Espaciado

Modificar variables de spacing en `css/styles.css`:

```css
:root {
    --spacing-sm: 1rem;
    --spacing-md: 2rem;
    --spacing-lg: 4rem;
    --spacing-xl: 6rem;
}
```

## 📱 Responsive Design

La página está optimizada para:
- 📱 Mobile (320px - 768px)
- 💻 Tablet (768px - 1024px)
- 🖥️ Desktop (1024px+)

## 🌐 Navegadores Soportados

- Chrome (últimas 2 versiones)
- Firefox (últimas 2 versiones)
- Safari (últimas 2 versiones)
- Edge (últimas 2 versiones)

## 📊 Performance

- ✅ Sin dependencias externas (sin jQuery, Bootstrap, etc.)
- ✅ CSS vanilla optimizado
- ✅ JavaScript vanilla moderno
- ✅ Imágenes optimizables (usar WebP para mejor compresión)
- ✅ Lazy loading recomendado para imágenes

## 🔒 Seguridad

- Formulario no guarda datos sensibles
- Redirección directa a WhatsApp
- Sin cookies ni tracking por defecto
- HTTPS recomendado para producción

## 📞 Soporte

Para preguntas o mejoras, contactar a través de:
- Email: [Tu email]
- WhatsApp: [Tu número]

## 📄 Licencia

© 2025 NodumStudio. Todos los derechos reservados.

---
