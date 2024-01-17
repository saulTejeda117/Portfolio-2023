const most_used_languages = 'json/most_used_languages.json';
const most_used_languages_reader = new FileReader();


most_used_languages_reader.onload = function (e) {
    const content = e.target.result;
    console.log('Contenido del most_used_languages:', content);

    // Parsear el contenido como JSON
    const jsonData = JSON.parse(content);
    console.log('Datos JSON:', jsonData);

    // Recorrer el array de certificaciones y crear divs con spans para cada una
    jsonData.forEach(language => {
        // Crear un div contenedor para cada certificación
        const languageDiv = document.createElement('div');

        const nameSpan = document.createElement('span');
        nameSpan.classList.add('orange');
        nameSpan.innerText = `"${language.name}"`;

        const dots = document.createElement('span');
        dots.classList.add('green');
        dots.innerText = ` : `;


        const companyspan = document.createElement('span');
        companyspan.classList.add('orange');
        companyspan.innerHTML = `"${language.knowledge}"`;

        const comma = document.createElement('span');
        comma.classList.add('green');
        comma.innerText = `,`;

        // Agregar los spans al div contenedor de la certificación
        languageDiv.appendChild(nameSpan);
        languageDiv.appendChild(dots);
        languageDiv.appendChild(companyspan);
        languageDiv.appendChild(comma);

        // Agregar el div de la certificación al documento
        document.getElementById('most_used_languages_list').appendChild(languageDiv);
    });
};
fetch(most_used_languages)
    .then(response => response.text())
    .then(data => most_used_languages_reader.readAsText(new Blob([data])));