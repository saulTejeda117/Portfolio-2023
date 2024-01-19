(function() {
  var SELECTOR_SCREEN_ELEMENT = '.screen';
  var timeline;

  function buildTimeline() {
    timeline = new TimelineMax({
      paused: true,
      onComplete: function() {
        // La animación ha finalizado
        // Puedes agregar aquí cualquier código adicional que desees ejecutar al finalizar la animación
      }
    });

    timeline
      .to(SELECTOR_SCREEN_ELEMENT, .2, {
        width: '100vw',
        height: '2px',
        background: '#ffffff',
        ease: Power2.easeOut
      })
      .to(SELECTOR_SCREEN_ELEMENT, .2, {
        width: '0',
        height: '0',
        background: '#ffffff'
      });
  }

  function playScreenAnimation() {
    timeline.restart();
  }

  // Initialize
  $(document).ready(function() {
    buildTimeline();
    playScreenAnimation(); // Inicia la animación automáticamente al cargar la página
  });
})();
