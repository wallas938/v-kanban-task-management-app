<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <input type="text" />
</template>

<style lang="scss">
@use "sass/layout/_index.scss" as l;

input {
  @include l.ktm-input;
}
</style>
