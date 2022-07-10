<template>
  <!-- Ajouter ce qu'il faut pour l'animation -->
  <Transition name="modal">
    <div v-if="show" class="modal">
      <div class="modal__backdrop" @click="clicked"></div>
      <div class="modal__content modal--dark-mode">
        <!-- <ktm-task-detail></ktm-task-detail> -->
        <ktm-task-form></ktm-task-form>
      </div>
    </div>
  </Transition>
</template>
<script lang="ts" setup>
import type { Task } from "@/model";
import { computed, ref } from "vue";
import KtmTaskDetail from "../KtmTaskDetail.vue";
import KtmTaskForm from "../KtmTaskForm.vue";

const props = defineProps({
  show: Boolean,
});

function clicked() {
  console.log("test");
}
</script>
<style lang="scss" scoped>
@use "../../sass/colors" as c;
@use "../../sass/typography" as t;
@use "../../sass/helpers/functions" as f;
@use "../../sass/mixins" as m;
.modal {
  z-index: 998;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: all 0.5 ease-in-out;

  &__backdrop {
    height: 100%;
    position: fixed;
    z-index: 997;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    mix-blend-mode: normal;
    background-color: rgba($color: #000000, $alpha: 0.5);
  }

  &__content {
    position: relative;

    z-index: 999;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    padding: f.toRem(24, 12);
    border-radius: 6px;
    width: f.toRem(343, 12);
    transition: all 0.5s ease;
    @include m.breakpoint-up(medium) {
      padding: f.toRem(32, 12);
      width: f.toRem(480, 12);
    }
  }
}
.modal--light-mode {
  background-color: c.$White;
}
.modal--dark-mode {
  background-color: c.$DarkGrey;
}

/* Dropdown Animation */
.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal__content,
.modal-leave-to .modal__content {
  -webkit-transform: translateX(-50%) translateY(-55%);
  transform: translateX(-50%) translateY(-55%);
}

/* .v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-55%);
} */
</style>
