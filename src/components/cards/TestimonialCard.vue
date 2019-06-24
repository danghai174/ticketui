<template>
  <md-card class="md-card-testimonial" :class="{ 'md-card-plain': cardPlain }">
    <md-card-header>
      <div class="icon icon-black" v-if="$slots.icon">
        <slot name="icon"></slot>
      </div>
      <slot name="cardAvatarTop"></slot>
    </md-card-header>
    <md-card-content v-if="$slots.cardContent">
      <slot name="cardContent"></slot>
    </md-card-content>

    <md-card-actions class="justify-content-center" v-if="$slots.cardAction">
      <slot name="cardAction"></slot>
    </md-card-actions>
  </md-card>
</template>

<script>
export default {
  name: "testimonial-card",
  props: {
    cardPlain: Boolean
  }
};
</script>

<style lang="scss"></style>
