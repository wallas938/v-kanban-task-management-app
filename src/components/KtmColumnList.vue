<template>
  <div class="column-list" :class="themeMode">
    <div
      class="column-item"
      v-for="(column, columnIndex) of board.columns"
      :key="columnIndex"
    >
      <div class="top">
        <span
          class="column-color"
          :style="{ backgroundColor: column.color ? column.color : '#CCC' }"
        ></span>
        <h3 class="column-name">
          {{ column.name }} ({{ column.tasks.length }})
        </h3>
      </div>
      <div class="task-list">
        <ktm-task-item
          :task="task"
          :columnIndex="columnIndex"
          :taskIndex="taskIndex"
          v-for="(task, taskIndex) of column.tasks"
          :key="task.id"
        ></ktm-task-item>
      </div>
    </div>
    <div class="add-new-column hide-for-mobile-and-tablet">
      <h2 @click="addNewColumn">+ New Column</h2>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { FormState, Modal, ThemeMode } from "@/model";
import { useLayoutStore } from "@/stores/layout";
import { useBoardStore } from "@/stores/board";
import { computed } from "vue";
import KtmTaskItem from "./KtmTaskItem.vue";

const layoutStore = useLayoutStore();
const boardStore = useBoardStore();

const board = computed(() => boardStore.getCurrentBoard);

const themeMode = computed(() => {
  return layoutStore.getThemeMode === ThemeMode.DARK
    ? "column-list--dark-mode"
    : "column-list--light-mode";
});

function addNewColumn() {
  layoutStore.setBoardFormState(FormState.EDITION);
  layoutStore.setCurrentModal(Modal.BOARD_FORM_MODAL);
}
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
    flex-basis: f.toRem(280, 12);
    flex-shrink: 0;
    margin-right: f.toRem(24, 12);

    .top {
      display: flex;
      margin-bottom: f.toRem(24, 12);
      .column-color {
        width: f.toRem(15, 12);
        height: f.toRem(15, 12);
        border-radius: 100%;
        margin-right: f.toRem(12, 12);
      }

      .column-name {
        @include t.smallHeading;
        color: c.$MediumGrey;
      }
    }
  }
  .add-new-column {
    flex-basis: f.toRem(280, 12);
    flex-shrink: 0;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    h2 {
      @include t.XLargeHeading;
      cursor: pointer;
      color: c.$MediumGrey;
    }

    h2:hover {
      color: c.$MainPurple;
    }
  }
}

.column-list--light-mode {
  .add-new-column {
    background: linear-gradient(
      180deg,
      #e9effa 0%,
      rgba(233, 239, 250, 0.5) 100%
    );
  }
}

.column-list--dark-mode {
  .add-new-column {
    background: linear-gradient(
      180deg,
      rgba(43, 44, 55, 0.25) 0%,
      rgba(43, 44, 55, 0.125) 100%
    );
  }
}

@include m.breakpoint-up(medium) {
}
</style>
