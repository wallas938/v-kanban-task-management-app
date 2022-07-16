<template>
  <div class="delete-prompt delete-prompt--light-mode">
    <h1>Delete This Board?</h1>
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
<script lang="ts" setup></script>
<style lang="scss" scoped>
@use "../sass/colors" as c;
@use "../sass/typography" as t;
@use "../sass/helpers/functions" as f;
@use "../sass/mixins" as m;
@use "../sass/layout/index" as l;

.delete-prompt {
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

.delete-prompt--light-mode {
  .cta {
    .cancel {
      @include l.ktm-btn-secondary-light;
    }
  }
}

.delete-prompt--dark-mode {
  .cta {
    .cancel {
      @include l.ktm-btn-secondary-dark;
    }
  }
}

@include m.breakpoint-up(medium) {
  .delete-prompt {
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
