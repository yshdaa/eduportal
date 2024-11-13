document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        if (username === '' || password === '') {
            alert('Please fill in all fields.');
            return;
        }

        // Simulate user validation for demonstration
        if (username === 't' && password === 'p') {
            localStorage.setItem('role', 'teacher');
            window.location.href = 'dashboard.html';
        } else if (username === 's' && password === 'p') {
            localStorage.setItem('role', 'student');
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid username or password.');
        }
    });
});
