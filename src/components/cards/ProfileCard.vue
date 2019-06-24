<template>
  <md-card
    class="md-card-profile"
    :class="{
      'md-card-plain': cardPlain,
      'flex-direction-row': flexDirectionRow,
      'md-card-horizontal': type === 'horizontal'
    }"
  >
    <template v-if="type !== 'horizontal'">
      <md-card-header
        :shadow-normal="shadowNormal"
        :no-colored-shadow="noColoredShadow"
        :class="{
          'md-card-header-image': !cardAvatar,
          'md-card-avatar': cardAvatar
        }"
      >
        <a :href="cardLink()">
          <img class="img" :src="cardImage" />
          <div class="card-title" v-if="$slots.cardTitleHeader">
            <slot name="cardTitleHeader"></slot>
          </div>
        </a>
        <div
          class="colored-shadow"
          v-if="!noColoredShadow && !shadowNormal"
          :style="shadowImageProfile(cardImage)"
        ></div>
      </md-card-header>
      <md-card-content v-if="$slots.cardContent">
        <slot name="cardContent"></slot>
      </md-card-content>

      <md-card-actions class="justify-content-center" v-if="$slots.cardAction">
        <slot name="cardAction"></slot>
      </md-card-actions>
    </template>

    <template v-else>
      <div class="md-layout">
        <div
          class="md-layout-item"
          :class="{
            'md-size-45 md-xsmall-size-100': !smallImg,
            'md-size-33 md-small-size-100': smallImg
          }"
        >
          <md-card-header
            :shadow-normal="shadowNormal"
            :no-colored-shadow="noColoredShadow"
            class="md-card-header-image"
          >
            <a :href="cardLink()">
              <img class="img" :src="cardImage" />
            </a>
            <div
              class="colored-shadow"
              v-if="!noColoredShadow && !shadowNormal"
              :style="shadowImageProfile(cardImage)"
            ></div>
          </md-card-header>
        </div>
        <div
          class="md-layout-item"
          :class="{
            'md-size-55 md-xsmall-size-100': !smallImg,
            'md-size-66 md-small-size-100': smallImg
          }"
        >
          <md-card-content v-if="$slots.cardContent">
            <slot name="cardContent"></slot>
          </md-card-content>

          <md-card-actions
            md-alignment="left"
            :class="{ 'justify-content-center': textCenter }"
            v-if="$slots.cardAction"
          >
            <slot name="cardAction"></slot>
          </md-card-actions>
        </div>
      </div>
    </template>
  </md-card>
</template>

<script>
export default {
  name: "profile-card",
  props: {
    imageLink: String,
    textCenter: Boolean,
    flexDirectionRow: Boolean,
    smallImg: Boolean,
    type: String,
    cardImage: String,
    cardPlain: Boolean,
    cardAvatar: {
      type: Boolean,
      default: false
    },
    shadowNormal: {
      type: Boolean,
      default: false
    },
    noColoredShadow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    cardLink() {
      if (this.imageLink === undefined) {
        return "javascript:void(0)";
      } else {
        return this.imageLink;
      }
    },
    shadowImageProfile(image) {
      return {
        backgroundImage: `url(${image})`,
        opacity: 1
      };
    }
  }
};
</script>

<style lang="scss">
.justify-content-center {
  justify-content: center !important;
}
</style>
