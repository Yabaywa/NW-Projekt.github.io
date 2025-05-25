document.addEventListener('DOMContentLoaded', () => {
  // Navigationsleiste-Klick-Handler
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      console.log('Clicked link:', link.textContent, 'href:', link.getAttribute('href')); // Debugging
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        console.log('Found target:', targetId); // Debugging
        targetElement.scrollIntoView({ behavior: 'auto', block: 'start' });
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      } else {
        console.log('Target not found:', targetId); // Debugging
        window.location.href = link.getAttribute('href'); // Fallback
      }
    });
  });

  // Fix: Initiales Scrollen bei Hash
  if (window.location.hash) {
    console.log('Initial hash:', window.location.hash); // Debugging
    const initialTarget = document.getElementById(window.location.hash.substring(1));
    if (initialTarget) {
      initialTarget.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  }

  // Partikel erzeugen
  const header = document.querySelector('.particle-container');
  const particleCount = 80;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.width = `${Math.random() * 5 + 2}px`;
    particle.style.height = particle.style.width;
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
    header.appendChild(particle);
  }

  // Infokarte "aufklappen"
  const infoToggle = document.querySelector('.info-toggle');
  const infoDetails = document.querySelector('.info-details');
  infoToggle.addEventListener('click', () => {
    const isActive = infoToggle.classList.toggle('active');
    infoDetails.classList.toggle('active');
    if (isActive) {
      infoToggle.textContent = 'Zusatzinformationen ausblenden';
    } else {
      infoToggle.textContent = 'Zusatzinformationen';
    }
  });

  // Aufklappmechanismus für topic-item und Updates
  const plusButtons = document.querySelectorAll('.plus-button');
  const expandableContents = document.querySelectorAll('.expandable-content');
  plusButtons.forEach((button, index) => {
    button.addEventListener('click', (e) => {
      e.preventDefault(); // Verhindert das Navigieren zu den Unterseiten
      const content = expandableContents[index];
      const isActive = button.classList.toggle('active');
      content.style.display = isActive ? 'block' : 'none';
      if (isActive) {
        content.style.maxHeight = content.scrollHeight + 'px'; // Anpassung an Inhalt
      } else {
        content.style.maxHeight = '0';
      }
    });
  });
});