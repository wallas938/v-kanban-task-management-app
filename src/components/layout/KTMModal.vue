<template>
  <!-- Ajouter ce qu'il faut pour l'animation -->
  <Transition name="modal">
    <div v-if="show" class="modal">
      <div class="modal__backdrop">
        <div class="modal__content dark-mode">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita
            quasi exercitationem molestiae et a veritatis ab praesentium hic
            quaerat dolorum! Cumque eos hic quasi id! Magnam dolores incidunt
            eligendi fugiat?
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita
            quasi exercitationem molestiae et a veritatis ab praesentium hic
            quaerat dolorum! Cumque eos hic quasi id! Magnam dolores incidunt
            eligendi fugiat?
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita
            quasi exercitationem molestiae et a veritatis ab praesentium hic
            quaerat dolorum! Cumque eos hic quasi id! Magnam dolores incidunt
            eligendi fugiat?
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita
            quasi exercitationem molestiae et a veritatis ab praesentium hic
            quaerat dolorum! Cumque eos hic quasi id! Magnam dolores incidunt
            eligendi fugiat?
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita
            quasi exercitationem molestiae et a veritatis ab praesentium hic
            quaerat dolorum! Cumque eos hic quasi id! Magnam dolores incidunt
            eligendi fugiat?
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita
            quasi exercitationem molestiae et a veritatis ab praesentium hic
            quaerat dolorum! Cumque eos hic quasi id! Magnam dolores incidunt
            eligendi fugiat?
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita
            quasi exercitationem molestiae et a veritatis ab praesentium hic
            quaerat dolorum! Cumque eos hic quasi id! Magnam dolores incidunt
            eligendi fugiat?
          </p>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
const props = defineProps({
  show: Boolean,
});
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

  &__backdrop > &__content {
    position: relative;
    position: fixed;
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

.light-mode {
  background-color: c.$White;
}
.dark-mode {
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
