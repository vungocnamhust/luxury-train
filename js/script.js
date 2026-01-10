/* Main JavaScript for Luxury Train Project */

document.addEventListener('DOMContentLoaded', () => {
    // ===================================
    // Header Scroll Effect
    // ===================================
    const header = document.getElementById('main-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            header.classList.remove('transparent');
        } else {
            header.classList.remove('scrolled');
            header.classList.add('transparent');
        }
    });

    // ===================================
    // Mobile Menu Toggle
    // ===================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            if (mainNav.classList.contains('mobile-active')) {
                mainNav.classList.remove('mobile-active');
                mainNav.style.display = 'none';
            } else {
                mainNav.classList.add('mobile-active');
                mainNav.style.display = 'block';
                mainNav.style.position = 'absolute';
                mainNav.style.top = '100%';
                mainNav.style.left = '0';
                mainNav.style.width = '100%';
                mainNav.style.backgroundColor = '#fff';
                mainNav.style.padding = '30px 20px';
                mainNav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
                mainNav.style.borderRadius = '0 0 10px 10px';

                // Adjust menu items for mobile
                const menuList = mainNav.querySelector('.menu');
                menuList.style.flexDirection = 'column';
                menuList.style.gap = '15px';

                const menuItems = mainNav.querySelectorAll('.menu > li > a');
                menuItems.forEach(item => {
                    item.style.color = '#333';
                    item.style.display = 'block';
                    item.style.padding = '10px 0';
                });
            }
        });
    }

    // ===================================
    // Why Choose Carousel
    // ===================================
    const whyCarousel = document.querySelector('.why-carousel');
    const whyPrevBtn = document.querySelector('.why-carousel-nav.prev');
    const whyNextBtn = document.querySelector('.why-carousel-nav.next');

    let whyAutoScrollInterval;
    let isWhyCarouselHovered = false;

    function scrollWhyCarousel(direction) {
        if (whyCarousel) {
            const cardWidth = whyCarousel.querySelector('.why-card').offsetWidth;
            const scrollAmount = direction === 'next' ? cardWidth + 30 : -(cardWidth + 30);
            whyCarousel.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    }

    function startWhyAutoScroll() {
        whyAutoScrollInterval = setInterval(() => {
            if (!isWhyCarouselHovered && whyCarousel) {
                const cardWidth = whyCarousel.querySelector('.why-card').offsetWidth;
                const maxScroll = whyCarousel.scrollWidth - whyCarousel.clientWidth;

                // If we've reached the end, scroll back to start
                if (whyCarousel.scrollLeft >= maxScroll - 10) {
                    whyCarousel.scrollTo({
                        left: 0,
                        behavior: 'smooth'
                    });
                } else {
                    whyCarousel.scrollBy({
                        left: cardWidth + 30,
                        behavior: 'smooth'
                    });
                }
            }
        }, 4000); // Auto-scroll every 4 seconds
    }

    function resetWhyAutoScroll() {
        clearInterval(whyAutoScrollInterval);
        startWhyAutoScroll();
    }

    // Event listeners for manual navigation
    if (whyPrevBtn) {
        whyPrevBtn.addEventListener('click', () => {
            scrollWhyCarousel('prev');
            resetWhyAutoScroll();
        });
    }

    if (whyNextBtn) {
        whyNextBtn.addEventListener('click', () => {
            scrollWhyCarousel('next');
            resetWhyAutoScroll();
        });
    }

    // Pause auto-scroll on hover
    if (whyCarousel) {
        whyCarousel.addEventListener('mouseenter', () => {
            isWhyCarouselHovered = true;
            clearInterval(whyAutoScrollInterval);
        });

        whyCarousel.addEventListener('mouseleave', () => {
            isWhyCarouselHovered = false;
            startWhyAutoScroll();
        });

        // Enable drag to scroll
        let isWhyDown = false;
        let whyStartX;
        let whyScrollLeft;

        whyCarousel.addEventListener('mousedown', (e) => {
            isWhyDown = true;
            whyCarousel.style.cursor = 'grabbing';
            whyStartX = e.pageX - whyCarousel.offsetLeft;
            whyScrollLeft = whyCarousel.scrollLeft;
        });

        whyCarousel.addEventListener('mouseleave', () => {
            isWhyDown = false;
            whyCarousel.style.cursor = 'grab';
        });

        whyCarousel.addEventListener('mouseup', () => {
            isWhyDown = false;
            whyCarousel.style.cursor = 'grab';
        });

        whyCarousel.addEventListener('mousemove', (e) => {
            if (!isWhyDown) return;
            e.preventDefault();
            const x = e.pageX - whyCarousel.offsetLeft;
            const walk = (x - whyStartX) * 2;
            whyCarousel.scrollLeft = whyScrollLeft - walk;
        });

        // Start auto-scrolling
        startWhyAutoScroll();
    }

    // ===================================
    // Smooth Scrolling for Anchor Links
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ===================================
    // Journey Cards Animation on Scroll
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, observerOptions);

    // Observe journey cards with staggered animation
    const journeyCards = document.querySelectorAll('.journey-card');
    journeyCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-50px)';
        // Add staggered delay: each card animates 0.15s after the previous one
        const delay = index * 0.15;
        card.style.transition = `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`;
        observer.observe(card);
    });

    // ===================================
    // Simple Carousel Auto-scroll (Optional Enhancement)
    // ===================================
    const carousel = document.querySelector('.journeys-carousel');
    if (carousel) {
        let isDown = false;
        let startX;
        let scrollLeft;

        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            carousel.style.cursor = 'grabbing';
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });

        carousel.addEventListener('mouseleave', () => {
            isDown = false;
            carousel.style.cursor = 'grab';
        });

        carousel.addEventListener('mouseup', () => {
            isDown = false;
            carousel.style.cursor = 'grab';
        });

        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });

        // Navigation buttons
        const prevBtn = document.querySelector('.carousel-nav.prev');
        const nextBtn = document.querySelector('.carousel-nav.next');

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                const cardWidth = carousel.querySelector('.journey-card').offsetWidth;
                carousel.scrollBy({
                    left: -(cardWidth + 25), // card width + gap
                    behavior: 'smooth'
                });
            });

            nextBtn.addEventListener('click', () => {
                const cardWidth = carousel.querySelector('.journey-card').offsetWidth;
                carousel.scrollBy({
                    left: cardWidth + 25, // card width + gap
                    behavior: 'smooth'
                });
            });
        }
    }

    // ===================================
    // Add Loading Animation
    // ===================================
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // ===================================
    // Newsletter Form Handler
    // ===================================
    const newsletterForm = document.getElementById('newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(newsletterForm);
            const firstName = newsletterForm.querySelector('input[type="text"]').value;
            const email = newsletterForm.querySelector('input[type="email"]').value;

            // Simple validation
            if (firstName && email) {
                // Show success message
                const submitBtn = newsletterForm.querySelector('.btn');
                const originalText = submitBtn.textContent;

                submitBtn.textContent = '✓ SUBSCRIBED!';
                submitBtn.style.backgroundColor = '#28a745';
                submitBtn.style.borderColor = '#28a745';

                // Reset form
                newsletterForm.reset();

                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.style.borderColor = '';
                }, 3000);
            }
        });
    }

    console.log('✅ Luxury Train Project Loaded Successfully');
});
