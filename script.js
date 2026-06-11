(function () {
  'use strict';

  /* ============================================
     PRELOADER
     ============================================ */
  function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    window.addEventListener('load', function () {
      setTimeout(function () {
        preloader.classList.add('loaded');
        setTimeout(initHeroAnimations, 250);
      }, 700);
    });
  }

  /* ============================================
     HERO ANIMATIONS
     ============================================ */
  function initHeroAnimations() {
    const lines = document.querySelectorAll('.hero-headline .reveal-line');
    const subtitle = document.querySelector('.hero-subtitle');
    const actions = document.querySelector('.hero-actions');
    const visual = document.querySelector('.hero-visual');

    lines.forEach(function (line, i) {
      setTimeout(function () {
        line.classList.add('revealed');
      }, i * 140);
    });

    var baseDelay = lines.length * 140 + 100;

    if (subtitle) {
      setTimeout(function () {
        subtitle.classList.add('revealed');
      }, baseDelay);
    }

    if (actions) {
      setTimeout(function () {
        actions.classList.add('revealed');
      }, baseDelay + 150);
    }

    if (visual) {
      setTimeout(function () {
        visual.classList.add('revealed');
      }, baseDelay - 50);
    }
  }

  /* ============================================
     HEADER SCROLL
     ============================================ */
  function initHeaderScroll() {
    var header = document.getElementById('header');
    if (!header) return;

    var lastScroll = 0;

    function onScroll() {
      var scrollY = window.scrollY || window.pageYOffset;
      if (scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScroll = scrollY;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ============================================
     MOBILE MENU
     ============================================ */
  function initMobileMenu() {
    var toggle = document.getElementById('menuToggle');
    var menu = document.getElementById('mobileMenu');
    if (!toggle || !menu) return;

    var links = menu.querySelectorAll('a');

    toggle.addEventListener('click', function () {
      var isOpen = menu.classList.contains('open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    links.forEach(function (link) {
      link.addEventListener('click', function () {
        closeMenu();
      });
    });

    function openMenu() {
      menu.classList.add('open');
      toggle.classList.add('open');
      document.body.classList.add('menu-open');
    }

    function closeMenu() {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      document.body.classList.remove('menu-open');
    }
  }

  /* ============================================
     SMOOTH SCROLL
     ============================================ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ============================================
     SCROLL REVEAL (IntersectionObserver)
     ============================================ */
  function initScrollReveal() {
    var elements = document.querySelectorAll('.scroll-reveal');
    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
      elements.forEach(function (el) {
        el.classList.add('revealed');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var delay = entry.target.dataset.delay || 0;
          setTimeout(function () {
            entry.target.classList.add('revealed');
          }, parseInt(delay, 10));
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ============================================
     HERO PARALLAX
     ============================================ */
  function initHeroParallax() {
  var stack = document.getElementById('heroStack');
  var heroImgs = document.querySelectorAll('.hero-img');
  var hero = document.getElementById('hero');
  var heroBg = document.querySelector('.hero-bg img');
  if (!hero) return;

  var heroHeight = hero.offsetHeight;

  window.addEventListener('scroll', function () {
    var scrollY = window.scrollY || window.pageYOffset;
    if (scrollY > heroHeight) return;

    if (heroBg) {
      heroBg.style.transform = 'translateY(' + (scrollY * 0.3) + 'px)';
    }

    if (stack && heroImgs.length) {
      heroImgs.forEach(function (img) {
        var speed = parseFloat(img.dataset.speed) || 0.1;
        var y = scrollY * speed;
        img.style.transform = img.getAttribute('data-original-transform')
          ? img.getAttribute('data-original-transform') + ' translateY(' + y + 'px)'
          : 'translateY(' + y + 'px)';
      });
    }
  }, { passive: true });
}

  /* ============================================
     HERO 3D TILT
     ============================================ */
  function initHeroTilt() {
    var stack = document.getElementById('heroStack');
    if (!stack) return;

    var baseRotateY = -5;
    var baseRotateX = 3;

    stack.addEventListener('mousemove', function (e) {
      var rect = stack.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      var rotY = baseRotateY + x * 8;
      var rotX = baseRotateX - y * 8;
      stack.style.transform = 'rotateY(' + rotY + 'deg) rotateX(' + rotX + 'deg)';
    });

    stack.addEventListener('mouseleave', function () {
      stack.style.transform = 'rotateY(' + baseRotateY + 'deg) rotateX(' + baseRotateX + 'deg)';
    });
  }

  /* ============================================
     MAGNETIC BUTTONS
     ============================================ */
  function initMagneticButtons() {
    var buttons = document.querySelectorAll('.magnetic');
    if (!buttons.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = 'translate(' + (x * 0.25) + 'px, ' + (y * 0.25) + 'px)';
      });

      btn.addEventListener('mouseleave', function () {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  }

  /* ============================================
     RENDER PROJECTS
     ============================================ */
  function renderProjects() {
    var grid = document.getElementById('projectsGrid');
    if (!grid || typeof projects === 'undefined') return;

    var html = '';
    projects.forEach(function (project, i) {
      html += '<a href="#" class="project-card scroll-reveal" data-delay="' + (i * 80) + '" aria-label="View ' + project.name + ' project">';
      html += '  <div class="project-card-image">';
      html += '    <img src="' + project.image + '" alt="' + project.name + '" loading="lazy">';
      html += '  </div>';
      html += '  <div class="project-card-overlay">';
      html += '    <span class="project-card-category">' + project.category + '</span>';
      html += '    <h3 class="project-card-name">' + project.name + '</h3>';
      html += '  </div>';
      html += '</a>';
    });

    grid.innerHTML = html;
  }

    /* ============================================
     SCROLL MARGIN FOR SECTIONS
     ============================================ */
  function initScrollMargin() {
    var sections = document.querySelectorAll('section[id]');
    var headerHeight = 90;
    sections.forEach(function (section) {
      section.style.scrollMarginTop = headerHeight + 'px';
    });
  }

  /* ============================================
     LAZY IMAGE FADE-IN
     ============================================ */
  function initLazyImages() {
    var images = document.querySelectorAll('.hero-img img, .project-card-image img, .hero-bg img');
    if (!images.length) return;

    images.forEach(function (img) {
      if (img.complete && img.naturalHeight > 0) {
        img.classList.add('loaded');
      } else {
        img.addEventListener('load', function () {
          img.classList.add('loaded');
        });
        img.addEventListener('error', function () {
          img.classList.add('loaded');
        });
      }
    });
  }

  /* ============================================
     INIT
     ============================================ */
  function init() {
    renderProjects();
    initLazyImages();
    initPreloader();
    initHeaderScroll();
    initMobileMenu();
    initSmoothScroll();
    initScrollReveal();
    initHeroParallax();
    initHeroTilt();
    initMagneticButtons();
    initScrollMargin();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();