<script setup lang="ts">
import { ref } from "vue";
import logo from "./assets/logo-mobile.svg";
const cols = ref([
  {
    name: "Todo",
    tasks: [
      {
        title: "Build UI for onboarding flow",
        description: "",
        status: "Todo",
        subtasks: [
          {
            title: "Sign up page",
            isCompleted: true,
          },
          {
            title: "Sign in page",
            isCompleted: false,
          },
          {
            title: "Welcome page",
            isCompleted: false,
          },
        ],
      },
      {
        title: "Build UI for search",
        description: "",
        status: "Todo",
        subtasks: [
          {
            title: "Search page",
            isCompleted: false,
          },
        ],
      },
      {
        title: "Build settings UI",
        description: "",
        status: "Todo",
        subtasks: [
          {
            title: "Account page",
            isCompleted: false,
          },
          {
            title: "Billing page",
            isCompleted: false,
          },
        ],
      },
      {
        title: "QA and test all major user journeys",
        description:
          "Once we feel version one is ready, we need to rigorously test it both internally and externally to identify any major gaps.",
        status: "Todo",
        subtasks: [
          {
            title: "Internal testing",
            isCompleted: false,
          },
          {
            title: "External testing",
            isCompleted: false,
          },
        ],
      },
    ],
  },
  {
    name: "Doing",
    tasks: [
      {
        title: "Design settings and search pages",
        description: "",
        status: "Doing",
        subtasks: [
          {
            title: "Settings - Account page",
            isCompleted: true,
          },
          {
            title: "Settings - Billing page",
            isCompleted: true,
          },
          {
            title: "Search page",
            isCompleted: false,
          },
        ],
      },
      {
        title: "Add account management endpoints",
        description: "",
        status: "Doing",
        subtasks: [
          {
            title: "Upgrade plan",
            isCompleted: true,
          },
          {
            title: "Cancel plan",
            isCompleted: true,
          },
          {
            title: "Update payment method",
            isCompleted: false,
          },
        ],
      },
      {
        title: "Design onboarding flow",
        description: "",
        status: "Doing",
        subtasks: [
          {
            title: "Sign up page",
            isCompleted: true,
          },
          {
            title: "Sign in page",
            isCompleted: false,
          },
          {
            title: "Welcome page",
            isCompleted: false,
          },
        ],
      },
      {
        title: "Add search enpoints",
        description: "",
        status: "Doing",
        subtasks: [
          {
            title: "Add search endpoint",
            isCompleted: true,
          },
          {
            title: "Define search filters",
            isCompleted: false,
          },
        ],
      },
      {
        title: "Add authentication endpoints",
        description: "",
        status: "Doing",
        subtasks: [
          {
            title: "Define user model",
            isCompleted: true,
          },
          {
            title: "Add auth endpoints",
            isCompleted: false,
          },
        ],
      },
      {
        title:
          "Research pricing points of various competitors and trial different business models",
        description:
          "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
        status: "Doing",
        subtasks: [
          {
            title: "Research competitor pricing and business models",
            isCompleted: true,
          },
          {
            title: "Outline a business model that works for our solution",
            isCompleted: false,
          },
          {
            title:
              "Talk to potential customers about our proposed solution and ask for fair price expectancy",
            isCompleted: false,
          },
        ],
      },
    ],
  },
  {
    name: "Done",
    tasks: [
      {
        title: "Conduct 5 wireframe tests",
        description:
          "Ensure the layout continues to make sense and we have strong buy-in from potential users.",
        status: "Done",
        subtasks: [
          {
            title: "Complete 5 wireframe prototype tests",
            isCompleted: true,
          },
        ],
      },
      {
        title: "Create wireframe prototype",
        description:
          "Create a greyscale clickable wireframe prototype to test our asssumptions so far.",
        status: "Done",
        subtasks: [
          {
            title: "Create clickable wireframe prototype in Balsamiq",
            isCompleted: true,
          },
        ],
      },
      {
        title: "Review results of usability tests and iterate",
        description:
          "Keep iterating through the subtasks until we're clear on the core concepts for the app.",
        status: "Done",
        subtasks: [
          {
            title: "Meet to review notes from previous tests and plan changes",
            isCompleted: true,
          },
          {
            title: "Make changes to paper prototypes",
            isCompleted: true,
          },
          {
            title: "Conduct 5 usability tests",
            isCompleted: true,
          },
        ],
      },
      {
        title:
          "Create paper prototypes and conduct 10 usability tests with potential customers",
        description: "",
        status: "Done",
        subtasks: [
          {
            title: "Create paper prototypes for version one",
            isCompleted: true,
          },
          {
            title: "Complete 10 usability tests",
            isCompleted: true,
          },
        ],
      },
      {
        title: "Market discovery",
        description:
          "We need to define and refine our core product. Interviews will help us learn common pain points and help us define the strongest MVP.",
        status: "Done",
        subtasks: [
          {
            title: "Interview 10 prospective customers",
            isCompleted: true,
          },
        ],
      },
      {
        title: "Competitor analysis",
        description: "",
        status: "Done",
        subtasks: [
          {
            title: "Find direct and indirect competitors",
            isCompleted: true,
          },
          {
            title: "SWOT analysis for each competitor",
            isCompleted: true,
          },
        ],
      },
      {
        title: "Research the market",
        description:
          "We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.",
        status: "Done",
        subtasks: [
          {
            title: "Write up research analysis",
            isCompleted: true,
          },
          {
            title: "Calculate TAM",
            isCompleted: true,
          },
        ],
      },
    ],
  },
]);

const show = ref(false);
const boards = ref([]);
</script>

<template>
  <!-- Ajouter un wrapper pour l'animation de la modal -->
  <!-- <button @click="show = !show">CLICK</button> -->
  <Teleport to="body">
    <ktm-modal :show="false"></ktm-modal>
  </Teleport>
  <div class="home-page home-page--dark-mode">
    <header>
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
        <h1>Platform Launch</h1>
        <button class="nav-board-btn hide-for-tablet-and-desktop">
          <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
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
        <button>
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
        <button>
          <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
            <g fill="#828FA3" fill-rule="evenodd">
              <circle cx="2.308" cy="2.308" r="2.308" />
              <circle cx="2.308" cy="10" r="2.308" />
              <circle cx="2.308" cy="17.692" r="2.308" />
            </g>
          </svg>
        </button>
      </div>
    </header>
    <main>
      <aside class="boards-nav hide-for-mobile"></aside>
      <section class="boards">
        <div class="no-boards">
          <h1>This board is empty. Create a new column to get started.</h1>
          <button>+ Add New column</button>
        </div>
      </section>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@use "sass/colors" as c;
@use "sass/mixins" as m;
@use "sass/typography" as t;
@use "sass/layout/_index.scss" as l;
@use "sass/helpers/_functions.scss" as f;

.home-page {
  header {
    display: grid;
    align-items: center;
    grid-template-columns:
      f.toRem(24+16, 12) minmax(f.toRem(143+92, 12), auto) f.toRem(48+16, 12)
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
    }
    .board-action {
      grid-area: board-action;
      display: flex;
      justify-content: center;
      align-items: center;
      button {
        background-color: transparent;
      }
    }

    button {
      border: none;
    }
  }
  main {
    .no-boards {
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
    }
  }
}
.home-page--light-mode {
  header {
    .brand {
      span {
        color: c.$Black;
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
  }
}
.home-page--dark-mode {
  background-color: c.$VeryDarkGrey;
  header {
    background-color: c.$DarkGrey;
    .brand {
      span {
        color: c.$White;
      }
    }
    .board-name {
      h1 {
        color: c.$White;
      }
    }

    .new-task {
      button {
        color: c.$White;
      }
    }
  }
}

@include m.breakpoint-up(medium) {
  .home-page {
    header {
      display: grid;
      align-items: unset;
      grid-template-columns:
        f.toRem(152.53+82.47, 12) minmax(f.toRem(159+107, 12), auto) f.toRem(
          164,
          12
        )
        f.toRem(5+24.38+24, 12);
      grid-template-rows: 1fr;
      grid-template-areas: "brand board-name new-task board-action";
      padding: unset;
      /* padding: f.toRem(16, 12) f.toRem(24.38, 12) f.toRem(16, 12)
        f.toRem(26, 12); */

      .brand {
        grid-area: brand;
        display: flex;
        align-items: center;
        border-right: 1px solid c.$LinesDark;
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
        button {
          background-color: transparent;
        }
      }
    }

    main {
      .no-boards {
        padding-left: f.toRem(24, 12);
        padding-right: f.toRem(24, 12);

        h1 {
          margin-bottom: f.toRem(24, 12);
        }
      }
    }
  }
}

@include m.breakpoint-up(large) {
  .home-page {
    header {
      display: grid;
      grid-template-columns:
        f.toRem(152.53+113.47, 12) minmax(f.toRem(159+107, 12), auto) f.toRem(
          164,
          12
        )
        f.toRem(5+24.38+24, 12);
      grid-template-rows: 1fr;
      grid-template-areas: "brand board-name new-task board-action";
      /* padding: f.toRem(20, 12) f.toRem(32.38, 12) f.toRem(28, 12)
        f.toRem(24, 12); */

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
      }
    }
  }
}
</style>
