<template>
	<Navbar />
	<v-main class="d-flex justify-center align-center">
		<v-card
			class="mx-auto pa-12 pb-8 w-100"
			elevation="8"
			max-width="600"
			rounded="lg"
		>
			<v-form v-model="form" @submit.prevent="onSubmit">
				<div
					class="text-h5 text-center font-weight-medium mb-5 mx-auto"
					max-width="228"
				>
					Edit Pertanyaan
				</div>
				<div class="text-subtitle-2">Judul</div>
				<v-text-field
					v-model="state.judul"
					:readonly="loading"
					:rules="[required]"
					class="mb-4"
					clearable
					variant="underlined"
					placeholder="Masalah kamu"
				></v-text-field>

				<div class="text-subtitle-2">Deskripsi</div>
				<v-textarea
					v-model="state.deskripsi"
					:readonly="loading"
					:rules="[required]"
					class="mb-4"
					variant="underlined"
					placeholder="Jelaskan masalah kamu"
				></v-textarea>

				<div class="text-subtitle-2">Kategori</div>
				<v-select
					v-model="state.kategoriPertanyaan"
					:items="state.kategori"
					:item-props="kategoriProps"
					chips
					multiple
					variant="underlined"
				></v-select>

				<v-btn
					:disabled="!form"
					:loading="loading"
					block
					color="success"
					size="large"
					type="submit"
					variant="elevated"
				>
					edit pertanyaan
				</v-btn>

				<div v-if="error" class="mt-5 text-center text-red">
					{{ error }}
				</div>
			</v-form>
		</v-card>
	</v-main>
	<!-- <div class="flex items-center justify-center min-h-screen">
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
	</div> -->
</template>
<script setup>
import Navbar from "@/components/navbar/Navbar.vue";
import { onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getQuestionById, updateQuestion } from "@/services/user.service";
import { ref } from "vue";

const route = useRoute();
const router = useRouter();

const form = ref(false);
const loading = ref(false);
const error = ref("");

const state = reactive({
	id: route.params.id,
	judul: "",
	deskripsi: "",
	kategoriPertanyaan: [],
	kategori: [],
});

onMounted(async () => {
	const question = await getQuestionById(state.id);
	state.judul = question.data.data.judul;
	state.deskripsi = question.data.data.deskripsi;
});

const onSubmit = async () => {
	const data = {
		judul: state.judul,
		deskripsi: state.deskripsi,
	};
	await updateQuestion(state.id, data);
	router.push("/");
};

const kategoriProps = (item) => {
	return {
		value: item.id,
		title: item.kategori,
	};
};

const required = (v) => {
	return !!v || "Harus diisi";
};

</script>
