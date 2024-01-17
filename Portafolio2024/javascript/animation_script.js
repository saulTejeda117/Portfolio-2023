$(document).ready(function () {
    var theLetters = "a@b]c[%d*e+f-g)h&i\\j!k#l$m^n(o=pq {r}s3t2u1v0w9xyz";
    var speed = 35;
    var increment = 2;
  
    $(".code_text").each(function () {
      var $element = $(this);  // Guardar referencia al elemento actual
      var spanText = $element.text();
      var clen = spanText.length;
      var si = 0;
      var stri = 0;
      var block = "";
      var fixed = "";
  
      (function rustle(i) {
        setTimeout(function () {
          if (--i) {
            rustle(i);
          }
          nextFrame(i);
          si = si + 1;
        }, speed);
      })(clen * increment + 1);
  
      function nextFrame(pos) {
        for (var i = 0; i < clen - stri; i++) {
          var num = Math.floor(theLetters.length * Math.random());
          var letter = theLetters.charAt(num);
          block = block + letter;
        }
        if (si == (increment - 1)) {
          stri++;
        }
        if (si == increment) {
          fixed = fixed + spanText.charAt(stri - 1);
          si = 0;
        }
        $element.html(fixed + block);  // Actualizar el contenido del elemento actual
        block = "";
      }
    });
  });
  