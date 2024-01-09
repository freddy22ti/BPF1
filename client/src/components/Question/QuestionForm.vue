<template>
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
					Buat Pertanyaan
				</div>
				<div class="text-subtitle-2">Judul</div>
				<v-text-field
					v-model="judul"
					:readonly="loading"
					:rules="[required]"
					class="mb-4"
					clearable
					variant="underlined"
					placeholder="Masalah kamu"
				></v-text-field>

				<div class="text-subtitle-2">Deskripsi</div>
				<v-textarea
					v-model="deskripsi"
					:readonly="loading"
					:rules="[required]"
					class="mb-4"
					variant="underlined"
					placeholder="Jelaskan masalah kamu"
				></v-textarea>

				<div class="text-subtitle-2">Kategori</div>
				<v-select
					v-model="kategori"
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
					buat pertanyaan
				</v-btn>

				<div v-if="error" class="mt-5 text-center text-red">
					{{ error }}
				</div>
			</v-form>
		</v-card>
	</v-main>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { createQuestion, getKategori } from "@/services/user.service";

const router = useRouter({});
// const { questionId } = defineProps(['questionId']);

const form = ref(false);
const judul = ref(null);
const deskripsi = ref(null);
const loading = ref(false);
const error = ref("");
const kategori = ref(null);

const state = reactive({
	kategori: [],
});

const onSubmit = async () => {
	if (!form.value) return;

	loading.value = true;

	try {
		const question = {
			judul: judul.value,
			deskripsi: deskripsi.value,
			kategori: kategori.value,
		};
		await createQuestion(question);
		router.push("/");
	} catch (err) {
		error.value = err.response.data.message;
	} finally {
		loading.value = false;
	}
};

const required = (v) => {
	return !!v || "Harus diisi";
};

onMounted(async () => {
	state.kategori = (await getKategori()).data.data;
});

const kategoriProps = (item) => {
	return {
		value: item.id,
		title: item.kategori,
	};
};
</script>
