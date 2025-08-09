// script.js

// --- Car Data ---
const carData = [
  {
    name: "Lamborghini Aventador",
    description: "A super sports car with a powerful V12 engine and stunning looks. Its aggressive lines and raw power make it a true automotive icon.",
    image: "../Images/Lamborghini.jpg",
    price: "$393,695",
    rating: 4.9,
    specs: {
      engine: "6.5L V12",
      topSpeed: "217 mph",
      horsepower: "769 hp",
      acceleration: "0-60 mph in 2.8s",
      transmission: "7-speed ISR",
      drive: "AWD"
    },
  },
  {
    name: "Rolls Royce Phantom",
    description: "Luxury and elegance at its peak. A ride like no other, offering an unparalleled serene and opulent experience.",
    image: "../Images/rrphantom.jpg",
    price: "$460,000",
    rating: 4.8,
    specs: {
      engine: "6.75L Twin-Turbo V12",
      topSpeed: "155 mph",
      horsepower: "563 hp",
      acceleration: "0-60 mph in 5.3s",
      transmission: "8-speed automatic",
      drive: "RWD"
    },
  },
  {
    name: "Ferrari F8 Tributo",
    description: "Speed and beauty combined. Ferrari's masterpiece, a mid-rear-engined sports car that pays homage to the most powerful V8 in Ferrari history.",
    image: "../Images/ferrari.jpg",
    price: "$276,550",
    rating: 4.7,
    specs: {
      engine: "3.9L Twin-Turbo V8",
      topSpeed: "211 mph",
      horsepower: "710 hp",
      acceleration: "0-60 mph in 2.9s",
      transmission: "7-speed F1 dual-clutch",
      drive: "RWD"
    },
  },
  {
    name: "Porsche 911 Turbo S",
    description: "A perfect blend of performance, style, and everyday usability. The Turbo S sets the benchmark for high-performance sports cars.",
    image: "../Images/porshche911.jpg",
    price: "$207,000",
    rating: 4.6,
    specs: {
      engine: "3.7L Twin-Turbo Flat-6",
      topSpeed: "205 mph",
      horsepower: "640 hp",
      acceleration: "0-60 mph in 2.6s",
      transmission: "8-speed PDK",
      drive: "AWD"
    },
  },
  {
    name: "Bugatti Chiron",
    description: "A true hypercar with unmatched performance and exclusivity. The Chiron represents the pinnacle of automotive engineering and luxury.",
    image: "../Images/bugatti.jpg",
    price: "$3,300,000",
    rating: 5.0,
    specs: {
      engine: "8.0L Quad-Turbo W16",
      topSpeed: "261 mph (electronically limited)",
      horsepower: "1,479 hp",
      acceleration: "0-60 mph in 2.4s",
      transmission: "7-speed dual-clutch",
      drive: "AWD"
    },
  },
  {
    name: "BMW M5 Competition",
    description: "Luxury meets performance in this high-end BMW coupe, offering thrilling dynamics and sophisticated comfort.",
    image: "../Images/bmwm5.jpg",
    price: "$130,000",
    rating: 4.5,
    specs: {
      engine: "4.4L Twin-Turbo V8",
      topSpeed: "190 mph (with M Driver's Package)",
      horsepower: "617 hp",
      acceleration: "0-60 mph in 3.0s",
      transmission: "8-speed automatic",
      drive: "AWD (with 2WD mode)"
    },
  }
];

// --- Functions for Cars Section ---
function renderCars() {
  const container = document.getElementById("cars-container");
  if (!container) return;

  container.innerHTML = ""; // Clear existing content

  carData.forEach((car, index) => {
    const stars = "★".repeat(Math.floor(car.rating)) + "☆".repeat(5 - Math.floor(car.rating));

    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-4 mb-4"; // Bootstrap grid classes

    col.innerHTML = `
      <div class="card h-100 shadow-sm animate__animated animate__fadeInUp">
        <img src="${car.image}" alt="${car.name}" class="card-img-top img-fluid" />
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${car.name}</h5>
          <p class="card-text">${car.description}</p>
          <p class="mb-1"><strong>Price:</strong> ${car.price}</p>
          <p class="mb-3"><strong>Rating:</strong> ${stars}</p>
          <ul class="list-unstyled small text-start mb-auto">
            <li><strong>Engine:</strong> ${car.specs.engine}</li>
            <li><strong>Top Speed:</strong> ${car.specs.topSpeed}</li>
            <li><strong>Horsepower:</strong> ${car.specs.horsepower}</li>
            ${car.specs.acceleration ? `<li><strong>0-60 mph:</strong> ${car.specs.acceleration}</li>` : ''}
            ${car.specs.transmission ? `<li><strong>Transmission:</strong> ${car.specs.transmission}</li>` : ''}
            ${car.specs.drive ? `<li><strong>Drive:</strong> ${car.specs.drive}</li>` : ''}
          </ul>
          <div class="mt-4 d-flex justify-content-between gap-2">
            <button class="btn btn-primary flex-fill" onclick="bookNow('${car.name}')">Book Now</button>
            <button class="btn btn-outline-dark flex-fill" onclick='showCarModal(${index})'>More Info</button>
          </div>
        </div>
      </div>
    `;

    container.appendChild(col);
  });
}

function showCarModal(index) {
  const car = carData[index];
  document.getElementById("modalTitle").innerText = car.name;
  document.getElementById("modalBody").innerHTML = `
    <img src="${car.image}" alt="${car.name}" class="img-fluid rounded mb-3" />
    <p>${car.description}</p>
    <ul class="list-unstyled">
      <li><strong>Price:</strong> ${car.price}</li>
      <li><strong>Engine:</strong> ${car.specs.engine}</li>
      <li><strong>Top Speed:</strong> ${car.specs.topSpeed}</li>
      <li><strong>Horsepower:</strong> ${car.specs.horsepower}</li>
      ${car.specs.acceleration ? `<li><strong>0-60 mph:</strong> ${car.specs.acceleration}</li>` : ''}
      ${car.specs.transmission ? `<li><strong>Transmission:</strong> ${car.specs.transmission}</li>` : ''}
      ${car.specs.drive ? `<li><strong>Drive:</strong> ${car.specs.drive}</li>` : ''}
    </ul>
  `;
  // Set the Book Now button to pass the car name
  document.querySelector('#carModal .btn.btn-primary').setAttribute('onclick', `bookNow('${car.name.replace(/'/g, "\\'")}')`);
  const carModal = new bootstrap.Modal(document.getElementById("carModal"));
  carModal.show();
}

function bookNow(carName = '') {
  // Hide all modals
  document.querySelectorAll('.modal.show').forEach(modalEl => {
    bootstrap.Modal.getInstance(modalEl)?.hide();
  });

  // Show the booking form section
  const bookSection = document.getElementById("book-form-section");
  if (bookSection) {
    bookSection.classList.remove('d-none');
    bookSection.scrollIntoView({ behavior: 'smooth' });
    document.getElementById('bookCarName').value = carName || '';
  }
}

// Hide the booking form when user submits or navigates away (optional)
document.getElementById('bookCarForm')?.addEventListener('submit', function (e) {
  e.preventDefault();
  document.getElementById('feedbackModalBody').innerText =
    `Thank you, ${document.getElementById('bookUserName').value}! Your booking for ${document.getElementById('bookCarName').value} has been received.`;
  new bootstrap.Modal(document.getElementById('feedbackModal')).show();
  this.reset();
  // Hide the booking form after submission
  document.getElementById("book-form-section").classList.add('d-none');
});

// --- Contact Form ---
function setupContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    if (!name || !email || !message) {
      alert("Please fill in all required fields (Name, Email, Message).");
      return;
    }

    // In a real application, send this data to a server using fetch() or XMLHttpRequest
    console.log("Contact Form Submission:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Subject:", subject);
    console.log("Message:", message);

    document.getElementById('feedbackModalBody').innerText = `Thank you, ${name}! Your message has been received. We will get back to you shortly.`;
    new bootstrap.Modal(document.getElementById('feedbackModal')).show();
    form.reset();
  });
}

// --- Sell Car Form ---
function setupSellCarForm() {
  const form = document.getElementById("sellCarForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    const sellType = document.getElementById("sellType").value.trim();
    const sellerName = document.getElementById("sellerName").value.trim();
    const sellerPhone = document.getElementById("sellerPhone").value.trim();
    const sellerEmail = document.getElementById("sellerEmail").value.trim();
    const carModel = document.getElementById("carModel").value.trim();

    // Get error elements
    const sellTypeError = document.getElementById("sellTypeError");
    const sellerNameError = document.getElementById("sellerNameError");
    const sellerPhoneError = document.getElementById("sellerPhoneError");
    const sellerEmailError = document.getElementById("sellerEmailError");
    const carModelError = document.getElementById("carModelError");

    // Reset errors
    sellTypeError.textContent = sellerNameError.textContent = sellerPhoneError.textContent =
      sellerEmailError.textContent = carModelError.textContent = "";

    // Validation
    if (sellType === "") {
      sellTypeError.textContent = "Please select an option.";
      isValid = false;
    }
    if (sellerName === "") {
      sellerNameError.textContent = "Please enter your name.";
      isValid = false;
    }
    if (!/^\d{10}$/.test(sellerPhone)) {
      sellerPhoneError.textContent = "Enter a valid 10-digit phone number.";
      isValid = false;
    }
    if (!/^\S+@\S+\.\S+$/.test(sellerEmail)) {
      sellerEmailError.textContent = "Enter a valid email.";
      isValid = false;
    }
    if (carModel === "") {
      carModelError.textContent = "Please enter your car model.";
      isValid = false;
    }

    if (isValid) {
      document.getElementById('feedbackModalBody').innerText = `Thank you, ${sellerName}! We have received your ${sellType} request for ${carModel}. Our team will contact you soon.`;
      new bootstrap.Modal(document.getElementById('feedbackModal')).show();
      form.reset();
    }
  });
}

// --- EMI Calculator ---
function calculateEMI() {
  const amount = parseFloat(document.getElementById('loanAmount').value);
  const rate = parseFloat(document.getElementById('interestRate').value) / 100 / 12;
  const tenure = parseFloat(document.getElementById('loanTenure').value) * 12;
  const resultDiv = document.getElementById('emiResult');

  if (!amount || !rate || !tenure || amount <= 0 || tenure <= 0) {
    resultDiv.classList.remove('success');
    resultDiv.classList.remove('error');
    resultDiv.classList.add('d-none');
    resultDiv.innerHTML = '';
    return;
  }

  const emi = (amount * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1);
  const totalAmount = emi * tenure;
  const totalInterest = totalAmount - amount;

  resultDiv.innerHTML = `
    <div>
      <p class="mb-2">Monthly EMI: <strong>₹${emi.toFixed(2)}</strong></p>
      <small class="text-muted">Total Interest: ₹${totalInterest.toFixed(2)} | Total Amount: ₹${totalAmount.toFixed(2)}</small>
    </div>
  `;
  resultDiv.classList.remove('d-none', 'error');
  resultDiv.classList.add('success');
}

// --- Scroll to Contact Function for EMI Banner ---
function scrollToContact() {
  const contactSection = document.getElementById("contact");
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
    // Pre-fill subject for EMI inquiry
    document.getElementById('subject').value = 'EMI and Financing Inquiry';
  }
}


// --- Navbar Active State & Smooth Scroll (FIXED) ---
function setupSmoothScrollAndNavbarActive() {
  // Handle all navigation links including dropdown items
  document.querySelectorAll('nav a.nav-link, .dropdown-item').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      // Allow theme toggle and dropdown toggle to work without smooth scroll
      if (this.id === 'theme-toggle' || this.classList.contains('dropdown-toggle')) {
        return;
      }

      e.preventDefault();

      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });

        history.pushState(null, '', this.getAttribute('href'));

        // Close mobile menu if open
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.getElementById('navbarNav');
        if (navbarToggler && navbarCollapse.classList.contains('show')) {
          bootstrap.Collapse.getInstance(navbarCollapse).hide();
        }
      }

      // Hide the booking form if visible
      document.getElementById("book-form-section")?.classList.add('d-none');
    });
  });

  // Define which sections belong to Services dropdown
  const servicesSubsections = ['sell-car', 'emi-calculator'];

  // Update active states on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav .nav-link:not(.dropdown-toggle)');
  const servicesDropdown = document.getElementById('servicesDropdown');

  window.addEventListener('scroll', () => {
    let currentActiveId = '';
    const scrollPosition = window.scrollY + 100; // Offset for fixed navbar

    // Find the current section
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentActiveId = section.id;
      }
    });

    // Remove active class from all nav links first
    navLinks.forEach(link => link.classList.remove('active'));
    servicesDropdown.classList.remove('active');

    // Check if current section is a Services subsection
    if (servicesSubsections.includes(currentActiveId)) {
      // Highlight Services dropdown
      servicesDropdown.classList.add('active');
    } else {
      // Highlight the specific nav link
      const activeLink = document.querySelector(`nav a.nav-link[href="#${currentActiveId}"]`);
      if (activeLink && !activeLink.classList.contains('dropdown-toggle')) {
        activeLink.classList.add('active');
      }
    }
  });

  // Handle initial load
  window.addEventListener('load', () => {
    const currentHash = window.location.hash || '#home';
    const currentId = currentHash.substring(1);

    navLinks.forEach(link => link.classList.remove('active'));
    servicesDropdown.classList.remove('active');

    if (servicesSubsections.includes(currentId)) {
      servicesDropdown.classList.add('active');
    } else {
      const initialNavLink = document.querySelector(`nav a.nav-link[href="${currentHash}"]`);
      if (initialNavLink && !initialNavLink.classList.contains('dropdown-toggle')) {
        initialNavLink.classList.add('active');
      }
    }

    if (currentHash !== '#home') {
      const targetSection = document.getElementById(currentId);
      if (targetSection) {
        setTimeout(() => {
          targetSection.scrollIntoView();
        }, 100);
      }
    }
  });
}

// --- Theme Toggle Logic ---
function setupThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  if (!themeToggleBtn) return;

  // Check saved preference on load
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    themeToggleBtn.innerHTML = '<i class="bi bi-sun-fill"></i><span> Light Mode</span>';
  } else {
    body.classList.remove('dark-theme');
    themeToggleBtn.innerHTML = '<i class="bi bi-moon-fill"></i><span> Dark Mode</span>';
  }

  // Theme toggle functionality
  themeToggleBtn.addEventListener('click', function () {
    const isDarkMode = body.classList.contains('dark-theme');
    if (isDarkMode) {
      body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
      themeToggleBtn.innerHTML = '<i class="bi bi-moon-fill"></i><span> Dark Mode</span>';
    } else {
      body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
      themeToggleBtn.innerHTML = '<i class="bi bi-sun-fill"></i><span> Light Mode</span>';
    }
  });
}

// --- Initialize all functions on DOM Content Loaded ---
document.addEventListener("DOMContentLoaded", () => {
  renderCars();
  setupContactForm();
  setupSellCarForm();
  setupSmoothScrollAndNavbarActive();
  setupThemeToggle();

  // Optional: Add initial animations
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    if (section.id !== 'home') {
      section.classList.add('animate__animated', 'animate__fadeInUp');
    }
  });

  // Force scroll to hero section on load
  const hero = document.getElementById("home");
  if (hero) hero.scrollIntoView({ behavior: "auto" });
});
