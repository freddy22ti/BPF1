<template>
	<h3 class="text-h5">Jawaban</h3>
	<v-list lines="two">
		<v-list-item
			v-for="item in jawaban"
			:key="item.id"
			:title="item.isi"
			:subtitle="'User: ' + item.User.username"
		>
			<template v-slot:prepend class="d-flex flex-column">
				<div class="d-flex flex-column">
					<v-btn
						variant="text"
						@click="vote(item.id, { nilai: true })"
					>
						<v-icon icon="fas fa-caret-up" color="gray"></v-icon>
					</v-btn>
					<span class="text-center">{{
						item.voteCount ? item.voteCount : 0
					}}</span>
					<v-btn
						variant="text"
						@click="vote(item.id, { nilai: false })"
					>
						<v-icon icon="fas fa-caret-down" color="gray"></v-icon>
					</v-btn>
					<div v-if="item.verified" class="d-flex justify-center">
						<v-icon
							color="green"
							icon="fas fa-check"
							class="text-center"
						></v-icon>
					</div>
				</div>
			</template>

			<template v-slot:append>
				<v-btn
					v-if="item.UserId == idUser"
					@click="delAnswer(item.id)"
					color="red"
					variant="flat"
					class="mx-3"
					>Hapus</v-btn
				>
				<v-btn
					v-if="question_owner == idUser"
					@click="verify(item.id)"
					color="green"
					:variant="item.verified ? 'tonal' : 'flat'"
					class="mx-3"
					icon="fas fa-check"
				></v-btn>
			</template>
		</v-list-item>
	</v-list>
</template>

<script setup>
import {
	deleteAnswer,
	createVote,
	deleteVote,
	verifyAnswer,
} from "@/services/user.service";

const props = defineProps(["jawaban", "question_owner"]);
const idUser = localStorage.getItem("id");

const delAnswer = async (id) => {
	await deleteAnswer(id);
	window.location.reload();
};

const vote = async (id, type) => {
	await createVote(id, type);
	window.location.reload();
};

const cancelVote = async (id) => {
	await deleteVote(id);
	window.location.reload();
};


const verify = async (id) => {
	await verifyAnswer(id);
	window.location.reload();
};
</script>
