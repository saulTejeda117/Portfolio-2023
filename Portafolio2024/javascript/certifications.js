// script.js

const certifications = 'json/certifications.json';
const certifications_reader = new FileReader();

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

        const nameSpan = document.createElement('span');
        nameSpan.classList.add('orange');
        nameSpan.innerText = `"${certificacion.name}"`;

        const dots = document.createElement('span');
        dots.classList.add('green');
        dots.innerText = ` : `;


        const companyspan = document.createElement('span');
        companyspan.classList.add('orange');
        companyspan.innerHTML = `<a class= "orange" href="${certificacion.link}" target="_blank">"${certificacion.company}"</a>`;

        const comma = document.createElement('span');
        comma.classList.add('green');
        comma.innerText = `,`;

        // Agregar los spans al div contenedor de la certificación
        certificacionDiv.appendChild(nameSpan);
        certificacionDiv.appendChild(dots);
        certificacionDiv.appendChild(companyspan);
        certificacionDiv.appendChild(comma);

        // Agregar el div de la certificación al documento
        document.getElementById('certifications_list').appendChild(certificacionDiv);
    });
};
fetch(certifications)
    .then(response => response.text())
    .then(data => certifications_reader.readAsText(new Blob([data])));