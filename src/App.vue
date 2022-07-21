<script setup lang="ts">
import { ref } from "vue";
import KTMHeader from "./components/layout/KTMHeader.vue";
import KTMSidebar from "./components/layout/KTMSidebar.vue";
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
    <!-- HEADER -->
    <KTMHeader />
    <!-- HEADER -->
    <!-- MAIN -->
    <main>
      <!-- TABLET AND DESKTOP SIDEBAR -->
      <KTMSidebar />
      <!-- TABLET AND DESKTOP SIDEBAR -->
      <!-- BOARD CONTENT -->
      <section class="boards">
        <div class="no-boards">
          <h1>This board is empty. Create a new column to get started.</h1>
          <button>+ Add New column</button>
        </div>
      </section>
      <!-- BOARD CONTENT -->
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
  height: 100%;
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
  background-color: c.$LightGreyBG;
}
.home-page--dark-mode {
  background-color: c.$VeryDarkGrey;
}

@include m.breakpoint-up(medium) {
  .home-page {
    display: flex;
    flex-direction: column;
    main {
      flex: 1;
      display: flex;
      .boards {
        flex: 1;
        .no-boards {
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
      .boards {
        .no-boards {
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
