$(document).ready(function () {
    const projects = 'json/projects.json';
    const projects_reader = new FileReader();

    function cut_names(projects_name) {
        if (projects_name.length >= 30) {
            projects_name = projects_name.substring(0, 30);
            projects_name += "...";
        } else {
            projects_name = projects_name;
        }
        return projects_name;
    }

    projects_reader.onload = function (e) {
        const content = e.target.result;
        console.log('Contenido del projects:', content);

        // Parsear el contenido como JSON
        const jsonData = JSON.parse(content);
        console.log('Datos JSON:', jsonData);

        // Recorrer el array de certificaciones y crear divs con spans para cada una
        jsonData.forEach(projects => {
            // Crear un div contenedor para cada certificación
            const projectsDiv = document.createElement('div');
            projectsDiv.classList.add('code_text');
            projectsDiv.classList.add('code_container');
            projectsDiv.id = 'projectsDiv';

            var shorter_projects = cut_names(projects.name);

            const nameSpan = document.createElement('span');
            nameSpan.classList.add('green');
            nameSpan.innerText = `"${shorter_projects}"`;

            const equal = document.createElement('span');
            equal.classList.add('white');
            equal.innerText = ` = { `;

            // Other container inside 
            const projectsInfoDiv = document.createElement('div');
            projectsInfoDiv.classList.add('second_identation');

            const text_language = document.createElement('span');
            text_language.classList.add('orange');
            text_language.innerText = `"Language"`;

            const dots = document.createElement('span');
            dots.classList.add('green');
            dots.innerText = ` : `;

            const languages = document.createElement('span');
            languages.classList.add('orange');
            languages.innerText = `[${projects.language}]`;


            const linkspan = document.createElement('span');
            linkspan.classList.add('nav_button');
            linkspan.classList.add('yellow');
            linkspan.innerHTML = `<a class= "orange" href="${projects.link}" target="_blank">[Link]</a>`;

            const comma = document.createElement('span');
            comma.classList.add('green');
            comma.innerText = `,`;

            const end = document.createElement('span');
            end.classList.add('white');
            end.innerText = `}`;


            // Other container inside 
            const projectsDescriptionDiv = document.createElement('div');
            projectsDescriptionDiv.classList.add('code_container');

            const description = document.createElement('span');
            description.classList.add('grey');
            description.innerText = `/* ${projects.description} */`;



            // Agregar los spans al div contenedor de la descripción
            projectsDescriptionDiv.appendChild(description);


            // Agregar los spans al div contenedor de la información del proyecto
            projectsInfoDiv.appendChild(text_language);
            projectsInfoDiv.appendChild(dots);
            projectsInfoDiv.appendChild(languages);
            projectsInfoDiv.appendChild(projectsDescriptionDiv);
            projectsInfoDiv.appendChild(linkspan);


            // Agregar los spans al div contenedor de la certificación

            projectsDiv.appendChild(nameSpan);
            projectsDiv.appendChild(equal);
            projectsDiv.appendChild(projectsInfoDiv);
            projectsDiv.appendChild(end);

            // Agregar el div de la certificación al documento
            document.getElementById('personal_projects_list').appendChild(projectsDiv);

            // Aplicar la animación a cada elemento dentro de projectsDiv
            animateText([nameSpan, text_language, languages, linkspan]);
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

    fetch(projects)
        .then(response => response.text())
        .then(data => projects_reader.readAsText(new Blob([data])));
});
