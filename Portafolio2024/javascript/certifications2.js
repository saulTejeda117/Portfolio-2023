$(document).ready(function () {
    const certifications = 'json/certifications.json';
    const certifications_reader = new FileReader();

    function cut_names(certification_name) {
        if (certification_name.length >= 10) {
            certification_name = certification_name.substring(0, 10);
            certification_name += "...";
        } else {
            certification_name = certification_name;
            certification_name += "...";
        }
        return certification_name;
    }

    function cut_company(certification_company) {
        if (certification_company.includes(" ")) {
            certification_company = certification_company.substring(0, certification_company.indexOf(" "));
        }
        certification_company = certification_company.substring(0, 10);
        return certification_company;
    }

    certifications_reader.onload = function (e) {
        const content = e.target.result;
        console.log('Contenido del certifications:', content);

        // Parsear el contenido como JSON
        const jsonData = JSON.parse(content);
        console.log('Datos JSON:', jsonData);

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

            linkspan.innerHTML = `<a class= "orange" href="${certificacion.link}" target="_blank">[${shorter_company}]</a>`;

            const comma = document.createElement('span');
            comma.classList.add('green');
            comma.innerText = `,`;

            // Agregar los spans al div contenedor de la certificación
            certificacionDiv.appendChild(linkspan);
            certificacionDiv.appendChild(dots);
            certificacionDiv.appendChild(nameSpan);
            certificacionDiv.appendChild(comma);

            // Agregar el div de la certificación al documento
            document.getElementById('certifications_list').appendChild(certificacionDiv);

            // Aplicar la animación a cada elemento dentro de certificacionDiv
            animateText([linkspan, dots, nameSpan, comma]);
        });
    };

    function animateText(elements) {
        var theLetters = "a@b]c[%d*e+f-g)h&ij!k#l$m^n(o=pq{r}stuvwxyz";
        var speed = 50;
        var increment = 2;

        elements.forEach(function (element) {
            var spanText = element.innerText;
            var clen = spanText.length;
            var si = 0;
            var stri = 0;
            var block = "";
            var fixed = "";

            // Crear un contenedor adicional para el texto animado
            var animationContainer = document.createElement('span');
            animationContainer.classList.add('animation-container');

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
                animationContainer.innerHTML = fixed + block;  // Actualizar el contenido del contenedor animado
                block = "";

                // Reemplazar el contenido del elemento original con el contenedor animado
                replaceElementContent(element, animationContainer);
            }
        });
    }

    function replaceElementContent(element, newContent) {
        // Reemplazar el contenido del elemento original con el nuevo contenido
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
        element.appendChild(newContent);
    }

    fetch(certifications)
        .then(response => response.text())
        .then(data => certifications_reader.readAsText(new Blob([data])));
});
