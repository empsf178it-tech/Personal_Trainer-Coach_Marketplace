/**
 * PULSEFIT — Personal Trainer & Coach Marketplace
 * Core JavaScript Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initScrollProgressBar();
  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initCounterRollup();
  initModals();
  initCoachFilters();
  initContactForm();
  initAccordion();
  initBackToTop();
  initPricingToggle();
  initImpactCalculator();
  initMapTabs();
  initCardSpotlight();
  initFloatingSparkles();
  setActiveNavLinks();
});

/* --------------------------------------------------------------------------
   0. TOP SCROLL PROGRESS BAR
   -------------------------------------------------------------------------- */
function initScrollProgressBar() {
  let bar = document.querySelector('.scroll-progress-bar');
  if (!bar) {
    bar = document.createElement('div');
    bar.className = 'scroll-progress-bar';
    document.body.appendChild(bar);
  }

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${progress}%`;
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   0.1 ANIMATED COUNTER ROLLUP
   -------------------------------------------------------------------------- */
function initCounterRollup() {
  const counters = document.querySelectorAll('.counter-num');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetNum = parseInt(target.getAttribute('data-target') || '0', 10);
        const suffix = target.getAttribute('data-suffix') || '';
        let start = 0;
        const duration = 1800; // ms
        const startTime = performance.now();

        const animate = (now) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out expo
          const current = Math.floor(progress === 1 ? targetNum : targetNum * (1 - Math.pow(2, -10 * progress)));
          target.textContent = current + suffix;
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
        obs.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* --------------------------------------------------------------------------
   0.2 SCROLL REVEAL ANIMATIONS
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const targets = document.querySelectorAll(
    '.help-card, .social-platform-card, .pulse-map-card, .accordion-item-pulse, ' +
    '.coach-card, .program-card, .pricing-card, .pillar-card, .timeline-item, ' +
    '.editorial-card, .stat-card, .calc-card, section .h1-display, section .h2-display, section .lead-text'
  );

  targets.forEach((el, idx) => {
    if (!el.classList.contains('reveal-on-scroll')) {
      el.classList.add('reveal-on-scroll');
      // Subtle stagger delay based on position
      el.style.transitionDelay = `${(idx % 4) * 0.12}s`;
    }
  });

  const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-stagger, .reveal-stagger > *, .clip-reveal');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible', 'is-revealed');
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '50px 0px 50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}



/* --------------------------------------------------------------------------
   9. PRICING BILLING TOGGLE (MONTHLY vs ANNUAL)
   -------------------------------------------------------------------------- */
function initPricingToggle() {
  const toggleBtn = document.getElementById('billingToggle');
  const priceElements = document.querySelectorAll('.price-val');

  if (!toggleBtn || !priceElements.length) return;

  toggleBtn.addEventListener('click', () => {
    const isAnnual = toggleBtn.classList.toggle('is-annual');
    toggleBtn.setAttribute('aria-checked', isAnnual ? 'true' : 'false');

    priceElements.forEach(el => {
      el.classList.add('is-flipping');
      setTimeout(() => {
        const monthly = el.getAttribute('data-monthly');
        const annual = el.getAttribute('data-annual');
        if (isAnnual && annual) {
          el.textContent = annual;
        } else if (monthly) {
          el.textContent = monthly;
        }
        el.classList.remove('is-flipping');
      }, 150);
    });
  });
}


/* --------------------------------------------------------------------------
   10. INTERACTIVE HABIT & IMPACT CALCULATOR
   -------------------------------------------------------------------------- */
function initImpactCalculator() {
  const slider = document.getElementById('calcDaysSlider');
  const daysOutput = document.getElementById('calcDaysVal');
  const hoursOutput = document.getElementById('calcHoursVal');
  const velocityOutput = document.getElementById('calcVelocityVal');
  const goalBtns = document.querySelectorAll('.calc-goal-btn');

  if (!slider || !daysOutput) return;

  let currentGoal = 'strength';

  const updateCalculator = () => {
    const days = parseInt(slider.value, 10);
    daysOutput.textContent = days;

    // Calculate coach review hours per month
    const hours = Math.round(days * 2.5);
    if (hoursOutput) hoursOutput.textContent = `${hours} hrs/mo`;

    // Calculate progress velocity rating
    if (velocityOutput) {
      if (days <= 2) velocityOutput.textContent = 'Steady (1.2x)';
      else if (days === 3) velocityOutput.textContent = 'Optimal (2.5x)';
      else if (days === 4) velocityOutput.textContent = 'Accelerated (3.8x)';
      else velocityOutput.textContent = 'Peak Performance (5.0x)';
    }
  };

  slider.addEventListener('input', updateCalculator);

  goalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      goalBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentGoal = btn.getAttribute('data-goal');
      updateCalculator();
    });
  });

  updateCalculator();
}


/* --------------------------------------------------------------------------
   1. NAVBAR STICKY & ACTIVE STATES
   -------------------------------------------------------------------------- */
function initNavbar() {
  const header = document.querySelector('.pulse-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

function setActiveNavLinks() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  
  const desktopLinks = document.querySelectorAll('.desktop-nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  const updateLink = (link) => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  };

  desktopLinks.forEach(updateLink);
  mobileLinks.forEach(updateLink);
}

/* --------------------------------------------------------------------------
   2. MOBILE NAVIGATION OVERLAY (STRICT OVERLAY & SCROLL LOCK)
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle-btn');
  const overlay = document.querySelector('.mobile-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !overlay) return;

  const openMenu = () => {
    toggleBtn.classList.add('is-active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
  };

  const closeMenu = () => {
    toggleBtn.classList.remove('is-active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
  };

  toggleBtn.addEventListener('click', () => {
    const isOpen = overlay.classList.contains('is-open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeMenu();
    }
  });
}

/* --------------------------------------------------------------------------
   3. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        
        // If entry is timeline line
        if (entry.target.classList.contains('timeline-wrapper')) {
          const progressBar = entry.target.querySelector('.timeline-line-progress');
          if (progressBar) progressBar.style.width = '100%';
          
          const steps = entry.target.querySelectorAll('.timeline-step');
          steps.forEach((step, idx) => {
            setTimeout(() => step.classList.add('active'), idx * 250);
          });
        }

        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-on-scroll, .reveal-stagger, .timeline-wrapper').forEach(el => {
    observer.observe(el);
  });
}

/* --------------------------------------------------------------------------
   4. MODALS DATA & TRAP FOCUS (COACH & PROGRAM DETAILS)
   -------------------------------------------------------------------------- */
const COACHES_DATA = {
  alex: {
    name: "Alex Morgan",
    title: "Strength & Conditioning Head Coach",
    exp: "6+ Years Experience",
    bio: "Alex specializes in progressive overload strength programming, explosive athletic movement, and body composition optimization. He has worked with over 150 clients ranging from competitive powerlifters to busy executives building sustainable strength.",
    approach: "Focus on compound mechanics, injury prevention, and measurable week-over-week resistance progression.",
    specialties: ["Strength Training", "Body Composition", "Athletic Conditioning", "Movement Mechanics"],
    img: "assets/images/coach-alex.jpg"
  },
  priya: {
    name: "Priya Sharma",
    title: "Nutrition & Lifestyle Specialist",
    exp: "8+ Years Experience",
    bio: "Priya delivers practical, non-dogmatic nutrition guidance. Her method focuses on sustainable macronutrient strategies, metabolic balance, and building long-term healthy eating habits without extreme restrictiveness.",
    approach: "Biochemical individuality and intuitive meal structuring tailored around demanding work schedules.",
    specialties: ["Habit Transformation", "Macro Planning", "Energy Optimization", "Performance Fueling"],
    img: "assets/images/coach-priya.jpg"
  },
  daniel: {
    name: "Daniel Brooks",
    title: "Mobility & Physical Recovery Specialist",
    exp: "7+ Years Experience",
    bio: "Daniel integrates active mobility work, structural joint health, and post-workout recovery protocols. He helps clients unlock joint range of motion and eliminate stiffness to maintain peak physical longevity.",
    approach: "Controlled Articular Rotations (CARs), myofascial release techniques, and structured active recovery routines.",
    specialties: ["Joint Mobility", "Postural Realignment", "Recovery Planning", "Flexibility"],
    img: "assets/images/coach-daniel.jpg"
  }
};

const PROGRAMS_DATA = {
  strength: {
    title: "Strength & Muscle Building",
    tagline: "Build foundational power and muscular endurance.",
    desc: "A comprehensive periodized strength program designed to increase maximum force output, enhance muscle density, and perfect compound lift mechanics.",
    highlights: [
      "Customized 3-to-5 day training split",
      "Progressive overload tracking",
      "Video movement form analysis",
      "Deload and recovery integration"
    ],
    img: "assets/images/program-strength.jpg"
  },
  fatloss: {
    title: "Fat Loss & Metabolic Fitness",
    tagline: "High-yield conditioning for sustainable physique transformation.",
    desc: "Combines high-density resistance circuits with targeted energy system training to elevate daily caloric expenditure while preserving lean muscle mass.",
    highlights: [
      "Metabolic conditioning workouts",
      "Heart-rate zone guidance",
      "Daily activity & NEAT optimization",
      "Weekly momentum check-ins"
    ],
    img: "assets/images/program-fatloss.jpg"
  },
  nutrition: {
    title: "Nutrition & Meal Strategy",
    tagline: "Fuel your body with intention and clarity.",
    desc: "Personalized nutrition coaching that turns complex dietary science into simple, actionable daily habits tailored to your food preferences and lifestyle.",
    highlights: [
      "Caloric & macronutrient profiling",
      "Flexible meal planning guides",
      "Dining out & travel strategies",
      "Weekly digestive & energy review"
    ],
    img: "assets/images/program-nutrition.jpg"
  },
  recovery: {
    title: "Mobility & Active Recovery",
    tagline: "Restore joint freedom and eliminate movement friction.",
    desc: "Targeted mobility work designed to relieve chronic tightness, enhance passive and active range of motion, and optimize post-workout muscle repair.",
    highlights: [
      "Daily 15-minute mobility routines",
      "Targeted hip & shoulder protocols",
      "Sleep hygiene & HRV guidance",
      "Soft tissue release guidance"
    ],
    img: "assets/images/program-recovery.jpg"
  }
};

function initModals() {
  const modal = document.getElementById('pulseDetailModal');
  if (!modal) return;

  const modalContent = modal.querySelector('.modal-body-dynamic');
  const closeBtn = modal.querySelector('.modal-close-btn');

  const openModalWithHTML = (htmlContent) => {
    modalContent.innerHTML = htmlContent;
    modal.classList.add('is-active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  };

  const closeModal = () => {
    modal.classList.remove('is-active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Delegate clicks for Coach Modal triggers
  document.addEventListener('click', (e) => {
    const coachTrigger = e.target.closest('[data-coach-key]');
    if (coachTrigger) {
      e.preventDefault();
      const key = coachTrigger.getAttribute('data-coach-key');
      const coach = COACHES_DATA[key];
      if (coach) {
        const html = `
          <div class="row g-4 align-items-center">
            <div class="col-md-5">
              <img src="${coach.img}" alt="${coach.name}" class="img-fluid rounded-4 shadow-sm" style="width:100%; aspect-ratio:3/4; object-fit:cover;">
            </div>
            <div class="col-md-7">
              <span class="text-label">${coach.exp}</span>
              <h2 class="h2-display mb-1 text-white">${coach.name}</h2>
              <p class="text-success font-heading mb-3">${coach.title}</p>
              <p class="lead-text text-light opacity-75 mb-4" style="font-size:0.95rem;">${coach.bio}</p>
              <h4 class="h5 text-white mb-2 font-heading">Coaching Philosophy</h4>
              <p class="text-light opacity-75 mb-4" style="font-size:0.9rem;">${coach.approach}</p>
              <h4 class="h5 text-white mb-2 font-heading">Specialties</h4>
              <div class="d-flex flex-wrap gap-2 mb-4">
                ${coach.specialties.map(s => `<span class="badge bg-secondary bg-opacity-50 text-white font-heading px-3 py-2" style="border-radius:20px; font-weight:500;">${s}</span>`).join('')}
              </div>
              <a href="contact.html?coach=${encodeURIComponent(coach.name)}" class="btn-pulse btn-pulse-primary">Enquire With ${coach.name.split(' ')[0]}</a>
            </div>
          </div>
        `;
        openModalWithHTML(html);
      }
    }

    // Delegate clicks for Program Modal triggers
    const programTrigger = e.target.closest('[data-program-key]');
    if (programTrigger) {
      e.preventDefault();
      const key = programTrigger.getAttribute('data-program-key');
      const prog = PROGRAMS_DATA[key];
      if (prog) {
        const html = `
          <div class="row g-4 align-items-center">
            <div class="col-md-5">
              <img src="${prog.img}" alt="${prog.title}" class="img-fluid rounded-4" style="width:100%; aspect-ratio:4/3; object-fit:cover;">
            </div>
            <div class="col-md-7">
              <span class="text-label">PULSEFIT PROGRAM</span>
              <h2 class="h3-display mb-2 text-white">${prog.title}</h2>
              <p class="text-success font-heading mb-3">${prog.tagline}</p>
              <p class="text-light opacity-75 mb-4" style="font-size:0.95rem;">${prog.desc}</p>
              <h4 class="h5 text-white mb-3 font-heading">Program Highlights</h4>
              <ul class="list-unstyled mb-4 d-flex flex-direction-column gap-2">
                ${prog.highlights.map(h => `<li class="d-flex align-items-center gap-2 text-light" style="font-size:0.9rem;"><span class="text-success">✓</span> ${h}</li>`).join('')}
              </ul>
              <a href="contact.html?program=${encodeURIComponent(prog.title)}" class="btn-pulse btn-pulse-primary">Request Program Guide</a>
            </div>
          </div>
        `;
        openModalWithHTML(html);
      }
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   5. COACH CATEGORY FILTERING (SERVICES PAGE)
   -------------------------------------------------------------------------- */
function initCoachFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const coachItems = document.querySelectorAll('.coach-item-card');

  if (!filterBtns.length || !coachItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      coachItems.forEach(item => {
        const categories = item.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6. CONTACT FORM VALIDATION & FRONTEND SUCCESS STATE
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('pulseContactForm');
  const successBanner = document.getElementById('contactSuccessBanner');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    const fields = [
      { id: 'fullName', validate: val => val.trim().length >= 2, msg: 'Please enter your full name.' },
      { id: 'email', validate: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), msg: 'Please enter a valid email address.' },
      { id: 'areaOfInterest', validate: val => val !== '', msg: 'Please select an area of interest.' },
      { id: 'message', validate: val => val.trim().length >= 10, msg: 'Please enter a message (at least 10 characters).' }
    ];

    fields.forEach(fieldInfo => {
      const input = document.getElementById(fieldInfo.id);
      const group = input ? input.closest('.form-group') : null;
      if (input && group) {
        if (!fieldInfo.validate(input.value)) {
          isValid = false;
          group.classList.add('has-error');
          input.classList.add('is-invalid');
        } else {
          group.classList.remove('has-error');
          input.classList.remove('is-invalid');
        }
      }
    });

    if (isValid) {
      form.style.display = 'none';
      if (successBanner) {
        successBanner.innerHTML = '<span class="checkmark-pop text-success me-2 fs-4">✓</span> Thank you for reaching out! Your inquiry details have been logged for demonstration. A PULSEFIT specialist will get in touch with you shortly.';
        successBanner.style.display = 'block';
        successBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

  });
}

/* --------------------------------------------------------------------------
   7. ACCORDION (FAQ)
   -------------------------------------------------------------------------- */
function initAccordion() {
  const accordionHeaders = document.querySelectorAll('.accordion-header-pulse');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item-pulse');
      const isOpen = item.classList.contains('is-open');

      // Close all accordion items
      document.querySelectorAll('.accordion-item-pulse').forEach(i => {
        i.classList.remove('is-open');
        const btn = i.querySelector('.accordion-header-pulse');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      // Toggle clicked item
      if (!isOpen) {
        item.classList.add('is-open');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   8. BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top-btn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --------------------------------------------------------------------------
   9. INTERACTIVE GOOGLE MAP LOCATION SWITCHER
   -------------------------------------------------------------------------- */
function initMapTabs() {
  const mapTabs = document.querySelectorAll('.map-tab-btn');
  const mapIframe = document.getElementById('googleMapIframe');
  const statusText = document.getElementById('mapStatusText');
  const locationTitle = document.getElementById('mapLocationTitle');
  const addressText = document.getElementById('mapAddressText');
  const phoneText = document.getElementById('mapPhoneText');
  const parkingText = document.getElementById('mapParkingText');
  const directionsBtn = document.getElementById('mapDirectionsBtn');
  const callBtn = document.getElementById('mapCallBtn');

  if (!mapTabs.length || !mapIframe) return;

  const locationsData = {
    sf: {
      title: 'San Francisco HQ',
      status: 'Studio Open • 06:00 AM – 08:00 PM PST',
      address: '104 Performance Way, Suite 400<br>San Francisco, CA 94107',
      phone: '+1 (555) 019-2834',
      parking: 'Free Underground Member Garage',
      mapUrl: 'https://maps.google.com/maps?q=104%20Performance%20Way%2C%20San%20Francisco%2C%20CA%2094107&t=&z=15&ie=UTF8&iwloc=&output=embed',
      directionsUrl: 'https://maps.google.com/?q=104+Performance+Way+San+Francisco+CA+94107'
    },
    la: {
      title: 'Los Angeles Studio',
      status: 'Studio Open • 06:00 AM – 09:00 PM PST',
      address: '8420 Sunset Blvd, Suite 200<br>West Hollywood, CA 90069',
      phone: '+1 (555) 019-2835',
      parking: 'On-site Valet & Dedicated Parking Lot',
      mapUrl: 'https://maps.google.com/maps?q=8420%20Sunset%20Blvd%2C%20West%20Hollywood%2C%20CA%2090069&t=&z=15&ie=UTF8&iwloc=&output=embed',
      directionsUrl: 'https://maps.google.com/?q=8420+Sunset+Blvd+West+Hollywood+CA+90069'
    },
    ny: {
      title: 'New York Hub',
      status: 'Studio Open • 06:00 AM – 08:00 PM EST',
      address: '520 Broadway, 5th Floor<br>SoHo, New York, NY 10012',
      phone: '+1 (555) 019-2836',
      parking: 'Validated Garage at 528 Broadway',
      mapUrl: 'https://maps.google.com/maps?q=520%20Broadway%2C%20New%20York%2C%20NY%2010012&t=&z=15&ie=UTF8&iwloc=&output=embed',
      directionsUrl: 'https://maps.google.com/?q=520+Broadway+New+York+NY+10012'
    }
  };

  mapTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const locKey = tab.getAttribute('data-location');
      const data = locationsData[locKey];
      if (!data) return;

      // Update Tab active states
      mapTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Update Map Iframe with subtle transition
      mapIframe.style.opacity = '0.4';
      setTimeout(() => {
        mapIframe.src = data.mapUrl;
        mapIframe.style.opacity = '1';
      }, 200);

      // Update Floating Card Content
      if (statusText) statusText.textContent = data.status;
      if (locationTitle) locationTitle.textContent = data.title;
      if (addressText) addressText.innerHTML = data.address;
      if (phoneText) {
        phoneText.textContent = data.phone;
        phoneText.href = `tel:${data.phone.replace(/[^0-9+]/g, '')}`;
      }
      if (parkingText) parkingText.textContent = data.parking;
      if (directionsBtn) directionsBtn.href = data.directionsUrl;
      if (callBtn) callBtn.href = `tel:${data.phone.replace(/[^0-9+]/g, '')}`;
    });
  });
}

/* --------------------------------------------------------------------------
   14. THEME TOGGLE (LIGHT / DARK MODE)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const toggleBtns = document.querySelectorAll('#theme-toggle, .mobile-theme-toggle');
  const savedTheme = localStorage.getItem('pulsefit_theme') || 'light';

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateIcons(savedTheme);

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('pulsefit_theme', nextTheme);
      updateIcons(nextTheme);
    });
  });

  function updateIcons(theme) {
    toggleBtns.forEach(btn => {
      const moon = btn.querySelector('.moon-icon');
      const sun = btn.querySelector('.sun-icon');
      if (theme === 'dark') {
        if (moon) moon.classList.add('d-none');
        if (sun) sun.classList.remove('d-none');
        btn.setAttribute('title', 'Switch to Light Mode');
      } else {
        if (moon) moon.classList.remove('d-none');
        if (sun) sun.classList.add('d-none');
        btn.setAttribute('title', 'Switch to Dark Mode');
      }
    });
  }
}

/* --------------------------------------------------------------------------
   15. INTERACTIVE MOUSE SPOTLIGHT EFFECT ON CARDS
   -------------------------------------------------------------------------- */
function initCardSpotlight() {
  const cards = document.querySelectorAll('.coach-card, .pricing-card, .method-card, .pillar-card, .editorial-card, .community-card, .detail-card, .hero-dashboard, .stat-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* --------------------------------------------------------------------------
   16. FLOATING AMBIENT GLOW PARTICLES
   -------------------------------------------------------------------------- */
function initFloatingSparkles() {
  const heroSections = document.querySelectorAll('.hero-section');
  heroSections.forEach(hero => {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'ambient-particles-container';
    particleContainer.setAttribute('aria-hidden', 'true');
    
    for (let i = 0; i < 14; i++) {
      const particle = document.createElement('span');
      particle.className = 'ambient-particle';
      const size = Math.random() * 6 + 3; // 3px - 9px
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.top = `${Math.random() * 90 + 5}%`;
      particle.style.left = `${Math.random() * 95}%`;
      particle.style.animationDuration = `${Math.random() * 8 + 6}s`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      particleContainer.appendChild(particle);
    }
    hero.appendChild(particleContainer);
  });
}



