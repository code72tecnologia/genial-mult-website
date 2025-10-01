(function() {
// Header active in scroll
const headerContainer = document.getElementById('header-container');

window.addEventListener('scroll', () => {
    headerContainer.classList.toggle('active', window.scrollY > 0)
});

// Menu mobile
const headerContent = document.getElementById('header-content');
const menuMobile = document.getElementById('btn-mobile');
const headerNav = document.getElementById('header-nav');

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
    /*let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;*/

    nextBtn[i].addEventListener('click', () => {
        if(window.innerWidth > 1000) {
            item.scrollLeft += 443;
        } else if(window.innerWidth < 1000) {
            item.scrollLeft += 380;
        } else if(window.innerWidth < 576) {
            item.scrollLeft += 335;
        }  
    });

    prevBtn[i].addEventListener('click', () => {
        if(window.innerWidth > 1000) {
            item.scrollLeft -= 443;
        } else if(window.innerWidth < 1000) {
            item.scrollLeft -= 380;
        } else if(window.innerWidth < 576) {
            item.scrollLeft -= 335;
        }  
    });
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
