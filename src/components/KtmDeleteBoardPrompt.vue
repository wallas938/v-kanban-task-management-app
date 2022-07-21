<template>
  <div class="delete-board-prompt" :class="themeMode">
    <h1>Delete This board?</h1>
    <p>
      Are you sure you want to delete the ‘Platform Launch’ board? This action
      will remove all columns and tasks and cannot be reversed.
    </p>
    <div class="cta">
      <button class="delete">Delete</button>
      <button class="cancel">Cancel</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ThemeMode } from "@/model";
import { useLayoutStore } from "@/stores/layout";
import { computed } from "vue";

const layout = useLayoutStore();
const themeMode = computed(() => {
  return layout.getThemeMode === ThemeMode.DARK
    ? "delete-board-prompt--dark-mode"
    : "delete-board-prompt--light-mode";
});
</script>
<style lang="scss" scoped>
@use "../sass/colors" as c;
@use "../sass/typography" as t;
@use "../sass/helpers/functions" as f;
@use "../sass/mixins" as m;
@use "../sass/layout/index" as l;

.delete-board-prompt {
  transition: all 0.5s ease-in-out;
  h1,
  p {
    margin-bottom: f.toRem(24, 12);
  }
  h1 {
    @include t.largeHeading;
    margin-bottom: f.toRem(24, 12);
    color: c.$Red;
  }

  p {
    @include t.bodyLarge;
    color: c.$MediumGrey;
  }

  .cta {
    display: flex;
    flex-direction: column;
    button {
      @include l.ktm-button;
      padding-top: f.toRem(8, 12);
      padding-bottom: f.toRem(9, 12);
    }

    .delete {
      @include l.ktm-btn-destructive;
      margin-bottom: f.toRem(16, 12);
    }
  }
}

.delete-board-prompt--light-mode {
  .cta {
    .cancel {
      @include l.ktm-btn-secondary-light;
    }
  }
}

.delete-board-prompt--dark-mode {
  .cta {
    .cancel {
      @include l.ktm-btn-secondary-dark;
    }
  }
}

@include m.breakpoint-up(medium) {
  .delete-board-prompt {
    .cta {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      button {
        width: f.toRem(200, 12);
      }

      .delete {
        margin-bottom: unset;
      }
    }
  }
}
</style>
