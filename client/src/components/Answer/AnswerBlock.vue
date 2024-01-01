<template>
	<div class="w-full p-5 rounded flex-auto">
		<h2 class="font-bold text-gray-800 text-lg mb-2">
			{{ username }}
		</h2>
		<p class="text-sm">{{ jawaban }}</p>

		<button v-if="owned" class="text-red-500 text-sm">Hapus</button>
	</div>
</template>

<script setup>
import { defineProps } from "vue";
const { id, username, jawaban, user_id } = defineProps({
	id: {
		type: String,
		default: "",
	},
	username: {
		type: String,
		default: "",
	},
	jawaban: {
		type: String,
		default: "",
	},
	user_id: {
		type: String,
		default: "",
	},
});
const idUser = localStorage.getItem("id");

const owned = user_id == idUser;
</script>
