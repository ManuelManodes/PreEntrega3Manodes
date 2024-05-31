document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;
    const topbar = document.querySelector('.topbar');
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');
    const menuToggle = document.getElementById('menu-toggle');

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        topbar.classList.toggle('dark-mode');
        sidebar.classList.toggle('dark-mode');
        content.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    });

    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        topbar.classList.toggle('collapsed');
        content.classList.toggle('collapsed');
    });
});
