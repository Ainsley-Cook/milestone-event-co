// Milestone Event Co. — shared site behavior

document.addEventListener('DOMContentLoaded', function () {
  initNavToggle();
  initLightbox();
  initContactForm();
  initPackagePrefill();
});

function initNavToggle() {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function initLightbox() {
  var lightbox = document.querySelector('.lightbox');
  if (!lightbox) return;

  var lightboxImg = lightbox.querySelector('img');
  var lightboxTitle = lightbox.querySelector('.lb-title');
  var lightboxDesc = lightbox.querySelector('.lb-desc');
  var closeBtn = lightbox.querySelector('.lightbox-close');

  document.querySelectorAll('.portfolio-card button.thumb').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card = btn.closest('.portfolio-card');
      lightboxImg.src = btn.querySelector('img').src;
      lightboxImg.alt = btn.querySelector('img').alt;
      lightboxTitle.textContent = card.getAttribute('data-title') || '';
      lightboxDesc.textContent = card.getAttribute('data-desc') || '';
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function close() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) close();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
}

function initContactForm() {
  var form = document.querySelector('.contact-form');
  if (!form) return;

  var success = document.querySelector('.form-success');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var valid = true;

    form.querySelectorAll('[required]').forEach(function (field) {
      var wrapper = field.closest('.field');
      var fieldValid = field.checkValidity();
      if (!fieldValid) valid = false;
      wrapper.classList.toggle('invalid', !fieldValid);
    });

    if (!valid) {
      var firstInvalid = form.querySelector('.invalid input, .invalid select, .invalid textarea');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    var nameField = form.querySelector('#name');
    var nameVal = nameField ? nameField.value.split(' ')[0] : 'there';
    var successName = success.querySelector('.success-name');
    if (successName) successName.textContent = nameVal;

    form.classList.add('hide-form');
    success.classList.add('show');
    success.setAttribute('tabindex', '-1');
    success.focus();
  });

  form.querySelectorAll('input, select, textarea').forEach(function (field) {
    field.addEventListener('input', function () {
      var wrapper = field.closest('.field');
      if (wrapper.classList.contains('invalid') && field.checkValidity()) {
        wrapper.classList.remove('invalid');
      }
    });
  });
}

function initPackagePrefill() {
  var select = document.querySelector('#event-type');
  if (!select) return;
  var params = new URLSearchParams(window.location.search);
  var pkg = params.get('package');
  if (!pkg) return;

  var noteField = document.querySelector('#message');
  var labels = {
    essentials: 'Essentials Package',
    signature: 'Signature Package',
    executive: 'Executive Package'
  };
  var label = labels[pkg];
  if (label && noteField && !noteField.value) {
    noteField.value = "Hi, I'd like to learn more about the " + label + ".";
  }
}
