<template>
	<Disclosure as="nav" class="bg-slate-200" v-slot="{ open }">
		<div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
			<div class="relative flex h-16 items-center justify-between">
				<div
					class="absolute inset-y-0 left-0 flex items-center sm:hidden"
				>
					<!-- Mobile menu button-->
					<DisclosureButton
						class="relative inline-flex items-center justify-center rounded-md p-2 text-black-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
					>
						<span class="absolute -inset-0.5" />
						<span class="sr-only">Open main menu</span>
						<Bars3Icon
							v-if="!open"
							class="block h-6 w-6"
							aria-hidden="true"
						/>
						<XMarkIcon
							v-else
							class="block h-6 w-6"
							aria-hidden="true"
						/>
					</DisclosureButton>
				</div>
				<div
					class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
				>
					<div class="flex flex-shrink-0 items-center">
						<h1 class="text-xl font-black">PCR overflow</h1>
					</div>
					<div class="hidden sm:ml-6 sm:block">
						<div class="flex space-x-4">
							<a
								v-for="item in navigation"
								:key="item.name"
								:href="item.href"
								:class="[
									item.current
										? 'bg-blue-500 text-white'
										: 'text-black-300 hover:bg-blue-400 hover:text-white',
									'rounded-md px-3 py-2 text-sm font-medium',
								]"
								:aria-current="
									item.current ? 'page' : undefined
								"
								>{{ item.name }}</a
							>
						</div>
					</div>
				</div>
				<div
					class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
				>
					<button
						type="button"
						class="relative rounded-md bg-inherit px-3 py-2 text-black-400 ring-2 ring-blue-500 hover:text-white hover:bg-blue-500"
					>
						+ Create
					</button>
				</div>
			</div>
		</div>

		<DisclosurePanel class="sm:hidden">
			<div class="space-y-1 px-2 pb-3 pt-2">
				<DisclosureButton
					v-for="item in navigation"
					:key="item.name"
					as="a"
					:href="item.href"
					:class="[
						item.current
							? 'bg-gray-900 text-white'
							: 'text-black-300 hover:bg-gray-700 hover:text-white',
						'block rounded-md px-3 py-2 text-base font-medium',
					]"
					:aria-current="item.current ? 'page' : undefined"
					>{{ item.name }}</DisclosureButton
				>
			</div>
		</DisclosurePanel>
	</Disclosure>
</template>

<script setup>
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from "@headlessui/vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";

const navigation = [
	{ name: "Home", href: "/", current: true },
	{ name: "My Questions", href: "/mine", current: false },
];
</script>
