import { createStore } from "vuex";

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    projects: JSON.parse(localStorage.getItem("projects")) || [], // Load from localStorage
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    clearUser(state) {
      state.user = null;
      localStorage.removeItem("user");
    },
    addProject(state, project) {
      console.log("masuk kesini", project);
      state.projects.push(project);
      localStorage.setItem("projects", JSON.stringify(state.projects)); // Save to localStorage
    },
    updateProject(state, updatedProject) {
      const index = state.projects.findIndex((p) => p.id === updatedProject.id);
      if (index !== -1) {
        state.projects[index] = updatedProject;
        localStorage.setItem("projects", JSON.stringify(state.projects)); // Save to localStorage
      }
    },
    deleteProject(state, projectId) {
      state.projects = state.projects.filter((p) => p.id !== projectId);
      localStorage.setItem("projects", JSON.stringify(state.projects)); // Save to localStorage
    },
  },
  actions: {
    login({ commit }, credentials) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (u) =>
          u.email === credentials.email && u.password === credentials.password
      );

      if (user) {
        const { password, ...userWithoutPassword } = user;
        commit("setUser", userWithoutPassword);
        return Promise.resolve();
      } else {
        return Promise.reject(new Error("Invalid credentials"));
      }
    },
    logout({ commit }) {
      commit("clearUser");
    },
    createProject({ commit }, project) {
      commit("addProject", project);
    },
    updateProject({ commit }, project) {
      commit("updateProject", project);
    },
    deleteProject({ commit }, projectId) {
      commit("deleteProject", projectId);
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    getProjectById: (state) => (id) => {
      return state.projects.find((project) => project.id === id);
    },
  },
});
