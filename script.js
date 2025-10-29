// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const backToTopBtn = document.getElementById('back-to-top-btn');
    const contactForm = document.getElementById('contactForm');

    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Close mobile menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = 'none';
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
        
        // Show/hide back to top button
        if (window.scrollY > 500) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });

    // Update active nav link based on scroll position
    function updateActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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

    // Initialize scroll animations
    initScrollAnimations();
    
    // Handle contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple form validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Here you would typically send the form data to a server
            // For now, just show a success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
});

// Initialize scroll animations using Intersection Observer
function initScrollAnimations() {
    // Select all elements to animate
    const elementsToAnimate = document.querySelectorAll('.section-header, .about-content, .timeline-item, .skill-category, .project-card, .experience-card, .certification-card, .contact-content');
    
    // Create observer options
    const options = {
        root: null, // viewport
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Create observer
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    // Observe each element
    elementsToAnimate.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// Add animation classes to CSS dynamically
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .section-header.animate {
            transition-delay: 0.2s;
        }
        
        .skill-category:nth-child(1).animate {
            transition-delay: 0.2s;
        }
        
        .skill-category:nth-child(2).animate {
            transition-delay: 0.4s;
        }
        
        .skill-category:nth-child(3).animate {
            transition-delay: 0.6s;
        }
        
        .project-card:nth-child(1).animate {
            transition-delay: 0.2s;
        }
        
        .project-card:nth-child(2).animate {
            transition-delay: 0.4s;
        }
        
        .certification-card:nth-child(1).animate {
            transition-delay: 0.1s;
        }
        
        .certification-card:nth-child(2).animate {
            transition-delay: 0.2s;
        }
        
        .certification-card:nth-child(3).animate {
            transition-delay: 0.3s;
        }
        
        .certification-card:nth-child(4).animate {
            transition-delay: 0.4s;
        }
        
        .certification-card:nth-child(5).animate {
            transition-delay: 0.5s;
        }
    `;
    document.head.appendChild(style);
}

// Call the function to add animation styles
addAnimationStyles();