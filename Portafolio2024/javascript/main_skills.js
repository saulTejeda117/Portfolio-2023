const main_skills = 'json/main_skills.json';
const main_skills_reader = new FileReader();

main_skills_reader.onload = function (e) {
    const content = e.target.result;
    // Parsear el contenido como JSON
    const jsonData = JSON.parse(content);
    console.log('Datos JSON:', jsonData);

    // Recorrer el array de main_skilles y crear divs con spans para cada una
    jsonData.forEach(main_skill => {
        // Crear un div contenedor para cada certificación
        const main_skillDiv = document.createElement('div');

        const nameSpan = document.createElement('span');
        nameSpan.classList.add('orange');
        nameSpan.innerText = `"${main_skill.name}"`;

        const comma = document.createElement('span');
        comma.classList.add('green');
        comma.innerText = `,`;

        // Agregar los spans al div contenedor de la certificación
        main_skillDiv.appendChild(nameSpan);
        main_skillDiv.appendChild(comma);

        // Agregar el div de la certificación al documento
        document.getElementById('main_skills_list').appendChild(main_skillDiv);
    });
};
fetch(main_skills)
    .then(response => response.text())
    .then(data => main_skills_reader.readAsText(new Blob([data])));