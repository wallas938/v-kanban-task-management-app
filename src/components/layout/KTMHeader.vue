<template>
  <header class="ktm-header" :class="themeMode">
    <div class="brand">
      <a class="logo">
        <img :src="logo" alt="platform launch logo" />
      </a>
      <svg
        class="hide-for-mobile"
        width="114"
        height="25"
        viewBox="0 0 114 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5.56001 24.224V18.88L7.48001 16.768L11.928 24.224H17.368L11.064 13.792L17.4 6.752H11.48L5.56001 13.056V0H0.76001V24.224H5.56001ZM24.92 24.608C27.096 24.608 28.8453 23.936 30.168 22.592V24.224H34.648V12.704C34.648 11.4453 34.3333 10.3413 33.704 9.392C33.0747 8.44267 32.1947 7.70133 31.064 7.168C29.9333 6.63467 28.632 6.368 27.16 6.368C25.304 6.368 23.6773 6.79467 22.28 7.648C20.8827 8.50133 19.928 9.65333 19.416 11.104L23.256 12.928C23.5547 12.16 24.0293 11.5413 24.68 11.072C25.3307 10.6027 26.0827 10.368 26.936 10.368C27.832 10.368 28.5413 10.592 29.064 11.04C29.5867 11.488 29.848 12.0427 29.848 12.704V13.184L25.016 13.952C22.9253 14.2933 21.368 14.944 20.344 15.904C19.32 16.864 18.808 18.08 18.808 19.552C18.808 21.1307 19.3573 22.368 20.456 23.264C21.5547 24.16 23.0427 24.608 24.92 24.608ZM24.376 20.64C24.7813 20.9387 25.2827 21.088 25.88 21.088C27.0747 21.088 28.0347 20.7147 28.76 19.968C29.4853 19.2213 29.848 18.3147 29.848 17.248V16.704L25.88 17.408C25.1973 17.536 24.6747 17.7547 24.312 18.064C23.9493 18.3733 23.768 18.816 23.768 19.392C23.768 19.9253 23.9707 20.3413 24.376 20.64ZM42.968 24.224V14.016C42.968 13.0133 43.2667 12.208 43.864 11.6C44.4613 10.992 45.2293 10.688 46.168 10.688C47.1067 10.688 47.8747 10.992 48.472 11.6C49.0693 12.208 49.368 13.0133 49.368 14.016V24.224H54.168V12.992C54.168 11.6693 53.8907 10.512 53.336 9.52C52.7813 8.528 52.008 7.75467 51.016 7.2C50.024 6.64533 48.8667 6.368 47.544 6.368C46.4347 6.368 45.4533 6.576 44.6 6.992C43.7467 7.408 43.096 8.04267 42.648 8.896V6.752H38.168V24.224H42.968ZM71.704 23.392C70.36 24.2027 68.8347 24.608 67.128 24.608C66.0613 24.608 65.064 24.432 64.136 24.08C63.208 23.728 62.4347 23.2213 61.816 22.56V24.224H57.336V0H62.136V8.224C63.3733 6.98667 65.048 6.368 67.16 6.368C68.824 6.368 70.328 6.77333 71.672 7.584C73.016 8.39467 74.0827 9.488 74.872 10.864C75.6613 12.24 76.056 13.7813 76.056 15.488C76.056 17.1733 75.6667 18.7093 74.888 20.096C74.1093 21.4827 73.048 22.5813 71.704 23.392ZM66.552 20.288C65.2507 20.288 64.1893 19.8453 63.368 18.96C62.5467 18.0747 62.136 16.9173 62.136 15.488C62.136 14.08 62.5467 12.928 63.368 12.032C64.1893 11.136 65.2507 10.688 66.552 10.688C67.8747 10.688 68.9627 11.1413 69.816 12.048C70.6693 12.9547 71.096 14.1013 71.096 15.488C71.096 16.896 70.6693 18.048 69.816 18.944C68.9627 19.84 67.8747 20.288 66.552 20.288ZM89.528 22.592C88.2053 23.936 86.456 24.608 84.28 24.608C82.4027 24.608 80.9147 24.16 79.816 23.264C78.7173 22.368 78.168 21.1307 78.168 19.552C78.168 18.08 78.68 16.864 79.704 15.904C80.728 14.944 82.2853 14.2933 84.376 13.952L89.208 13.184V12.704C89.208 12.0427 88.9467 11.488 88.424 11.04C87.9013 10.592 87.192 10.368 86.296 10.368C85.4427 10.368 84.6907 10.6027 84.04 11.072C83.3893 11.5413 82.9147 12.16 82.616 12.928L78.776 11.104C79.288 9.65333 80.2427 8.50133 81.64 7.648C83.0373 6.79467 84.664 6.368 86.52 6.368C87.992 6.368 89.2933 6.63467 90.424 7.168C91.5547 7.70133 92.4347 8.44267 93.064 9.392C93.6933 10.3413 94.008 11.4453 94.008 12.704V24.224H89.528V22.592ZM85.24 21.088C84.6427 21.088 84.1413 20.9387 83.736 20.64C83.3307 20.3413 83.128 19.9253 83.128 19.392C83.128 18.816 83.3093 18.3733 83.672 18.064C84.0347 17.7547 84.5573 17.536 85.24 17.408L89.208 16.704V17.248C89.208 18.3147 88.8453 19.2213 88.12 19.968C87.3947 20.7147 86.4347 21.088 85.24 21.088ZM102.328 14.016V24.224H97.528V6.752H102.008V8.896C102.456 8.04267 103.107 7.408 103.96 6.992C104.813 6.576 105.795 6.368 106.904 6.368C108.227 6.368 109.384 6.64533 110.376 7.2C111.368 7.75467 112.141 8.528 112.696 9.52C113.251 10.512 113.528 11.6693 113.528 12.992V24.224H108.728V14.016C108.728 13.0133 108.429 12.208 107.832 11.6C107.235 10.992 106.467 10.688 105.528 10.688C104.589 10.688 103.821 10.992 103.224 11.6C102.627 12.208 102.328 13.0133 102.328 14.016Z"
          fill="white"
        />
      </svg>
    </div>
    <div class="board-name">
      <h1>{{ currentBoard }}</h1>
      <button
        @click="showMobileBoardNav"
        class="nav-board-btn hide-for-tablet-and-desktop"
      >
        <svg
          :class="{
            'chevron--rotated': currentModal === Modal.BOARD_NAV_MODAL,
          }"
          width="10"
          height="7"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke="#635FC7"
            stroke-width="2"
            fill="none"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
    </div>
    <div class="new-task">
      <button
        @click="createNewTask"
        :disabled="boardStore.getBoards.length < 1"
        :class="{ 'new-task--disabled': boardStore.getBoards.length < 1 }"
      >
        <svg
          class="hide-for-tablet-and-desktop"
          width="12"
          height="12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#FFF"
            d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
          />
        </svg>
        <span class="hide-for-mobile">+ Add New Task</span>
      </button>
    </div>
    <div class="board-action">
      <button @click="toggleActionModal">
        <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
          <g fill="#828FA3" fill-rule="evenodd">
            <circle cx="2.308" cy="2.308" r="2.308" />
            <circle cx="2.308" cy="10" r="2.308" />
            <circle cx="2.308" cy="17.692" r="2.308" />
          </g>
        </svg>
      </button>
      <Transition>
        <div
          v-if="showActionModal && boardStore.getBoards.length >= 1"
          class="board-action__modal"
        >
          <p @click="updateCurrentBoard">Edit Board</p>
          <p @click="deleteCurrentBoard">Delete Board</p>
        </div>
      </Transition>
    </div>
  </header>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import { ThemeMode, Modal, FormState } from "@/model";
import logo from "../../assets/logo-mobile.svg";
import { useLayoutStore } from "@/stores/layout";
import { useBoardStore } from "@/stores/board";

const layoutStore = useLayoutStore();
const boardStore = useBoardStore();
const showActionModal = ref(false);
const currentBoardIndex = computed(() => boardStore.getCurrentBoardIndex);
const themeMode = computed(() => {
  return layoutStore.getThemeMode === ThemeMode.DARK
    ? "ktm-header--dark-mode"
    : "ktm-header--light-mode";
});

/* COMPUTED */
const currentModal = computed(() => layoutStore.getCurrentModal);
const currentBoard = computed(() => {
  if (boardStore.getCurrentBoard) {
    return boardStore.getCurrentBoard.name;
  }
  return "No Board Selected";
});
/* COMPUTED */

/* FUNCTIONS */
function showMobileBoardNav() {
  layoutStore.setCurrentModal(Modal.BOARD_NAV_MODAL);
}
function toggleActionModal() {
  showActionModal.value = !showActionModal.value;
}
function deleteCurrentBoard() {
  toggleActionModal();
  layoutStore.setCurrentModal(Modal.BOARD_DELETE_PROMPT);
}

function updateCurrentBoard() {
  toggleActionModal();
  layoutStore.setBoardFormState(FormState.EDITION);
  layoutStore.setCurrentModal(Modal.BOARD_FORM_MODAL);
}

function createNewTask() {
  showActionModal.value = false;
  layoutStore.setCurrentModal(Modal.TASK_FORM_MODAL);
}
/* FUNCTIONS */
</script>
<style lang="scss" scoped>
@use "../../sass/colors" as c;
@use "../../sass/mixins" as m;
@use "../../sass/typography" as t;
@use "../../sass/layout/_index.scss" as l;
@use "../../sass/helpers/_functions.scss" as f;
.ktm-header {
  transition: all 0.5s ease-in-out;
  display: grid;
  align-items: center;
  grid-template-columns:
    f.toRem(24+16, 12) minmax(f.toRem(143+92, 12), auto)
    f.toRem(48+16, 12)
    f.toRem(5, 12);
  grid-template-rows: 1fr;
  grid-template-areas: "brand board-name new-task board-action";
  padding: f.toRem(16, 12);

  .brand {
    grid-area: brand;
    display: flex;
    .logo {
      width: f.toRem(24, 12);
      height: f.toRem(25, 12);
    }
  }
  .board-name {
    grid-area: board-name;
    display: flex;
    h1 {
      @include t.largeHeading;
      margin-right: f.toRem(8, 12);
    }

    button {
      background-color: transparent;
    }

    svg {
      transition: all 0.5s ease-in-out;
    }

    .chevron--rotated {
      transform: rotateZ(180deg);
    }
  }
  .new-task {
    grid-area: new-task;
    display: flex;
    justify-content: flex-start;

    button {
      border-radius: f.toRem(24, 12);
      background-color: c.$MainPurple;
      width: f.toRem(48, 12);
      height: f.toRem(32, 12);
    }

    button:hover {
      background-color: c.$MainPurpleHover;
    }

    button.new-task--disabled {
      background-color: c.$MediumGrey;
      color: rgba($color: c.$White, $alpha: 0.25);
    }
  }
  .board-action {
    grid-area: board-action;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &__modal {
      position: absolute;
      z-index: 998;
      border-radius: 8px;
      top: f.toRem(37, 12);
      right: 0;
      width: f.toRem(162, 12);
      height: f.toRem(94, 12);
      padding: f.toRem(16, 12);
      box-shadow: 0px 10px 20px rgba(54, 78, 126, 0.25);
      border-radius: 8px;
    }

    &__modal > p {
      @include t.bodyLarge;
      cursor: pointer;
    }

    &__modal > p:first-child {
      margin-bottom: f.toRem(16, 12);
      color: c.$MediumGrey;
    }

    &__modal > p:last-child {
      color: c.$Red;
    }

    button {
      background-color: transparent;
    }
  }

  button {
    border: none;
  }
}

.ktm-header--light-mode {
  background-color: c.$White;
  .brand {
    svg > path {
      fill: c.$Black;
    }
    @include m.breakpoint-up(medium) {
      border-right: 1px solid c.$LinesLight;
    }
  }
  .board-name {
    h1 {
      color: c.$Black;
    }
  }

  .new-task {
    button {
      color: c.$White;
    }
  }
  .board-action {
    &__modal {
      background-color: c.$White;
    }

    button {
      background-color: transparent;
    }
  }
}
.ktm-header--dark-mode {
  background-color: c.$DarkGrey;
  .brand {
    svg > path {
      fill: c.$White;
    }
    @include m.breakpoint-up(medium) {
      border-right: 1px solid c.$LinesDark;
    }
  }
  .board-name {
    h1 {
      color: c.$White;
    }
  }

  .board-action {
    &__modal {
      background-color: c.$VeryDarkGrey;
    }

    button {
      background-color: transparent;
    }
  }

  .new-task {
    button {
      color: c.$White;
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
  .ktm-header {
    height: f.toRem(81, 12);
    display: grid;
    align-items: unset;
    grid-template-columns:
      f.toRem(261, 12) minmax(f.toRem(159+107, 12), auto) f.toRem(164, 12)
      f.toRem(5+24.38+24, 12);
    grid-template-rows: 1fr;
    grid-template-areas: "brand board-name new-task board-action";
    padding: unset;

    .brand {
      grid-area: brand;
      display: flex;
      align-items: center;
      padding: f.toRem(16, 12) 0 f.toRem(16, 12) f.toRem(26, 12);
      .logo {
        margin-right: f.toRem(15.76, 12);
      }
    }
    .board-name {
      grid-area: board-name;
      display: flex;
      padding: f.toRem(28, 12) 0 f.toRem(27, 12) f.toRem(24, 12);
      h1 {
        font-style: normal;
        font-weight: 700;
        font-size: f.toRem(20, 12);
        line-height: f.toRem(25, 12);
        margin-right: unset;
      }
    }

    .new-task {
      grid-area: new-task;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      button {
        @include t.mediumHeading;
        border-radius: f.toRem(24, 12);
        width: f.toRem(164, 12);
        height: f.toRem(48, 12);
      }
    }
    .board-action {
      grid-area: board-action;
      display: flex;
      justify-content: center;
      align-items: center;

      &__modal {
        width: f.toRem(192, 12);
        top: f.toRem(78, 12);
        bottom: f.toRem(0, 12);
        right: f.toRem(24, 12);
      }
      button {
        background-color: transparent;
      }
    }
  }
}

@include m.breakpoint-up(large) {
  .ktm-header {
    display: grid;
    height: f.toRem(96, 12);
    grid-template-columns:
      f.toRem(301, 12) minmax(f.toRem(159+107, 12), auto) f.toRem(164, 12)
      f.toRem(5+24.38+24, 12);
    grid-template-rows: 1fr;
    grid-template-areas: "brand board-name new-task board-action";

    .brand {
      grid-area: brand;
    }

    /* revoir la hauteur de "Platform Launch" */
    .board-name {
      grid-area: board-name;
      h1 {
        @include t.XLargeHeading;
      }
    }

    .new-task {
      grid-area: new-task;
    }
    .board-action {
      grid-area: board-action;

      &__modal {
        top: f.toRem(90, 12);
      }
    }
  }
}
</style>
