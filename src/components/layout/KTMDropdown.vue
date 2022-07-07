<template>
  <div class="root dark-mode">
    <div class="status" :class="{ 'status--active': isOpen }" @click="toggle">
      <span>
        <slot>{{ currentStatus }}</slot>
      </span>
    </div>
    <transition-group>
      <ul v-if="isOpen" class="columns">
        <li
          @click="onSelectStatus(name)"
          v-for="(name, index) in columnNames"
          :key="index"
        >
          {{ name }}
        </li>
      </ul>
    </transition-group>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";

const currentStatus = ref("");
const isOpen = ref(false);

const props: any = defineProps({
  columnNames: {
    type: Object as () => string[],
    default: [],
    required: true,
  },
  currentColumn: {
    type: String,
    default: null,
    required: false,
  },
});
/* verify if a currentStatus already exists (in edit mode) */
initStatus();

const emits = defineEmits<{
  (e: "select", name: string): void;
}>();

function toggle() {
  isOpen.value = !isOpen.value;
}

function updateStatus(status: string) {
  currentStatus.value = status;
}

function onSelectStatus(columnName: string) {
  emits("select", columnName);
  updateStatus(columnName);
  toggle();
}

function initStatus() {
  if (props.currentColumn?.toString().trim()) {
    currentStatus.value = props.currentColumn;
    return;
  }
  currentStatus.value = props.columnNames[0];
}

/* 
  Add this function to the component that will wrap the KTMDropdown
  it returns from a Column array only names

  const getColumnNames = computed(() =>
  cols.value.map((col: Column) => col.name)

//Template
  <ktm-dropdown
    @select="onSelectColumn"
    :columnNames="getColumnNames"
    :currentColumn="''"
  ></ktm-dropdown>
); 
*/
</script>
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

/* Dropdown Animation */
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
