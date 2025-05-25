document.addEventListener('DOMContentLoaded', () => {
  // Navigationsleiste-Klick-Handler
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      } else {
        window.location.href = link.getAttribute('href');
      }
    });
  });

  // Fix: Initiales Scrollen bei Hash
  if (window.location.hash) {
    const initialTarget = document.getElementById(window.location.hash.substring(1));
    if (initialTarget) {
      initialTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Partikel erzeugen
  const particleContainer = document.querySelector('.particle-container');
  const particleCount = 80;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.width = `${Math.random() * 5 + 2}px`;
    particle.style.height = particle.style.width;
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
    particleContainer.appendChild(particle);
  }
});