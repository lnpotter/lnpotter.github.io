document.addEventListener('DOMContentLoaded', () => {
    fetch('templates/resume.hbs')
        .then(response => response.text())
        .then(templateText => {
            const template = Handlebars.compile(templateText);

            fetch('data.json')
                .then(response => response.json())
                .then(data => {
                    const html = template(data);
                    document.getElementById('resume-container').innerHTML = html;
                });
        });
});