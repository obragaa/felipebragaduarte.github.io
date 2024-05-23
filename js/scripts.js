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

// Modal
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('memory-game-modal');
    const btn = document.getElementById('open-memory-game');
    const span = document.getElementsByClassName('close')[0];
    const memoryGameGrid = document.querySelector('.memory-game-grid');
    const congratulationsMessage = document.getElementById('congratulations-message');
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let matchedPairs = 0;

    const cardImages = [
        { name: 'python', img: 'img/memory-card/python-original.svg' },
        { name: 'java', img: 'img/memory-card/java-original.svg' },
        { name: 'aws', img: 'img/memory-card/amazonwebservices-original-wordmark.svg' },
        { name: 'docker', img: 'img/memory-card/docker-original.svg' },
        { name: 'git', img: 'img/memory-card/git-original.svg' },
        { name: 'arduino', img: 'img/memory-card/arduino-original.svg' },
        { name: 'cplusplus', img: 'img/memory-card/cplusplus-original.svg' },
        { name: 'django', img: 'img/memory-card/django-plain.svg' },
        { name: 'insomnia', img: 'img/memory-card/insomnia-original.svg' },
        { name: 'sqldeveloper', img: 'img/memory-card/sqldeveloper-original.svg' },
        { name: 'python', img: 'img/memory-card/python-original.svg' },
        { name: 'java', img: 'img/memory-card/java-original.svg' },
        { name: 'aws', img: 'img/memory-card/amazonwebservices-original-wordmark.svg' },
        { name: 'docker', img: 'img/memory-card/docker-original.svg' },
        { name: 'git', img: 'img/memory-card/git-original.svg' },
        { name: 'arduino', img: 'img/memory-card/arduino-original.svg' },
        { name: 'cplusplus', img: 'img/memory-card/cplusplus-original.svg' },
        { name: 'django', img: 'img/memory-card/django-plain.svg' },
        { name: 'insomnia', img: 'img/memory-card/insomnia-original.svg' },
        { name: 'sqldeveloper', img: 'img/memory-card/sqldeveloper-original.svg' }
    ];

    function shuffle(array) {
        array.sort(() => 0.5 - Math.random());
    }

    function createBoard() {
        shuffle(cardImages);
        memoryGameGrid.innerHTML = '';
        congratulationsMessage.style.display = 'none';
        matchedPairs = 0;
        cardImages.forEach(image => {
            const card = document.createElement('div');
            card.classList.add('memory-card');
            card.dataset.name = image.name;

            const frontFace = document.createElement('img');
            frontFace.classList.add('front-face');
            frontFace.setAttribute('src', image.img);
            frontFace.setAttribute('alt', image.name);

            const backFace = document.createElement('img');
            backFace.classList.add('back-face');
            backFace.setAttribute('src', 'img/memory-card/card-back.svg'); // Caminho da imagem do verso

            card.appendChild(frontFace);
            card.appendChild(backFace);

            card.addEventListener('click', flipCard);
            memoryGameGrid.appendChild(card);
        });
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flip');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.name === secondCard.dataset.name;
        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        matchedPairs++;
        if (matchedPairs === cardImages.length / 2) {
            congratulationsMessage.style.display = 'block';
        }
        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    btn.onclick = function() {
        modal.style.display = 'block';
        createBoard();
    }

    span.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
});
