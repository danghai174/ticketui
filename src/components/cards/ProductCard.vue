<template>
  <md-card
    class="md-card-product"
    :class="{
      'md-card-plain': cardPlain
    }"
  >
    <md-card-header
      class="md-card-header-image"
      :shadow-normal="shadowNormal"
      :shadow-off="shadowOff"
      :no-colored-shadow="noColoredShadow"
    >
      <a href="javascript:void(0)">
        <img class="img" :src="cardImage" />
      </a>
      <div
        class="colored-shadow"
        v-if="!noColoredShadow && !shadowNormal && !shadowOff"
        :style="shadowImageBlog(cardImage)"
      ></div>
    </md-card-header>

    <md-card-content
      :class="{ 'text-center': textCenter }"
      v-if="$slots.cardContent"
    >
      <slot name="cardContent"></slot>
    </md-card-content>

    <md-card-actions v-if="$slots.cardAction">
      <slot name="cardAction"></slot>
    </md-card-actions>
  </md-card>
</template>

<script>
export default {
  name: "product-card",
  props: {
    type: String,
    textCenter: Boolean,
    reverseRow: Boolean,
    cardImage: String,
    shadowNormal: Boolean,
    shadowOff: Boolean,
    cardPlain: Boolean,
    noColoredShadow: Boolean
  },
  methods: {
    shadowImageBlog(image) {
      return {
        backgroundImage: `url(${image})`,
        opacity: 1
      };
    }
  }
};
</script>

<style lang="scss" scoped></style>
