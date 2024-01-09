<template>
	<v-app-bar :elevation="2" rounded color="" height="75">
		<!-- <v-app-bar-nav-icon icon="fab fa-slack" /> -->
		<template v-slot:prepend>
			<v-app-bar-title tag="div" text="PCR OVERFLOW" />
			<v-btn href="/" class="ms-5 mx-1">Home</v-btn>
			<v-btn href="/kategori" class="mx-1">kategori</v-btn>
		</template>

		<v-responsive class="mx-2" max-width="350" max-height="60">
			<v-text-field
				v-model="search"
				label="Search"
				single-line
				hide-details
				density="compact"
			></v-text-field>
		</v-responsive>

		<template v-slot:append>
			<v-btn v-if="isAuth" size="small" class="bg-white mx-2" icon="fas fa-plus" href="/tambah" variant="tonal" color="blue">

			</v-btn>
			<v-btn v-if="isAuth" size="small" class="bg-white mx-2 me-4" icon="">
				<v-icon class="text-blue" icon="fas fa-user" />
				<v-menu activator="parent">
					<v-list>
						<v-list-item
							v-for="(item, index) in items"
							:key="index"
							:value="index"
							:href="item.link"
						>
							<v-list-item-title
								:class="[
									index == items.length - 1 ? 'text-red' : '',
								]"
								>{{ item.title }}</v-list-item-title
							>
						</v-list-item>
					</v-list>
				</v-menu>
			</v-btn>

			<v-btn
				v-if="!isAuth"
				href="/login"
				class="mx-3"
				color="blue-lighten-1"
				variant="tonal"
				>Login</v-btn
			>
			<v-btn
				v-if="!isAuth"
				href="/register"
				class="mx-3"
				color="blue-lighten-1"
				variant="outlined"
				>Register</v-btn
			>
		</template>
	</v-app-bar>
</template>
]
<script setup>
import { ref } from "vue";
import { checkAuthentication } from "@/router.js";

const search = ref("");

const items = ref([
	{ title: "Profile", link: "/profile" },
	{ title: "My Question", link: "/my_question" },
	{ title: "Logout", link: "/logout" },
]);

const isAuth = checkAuthentication();
</script>
