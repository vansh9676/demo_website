// Main JavaScript File: Loads header/footer, sets active link, handles sticky & mobile menu

// Function to load HTML component into a target element
async function loadComponent(url, targetId) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to load ${url}`);
    const html = await response.text();
    document.getElementById(targetId).innerHTML = html;
  } catch (error) {
    console.error(error);
  }
}

// Load both header and footer, then initialize features
Promise.all([
  loadComponent('components/header.html', 'header'),
  loadComponent('components/footer.html', 'footer')
]).then(() => {
  // Components are now in the DOM
  initHeaderFeatures();
  setActiveLink();
});

// Initialize sticky header and mobile hamburger
function initHeaderFeatures() {
  const header = document.querySelector('.site-header');
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.main-nav');

  // Sticky header class on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('active');
      // Optional: change hamburger icon (e.g., to X)
      hamburger.textContent = nav.classList.contains('active') ? '✕' : '☰';
    });
  }

  // Close mobile menu when a link is clicked (optional)
  if (nav) {
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        if (hamburger) hamburger.textContent = '☰';
      });
    });
  }
}

// Highlight the current page in navigation
function setActiveLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.main-nav a');

  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}