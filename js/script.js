// ===== EmailJS Init =====
(function () {
  emailjs.init("8aiOsqeI9dMGDkQxN");
})();

// ===== Contact Form =====
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    status.style.display = "block";
    status.textContent = "\u23F3 Sending message...";

    emailjs.sendForm("service_1avac9q", "template_fk4kukp", this).then(
      function () {
        status.textContent = "\u2705 Message sent successfully!";
        form.reset();
        // Remove touched class from all inputs after reset
        form.querySelectorAll(".touched").forEach(function (el) {
          el.classList.remove("touched");
        });
      },
      function (error) {
        status.textContent = "\u274C Error sending message.";
        console.error(error);
      }
    );
  });
}

// ===== Language Switching =====
(function () {
  var savedLang = localStorage.getItem("preferredLang");
  var path = window.location.pathname;
  var currentLang = path.includes("/de/") ? "de" : "ro";

  document.querySelectorAll(".lang-link").forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      var targetLang = link.dataset.lang;
      localStorage.setItem("preferredLang", targetLang);

      if (targetLang !== currentLang) {
        window.location.href =
          targetLang === "de" ? "../de/index.html" : "../ro/index.html";
      }
    });
  });

  if (savedLang && savedLang !== currentLang) {
    window.location.href =
      savedLang === "de" ? "../de/index.html" : "../ro/index.html";
  }
})();

// ===== Mobile Menu Toggle =====
var menuBtn = document.getElementById("menuBtn");
var siteNav = document.getElementById("siteNav");

menuBtn.addEventListener("click", function () {
  siteNav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", siteNav.classList.contains("open"));
});

siteNav.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    siteNav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

// ===== Footer Year =====
var yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ===== Scroll Progress Bar =====
var progressBar = document.querySelector(".scroll-progress");
if (progressBar) {
  window.addEventListener("scroll", function () {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = scrollPercent + "%";
  });
}

// ===== Scroll Reveal (IntersectionObserver) =====
var revealElements = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right, .reveal-scale"
);

if (revealElements.length > 0 && "IntersectionObserver" in window) {
  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });
}

// ===== Active Navigation Highlighting =====
var navLinks = document.querySelectorAll(".nav a[href^='#']");
var sections = [];

navLinks.forEach(function (link) {
  var id = link.getAttribute("href").substring(1);
  var section = document.getElementById(id);
  if (section) {
    sections.push({ el: section, link: link });
  }
});

function updateActiveNav() {
  var scrollPos = window.scrollY + 120;

  var activeSection = null;
  sections.forEach(function (s) {
    if (s.el.offsetTop <= scrollPos) {
      activeSection = s;
    }
  });

  navLinks.forEach(function (l) {
    l.classList.remove("active");
  });

  if (activeSection) {
    activeSection.link.classList.add("active");
  }
}

window.addEventListener("scroll", updateActiveNav);
updateActiveNav();

// ===== Back to Top Button =====
var backToTop = document.querySelector(".back-to-top");
if (backToTop) {
  window.addEventListener("scroll", function () {
    if (window.scrollY > 400) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });

  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ===== Button Ripple Effect =====
document.querySelectorAll(".btn").forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    var existing = btn.querySelector(".ripple");
    if (existing) existing.remove();

    var ripple = document.createElement("span");
    ripple.classList.add("ripple");

    var rect = btn.getBoundingClientRect();
    var size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = e.clientX - rect.left - size / 2 + "px";
    ripple.style.top = e.clientY - rect.top - size / 2 + "px";

    btn.appendChild(ripple);

    ripple.addEventListener("animationend", function () {
      ripple.remove();
    });
  });
});

// ===== FAQ Smooth Accordion =====
// Close other details when one opens (optional accordion behavior)
document.querySelectorAll("details").forEach(function (detail) {
  detail.addEventListener("toggle", function () {
    if (detail.open) {
      document.querySelectorAll("details").forEach(function (other) {
        if (other !== detail && other.open) {
          other.removeAttribute("open");
        }
      });
    }
  });
});

// ===== Typewriter Effect =====
var typedEl = document.querySelector('.typed-text');
if (typedEl) {
  var rawWords = typedEl.getAttribute('data-words') || '';
  var words = rawWords.split('|').filter(Boolean);
  var wordIndex = 0;
  var charIndex = 0;
  var isDeleting = false;

  function typeWriter() {
    var currentWord = words[wordIndex];
    if (isDeleting) {
      typedEl.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(typeWriter, 1800);
      return;
    }
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
    setTimeout(typeWriter, isDeleting ? 45 : 75);
  }

  if (words.length > 0) {
    typedEl.textContent = words[0];
    setTimeout(typeWriter, 1400);
  }
}

// ===== Stats Counter Animation =====
var statsSection = document.querySelector('.stats-section');
if (statsSection && 'IntersectionObserver' in window) {
  var countersAnimated = false;
  var statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !countersAnimated) {
        countersAnimated = true;
        document.querySelectorAll('.stat-number[data-target]').forEach(function (el) {
          var target = parseInt(el.getAttribute('data-target'), 10);
          var duration = 1600;
          var start = performance.now();
          function update(now) {
            var elapsed = now - start;
            var progress = Math.min(elapsed / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target);
            if (progress < 1) requestAnimationFrame(update);
          }
          requestAnimationFrame(update);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  statsObserver.observe(statsSection);
}

// ===== Form Real-time Validation =====
if (form) {
  form.querySelectorAll("input, textarea").forEach(function (field) {
    field.addEventListener("blur", function () {
      field.classList.add("touched");
    });
  });
}
