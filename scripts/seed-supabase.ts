// Script para migrar datos de JSON a Supabase
// Ejecutar con: npx tsx scripts/seed-supabase.ts

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const supabaseUrl = process.env.SUPABASE_URL || 'https://mqcsmlyzfzgitczsxlrc.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY || 'sb_publishable_VVUvPXcIdsl4hv-0n0y5Lw_kbALnByY'

const supabase = createClient(supabaseUrl, supabaseKey)

async function seed() {
  console.log('🌱 Iniciando migración de datos a Supabase...\n')

  // Migrar bebidas
  console.log('📦 Migrando bebidas...')
  const drinksPath = join(__dirname, '../app/data/drinks.json')
  const drinks = JSON.parse(readFileSync(drinksPath, 'utf-8'))

  const drinksToInsert = drinks.map((drink: any, index: number) => ({
    name: drink.name,
    category: drink.category,
    category_label: drink.category_label || drink.categoryLabel,
    description: drink.description,
    price: null,
    image_url: drink.image || null,
    available: true,
    sort_order: index
  }))

  const { error: drinksError } = await supabase.from('drinks').insert(drinksToInsert)
  if (drinksError) {
    console.error('❌ Error migrando bebidas:', drinksError)
  } else {
    console.log(`✅ ${drinksToInsert.length} bebidas migradas`)
  }

  // Migrar platos
  console.log('\n📦 Migrando platos...')
  const foodPath = join(__dirname, '../app/data/food.json')
  const foodGroups = JSON.parse(readFileSync(foodPath, 'utf-8'))

  const dishesToInsert: any[] = []
  let sortOrder = 0
  foodGroups.forEach((group: any) => {
    group.items.forEach((item: any) => {
      dishesToInsert.push({
        name: item.name,
        category: group.group,
        description: item.description || null,
        price: null,
        sort_order: sortOrder++
      })
    })
  })

  const { error: dishesError } = await supabase.from('dishes').insert(dishesToInsert)
  if (dishesError) {
    console.error('❌ Error migrando platos:', dishesError)
  } else {
    console.log(`✅ ${dishesToInsert.length} platos migrados`)
  }

  // Migrar tours
  console.log('\n📦 Migrando tours...')
  const toursPath = join(__dirname, '../app/data/tours.json')
  const tours = JSON.parse(readFileSync(toursPath, 'utf-8'))

  const toursToInsert = tours.map((tour: any, index: number) => ({
    name: tour.name,
    duration: tour.duration,
    type: tour.type,
    description: tour.description,
    price: null,
    image_url: tour.image || null,
    whatsapp_message: tour.whatsappMessage || tour.whatsapp_message,
    available: true,
    sort_order: index
  }))

  const { error: toursError } = await supabase.from('tours').insert(toursToInsert)
  if (toursError) {
    console.error('❌ Error migrando tours:', toursError)
  } else {
    console.log(`✅ ${toursToInsert.length} tours migrados`)
  }

  // Migrar galería
  console.log('\n📦 Migrando galería...')
  const galleryToInsert = [
    { image_url: '/img/hero.jpg', alt: 'Río Sinú', sort_order: 0 },
    { image_url: '/img/atardecer.jpg', alt: 'Atardecer', sort_order: 1 },
    { image_url: '/img/margarita-tradicional.jpg', alt: 'Margarita', sort_order: 2 },
    { image_url: '/img/soda-corozo.jpg', alt: 'Soda de corozo', sort_order: 3 }
  ]

  const { error: galleryError } = await supabase.from('gallery').insert(galleryToInsert)
  if (galleryError) {
    console.error('❌ Error migrando galería:', galleryError)
  } else {
    console.log(`✅ ${galleryToInsert.length} imágenes migradas`)
  }

  console.log('\n✨ Migración completada!')
}

seed().catch(console.error)
