<script setup>
defineProps({
	title: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
	deskripsi: {
		type: String,
		required: true,
	},
});
</script>
<template>
	<div>
		<div class="rounded overflow-hidden shadow-lg bg-white">
			<div class="px-6 py-4">
				<div class="font-bold text-2xl mb-1">{{ title }}</div>
				<div class="text-gray-500 text-sm mb-3">{{ author }}</div>
				<p class="text-gray-700 text-base">
					{{deskripsi}}
				</p>
			</div>
		</div>
	</div>
</template>
