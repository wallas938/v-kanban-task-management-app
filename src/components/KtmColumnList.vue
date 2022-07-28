<template>
  <div class="column-list" :class="themeMode">
    <div class="column-item" v-for="item of 3">
      <div class="top">
        <span class="column-color"></span>
        <h3 class="column-name">Todo (4)</h3>
      </div>
      <div class="task-list">
        <ktm-task-item></ktm-task-item>
        <ktm-task-item></ktm-task-item>
        <ktm-task-item></ktm-task-item>
        <ktm-task-item></ktm-task-item>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ThemeMode } from "@/model";
import { useLayoutStore } from "@/stores/layout";
import { computed } from "vue";
import KtmTaskItem from "./KtmTaskItem.vue";

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

.column-list {
  display: flex;
  height: 100%;
  .column-item {
    flex-basis: f.toRem(230, 12);
    flex-shrink: 0;

    .top {
      display: flex;
      margin-bottom: f.toRem(24, 12);
      .column-color {
        width: f.toRem(15, 12);
        height: f.toRem(15, 12);
        border-radius: 100%;
        background-color: greenyellow;
        margin-right: f.toRem(12, 12);
      }

      .column-name {
        @include t.smallHeading;
        color: c.$MediumGrey;
      }
    }
  }

  .column-item {
    margin-right: f.toRem(24, 12);
  }
}

@include m.breakpoint-up(medium) {
  .column-list {
    .column-item {
      flex-basis: f.toRem(280, 12);
    }
  }
}
</style>
