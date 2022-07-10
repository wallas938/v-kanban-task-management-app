<template>
  <div class="task-form task-form--dark-mode">
    <h1>{{ formTitle }}</h1>
    <form>
      <div class="field title">
        <label class="label" for="title">Title</label>
        <input type="text" placeholder="e.g. Take coffee break" class="title" />
      </div>
      <div class="field description">
        <label class="label" for="description">Description</label>
        <textarea
          :placeholder="textAreaPlaceholder"
          class="description"
        ></textarea>
      </div>
      <div class="subtasks">
        <label class="label" for="subtask-1">Subtasks</label>
        <div class="subtask subtask-1">
          <input placeholder="e.g. Make coffee" type="text" class="subtask-1" />
          <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
            <g fill="#828FA3" fill-rule="evenodd">
              <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
              <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
            </g>
          </svg>
        </div>
        <div class="subtask subtask-2">
          <input
            placeholder="e.g. Drink coffee & smile"
            type="text"
            class="subtask-2"
          />
          <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
            <g fill="#828FA3" fill-rule="evenodd">
              <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
              <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
            </g>
          </svg>
        </div>
        <div class="add-new-subtask">
          <button type="button">+ Add New Subtask</button>
        </div>
      </div>
      <div class="status">
        <label class="label">Status</label>
        <!-- recuperer les vraix noms de columns dans le store -->
        <ktm-dropdown :columnNames="['Todo', 'Doing', 'Done']"></ktm-dropdown>
      </div>
      <div class="submit">
        <button type="button" class="create-task">{{ submitBtnText }}</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";

//Props
const formMode = ref("add");

// Computed
const formTitle = computed(() =>
  formMode.value === "add" ? "Add New Task" : "Edit Task"
);
const submitBtnText = computed(() =>
  formMode.value === "add" ? "Create Task" : "Save Changes"
);

const textAreaPlaceholder = computed(
  () =>
    "e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries a little."
);

// Function
</script>

<style lang="scss" scoped>
@use "../sass/colors" as c;
@use "../sass/typography" as t;
@use "../sass/helpers/functions" as f;
@use "../sass/mixins" as m;
@use "../sass/layout/index" as l;

.task-form {
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

  .submit > button {
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
