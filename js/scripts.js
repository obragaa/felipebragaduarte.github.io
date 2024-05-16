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

// Interatividade da Timeline
document.addEventListener('DOMContentLoaded', function () {
    const items = document.querySelectorAll('.timeline-item');

    const isInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    const run = () =>
        items.forEach((item) => {
            if (isInViewport(item)) {
                item.classList.add('in-view');
            }
        });

    // Events
    window.addEventListener('load', run);
    window.addEventListener('resize', run);
    window.addEventListener('scroll', run);
});
