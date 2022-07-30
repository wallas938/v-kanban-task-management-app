<template>
  <div class="delete-task-prompt" :class="themeMode">
    <h1>Delete This task?</h1>
    <p>
      Are you sure you want to delete the ‘{{ currentTask?.title }}’ task and
      its subtasks? This action cannot be reversed.
    </p>
    <div class="cta">
      <button class="delete" @click="deleteCurrentTask">Delete</button>
      <button class="cancel" @click="cancelDeletion">Cancel</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Modal, ThemeMode } from "@/model";
import { useBoardStore } from "@/stores/board";
import { useLayoutStore } from "@/stores/layout";
import { computed } from "vue";

const layoutStore = useLayoutStore();
const boardStore = useBoardStore();

const currentTask = computed(() => boardStore.getCurrentTask);
const themeMode = computed(() => {
  return layoutStore.getThemeMode === ThemeMode.DARK
    ? "delete-task-prompt--dark-mode"
    : "delete-task-prompt--light-mode";
});

function deleteCurrentTask() {
  layoutStore.setCurrentModal(Modal.NO_MODAL);
  boardStore.deleteCurrentTask();
}

function cancelDeletion() {
  layoutStore.setCurrentModal(Modal.NO_MODAL);
}
</script>
<style lang="scss" scoped>
@use "../sass/colors" as c;
@use "../sass/typography" as t;
@use "../sass/helpers/functions" as f;
@use "../sass/mixins" as m;
@use "../sass/layout/index" as l;

.delete-task-prompt {
  transition: all 0.5s ease-in-out;
  h1,
  p {
    margin-bottom: f.toRem(24, 12);
  }
  h1 {
    @include t.largeHeading;
    margin-bottom: f.toRem(24, 12);
    color: c.$Red;
  }

  p {
    @include t.bodyLarge;
    color: c.$MediumGrey;
  }

  .cta {
    display: flex;
    flex-direction: column;
    button {
      @include l.ktm-button;
      padding-top: f.toRem(8, 12);
      padding-bottom: f.toRem(9, 12);
    }

    .delete {
      @include l.ktm-btn-destructive;
      margin-bottom: f.toRem(16, 12);
    }
  }
}

.delete-task-prompt--light-mode {
  .cta {
    .cancel {
      @include l.ktm-btn-secondary-light;
    }
  }
}

.delete-task-prompt--dark-mode {
  .cta {
    .cancel {
      @include l.ktm-btn-secondary-dark;
    }
  }
}

@include m.breakpoint-up(medium) {
  .delete-task-prompt {
    .cta {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      button {
        width: f.toRem(200, 12);
      }

      .delete {
        margin-bottom: unset;
      }
    }
  }
}
</style>
