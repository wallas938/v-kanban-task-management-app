<template>
  <div class="board-form" :class="themeMode">
    <h1>{{ formTitle }}</h1>
    <form @submit.prevent="onSubmit">
      <div
        class="field board-name"
        :class="{
          'field--error':
            !boardNameMeta.valid &&
            boardNameMeta.dirty &&
            !boardNameMeta.pending,
        }"
      >
        <label class="label" for="board-name">Board Name</label>
        <input
          v-model="boardName"
          type="text"
          placeholder="e.g. Take coffee break"
          class="board-name"
        />
      </div>
      <div class="columns">
        <label class="label">Board Columns</label>
        <TransitionGroup name="list">
          <div
            class="column"
            v-for="(column, colIndex) in columns"
            :key="colIndex"
            :class="{
              'column-field--error':
                column.state === FieldState.DIRTY &&
                column.validity === FieldValidity.INVALID,
            }"
          >
            <transition name="pallete">
              <div
                v-if="
                  colIndex === palletesData.columnIndex && palletesData.show
                "
                class="color-pallete"
              >
                <span
                  class="pastille"
                  v-for="(color, clrIndex) in paletteColors"
                  @click="updateColColor(colIndex, clrIndex)"
                  :style="{ backgroundColor: color }"
                ></span>
              </div>
            </transition>
            <input
              v-model="column.name"
              @input="updateFieldValidity(column.name, colIndex)"
              placeholder="e.g. Doing"
              type="text"
            />
            <span
              @click="handlePalleteDisplaying(colIndex)"
              :style="{
                backgroundColor: column.color ? column.color : 'transparent',
              }"
              class="col-pastille"
            ></span>
            <svg
              @click="onDeleteColumn(colIndex)"
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
        <div class="add-new-column">
          <button type="button" @click="onCreateColumn">
            + Add New Column
          </button>
        </div>
      </div>
      <div class="submit">
        <button
          :disabled="!checkFormValidity"
          type="submit"
          class="create-board"
          :class="{ 'create-board--disabled': !checkFormValidity }"
        >
          {{ submitBtnText }}
        </button>
      </div>
    </form>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, unref } from "vue";
import { FormState, Modal, PaletteColor, type Board } from "@/model";
import { useField, useForm } from "vee-validate";
import { ThemeMode, FieldState, FieldValidity } from "@/model";
import { useLayoutStore } from "@/stores/layout";
import { useBoardStore } from "@/stores/board";
import { v4 as uuid } from "uuid";
const layoutStore = useLayoutStore();

const themeMode = computed(() => {
  return layoutStore.getThemeMode === ThemeMode.DARK
    ? "board-form--dark-mode"
    : "board-form--light-mode";
});
const boardStore = useBoardStore();
const boardFormMode = computed(() => layoutStore.getBoardFormState);

const board = computed(() => boardStore.getCurrentBoard);
const columns = ref<
  {
    id?: string;
    name: string;
    color: PaletteColor | null;
    validity: FieldValidity;
    state: FieldState;
  }[]
>([
  {
    name: "",
    color: null,
    validity: FieldValidity.INVALID,
    state: FieldState.PENDING,
  },
  {
    name: "",
    color: null,
    validity: FieldValidity.INVALID,
    state: FieldState.PENDING,
  },
]);
const palletesData = ref<{ columnIndex: number; show: boolean }>({
  columnIndex: 0,
  show: false,
});
const paletteColors: PaletteColor[] = [
  PaletteColor.LEMON_CHIFFON,
  PaletteColor.CHAMPAGNE_PINK,
  PaletteColor.BABY_PINK,
  PaletteColor.PINK_LAVANDER,
  PaletteColor.MAUVE,
  PaletteColor.BABY_BLUE_EYES,
  PaletteColor.NON_PHOTO_BLUE,
  PaletteColor.ELECTRIC_BLUE,
  PaletteColor.MAGIC_MINT,
  PaletteColor.GRANNY_SMITH_APPLE,

  PaletteColor.FLICKR_PINK,
  PaletteColor.BYZANTINE,
  PaletteColor.PURPLE,
  PaletteColor.PURPLE_2,
  PaletteColor.TRYPAN_BLUE,
  PaletteColor.TRYPAN_BLUE_2,
  PaletteColor.PERSIAN_BLUE,
  PaletteColor.ULTRAMARINE_BLUE,
  PaletteColor.DODGER_BLUE,
  PaletteColor.VIVID_SKY_BLUE,
];
// Define a validation schema
const taskSchema = {
  boardName(value: string) {
    if (value && value.trim()) return true;
  },
};
useForm({
  validationSchema: taskSchema,
});
const { value: boardName, meta: boardNameMeta } = useField("boardName");

// Fields Initialization
checkFormMode();

// Computed
const formTitle = computed(() =>
  layoutStore.getBoardFormState === FormState.CREATION
    ? "Add New Board"
    : "Edit Board"
);

const submitBtnText = computed(() =>
  layoutStore.getBoardFormState === FormState.CREATION
    ? "Create New Task"
    : "Save Changes"
);

const checkFormValidity = computed(() => {
  if (boardNameMeta.valid && getColumnsValidity()) {
    return true;
  }
  return false;
});

// Functions
function checkFormMode() {
  if (layoutStore.getBoardFormState === FormState.EDITION) setFormValues();
}
function setFormValues() {
  if (board.value) {
    boardName.value = board.value.name;
    columns.value = board.value.columns.map((column) => {
      return {
        id: column.id,
        name: column.name,
        color: column.color,
        state: FieldState.PENDING,
        validity: FieldValidity.VALID,
      };
    });
  }
}
function updateFieldState(index: number) {
  columns.value[index].state = FieldState.DIRTY;
}
function updateFieldValidity(value: string, index: number) {
  updateFieldState(index);
  if (value && value.trim()) {
    validateFieldState(index);
    return true;
  }
  invalidateFieldState(index);
}
function getColumnsValidity(): boolean {
  return columns.value.every(
    (column) => column.validity === FieldValidity.VALID
  );
}
function validateFieldState(index: number) {
  columns.value[index].validity = FieldValidity.VALID;
}
function invalidateFieldState(index: number) {
  columns.value[index].validity = FieldValidity.INVALID;
}
function handlePalleteDisplaying(index: number) {
  if (palletesData.value.columnIndex === index) {
    palletesData.value.show = !palletesData.value.show;
    return;
  }
  palletesData.value.show = true;
  palletesData.value.columnIndex = index;
}
function updateColColor(index: number, clrIndex: number) {
  columns.value[index].color = paletteColors[clrIndex];
  closePallete();
}
function closePallete() {
  palletesData.value.show = false;
  palletesData.value.columnIndex = 0;
}
function onCreateColumn() {
  columns.value.push({
    name: "",
    color: null,
    validity: FieldValidity.INVALID,
    state: FieldState.PENDING,
  });
}
function onDeleteColumn(index: number) {
  if (columns.value.length > 2) {
    columns.value = columns.value.filter((column, i) => i !== index && column);
  }
}
function onSubmit() {
  const name = boardName.value as string;

  if (layoutStore.getBoardFormState === FormState.CREATION) {
    const newBoard: Board = {
      id: uuid(),
      name,
      columns: [...columns.value].map((col, idx) => {
        return {
          id: uuid(),
          name: col.name,
          color: col.color,
          tasks: [],
        };
      }),
    };
    boardStore.addNewBoard(newBoard);
  } else {
    const updatedBoard: any = {
      name,
      columns: [...columns.value].map((col, idx) => {
        return {
          id: col.id,
          name: col.name,
          color: col.color,
          tasks: board.value.columns.find((column) => column.id === col.id)
            ?.tasks
            ? board.value.columns.find((column) => column.id === col.id)?.tasks
            : [],
        };
      }),
    };
    boardStore.updateCurrentBoard(updatedBoard);
  }
  layoutStore.setCurrentModal(Modal.NO_MODAL);
  layoutStore.setBoardFormState(FormState.CREATION);
}
</script>
<style lang="scss" scoped>
@use "../sass/colors" as c;
@use "../sass/typography" as t;
@use "../sass/helpers/functions" as f;
@use "../sass/mixins" as m;
@use "../sass/layout/index" as l;

.board-form {
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

  input {
    @include l.ktm-input;
  }

  .field,
  .status,
  .columns {
    display: flex;
    flex-direction: column;
    margin-bottom: f.toRem(24, 12);
  }

  .column {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: f.toRem(12, 12);
    position: relative;

    & > input {
      width: f.toRem(232, 12);
    }

    & > .color-pallete {
      gap: f.toRem(20, 12);
      top: f.toRem(20, 12);
      right: f.toRem(60, 12);
      padding: 16px;
      z-index: 999;
      display: grid;
      position: absolute;
      border-radius: 8px;
      grid-template-rows: repeat(4, 1fr);
      grid-template-columns: repeat(5, 1fr);
    }

    & > .col-pastille,
    .pastille {
      cursor: pointer;
      border-radius: 100%;
      width: f.toRem(24, 12);
      height: f.toRem(24, 12);
    }

    & > .col-pastille:hover {
      background-color: #fa8bff;
      background-image: linear-gradient(
        45deg,
        #fa8bff 0%,
        #2bd2ff 52%,
        #2bff88 90%
      );
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

  .field.field--error {
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

  .column.column-field--error {
    position: relative;

    &::after {
      color: c.$Red;
      position: absolute;
      content: "Can't be empty";
      top: f.toRem(12.5, 12);
      right: f.toRem(80, 12);
    }

    & > input {
      outline: none;
      border: 1px solid c.$Red;
    }
  }

  .submit > .create-board.create-board--disabled {
    background-color: c.$MediumGrey;
    color: rgba($color: c.$White, $alpha: 0.25);
  }
}

.board-form--light-mode {
  h1 {
    color: c.$Black;
  }

  .label {
    color: c.$MediumGrey;
  }

  .add-new-column > button {
    @include l.ktm-btn-secondary-light;
  }

  .submit > .create-board {
    @include l.ktm-btn-primary;
  }

  input {
    @include l.ktm-input;
  }

  .column {
    & > .col-pastille {
      border: 1px dashed c.$MainPurple;
    }

    & > .color-pallete {
      background-color: #fbda61;
      background-image: linear-gradient(45deg, #fbda61 0%, #ff5acd 100%);
    }
  }

  input {
    color: c.$Black;
  }
}
.board-form--dark-mode {
  h1,
  .label {
    color: c.$White;
  }

  .add-new-column > button {
    @include l.ktm-btn-secondary-dark;
  }

  .submit > .create-board {
    @include l.ktm-btn-primary;
  }

  .submit > button {
    @include l.ktm-btn-primary;
  }

  input {
    color: c.$White;
    background-color: c.$DarkGrey;
  }

  .column {
    & > .col-pastille {
      border: 1px dashed c.$Red;
    }

    & > .color-pallete {
      background: #0f2027; /* fallback for old browsers */
      background: -webkit-linear-gradient(
        to right,
        #2c5364,
        #203a43,
        #0f2027
      ); /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(
        to right,
        #2c5364,
        #203a43,
        #0f2027
      ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }
  }

  input::placeholder {
    color: rgba($color: c.$White, $alpha: 0.25);
  }
}

/* Animation */

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease-in-out;
}

.list-leave-active {
  position: absolute;
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

.pallete-enter-active,
.pallete-leave-active {
  position: absolute;
  transition: all 0.5s ease-in-out;
}
.pallete-enter-from,
.pallete-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* First Breakpoint <=> Medium screen size */

@include m.breakpoint-up(medium) {
  .board-form {
    .column {
      & > input {
        width: f.toRem(355, 12);
      }
    }

    .column-field--error {
      &::after {
        right: f.toRem(105, 12);
      }
    }
  }
}
</style>
