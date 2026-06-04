// Theme initialization - run immediately to prevent flash
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle logic
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Set initial icon
        themeToggle.innerHTML = document.documentElement.getAttribute('data-theme') === 'light' ? '🌙' : '☀️';

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme); // Save preference

            // Update icon
            themeToggle.innerHTML = newTheme === 'light' ? '🌙' : '☀️';
        });
    }

    // Mobile navigation toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Toggle hamburger / close icon
            if (navLinks.classList.contains('active')) {
                mobileToggle.innerHTML = '✕';
                mobileToggle.setAttribute('aria-expanded', 'true');
                document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
            } else {
                mobileToggle.innerHTML = '☰';
                mobileToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileToggle.innerHTML = '☰';
                mobileToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Lightbox Functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxModel = document.getElementById('lightbox-model');
    const closeBtn = document.querySelector('.lightbox-close');

    if (lightbox && lightboxImg) {
        // Handle Images
        document.querySelectorAll('.project-image img').forEach(img => {
            img.addEventListener('click', function () {
                lightbox.style.display = 'flex';
                lightbox.style.justifyContent = 'center';
                lightbox.style.alignItems = 'center';

                // Show Image, Hide Model
                lightboxImg.src = this.src;
                lightboxImg.style.display = 'block';
                if (lightboxModel) lightboxModel.style.display = 'none';

                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });

        // Handle 3D Models
        document.querySelectorAll('.project-image model-viewer').forEach(model => {
            model.addEventListener('click', function () {
                lightbox.style.display = 'flex';
                lightbox.style.justifyContent = 'center';
                lightbox.style.alignItems = 'center';

                // Show Model, Hide Image
                lightboxImg.style.display = 'none';
                if (lightboxModel) {
                    lightboxModel.src = this.src;
                    lightboxModel.style.display = 'block';
                }

                document.body.style.overflow = 'hidden';
            });
        });

        // Close on X click
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                lightbox.style.display = 'none';
                document.body.style.overflow = '';
            });
        }

        // Close on clicking outside the media
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }
});
