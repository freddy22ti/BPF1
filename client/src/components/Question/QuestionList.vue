<template>
	<v-main class="d-flex justify-center mt-5">
		<v-list lines="three" class="w-75">
			<v-list-item
				v-for="item in questions"
				:href="'/question/' + item.id"
				:key="item.id"
				class=""
				variants="plain"
			>
				<template v-slot:prepend>
					<v-avatar color="red">
						<v-icon
							color="white"
							icon="far fa-circle-question "
						></v-icon>
					</v-avatar>
				</template>

				<v-list-item-title class="text-h5">
					{{ item.judul }}
				</v-list-item-title>
				<div class="mt-2 text-disabled text-subtitle-2">
					User: {{ item.User.username }}
				</div>
			</v-list-item>
		</v-list>
	</v-main>
</template>

<script setup>
const props = defineProps(["questions"]);
</script>

<style scoped>
.custom-list-item {
	border-bottom: 1px solid #1976d2;
}
</style>
