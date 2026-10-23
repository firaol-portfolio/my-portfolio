
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

// Formspree contact form
const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector(
      'button[type="submit"], input[type="submit"]'
    );
    const originalText = submitButton
      ? submitButton.textContent
      : "";

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    try {
      const response = await fetch("https://formspree.io/f/xgaawrna", {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        alert("Thank you! Your message was sent successfully.");
        contactForm.reset();
      } else {
        alert("Message could not be sent. Please check your form fields and try again.");
      }
    } catch (error) {
      alert("Connection error. Please try again.");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalText || "Send Message";
      }
    }
  });
}
