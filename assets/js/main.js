/**
* Template Name: Personal
* Updated: Jun 18 2023 with Bootstrap v5.3.0
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    const target = select(el)
    if (!target) {
      return
    }

    const header = select('#header')
    const headerOffset = header ? header.offsetHeight : 0
    const elementPosition = target.offsetTop

    window.scrollTo({
      top: Math.max(elementPosition - headerOffset - 20, 0),
      behavior: 'smooth'
    })
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '#navbar .nav-link', function(e) {
    let section = select(this.hash)
    if (section) {
      e.preventDefault()

      let navbar = select('#navbar')
      let navlinks = select('#navbar .nav-link', true)

      navlinks.forEach((item) => {
        item.classList.remove('active')
      })

      this.classList.add('active')

      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }

      scrollto(this.hash)
    }
  }, true)

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    spaceBetween: 20,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 16
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Testimonials fullscreen modal viewer
   */
  const testimonialShots = select('.testimonial-shot', true);
  const testimonialModal = select('#testimonialModal');
  const testimonialModalImage = select('#testimonialModalImage');
  const testimonialModalPrev = select('.testimonial-modal-prev');
  const testimonialModalNext = select('.testimonial-modal-next');
  const testimonialModalClose = select('[data-modal-close]', true);
  let testimonialModalIndex = 0;

  const openTestimonialModal = (index) => {
    if (!testimonialShots.length || !testimonialModal || !testimonialModalImage) return;
    testimonialModalIndex = (index + testimonialShots.length) % testimonialShots.length;
    testimonialModalImage.src = testimonialShots[testimonialModalIndex].src;
    testimonialModalImage.alt = testimonialShots[testimonialModalIndex].alt || 'Client feedback full view';
    testimonialModal.classList.add('is-open');
    testimonialModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeTestimonialModal = () => {
    if (!testimonialModal) return;
    testimonialModal.classList.remove('is-open');
    testimonialModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const moveTestimonialModal = (direction) => {
    openTestimonialModal(testimonialModalIndex + direction);
  };

  testimonialShots.forEach((img, index) => {
    img.addEventListener('click', () => openTestimonialModal(index));
  });

  if (testimonialModalPrev) {
    testimonialModalPrev.addEventListener('click', () => moveTestimonialModal(-1));
  }

  if (testimonialModalNext) {
    testimonialModalNext.addEventListener('click', () => moveTestimonialModal(1));
  }

  if (testimonialModalClose && testimonialModalClose.length) {
    testimonialModalClose.forEach((btn) => {
      btn.addEventListener('click', closeTestimonialModal);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!testimonialModal || !testimonialModal.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeTestimonialModal();
    if (e.key === 'ArrowLeft') moveTestimonialModal(-1);
    if (e.key === 'ArrowRight') moveTestimonialModal(1);
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

  /**
   * Keep nav state in sync while scrolling on the single-page layout
   */
  window.addEventListener('scroll', () => {
    const header = select('#header')
    const headerOffset = header ? header.offsetHeight + 40 : 120
    const scrollPosition = window.scrollY + headerOffset
    const navlinks = select('#navbar .nav-link', true)

    navlinks.forEach((navlink) => {
      const hash = navlink.hash
      if (!hash) {
        return
      }

      if (hash === '#header') {
        navlink.classList.toggle('active', window.scrollY < 120)
        return
      }

      const section = select(hash)
      if (!section) {
        return
      }

      const isActive =
        scrollPosition >= section.offsetTop &&
        scrollPosition < section.offsetTop + section.offsetHeight

      navlink.classList.toggle('active', isActive)
    })
  })
})()
