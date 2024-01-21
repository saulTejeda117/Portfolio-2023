$(document).ready(function () {
    const projects = 'json/projects.json';
    const projects_reader = new FileReader();

    function cut_names(projects_name) {
        if (projects_name.length >= 10) {
            projects_name = projects_name.substring(0, 10);
            projects_name += "...";
        } else {
            projects_name = projects_name;
        }
        return projects_name;
    }

    function cut_description(projectsDescriptionDiv, description) {
        const words = description.split(' ');
        console.log('Contenido del projects:', words);

        for (let i = 0; i < words.length; i += 3) {
            const group = words.slice(i, i + 3);
            const description = document.createElement('span');
            
            description.classList.add('grey');
            description.classList.add('comment');
            description.innerHTML = `# ${group.join(' ')}`;
            projectsDescriptionDiv.appendChild(description);
            animateText([description]);
        }
    }

    projects_reader.onload = function (e) {
        const content = e.target.result;
        

        // Parsear el contenido como JSON
        const jsonData = JSON.parse(content);
        // Recorrer el array de certificaciones y crear divs con spans para cada una
        jsonData.forEach(projects => {
            // Crear un div contenedor para cada certificación
            const projectsDiv = document.createElement('div');
            projectsDiv.classList.add('code_text');
            projectsDiv.classList.add('code_container');
            projectsDiv.id = 'projectsDiv';

            var shorter_projects = cut_names(projects.name);

            const defSpan = document.createElement('span');
            defSpan.classList.add('blue');
            defSpan.innerText = `def `;

            const nameSpan = document.createElement('span');
            nameSpan.classList.add('green');
            nameSpan.innerText = `${shorter_projects}`;

            const equal = document.createElement('span');
            equal.classList.add('white');
            equal.innerText = `():`;

            // Other container inside 
            const projectsInfoDiv = document.createElement('div');
            projectsInfoDiv.classList.add('second_identation');
            projectsInfoDiv.classList.add('code_container');

            const print_language = document.createElement('span');
            print_language.classList.add('green');
            print_language.innerText = `language`;

            const dots = document.createElement('span');
            dots.classList.add('white');
            dots.innerText = ` = `;

            const languages = document.createElement('span');
            languages.classList.add('orange');
            languages.innerText = `[${projects.language}]`;

            const retunspan = document.createElement('span');
            retunspan.classList.add('purple');
            retunspan.innerText = `return`;

            const linkspan = document.createElement('span');
            linkspan.classList.add('nav_button');
            linkspan.classList.add('yellow');
            linkspan.innerHTML = `<a class= "orange" href="${projects.link}" target="_blank">[Link]</a>`;

            const comma = document.createElement('span');
            comma.classList.add('green');
            comma.innerText = `,`;

            // Other container inside 
            const projectsDescriptionDiv = document.createElement('div');
            projectsDescriptionDiv.classList.add('comment_container');
            projectsDescriptionDiv.classList.add('code_container');

            cut_description(projectsDescriptionDiv, projects.description);


            // Agregar los spans al div contenedor de la información del proyecto
            projectsInfoDiv.appendChild(print_language);
            projectsInfoDiv.appendChild(dots);
            projectsInfoDiv.appendChild(languages);
            projectsInfoDiv.appendChild(projectsDescriptionDiv);
            projectsInfoDiv.appendChild(retunspan);
            projectsInfoDiv.appendChild(linkspan);

            // Agregar los spans al div contenedor de la certificación
            projectsDiv.appendChild(defSpan);
            projectsDiv.appendChild(nameSpan);
            projectsDiv.appendChild(equal);
            projectsDiv.appendChild(projectsInfoDiv);
            

            // Agregar el div de la certificación al documento
            document.getElementById('personal_projects_list').appendChild(projectsDiv);

            // Aplicar la animación a cada elemento dentro de projectsDiv
            animateText([nameSpan, print_language, languages, linkspan, equal, dots, defSpan, retunspan]);
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
        element.innerHTML = newContent.innerHTML;
    }

    fetch(projects)
        .then(response => response.text())
        .then(data => projects_reader.readAsText(new Blob([data])));
});
