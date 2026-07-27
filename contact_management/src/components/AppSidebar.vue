<script setup>
import { ref } from "vue";
import { useRoute, RouterLink } from "vue-router";

const route = useRoute();
const isSidebarOpen = ref(true);

const menuItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: "⌂",
  },
  {
    name: "Email",
    path: "/email",
    icon: "▣",
  },
  {
    name: "Phone Number",
    path: "/phone",
    icon: "▣",
  },
  {
    name: "Contact",
    path: "/contact",
    icon: "♙",
  },
  {
    name: "Customers",
    path: "/customers",
    icon: "♙",
  },
  {
    name: "Role",
    path: "/role",
    icon: "◈",
  },
  {
    name: "User",
    path: "/user",
    icon: "♙",
  },
  {
    name: "Settings",
    path: "/settings",
    icon: "⚙",
  },
];
</script>

<template>
  <aside
    class="sidebar"
    :class="{ collapsed: !isSidebarOpen }"
  >
    <!-- Sidebar Header -->
    <div class="sidebar-header">

      <!-- Logo -->
      <div class="logo">
        <div class="logo-icon">
          A
        </div>

        <span
          v-if="isSidebarOpen"
          class="logo-text"
        >
          Admin
        </span>
      </div>

      <!-- Toggle Button -->
      <button
        class="toggle-button"
        @click="isSidebarOpen = !isSidebarOpen"
      >
        ☰
      </button>

    </div>

    <!-- Navigation -->
    <nav class="navigation">
      <p
        v-if="isSidebarOpen"
        class="menu-label"
      >
        MENU
      </p>

      <RouterLink
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        class="nav-item"
        :class="{
          active: route.path === item.path
        }"
      >
        <!-- Icon -->
        <span class="nav-icon">
          {{ item.icon }}
        </span>

        <!-- Text -->
        <span
          v-if="isSidebarOpen"
          class="nav-text"
        >
          {{ item.name }}
        </span>
      </RouterLink>

    </nav>

    <!-- Sidebar Footer -->
    <div class="sidebar-footer">

      <div class="user-avatar">
        R
      </div>

      <div
        v-if="isSidebarOpen"
        class="user-info"
      >
        <strong>Rohany</strong>
        <span>Administrator</span>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  background: #ffffff;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  transition: width 0.25s ease;
  overflow: hidden;
}

/* Collapsed Sidebar */
.sidebar.collapsed {
  width: 72px;
}

.sidebar-header {
  height: 72px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f0f0f0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  overflow: hidden;
}

.logo-icon {
  width: 38px;
  height: 38px;
  min-width: 38px;
  border-radius: 10px;
  background: #111827;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
}

.logo-text {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  white-space: nowrap;
}

/* Toggle */
.toggle-button {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  font-size: 20px;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-button:hover {
  background: #f3f4f6;
  color: #111827;
}

.navigation {
  flex: 1;
  padding: 24px 12px;
  overflow-y: auto;
}

.menu-label {
  font-size: 11px;
  font-weight: 600;
  color: #9ca3af;
  padding: 0 12px;
  margin: 0 0 10px;
  letter-spacing: 0.08em;
}

.nav-item {
  height: 46px;
  margin-bottom: 6px;
  padding: 0 12px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: #6b7280;
  text-decoration: none;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.nav-item:hover {
  background: #f3f4f6;
  color: #111827;
}

.nav-item.active {
  background: #111827;
  color: #ffffff;
}

.nav-icon {
  width: 24px;
  min-width: 24px;
  text-align: center;
  font-size: 18px;
}

.nav-text {
  font-size: 14px;
  font-weight: 500;
}
.sidebar-footer {
  padding: 16px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-avatar {
  width: 38px;
  height: 38px;
  min-width: 38px;
  border-radius: 50%;
  background: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #374151;
}

.user-info {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.user-info strong {
  font-size: 13px;
  color: #111827;
  white-space: nowrap;
}

.user-info span {
  font-size: 11px;
  color: #9ca3af;
  margin-top: 2px;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .sidebar {
    width: 72px;
  }

  .sidebar:not(.collapsed) {
    width: 250px;
  }
}
</style>
