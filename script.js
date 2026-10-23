
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const yearElement = document.getElementById("year");

// Mobile navigation
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
      menuToggle.textContent = "☰";
    });
  });
}

// Current year
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Contact form
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector(
      'button[type="submit"]'
    );

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    formStatus.textContent = "Ergaan kee ergaa jira...";

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        formStatus.textContent =
          "Galatoomi! Ergaan kee milkaa'inaan ergameera.";
        contactForm.reset();
      } else {
        formStatus.textContent =
          "Ergaan hin ergamne. Formspree keessatti formii kee mirkaneessi.";
      }
    } catch (error) {
      formStatus.textContent =
        "Rakkoon walqunnamtii uumame. Maaloo irra deebi'i.";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Send Message";
    }
  });
}
