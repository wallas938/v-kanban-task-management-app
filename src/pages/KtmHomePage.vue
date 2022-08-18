<template>
  <div class="login-page">
    <img :src="logoIcon" alt="app logo" />
    <form class="login-form">
      <h1>
        {{ formState === FormState.AUTHENTIFICATION ? "Log In" : "Sign Up" }}
      </h1>
      <div
        class="field email"
        :class="{
          'field--error':
            !emailMeta.valid && emailMeta.dirty && !emailMeta.pending,
        }"
      >
        <label for="email">Email</label>
        <input v-model="email" type="email" name="email" />
      </div>
      <div
        class="field password"
        :class="{
          'field--error':
            !passwordMeta.valid && passwordMeta.dirty && !passwordMeta.pending,
        }"
      >
        <label for="password">Password</label>
        <input v-model="password" type="password" name="password" />

        <small v-if="formState === FormState.REGISTRATION"
          ><i
            >Minimum eight characters, at least one letter and one number</i
          ></small
        >
      </div>
      <Transition>
        <div
          v-if="formState === FormState.REGISTRATION"
          class="field passwordConfirm"
          :class="{
            'passwordConfirmf--error':
              checkNonEqualPassword && passwordConfirmMeta.dirty,
          }"
        >
          <label for="passwordConfirm">Confirm Password</label>
          <input
            v-model="passwordConfirm"
            type="password"
            name="passwordConfirm"
          />
          <small><i>Enter password again</i></small>
        </div>
      </Transition>
      <div class="cta">
        <div class="submit">
          <button
            type="button"
            @click="standardSumbit"
            :disabled="!checkFormValidity"
            :class="{ disabled: !checkFormValidity }"
          >
            {{
              formState === FormState.AUTHENTIFICATION ? "Connexion" : "Signup"
            }}
          </button>
        </div>
        <div class="login-google">
          <button type="button" @click="oAuthLogin">
            <img :src="googleIcon" alt="google icon" />
          </button>
        </div>
        <div class="signup-btn">
          <button type="button" @click="toggleForm">
            {{
              formState === FormState.AUTHENTIFICATION
                ? "No account? Create one"
                : "You already have an account ?"
            }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script lang="ts" setup>
import { FormState } from "@/model";
import logoIcon from "../assets/logo-mobile.svg";
import googleIcon from "../assets/google-icon.svg";
import { useField, useForm } from "vee-validate";
import { computed, ref } from "vue";
import { useLayoutStore } from "@/stores/layout";
import userService from "@/services/user.service";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";

const layoutStore = useLayoutStore();
const authStore = useAuthStore();
const router = useRouter();

const errorMessage = ref("");
const formSchema = {
  email(value: string) {
    if (
      value &&
      value.trim() &&
      value.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
    )
      return true;
  },
  password(value: string) {
    if (
      value &&
      value.trim() &&
      value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    )
      return true;
  },
};

useForm({
  validationSchema: formSchema,
});

const { value: email, meta: emailMeta } = useField<string>("email");
const { value: password, meta: passwordMeta } = useField<string>("password");
const { value: passwordConfirm, meta: passwordConfirmMeta } =
  useField("passwordConfirm");

/* Computed */
const formState = computed(() => layoutStore.getHomeFormState);
const loadingState = computed(() => layoutStore.getLoadingState);
const checkNonEqualPassword = computed(() => {
  if (password.value !== passwordConfirm.value) {
    return true;
  }
  return false;
});

const checkFormValidity = computed(() => {
  switch (formState.value) {
    case FormState.AUTHENTIFICATION:
      if (emailMeta.valid && passwordMeta.valid) {
        return true;
      }
      return false;
    case FormState.REGISTRATION:
      if (
        !checkNonEqualPassword.value &&
        emailMeta.valid &&
        passwordMeta.valid
      ) {
        return true;
      }
      return false;
  }
});

function standardSumbit() {
  switch (formState.value) {
    case FormState.REGISTRATION:
      registerStandard();
      break;
    case FormState.AUTHENTIFICATION:
      signinStandard();
      break;
    default:
      break;
  }
}

async function registerStandard() {
  layoutStore.setLoadingState(true);
  const result: any = await userService.registerStandard(
    email.value,
    password.value
  );
  if (result.data) {
    layoutStore.setLoadingState(false);
    authStore.setServerMessage(result.serverMessage);
    router.push("boards");
    return;
  }
  layoutStore.setLoadingState(false);
  authStore.setErrorMessage(result.errorCode);
}
async function signinStandard() {
  layoutStore.setLoadingState(true);
  const result: any = await userService.signinStandard(
    email.value,
    password.value
  );
  if (result.data) {
    layoutStore.setLoadingState(false);
    authStore.setServerMessage(result.serverMessage);
    router.push("boards");
    return;
  }
  layoutStore.setLoadingState(false);
  authStore.setErrorMessage(result.errorCode);
}

async function oAuthLogin() {
  layoutStore.setLoadingState(true);
  const result: any = await userService.oAuthLogin();
  if (result.data) {
    layoutStore.setLoadingState(false);
    authStore.setServerMessage(result.serverMessage);
    router.push("boards");
    return;
  }
  layoutStore.setLoadingState(false);
  authStore.setErrorMessage(result.errorCode);
}

function toggleForm() {
  if (formState.value === FormState.AUTHENTIFICATION) {
    layoutStore.setHomeFormState(FormState.REGISTRATION);
    return;
  }
  layoutStore.setHomeFormState(FormState.AUTHENTIFICATION);
}
</script>
<style lang="scss" scoped>
@use "../sass/colors" as c;
@use "../sass/mixins" as m;
@use "../sass/typography" as t;
@use "../sass/layout/_index.scss" as l;
@use "../sass/helpers/_functions.scss" as f;

.login-page {
  position: relative;
  padding: f.toRem(145, 12) f.toRem(24, 12) f.toRem(24, 12) f.toRem(24, 12);
  h1 {
    @include t.XLargeHeading;
    color: c.$MainPurple;
    margin-bottom: f.toRem(40, 12);
  }
  > img {
    position: absolute;
    top: 5rem;
    left: 50%;
    transform: translateX(-50%);
    width: f.toRem(32, 12);
    height: f.toRem(26, 12);
  }

  .login-form {
    width: f.toRem(327, 12);
    margin: 0 auto;
    padding: f.toRem(24, 12) f.toRem(24, 12) f.toRem(24, 12) f.toRem(24, 12);
    background-color: rgba($color: c.$LinesLight, $alpha: 1);
    border-radius: f.toRem(6, 12);
    .field {
      display: flex;
      flex-direction: column;
      margin-bottom: f.toRem(24, 12);
    }

    .field > label {
      @include t.bodyMedium;
      margin-bottom: f.toRem(8, 12);
      color: c.$MainPurpleHover;
    }

    .field > input {
      @include t.bodyMedium;
      @include l.ktm-input;
    }

    .field > small {
      color: c.$MediumGrey;
      margin-top: f.toRem(8, 12);
    }

    .field--error {
      position: relative;

      &::after {
        position: absolute;
        content: "Wrong input";
        color: c.$Red;
        top: f.toRem(34.5, 12);
        right: f.toRem(16, 12);
      }

      & > label {
        color: c.$Red;
      }

      & > input {
        outline: none;
        border: 1px solid c.$Red !important;
      }
    }

    .passwordConfirmf--error {
      position: relative;

      &::after {
        position: absolute;
        content: "Not equal";
        color: c.$Red;
        top: f.toRem(34.5, 12);
        right: f.toRem(16, 12);
      }

      & > label {
        color: c.$Red;
      }

      & > input {
        outline: none;
        border: 1px solid c.$Red !important;
      }
    }

    .cta {
      display: grid;
      align-items: center;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, 1fr);
      grid-template-areas:
        "submit  submit  google"
        "no-account no-account no-account";
      button {
        border: none;
        @include t.smallButtonText;
        border-radius: f.toRem(24, 12);
        padding: f.toRem(12, 12) f.toRem(15, 12);
      }
      .submit {
        grid-area: submit;

        > button {
          @include l.ktm-btn-primary;
          width: 100%;
        }
        > button.disabled {
          background-color: c.$MediumGrey;
          color: rgba($color: c.$White, $alpha: 0.25);
        }
      }
      .login-google {
        grid-area: google;
        display: flex;
        justify-content: center;
        > button {
          background-color: c.$White;
          padding: 4px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 100%;
        }

        > button > img {
          width: f.toRem(32, 12);
        }
      }
      .signup-btn {
        margin-top: f.toRem(16, 12);
        grid-area: no-account;
        > button {
          @include l.ktm-btn-secondary-light;
          width: 100%;
        }
      }
    }
  }
}
.v-enter-active {
  transition: all 0.6s ease;
}
.v-leave-active {
  transition: all 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

@include m.breakpoint-up(medium) {
  .login-page {
    padding: f.toRem(230, 12) f.toRem(0, 12) f.toRem(0, 12) f.toRem(0, 12);
    h1 {
      margin-bottom: f.toRem(40, 12);
    }
    > img {
      top: 10rem;
      width: f.toRem(48, 12);
      height: f.toRem(36, 12);
    }

    .login-form {
      width: f.toRem(480, 12);
      padding: f.toRem(32, 12);
      .field {
        margin-bottom: f.toRem(24, 12);
      }

      .field > label {
        @include t.bodyLarge;
        margin-bottom: f.toRem(16, 12);
      }

      .field > input {
        @include t.bodyLarge;
        @include l.ktm-input;
      }

      .field--error {
        &::after {
          top: f.toRem(52.2, 12);
          right: f.toRem(16, 12);
        }

        & > label {
          color: c.$Red;
        }

        & > input {
          outline: none;
          border: 1px solid c.$Red !important;
        }
      }

      .cta {
        display: grid;
        align-items: center;

        button {
          @include t.LargeButtonText;
          padding: f.toRem(14, 12) f.toRem(15, 12);
        }
        .login {
          grid-area: login;
        }
        .login-google {
          grid-area: google;
        }
        .signup-btn {
          grid-area: no-account;
        }
      }
    }
  }
}
</style>
