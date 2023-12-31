import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/auth/LoginView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import Question from "@/views/question/QuestionView.vue";
import MyQuestionView from "@/views/question/MyQuestionView.vue";
import CreateQuestion from "@/views/question/CreateQuestion.vue";
import EditQuestionView from "@/views/question/EditQuestionView.vue";
import SearchQuestion from "@/views/question/SearchQuestion.vue";
import KategoriQuestion from "@/views/question/KategoriQuestion.vue";
import ProfileView from "@/views/profile/ProfileView.vue";

import { logout } from "@/services/auth.service";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/login",
			name: "login",
			component: LoginView,
		},
		{
			path: "/register",
			name: "register",
			component: RegisterView,
		},
		{
			path: "/logout",
			name: "Logout",
			// component: LogoutView,
			beforeEnter: (to, from, next) => {
				logout();
				next("/");
			},
			meta: { requiresAuth: true },
		},
		{
			path: "/",
			name: "home",
			component: HomeView,
		},
		{
			path: "/question/:id",
			name: "Question",
			component: Question,
		},
		{
			path: "/search/:judul",
			name: "Cari berdasarkan judul",
			component: SearchQuestion,
		},
		{
			path: "/kategori",
			name: "Cari berdasarkan kategori",
			component: KategoriQuestion,
		},
		{
			path: "/tambah",
			name: "Buat Question",
			component: CreateQuestion,
			meta: { requiresAuth: true },
		},
		{
			path: "/edit/:id",
			name: "Edit Question",
			component: EditQuestionView,
			meta: { requiresAuth: true },
		},
		{
			path: "/my_question",
			name: "My Question",
			component: MyQuestionView,
			meta: { requiresAuth: true },
		},
		{
			path: "/profile",
			name: "profile",
			component: ProfileView,
			meta: { requiresAuth: true },
		},
		{
			path: "/:catchAll(.*)",
			name: "not-found",
			redirect: { name: "home" },
			// component: () => import("@/views/NotFoundView.vue"), // Import your "not-found" view
		},
	],
});

router.beforeEach((to, from, next) => {
	const isAuthenticated = checkAuthentication(); // Implement your authentication check logic

	if (
		to.matched.some((route) => route.meta.requiresAuth) &&
		!isAuthenticated
	) {
		// Redirect to login if the route requires authentication and the user is not authenticated
		next("/login");
	} else if (to.name === "login" && isAuthenticated) {
		// Redirect to the home page if the user is already authenticated and tries to access the login page
		next("/");
	} else {
		next();
	}
});

export function checkAuthentication() {
	// Implement your authentication check logic here
	// For example, check if the user is logged in by examining a token or a user object in your app state

	const token = localStorage.getItem("token"); // Assuming you store the token in localStorage

	return !!token; // Return true if the user is authenticated, false otherwise
}
export default router;
