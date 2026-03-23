// ===================== INTERSECTION OBSERVER — fade-up =====================
// Stagger dinámico: cada .fade-up recibe un delay según su posición
// entre hermanos .fade-up del mismo padre, para que la animación sea
// escalonada de forma natural en cada sección.
const STAGGER = 90; // ms entre elementos del mismo grupo

function asignarStagger(el) {
  const hermanos = [...el.parentElement.children].filter(
    (h) => h.classList.contains('fade-up')
  );
  const idx = hermanos.indexOf(el);
  el.style.transitionDelay = `${idx * STAGGER}ms`;
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Limpiar delay al terminar para no bloquear transiciones futuras
        entry.target.addEventListener(
          'transitionend',
          () => { entry.target.style.transitionDelay = '0ms'; },
          { once: true }
        );
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.fade-up').forEach((el) => {
  asignarStagger(el);
  observer.observe(el);
});

// ===================== AVATAR: ocultar img rota =====================
// Si el src del avatar está vacío, el onerror inline ya lo maneja.
// Esta función adicional limpia el atributo src vacío para evitar
// que algunos navegadores muestren el ícono de imagen rota.
const avatarImg = document.querySelector('.avatar-img');
if (avatarImg && !avatarImg.getAttribute('src')) {
  avatarImg.style.display = 'none';
}
