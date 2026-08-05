<template>
  <footer class="demo-footer">
    <div class="footer-content">
      <div class="footer-creator">
        <img src="/images/avatar.webp" alt="Cyrene2008" class="footer-avatar" />
        <div class="footer-creator-info">
          <span class="footer-creator-name">Cyrene2008</span>
          <a href="https://github.com/Cyrene2008" target="_blank" rel="noopener noreferrer" class="footer-github">
            <FluentIcon icon="mark-github-16" :width="16" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
      <div class="footer-links">
        <a href="https://github.com/StarCyrene" target="_blank" rel="noopener noreferrer" class="footer-org-link">
          <img src="/images/starcyrene.ico" alt="StarCyrene" class="footer-org-icon" />
          <span>StarCyrene Organization</span>
        </a>
        <a href="https://github.com/Cyrene2008/VueFluentWidgets" target="_blank" rel="noopener noreferrer">
          <FluentIcon icon="code-16-regular" :width="16" />
          <span>Vue Fluent Widgets</span>
        </a>
      </div>
      <div class="footer-copyright">
        <p>Vue Fluent Widgets - Fluent Design System for Vue</p>
        <p class="footer-credit">Created by Cyrene2008 & StarCyrene</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import FluentIcon from './FluentIcon.vue'
</script>

<style scoped>
.demo-footer {
  background: var(--bg-card);
  border-top: 1px solid var(--border-strong);
  padding: 24px 40px;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
}

.footer-creator {
  display: flex;
  align-items: center;
  gap: 12px;
}

.footer-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--border-strong);
}

.footer-creator-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.footer-creator-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.footer-github {
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  color: var(--text-secondary);
  font-size: 13px;
  transition: color 0.2s ease;
}

.footer-github:hover {
  color: var(--accent);
}

.footer-links {
  display: flex;
  gap: 24px;
}

.footer-links a {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: var(--text-secondary);
  font-size: 14px;
  transition: color 0.2s ease;
}

.footer-links a:hover {
  color: var(--accent);
}

.footer-org-link {
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer-org-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.footer-copyright {
  text-align: right;
}

.footer-copyright p {
  margin: 0;
  font-size: 12px;
  color: var(--text-muted);
  line-height: 18px;
}

.footer-credit {
  font-weight: 600;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
  }
  
  .footer-creator {
    justify-content: center;
  }
  
  .footer-links {
    flex-direction: column;
    gap: 12px;
  }
  
  .footer-copyright {
    text-align: center;
  }
}
</style>