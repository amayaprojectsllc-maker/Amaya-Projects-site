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

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const phoneInput = document.querySelector('input[name="phone"]');

if (phoneInput) {
  phoneInput.setAttribute('maxlength', '14');

  const formatPhone = (digits) => {
    digits = digits.replace(/\D/g, '').slice(0, 10);
    if (digits.length === 0) return '';
    if (digits.length < 3) return `(${digits}`;
    if (digits.length === 3) return `(${digits})`;
    if (digits.length <= 6) return `(${digits.slice(0, 3)})-${digits.slice(3)}`;
    return `(${digits.slice(0, 3)})-${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  phoneInput.addEventListener('input', () => {
    phoneInput.value = formatPhone(phoneInput.value);
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

const form = document.querySelector('.quote-form');

if (form) {
  const fields = Array.from(form.querySelectorAll('input:not([type="hidden"]), select, textarea'));

  const removeError = (field) => {
    field.classList.remove('is-invalid');
    field.removeAttribute('aria-invalid');
    const label = field.closest('label');
    const error = label?.querySelector('.field-error');
    if (error) error.remove();
  };

  const showError = (field, message) => {
    removeError(field);
    field.classList.add('is-invalid');
    field.setAttribute('aria-invalid', 'true');
    const label = field.closest('label');
    if (label) {
      const error = document.createElement('span');
      error.className = 'field-error';
      error.textContent = message;
      label.appendChild(error);
    }
  };

  const isEmptyRequired = (field) => field.required && !field.value.trim();

  fields.forEach((field) => {
    field.addEventListener('input', () => {
      if (!isEmptyRequired(field) && (field.name !== 'phone' || field.value.replace(/\D/g, '').length === 10)) {
        removeError(field);
      }
    });
    field.addEventListener('change', () => {
      if (!isEmptyRequired(field)) removeError(field);
    });
  });

  form.addEventListener('submit', (event) => {
    fields.forEach(removeError);

    let firstInvalid = null;

    for (const field of fields) {
      let message = '';

      if (isEmptyRequired(field)) {
        message = 'Required';
      } else if (field.name === 'phone' && field.value.replace(/\D/g, '').length !== 10) {
        message = 'Required';
      } else if (field.type === 'email' && field.value && !field.validity.valid) {
        message = 'Enter a valid email';
      }

      if (message) {
        showError(field, message);
        if (!firstInvalid) firstInvalid = field;
      }
    }

    if (firstInvalid) {
      event.preventDefault();
      firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => firstInvalid.focus({ preventScroll: true }), 350);
      return;
    }

    const submit = form.querySelector('.form-submit');
    if (submit) {
      submit.disabled = true;
      submit.textContent = 'Sending...';
    }

    if (typeof gtag === 'function') {
      gtag('event', 'estimate_form_submit');
    }
  });
}

document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
  link.addEventListener('click', () => {
    if (typeof gtag === 'function') gtag('event', 'phone_click');
  });
});

document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
  link.addEventListener('click', () => {
    if (typeof gtag === 'function') gtag('event', 'email_click');
  });
});

document.querySelectorAll('a[href="#quote"]').forEach((link) => {
  link.addEventListener('click', () => {
    if (typeof gtag === 'function') gtag('event', 'estimate_cta_click');
  });
});
