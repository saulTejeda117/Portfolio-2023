const most_used_languages = 'json/most_used_languages.json';
const most_used_languages_reader = new FileReader();

most_used_languages_reader.onload = function (e) {
    const content = e.target.result;
    // Parsear el contenido como JSON
    const jsonData = JSON.parse(content);
    console.log('Datos JSON:', jsonData);

    // Recorrer el array de main_skills y crear divs con spans para cada una
    jsonData.forEach(language => {
        // Crear un div contenedor para cada certificación
        const languageDiv = document.createElement('div');
        languageDiv.id = 'languageDivDivDiv';

        const nameSpan = document.createElement('span');
        nameSpan.classList.add('orange');
        nameSpan.classList.add('code_text');
        nameSpan.innerText = `"${language.name}" `;

        const dots = document.createElement('span');
        dots.classList.add('green');
        dots.classList.add('code_text');
        dots.innerText = ` : `;

        const knowledgespan = document.createElement('span');
        knowledgespan.classList.add('orange');
        knowledgespan.classList.add('code_text');
        knowledgespan.innerHTML = `"${language.knowledge}"`;

        const comma = document.createElement('span');
        comma.classList.add('green');
        comma.classList.add('code_text');
        comma.innerText = `,`;

        // Agregar los spans al div contenedor de la certificación
        languageDiv.appendChild(nameSpan);
        languageDiv.appendChild(dots);
        languageDiv.appendChild(knowledgespan);
        languageDiv.appendChild(comma);

        // Agregar el div de la certificación al documento
        document.getElementById('most_used_languages_list').appendChild(languageDiv);

        // Aplicar la animación a cada elemento dentro de main_skillDiv
        animateText([nameSpan, knowledgespan]);
    });
};

function animateText(elements) {
    var theLetters = "a@b]c[%d*e+f-g)h&ij!k#l$m^n(o=pq{r}stuvwxyz";
    var speed = 45;
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

fetch(most_used_languages)
    .then(response => response.text())
    .then(data => most_used_languages_reader.readAsText(new Blob([data])));
