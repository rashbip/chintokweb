document.addEventListener("DOMContentLoaded", () => {
    // Initialize modules
    if (typeof initTheme === 'function') initTheme();
    if (typeof initI18n === 'function') initI18n();
    if (typeof initUI === 'function') initUI();
});
