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
						Login
					</div>
					<v-text-field
						v-model="email"
						:readonly="loading"
						:rules="[required]"
						class="mb-4"
						clearable
						label="Email"
					></v-text-field>
					<v-text-field
						v-model="password"
						:readonly="loading"
						:rules="[required]"
						class="mb-4"
						label="Password"
						placeholder="Enter your password"
						:type="visible ? 'text' : 'password'"
						:append-inner-icon="password ?
							visible ? 'fas fa-eye-slash' : 'fas fa-eye' : null
						"
						@click:append-inner="visible = !visible"
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
						login
					</v-btn>

					<div v-if="error" class="mt-5 text-center text-red">
						{{ error }}
					</div>

					<v-card-text class="text-center">
						<a
							class="text-blue text-decoration-none"
							href="/register"
							rel="noopener noreferrer"
						>
							Belum punya akun
						</a>
					</v-card-text>
				</v-form>
			</v-card>
		</div>
	</v-main>
</template>

<script setup>
import { login } from "@/services/auth.service";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();

const visible = ref(false);
const form = ref(false);
const email = ref(null);
const password = ref(null);
const loading = ref(false);
const error = ref("");

const onSubmit = async () => {
	if (!form.value) return;

	loading.value = true;

	try {
		const credential = {
			email: email.value,
			password: password.value,
		};
		await login(credential);
		router.push("/");
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
