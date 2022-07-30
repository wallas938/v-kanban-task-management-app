<template>
  <div class="task" :class="themeMode">
    <div class="top">
      <h1 class="task__title">{{ task?.title }}</h1>
      <div class="actions">
        <svg
          @click="toggleMenu"
          width="5"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="#828FA3" fill-rule="evenodd">
            <circle cx="2.308" cy="2.308" r="2.308" />
            <circle cx="2.308" cy="10" r="2.308" />
            <circle cx="2.308" cy="17.692" r="2.308" />
          </g>
        </svg>
        <Transition>
          <div v-show="showMenu" class="menu">
            <p @click="editCurrentTaskByForm">Edit Task</p>
            <p @click="deleteCurrentTask">Delete Task</p>
          </div>
        </Transition>
      </div>
    </div>
    <p v-if="task?.description" class="task__description">
      {{ task?.description }}
    </p>
    <div class="subtasks">
      <h2>Subtask ({{ subtasksText }})</h2>

      <div class="subtasks__fields">
        <div
          class="field"
          v-for="(subtask, index) in task?.subtasks"
          :key="index"
        >
          <div
            class="checkbox"
            :class="{ 'checkbox--checked': subtask.isCompleted }"
            @click="checkSubtask(index)"
          >
            <svg
              v-if="subtask.isCompleted"
              width="10"
              height="8"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 4.5l2.124 2.124L8.97 1.28"
                stroke="#FFF"
                stroke-width="2"
                fill="none"
                fill-rule="evenodd"
              />
            </svg>
          </div>
          <p v-if="subtask.isCompleted" class="title">
            <s>{{ subtask.title }}</s>
          </p>
          <p v-else class="title">{{ subtask.title }}</p>
          <!-- {{ subtask.title + ": " + subtask.isCompleted }} -->
        </div>
      </div>

      <div class="task__status">
        <h2>Current Status</h2>
        <ktm-dropdown
          @select="onSelect"
          :columnNames="boardColumnNames"
          :currentColumn="task?.status"
        ></ktm-dropdown>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import { FormState, Modal, type Subtask, type Task } from "@/model";
import { ThemeMode } from "@/model";
import { useLayoutStore } from "@/stores/layout";
import { useBoardStore } from "@/stores/board";

const layoutStore = useLayoutStore();
const boardStore = useBoardStore();
const showMenu = ref(false);

/* COMPUTED */
const themeMode = computed(() => {
  return layoutStore.getThemeMode === ThemeMode.DARK
    ? "task--dark-mode"
    : "task--light-mode";
});

const subtasksText = computed(() => {
  if (task.value) {
    const competedTasks = task.value.subtasks.filter(
      (subtask: Subtask) => subtask.isCompleted
    ).length;
    return `${competedTasks} of ${task.value.subtasks.length}`;
  }
});

const task = computed(() => boardStore.getCurrentTask);
const boardColumnNames = computed(() =>
  boardStore.getCurrentBoard.columns.map((col) => col.name)
);

/* FUNCTIONS */
function checkSubtask(index: number) {
  boardStore.checkSubtask(index);
}

function toggleMenu() {
  showMenu.value = !showMenu.value;
}

function deleteCurrentTask() {
  layoutStore.setCurrentModal(Modal.NO_MODAL);
  boardStore.deleteCurrentTask();
}

function editCurrentTaskByForm() {
  layoutStore.setTaskFormState(FormState.EDITION);
  layoutStore.setCurrentModal(Modal.TASK_FORM_MODAL);
}

function onSelect(newStatus: { columnName: string; columnIndex: number }) {
  boardStore.changeTaskStatus(newStatus.columnIndex, newStatus.columnName);
}
</script>
<style lang="scss" scoped>
@use "../sass/colors" as c;
@use "../sass/typography" as t;
@use "../sass/helpers/functions" as f;
@use "../sass/mixins" as m;
.task {
  transition: all 0.5s ease-in-out;
  background-color: transparent;

  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: f.toRem(24, 12);

    h1 {
      @include t.largeHeading;
      width: f.toRem(274, 12);
    }

    .actions {
      position: relative;
      svg {
        cursor: pointer;
      }

      .menu {
        position: absolute;
        z-index: 999;
        border-radius: 8px;
        top: f.toRem(37, 12);
        right: 0;
        width: f.toRem(192, 12);
        height: f.toRem(94, 12);
        padding: f.toRem(16, 12);
      }

      .menu > p {
        @include t.bodyLarge;
        cursor: pointer;
      }

      .menu > p:first-child {
        margin-bottom: f.toRem(16, 12);
      }

      .menu > p:last-child {
        color: c.$Red;
      }
    }
  }

  .task__description {
    @include t.bodyLarge;
    margin-bottom: f.toRem(24, 12);
  }

  h2 {
    font-size: f.toRem(12, 12);
    font-weight: 700;
    font-style: normal;
    line-height: f.toRem(15.12, 12);
  }

  .subtasks {
    h2 {
      margin-bottom: f.toRem(16, 12);
    }

    &__fields {
      margin-bottom: f.toRem(24, 12);

      .field:not(:last-child) {
        margin-bottom: f.toRem(8, 12);
      }

      .field {
        display: flex;
        align-items: center;
        padding: f.toRem(12, 12);
        border-radius: 4px;
        cursor: pointer;
        .checkbox {
          border-radius: 2px;
          border: 1px solid rgba($color: c.$MediumGrey, $alpha: 0.2489);
          display: flex;
          justify-content: center;
          align-items: center;
          width: f.toRem(16, 12);
          height: f.toRem(16, 12);
          margin-right: f.toRem(16, 12);
        }

        .title {
          width: fit-content;
        }
      }
    }
  }

  &__status {
    h2 {
      margin-bottom: f.toRem(8, 12);
    }
  }
}

.task--light-mode {
  .top {
    h1 {
      color: c.$Black;
    }

    .actions {
      .menu {
        background-color: c.$White;
      }

      .menu > p:first-child {
        color: c.$Black;
      }
    }
  }

  .task__description,
  h2 {
    color: c.$MediumGrey;
  }

  .subtasks {
    &__fields {
      .field:hover {
        background-color: rgba($color: c.$MainPurple, $alpha: 0.25);
      }

      .field {
        background-color: c.$LightGreyBG;

        .checkbox {
          background-color: c.$White;
          &--checked {
            background-color: c.$MainPurple;
            border: 1px solid transparent;
          }
        }

        > s {
          color: rgba($color: c.$Black, $alpha: 0.5);
        }

        > p {
          color: rgba($color: c.$Black, $alpha: 1);
        }
      }
    }
  }
}
.task--dark-mode {
  .top {
    h1 {
      color: c.$White;
    }

    .actions {
      .menu {
        background-color: c.$VeryDarkGrey;
      }

      .menu > p:first-child {
        color: c.$MediumGrey;
      }
    }
  }

  .task__description,
  h2 {
    color: c.$MediumGrey;
  }

  .subtasks {
    &__fields {
      .field:hover {
        background-color: rgba($color: c.$MainPurple, $alpha: 0.25);
      }

      .field {
        background-color: c.$VeryDarkGrey;

        .checkbox {
          background-color: c.$DarkGrey;
          &--checked {
            background-color: c.$MainPurple;
            border: 1px solid transparent;
          }
        }

        > s {
          color: rgba($color: c.$White, $alpha: 0.5);
        }

        > p {
          color: rgba($color: c.$White, $alpha: 1);
        }
      }
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@include m.breakpoint-up(medium) {
  .task {
    .top {
      h1 {
        width: f.toRem(387, 12);
      }

      .actions {
        .menu {
          top: f.toRem(37, 12);
          right: f.toRem(calc(-192 / 2), 12);
        }
      }
    }
  }
}
</style>
