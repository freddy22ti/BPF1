<template>
	<header>
		<Navbar />
	</header>
	<!-- question block -->
	<main class="m-5">
		<div class="border-b border-gray-900/10 pb-12">
			<h2 class="w-full font-bold text-2xl mb-2 text-blue-500">
				Q: {{ state.judul }}
			</h2>
			<h4 class="text-sm select-none text-gray-400 mb-3">
				{{ state.user.username }}
			</h4>
			<p class="text-sm deskripsi">{{ state.deskripsi }}</p>
			<div class="mt-2">
				<a
					:href="'/edit/' + state.id"
					v-if="ownerQuestion"
					class="text-yellow-500 text-sm font-bold"
					>Edit</a
				>
				<a
					@click="delQuestion"
					v-if="ownerQuestion"
					class="text-red-500 text-sm mx-3 font-bold"
					>Hapus</a
				>
			</div>
		</div>
		<!-- answer block -->
		<div v-for="item in state.jawaban" :key="item.id">
			<AnswerBlock :username="item.User.username" :jawaban="item.isi" />
		</div>

		<!-- answer prompt -->
		<form
			@submit.prevent="sendAnswer"
			class="fixed bottom-0 left-0 right-0 p-4 flex"
		>
			<input
				type="text"
				v-model="answerUser.isi"
				placeholder="Jawaban"
				class="flex-grow p-2 mr-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
			/>
			<button
				class="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
			>
				Send
			</button>
		</form>
	</main>
</template>

<script setup>
import Navbar from "@/components/navbar/Navbar.vue";
import AnswerBlock from "@/components/Answer/AnswerBlock.vue";
import {
	getQuestionById,
	deleteQuestion,
	getUserProfile,
	getAnswer,
	createAnswer,
} from "@/services/user.service";
import { reactive, onMounted } from "vue";

import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const state = reactive({
	id: route.params.id,
	judul: "",
	deskripsi: "",
	user: [],
	jawaban: [],
});

onMounted(async () => {
	const question = await getQuestionById(state.id);
	// console.log(question.data.data);
	state.judul = question.data.data.judul;
	state.deskripsi = question.data.data.deskripsi;
	const user = await getUserProfile(question.data.data.UserId);
	state.user = user.data.data;
	// console.log(user.data.data);
	const jawaban = await getAnswer(state.id);
	state.jawaban = jawaban.data.data;
	// console.log(jawaban.data);
});

const answerUser = reactive({
	isi: "",
});
const sendAnswer = async () => {
	try {
		const answerModel = {
			id_pertanyaan: state.id,
			isi: answerUser.isi,
		};
		await createAnswer(answerModel);
		window.location.reload();
	} catch (err) {
		console.log(err);
	}
};

const id = localStorage.getItem("id");
const ownerQuestion = state.user.id == id;
const role = localStorage.getItem("role");

const delQuestion = () => {
	deleteQuestion(state.id);
	router.push("/");
};
</script>
