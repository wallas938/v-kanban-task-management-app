<template>
  <div class="task-item" :class="themeMode" @click="showDetail">
    <h1>{{ task.title }}</h1>
    <small
      >{{ subtasksCompletedQuantity }} of
      {{ task.subtasks.length }} subtasks</small
    >
  </div>
</template>
<script setup lang="ts">
import { Modal, ThemeMode, type Subtask, type Task } from "@/model";
import { useBoardStore } from "@/stores/board";
import { useLayoutStore } from "@/stores/layout";
import { computed } from "vue";
import { number } from "yup";

const layoutStore = useLayoutStore();
const boardStore = useBoardStore();

const props = defineProps({
  task: {
    type: Object as () => Task,
    required: true,
  },
  columnIndex: {
    type: Number,
    required: true,
  },
});
/* COMPUTED */
const themeMode = computed(() => {
  return layoutStore.getThemeMode === ThemeMode.DARK
    ? "task-item--dark-mode"
    : "task-item--light-mode";
});

const subtasksCompletedQuantity = computed(
  () =>
    props.task.subtasks.filter((subtask: Subtask) => subtask.isCompleted).length
);
/* COMPUTED */

/* FUNCTIONS */
function showDetail() {
  boardStore.setCurrentTask(props.columnIndex, props.task.id);
  layoutStore.setCurrentModal(Modal.TASK_DETAIL_VIEW);
}
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
