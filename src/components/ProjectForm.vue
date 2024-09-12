<template>
  <form @submit.prevent="handleSubmit" class="p-6">
    <h2 class="text-lg font-medium text-gray-900 mb-4">Project</h2>
    <div class="space-y-4">
      <!-- Project Name -->
      <div>
        <label for="projectName" class="block text-sm font-medium text-gray-700"
          >Project Name</label
        >
        <input
          type="text"
          id="projectName"
          v-model="form.name"
          maxlength="200"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
      <!-- Project Location -->
      <div>
        <label
          for="projectLocation"
          class="block text-sm font-medium text-gray-700"
          >Project Location</label
        >
        <input
          type="text"
          id="projectLocation"
          v-model="form.location"
          maxlength="500"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
      <!-- Project Stage -->
      <div>
        <label
          for="projectStage"
          class="block text-sm font-medium text-gray-700"
          >Project Stage</label
        >
        <select
          id="projectStage"
          v-model="form.stage"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <option value="Concept">Concept</option>
          <option value="Design & Documentation">Design & Documentation</option>
          <option value="Pre-Construction">Pre-Construction</option>
          <option value="Construction">Construction</option>
        </select>
      </div>
      <!-- Project Category -->
      <div>
        <label
          for="projectCategory"
          class="block text-sm font-medium text-gray-700"
          >Project Category</label
        >
        <select
          id="projectCategory"
          v-model="form.category"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <option value="Education">Education</option>
          <option value="Health">Health</option>
          <option value="Office">Office</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <!-- Other Category -->
      <div v-if="form.category === 'Other'">
        <label
          for="otherCategory"
          class="block text-sm font-medium text-gray-700"
          >Other Category</label
        >
        <input
          type="text"
          id="otherCategory"
          v-model="form.otherCategory"
          maxlength="200"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
      <!-- Construction Start Date -->
      <div>
        <label
          for="constructionStartDate"
          class="block text-sm font-medium text-gray-700"
          >Construction Start Date</label
        >
        <input
          type="date"
          id="constructionStartDate"
          v-model="form.construction_date"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
      <!-- Project Description -->
      <div>
        <label
          for="projectDescription"
          class="block text-sm font-medium text-gray-700"
          >Project Description</label
        >
        <textarea
          id="projectDescription"
          v-model="form.description"
          maxlength="2000"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          rows="4">
        </textarea>
      </div>
    </div>
    <div class="mt-6 flex justify-end space-x-3">
      <button
        type="button"
        @click="$emit('cancel')"
        class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Cancel
      </button>
      <button
        type="submit"
        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Save
      </button>
    </div>
  </form>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "ProjectForm",
  props: {
    project: {
      type: Object,
      default: () => null,
    },
  },
  emits: ["save", "cancel"],
  setup(props, { emit }) {
    const form = ref({
      name: "",
      location: "",
      stage: "Concept",
      category: "Education",
      otherCategory: "",
      construction_date: "",
      description: "",
    });

    onMounted(() => {
      if (props.project) {
        Object.assign(form.value, props.project);
      }
    });

    const isValidForm = () => {
      const { stage, construction_date } = form.value;
      const today = new Date();
      const startDate = new Date(construction_date);

      if (
        ["Concept", "Design & Documentation", "Pre-Construction"].includes(
          stage
        )
      ) {
        return startDate > today;
      }

      return true;
    };

    const handleSubmit = () => {
      if (!isValidForm()) {
        alert(
          "Please fill all required fields and ensure the construction start date is valid."
        );
        return;
      }

      const projectData = { ...form.value };
      if (props.project && props.project.id) {
        projectData.id = props.project.id;
      } else {
        projectData.id = Date.now().toString();
      }

      if (projectData.category !== "Other") {
        delete projectData.other;
      }

      emit("save", projectData);
    };

    return {
      form,
      handleSubmit,
    };
  },
};
</script>
