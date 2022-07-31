<template>
  <div class="column-list" :class="themeMode">
    <div
      class="column-item"
      @drop.prevent="drop($event)"
      @dragover.prevent="
        dragover($event, {
          columnIndex: columnIndex,
          columnName: column.name,
        })
      "
      @dragenter.prevent="dragenter($event)"
      v-for="(column, columnIndex) of board.columns"
      :key="columnIndex"
    >
      <div class="top">
        <span
          class="column-color"
          :style="{
            backgroundColor: column.color ? column.color : '#CCC',
          }"
        ></span>
        <h3 class="column-name">
          {{ column.name }} ({{ column.tasks.length }})
        </h3>
      </div>
      <div class="task-list">
        <transition-group>
          <ktm-task-item
            @dragstart="
              dragStart($event, {
                taskIndex: taskIndex,
                columnIndex: columnIndex,
                columnName: column.name,
              })
            "
            :task="task"
            :columnIndex="columnIndex"
            :taskIndex="taskIndex"
            v-for="(task, taskIndex) of column.tasks"
            :key="task.id"
            draggable="true"
          ></ktm-task-item>
        </transition-group>
      </div>
    </div>
    <div class="add-new-column hide-for-mobile-and-tablet">
      <h2 @click="addNewColumn">+ New Column</h2>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { FormState, Modal, PaletteColor, ThemeMode } from "@/model";
import { useLayoutStore } from "@/stores/layout";
import { useBoardStore } from "@/stores/board";
import { computed, ref } from "vue";
import KtmTaskItem from "./KtmTaskItem.vue";

interface MetaData {
  taskIndex: number;
  columnIndex: number;
  columnName: string;
}

const layoutStore = useLayoutStore();
const boardStore = useBoardStore();
const meta = ref<MetaData>({} as MetaData);

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

function dragStart(
  ev: any,
  evMeta: { taskIndex: number; columnIndex: number; columnName: string }
) {
  ev.target.classList.add("dragged");
  meta.value = evMeta;
  boardStore.setCurrentTask(meta.value.columnIndex, meta.value.taskIndex);
}

function drop(ev: any) {
  ev.target.classList.remove("dragged");
  boardStore.changeTaskStatus(meta.value.columnIndex, meta.value.columnName);
  meta.value = {} as MetaData;
}

function dragover(
  ev: any,
  columnMeta: { columnIndex: number; columnName: string }
) {
  console.log(ev.target);
  meta.value = {
    ...meta.value,
    columnIndex: columnMeta.columnIndex,
    columnName: columnMeta.columnName,
  };
}

function dragenter(ev: any) {}
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

  .dragged {
    cursor: move;
    border-left: 6px solid c.$MainPurple;
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
