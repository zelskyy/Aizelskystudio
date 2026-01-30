const loader = document.getElementById('loader');
const introContent = document.querySelector('.intro-content');
const scrollIndicator = document.querySelector('.scroll-indicator');

window.addEventListener('load', () => {
    // Wait for loading bar animation (approx 2s)
    setTimeout(() => {
        if (loader) {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
        }

        // Fade in Intro Content
        if (introContent) {
            introContent.style.opacity = '1';
            introContent.style.transform = 'translateY(0)';
        }
        if (scrollIndicator) {
            scrollIndicator.style.opacity = '1';
        }
    }, 2200);
});

// Parallax / Scroll Effect for Intro
// Parallax / Scroll Effect for Intro
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const introContent = document.querySelector('.intro-content');

    // If we are within the intro section (or close to top)
    if (scrollY < windowHeight && introContent) {
        const progress = scrollY / windowHeight;

        // 1. Fade out faster (gone by 70% scroll)
        const opacity = Math.max(0, 1 - (progress * 1.5));
        introContent.style.opacity = opacity.toString();

        // 2. Zoom In Effect (Scale Up) + Parallax (Move down slower than scroll)
        // translateY(scrollY * 0.5) makes it look like it's moving at half speed (sticky-ish)
        const scale = 1 + (progress * 0.5);
        introContent.style.transform = `translateY(${scrollY * 0.5}px) scale(${scale})`;

        // 3. Blur Effect (Cinematic exit)
        const blur = progress * 20; // Max 20px blur
        introContent.style.filter = `blur(${blur}px)`;
    }
});

document.addEventListener('DOMContentLoaded', () => {

    // --- Theme Toggle Logic ---
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
    }

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');

        // Save preference
        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });


    // --- NanoBanana Style Slider Logic ---
    const slides = document.querySelectorAll('.slide');
    const pills = document.querySelectorAll('.nav-pill');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;

    function goToSlide(index) {
        // Wrap around logic
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        currentSlide = index;

        // Update Slides
        slides.forEach(slide => slide.classList.remove('active'));
        slides[currentSlide].classList.add('active');

        // Update Pills
        pills.forEach(pill => pill.classList.remove('active'));
        if (pills[currentSlide]) pills[currentSlide].classList.add('active');
    }

    // Event Listeners for Slider
    if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

    pills.forEach((pill, index) => {
        pill.addEventListener('click', () => goToSlide(index));
    });


    // --- Data Injection ---
    const products = [
        {
            title: "Azel Cinematic Suite",
            description: "Advanced AI Prompt Builder. Generate stunning images and videos directly from your browser.",
            image: "assets/azel-suite-thumbnail.png",
            link: "https://azel-ai-pi.vercel.app/",
            ctaText: "Go to App"
        },
        {
            title: "AI Video Services",
            description: "Professional AI video production for trailers, ads, and creative projects. Tailored to your vision.",
            image: "assets/ai-video-service-thumbnail.png",
            link: "#contact",
            ctaText: "Contact Us"
        }
    ];

    const productGrid = document.getElementById('product-grid');

    function renderCards(data, container) {
        if (!container) return;
        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';

            card.innerHTML = `
                <div class="card-image" style="background-image: url('${item.image}')"></div>
                <div class="card-content">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <a href="${item.link}" class="card-link">${item.ctaText || 'Learn more'} &rarr;</a>
                </div>
            `;
            container.appendChild(card);
        });
    }

    renderCards(products, productGrid);

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.borderBottom = '1px solid var(--glass-border)';
        } else {
            navbar.style.borderBottom = '1px solid transparent';
        }
    });
});
