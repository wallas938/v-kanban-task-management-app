<template>
  <aside class="sidebar hide-for-mobile" :class="themeMode">
    <h2>ALL BOARDS ({{ boards.length }})</h2>
    <div class="sidebar-content">
      <nav>
        <!-- USE 'board--active' class -->
        <ul>
          <li
            @click="setCurrentBoard(index)"
            v-for="(board, index) in boards"
            :key="index"
            class="board"
            :class="{ 'board--active': getCurrentBoardIndex === index }"
          >
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
        <div class="hide-sidebar" @click="hideSidebar">
          <svg width="18" height="16" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.522 11.223a4.252 4.252 0 0 1-3.654-5.22l3.654 5.22ZM9 12.25A8.685 8.685 0 0 1 1.5 8a8.612 8.612 0 0 1 2.76-2.864l-.86-1.23A10.112 10.112 0 0 0 .208 7.238a1.5 1.5 0 0 0 0 1.524A10.187 10.187 0 0 0 9 13.75c.414 0 .828-.025 1.239-.074l-1-1.43A8.88 8.88 0 0 1 9 12.25Zm8.792-3.488a10.14 10.14 0 0 1-4.486 4.046l1.504 2.148a.375.375 0 0 1-.092.523l-.648.453a.375.375 0 0 1-.523-.092L3.19 1.044A.375.375 0 0 1 3.282.52L3.93.068a.375.375 0 0 1 .523.092l1.735 2.479A10.308 10.308 0 0 1 9 2.25c3.746 0 7.031 2 8.792 4.988a1.5 1.5 0 0 1 0 1.524ZM16.5 8a8.674 8.674 0 0 0-6.755-4.219A1.75 1.75 0 1 0 12.75 5v-.001a4.25 4.25 0 0 1-1.154 5.366l.834 1.192A8.641 8.641 0 0 0 16.5 8Z"
              fill="#828FA3"
            />
          </svg>
          <span>Hide Sidebar</span>
        </div>
      </div>
    </div>
  </aside>
</template>
<script lang="ts" setup>
import lightIcon from "../../assets/icon-light-theme.svg";
import darkIcon from "../../assets/icon-dark-theme.svg";
import { useLayoutStore } from "@/stores/layout";
import { Modal, ThemeMode } from "@/model";
import { computed } from "vue";
import { useBoardStore } from "@/stores/board";

const emits = defineEmits<{
  (e: "hide-sidebar"): void;
}>();

function hideSidebar() {
  emits("hide-sidebar");
}

const layoutStore = useLayoutStore();
const boardStore = useBoardStore();

const boards = computed(() => boardStore.getBoards);
const getCurrentBoardIndex = computed(() => boardStore.getCurrentBoardIndex);
const themeMode = computed(() => {
  return layoutStore.getThemeMode === ThemeMode.DARK
    ? "sidebar--dark-mode"
    : "sidebar--light-mode";
});

const switchCirclePosition = computed(() => {
  return layoutStore.getThemeMode === ThemeMode.DARK
    ? "switch--dark"
    : "switch--light";
});

function toggle() {
  layoutStore.toggle();
}

function createBoard() {
  layoutStore.setCurrentModal(Modal.BOARD_FORM_MODAL);
}

function setCurrentBoard(index: number) {
  boardStore.setCurrentBoard(index);
}
</script>
<style lang="scss" scoped>
@use "../../sass/colors" as c;
@use "../../sass/mixins" as m;
@use "../../sass/typography" as t;
@use "../../sass/layout/_index.scss" as l;
@use "../../sass/helpers/_functions.scss" as f;

.sidebar {
  transition: all 0.5s ease-in-out;
  width: f.toRem(261, 12);
  padding: f.toRem(31, 12) 0 f.toRem(96, 12) 0;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
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

  .sidebar-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    nav {
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
        transition: all 0.5s ease-in-out;
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

      .hide-sidebar {
        transition: all 0.2s ease-in-out;
        position: absolute;
        bottom: f.toRem(-64, 12);
        padding: f.toRem(14, 12) f.toRem(94, 12) f.toRem(14, 12) f.toRem(24, 12);
        left: f.toRem(0, 12);
        cursor: pointer;
        display: flex;
        align-items: center;
        border-radius: 0px 100px 100px 0px;
        svg {
          margin-right: f.toRem(10, 12);
        }

        span {
          font-style: normal;
          font-weight: 700;
          font-size: f.toRem(15, 12);
          line-height: f.toRem(19, 12);
          color: c.$MediumGrey;
        }
      }
    }
  }
}

.sidebar--light-mode {
  @include m.breakpoint-up(medium) {
    background-color: c.$White;
    border-right: 1px solid c.$LinesLight;
  }

  .sidebar-content {
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

      .hide-sidebar:hover {
        background-color: rgba($color: c.$MainPurple, $alpha: 0.1);
        svg > path {
          fill: c.$MainPurple;
        }

        span {
          color: c.$MainPurple;
        }
      }
    }
  }
}
.sidebar--dark-mode {
  @include m.breakpoint-up(medium) {
    background-color: c.$DarkGrey;
    border-right: 1px solid c.$LinesDark;
  }

  .sidebar-content {
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

      .hide-sidebar:hover {
        background-color: c.$White;
        svg > path {
          fill: c.$MainPurple;
        }

        span {
          color: c.$MainPurple;
        }
      }
    }
  }
}

@include m.breakpoint-up(large) {
  .sidebar {
    width: f.toRem(301, 12);
    padding: f.toRem(31, 12) 0 f.toRem(88, 12) 0;
    h2 {
      padding-left: f.toRem(32, 12);
    }

    .sidebar-content {
      nav {
        > ul > li {
          padding: f.toRem(14, 12) 0 f.toRem(15, 12) f.toRem(32, 12);
          svg {
            margin-right: f.toRem(16, 12);
          }
        }

        > ul > li.board {
          width: f.toRem(278, 12);
        }
      }

      .cta {
        padding-left: f.toRem(24, 12);
        padding-right: f.toRem(25, 12);
        .theme-switch {
          padding: f.toRem(14, 12) f.toRem(66.33, 12) f.toRem(14, 12)
            f.toRem(64, 12);
        }

        .hide-sidebar {
          bottom: f.toRem(-56, 12);
          padding-left: f.toRem(31, 12);
          padding-right: f.toRem(116, 12);

          svg {
            margin-right: f.toRem(15, 12);
          }

          span {
            color: c.$MediumGrey;
          }
        }
      }
    }
  }
}
</style>
