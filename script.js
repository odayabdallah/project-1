// Custom JavaScript for Purple Gradient Website

document.addEventListener("DOMContentLoaded", () => {
  // Navbar scroll effect
  const navbar = document.querySelector(".navbar")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]')

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Form submission handling
  const forms = document.querySelectorAll("form")

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get form data
      const formData = new FormData(this)
      const formObject = {}

      formData.forEach((value, key) => {
        formObject[key] = value
      })

      // Show success message
      showNotification("تم إرسال الرسالة بنجاح! سنتواصل معك قريباً.", "success")

      // Reset form
      this.reset()
    })
  })

  // Button click animations
  const buttons = document.querySelectorAll(".btn")

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Create ripple effect
      const ripple = document.createElement("span")
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.width = ripple.style.height = size + "px"
      ripple.style.left = x + "px"
      ripple.style.top = y + "px"
      ripple.classList.add("ripple")

      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up")
      }
    })
  }, observerOptions)

  // Observe all cards and sections
  const elementsToAnimate = document.querySelectorAll(".card, .display-4, .lead")
  elementsToAnimate.forEach((el) => observer.observe(el))

  // Portfolio hover effects
  const portfolioCards = document.querySelectorAll(".portfolio-card")

  portfolioCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05) rotateY(5deg)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) rotateY(0deg)"
    })
  })

  // Pricing card selection
  const pricingCards = document.querySelectorAll(".card")
  const pricingButtons = document.querySelectorAll(".btn")

  pricingButtons.forEach((button) => {
    if (button.textContent.includes("اختر هذه الخطة")) {
      button.addEventListener("click", function () {
        const cardTitle = this.closest(".card").querySelector(".card-title").textContent
        showNotification(`تم اختيار خطة ${cardTitle} بنجاح!`, "info")
      })
    }
  })

  // Dynamic background particles (optional enhancement)
  createParticles()

  // Notification system
  function showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `alert alert-${type === "success" ? "success" : "info"} position-fixed`
    notification.style.cssText = `
            top: 20px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
            animation: slideInRight 0.5s ease-out;
        `
    notification.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="bi bi-check-circle-fill me-2"></i>
                ${message}
                <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
            </div>
        `

    document.body.appendChild(notification)

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove()
      }
    }, 5000)
  }

  // Create floating particles background
  function createParticles() {
    const particlesContainer = document.createElement("div")
    particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        `

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement("div")
      particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 10 + 10}s infinite linear;
            `
      particlesContainer.appendChild(particle)
    }

    document.body.appendChild(particlesContainer)
  }

  // Add CSS for animations
  const style = document.createElement("style")
  style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes float {
            0% {
                transform: translateY(0px) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(-1000px) rotate(720deg);
                opacity: 0;
            }
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `
  document.head.appendChild(style)
})

// Additional utility functions
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

// Add scroll to top button
const scrollTopBtn = document.createElement("button")
scrollTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>'
scrollTopBtn.className = "btn btn-primary position-fixed"
scrollTopBtn.style.cssText = `
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: none;
`
scrollTopBtn.onclick = scrollToTop
document.body.appendChild(scrollTopBtn)

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.style.display = "block"
  } else {
    scrollTopBtn.style.display = "none"
  }
})
