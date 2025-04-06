document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const currentTheme = localStorage.getItem('theme');

    // Apply the saved theme on page load
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️'; // Sun icon for light mode switch
    } else {
        darkModeToggle.textContent = '🌙'; // Moon icon for dark mode switch
    }

    // Toggle dark mode on button click
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        let theme = 'light';
        if (document.body.classList.contains('dark-mode')) {
            theme = 'dark';
            darkModeToggle.textContent = '☀️';
        } else {
             darkModeToggle.textContent = '🌙';
        }
        // Save the user's preference in local storage
        localStorage.setItem('theme', theme);
    });

    // Add basic form validation feedback (optional)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            // Very basic check, real validation is more complex
            if (!form.checkValidity()) {
                 // Optionally add custom feedback here
                console.log("Form is not valid");
                // Prevent submission if using only frontend validation (usually handled by backend)
                 // e.preventDefault();
            } else {
                // If submitting via JS (e.g., AJAX), prevent default and handle here
                // For standard form submission to a backend, let it proceed.
                console.log("Form submitted (visually). Needs backend.");
                 e.preventDefault(); // TEMPORARY: Prevent actual submission for this example
            }
        });
    });

});
