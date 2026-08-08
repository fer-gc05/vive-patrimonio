<script setup lang="ts">
const whatsappLink = 'https://wa.me/573001234567'
const instagramLink = 'https://www.instagram.com/vivepatrimoni0/'
</script>

<template>
  <section class="contact" id="contacto">
    <div class="contact-inner">
      <UiSectionLabel>Visítanos</UiSectionLabel>
      <h2>Nos vemos frente <span>al río.</span></h2>
      <p>Vive una experiencia diferente en Vive Patrimonio.</p>
      <div class="contact-buttons">
        <a :href="whatsappLink" class="contact-button" target="_blank" rel="noopener">
          WhatsApp
        </a>
        <a :href="instagramLink" class="contact-button" target="_blank" rel="noopener">
          Instagram
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.contact {
  background: var(--green-dark);
  color: #fff;
  padding: 110px 6%;
  text-align: center;
}

.contact-inner {
  max-width: 800px;
  margin: auto;
}

.contact h2 {
  font-family: "Cormorant Garamond", serif;
  font-size: clamp(45px, 6vw, 75px);
  line-height: 0.95;
  font-weight: 500;
  margin: 20px 0;
  color: #fff;
}

.contact h2 span {
  color: var(--gold);
  font-style: italic;
}

.contact p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.8;
}

.contact-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 35px;
}

.contact-button {
  border: 1px solid var(--gold);
  color: var(--gold);
  padding: 15px 28px;
  font-size: 11px;
  letter-spacing: 2px;
  transition: 0.3s;
}

.contact-button:hover {
  background: var(--gold);
  color: #fff;
}

@include respond(tablet) {
  .contact {
    padding: 70px 22px;
  }

  .contact h2 {
    font-size: 50px;
  }

  .contact-buttons {
    flex-direction: column;
  }

  .contact-button {
    display: block;
  }
}
</style>
