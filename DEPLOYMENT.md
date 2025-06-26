# Guía de Despliegue en Vercel

## Problema Resuelto

El error de despliegue se debía a incompatibilidades entre versiones de React 19 y Redux Toolkit. Se han realizado las siguientes correcciones:

### Cambios Realizados

1. **Actualización de Dependencias**:
   - `@reduxjs/toolkit`: `^1.9.7` → `^2.2.1`
   - `react-redux`: `^8.1.3` → `^9.1.0`

2. **Archivos de Configuración Agregados**:
   - `.npmrc`: Configuración para resolver conflictos de dependencias
   - `vercel.json`: Configuración específica para Vercel
   - `next.config.ts`: Optimizaciones para React 19

3. **Mejoras en Tipos**:
   - `react-slick.d.ts`: Declaración de tipos mejorada

## Pasos para Despliegue

### 1. Preparación Local
```bash
# Limpiar cache y node_modules
rm -rf node_modules package-lock.json .next
npm cache clean --force

# Reinstalar dependencias
npm install
```

### 2. Verificación Local
```bash
# Verificar que el build funciona localmente
npm run build

# Probar la aplicación
npm run start
```

### 3. Despliegue en Vercel

#### Opción A: Despliegue Automático
1. Conectar el repositorio a Vercel
2. Vercel detectará automáticamente que es un proyecto Next.js
3. Las configuraciones en `vercel.json` se aplicarán automáticamente

#### Opción B: Despliegue Manual
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel --prod
```

### 4. Configuración en Vercel Dashboard

Si el despliegue automático falla, configurar manualmente en Vercel:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Node.js Version**: 18.x o superior

### 5. Variables de Entorno (si es necesario)

En el dashboard de Vercel, agregar variables de entorno si la aplicación las requiere:
- `NODE_ENV`: `production`
- `NEXT_PUBLIC_*`: Variables públicas de Next.js

## Solución de Problemas Comunes

### Error: ERESOLVE
Si aparece el error ERESOLVE nuevamente:
1. Verificar que `.npmrc` esté en el repositorio
2. En Vercel, ir a Settings → General → Build & Development Settings
3. Agregar en "Install Command": `npm install --legacy-peer-deps`

### Error: TypeScript
Si hay errores de TypeScript:
1. Verificar que todos los tipos estén correctos
2. En `next.config.ts`, temporalmente cambiar `ignoreBuildErrors: true`

### Error: ESLint
Si hay errores de ESLint:
1. Corregir los errores localmente
2. O temporalmente cambiar `ignoreDuringBuilds: true` en `next.config.ts`

## Verificación Post-Despliegue

1. **Funcionalidad Básica**:
   - Navegación entre páginas
   - Carga de imágenes
   - Funcionamiento del carrito

2. **Responsive Design**:
   - Probar en diferentes dispositivos
   - Verificar breakpoints

3. **Performance**:
   - Lighthouse score
   - Tiempo de carga
   - Core Web Vitals

## Rollback (si es necesario)

Si el despliegue falla:
1. Revertir a la versión anterior en Git
2. Forzar nuevo despliegue en Vercel
3. Verificar logs de build para identificar el problema

## Contacto

Si persisten los problemas:
1. Revisar logs de build en Vercel
2. Verificar compatibilidad de versiones
3. Consultar documentación oficial de Next.js y Vercel 