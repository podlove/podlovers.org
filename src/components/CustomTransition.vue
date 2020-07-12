<template>
  <transition :name="type">
    <slot />
  </transition>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: null,
      validator: val => ['playbar', 'fade'].includes(val)
    }
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.playbar-enter-active, .playbar-leave-active {
  transition: margin 0.5s,opacity 0.5s;
}
.playbar-enter, .playbar-leave-to {
  opacity: 0;
  margin-bottom: -70px;
}
</style>
