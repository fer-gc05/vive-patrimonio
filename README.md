# Vive Patrimonio — sitio web

Sitio web para **Vive Patrimonio**, bar y restaurante sobre el río Sinú.

## Características

- Diseño mobile-first y responsive.
- Video de fondo en el inicio.
- Carta de bebidas con filtros por categoría.
- Menú de comida organizado por grupos.
- Tours y paseos por el río Sinú.
- Galería de fotos.
- Botones de WhatsApp e Instagram.
- SEO básico configurado.
- Construido con **Nuxt 3**, **Vue 3**, **TypeScript** y **SCSS**.

## Estructura

```
app/
├── assets/scss/       # Estilos globales y variables
├── components/        # Componentes Vue
│   ├── home/          # Secciones de la landing
│   ├── layout/        # Header, footer, WhatsApp flotante
│   └── ui/            # Componentes reutilizables
├── composables/       # Lógica reactiva compartida
├── data/              # JSON con bebidas, comida y tours
├── layouts/           # Layouts de Nuxt
└── pages/             # Páginas (landing principal)
public/
├── img/               # Imágenes del sitio
└── video/             # Video del hero
nuxt.config.ts         # Configuración de Nuxt
```

## Para desarrollar

```bash
npm install
npm run dev
```

## Para generar el sitio estático

```bash
npm run generate
```

El resultado queda en `.output/public` y puede subirse a Vercel, Netlify, Cloudflare Pages o cualquier hosting estático.

## Para personalizar

- Edita los archivos JSON en `app/data/` para cambiar bebidas, comida y tours.
- Modifica los estilos en `app/assets/scss/`.
- Ajusta textos y secciones en `app/components/home/`.
