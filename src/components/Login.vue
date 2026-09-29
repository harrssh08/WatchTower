<template>
    <div class="form-container">
        <div class="form">
            <form aria-label="Login Form" class="login-form" @submit.prevent="submit">
                <div v-if="!tokenRequired" class="form-floating">
                    <input
                        id="floatingInput"
                        v-model="username"
                        type="text"
                        class="form-control"
                        placeholder="Username"
                        autocomplete="username"
                        required
                    />
                    <label for="floatingInput">{{ $t("Username") }}</label>
                </div>

                <div v-if="!tokenRequired">
                    <HiddenInput
                        id="floatingPassword"
                        v-model="password"
                        :large="true"
                        :placeholder="$t('Password')"
                        autocomplete="current-password"
                        :required="true"
                    />
                </div>

                <div v-if="tokenRequired">
                    <div class="form-floating">
                        <input
                            id="otp"
                            ref="otpInput"
                            v-model="token"
                            type="text"
                            maxlength="6"
                            class="form-control"
                            placeholder="123456"
                            autocomplete="one-time-code"
                            required
                        />
                        <label for="otp">{{ $t("Token") }}</label>
                    </div>
                </div>

                <div class="remember-row">
                    <div class="form-check">
                        <input
                            id="remember"
                            v-model="$root.remember"
                            type="checkbox"
                            value="remember-me"
                            class="form-check-input"
                        />

                        <label class="form-check-label" for="remember">
                            {{ $t("Remember me") }}
                        </label>
                    </div>
                </div>
                <button class="login-button w-100 btn btn-primary" type="submit" :disabled="processing">
                    {{ $t("Login") }}
                </button>

                <div v-if="res && !res.ok" class="alert alert-danger" role="alert">
                    {{ $t(res.msg) }}
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { login, verifyTotp } from "../auth-client";
import HiddenInput from "./HiddenInput.vue";

export default {
    components: {
        HiddenInput,
    },
    data() {
        return {
            processing: false,
            username: "",
            password: "",
            token: "",
            res: null,
            tokenRequired: false,
        };
    },

    watch: {
        tokenRequired(newVal) {
            if (newVal) {
                this.$nextTick(() => {
                    this.$refs.otpInput?.focus();
                });
            }
        },
    },

    mounted() {
        document.title += " - Login";
    },

    unmounted() {
        document.title = document.title.replace(" - Login", "");
    },

    methods: {
        /**
         * Submit the user details and attempt to log in
         * @returns {void}
         */
        async submit() {
            this.processing = true;

            try {
                if (this.tokenRequired) {
                    await verifyTotp(this.token);
                    return;
                }

                const result = await login(this.username, this.password, this.$root.remember);
                if (result === "twoFactorRequired") {
                    this.tokenRequired = true;
                }
            } catch (e) {
                this.res = { ok: false, msg: e.message };
            } finally {
                this.processing = false;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.form-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 56px;
    padding-bottom: 40px;
}

.login-form {
    display: grid;
    gap: 16px;
}

.form-floating {
    > label {
        padding-left: 1.3rem;
    }

    > .form-control {
        height: 56px;
        min-height: 56px;
        padding-left: 1.3rem;
    }
}

.remember-row {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 28px;

    .form-check {
        min-height: 0;
        margin: 0;
        padding-left: 1.75rem;
    }

    .form-check-input {
        margin-top: 0.15rem;
    }
}

.login-button {
    min-height: 50px;
}

.form {
    width: 100%;
    max-width: 380px;
    padding: 24px;
    margin: auto;
    text-align: center;
}

@media (max-width: 480px) {
    .form-container {
        padding-top: 32px;
    }

    .form {
        padding: 20px;
    }
}
</style>
