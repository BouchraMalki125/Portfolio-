/* ============================================
   BOUCHRA MALKI — PORTFOLIO SCRIPTS
   Network Canvas, Scroll Animations, 
   Navigation, Project Filters
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // NETWORK CANVAS ANIMATION
    // ============================================
    const canvas = document.getElementById('networkCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null };
    let animationId;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            // Slower, smoother floating motion
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;
            // Bigger bubble sizes
            this.radius = Math.random() * 8 + 3;
            this.opacity = Math.random() * 0.15 + 0.05;
            // Alternate colors between soft teal (from the photo ring) and warm gold (from hijab details)
            this.color = Math.random() > 0.4 ? '94, 234, 212' : '212, 165, 116';
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

            // Smooth mouse pushing effect
            if (mouse.x !== null) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 200) {
                    this.x += dx * 0.005;
                    this.y += dy * 0.005;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            // Soft gradient highlight inside the bubble
            const gradient = ctx.createRadialGradient(
                this.x - this.radius * 0.3,
                this.y - this.radius * 0.3,
                this.radius * 0.1,
                this.x,
                this.y,
                this.radius
            );
            gradient.addColorStop(0, `rgba(${this.color}, ${this.opacity * 1.5})`);
            gradient.addColorStop(1, `rgba(${this.color}, 0)`);
            
            ctx.fillStyle = gradient;
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        // More bubbles since they are softer
        const count = Math.min(Math.floor((canvas.width * canvas.height) / 10000), 120);
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    // Connections removed to make them look like clean floating bubbles
    function drawConnections() {
        // Empty to keep bubbles floating independently
    }

    function animateCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        animationId = requestAnimationFrame(animateCanvas);
    }

    initParticles();
    animateCanvas();

    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });

    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    document.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // ============================================
    // NAVBAR — Scroll Effect & Active Link
    // ============================================
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section, .hero-section');

    function handleNavScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleNavScroll);
    handleNavScroll();

    // ============================================
    // MOBILE NAVIGATION
    // ============================================
    const navToggle = document.getElementById('navToggle');
    const navLinksContainer = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });

    // Close mobile nav on link click
    navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinksContainer.classList.remove('active');
        });
    });

    // ============================================
    // SMOOTH SCROLL FOR NAV LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ============================================
    // TYPING ANIMATION
    // ============================================
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = typingText.textContent;
        typingText.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 60);
            }
        }

        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    }

    // ============================================
    // SCROLL REVEAL ANIMATIONS
    // ============================================
    function addRevealClasses() {
        // Section headers
        document.querySelectorAll('.section-header').forEach(el => {
            el.classList.add('reveal');
        });

        // About
        document.querySelectorAll('.about-text').forEach(el => {
            el.classList.add('reveal-left');
        });
        document.querySelectorAll('.about-info-cards').forEach(el => {
            el.classList.add('reveal-right');
        });

        // Skill categories
        document.querySelectorAll('.skill-category').forEach((el, i) => {
            el.classList.add('reveal');
            el.style.transitionDelay = `${i * 0.1}s`;
        });

        // Timeline items
        document.querySelectorAll('.timeline-item').forEach((el, i) => {
            el.classList.add('reveal');
            el.style.transitionDelay = `${i * 0.15}s`;
        });

        // Project cards
        document.querySelectorAll('.project-card').forEach((el, i) => {
            el.classList.add('reveal');
            el.style.transitionDelay = `${i * 0.1}s`;
        });

        // Cert cards
        document.querySelectorAll('.cert-card').forEach((el, i) => {
            el.classList.add('reveal');
            el.style.transitionDelay = `${i * 0.1}s`;
        });

        // Contact
        document.querySelectorAll('.contact-info').forEach(el => {
            el.classList.add('reveal-left');
        });
        document.querySelectorAll('.contact-form').forEach(el => {
            el.classList.add('reveal-right');
        });
    }

    addRevealClasses();

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
        revealObserver.observe(el);
    });

    // ============================================
    // SKILL BARS ANIMATION
    // ============================================
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width + '%';
                        bar.classList.add('animated');
                    }, 200);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skill-category').forEach(cat => {
        skillObserver.observe(cat);
    });

    // ============================================
    // PROJECT FILTER
    // ============================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ============================================
    // CONTACT FORM
    // ============================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const btn = contactForm.querySelector('.btn-primary');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = `<span>Sending... ⏳</span>`;
            btn.disabled = true;

            const formData = new FormData(contactForm);

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();

                if (data.success) {
                    btn.innerHTML = `<span>Message Sent! ✨</span>`;
                    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                    contactForm.reset();
                } else {
                    btn.innerHTML = `<span>Error sending message!</span>`;
                    btn.style.background = '#ef4444';
                }
            } catch (error) {
                btn.innerHTML = `<span>Error sending message!</span>`;
                btn.style.background = '#ef4444';
            }

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.disabled = false;
            }, 4000);
        });
    }

    // ============================================
    // PROFILE IMAGE FALLBACK
    // ============================================
    const heroImage = document.getElementById('heroImage');
    if (heroImage) {
        heroImage.addEventListener('error', () => {
            // Create a beautiful gradient placeholder with initials
            heroImage.style.display = 'none';
            const container = heroImage.parentElement;
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                width: 260px;
                height: 260px;
                border-radius: 50%;
                background: linear-gradient(135deg, #06b6d4, #0ea5e9, #8b5cf6);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 4rem;
                font-weight: 800;
                color: white;
                font-family: 'Outfit', sans-serif;
                border: 3px solid rgba(6, 182, 212, 0.5);
                box-shadow: 0 0 60px rgba(6, 182, 212, 0.2);
                position: relative;
                z-index: 2;
            `;
            placeholder.textContent = 'BM';
            container.insertBefore(placeholder, heroImage);
        });
    }

    // ============================================
    // FADE IN UP ANIMATION KEYFRAMES
    // ============================================
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // ============================================
    // PARALLAX EFFECT ON HERO
    // ============================================
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const hero = document.querySelector('.hero-section');
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
        }
    });

});
