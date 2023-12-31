<template>
	<div class="w-full border-2 border-gray-500 p-5 rounded ">
		<h2 class="font-bold text-gray-800 text-xl mb-2">
			{{ username }}
		</h2>
		<p class="text-sm">{{ jawaban }}</p>
	</div>
</template>

<script>
export default {
	props: {
		username: String,
		jawaban: String,
	},
};
</script>
