<script setup lang="ts">
import { computed, ref } from "vue";
import KTMHeader from "./components/layout/KTMHeader.vue";
import KTMSidebar from "./components/layout/KTMSidebar.vue";
import { useLayoutStore } from "./stores/layout";
import { Modal, ThemeMode } from "@/model";
import { useBoardStore } from "./stores/board";
import KtmColumnList from "./components/KtmColumnList.vue";
const layoutStore = useLayoutStore();
const boardStore = useBoardStore();
const showSidebar = ref(true);

/* COMPUTED */
const boards = computed(() => boardStore.getBoards);
const themeMode = computed(() => {
  return layoutStore.getThemeMode === ThemeMode.DARK
    ? "home-page--dark-mode"
    : "home-page--light-mode";
});
const noColumnsText = computed(() => {
  return boardStore.getBoards.length < 1
    ? "Start creating a new Board"
    : "This board is empty. Create a new column to get started.";
});
const isModalActif = computed(() => {
  return layoutStore.getCurrentModal !== Modal.NO_MODAL;
});
/* COMPUTED */

function onHideSidebar() {
  showSidebar.value = false;
}

function onShowSidebar() {
  showSidebar.value = true;
}

function createBoard() {
  layoutStore.setCurrentModal(Modal.BOARD_FORM_MODAL);
}
</script>
<template>
  <!-- Ajouter un wrapper pour l'animation de la modal -->
  <!-- <button @click="show = !show">CLICK</button> -->
  <!-- MODALS -->
  <Teleport to="body">
    <ktm-modal :show="isModalActif"></ktm-modal>
  </Teleport>
  <!-- MODALS -->
  <div class="home-page" :class="themeMode">
    <!-- HEADER -->
    <KTMHeader />
    <!-- HEADER -->
    <!-- MAIN -->
    <main>
      <!-- TABLET AND DESKTOP SIDEBAR -->
      <Transition name="sidebar">
        <KTMSidebar v-if="showSidebar" @hide-sidebar="onHideSidebar" />
      </Transition>
      <!-- TABLET AND DESKTOP SIDEBAR -->

      <!-- BOARD CONTENT -->
      <section class="columns">
        <div v-if="boardStore.getBoards.length < 1" class="no-columns">
          <h1>You have no Boards available, start creating a new Board</h1>
          <button @click="createBoard" class="create-column">
            + Add New Board
          </button>
        </div>
        <KtmColumnList v-else />
      </section>
      <!-- BOARD CONTENT -->

      <!-- HIDDEN SIDEBAR -->
      <Transition name="hidden-sidebar">
        <div v-if="!showSidebar" @click="onShowSidebar" class="hidden-sidebar">
          <svg width="18" height="16" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.522 11.223a4.252 4.252 0 0 1-3.654-5.22l3.654 5.22ZM9 12.25A8.685 8.685 0 0 1 1.5 8a8.612 8.612 0 0 1 2.76-2.864l-.86-1.23A10.112 10.112 0 0 0 .208 7.238a1.5 1.5 0 0 0 0 1.524A10.187 10.187 0 0 0 9 13.75c.414 0 .828-.025 1.239-.074l-1-1.43A8.88 8.88 0 0 1 9 12.25Zm8.792-3.488a10.14 10.14 0 0 1-4.486 4.046l1.504 2.148a.375.375 0 0 1-.092.523l-.648.453a.375.375 0 0 1-.523-.092L3.19 1.044A.375.375 0 0 1 3.282.52L3.93.068a.375.375 0 0 1 .523.092l1.735 2.479A10.308 10.308 0 0 1 9 2.25c3.746 0 7.031 2 8.792 4.988a1.5 1.5 0 0 1 0 1.524ZM16.5 8a8.674 8.674 0 0 0-6.755-4.219A1.75 1.75 0 1 0 12.75 5v-.001a4.25 4.25 0 0 1-1.154 5.366l.834 1.192A8.641 8.641 0 0 0 16.5 8Z"
              fill="#828FA3"
            />
          </svg>
        </div>
      </Transition>
      <!-- HIDDEN SIDEBAR -->
    </main>
    <!-- MAIN -->
  </div>
</template>

<style lang="scss" scoped>
@use "sass/colors" as c;
@use "sass/mixins" as m;
@use "sass/typography" as t;
@use "sass/layout/_index.scss" as l;
@use "sass/helpers/_functions.scss" as f;

.home-page {
  transition: all 0.5s ease-in-out;
  height: 100%;
  display: flex;
  flex-direction: column;
  main {
    position: relative;
    flex: 1;
    .no-columns {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: f.toRem(211, 12) f.toRem(16, 12);

      h1 {
        @include t.largeHeading;
        color: c.$MediumGrey;
        text-align: center;
        margin-bottom: f.toRem(25, 12);
      }

      button {
        @include l.ktm-button;
        @include l.ktm-btn-primary;
        @include t.mediumHeading;
        border-radius: f.toRem(24, 12);
        padding: f.toRem(15, 12) f.toRem(18, 12) f.toRem(14, 12) f.toRem(17, 12);
      }

      & > .create-column.create-column--disabled {
        background-color: c.$MediumGrey;
        color: rgba($color: c.$White, $alpha: 0.25);
      }
    }

    .columns {
      overflow: auto;
      height: 100%;
      padding: f.toRem(23, 12) f.toRem(16, 12);
    }

    .hidden-sidebar {
      cursor: pointer;
      position: absolute;
      bottom: f.toRem(32, 12);
      left: 0;
      padding: f.toRem(19, 12) f.toRem(22, 12) f.toRem(18.78, 12)
        f.toRem(18, 12);
      border-radius: 0px 100px 100px 0px;
      background-color: c.$MainPurple;

      & > svg > path {
        fill: c.$White;
      }

      &:hover {
        background-color: c.$MainPurpleHover;
      }
    }
  }
}
.home-page--light-mode {
  background-color: c.$LightGreyBG;
}
.home-page--dark-mode {
  background-color: c.$VeryDarkGrey;
}

/* Animations */

/* SIDEBAR ANIMATIONS */
.sidebar-enter-active {
  animation: s-translate-in 0.6s;
}
.sidebar-leave-active {
  animation: s-translate-out 0.5s;
}
@keyframes s-translate-in {
  0% {
    transform: translateX(-261px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes s-translate-out {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-261px);
  }
}

@include m.breakpoint-up(large) {
  @keyframes s-translate-in {
    0% {
      transform: translateX(-301px);
    }
    100% {
      transform: translateX(0);
    }
  }

  @keyframes s-translate-out {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-301px);
    }
  }
}

/* SIDEBAR ANIMATIONS */

/* HIDDEN SIDEBAR ANIMATIONS */

.hidden-sidebar-enter-active {
  animation: hs-translate-in 0.6s;
}
.hidden-sidebar-leave-active {
  animation: hs-translate-out 0.5s;
}
@keyframes hs-translate-in {
  0% {
    transform: translateX(-56px);
  }
  60% {
    transform: translateX(0);
  }
  90% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes hs-translate-out {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-56px);
  }
}

/* HIDDEN SIDEBAR ANIMATIONS */

@include m.breakpoint-up(medium) {
  .home-page {
    display: flex;
    flex-direction: column;
    main {
      flex: 1;
      display: flex;
      .columns {
        width: 100%;
        min-width: f.toRem(508, 12);
        .no-columns {
          padding: f.toRem(328, 12) f.toRem(24, 12) 0 f.toRem(24, 12);
          h1 {
            margin-bottom: f.toRem(24, 12);
          }
        }
      }
    }
  }
}

@include m.breakpoint-up(large) {
  .home-page {
    main {
      .columns {
        .no-columns {
          padding: f.toRem(364, 12) 0 0 0;
          h1 {
            margin-bottom: f.toRem(32, 12);
          }
        }
      }
    }
  }
}
</style>
