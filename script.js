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

  const formatPhone = (digits) => {
    digits = digits.replace(/\D/g, '').slice(0, 10);

    if (digits.length === 0) return '';
    if (digits.length < 3) return `(${digits}`;
    if (digits.length === 3) return `(${digits})`;
    if (digits.length <= 6) return `(${digits.slice(0, 3)})-${digits.slice(3)}`;
    return `(${digits.slice(0, 3)})-${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  phoneInput.addEventListener('input', (event) => {
    const digits = phoneInput.value.replace(/\D/g, '').slice(0, 10);
    phoneInput.value = formatPhone(digits);
  });

  phoneInput.addEventListener('keydown', (event) => {
    if (event.key !== 'Backspace') return;

    const start = phoneInput.selectionStart;
    const end = phoneInput.selectionEnd;

    if (start !== end || start === 0) return;

    const value = phoneInput.value;
    const charBefore = value[start - 1];

    if (charBefore === '-' || charBefore === ')') {
      event.preventDefault();

      let digitIndex = -1;
      for (let i = start - 2; i >= 0; i--) {
        if (/\d/.test(value[i])) {
          digitIndex = i;
          break;
        }
      }

      if (digitIndex >= 0) {
        const newValue = value.slice(0, digitIndex) + value.slice(digitIndex + 1);
        const formatted = formatPhone(newValue);
        phoneInput.value = formatted;
        phoneInput.setSelectionRange(formatted.length, formatted.length);
      }
    }
  });
}
