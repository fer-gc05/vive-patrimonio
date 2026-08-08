<script setup lang="ts">
const { fetchSettings } = useSettings()
const experienceImageUrl = ref('/img/atardecer.jpg')

onMounted(async () => {
  const settings = await fetchSettings()
  if (settings?.experience_image_url) {
    experienceImageUrl.value = settings.experience_image_url
  }
})
</script>

<template>
  <section class="experience" id="experiencia">
    <div class="experience-image">
      <img
        :src="experienceImageUrl"
        alt="Experiencia en Vive Patrimonio"
        loading="lazy"
      />
    </div>
    <div class="experience-content">
      <UiSectionLabel>La experiencia</UiSectionLabel>
      <h2>El río es parte <span>de nosotros.</span></h2>
      <p>
        Vive Patrimonio es un espacio sobre el río Sinú donde cada bebida y cada plato se
        disfrutan acompañados por el paisaje.
      </p>
      <p>Ven a disfrutar, compartir y vivir el momento.</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.experience {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 650px;
}

.experience-image {
  overflow: hidden;
}

.experience-image img {
  height: 100%;
  object-fit: cover;
}

.experience-content {
  background: var(--green);
  color: #fff;
  padding: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.experience-content h2 {
  font-family: "Cormorant Garamond", serif;
  font-size: clamp(45px, 6vw, 75px);
  line-height: 0.95;
  font-weight: 500;
  margin: 20px 0;
}

.experience-content h2 span {
  color: var(--gold);
  font-style: italic;
}

.experience-content p {
  max-width: 500px;
  line-height: 1.9;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 20px;
}

@include respond(tablet) {
  .experience {
    grid-template-columns: 1fr;
    min-height: 0;
  }

  .experience-image {
    height: 390px;
  }

  .experience-content {
    padding: 65px 25px;
  }

  .experience-content h2 {
    font-size: 50px;
  }
}
</style>
