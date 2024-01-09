<template>
	<div>
		<Navbar />
		<QuestionList :questions="state.question" />
	</div>
</template>

<script setup>
import Navbar from "@/components/navbar/Navbar.vue";
import QuestionList from "@/components/Question/QuestionList.vue";
import { reactive, onMounted } from "vue";
// import { getQuestionByUserId } from "@/services/user.service.js";

const state = reactive({
	question: null,
});

onMounted(async () => {
	// state.question = (await getQuestionByUserId()).data.data;
});
</script>
