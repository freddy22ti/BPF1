<template>
	<div class="w-full p-5 rounded flex-auto">
		<h2 class="font-bold text-gray-800 text-lg mb-2">
			{{ username }}
		</h2>
		<p class="text-sm">{{ jawaban }}</p>

		<button class="text-red-500 text-sm">Hapus</button>
	</div>
</template>

<script>
// import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
export default {
	props: {
		id: String,
		username: String,
		jawaban: String,
	},
};
</script>
