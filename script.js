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

    // --- Curriculum Phase 1 Auto-Open on Scroll ---
    const curriculumSection = document.querySelector('.curriculum');
    if (curriculumSection && timelineItems.length > 0) {
        const currObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    timelineItems[0].classList.add('active');
                    currObserver.unobserve(curriculumSection);
                }
            });
        }, { threshold: 0.3 });
        currObserver.observe(curriculumSection);
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

    // --- UTM Tracking via postMessage (Wix iframe) ---
    var utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_ops', 'prog'];
    var storedUtms = {};

    // 1. Signal to Wix repeatedly until UTMs are received (handles timing differences)
    var readyInterval = setInterval(function () {
        window.parent.postMessage('ready', '*');
    }, 500);

    // Stop signaling after 10 seconds (UTMs either arrived or URL has none)
    setTimeout(function () { clearInterval(readyInterval); }, 10000);

    // 2. Listen for UTM data from the parent page
    window.addEventListener('message', function (event) {
        var data = event.data;
        if (data && typeof data === 'object') {
            var hasUtm = false;
            utmKeys.forEach(function (key) {
                if (data[key]) {
                    storedUtms[key] = data[key];
                    hasUtm = true;
                }
            });
            if (hasUtm) {
                clearInterval(readyInterval); // UTMs received, stop signaling
                console.log('HTML received UTMs:', storedUtms);
            }
        }
    });

    // 3. Build the destination URL with non-empty UTM params appended
    function buildCtaUrl(baseUrl) {
        var queryString = utmKeys
            .filter(function (key) { return storedUtms[key]; })
            .map(function (key) { return encodeURIComponent(key) + '=' + encodeURIComponent(storedUtms[key]); })
            .join('&');
        if (!queryString) return baseUrl;
        var separator = baseUrl.indexOf('?') !== -1 ? '&' : '?';
        return baseUrl + separator + queryString;
    }

    // 4. Intercept ALL CTA button clicks to open with UTMs appended
    var ctaLinks = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-cta');
    ctaLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            var href = link.getAttribute('href');
            if (href) {
                e.preventDefault();
                var finalUrl = buildCtaUrl(href);
                console.log('CTA redirect:', finalUrl);
                window.open(finalUrl, '_blank');
            }
        });
    });

});
