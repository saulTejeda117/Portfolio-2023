(function() {
  const SELECTOR_SCREEN_ELEMENT = '.screen';
  let timeline;

  function buildTimeline() {
    timeline = new TimelineMax({
      paused: true
    });

    timeline
      .to(SELECTOR_SCREEN_ELEMENT, 0.2, {
        width: '100vw',
        height: '2px',
        background: '#ffffff',
        ease: Power2.easeOut
      })
      .to(SELECTOR_SCREEN_ELEMENT, 0.2, {
        width: '0',
        height: '0',
        background: '#ffffff'
      });
  }

  // Initialize
  $(document).ready(function() {
    buildTimeline();
    timeline.restart(); // Inicia la animación automáticamente al cargar la página
  });
})();
