document.getElementById('update-button').addEventListener('click', function() {
    const heading = document.getElementById('new-posts-heading');
    heading.textContent = `New Posts (${Math.floor(Math.random() * 100) + 1})`;
});
