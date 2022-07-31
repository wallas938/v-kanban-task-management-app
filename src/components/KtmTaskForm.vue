<template>
  <div class="task-form" :class="themeMode">
    <h1>{{ formTitle }}</h1>
    <form @submit.prevent="onSubmit">
      <div
        class="field title"
        :class="{
          'field--error':
            !titleMeta.valid && titleMeta.dirty && !titleMeta.pending,
        }"
      >
        <label class="label" for="title">Title</label>
        <input
          v-model="title"
          type="text"
          placeholder="e.g. Take coffee break"
          class="title"
        />
      </div>
      <div
        class="field description"
        :class="{
          'field--error':
            !DescriptionMeta.valid &&
            DescriptionMeta.dirty &&
            !DescriptionMeta.pending,
        }"
      >
        <label class="label" for="description">Description</label>
        <Field
          as="textarea"
          name="description"
          v-model="description"
          :placeholder="textAreaPlaceholder"
          class="description"
        ></Field>
      </div>
      <div class="subtasks">
        <label class="label" for="subtask-1">Subtasks</label>
        <TransitionGroup name="list">
          <div
            class="subtask"
            v-for="(subtask, index) in subtasks"
            :key="index"
            :class="{
              'subtask-field--error':
                subtask.state === FieldState.DIRTY &&
                subtask.validity === FieldValidity.INVALID,
            }"
          >
            <input
              v-model="subtask.title"
              @input="updateFieldValidity(subtask.title, index)"
              placeholder="e.g. Make coffee"
              type="text"
            />
            <svg
              @click="onDeleteSubtask(index)"
              width="15"
              height="15"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="#828FA3" fill-rule="evenodd">
                <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
              </g>
            </svg>
          </div>
        </TransitionGroup>
        <div class="add-new-subtask">
          <button type="button" @click="onCreateSubtask">
            + Add New Subtask
          </button>
        </div>
      </div>
      <div class="status">
        <label class="label">Status</label>
        <!-- recuperer les vraix noms de columns dans le store -->
        <ktm-dropdown
          @select="onSelect"
          :columnNames="boardColumnNames"
          :currentColumn="status"
        ></ktm-dropdown>
      </div>
      <div class="submit">
        <button
          :disabled="!checkFormValidity"
          type="submit"
          class="create-task"
          :class="{ 'create-task--disabled': !checkFormValidity }"
        >
          {{ submitBtnText }}
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { FormState, Modal, ThemeMode, type Column } from "@/model";
import { useLayoutStore } from "@/stores/layout";
import { computed, ref, unref } from "vue";
import { useField, useForm, Field } from "vee-validate";
import type { Subtask, Task } from "@/model";
import { useBoardStore } from "@/stores/board";
import { v4 as uuid } from "uuid";

enum FieldState {
  PENDING = "PENDING",
  DIRTY = "DIRTY",
}

enum FieldValidity {
  VALID = "VALID",
  INVALID = "INVALID",
}

const layoutStore = useLayoutStore();
const boardStore = useBoardStore();

/* COMPUTED */
const boardColumnNames = computed(() =>
  boardStore.getCurrentBoard.columns.map((col: Column) => col.name)
);
const formTitle = computed(() =>
  taskFormState.value === FormState.CREATION ? "Add New Task" : "Edit Task"
);
const submitBtnText = computed(() =>
  taskFormState.value === FormState.CREATION ? "Create Task" : "Save Changes"
);
const textAreaPlaceholder = computed(() => {
  if (DescriptionMeta.dirty && !DescriptionMeta.valid) {
    return "";
  }
  return "e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries a little.";
});
const checkFormValidity = computed(() => {
  if (titleMeta.valid && DescriptionMeta.valid && getSubtasksValidity()) {
    return true;
  }
  return false;
});
const themeMode = computed(() => {
  return layoutStore.getThemeMode === ThemeMode.DARK
    ? "task-form--dark-mode"
    : "task-form--light-mode";
});
const task = computed(() => boardStore.getCurrentTask);
const currentColumn = computed(
  () => boardStore.getCurrentBoard.columns[boardStore.getCurrentColumnIndex]
);
const taskFormState = computed(() => layoutStore.getTaskFormState);
/* COMPUTED */

const taskSchema = {
  title(value: string) {
    if (value && value.trim()) return true;
  },
  description(value: string) {
    if (value && value.trim()) return true;
  },
};

useForm({
  validationSchema: taskSchema,
});

//State
const taskField = ref<{
  id?: string;
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
}>({
  title: "",
  description: "",
  status: "",
  subtasks: [],
});

const { value: title, meta: titleMeta } = useField("title");
const { value: description, meta: DescriptionMeta } = useField("description");

const subtasks = ref([
  {
    title: "",
    isCompleted: false,
    validity: FieldValidity.INVALID,
    state: FieldState.PENDING,
  },
  {
    title: "",
    isCompleted: false,
    validity: FieldValidity.INVALID,
    state: FieldState.PENDING,
  },
]);
const status = ref("");
const columnIndex = ref<number>(0);

// Fields Initialization
checkFormMode();

// Function
function checkFormMode() {
  if (taskFormState.value === FormState.EDITION) setFormValues();
}
function setFormValues() {
  if (task.value) {
    title.value = task.value.title;
    description.value = task.value.description;
    status.value = currentColumn.value.name;
    subtasks.value = task.value.subtasks.map((subtask) => {
      return {
        ...subtask,
        state: FieldState.PENDING,
        validity: FieldValidity.VALID,
      };
    });
  }
}
function updateFieldState(index: number) {
  subtasks.value[index].state = FieldState.DIRTY;
}
function updateFieldValidity(value: string, index: number) {
  updateFieldState(index);
  if (value && value.trim()) {
    validateFieldState(index);
    return true;
  }
  invalidateFieldState(index);
}
function getSubtasksValidity(): boolean {
  return subtasks.value.every(
    (subtask) => subtask.validity === FieldValidity.VALID
  );
}
function validateFieldState(index: number) {
  subtasks.value[index].validity = FieldValidity.VALID;
}
function invalidateFieldState(index: number) {
  subtasks.value[index].validity = FieldValidity.INVALID;
}
function onSelect(newStatus: { columnName: string; columnIndex: number }) {
  status.value = newStatus.columnName;
  columnIndex.value = newStatus.columnIndex;
}
function onCreateSubtask() {
  subtasks.value.push({
    title: "",
    isCompleted: false,
    validity: FieldValidity.INVALID,
    state: FieldState.PENDING,
  });
}
function onDeleteSubtask(index: number) {
  if (subtasks.value.length > 2) {
    subtasks.value = subtasks.value.filter(
      (subtask, i) => i !== index && subtask
    );
  }
}
function onSubmit() {
  const t = title.value as string;
  const d = description.value as string;

  if (layoutStore.getTaskFormState === FormState.CREATION) {
    const task: Task = {
      id: uuid(),
      title: t,
      description: d,
      columnId: boardStore.getCurrentBoard.columns[columnIndex.value].id,
      subtasks: [...subtasks.value].map((s) => {
        return {
          id: uuid(),
          title: s.title,
          isCompleted: s.isCompleted,
        };
      }),
      status: status.value,
    };
    boardStore.addNewTask(task, columnIndex.value);
  } else {
    if (task.value) {
      const updatedTask: Task = {
        id: task.value?.id,
        title: t,
        description: d,
        columnId: boardStore.getCurrentBoard.columns[columnIndex.value].id,
        subtasks: [...subtasks.value].map((subtask: any) => {
          return {
            id: uuid(),
            title: subtask.title,
            isCompleted: subtask.isCompleted,
          };
        }),
        status: status.value,
      };
      boardStore.updateCurrentTask(updatedTask, columnIndex.value);
    }
  }
  layoutStore.setCurrentModal(Modal.NO_MODAL);
  layoutStore.setTaskFormState(FormState.CREATION);
}
</script>

<style lang="scss" scoped>
@use "../sass/colors" as c;
@use "../sass/typography" as t;
@use "../sass/helpers/functions" as f;
@use "../sass/mixins" as m;
@use "../sass/layout/index" as l;

.task-form {
  transition: all 0.5s ease-in-out;
  h1 {
    @include t.largeHeading;
    margin-bottom: f.toRem(24, 12);
  }

  .label {
    font-size: f.toRem(12, 12);
    font-weight: 700;
    font-style: normal;
    line-height: f.toRem(15.12, 12);
    margin-bottom: f.toRem(8, 12);
  }

  button {
    @include l.ktm-button;
    @include t.smallButtonText;
    width: 100%;
    padding: f.toRem(8, 12) 0 f.toRem(9, 12) 0;
  }

  input,
  textarea {
    @include l.ktm-input;
  }

  .field--error {
    position: relative;

    &::after {
      color: c.$Red;
      position: absolute;
      content: "Can't be empty";
      top: f.toRem(34.5, 12);
      right: f.toRem(16, 12);
    }

    & > input,
    & > textarea {
      outline: none;
      border: 1px solid c.$Red;
    }
  }
  .subtask-field--error {
    position: relative;

    &::after {
      color: c.$Red;
      position: absolute;
      content: "Can't be empty";
      top: f.toRem(12.5, 12);
      right: f.toRem(46.85, 12);
    }

    & > input,
    & > textarea {
      outline: none;
      border: 1px solid c.$Red;
    }
  }

  textarea {
    height: f.toRem(112, 12);
  }

  .field,
  .status,
  .subtasks {
    display: flex;
    flex-direction: column;
  }

  .field,
  .subtasks,
  .status {
    margin-bottom: f.toRem(24, 12);
  }

  .subtask {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: f.toRem(12, 12);

    & > input {
      width: f.toRem(264, 12);
    }

    & > svg {
      cursor: pointer;
    }

    & > svg:hover {
      & > g path {
        fill: c.$Red;
      }
    }
  }

  .submit > .create-task.create-task--disabled {
    background-color: c.$MediumGrey;
    color: rgba($color: c.$White, $alpha: 0.25);
  }
}

.task-form--light-mode {
  h1 {
    color: c.$Black;
  }

  .label {
    color: c.$MediumGrey;
  }

  .add-new-subtask > button {
    @include l.ktm-btn-secondary-light;
  }

  .submit > button {
    @include l.ktm-btn-primary;
  }

  input,
  textarea {
    color: c.$Black;
  }
}
.task-form--dark-mode {
  h1 {
    color: c.$White;
  }

  .label {
    color: c.$White;
  }

  .add-new-subtask > button {
    @include l.ktm-btn-secondary-dark;
  }

  .submit > .create-task {
    @include l.ktm-btn-primary;
  }

  input,
  textarea {
    color: c.$White;
    background-color: c.$DarkGrey;
  }

  input::placeholder,
  textarea::placeholder {
    color: rgba($color: c.$White, $alpha: 0.25);
  }
}

/* Animation */

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease-in-out;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.8);
}

.list-enter-to,
.list-leave-from {
  opacity: 1;
  transform: scale(1);
}

/* First Breakpoint <=> Medium screen size */

@include m.breakpoint-up(medium) {
  .task-form {
    .subtask {
      & > input {
        width: f.toRem(385, 12);
      }
    }
  }
}
</style>
