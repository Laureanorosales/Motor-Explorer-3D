# Guía de Despliegue en Producción - MotorExplorer 🏎️⚙️

Este proyecto está optimizado como una aplicación SPA estática de alto rendimiento construida con Vite, React y TypeScript.

---

## 📦 1. Compilación de Producción Local

Para generar la carpeta de producción estática aislada `dist/`:

```bash
npm run build
```

Puedes probar el bundle final localmente ejecutando:

```bash
npm run preview
```

---

## 🚀 2. Opciones de Despliegue (Gratuitos & 1-Clic)

### Opción A: Vercel (Recomendado)
1. Conecta tu repositorio de GitHub a [Vercel.com](https://vercel.com).
2. Selecciona la carpeta del proyecto.
3. Vercel detectará automáticamente **Vite**.
4. Haz clic en **Deploy**. El archivo [`vercel.json`](./vercel.json) incluido garantizará que la navegación funcione sin errores de 404.

### Opción B: Netlify
1. Ingresa a [Netlify.com](https://netlify.com) y arrastra la carpeta `dist/` o conecta tu repositorio Git.
2. Comandos configurados automáticamente vía [`netlify.toml`](./netlify.toml):
   - **Build Command:** `npm run build`
   - **Publish directory:** `dist`

### Opción C: Render / Cloudflare Pages
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

---

## 🧪 3. Ejecución de Pruebas Automatizadas

Antes de desplegar, puedes ejecutar la suite de pruebas unitarias y de integración:

```bash
# Ejecutar tests una vez
npm run test

# Modo de monitoreo continuo
npm run test:watch
```
