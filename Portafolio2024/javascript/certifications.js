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
    });
};
fetch(certifications)
    .then(response => response.text())
    .then(data => certifications_reader.readAsText(new Blob([data])));