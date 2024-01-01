<template>
	<div class="flex items-center justify-center min-h-screen">
		<div
			class="w-full max-w-lg px-10 py-8 mx-auto bg-white border rounded-lg shadow-2xl"
		>
			<form
				@submit.prevent="registerMethod"
				class="max-w-md mx-auto space-y-3"
			>
				<h3 class="text-lg font-semibold text-center">Register</h3>
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
					<label class="block py-1">Username</label>
					<input
						v-model="state.username"
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
				<div>
					<label class="block py-1">Konfirmasi Password</label>
					<input
						type="password"
						v-model="state.confirmPassword"
						class="border w-full py-2 px-2 rounded shadow hover:border-indigo-600 ring-1 ring-inset ring-gray-300 font-mono"
						required
					/>
				</div>
				<div class="flex gap-3 pt-3 items-center">
					<button
						type="submit"
						class="border hover:border-indigo-600 px-4 py-2 rounded-lg shadow ring-1 ring-inset ring-gray-300 bg-blue-500 text-white"
					>
						Register
					</button>
					<a href="/login">Sudah punya akun</a>
				</div>
				<p v-if="state.errors" class="text-red-700 text-center">
					{{ state.errors }}
				</p>
			</form>
		</div>
	</div>
</template>
<script setup>
import { register } from "@/services/auth.service";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const state = reactive({
	username: "",
	email: "",
	password: "",
	confirmPassword: "",
	errors: "",
});
const router = useRouter();

const registerMethod = async () => {
	try {
		const credentials = {
			username: state.username,
			email: state.email,
			password: state.password,
			confirmPassword: state.confirmPassword,
		};

		await register(credentials);
		// Redirect to the desired route after successful login
		router.push("/login");
	} catch (error) {
		state.errors = error.response.data.message;
	}
};
</script>
