const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
});

const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

const cards = document.querySelectorAll('.magic-hover');

cards.forEach(card => {
    card.addEventListener('mousemove', createParticles);
});

function createParticles(event) {
    const card = event.currentTarget;
    const numParticles = 20;
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const angle = Math.random() * 2 * Math.PI;
        const radius = 50 + Math.random() * 50;
        particle.style.setProperty('--x', Math.cos(angle) * radius);
        particle.style.setProperty('--y', Math.sin(angle) * radius);
        particle.style.left = `${event.clientX - card.getBoundingClientRect().left}px`;
        particle.style.top = `${event.clientY - card.getBoundingClientRect().top}px`;
        card.appendChild(particle);
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}
