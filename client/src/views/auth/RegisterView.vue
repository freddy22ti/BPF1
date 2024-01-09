<template>
	<v-main class="d-flex justify-center align-center">
		<div class="w-75">
			<v-card
				class="mx-auto pa-12 pb-8"
				elevation="8"
				max-width="448"
				rounded="lg"
			>
				<v-form v-model="form" @submit.prevent="onSubmit">
					<div
						class="text-h3 text-center font-weight-medium mb-5 mx-auto"
						max-width="228"
					>
						Register
					</div>
					<v-text-field
						v-model="username"
						:readonly="loading"
						:rules="[required]"
						class="mb-4 text-body-2"
						clearable
						label="Username"
					></v-text-field>
					<v-text-field
						v-model="email"
						:readonly="loading"
						:rules="[required]"
						class="mb-4 text-body-2"
						clearable
						label="Email"
					></v-text-field>
					<v-text-field
						v-model="password"
						:readonly="loading"
						:rules="[required]"
						class="mb-4 text-body-2"
						label="Password"
						placeholder="Masukkan password"
						:type="visible1 ? 'text' : 'password'"
						:append-inner-icon="
							password
								? visible1
									? 'fas fa-eye-slash'
									: 'fas fa-eye'
								: null
						"
						@click:append-inner="visible1 = !visible1"
					></v-text-field>
					<v-text-field
						v-model="konfirmasiPassword"
						:readonly="loading"
						:rules="[required]"
						class="mb-4 text-body-2"
						label="Konfirmasi Password"
						placeholder="Konfirmasi Password"
						:type="visible2 ? 'text' : 'password'"
						:append-inner-icon="
							konfirmasiPassword
								? visible2
									? 'fas fa-eye-slash'
									: 'fas fa-eye'
								: null
						"
						@click:append-inner="visible2 = !visible2"
					></v-text-field>
					<v-btn
						:disabled="!form"
						:loading="loading"
						block
						color="success"
						size="large"
						type="submit"
						variant="elevated"
					>
						register
					</v-btn>

					<div v-if="error" class="mt-5 text-center text-red">
						{{ error }}
					</div>

					<v-card-text class="text-center">
						<a
							class="text-blue text-decoration-none"
							href="/login"
							rel="noopener noreferrer"
						>
							Sudah punya akun
						</a>
					</v-card-text>
				</v-form>
			</v-card>
		</div>
	</v-main>
</template>

<script setup>
import { register } from "@/services/auth.service";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();

const visible1 = ref(false);
const visible2 = ref(false);
const form = ref(false);
const username = ref(null);
const email = ref(null);
const password = ref(null);
const konfirmasiPassword = ref(null);
const loading = ref(false);
const error = ref("");

const onSubmit = async () => {
	if (!form.value) return;

	loading.value = true;

	try {
		const credential = {
			username: username.value,
			email: email.value,
			password: password.value,
			konfirmasiPassword: konfirmasiPassword.value,
		};
		await register(credential);
		router.push("/login");
	} catch (err) {
		error.value = err.response.data.message;
	} finally {
		loading.value = false;
	}
};

const required = (v) => {
	return !!v || "Field is required";
};
</script>
