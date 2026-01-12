(function () {
  emailjs.init("8aiOsqeI9dMGDkQxN");
})();

const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    status.style.display = "block";
    status.textContent = "⏳ Sending message...";

    emailjs.sendForm("service_1avac9q", "template_fk4kukp", this).then(
      function () {
        status.textContent = "✅ Message sent successfully!";
        form.reset();
      },
      function (error) {
        status.textContent = "❌ Error sending message.";
        console.error(error);
      }
    );
  });
}

(function () {
  const savedLang = localStorage.getItem("preferredLang");
  const path = window.location.pathname;
  const currentLang = path.includes("/de/") ? "de" : "ro";

  document.querySelectorAll(".lang-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetLang = link.dataset.lang;
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
