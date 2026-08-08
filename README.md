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
- **Panel de administración** para gestionar contenido.
- Base de datos con **Supabase** (PostgreSQL).
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
├── layouts/           # Layouts de Nuxt (default, admin)
├── pages/             # Páginas
│   ├── index.vue      # Landing principal
│   └── admin/         # Panel de administración
└── types/             # Tipos TypeScript
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

El sitio estará en `http://localhost:3000`
El panel admin estará en `http://localhost:3000/admin`

## Para generar el sitio estático

```bash
npm run generate
```

El resultado queda en `.output/public` y puede subirse a Vercel, Netlify, Cloudflare Pages o cualquier hosting estático.

## Configuración de Supabase

Ver el archivo [SUPABASE.md](./SUPABASE.md) para instrucciones detalladas sobre:

- Crear las tablas en la base de datos
- Migrar los datos iniciales
- Configurar el panel de administración
- Subir imágenes al storage

## Panel de administración

El panel admin (`/admin`) permite gestionar:

- **Bebidas**: Agregar, editar y eliminar bebidas del menú
- **Comida**: Gestionar los platos del menú
- **Tours**: Administrar los tours disponibles
- **Galería**: Subir y organizar fotos
- **Configuración**: Cambiar número de WhatsApp, Instagram, textos del hero

### Acceso

1. Crea un usuario en Supabase Dashboard > Authentication > Users
2. Inicia sesión en `/admin/login` con ese usuario
3. Gestiona todo el contenido desde el panel

## Stack tecnológico

- **Frontend**: Nuxt 3, Vue 3, TypeScript
- **Estilos**: SCSS con variables y mixins
- **Base de datos**: Supabase (PostgreSQL)
- **Autenticación**: Supabase Auth
- **Imágenes**: Almacenamiento local en `public/img/` o Supabase Storage
- **Deploy**: Vercel, Netlify, o cualquier hosting estático

## Personalización

- Edita el contenido desde el panel admin en `/admin`
- Modifica los estilos en `app/assets/scss/`
- Ajusta textos y secciones en `app/components/home/`
- Cambia la configuración general desde `/admin/settings`
