<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-lg">
    <div v-if="projects.length > 0">
      <ul class="divide-y divide-gray-200">
        <li
          v-for="project in projects"
          :key="project.id"
          class="px-4 py-4 sm:px-6">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium text-gray-900 truncate">
              {{ project.name }}
            </h3>
            <span
              class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
              :class="statusClass(project.stage)">
              {{ project.stage }}
            </span>
          </div>
          <div class="mt-2 sm:flex sm:justify-between">
            <div class="sm:flex">
              <p class="flex items-center text-sm text-gray-500">
                <span class="truncate">{{ project.description }}</span>
              </p>
            </div>
            <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
              <p>Start Date: {{ formatDate(project.construction_date) }}</p>
            </div>
          </div>
          <div class="mt-3 flex space-x-2">
            <button
              @click="$emit('edit', project)"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs">
              Edit
            </button>
            <button
              @click="$emit('delete', project)"
              class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs">
              Delete
            </button>
          </div>
        </li>
      </ul>
    </div>
    <div v-else class="px-4 py-5 sm:px-6 text-center">
      <svg
        class="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No projects found</h3>
      <p class="mt-1 text-sm text-gray-500">
        Get started by creating a new project.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectList",
  props: {
    projects: {
      type: Array,
      required: true,
    },
  },
  emits: ["edit", "delete"],
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    statusClass(status) {
      switch (status.toLowerCase()) {
        case "active":
          return "bg-green-100 text-green-800";
        case "pending":
          return "bg-yellow-100 text-yellow-800";
        case "completed":
          return "bg-blue-100 text-blue-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    },
  },
};
</script>
