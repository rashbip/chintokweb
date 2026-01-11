function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    let currentTheme = localStorage.getItem('theme') || 'system';

    function applyTheme(theme) {
        if (theme === 'system') {
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        } else {
            document.documentElement.setAttribute('data-theme', theme);
        }
        
        if (themeToggle) {
            const activeTheme = theme === 'system' 
                ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
                : theme;
            
            themeToggle.innerHTML = activeTheme === 'dark' 
                ? '<i class="fas fa-moon"></i>' 
                : '<i class="fas fa-sun"></i>';
        }
        localStorage.setItem('theme', theme);
    }

    applyTheme(currentTheme);

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (localStorage.getItem('theme') === 'system') {
            applyTheme('system');
        }
    });

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (currentTheme === 'dark') currentTheme = 'light';
            else if (currentTheme === 'light') currentTheme = 'system';
            else currentTheme = 'dark';
            
            applyTheme(currentTheme);
        });
    }
}
