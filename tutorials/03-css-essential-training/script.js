document.addEventListener("DOMContentLoaded", function () {
    // Footer visibility functionality (existing)
    const footer = document.getElementById("footer");
  
    function showFooter() {
        footer.style.bottom = "0";
        footer.style.opacity = "1";
    }
  
    function hideFooter() {
        footer.style.bottom = "-80px";
        footer.style.opacity = "0";
    }
  
    document.addEventListener("mousemove", function (event) {
        const isHoveringBottom = event.clientY >= window.innerHeight - 5;
        const isHoveringFooter = footer.matches(":hover");
  
        if (isHoveringBottom || isHoveringFooter) {
            showFooter();
        } else {
            hideFooter();
        }
    });
  
    // TIMER-BASED STYLE CHANGES
    // Change header color after 3 seconds
    setTimeout(function() {
      const header = document.querySelector('header');
      if (header) {
        header.style.backgroundColor = "rgba(60, 132, 83, 0.2)";
        console.log("Header background color changed after timeout");
      }
    }, 3000);
  
    // CLICK EVENTS
    // Change background when clicking on content-bg
    const contentBg = document.querySelector('.content-bg');
    if (contentBg) {
      contentBg.addEventListener('click', function() {
        this.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
        this.style.boxShadow = "0 0px 30px rgba(60, 132, 83, 0.9)";
        console.log("Content background clicked, style changed");
      });
    }
  
    // Add click events to toggle bio sections visibility
    const bioToggleBtn = document.getElementById('bio-toggle');
    if (bioToggleBtn) {
      bioToggleBtn.addEventListener('click', function() {
        const bioSections = document.querySelectorAll('.bio-section');
        bioSections.forEach(section => {
          if (section.style.display === 'none' || section.style.display === '') {
            section.style.display = 'block';
            section.style.opacity = '1';
            bioToggleBtn.textContent = 'Hide Bio';
          } else {
            section.style.opacity = '0';
            setTimeout(() => {
              section.style.display = 'none';
            }, 500);
            bioToggleBtn.textContent = 'Show Bio';
          }
        });
      });
    }
  
    // Add hover effect to noti elements
    const notiElements = document.querySelectorAll('.noti');
    notiElements.forEach(element => {
      element.addEventListener('mouseenter', function() {
        this.style.color = '#3c8453';
        this.style.transform = 'scale(1.02)';
      });
      element.addEventListener('mouseleave', function() {
        this.style.color = '';
        this.style.transform = '';
      });
    });
  
    // IMAGE TOGGLE FUNCTIONALITY
    // For project images in resume page
    const projectItems = document.querySelectorAll('.project-item img');
    projectItems.forEach(img => {
      img.addEventListener('click', function() {
        if (this.dataset.expanded === 'true') {
          this.style.width = '300px';
          this.style.position = 'relative';
          this.style.zIndex = '1';
          this.dataset.expanded = 'false';
        } else {
          this.style.width = '80%';
          this.style.position = 'relative';
          this.style.zIndex = '10';
          this.dataset.expanded = 'true';
        }
      });
    });
  
    // Create a variable to store elements
    const allLinks = document.querySelectorAll('a');
    
    // Add hover animation to all links
    allLinks.forEach(link => {
      if (!link.closest('footer')) {  // Skip footer links
        link.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-2px)';
          this.style.transition = 'transform 0.3s ease';
        });
        link.addEventListener('mouseleave', function() {
          this.style.transform = '';
        });
      }
    });
  
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', function() {
        const body = document.body;
        if (body.classList.contains('dark-theme')) {
          body.classList.remove('dark-theme');
          themeToggle.textContent = '🌙 Dark Mode';
        } else {
          body.classList.add('dark-theme');
          themeToggle.textContent = '☀️ Light Mode';
        }
      });
    }
  });