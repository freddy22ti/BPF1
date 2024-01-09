<template>
	<v-app>
		<RouterView />
	</v-app>
</template>

<script setup>
import { RouterView } from "vue-router";
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap");
:root {
	font-family: "Inter", sans-serif;
}
</style>
