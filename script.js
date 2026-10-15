
/* =========================
   1. FOOTER YEAR
========================= */

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


/* =========================
   2. MOBILE NAVIGATION
========================= */

const navLinks = document.querySelector(".nav-links");
const navContainer = document.querySelector(".nav-container");

if (navLinks && navContainer) {
  navLinks.addEventListener("click", function (event) {
    const clickedLink = event.target.closest("a");

    if (clickedLink) {
      navLinks.querySelectorAll("a").forEach(function (link) {
        link.removeAttribute("aria-current");
      });

      clickedLink.setAttribute("aria-current", "location");
    }
  });
}


/* =========================
   3. SMOOTH SCROLL
========================= */

document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener("click", function (event) {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (target) {
      event.preventDefault();

      target.scrollIntoView({
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches ? "auto" : "smooth",
        block: "start"
      });

      history.replaceState(null, "", targetId);
    }
  });
});


/* =========================
   4. SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(
  ".service-card, .project-card, .about-content, .contact-details"
);

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !reducedMotion) {
  revealElements.forEach(function (element) {
    element.classList.add("reveal");
  });

  const observer = new IntersectionObserver(
    function (entries, currentObserver) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach(function (element) {
    observer.observe(element);
  });
}
