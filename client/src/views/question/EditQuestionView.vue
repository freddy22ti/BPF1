<template>
	<Navbar />
	<div class="flex items-center justify-center min-h-screen">
		<div
			class="w-full max-w-lg px-10 py-8 mx-auto bg-white border rounded-lg shadow-2xl"
		>
			<form
				@submit.prevent="postMethod"
				class="max-w-md mx-auto space-y-3"
			>
				<h3 class="text-xl font-semibold text-center">
					Edit Pertanyaan
				</h3>
				<div>
					<label class="block py-1">Judul</label>
					<input
						v-model="state.judul"
						class="border w-full py-2 px-2 rounded shadow hover:border-indigo-600 ring-1 ring-inset ring-gray-300 font-mono"
					/>
				</div>
				<div>
					<label class="block py-1">Deskripsi pertanyaan</label>

					<textarea
						v-model="state.deskripsi"
						rows="4"
						class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Deskripsikan masalah kamu..."
					></textarea>
				</div>
				<div class="flex gap-3 pt-3 items-center">
					<button
						type="submit"
						class="border hover:border-indigo-600 px-4 py-2 rounded-lg shadow ring-1 ring-inset ring-gray-300 bg-blue-500 text-white"
					>
						Edit
					</button>
				</div>
			</form>
		</div>
	</div>
</template>
<script setup>
import Navbar from "@/components/navbar/Navbar.vue";
import { onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getQuestionById, updateQuestion } from "@/services/user.service";

const route = useRoute();
const router = useRouter();

const state = reactive({
	id: route.params.id,
	judul: "",
	deskripsi: "",
});

onMounted(async () => {
	const question = await getQuestionById(state.id);
	state.judul = question.data.data.judul;
	state.deskripsi = question.data.data.deskripsi;
});

const postMethod = async () => {
	const data = {
		judul: state.judul,
		deskripsi: state.deskripsi,
	};
	await updateQuestion(state.id, data);
	router.push("/");
};
</script>
