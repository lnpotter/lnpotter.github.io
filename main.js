document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }

    fetch('templates/resume.hbs')
        .then(response => response.text())
        .then(templateText => {
            const template = Handlebars.compile(templateText);

            fetch('data.json')
                .then(response => response.json())
                .then(data => {
                    const html = template(data);
                    document.getElementById('resume-container').innerHTML = html;

                    const sections = document.querySelectorAll('.section');
                    sections.forEach(section => {
                        section.addEventListener('click', () => {
                            section.classList.toggle('expanded');
                            const content = section.querySelectorAll('p, ul');
                            content.forEach(item => {
                                item.style.display = section.classList.contains('expanded') ? 'block' : 'none';
                            });
                        });
                    });

                    const themeToggle = document.getElementById('theme-toggle');
                    themeToggle.addEventListener('click', () => {
                        document.body.classList.toggle('dark-mode');
                        const isDarkMode = document.body.classList.contains('dark-mode');
                        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
                    });
                });
        });
});