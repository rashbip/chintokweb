function initUI() {
    // --- Device Detection ---
    const userAgent = navigator.userAgent.toLowerCase();
    const platform = navigator.platform.toLowerCase();
    const cards = document.querySelectorAll(".download-card");
    
    if (cards.length > 0) {
        cards.forEach((c) => c.classList.remove("recommended"));
        let recId = "card-web";

        if (/android/.test(userAgent)) recId = "card-android";
        else if (/win/.test(platform) || /windows/.test(userAgent)) recId = "card-windows";
        else if (/mac/.test(platform) || /macintosh/.test(userAgent)) recId = "card-mac";
        else if (/linux/.test(platform) || /linux/.test(userAgent)) recId = "card-linux";
        else if (/iphone|ipad|ipod/.test(userAgent)) recId = "card-ios";

        if (/smart-tv|smarttv|googletv|android tv|appletv/i.test(userAgent)) recId = "card-tv";

        const targetCard = document.getElementById(recId);
        if (targetCard) targetCard.classList.add("recommended");
    }

    // --- Hero Mosaic ---
    const mosaicContainer = document.getElementById('hero-mosaic');
    if (mosaicContainer) {
        const images = [
            'images/hero_bg/sample_thumb.jpg',
            'images/hero_bg/sample_thumb2.jpg',
            'images/hero_bg/sample_thumb3.jpg',
            'images/hero_bg/sample_thumb4.jpg',
            'images/hero_bg/sample_thumb5.jpg',
            'images/hero_bg/sample_thumb6.jpg'
        ];

        for (let r = 0; r < 4; r++) {
            const row = document.createElement('div');
            row.className = `mosaic-row ${r % 2 === 0 ? 'forward' : 'backward'}`;
            const rowImages = [...images, ...images, ...images]; 
            
            rowImages.forEach(imgSrc => {
                const item = document.createElement('div');
                item.className = 'mosaic-item';
                item.style.backgroundImage = `url('${imgSrc}')`;
                row.appendChild(item);
            });
            mosaicContainer.appendChild(row);
        }
    }

    // --- Auto-hide Floating Controls ---
    const floatingControls = document.querySelector('.floating-controls');
    let lastScrollTop = 0;
    let initialTimer;

    if (floatingControls) {
        floatingControls.classList.remove('hidden');
        initialTimer = setTimeout(() => {
            floatingControls.classList.add('hidden');
        }, 3000);

        window.addEventListener('scroll', () => {
            if (initialTimer) {
                clearTimeout(initialTimer);
                initialTimer = null;
            }
            
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const isAtBottom = (windowHeight + scrollTop) >= (documentHeight - 10);
            
            if (isAtBottom) {
                floatingControls.classList.add('hidden');
            } else if (scrollTop > lastScrollTop || scrollTop < 50) {
                floatingControls.classList.add('hidden');
            } else {
                floatingControls.classList.remove('hidden');
            }
            lastScrollTop = scrollTop;
        }, { passive: true });

        floatingControls.addEventListener('mouseenter', () => {
            if (initialTimer) clearTimeout(initialTimer);
            floatingControls.classList.remove('hidden');
        });
    }

    // --- Scroll Reveal Logic ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                // If you want it to re-animate every time you scroll back:
                entry.target.classList.remove('active');
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before it enters fully
    });

    revealElements.forEach(el => revealObserver.observe(el));
}
