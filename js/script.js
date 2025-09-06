document.addEventListener('DOMContentLoaded', () => {

    // --- Page Navigation Logic ---
    const navLinks = document.querySelectorAll('.nav-link');
    const pageSections = document.querySelectorAll('.page-section');
    const mobileMenu = document.getElementById('mobile-menu');

    const showPage = (pageId) => {
        // Hide all sections
        pageSections.forEach(section => {
            section.classList.add('hidden');
        });

        // Show the target section
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.remove('hidden');
        }

        // Update active link state
        navLinks.forEach(link => {
            if (link.hash === `#${pageId}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Close mobile menu after navigation
        mobileMenu.classList.add('hidden');
        window.scrollTo(0, 0); // Scroll to top on page change
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.hash.substring(1); // Remove the '#'
            // Update URL hash without jumping
            history.pushState(null, null, `#${pageId}`);
            showPage(pageId);
        });
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        const pageId = window.location.hash.substring(1) || 'home';
        showPage(pageId);
    });

    // Show initial page based on URL hash or default to 'home'
    const initialPageId = window.location.hash.substring(1) || 'home';
    showPage(initialPageId);


    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });


    // --- FAQ Toggles ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            // Optional: Close all other FAQs
            // faqItems.forEach(i => {
            //     i.classList.remove('open');
            //     i.querySelector('.faq-answer').classList.add('hidden');
            // });

            if (!isOpen) {
                item.classList.add('open');
                answer.classList.remove('hidden');
            } else {
                item.classList.remove('open');
                answer.classList.add('hidden');
            }
        });
    });

});