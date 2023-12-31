import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import CreateQuestionView from "../views/CreateQuestionView.vue";
import QuestionView from "../views/QuestionView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView,
		},
		{
			path: "/question/:id",
			name: "Question",
			component: QuestionView,
		},
		{
			path: "/create",
			name: "Create Question",
			component: CreateQuestionView,
		},
		{
			path: "/my_question",
			name: "My Question",
			component: HomeView,
		},
	],
});

export default router;
