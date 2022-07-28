<template>
  <div class="task-item" :class="themeMode">
    <h1>Build UI for onboarding flow</h1>
    <small>0 of 3 subtasks</small>
  </div>
</template>
<script setup lang="ts">
import { ThemeMode } from "@/model";
import { useLayoutStore } from "@/stores/layout";
import { computed } from "vue";

const layoutStore = useLayoutStore();

const themeMode = computed(() => {
  return layoutStore.getThemeMode === ThemeMode.DARK
    ? "task-item--dark-mode"
    : "task-item--light-mode";
});
</script>
<style lang="scss" scoped>
@use "../sass/mixins" as m;
@use "../sass/colors" as c;
@use "../sass/typography" as t;
@use "../sass/helpers/functions" as f;

.task-item {
  cursor: pointer;
  border-radius: f.toRem(8, 12);
  padding: f.toRem(23, 12) f.toRem(23, 16);
  box-shadow: 0px 4px 6px rgba(54, 78, 126, 0.101545);

  &:hover {
    h1 {
      color: c.$MainPurple;
    }
  }

  &:not(:last-child) {
    margin-bottom: f.toRem(20, 12);
  }

  h1 {
    @include t.mediumHeading;
    margin-bottom: f.toRem(8, 12);
  }

  small {
    @include t.bodyMedium;
    color: c.$MediumGrey;
  }
}
.task-item--light-mode {
  background-color: c.$White;
  h1 {
    color: c.$Black;
  }
}
.task-item--dark-mode {
  background-color: c.$DarkGrey;
  h1 {
    color: c.$White;
  }
}
</style>
