<template>
  <div class="snackbar">
    <div class="loading">
      <KTMLoadingEllipsis v-if="isLoading" />
    </div>
    <p></p>
  </div>
</template>
<script lang="ts" setup>
import { useLayoutStore } from "@/stores/layout";
import { computed } from "vue";
import KTMLoadingEllipsis from "./KTMLoadingEllipsis.vue";

const layoutStore = useLayoutStore();
const isLoading = computed(() => layoutStore.getLoadingState);
</script>
<style lang="scss" scoped>
@use "../../sass/colors" as c;
@use "../../sass/typography" as t;
@use "../../sass/helpers/functions" as f;
@use "../../sass/mixins" as m;

.snackbar {
  position: absolute;
  width: 85%;
  top: f.toRem(50, 12);
  left: 50%;
  transform: translateX(-50%);

  .loading {
    display: flex;
    background-color: c.$Black;
    justify-content: center;
    padding-top: 1.5rem;
    height: f.toRem(50, 12);
    border-radius: 8px;
  }

  p {
    color: c.$White;
    font-weight: 700;
    font-size: f.toRem(18, 12);
  }
}
</style>
