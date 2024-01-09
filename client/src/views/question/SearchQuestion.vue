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
import { searchQuestion } from "@/services/user.service.js";

const state = reactive({
  question: null,
});

onMounted(async () => {
  state.question = (await searchQuestion('')).data.data;
});

// const state = reactive({
// 	judul: "",
// 	questions: [],
// });

// const route = useRoute();
// const router = useRouter();
// state.judul = route.params.judul;

// watchEffect(async () => {
// 	state.judul = route.params.judul;
// 	fetchData();
// });

// onMounted(async () => {
// 	await fetchData();
// });

// const fetchData = async () => {
// 	const ls = await searchQuestion(state.judul);
// 	state.questions = ls.data.data;
// };
</script>
