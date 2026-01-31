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
// Initialize GSAP & ScrollTrigger
document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    // --- 2. Text Animations (GSAP) ---

    // A. Intro Text (Fade Out on Scroll)
    // Removed .text-corner target
    gsap.to('.intro-content .text-center', {
        scrollTrigger: {
            trigger: '#intro',
            start: "top top",
            end: "+=20%",
            scrub: true
        },
        opacity: 0,
        y: -100, // Move up
        filter: "blur(20px)" // Strong blur
    });

    // B. "Our Work" Masked Reveal (Staggered Words)
    // 1. Force initial state to hidden
    gsap.set(".word-reveal", { y: "110%" });

    ScrollTrigger.create({
        trigger: "#our-work",
        start: "top center",
        end: "+=500",
        pin: true,
        scrub: 1,
        // Animate "OUR" then "WORK"
        animation: gsap.to('.word-reveal', {
            y: "0%",
            duration: 2,
            stagger: 0.5, // 0.5s Delay between words
            ease: "power3.out"
        })
    });

    // C. "What We Do" 3D Flip Stagger + Pin + Cards Sequence
    const wwdText = new SplitType('#what-we-do h2', { types: 'chars' });
    const productGrid = document.querySelector('#product-grid');

    // SETUP: Force Initial State of Cards (Blur, Offsets)
    // This replaces the 'from' part of fromTo, ensuring they wait in the dark.
    if (productGrid) {
        gsap.set(".product-card:nth-child(1)", {
            x: -200, y: 50, rotationY: -25, autoAlpha: 0, filter: "blur(20px)"
        });
        gsap.set(".product-card:nth-child(2)", {
            x: 200, y: 50, rotationY: 25, autoAlpha: 0, filter: "blur(20px)"
        });
    }

    // Create a timeline that pins the section and plays the sequence
    const wwdTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#what-we-do",
            start: "top top",
            end: "+=250%", // Increased pin duration for longer sequential animation
            pin: true,
            scrub: 1
        }
    });

    // 1. Text Animation (Header)
    wwdTl.from(wwdText.chars, {
        rotateX: -90,
        opacity: 0,
        y: 50,
        stagger: 0.1,
        transformOrigin: "bottom center",
        ease: "back.out(1.7)",
        duration: 2
    })
        // 2. Tagline Animation
        .to(".wwd-header p", {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power2.out"
        }) // No overlap, waits for text

        // 3. Card 1 (Azel CS) - Slide from LEFT
        .to(".product-card:nth-child(1)", {
            x: 0,
            y: 0,
            rotationY: 0,
            autoAlpha: 1, // Force Visible
            filter: "blur(0px)",
            duration: 2,
            ease: "power3.out"
        })

        // 4. Card 2 (AI Video) - Slide from RIGHT
        .to(".product-card:nth-child(2)", {
            x: 0,
            y: 0,
            rotationY: 0,
            autoAlpha: 1, // Force Visible
            filter: "blur(0px)",
            duration: 2,
            ease: "power3.out"
        });

    // D. "Upcoming" Animations
    // 1. Header Animation (Smoother)
    gsap.from(".upcoming-header h2", {
        scrollTrigger: {
            trigger: "#upcoming",
            start: "top 80%",
            end: "top 50%",
            scrub: 1
        },
        x: -50,
        opacity: 0,
        filter: "blur(10px)",
        ease: "power2.out"
    });

    // 2. Items Parallax
    const upcomingItems = gsap.utils.toArray('.upcoming-item');
    upcomingItems.forEach((item, i) => {
        gsap.to(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 90%",
                end: "top 60%",
                scrub: 1
            },
            opacity: 1,
            y: 0,
            ease: "power2.out"
        });
    });

    // E. "Connect" Strict Sequence (Text FIRST -> Then Socials)
    const connectText = document.querySelector('#contact h2');
    const socialContainer = document.querySelector('.social-links-container');
    const socialBtns = document.querySelectorAll('.social-btn');

    // Ensure initial state
    if (socialContainer) gsap.set(socialContainer, { opacity: 0, y: 30 });
    if (socialBtns.length > 0) gsap.set(socialBtns, { opacity: 0, y: 20 });

    if (connectText && socialContainer) {
        const connectTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#contact",
                start: "top 80%", // Start earlier
                end: "bottom bottom",
                toggleActions: "play none none reverse" // Play once on enter
            }
        });

        // Step 1: Animate Text
        connectTl.fromTo(connectText,
            { letterSpacing: "-0.1em", opacity: 0, filter: "blur(10px)" },
            { letterSpacing: "0.2em", opacity: 1, filter: "blur(0px)", duration: 1.0, ease: "power2.out" }
        )

            // Step 2: Animate Socials
            .to(socialContainer, { opacity: 1, y: 0, duration: 0.1 }, "+=0.1")
            .to(socialBtns, {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 0.5,
                ease: "back.out(1.7)"
            });
    }

});

// Center -> Corner transition logic (Hybrid Approach)
// We can keep the simpler opacity fade for the whole container 
// OR integrate it into GSAP. For now, let's keep the vanilla logic 
// to avoid conflict, but ensure it targets the GSAP wrapper correctly.
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
            desc: "Complete post-production toolkit for filmmakers.",
            image: "assets/product-1.png",
            tags: ["LUTs", "Presets", "Overlays"]
        },
        {
            title: "AI Video Service",
            desc: "Custom generative video solutions for brands.",
            image: "assets/product-2.png",
            tags: ["Generative AI", "Consulting"]
        }
    ];

    const productGrid = document.getElementById('product-grid');
    if (productGrid) {
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            // Force hidden inline to prevent FOUC (Flash of Unstyled Content)
            card.style.opacity = '0';
            card.style.visibility = 'hidden';

            card.innerHTML = `
                <div class="card-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="card-content">
                    <h3>${product.title}</h3>
                    <p>${product.desc}</p>
                    <div class="tags">
                        ${product.tags.map(tag => `<span>${tag}</span>`).join('')}
                    </div>
                    <button class="btn-learn">Learn More</button>
                </div>
            `;
            productGrid.appendChild(card);
        });
    }

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
