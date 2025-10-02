(function() {
// Header active in scroll
const headerContainer = document.getElementById('header-container');

window.addEventListener('scroll', () => {
    headerContainer.classList.toggle('active', window.scrollY > 0)
});

const linksMenu = document.querySelectorAll('a[href^="#"]');

linksMenu.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        const headerHeight = headerContainer.offsetHeight;

        const sectionTop = targetSection.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    });
});

// Menu mobile
const headerContent = document.getElementById('header-content');
const menuMobile = document.getElementById('btn-mobile');
const headerNav = document.getElementById('header-nav');
const navLinks = headerNav.querySelectorAll('a');

function activateMenu(event) {
    if(event.type === 'touchstart') {
        event.preventDefault();
    }

    headerContent.classList.toggle('active');
    headerNav.classList.toggle('active');

    const active = headerNav.classList.contains('active');

    event.currentTarget.setAttribute('aria-expanded', active);

    if(active) {
        event.currentTarget.setAttribute('aria-label', 'Fechar menu');
    } else {
        event.currentTarget.setAttribute('aria-label', 'Abrir menu');
    }
}

menuMobile.addEventListener('click', activateMenu);
menuMobile.addEventListener('touchstart', activateMenu);

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        headerContent.classList.remove('active');
        headerNav.classList.remove('active');
        menuMobile.setAttribute('aria-expanded', false);
        menuMobile.setAttribute('aria-label', 'Abrir menu');
    });
});

//Scrollspy
const menuLinks = document.querySelectorAll('.nav__menu-link');
const sections = document.querySelectorAll('section[id]');

function onScroll() {
    let scrollPos = window.scrollY + 150;

    sections.forEach(section => {
        if(section.id) {
            const link = document.querySelector(`.nav__menu-link[href="#${section.id}"]`);
            if(!link) return;

            const top = section.offsetTop;
            const height = section.offsetHeight;

            if(scrollPos >= top && scrollPos < top + height) {
                menuLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
}
window.addEventListener('scroll', onScroll);
window.addEventListener('load', onScroll);

// Slideshow
const slideContainer = [...document.querySelectorAll('#slide-container')];

const nextBtn = [...document.querySelectorAll("#slide-next")];
const prevBtn = [...document.querySelectorAll("#slide-prev")];

slideContainer.forEach((item, i) => {

    const updateButtons = () => {
        if(item.scrollLeft <= 0) {
            prevBtn[i].style.backgroundColor = '#9DA4B2';
            prevBtn[i].style.cursor = 'not-allowed';
        } else {
            prevBtn[i].style.backgroundColor = '#0349C7';
            prevBtn[i].style.cursor = 'pointer';
        }

        if(item.scrollLeft + item.clientWidth >= item.scrollWidth - 1) {
            nextBtn[i].style.backgroundColor = '#9DA4B2';
            nextBtn[i].style.cursor = 'not-allowed';
        } else {
            nextBtn[i].style.backgroundColor = '#0349C7';
            nextBtn[i].style.cursor = 'pointer';
        }
    };

    updateButtons();

    nextBtn[i].addEventListener('click', () => {
        if(window.innerWidth > 1000) {
            item.scrollLeft += 443;
        } else if(window.innerWidth < 1000) {
            item.scrollLeft += 380;
        } else if(window.innerWidth < 576) {
            item.scrollLeft += 335;
        }  
        setTimeout(updateButtons, 100);
    });

    prevBtn[i].addEventListener('click', () => {
        if(window.innerWidth > 1000) {
            item.scrollLeft -= 443;
        } else if(window.innerWidth < 1000) {
            item.scrollLeft -= 380;
        } else if(window.innerWidth < 576) {
            item.scrollLeft -= 335;
        }  
        setTimeout(updateButtons, 100);
    });

    item.addEventListener('scroll', updateButtons);
});

//Slideshow controls
const controls = document.querySelector('.slide-controls');

function updateControlsAria() {
  if (window.innerWidth <= 576) {
    controls.setAttribute('aria-hidden', 'true'); 
  } else {
    controls.setAttribute('aria-hidden', 'false'); 
  }
}

updateControlsAria();
window.addEventListener('resize', updateControlsAria);

//FAQs
const faqItems = document.querySelectorAll('.faq__item');

faqItems.forEach(item => {
    const button = item.querySelector('button');
    const answerId = button.getAttribute('aria-controls');

    button.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        faqItems.forEach(i => {
            if (i != item) {
                i.classList.remove('active');
                const btn = i.querySelector('button');
                btn.setAttribute('aria-expanded', 'false');
            }
        });

        item.classList.toggle('active');
        button.setAttribute('aria-expanded', !isActive);
    });
});

})();
