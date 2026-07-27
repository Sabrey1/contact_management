<script setup>
import { ref } from "vue";

import AppSidebar from "@/components/AppSidebar.vue";
import AppHeader from "@/components/AppHeader.vue";

const isSidebarOpen = ref(true);
</script>

<template>
  <div class="app-layout">

    <!-- Sidebar -->
    <AppSidebar
      :is-sidebar-open="isSidebarOpen"
      @toggle-sidebar="isSidebarOpen = !isSidebarOpen"
    />

    <!-- Main Area -->
    <div
      class="main-wrapper"
      :class="{
        collapsed: !isSidebarOpen
      }"
    >

      <!-- Header -->
      <AppHeader />

      <!-- Page Content -->
      <main class="main-content">
        <router-view />
      </main>

    </div>

  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  background: #f9fafb;
}

.main-wrapper {
  margin-left: 250px;
  min-height: 100vh;
  transition: margin-left 0.25s ease;
}

/* Sidebar collapsed */
.main-wrapper.collapsed {
  margin-left: 72px;
}

.main-content {
  min-height: calc(100vh - 72px);
  padding: 32px;
}

@media (max-width: 768px) {
  .main-wrapper {
    margin-left: 72px;
  }

  .main-wrapper.collapsed {
    margin-left: 72px;
  }

  .main-content {
    padding: 20px;
  }
}
</style>
