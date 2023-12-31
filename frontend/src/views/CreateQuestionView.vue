<template>
	<div class="m-3 flex justify-center items-center">
		<form method="post" class="p-3 sm:w-full lg:w-6/12">
			<div class="space-y-12">
				<div class="border-b border-gray-900/10 pb-12">
					<h2
						class="text-3xl font-semibold leading-7 text-gray-900 text-center mt-3"
					>
						Membuat Pertanyaan
					</h2>

					<div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
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
						<div class="col-span-full">
							<label
								for="about"
								class="block text-sm font-medium leading-6 text-gray-900"
								>Deskripsi Pertanyaan</label
							>
							<div class="mt-2">
								<textarea
									id="about"
									name="about"
									rows="5"
									class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="mt-6 flex items-center justify-end gap-x-6">
				<button
					type="button"
					class="text-sm font-semibold leading-6 text-gray-900"
				>
					Cancel
				</button>
				<button
					type="submit"
					class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					Save
				</button>
			</div>
		</form>
	</div>
</template>

<script setup>

</script>
