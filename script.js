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

            // Close all other items (accordion behavior)
            timelineItems.forEach(function (other) {
                other.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // --- Instructor Slider & Tabs Implementation ---

    // 1. Tab Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const sliders = document.querySelectorAll('.instructor-slider');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and sliders
            tabBtns.forEach(b => b.classList.remove('active'));
            sliders.forEach(s => s.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Show corresponding slider
            const tabId = btn.getAttribute('data-tab');
            const targetSlider = document.getElementById(`${tabId}-slider`);
            if (targetSlider) {
                targetSlider.classList.add('active');
                // Re-initialize or refresh slider layout if needed
                initializeSlider(targetSlider);
            }
        });
    });

    // 2. Slider Logic Class
    class InstructorSlider {
        constructor(element) {
            this.element = element;
            this.track = element.querySelector('.slider-track');
            this.cards = element.querySelectorAll('.instructor-card');
            this.prevBtn = element.querySelector('.slider-prev');
            this.nextBtn = element.querySelector('.slider-next');
            this.dotsContainer = element.querySelector('.slider-dots');

            this.currentIndex = 0;
            this.itemsPerView = 4; // Default desktop
            this.totalItems = this.cards.length;
            this.maxIndex = 0;

            this.init();
        }

        init() {
            this.updateItemsPerView();
            this.createDots();
            this.updateSlider();

            // Event Listeners
            this.prevBtn.addEventListener('click', () => this.slide('prev'));
            this.nextBtn.addEventListener('click', () => this.slide('next'));
            window.addEventListener('resize', () => {
                this.updateItemsPerView();
                this.updateSlider();
            });
        }

        updateItemsPerView() {
            const width = window.innerWidth;
            if (width < 480) {
                this.itemsPerView = 1;
            } else if (width < 1024) {
                this.itemsPerView = 2;
            } else {
                this.itemsPerView = 4;
            }
            this.maxIndex = Math.max(0, this.totalItems - this.itemsPerView);

            // Adjust current index if it exceeds max
            if (this.currentIndex > this.maxIndex) {
                this.currentIndex = this.maxIndex;
            }
            this.recreateDots(); // Dots might change if items per view changes (optional logic)
        }

        createDots() {
            this.dotsContainer.innerHTML = '';
            // For simplicity, 1 dot per possible start position or 1 dot per page?
            // Let's do 1 dot per group or simply 1 dot for every slide? 
            // Common pattern: 1 dot per page (group of items).
            // Let's simply do 1 dot per "scroll" step for smoother UX, or just total items?
            // Let's do simplified: totalItems - itemsPerView + 1 dots is standard for carousel, 
            // but here let's valid indices.

            const dotCount = this.maxIndex + 1;

            for (let i = 0; i < dotCount; i++) {
                const dot = document.createElement('button');
                dot.classList.add('slider-dot');
                if (i === this.currentIndex) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    this.currentIndex = i;
                    this.updateSlider();
                });
                this.dotsContainer.appendChild(dot);
            }
        }

        recreateDots() {
            this.createDots();
        }

        slide(direction) {
            if (direction === 'prev') {
                if (this.currentIndex > 0) {
                    this.currentIndex--;
                    this.updateSlider();
                }
            } else {
                if (this.currentIndex < this.maxIndex) {
                    this.currentIndex++;
                    this.updateSlider();
                }
            }
        }

        updateSlider() {
            // Move track
            // Each card is: 100% / itemsPerView
            // TranslateX = -currentIndex * (100% / itemsPerView)
            const percentage = -(this.currentIndex * (100 / this.itemsPerView));
            this.track.style.transform = `translateX(${percentage}%)`;

            // Update buttons state
            this.prevBtn.disabled = this.currentIndex === 0;
            this.nextBtn.disabled = this.currentIndex === this.maxIndex;

            // Update dots
            const dots = this.dotsContainer.querySelectorAll('.slider-dot');
            dots.forEach((dot, index) => {
                if (index === this.currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
    }

    // Initialize sliders
    const sliderInstances = [];
    sliders.forEach(sliderEl => {
        sliderInstances.push(new InstructorSlider(sliderEl));
    });

    function initializeSlider(element) {
        // Find instance and refresh if needed
        const instance = sliderInstances.find(i => i.element === element);
        if (instance) {
            instance.updateItemsPerView();
            instance.updateSlider();
        }
    }

});
