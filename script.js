document.addEventListener("DOMContentLoaded", () => {
    initThemeEngine();
});
function initThemeEngine(){
    const toggleBtn = document.getElementById("theme-btn");
    const root = document.documentElement;

    const savedTheme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

    root.setAttribute('data-theme', savedTheme);

    if(toggleBtn){
        toggleBtn.addEventListener('click', () => {
            const currentTheme = root.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        })
    }

}