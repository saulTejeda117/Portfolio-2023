const main_skills = 'json/main_skills.json';
const main_skills_reader = new FileReader();

main_skills_reader.onload = function (e) {
    const content = e.target.result;
    // Parsear el contenido como JSON
    const jsonData = JSON.parse(content);
    console.log('Datos JSON:', jsonData);

    // Recorrer el array de main_skills y crear divs con spans para cada una
    jsonData.forEach(main_skill => {
        // Crear un div contenedor para cada main_skill
        const main_skillDiv = document.createElement('div');
        main_skillDiv.id = 'main_skillDivDiv';

        const nameSpan = document.createElement('span');
        nameSpan.classList.add('orange');
        nameSpan.classList.add('code_text');
        nameSpan.classList.add('animated_code_text');
        nameSpan.innerText = `"${main_skill.name}"`;

        const comma = document.createElement('span');
        comma.classList.add('green');
        comma.classList.add('code_text');
        comma.classList.add('animated_code_text');
        comma.innerText = `,`;

        // Agregar los spans al div contenedor de la main_skill
        main_skillDiv.appendChild(nameSpan);
        main_skillDiv.appendChild(comma);

        // Agregar el div de la main_skill al documento
        document.getElementById('main_skills_list').appendChild(main_skillDiv);

        // Aplicar la animación a cada elemento dentro de main_skillDiv
        animateText([nameSpan, comma]);
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

fetch(main_skills)
    .then(response => response.text())
    .then(data => main_skills_reader.readAsText(new Blob([data])));
