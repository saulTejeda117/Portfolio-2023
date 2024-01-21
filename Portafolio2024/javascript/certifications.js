$(document).ready(function () {
    const certifications = 'json/certifications.json';
    const certifications_reader = new FileReader();

    function cut_names(certification_name){
        if(certification_name.length >= 15){
            certification_name = certification_name.substring(0, 15);
            certification_name += "...";
        }
        else{
            certification_name = certification_name;
            certification_name += "...";
        }
    
        return certification_name;
    }
    
    function cut_company(certification_company){
        if (certification_company.includes(" ")) {
            certification_company = certification_company.substring(0, certification_company.indexOf(" "));
        }
        certification_company = certification_company.substring(0, 10);
        return certification_company;
    }

    certifications_reader.onload = function(e) {

        const content = e.target.result;
      
        // Parsear el contenido como JSON
        const jsonData = JSON.parse(content);
      
        // Recorrer el array de certificaciones y crear divs con spans para cada una
        jsonData.forEach(certificacion => {
      
          // Crear un div contenedor para cada certificación
          const certificacionDiv = document.createElement('div');
          certificacionDiv.classList.add('code_text');
          certificacionDiv.id = 'certificacionDiv';
          
          var shorter_certification = cut_names(certificacion.name);
          var shorter_company = cut_company(certificacion.company);
          
          const nameSpan = document.createElement('span');
          nameSpan.classList.add('orange');
          nameSpan.innerText = `"${shorter_certification}"`;
          
          const dots = document.createElement('span');
          dots.classList.add('green');
          dots.innerText = ` : `;
          
          const linkspan = document.createElement('span');
          linkspan.classList.add('nav_button'); 
          linkspan.classList.add('orange');
          const originalHtml = linkspan.innerHTML = `<a class="orange" href="${certificacion.link}" target="_blank">[${shorter_company}]</a>`;
          
          const comma = document.createElement('span');
          comma.classList.add('green');
          comma.innerText = `,`;
      
          // Agregar los spans al div contenedor de la certificación
          certificacionDiv.appendChild(linkspan);
          certificacionDiv.appendChild(dots);
          certificacionDiv.appendChild(nameSpan);
          certificacionDiv.appendChild(comma);
      
          animateText([linkspan, dots, nameSpan, comma]);
          
          linkspan.innerHTML = originalHtml;
          
          document.getElementById('certifications_list').appendChild(certificacionDiv);
      
        });
      
      };
    function animateText(elements) {

        elements.forEach(element => {
      
          const originalHtml = element.innerHTML;
          
          var theLetters = "abcdefghijklmnopqrstuvwxyz";
          var speed = 50;
          var increment = 2;
          
          var spanText = element.innerText;
          var clen = spanText.length;
          var si = 0; 
          var stri = 0;
          var block = "";
          var fixed = "";
          
          (function rustle(i) {
          
            setTimeout(function() {
            
              if (--i) {
                rustle(i); 
              }
              
              nextFrame(i);
              
              si = si + 1;
              
            }, speed);
          
          })(clen * increment + 1);
      
          function nextFrame(pos) {
      
            for(var i = 0; i < clen - stri; i++) {
      
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
      
            // Actualizar el contenido sin perder los links
            element.innerText = fixed + block; 
            block = "";
      
          }
      
          element.innerHTML = originalHtml;
      
        });
      
      }

    // function animateText(elements) {
    //     var theLetters = "a@b]c[%d*e+f-g)h&ij!k#l$m^n(o=pq{r}stuvwxyz";
    //     var speed = 50;
    //     var increment = 2;

    //     elements.forEach(function (element) {
    //         var spanText = element.innerText;
    //         var clen = spanText.length;
    //         var si = 0;
    //         var stri = 0;
    //         var block = "";
    //         var fixed = "";

    //         // Crear un contenedor adicional para el texto animado
    //         var animationContainer = document.createElement('span');
    //         animationContainer.classList.add('animation-container');

    //         (function rustle(i) {
    //             setTimeout(function () {
    //                 if (--i) {
    //                     rustle(i);
    //                 }
    //                 nextFrame(i);
    //                 si = si + 1;
    //             }, speed);
    //         })(clen * increment + 1);

    //         function nextFrame(pos) {
    //             for (var i = 0; i < clen - stri; i++) {
    //                 var num = Math.floor(theLetters.length * Math.random());
    //                 var letter = theLetters.charAt(num);
    //                 block = block + letter;
    //             }
    //             if (si == (increment - 1)) {
    //                 stri++;
    //             }
    //             if (si == increment) {
    //                 fixed = fixed + spanText.charAt(stri - 1);
    //                 si = 0;
    //             }
    //             animationContainer.innerHTML = fixed + block;  // Actualizar el contenido del contenedor animado
    //             block = "";

    //             // Reemplazar el contenido del elemento original con el contenedor animado
    //             replaceElementContent(element, animationContainer);
    //         }
    //     });
    // }


    
    

    fetch(certifications)
        .then(response => response.text())
        .then(data => certifications_reader.readAsText(new Blob([data])));
});
