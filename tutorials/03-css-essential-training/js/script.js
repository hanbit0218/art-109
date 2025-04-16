document.addEventListener('DOMContentLoaded', function() {
  function setupMobileMenu() {
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<span></span><span></span><span></span>';
    
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    
    if (window.innerWidth <= 768) {
      navbar.appendChild(menuToggle);
      
      menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
      });
      
      document.querySelectorAll('.nav-item').forEach(link => {
        link.addEventListener('click', function() {
          menuToggle.classList.remove('active');
          navLinks.classList.remove('active');
        });
      });
    }
  }
  
  function setupScrollHighlight() {
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
    
    window.addEventListener('scroll', highlightNavItem);
  }
  
  function setupContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
      });
    }
  }
  
  function setupResumeImages() {
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
  }
  
  function setupSmoothScrolling() {
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
  }
  
  function setupStyleTimers() {
    setTimeout(function() {
      const pageTitle = document.querySelector('.hero-content h1');
      if (pageTitle) {
        pageTitle.style.color = "#3c8453";
        console.log("Title color changed after 2 seconds");
      }
    }, 2000);
    
    const header = document.querySelector('.header');
    if (header) {
      header.addEventListener('click', function() {
        document.querySelector('body').classList.toggle('clicked-header');
        console.log("Clicked header");
      });
    }
  }
  
  function setupImageToggles() {
    const projectImages = document.querySelectorAll('.project-card img');
    projectImages.forEach(img => {
      img.addEventListener('click', function() {
        this.classList.toggle('hidden-image');
        if (this.classList.contains('hidden-image')) {
          this.style.opacity = '0.2';
        } else {
          this.style.opacity = '1';
        }
      });
    });
  }
  
  function setupLogoHover() {
    const logo = document.querySelector('.logo');
    if (logo) {
      logo.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
      });
      
      logo.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
      });
    }
  }
  
  function setupProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
      card.classList.add('fade-in');
    });
  }
  
  function setupLightbox() {
    const projectImages = document.querySelectorAll('.project-card img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');
    
    if (!lightbox || !lightboxImg || !closeLightbox) {
      console.error('Lightbox elements not found');
      return;
    }
    
    projectImages.forEach(img => {
      img.style.cursor = 'pointer';
      img.addEventListener('dblclick', function() {
        lightbox.style.display = 'block';
        lightboxImg.src = this.src;
        lightboxImg.alt = this.alt;
      });
    });
    
    closeLightbox.addEventListener('click', function() {
      lightbox.style.display = 'none';
    });
    
    lightbox.addEventListener('click', function(e) {
      if (e.target === this) {
        lightbox.style.display = 'none';
      }
    });
  }
  
  setupMobileMenu();
  setupScrollHighlight();
  setupContactForm();
  setupResumeImages();
  setupSmoothScrolling();
  setupStyleTimers();
  setupImageToggles();
  setupLogoHover();
  setupProjectCards();
  setupLightbox();
  
  console.log('All scripts initialized successfully');
});