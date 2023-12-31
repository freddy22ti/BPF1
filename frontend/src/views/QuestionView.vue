<template>
	<header>
		<Navbar />
	</header>
	<!-- question block -->
	<main class="m-5">
		<div class="border-b border-gray-900/10 pb-12">
			<h2 class="w-full font-bold text-2xl mb-2 text-blue-500">
				<a :href="'/question/' + questionData.id">
					Q: {{ questionData.judul }}
				</a>
			</h2>
			<h4 class="text-sm select-none text-gray-400 mb-3">
				{{ questionData.user }}
			</h4>
			<p class="text-sm deskripsi">{{ questionData.deskripsi }}</p>
		</div>
		<!-- answer block -->
		<div>
			<AnswerBlock :username="'helo'" :jawaban="'dd'" />
		</div>

		<!-- answer prompt -->
		<div>
			<form action="" method="post">
				<div class="col-span-full">
					<label
						for="judul"
						class="block text-sm font-medium leading-6 text-gray-900"
						>Judul
					</label>
					<div class="mt-2">
						<input
							id="judul"
							name="judul"
							type="text"
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>
			</form>
		</div>
	</main>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import AnswerBlock from "../components/AnswerBlock.vue";

export default {
	components: {
		Navbar: Navbar,
		AnswerBlock: AnswerBlock,
	},
	data() {
		return {
			questionId: this.$route.params.id,
			questionData: null,
			answerData: null,
		};
	},
	created() {
		this.questionData = {
			id: 10,
			judul: "hehe",
			user: "lorem",
			deskripsi:
				"A favorite copy set by writing teachers for their pupils is the following, because it contains every letter of the alphabet: ‘A quick brown fox jumps over the lazy dog.’A favorite copy set by writing teachers for their pupils is the following, because it contains every letter of the alphabet: ‘A quick brown fox jumps over the lazy dog.’ ",
		};
	},
};
</script>
