# Configuración de Supabase

Este proyecto usa Supabase como base de datos y almacenamiento de imágenes.

## Pasos para configurar

### 1. Crear las tablas en Supabase

1. Ve a tu proyecto en [Supabase Dashboard](https://supabase.com/dashboard)
2. Abre el **SQL Editor** (menú lateral izquierdo)
3. Copia y pega todo el contenido del archivo `supabase-schema.sql`
4. Haz clic en **Run** para ejecutar el script

Esto creará las siguientes tablas:
- `drinks` - Bebidas
- `dishes` - Platos de comida
- `tours` - Tours y paseos
- `gallery` - Galería de fotos
- `settings` - Configuración general del sitio

### 2. Migrar los datos iniciales

Una vez creadas las tablas, ejecuta el script de migración:

```bash
npx tsx scripts/seed-supabase.ts
```

Esto migrará los datos de los archivos JSON locales a Supabase.

### 3. Crear un usuario administrador

Para acceder al panel admin, necesitas crear un usuario:

1. En Supabase Dashboard, ve a **Authentication** > **Users**
2. Haz clic en **Add user** > **Create new user**
3. Ingresa el email y contraseña que usarás para el admin
4. Marca la opción **Auto Confirm User**
5. Haz clic en **Create user**

### 4. Configurar variables de entorno

Las variables ya están configuradas en el archivo `.env`:

```
SUPABASE_URL=https://mqcsmlyzfzgitczsxlrc.supabase.co
SUPABASE_KEY=sb_publishable_VVUvPXcIdsl4hv-0n0y5Lw_kbALnByY
```

### 5. Ejecutar el proyecto

```bash
npm run dev
```

El sitio estará disponible en `http://localhost:3000`
El panel admin estará en `http://localhost:3000/admin`

## Panel de administración

El panel admin permite gestionar:

- **Bebidas**: Agregar, editar y eliminar bebidas del menú
- **Comida**: Gestionar los platos del menú
- **Tours**: Administrar los tours disponibles
- **Galería**: Subir y organizar fotos
- **Configuración**: Cambiar número de WhatsApp, Instagram, textos del hero

## Subir imágenes

Para subir imágenes:

1. Ve a **Storage** en Supabase Dashboard
2. Crea los buckets: `drinks`, `tours`, `gallery`, `general`
3. Sube las imágenes al bucket correspondiente
4. Copia la URL pública de la imagen
5. Pega la URL en el campo correspondiente al crear/editar un item

## Estructura de datos

### drinks
- `name` - Nombre de la bebida
- `category` - Categoría (margaritas, daiquiris, clasicos, sodas, cervezas)
- `category_label` - Etiqueta visible (Margarita, Daiquiri, etc.)
- `description` - Descripción
- `price` - Precio en COP
- `image_url` - URL de la imagen
- `available` - Si está disponible
- `sort_order` - Orden de visualización

### dishes
- `name` - Nombre del plato
- `category` - Categoría (Entradas, Fuertes, Postres)
- `description` - Descripción
- `price` - Precio en COP
- `sort_order` - Orden de visualización

### tours
- `name` - Nombre del tour
- `duration` - Duración (ej: "45 MIN")
- `type` - Tipo (ej: "GRUPAL", "PAREJAS")
- `description` - Descripción
- `price` - Precio en COP
- `image_url` - URL de la imagen
- `whatsapp_message` - Mensaje predefinido para WhatsApp
- `available` - Si está disponible
- `sort_order` - Orden de visualización

### gallery
- `image_url` - URL de la imagen
- `alt` - Texto alternativo
- `sort_order` - Orden de visualización

### settings
- `whatsapp_number` - Número de WhatsApp (con código de país)
- `instagram_url` - URL de Instagram
- `hero_title` - Título principal del hero
- `hero_subtitle` - Subtítulo del hero
