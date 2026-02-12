// FAQ Accordion
document.addEventListener('DOMContentLoaded', function () {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(function (item) {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function () {
            const isActive = item.classList.contains('active');

            // Close all other items
            faqItems.forEach(function (other) {
                other.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // --- Curriculum Phase Accordion ---
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach(function (item) {
        const header = item.querySelector('.timeline-header');

        header.addEventListener('click', function () {
            const isActive = item.classList.contains('active');

            timelineItems.forEach(function (other) {
                other.classList.remove('active');
            });

            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // --- Certificate 3D Tilt Enter Animation ---
    const certFrame = document.getElementById('cert-tilt');
    if (certFrame) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    certFrame.classList.add('cert-tilt-animate');
                    observer.unobserve(certFrame);
                }
            });
        }, { threshold: 0.3 });
        observer.observe(certFrame);
    }

    // --- Program Details Fade In ---
    const pdSection = document.querySelector('.program-details');
    if (pdSection) {
        const pdObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    pdSection.classList.add('pd-visible');
                    pdObserver.unobserve(pdSection);
                }
            });
        }, { threshold: 0.2 });
        pdObserver.observe(pdSection);
    }

    // --- Instructor Tab Toggle ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('[data-tab-content]');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');

            const target = document.querySelector(`[data-tab-content="${tabId}"]`);
            if (target) target.classList.add('active');
        });
    });

});
