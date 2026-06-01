document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       STICKY HEADER SCROLL EVENT
       ========================================================================== */
    const header = document.querySelector('.main-header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call in case of page refresh mid-page

    /* ==========================================================================
       MOBILE DRAWER MENU NAVIGATION
       ========================================================================== */
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    const toggleMenu = () => {
        mobileNavToggle.classList.toggle('open');
        mobileDrawer.classList.toggle('open');
        // Prevent body scrolling when menu is open
        document.body.style.overflow = mobileDrawer.classList.contains('open') ? 'hidden' : 'auto';
    };

    mobileNavToggle.addEventListener('click', toggleMenu);

    // Close drawer when clicking any mobile link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileDrawer.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    /* ==========================================================================
       PORTFOLIO CATEGORY FILTERS
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and add to the clicked one
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const selectedFilter = button.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (selectedFilter === 'all' || category === selectedFilter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    /* ==========================================================================
       IMMERSIVE LIGHTBOX MODAL
       ========================================================================== */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxCategory = document.getElementById('lightboxCategory');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxLocation = document.getElementById('lightboxLocation');
    
    const galleryWrappers = document.querySelectorAll('.gallery-img-wrapper');
    
    galleryWrappers.forEach(wrapper => {
        wrapper.addEventListener('click', () => {
            const img = wrapper.querySelector('img');
            const itemInfo = wrapper.querySelector('.gallery-item-info');
            
            const imgSrc = img.getAttribute('src');
            const imgAlt = img.getAttribute('alt');
            
            const tagEl = itemInfo.querySelector('.gallery-item-tag');
            const titleEl = itemInfo.querySelector('.gallery-item-title');
            const locEl = itemInfo.querySelector('.gallery-item-location');
            
            const tag = tagEl ? tagEl.textContent : '';
            const title = titleEl ? titleEl.textContent : '';
            const location = locEl ? locEl.textContent : 'Sri Lanka';
            
            // Set Lightbox Content
            lightboxImg.setAttribute('src', imgSrc);
            lightboxImg.setAttribute('alt', imgAlt);
            lightboxCategory.textContent = tag;
            lightboxTitle.textContent = title;
            lightboxLocation.textContent = location;
            
            // Open Lightbox
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Stop background scrolling
        });
    });
    
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        // Restore body scrolling only if mobile drawer isn't also open
        if (!mobileDrawer.classList.contains('open')) {
            document.body.style.overflow = 'auto';
        }
    };
    
    lightboxClose.addEventListener('click', closeLightbox);
    
    // Close on clicking outside the content image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Escape key press closes lightbox
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    /* ==========================================================================
       CONTACT FORM VALIDATION & INTERACTION
       ========================================================================== */
    const inquiryForm = document.getElementById('inquiryForm');
    const formSuccessCard = document.getElementById('formSuccessCard');
    const btnResetForm = document.getElementById('btnResetForm');
    
    // Fields
    const clientName = document.getElementById('clientName');
    const clientEmail = document.getElementById('clientEmail');
    const weddingDate = document.getElementById('weddingDate');
    const weddingLocation = document.getElementById('weddingLocation');

    // Simple email validator regex
    const isValidEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    // Remove validation errors on input focus/type
    const inputs = [clientName, clientEmail, weddingDate, weddingLocation];
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            input.parentElement.classList.remove('invalid');
        });
    });

    inquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isFormValid = true;
        
        // Validate Name
        if (clientName.value.trim() === '') {
            clientName.parentElement.classList.add('invalid');
            isFormValid = false;
        } else {
            clientName.parentElement.classList.remove('invalid');
        }
        
        // Validate Email
        if (!isValidEmail(clientEmail.value.trim())) {
            clientEmail.parentElement.classList.add('invalid');
            isFormValid = false;
        } else {
            clientEmail.parentElement.classList.remove('invalid');
        }
        
        // Validate Date
        if (weddingDate.value === '') {
            weddingDate.parentElement.classList.add('invalid');
            isFormValid = false;
        } else {
            weddingDate.parentElement.classList.remove('invalid');
        }
        
        // Validate Location
        if (weddingLocation.value.trim() === '') {
            weddingLocation.parentElement.classList.add('invalid');
            isFormValid = false;
        } else {
            weddingLocation.parentElement.classList.remove('invalid');
        }
        
        // Successful Submission Action
        if (isFormValid) {
            // Slide up the success card overlay
            formSuccessCard.classList.add('active');
            
            // Clear all values
            inquiryForm.reset();
        }
    });
    
    // Reset success message and return to form
    btnResetForm.addEventListener('click', () => {
        formSuccessCard.classList.remove('active');
    });

    /* ==========================================================================
       SMOOTH SECTION ACTIVE NAV LINKS ON SCROLL
       ========================================================================== */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const highlightNav = () => {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120; // offset for sticky header
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            } else if (scrollY < 100) {
                // If at the very top, highlight Home
                navLinks.forEach(link => link.classList.remove('active'));
                navLinks[0].classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', highlightNav);
});
