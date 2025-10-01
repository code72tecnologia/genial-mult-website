document.addEventListener('DOMContentLoaded', () => {
  const sr = ScrollReveal();

  const fadeUpConfig = {
    origin: 'bottom',
    distance: '2.5rem',
    duration: 800,
    easing: 'ease-in-out'
  }

  const fadeUpConfigDelay = {
    origin: 'bottom',
    distance: '2.5rem',
    duration: 800,
    easing: 'ease-in-out',
    delay: 200
  }

  const fadeDownConfig = {
    origin: 'top',
    distance: '2.5rem',
    duration: 800,
    easing: 'ease-in-out'
  }

  const fadeDownConfigDelay = {
    origin: 'top',
    distance: '2.5rem',
    duration: 800,
    easing: 'ease-in-out',
    delay: 200
  }

  const fadeLeftConfig = {
    origin: 'left',
    distance: '1rem',
    duration: 800,
    easing: 'ease-in-out'
  }

  const fadeRightConfig = {
    origin: 'right',
    distance: '1rem',
    duration: 800,
    easing: 'ease-in-out'
  }

  sr.reveal('.fade-up', fadeUpConfig);
  sr.reveal('.fade-up.delay', fadeUpConfigDelay);
  
  sr.reveal('.fade-down', fadeDownConfig);
  sr.reveal('.fade-down.delay', fadeDownConfigDelay);

  sr.reveal('.fade-left', fadeLeftConfig);
  
  sr.reveal('.fade-right', fadeRightConfig);
});