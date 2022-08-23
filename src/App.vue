<script setup lang="ts">
import { computed } from "vue";
import KTMLoadingSnackbar from "./components/layout/KTMLoadingSnackbar.vue";
import { Modal } from "./model";
import { useAuthStore } from "./stores/auth";
import { useLayoutStore } from "./stores/layout";
import { useInfoStore } from "./stores/message";
const layoutStore = useLayoutStore();
const infoStore = useInfoStore();

/* Computed */
const isModalActif = computed(() => {
  return layoutStore.getCurrentModal !== Modal.NO_MODAL;
});

const isLoading = computed(() => layoutStore.getLoadingState);
const serverMessage = computed(() => infoStore.getServerMessage);
const errorMessage = computed(() => infoStore.getErrorMessage);
</script>
<template>
  <Teleport to="body">
    <ktm-modal :show="isModalActif"></ktm-modal>
  </Teleport>
  <Teleport to="body">
    <transition>
      <KTMLoadingSnackbar v-if="isLoading || serverMessage || errorMessage" />
    </transition>
  </Teleport>
  <router-view></router-view>
</template>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  position: absolute;
  transition: all 0.4s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  left: 50%;
  transform: translateX(-50%) translateY(-80px);
}
</style>
