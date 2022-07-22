<template>
  <div class="mobile-board-nav hide-for-tablet-and-desktop" :class="themeMode">
    <h2>ALL BOARDS ({{ boards.length }})</h2>
    <nav>
      <ul>
        <li v-for="(board, index) in boards" :key="index" class="board">
          <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
              fill="#828FA3"
            />
          </svg>
          <span>{{ board.name }}</span>
        </li>
        <li class="new-board" @click="createBoard">
          <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
              fill="#828FA3"
            />
          </svg>
          <span>+ Create New Board</span>
        </li>
      </ul>
    </nav>
    <div class="cta">
      <div class="theme-switch">
        <img :src="lightIcon" alt="light-icon" />
        <div
          @click="toggle"
          class="switch switch--light"
          :class="switchCirclePosition"
        >
          <span class="circle"></span>
        </div>
        <img :src="darkIcon" alt="light-icon" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import lightIcon from "../assets/icon-light-theme.svg";
import darkIcon from "../assets/icon-dark-theme.svg";
import { computed } from "vue";
import { Modal, ThemeMode } from "@/model";
import { useLayoutStore } from "@/stores/layout";
import { useBoardStore } from "@/stores/board";

const layoutStore = useLayoutStore();
const boardStore = useBoardStore();

const themeMode = computed(() => {
  return layoutStore.getThemeMode === ThemeMode.DARK
    ? "mobile-board-nav--dark-mode"
    : "mobile-board-nav--light-mode";
});

const switchCirclePosition = computed(() => {
  return layoutStore.getThemeMode === ThemeMode.DARK
    ? "switch--dark"
    : "switch--light";
});

const boards = computed(() => boardStore.getBoards);

function toggle() {
  layoutStore.toggle();
}

function createBoard() {
  layoutStore.setCurrentModal(Modal.BOARD_FORM_MODAL);
}
</script>
<style lang="scss" scoped>
@use "../sass/colors" as c;
@use "../sass/typography" as t;
@use "../sass/helpers/functions" as f;
@use "../sass/mixins" as m;

.mobile-board-nav {
  border-radius: f.toRem(8, 12);
  transition: all 0.5s ease-in-out;
  padding: f.toRem(16, 12) 0;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 10px 20px rgba(54, 78, 126, 0.25);
  h2 {
    padding-left: f.toRem(24, 12);
    font-size: f.toRem(12, 12);
    font-weight: 700;
    font-style: normal;
    line-height: f.toRem(15.12, 12);
    letter-spacing: 2.4px;
    margin-bottom: f.toRem(19, 12);
    color: c.$MediumGrey;
  }

  nav {
    margin-bottom: f.toRem(16, 12);
    > ul > li {
      transition: all 0.2s ease-in-out;
      cursor: pointer;
      display: flex;
      align-items: center;
      @include t.mediumHeading;
      color: c.$MediumGrey;
      padding: f.toRem(14, 12) 0 f.toRem(15, 12) f.toRem(24, 12);
      svg {
        margin-right: f.toRem(12, 12);
      }
    }

    > ul > li.board {
      border-radius: 0px f.toRem(100, 12) f.toRem(100, 12) 0px;
      width: f.toRem(240, 12);
    }

    > ul > li.new-board {
      color: c.$MainPurple;
      svg > path {
        fill: c.$MainPurple;
      }
    }

    > ul > li.board.board--active {
      color: c.$White !important;
      background-color: c.$MainPurple !important;
      svg > path {
        fill: c.$White !important;
      }
    }
  }

  .cta {
    position: relative;
    padding-left: f.toRem(13, 12);
    padding-right: f.toRem(12, 12);
    .theme-switch {
      transition: all 0.2s ease-in-out;
      border-radius: f.toRem(6, 12);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: f.toRem(14, 12) f.toRem(57.33, 12);
      img {
        width: f.toRem(18.33, 12);
        height: f.toRem(18.33, 12);
      }

      .switch {
        transition: all 0.2s ease-in-out;
        cursor: pointer;
        position: relative;
        width: f.toRem(40, 12);
        height: f.toRem(20, 12);
        border-radius: f.toRem(12, 12);
        background-color: c.$MainPurple;
        padding: f.toRem(3, 12);
        .circle {
          transition: all 0.2s ease-in-out;
          position: absolute;
          width: f.toRem(14, 12);
          height: f.toRem(14, 12);
          background-color: c.$White;
          border-radius: 100%;
        }

        &:hover {
          background-color: c.$MainPurpleHover;
        }
      }

      .switch--light {
        .circle {
          transform: translateX(0);
        }
      }

      .switch--dark {
        .circle {
          transform: translateX(20px);
        }
      }
    }
  }
}
.mobile-board-nav--light-mode {
  background-color: c.$White;
  @include m.breakpoint-up(medium) {
    background-color: c.$White;
    border-right: 1px solid c.$LinesLight;
  }

  nav {
    > ul > li.board:hover {
      background-color: rgba($color: c.$MainPurple, $alpha: 0.1);
      color: c.$MainPurple;
      svg > path {
        fill: c.$MainPurple;
      }
    }
  }
  .cta {
    .theme-switch {
      background-color: c.$LightGreyBG;
    }
  }
}
.mobile-board-nav--dark-mode {
  background-color: c.$DarkGrey;
  @include m.breakpoint-up(medium) {
    background-color: c.$DarkGrey;
    border-right: 1px solid c.$LinesDark;
  }

  nav {
    > ul > li.board:hover {
      background-color: c.$White;
      color: c.$MainPurple;
      svg > path {
        fill: c.$MainPurple;
      }
    }
  }
  .cta {
    .theme-switch {
      background-color: c.$VeryDarkGrey;
    }
  }
}
</style>
