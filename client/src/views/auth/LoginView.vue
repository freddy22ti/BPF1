<template>
	<div class="flex items-center justify-center min-h-screen">
		<div
			class="w-full max-w-lg px-10 py-8 mx-auto bg-white border rounded-lg shadow-2xl"
		>
			<form
				@submit.prevent="loginMethod"
				class="max-w-md mx-auto space-y-3"
			>
				<h3 class="text-xl font-semibold text-center">Login</h3>
				<div>
					<label class="block py-1">Email</label>
					<input
						type="email"
						v-model="state.email"
						class="border w-full py-2 px-2 rounded shadow hover:border-indigo-600 ring-1 ring-inset ring-gray-300 font-mono"
						required
					/>
				</div>
				<div>
					<label class="block py-1">Password</label>
					<input
						type="password"
						v-model="state.password"
						class="border w-full py-2 px-2 rounded shadow hover:border-indigo-600 ring-1 ring-inset ring-gray-300 font-mono"
						required
					/>
				</div>
				<div class="flex gap-3 pt-3 items-center">
					<button
						type="submit"
						class="border hover:border-indigo-600 px-4 py-2 rounded-lg shadow ring-1 ring-inset ring-gray-300 bg-blue-500 text-white"
					>
						Login
					</button>
					<a href="/register">Belum punya akun</a>
				</div>
				<p v-if="state.errors" class="text-red-700 text-center">
					{{ state.errors }}
				</p>
			</form>
		</div>
	</div>
</template>
<script setup>
import { login } from "@/services/auth.service";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const state = reactive({
	email: "",
	password: "",
	errors: "",
});
const router = useRouter();

const loginMethod = async () => {
	try {
		const credentials = {
			email: state.email,
			password: state.password,
		};

		await login(credentials);
		// Redirect to the desired route after successful login
		router.push("/");
	} catch (error) {
		if (error.response && error.response.status === 401) {
			// Unauthorized - Incorrect credentials
			state.errors = "Invalid email or password";
		} else {
			state.errors = "Login failed";
		}
	}
};
</script>
