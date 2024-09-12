<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">
          Construction Project Management
        </h1>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-semibold text-gray-900">Projects</h2>
            <button
              @click="showCreateForm = true"
              class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
              Create Project
            </button>
          </div>
          <ProjectList
            :projects="projects"
            @edit="editProject"
            @delete="deleteProject" />
        </div>
      </div>
    </main>

    <!-- Modal for Create/Edit Project -->
    <div
      v-if="showCreateForm || editingProject"
      class="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"></div>
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <ProjectForm
            :project="editingProject || null"
            @save="saveProject"
            @cancel="cancelEdit" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import ProjectList from "../components/ProjectList.vue";
import ProjectForm from "../components/ProjectForm.vue";

export default {
  name: "Home",
  components: {
    ProjectList,
    ProjectForm,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const showCreateForm = ref(false);
    const editingProject = ref(null);

    const projects = computed(() => store.state.projects);
    const isLoggedIn = computed(() => store.getters.isAuthenticated);

    // Redirect to login if not authenticated
    if (!isLoggedIn.value) {
      router.push("/login");
    }

    const editProject = (project) => {
      editingProject.value = { ...project };
      showCreateForm.value = true;
    };

    const deleteProject = (projectId) => {
      if (confirm("Are you sure you want to delete this project?")) {
        store.dispatch("deleteProject", projectId);
      }
    };

    const saveProject = (project) => {
      console.log(project);

      const existingProject = projects.value.find((p) => p.id === project.id);
      if (existingProject) {
        store.dispatch("updateProject", project);
      } else {
        console.log("add");
        store.dispatch("createProject", project);
      }

      showCreateForm.value = false;
      editingProject.value = null;
    };

    const cancelEdit = () => {
      showCreateForm.value = false;
      editingProject.value = null;
    };

    const logout = () => {
      store.dispatch("logout");
      router.push("/login");
    };

    return {
      projects,
      showCreateForm,
      editingProject,
      editProject,
      deleteProject,
      saveProject,
      cancelEdit,
      logout,
      isLoggedIn,
    };
  },
};
</script>
