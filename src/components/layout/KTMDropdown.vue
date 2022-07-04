<template>
  <div class="root dark-mode">
    <div class="status">
      <span>
        <slot>Doing</slot>
      </span>
    </div>
    <ul class="columns">
      <li>Todo</li>
      <li>Doing</li>
      <li>Done</li>
    </ul>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
@use "../../sass/colors" as c;
@use "../../sass/typography" as t;
@use "../../sass/helpers/functions" as f;
.root {
  cursor: pointer;

  .status {
    position: relative;
    border-radius: 4px;
    height: f.toRem(40, 12);
    margin-bottom: f.toRem(7, 12);
    padding: f.toRem(8, 12) f.toRem(16.75, 12) f.toRem(16, 12) f.toRem(9, 12);
    &--active {
      border: 1px solid rgba($color: c.$MainPurple, $alpha: 1);
    }
    & > span {
      @include t.bodyLarge;
    }
    &::after {
      position: absolute;
      content: url("../../assets/icon-chevron-down.svg");
      right: f.toRem(16, 12);
    }
  }

  .columns {
    border-radius: 4px;
    padding: f.toRem(16, 12);
    & > li {
      @include t.bodyLarge;
    }
    & > li:not(:last-child) {
      margin-bottom: f.toRem(8, 12);
    }
  }
}

.light-mode {
  .status {
    background-color: c.$White;
    border: 1px solid rgba($color: c.$MainPurple, $alpha: 0.25);
    &--active {
      border: 1px solid rgba($color: c.$MainPurple, $alpha: 1);
    }
    & > span {
      color: c.$Black;
    }
  }

  .columns {
    background-color: c.$White;
    & > li {
      color: c.$MediumDark;
    }
  }
}

.dark-mode {
  .status {
    background-color: c.$VeryDarkGrey;
    border: 1px solid rgba($color: c.$MediumDark, $alpha: 0.25);
    &--active {
      border: 1px solid rgba($color: c.$MainPurple, $alpha: 1);
    }
    & > span {
      color: c.$White;
    }
  }

  .columns {
    background-color: c.$VeryDarkGrey;
    & > li {
      color: c.$MediumDark;
    }
  }
}
</style>
