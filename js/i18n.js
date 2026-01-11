function initI18n() {
    const langToggle = document.getElementById('lang-toggle');
    let currentLang = localStorage.getItem('lang') || 'en';

    function updateLanguage() {
        const t = translations[currentLang];
        if (!t) return;
        
        document.title = t.page_title;
        document.documentElement.lang = currentLang;

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key]) el.innerHTML = t[key];
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (t[key]) el.placeholder = t[key];
        });
        
        if (langToggle) langToggle.innerHTML = t.lang_btn;
        localStorage.setItem('lang', currentLang);
    }

    updateLanguage();

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'bn' : 'en';
            updateLanguage();
        });
    }
}
