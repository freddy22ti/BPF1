import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router  from "./router.js";

import "@fortawesome/fontawesome-free/css/all.css";
// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, fa } from "vuetify/iconsets/fa";

const vuetify = createVuetify({
	components,
	directives,
	icons: {
		defaultSet: "fa",
		aliases,
		sets: {
			fa,
		},
	},
	ssr: true,
});

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(vuetify);

app.mount("#app");
