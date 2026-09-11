<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: ['auth'] })

const { getStats } = useAnalytics()
const stats = ref<any>(null)
const loading = ref(true)

const fetchStats = async () => {
  loading.value = true
  stats.value = await getStats()
  loading.value = false
}

onMounted(fetchStats)

const max7 = computed(() => Math.max(1, ...((stats.value?.last7 || []).map((d: any) => d.count))))
const max12 = computed(() => Math.max(1, ...((stats.value?.last12 || []).map((d: any) => d.count))))
const maxY = computed(() => Math.max(1, ...((stats.value?.lastYears || []).map((d: any) => d.count))))
</script>

<template>
  <div class="analytics">
    <div class="page-header">
      <div>
        <h1>Visitas</h1>
        <p>Página vistas por día, mes y año</p>
      </div>
      <button class="btn-refresh" @click="fetchStats">↻ Actualizar</button>
    </div>

    <div v-if="loading" class="loading">Cargando visitas...</div>
    <div v-else-if="!stats" class="empty">No se pudo cargar. Ejecuta el SQL de page_views en Supabase.</div>
    <template v-else>
      <div class="kpi-grid">
        <div class="kpi"><span class="kpi-label">Hoy</span><span class="kpi-value">{{ stats.today }}</span></div>
        <div class="kpi"><span class="kpi-label">Este mes</span><span class="kpi-value">{{ stats.thisMonth }}</span></div>
        <div class="kpi"><span class="kpi-label">Este año</span><span class="kpi-value">{{ stats.thisYear }}</span></div>
        <div class="kpi total"><span class="kpi-label">Total (últimos 5000)</span><span class="kpi-value">{{ stats.total }}</span></div>
      </div>

      <div class="chart-card">
        <h3>Últimos 7 días</h3>
        <div class="bars">
          <div v-for="d in stats.last7" :key="d.date" class="bar-col">
            <div class="bar" :style="{ height: (d.count / max7 * 100) + '%' }" :title="`${d.date}: ${d.count}`"></div>
            <span class="bar-label">{{ d.date.slice(5) }}</span>
            <span class="bar-count">{{ d.count }}</span>
          </div>
        </div>
      </div>

      <div class="chart-card">
        <h3>Últimos 12 meses</h3>
        <div class="bars">
          <div v-for="m in stats.last12" :key="m.month" class="bar-col">
            <div class="bar bar--green" :style="{ height: (m.count / max12 * 100) + '%' }" :title="`${m.month}: ${m.count}`"></div>
            <span class="bar-label">{{ m.month }}</span>
            <span class="bar-count">{{ m.count }}</span>
          </div>
        </div>
      </div>

      <div class="chart-card">
        <h3>Por año</h3>
        <div class="bars">
          <div v-for="y in stats.lastYears" :key="y.year" class="bar-col">
            <div class="bar bar--gold" :style="{ height: (y.count / maxY * 100) + '%' }" :title="`${y.year}: ${y.count}`"></div>
            <span class="bar-label">{{ y.year }}</span>
            <span class="bar-count">{{ y.count }}</span>
          </div>
        </div>
      </div>

      <div class="chart-card">
        <h3>Páginas más vistas</h3>
        <div v-if="stats.topPaths.length === 0" class="empty">Sin datos aún</div>
        <ul v-else class="top-list">
          <li v-for="[path, count] in stats.topPaths" :key="path"><span class="top-path">{{ path }}</span><span class="top-count">{{ count }}</span></li>
        </ul>
      </div>

      <p class="hint">Conteo: 1 visita por página por sesión al día (sessionStorage) para no inflar. Datos de los últimos 5000 registros.</p>
    </template>
  </div>
</template>

<style scoped lang="scss">
.analytics { max-width: 1100px; }
.page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; gap: 16px; }
.page-header h1 { font-size: 28px; }
.page-header p { color: #666; font-size: 14px; }
.btn-refresh { background: #123b32; color: #fff; border: none; padding: 10px 16px; border-radius: 6px; cursor: pointer; font-weight: 600; }
.btn-refresh:hover { background: #0e2e27; }
.loading, .empty { background: #fff; padding: 24px; border-radius: 10px; color: #666; }
.kpi-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; margin-bottom: 24px; }
.kpi { background: #fff; padding: 20px; border-radius: 10px; display: flex; flex-direction: column; gap: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
.kpi-label { font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 1px; }
.kpi-value { font-size: 28px; font-weight: 700; color: #123b32; }
.kpi.total { background: #123b32; .kpi-label{color:#9dbeb7} .kpi-value{color:#fff} }
.chart-card { background: #fff; padding: 22px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); margin-bottom: 20px; }
.chart-card h3 { font-size: 15px; margin-bottom: 16px; color: #1a1a1a; }
.bars { display: flex; align-items: flex-end; gap: 8px; height: 140px; }
.bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; height: 100%; justify-content: flex-end; }
.bar { width: 100%; max-width: 48px; background: #123b32; border-radius: 4px 4px 0 0; min-height: 4px; transition: height 0.3s; }
.bar--green { background: #1a7a5a; }
.bar--gold { background: #c49a3c; }
.bar-label { font-size: 11px; color: #666; }
.bar-count { font-size: 11px; font-weight: 700; color: #123b32; }
.top-list { list-style: none; display: grid; gap: 10px; }
.top-list li { display: flex; justify-content: space-between; padding: 10px 12px; background: #f8f8f8; border-radius: 6px; }
.top-path { font-size: 13px; color: #333; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 70%; }
.top-count { font-weight: 700; color: #123b32; }
.hint { margin-top: 12px; font-size: 12px; color: #888; }
@media (max-width: 700px) {
  .kpi-grid { grid-template-columns: 1fr 1fr; }
  .bars { height: 110px; gap: 6px; }
  .bar-label { font-size: 10px; }
}
</style>
