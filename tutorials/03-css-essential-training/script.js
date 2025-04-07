document.addEventListener('DOMContentLoaded', function() {
    // Create mobile menu toggle
    const createMobileMenu = function() {
      const menuToggle = document.createElement('div');
      menuToggle.className = 'menu-toggle';
      menuToggle.innerHTML = '<span></span><span></span><span></span>';
      
      const navLinks = document.querySelector('.nav-links');
      const navbar = document.querySelector('.navbar');
      
      // Only add mobile menu functionality if we're on a small screen
      if (window.innerWidth <= 768) {
        // Insert before the theme button
        const themeBtn = document.querySelector('.theme-btn');
        if (themeBtn) {
          navbar.insertBefore(menuToggle, themeBtn);
        } else {
          navbar.appendChild(menuToggle);
        }
        
        menuToggle.addEventListener('click', function() {
          this.classList.toggle('active');
          navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-item').forEach(link => {
          link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
          });
        });
      }
    };
    
    // Execute mobile menu creation
    createMobileMenu();
    
    // Highlight active nav item based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');
    
    function highlightNavItem() {
      const scrollY = window.pageYOffset;
      
      sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${sectionId}`) {
              item.classList.add('active');
            }
          });
        }
      });
    }
    
    // Add scroll event listener for nav highlighting
    window.addEventListener('scroll', highlightNavItem);
    
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
      // Check for saved theme preference
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.querySelector('.theme-icon').textContent = '☀️';
      }
      
      themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        // Update icon and save preference
        if (document.body.classList.contains('dark-theme')) {
          themeToggle.querySelector('.theme-icon').textContent = '☀️';
          localStorage.setItem('theme', 'dark');
        } else {
          themeToggle.querySelector('.theme-icon').textContent = '🌙';
          localStorage.setItem('theme', 'light');
        }
      });
    }
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
      });
    }
    
    // Resume image enlarge
    const resumeImages = document.querySelectorAll('.resume-img');
    if (resumeImages.length > 0) {
      resumeImages.forEach(img => {
        img.addEventListener('click', function() {
          this.classList.toggle('enlarged');
          
          if (this.classList.contains('enlarged')) {
            this.style.width = '300px';
            this.style.height = '300px';
            this.style.cursor = 'zoom-out';
          } else {
            this.style.width = '150px';
            this.style.height = '150px';
            this.style.cursor = 'zoom-in';
          }
        });
      });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') return;
        
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Add simple animation to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
      card.classList.add('fade-in');
    });
  });