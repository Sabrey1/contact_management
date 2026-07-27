<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const pageTitles = {
  "/": "Dashboard",
  "/email": "Email",
  "/phone": "Phone Number",
  "/contact": "Contact",
  "/customers": "Customers",
  "/role": "Role Management",
  "/user": "User Management",
  "/settings": "Settings",
};

const pageTitle = computed(() => {
  return pageTitles[route.path] || "Admin Panel";
});
</script>

<template>
  <header class="app-header">

    <!-- Left -->
    <div class="header-left">

      <div>
        <h2>
          {{ pageTitle }}
        </h2>

        <p>
          Welcome back, Rohany
        </p>
      </div>

    </div>

    <!-- Right -->
    <div class="header-right">

      <!-- Notification -->
      <button class="notification-button">
        <span class="notification-icon">
          🔔
        </span>

        <span class="notification-badge">
          3
        </span>
      </button>

      <!-- Divider -->
      <div class="header-divider"></div>

      <!-- User -->
      <div class="header-user">

        <div class="header-avatar">
          R
        </div>

        <div class="header-user-info">
          <strong>
            Rohany
          </strong>

          <span>
            Administrator
          </span>
        </div>

        <span class="dropdown-icon">
          ▼
        </span>

      </div>

    </div>

  </header>
</template>

<style scoped>
.app-header {
  height: 72px;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 50;
}

.header-left {
  display: flex;
  align-items: center;
}

.header-left h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #111827;
}

.header-left p {
  margin: 3px 0 0;
  font-size: 12px;
  color: #9ca3af;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* Notification */
.notification-button {
  position: relative;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 10px;
  background: #f3f4f6;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification-button:hover {
  background: #e5e7eb;
}

.notification-icon {
  font-size: 17px;
}

.notification-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #ef4444;
  color: white;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
}

/* Divider */
.header-divider {
  width: 1px;
  height: 32px;
  background: #e5e7eb;
}

.header-user {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.header-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #111827;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.header-user-info {
  display: flex;
  flex-direction: column;
}

.header-user-info strong {
  font-size: 13px;
  color: #111827;
}

.header-user-info span {
  font-size: 11px;
  color: #9ca3af;
  margin-top: 2px;
}

.dropdown-icon {
  font-size: 9px;
  color: #9ca3af;
  margin-left: 4px;
}

@media (max-width: 768px) {
  .app-header {
    padding: 0 16px;
  }

  .header-left p {
    display: none;
  }

  .header-user-info,
  .dropdown-icon {
    display: none;
  }

  .header-right {
    gap: 10px;
  }
}
</style>
