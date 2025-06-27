# Hush Puppies E-commerce

Una aplicación web de comercio electrónico moderna y completamente responsive para la marca Hush Puppies, construida con Next.js, TypeScript, Tailwind CSS y Redux Toolkit.

## 🚀 Características

### Diseño y UX
- **Diseño completamente responsive** - Optimizado para desktop, tablet y móvil
- **Interfaz moderna y elegante** - Siguiendo la identidad visual de Hush Puppies
- **Navegación intuitiva** - Breadcrumbs y navegación clara
- **Búsqueda en tiempo real** - Con sugerencias automáticas
- **Zoom de imágenes** - Funcionalidad interactiva en productos

### Funcionalidades del Carrito
- **Gestión completa del carrito** - Agregar, remover y vaciar productos
- **Selección de tallas** - Interfaz intuitiva para elegir tallas
- **Popup modal responsive** - Vista del carrito optimizada para todos los dispositivos
- **Persistencia de datos** - Estado del carrito mantenido con Redux

### Catálogo de Productos
- **Páginas de producto detalladas** - Información completa de cada producto
- **Sliders interactivos** - "Completa tu look" y "Productos recomendados"
- **Galería de imágenes** - Visualización optimizada de productos
- **Filtrado y búsqueda** - Encuentra productos rápidamente

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Next.js 14** - Framework de React con App Router
- **TypeScript** - Tipado estático para mayor robustez
- **Tailwind CSS** - Framework CSS utility-first para diseño responsive
- **React Redux Toolkit** - Gestión de estado global
- **React Slick** - Carousel/slider para productos

### Iconos y Fuentes
- **Lucide React** - Iconos modernos y consistentes
- **Google Fonts** - Montserrat y Domine para tipografía

### Desarrollo
- **ESLint** - Linting de código
- **PostCSS** - Procesamiento de CSS
- **Autoprefixer** - Compatibilidad cross-browser

## 📱 Responsive Design

La aplicación está completamente optimizada para todos los dispositivos:

### Breakpoints
- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md)
- **Desktop**: > 1024px (lg)

### Características Responsive
- **Layout adaptativo** - Columnas que se reorganizan según el dispositivo
- **Tipografía escalable** - Tamaños de texto que se ajustan automáticamente
- **Imágenes optimizadas** - Diferentes tamaños según el viewport
- **Navegación móvil** - Menús adaptados para touch
- **Sliders responsivos** - Número de slides que se ajusta al dispositivo

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd prueba-ikatech
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

### Scripts Disponibles

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

## 📁 Estructura del Proyecto

```
prueba-ikatech/
├── app/                    # App Router de Next.js
│   ├── favicon.ico
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página de inicio
│   └── producto/
│       ├── [nombre]/      # Páginas dinámicas de productos
│       └── layout.tsx     # Layout de productos
├── components/            # Componentes reutilizables
│   ├── CartPopup.tsx      # Popup del carrito
│   ├── ProductPage.tsx    # Página de producto
│   └── react-slick.d.ts   # Tipos para react-slick
├── store/                 # Redux store
│   ├── cartSlice.ts       # Slice del carrito
│   ├── productsSlice.ts   # Slice de productos
│   ├── providers.tsx      # Providers de Redux
│   └── store.ts           # Configuración del store
├── public/                # Archivos estáticos
│   └── images/            # Imágenes de productos
├── zapato.json            # Datos de productos
└── package.json           # Dependencias y scripts
```

## 🎨 Componentes Principales

### ProductPage.tsx
Componente principal que renderiza la página de producto individual con:
- Galería de imágenes con zoom
- Selector de tallas
- Información del producto
- Sliders de productos relacionados
- Header y footer completos

### CartPopup.tsx
Modal del carrito de compras con:
- Lista de productos agregados
- Funcionalidad de remover productos
- Botones de vaciar carrito y finalizar compra
- Diseño responsive

### Hero.tsx
Sección hero de la página principal con:
- Título y descripción
- Call-to-action
- Diseño responsive

## 🔧 Configuración de Redux

### Store Structure
```typescript
{
  cart: {
    items: CartItem[]
    open: boolean
  },
  products: {
    items: Product[]
  }
}
```

### Slices
- **cartSlice**: Maneja el estado del carrito de compras
- **productsSlice**: Gestiona los datos de productos

## 🎯 Funcionalidades Implementadas

### Gestión de Productos
- ✅ Visualización de productos individuales
- ✅ Galería de imágenes con zoom
- ✅ Selección de tallas
- ✅ Información detallada del producto

### Carrito de Compras
- ✅ Agregar productos al carrito
- ✅ Remover productos del carrito
- ✅ Vaciar carrito completo
- ✅ Vista modal responsive
- ✅ Contador de productos

### Navegación y UX
- ✅ Búsqueda en tiempo real
- ✅ Breadcrumbs
- ✅ Sliders de productos relacionados
- ✅ Diseño responsive completo
- ✅ Header y footer consistentes

### Responsive Design
- ✅ Mobile-first approach
- ✅ Breakpoints optimizados
- ✅ Tipografía escalable
- ✅ Layouts adaptativos
- ✅ Imágenes responsivas

## 🚀 Despliegue

### Vercel (Recomendado)
1. Conectar repositorio a Vercel
2. Configurar variables de entorno si es necesario
3. Deploy automático en cada push

### Otros Proveedores
La aplicación es compatible con cualquier proveedor que soporte Next.js:
- Netlify
- AWS Amplify
- Railway
- Heroku

## 🔍 Optimizaciones

### Performance
- **Image Optimization** - Next.js Image component
- **Code Splitting** - Carga lazy de componentes
- **Bundle Optimization** - Tree shaking automático

### SEO
- **Metadata dinámica** - Títulos y descripciones por página
- **Semantic HTML** - Estructura semántica correcta
- **Open Graph** - Meta tags para redes sociales

### Accessibility
- **ARIA labels** - Etiquetas de accesibilidad
- **Keyboard navigation** - Navegación por teclado
- **Color contrast** - Contraste adecuado de colores

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

**Nota**: Este es un proyecto de demostración para fines educativos y de portfolio. Los productos y precios mostrados son ficticios.
