<template>
	<v-main class="mx-5 my-5">
		<!-- question block -->
		<v-card
			:title="state.judul"
			:subtitle="'User: ' + state.user.username"
			:text="state.deskripsi"
			variant="flat"
			class="mb-5"
		>
			<template v-slot:prepend>
				<v-avatar v-if="!state.selesai" color="red">
					<v-icon
						color="white"
						icon="far fa-circle-question "
					></v-icon>
				</v-avatar>
				<v-avatar v-if="state.selesai" color="green">
					<v-icon color="white" icon="fas fa-check"></v-icon>
				</v-avatar>
			</template>

			<v-card-actions class="d-flex justify-end" v-if="state.ownerQuestion">
				<v-btn
					@click="markAsDone"
					color="green"
					:variant=" !state.selesai ? 'flat' : 'outlined'"
					class="mx-2"
					>Selesai</v-btn
				>
				<v-btn
					:href="'/edit/' + state.id"
					color="yellow"
					variant="flat"
					class="mx-2"
					>Edit</v-btn
				>
				<v-btn
					@click="delQuestion"
					color="red"
					variant="flat"
					class="mx-3"
					>Hapus</v-btn
				>
			</v-card-actions>
		</v-card>
		<v-divider :thickness="3" color="dark" inset class="mb-5"></v-divider>

		<!-- answer block -->
		<AnswerList :jawaban="state.jawaban" :question_owner="state.user.id" />

		<!-- answer prompt -->
		<v-form @submit.prevent="sendAnswer">
			<v-text-field
				v-model="answerUser.isi"
				label="Jawaban anda"
				variant="solo"
			>
				<template v-slot:append>
					<v-btn color="green" icon="fas fa-paper-plane"> </v-btn>
				</template>
			</v-text-field>
		</v-form>
	</v-main>
</template>

<script setup>
import {
	getQuestionById,
	deleteQuestion,
	getAnswer,
	createAnswer,
} from "@/services/user.service";
import { reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import AnswerList from "@/components/Answer/AnswerList.vue";

const router = useRouter();
const route = useRoute();
const id = localStorage.getItem("id");
const role = localStorage.getItem("role");

const state = reactive({
	id: route.params.id,
	judul: "",
	deskripsi: "",
	user: {},
	jawaban: [],
	ownerQuestion: false,
});

onMounted(async () => {
	const question = await getQuestionById(state.id);
	state.judul = question.data.data.judul;
	state.deskripsi = question.data.data.deskripsi;
	state.ownerQuestion = question.data.data.UserId == id || role == "admin";
	state.user = question.data.data.User;
	const jawaban = await getAnswer(state.id);
	state.jawaban = jawaban.data.data;
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

const delQuestion = () => {
	deleteQuestion(state.id);
	router.push("/");
};

const markAsDone = () => {

}

</script>
