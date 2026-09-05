const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

document.getElementById('year').textContent = new Date().getFullYear();


const phoneInput = document.querySelector('input[name="phone"]');

if (phoneInput) {
  phoneInput.setAttribute('inputmode', 'numeric');
  phoneInput.setAttribute('maxlength', '14');

  phoneInput.addEventListener('input', () => {
    const digits = phoneInput.value.replace(/\D/g, '').slice(0, 10);
    let formatted = '';

    if (digits.length > 0) {
      formatted = `(${digits.slice(0, 3)}`;
    }
    if (digits.length >= 3) {
      formatted += ')-';
    }
    if (digits.length > 3) {
      formatted += digits.slice(3, 6);
    }
    if (digits.length >= 6) {
      formatted += '-';
    }
    if (digits.length > 6) {
      formatted += digits.slice(6, 10);
    }

    phoneInput.value = formatted;
  });
}
