/* ============================================
   MARION RAHAINGOMANANA - JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // --- Mobile Navigation Toggle ---
    var navToggle = document.querySelector('.nav-toggle');
    var navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navToggle.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });

        document.addEventListener('click', function (e) {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('open');
            }
        });
    }

    // --- Header scroll effect ---
    var header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- Active nav link on scroll ---
    var sections = document.querySelectorAll('section[id]');
    function updateActiveNav() {
        var scrollPos = window.scrollY + 100;
        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');
            var link = document.querySelector('.nav-links a[href="#' + id + '"]');
            if (link) {
                if (scrollPos >= top && scrollPos < top + height) {
                    document.querySelectorAll('.nav-links a').forEach(function (a) {
                        a.classList.remove('active');
                    });
                    link.classList.add('active');
                }
            }
        });
    }
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // --- Fade-in on scroll (Intersection Observer) ---
    var fadeElements = document.querySelectorAll('.fade-in');
    if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        fadeElements.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        fadeElements.forEach(function (el) {
            el.classList.add('visible');
        });
    }

    // --- Contact form handling ---
    var contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var name = contactForm.querySelector('[name="name"]');
            var email = contactForm.querySelector('[name="email"]');
            var message = contactForm.querySelector('[name="message"]');
            var valid = true;

            [name, email, message].forEach(function (field) {
                if (field && !field.value.trim()) {
                    field.style.borderColor = '#e74c3c';
                    valid = false;
                } else if (field) {
                    field.style.borderColor = '';
                }
            });

            if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                email.style.borderColor = '#e74c3c';
                valid = false;
            }

            if (valid) {
                var btn = contactForm.querySelector('button[type="submit"]');
                var originalText = btn.textContent;
                btn.textContent = 'Message envoye !';
                btn.style.backgroundColor = '#5ba8a5';
                btn.disabled = true;

                setTimeout(function () {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                    btn.disabled = false;
                    contactForm.reset();
                }, 3000);
            }
        });
    }

    // --- Paw trail: reveal/hide paws based on scroll position ---
    var pawTrails = document.querySelectorAll('.paw-trail');

    function updatePaws() {
        pawTrails.forEach(function (trail) {
            var paws = trail.querySelectorAll('.paw');
            var rect = trail.getBoundingClientRect();
            var viewH = window.innerHeight;

            // How far the trail is scrolled into view
            // Progress goes from 0 (just entering bottom) to 1 (top half visible)
            var progress = (viewH - rect.top) / (viewH * 0.75);
            progress = Math.max(0, Math.min(1, progress));

            var total = paws.length;
            paws.forEach(function (paw, i) {
                // Top paws (last in DOM) appear first
                var reverseIndex = total - 1 - i;
                var threshold = (reverseIndex + 0.5) / total;
                if (progress >= threshold) {
                    paw.classList.add('visible');
                } else {
                    paw.classList.remove('visible');
                }
            });
        });
    }

    window.addEventListener('scroll', updatePaws);
    updatePaws();

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                var target = document.querySelector(targetId);
                if (target) {
                    var headerHeight = header ? header.offsetHeight : 0;
                    var targetPosition = target.offsetTop - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

});
