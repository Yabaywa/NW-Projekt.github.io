document.addEventListener('DOMContentLoaded', () => {
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const loginModeButton = document.getElementById('loginModeButton');
  const registerModeButton = document.getElementById('registerModeButton');
  const submitButton = document.getElementById('submitButton');
  const formTitle = document.getElementById('formTitle');
  const errorMessage = document.getElementById('errorMessage');

  let users = JSON.parse(localStorage.getItem('users')) || [];
  let isLoginMode = true;

  // Gespeicherte Anmeldung laden
  const savedUser = localStorage.getItem('currentUser');
  if (savedUser) {
    const [savedUsername, savedPassword, savedRole] = JSON.parse(savedUser);
    usernameInput.value = savedUsername;
    passwordInput.value = savedPassword;
  }

  loginModeButton.addEventListener('click', () => {
    isLoginMode = true;
    formTitle.textContent = 'Anmelden';
    loginModeButton.classList.add('active');
    registerModeButton.classList.remove('active');
    errorMessage.textContent = '';
  });

  registerModeButton.addEventListener('click', () => {
    isLoginMode = false;
    formTitle.textContent = 'Registrieren';
    registerModeButton.classList.add('active');
    loginModeButton.classList.remove('active');
    errorMessage.textContent = '';
  });

  submitButton.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    errorMessage.textContent = '';

    if (username.length < 3) {
      errorMessage.textContent = 'Benutzername muss mindestens 3 Buchstaben haben.';
      return;
    }
    if (password.length < 4) {
      errorMessage.textContent = 'Passwort muss mindestens 4 Zeichen haben.';
      return;
    }

    // Rolle festlegen: Nur der Benutzer "Yannek" bekommt die Admin-Rolle
    const role = username.toLowerCase() === 'yannekf' ? 'admin' : 'member';

    if (isLoginMode) {
      // Anmeldemodus
      const userExists = users.find(user => user.username === username);
      if (!userExists) {
        errorMessage.textContent = 'Benutzername existiert nicht. Bitte registriere dich.';
        return;
      }
      if (userExists.password !== password || userExists.role !== role) {
        errorMessage.textContent = 'Falsches Passwort oder Rolle.';
        return;
      }

      localStorage.setItem('currentUser', JSON.stringify([username, password, role]));
      window.location.href = '../index.html';
    } else {
      // Registrierungsmodus
      const userExists = users.find(user => user.username === username);
      if (userExists) {
        errorMessage.textContent = 'Benutzername existiert bereits. Wähle einen anderen.';
        return;
      }

      users.push({ username, password, role });
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify([username, password, role]));
      window.location.href = '../index.html';
    }
  });
});