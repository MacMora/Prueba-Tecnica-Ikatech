# Guía de Despliegue en Vercel

## Problemas Resueltos

### 1. Error ERESOLVE (React 19 + Redux Toolkit)
**Problema**: Incompatibilidad entre React 19 y Redux Toolkit 1.9.7
**Solución**: Actualización de dependencias
- `@reduxjs/toolkit`: `^1.9.7` → `^2.2.1`
- `react-redux`: `^8.1.3` → `^9.1.0`

### 2. Error de Configuración Next.js 15
**Problema**: Opción `swcMinify` deprecada en Next.js 15
**Solución**: Eliminada la opción deprecada

### 3. Error de Tipos TypeScript (Async Params)
**Problema**: En Next.js 15, los `params` son ahora asíncronos (Promise)
**Solución**: Actualización de tipos y manejo async

## Cambios Realizados

### Archivos de Configuración
1. **`package.json`**: Dependencias actualizadas
2. **`.npmrc`**: Configuración para resolver conflictos
3. **`vercel.json`**: Configuración específica para Vercel
4. **`next.config.ts`**: Optimizaciones para Next.js 15
5. **`tsconfig.json`**: Configuración de tipos mejorada

### Archivos de Código
1. **`app/producto/[nombre]/page.tsx`**: Manejo async de params
2. **`types/next.d.ts`**: Tipos globales para Next.js 15
3. **`components/react-slick.d.ts`**: Tipos mejorados

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
- **Install Command**: `npm install --legacy-peer-deps`
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

### Error: Next.js Config
Si hay errores de configuración:
1. Verificar que `next.config.ts` use la sintaxis correcta para Next.js 15
2. Eliminar opciones deprecadas como `swcMinify`

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

## Notas Importantes

### Next.js 15 Cambios
- Los `params` en páginas dinámicas son ahora asíncronos
- Algunas opciones de configuración han sido deprecadas
- Mejor soporte para React 19

### React 19 Compatibilidad
- Redux Toolkit 2.2.1+ es compatible
- React Redux 9.1.0+ es compatible
- Verificar compatibilidad de otras librerías

## Contacto

Si persisten los problemas:
1. Revisar logs de build en Vercel
2. Verificar compatibilidad de versiones
3. Consultar documentación oficial de Next.js y Vercel 