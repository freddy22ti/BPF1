<template>
	<h3 class="text-h5">Jawaban</h3>
	<v-list lines="two">
		<v-list-item
			v-for="item in jawaban"
			:key="item.id"
			:title="item.isi"
			:subtitle="'User: ' + item.User.username"
			class="border-bottom"
		>
			<template v-slot:prepend class="d-flex flex-column">
				<div class="d-flex flex-column">
					<v-btn variant="text">
						<v-icon icon="fas fa-caret-up" color="green"></v-icon>
					</v-btn>
					<v-btn variant="text">
						<v-icon icon="fas fa-caret-down" color="green"></v-icon>
					</v-btn>
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
					color="green"
					variant="flat"
					class="mx-3"
					>Terbaik</v-btn
				>
			</template>
		</v-list-item>
	</v-list>
</template>

<script setup>
import { defineProps } from "vue";
import { deleteAnswer } from "@/services/user.service";

const props = defineProps(["jawaban", "question_owner"]);

const idUser = localStorage.getItem("id");

const delAnswer = async (id) => {
	await deleteAnswer(id);
	window.location.reload();
};
</script>
