<template>
	<div class="flex flex-col m-5">
		<div
			v-for="item in state.questions"
			:key="item.id"
			class="w-full p-3 mb-1"
		>
			<h2 class="w-full font-bold text-2xl mb-2 text-blue-500">
				<a :href="'/question/' + item.id"> Q: {{ item.judul }} </a>
			</h2>
			<h4 class="text-sm select-none text-gray-400 mb-3">
				{{ item.user }}
			</h4>
			<p class="text-sm deskripsi">{{ item.deskripsi }}</p>
		</div>
	</div>
</template>

<script setup>
import { getQuestions } from "@/services/user.service.js";
import { reactive, onMounted } from "vue";

const state = reactive({
	questions: [],
});

onMounted(async () => {
	const ls = await getQuestions();
	state.questions = ls.data.data;
});
</script>

<style scoped>
.deskripsi {
	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 2; /* number of lines to show */
	line-clamp: 2;
	-webkit-box-orient: vertical;
}
</style>
