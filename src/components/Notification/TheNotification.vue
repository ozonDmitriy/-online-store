<script lang="ts" setup>
import { useNotificationStore } from '../../message'

const notification = useNotificationStore()
</script>

<template>
  <transition name="fade">
    <div v-if="notification.isVisible" class="notification" :class="notification.type">
      <img
        v-if="notification.type === 'error'"
        src="/images/iconError2.svg"
        class="icon"
        alt="error"
      />

      <img
        v-else-if="notification.type === 'success'"
        src="/images/IconSucces.svg"
        class="icon"
        alt="success"
      />

      {{ notification.text }}
    </div>
  </transition>
</template>

<style scoped lang="scss">
.icon {
  width: 20px;
  height: 20px;
}
.notification {
  display: flex;
  align-items: center;
  gap: 10px;
  position: fixed;
  width: auto;
  top: 130px;
  left: 50%;
  transform: translateX(-50%);
  padding: 14px 22px;
  border-radius: 10px;
  font-weight: 600;
  font-family: var(--font-family-base);
  color: black;
  z-index: 1000;
}

/* success */
.notification.success {
  background: #efefef;
}

/* error */
.notification.error {
  background: #efefef;
}

/* animation */
.fade-enter-active,
.fade-leave-active {
  transition: 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
@media (max-width: 476px) {
  .notification {
    font-size: 12px;
  }
  .icon {
    width: 16px;
    height: 16px;
  }
}
@media (max-width: 375px) {
  .notification {
    font-size: 9.5px;
  }
  .icon {
    width: 13px;
    height: 13px;
  }
}
</style>
