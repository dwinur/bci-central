import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./index.css";

// Initialize users in localStorage if not already present
if (!localStorage.getItem("users")) {
  const users = [
    {
      email: "admin@example.com",
      password: "password123",
      name: "admin testing",
    },
  ];
  localStorage.setItem("users", JSON.stringify(users));
}

createApp(App).use(store).use(router).mount("#app");
