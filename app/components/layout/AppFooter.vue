<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer>
    <div class="footer-logo">
      VIVE <span>PATRIMONIO</span>
    </div>
    <p>Bar &amp; Restaurante &amp; Tours · Río Sinú</p>
    <small>© {{ year }} Vive Patrimonio</small>
  </footer>
</template>

<style scoped lang="scss">
footer {
  background: #071b17;
  color: #fff;
  text-align: center;
  padding: 45px 20px;
}

.footer-logo {
  font-family: "Cormorant Garamond", serif;
  font-size: 27px;
}

.footer-logo span {
  color: var(--gold);
}

footer p {
  color: rgba(255, 255, 255, 0.55);
  font-size: 12px;
  margin: 8px 0 20px;
}

footer small {
  color: rgba(255, 255, 255, 0.35);
}
</style>
