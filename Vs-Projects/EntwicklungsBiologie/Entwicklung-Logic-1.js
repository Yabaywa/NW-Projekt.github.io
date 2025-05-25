document.addEventListener('DOMContentLoaded', () => {
  const topicItems = document.querySelectorAll('.topic-item');
  const navLinks = document.querySelectorAll('.nav-link');
  let openBoxCount = 0; // Zähler für geöffnete Boxen

  // Funktion zum Aktualisieren des Scroll-Zustands
  const updateScrollState = () => {
    if (openBoxCount > 0) {
      document.body.style.overflowY = 'auto';
    } else {
      document.body.style.overflowY = 'hidden';
    }
  };

  // Funktion zum Umschalten des expandierten Zustands
  const toggleContent = (topicItem, button) => {
    const expandableContent = topicItem.querySelector('.expandable-content');
    const isActive = topicItem.classList.contains('active');

    if (!isActive) {
      button.textContent = '-';
      topicItem.classList.add('active');
      expandableContent.style.display = 'block';
      expandableContent.style.maxHeight = expandableContent.scrollHeight + 'px';
      openBoxCount++; // Erhöhe den Zähler
      updateScrollState();
    } else {
      button.textContent = '+';
      expandableContent.style.maxHeight = '0';
      setTimeout(() => {
        expandableContent.style.display = 'none';
      }, 400);
      topicItem.classList.remove('active');
      openBoxCount--; // Verringere den Zähler
      updateScrollState();
    }
  };

  // Klick-Handler für das gesamte topic-item
  topicItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const button = item.querySelector('.toggle-button');
      // Verhindere, dass der Klick auf den Button doppelt ausgelöst wird
      if (e.target !== button) {
        toggleContent(item, button);
      }
    });

    // Separater Klick-Handler für den Toggle-Button
    const button = item.querySelector('.toggle-button');
    button.addEventListener('click', () => {
      toggleContent(item, button);
    });
  });

  // Navigationsleiste-Klick-Handler
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.includes('index.html')) {
        window.location.href = href;
      } else {
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'auto', block: 'start' });
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        } else {
          window.location.href = href;
        }
      }
    });
  });

  // Fix: Initiales Scrollen bei Hash
  if (window.location.hash) {
    const initialTarget = document.getElementById(window.location.hash.substring(1));
    if (initialTarget) {
      initialTarget.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  }

  // Sternen-Animation dynamisch hinzufügen
  const body = document.querySelector('body.development-page');
  if (body) {
    for (let i = 0; i < 50; i++) { // Sterne
      const star = document.createElement('div');
      star.classList.add('star');
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.width = `${Math.random() * 3 + 1}px`; // Größe zwischen 1 und 4px
      star.style.height = star.style.width;
      star.style.animationDelay = `${Math.random() * 5}s`; // Zufällige Verzögerung
      body.appendChild(star);
    }
  }
});