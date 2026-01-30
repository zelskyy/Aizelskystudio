const loader = document.getElementById('loader');
const introContent = document.querySelector('.intro-content');
const scrollIndicator = document.querySelector('.scroll-indicator');

window.addEventListener('load', () => {

    // --- Loader Logic ---
    const initText = document.querySelector('.initializing-text');
    const percentText = document.querySelector('.loading-percentage');
    // More artistic/distinct fonts to show "shape shifting"
    const fonts = [
        'Courier New',       // Monospace (Code/Tech)
        'Brush Script MT',   // Cursive (Artistic/Signature)
        'Impact',            // Thick/Bold (poster)
        'Times New Roman',   // Classic Serif (Formal)
        'Comic Sans MS',     // Handwritten (Playful)
        'Trebuchet MS',      // Modern Sans
        'Lucida Console',    // Retro Terminal
        'Georgia',           // Elegant Serif
        'Segoe UI'           // Clean Modern
    ];

    // 1. Font Glitch Effect
    const fontInterval = setInterval(() => {
        if (initText) {
            const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
            initText.style.fontFamily = randomFont;
        }
    }, 100); // Change every 100ms

    // 2. Percentage Counter
    let percentage = 0;
    const counterInterval = setInterval(() => {
        percentage += 2; // Increment speed
        if (percentage > 100) percentage = 100;

        if (percentText) {
            percentText.innerText = percentage + '%';
        }

        if (percentage === 100) {
            clearInterval(counterInterval);
        }
    }, 40); // 40ms * 50 steps = 2000ms approx duration

    // 3. Finish Loading
    setTimeout(() => {
        clearInterval(fontInterval); // Stop glitch

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
    const introSection = document.getElementById('intro');
    const introContent = document.querySelector('.intro-content');

    // --- 1. Canvas Scroll Sequence Logic (Sticky Version) ---
    const canvas = document.getElementById('scroll-sequence');

    // Only animate if we are overlapping with the extended Intro section
    if (introSection && canvas && images.length > 0) {
        const introTop = introSection.offsetTop;
        const introHeight = introSection.offsetHeight;

        // Calculate how far we are into the intro section
        // 0 = top of section, 1 = bottom of section
        let progress = (scrollY - introTop) / (introHeight - windowHeight);

        // Clamp progress between 0 and 1
        progress = Math.min(1, Math.max(0, progress));

        // Map progress to frame index
        const frameIndex = Math.floor(progress * (frameCount - 1));

        // Draw the frame
        const ctx = canvas.getContext('2d');
        const img = images[frameIndex];

        if (img && img.complete) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }

        // --- 2. Parallax / Fade Out Logic ---
        // Fade out ONLY when we are near the end of the scroll (last 20%)
        // Also handle Text Transition
        const textCenter = document.querySelector('.text-center');
        const textCorner = document.querySelector('.text-corner');

        // 1. Fade OUT Center Text (0% to 30%)
        if (textCenter) {
            // progress 0 -> 0.3 maps to opacity 1 -> 0
            const opacityCenter = Math.max(0, 1 - (progress * 3.3));
            textCenter.style.opacity = opacityCenter.toString();

            // Add scale effect for center text
            const scaleCenter = 1 + (progress * 0.5);
            textCenter.style.transform = `scale(${scaleCenter})`;
        }

        // 2. Fade IN Corner Text (50% to 80%)
        if (textCorner) {
            // progress 0.5 -> 0.8 maps to opacity 0 -> 1
            if (progress > 0.5) {
                const opacityCorner = Math.min(1, (progress - 0.5) * 3.3);
                textCorner.style.opacity = opacityCorner.toString();
            } else {
                textCorner.style.opacity = '0';
            }
        }

        // Keep intro content visible until the very end, but maybe fade out background elements if needed
        if (progress > 0.9) {
            // Fade out everything slightly at the very end if desired
            introContent.style.opacity = Math.max(0, (1 - progress) * 10).toString();
        } else {
            introContent.style.opacity = '1';
        }
    }
});

// --- Preload Image Sequence ---
const frameCount = 40;
const images = [];

function preloadImages() {
    const canvas = document.getElementById('scroll-sequence');
    let loadedCount = 0;

    for (let i = 1; i <= frameCount; i++) {
        // Filename format: ezgif-frame-001.jpg
        const frameNum = i.toString().padStart(3, '0');
        const img = new Image();
        img.src = `assets/Image seq/ezgif-frame-${frameNum}.jpg`;

        img.onload = () => {
            loadedCount++;
            if (loadedCount === 1 && canvas) {
                // Set canvas resolution to match the image source for high quality
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;

                // Draw the first frame immediately
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            }
        };
        images.push(img);
    }
}

// Start preloading
preloadImages();

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
