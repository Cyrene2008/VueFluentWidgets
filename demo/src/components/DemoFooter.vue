<template>
  <footer class="demo-footer">
    <div class="footer-content">
      <div class="footer-main">
        <div class="footer-creator">
          <img :src="asset('images/avatar.webp')" alt="Cyrene2008" class="footer-avatar" />
          <div class="footer-creator-info">
            <span class="footer-creator-name">Cyrene2008</span>
            <span class="footer-role">独立开发者</span>
            <a href="https://github.com/Cyrene2008" target="_blank" rel="noopener noreferrer" class="footer-github">
              <FluentIcon icon="code-20-regular" :width="20" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
        <div class="footer-project">
          <a href="https://github.com/Cyrene2008/VueFluentWidgets" target="_blank" rel="noopener noreferrer">
            <FluentIcon icon="code-20-regular" :width="20" />
            <span>Vue Fluent Widgets</span>
          </a>
          <p>Fluent Design System for Vue</p>
          <p>Developed by Cyrene2008</p>
        </div>
      </div>

      <div class="footer-org">
        <img :src="asset('images/starcyrene.ico')" alt="StarCyrene" class="footer-org-icon" />
        <div class="footer-org-copy">
          <span class="footer-org-name">星海昔涟 StarCyrene</span>
          <span>「以爱为因，星光成涟」♪</span>
          <span>Made with Love, Starlight Ripples On♪</span>
          <a href="https://cyrene.hk" target="_blank" rel="noopener noreferrer" class="footer-org-site">
            <FluentIcon icon="code-20-regular" :width="20" />
            <span>团队官网 cyrene.hk</span>
          </a>
        </div>
      </div>

      <div class="footer-legal">
        <span>Copyright © Cyrene2008</span>
        <a href="https://github.com/Cyrene2008/VueFluentWidgets/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">MIT License</a>
        <a href="https://icp.gov.moe/?keyword=20265293" target="_blank" rel="noopener noreferrer">萌ICP备20265293号</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { FluentIcon } from 'vue-fluent-widgets'

const asset = path => `${import.meta.env.BASE_URL}${path}`
</script>

<style scoped>
.demo-footer {
  background: var(--bg-card);
  border-top: 1px solid var(--border-strong);
  padding: 32px 40px;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 24px;
}

.footer-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
}

.footer-creator {
  display: flex;
  align-items: center;
  gap: 18px;
}

.footer-avatar {
  width: 68px;
  height: 68px;
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
  font-size: 19px;
  font-weight: 600;
  color: var(--text-primary);
}

.footer-role {
  color: var(--text-muted);
  font-size: 14px;
}

.footer-github {
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  color: var(--text-secondary);
  font-size: 15px;
  transition: color 0.2s ease;
}

.footer-github:hover {
  color: var(--accent);
}

.footer-project {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  text-align: right;
}

.footer-project a {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: var(--text-secondary);
  font-size: 16px;
  transition: color 0.2s ease;
}

.footer-project a:hover,
.footer-org-site:hover,
.footer-legal a:hover {
  color: var(--accent);
}

.footer-org {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-top: 20px;
  border-top: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  font-size: 15px;
}

.footer-org-name {
  color: var(--text-primary);
  font-size: 17px;
  font-weight: 600;
  text-decoration: none;
}

.footer-org-copy {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.footer-org-icon {
  width: 68px;
  height: 68px;
  object-fit: contain;
}

.footer-org-site {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  width: fit-content;
  margin-top: 3px;
  color: var(--text-secondary);
  font-size: 14px;
  text-decoration: none;
}

.footer-project p,
.footer-legal {
  font-size: 14px;
  color: var(--text-muted);
}

.footer-legal {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 18px;
  padding-top: 14px;
  border-top: 1px solid var(--border-subtle);
}

.footer-legal a {
  color: var(--text-secondary);
  text-decoration: none;
}

@media (max-width: 768px) {
  .footer-content {
    text-align: center;
  }

  .footer-main {
    flex-direction: column;
  }

  .footer-project {
    align-items: center;
    text-align: center;
  }

  .footer-org {
    justify-content: center;
    text-align: left;
  }

  .footer-legal {
    justify-content: center;
  }
}
</style>
