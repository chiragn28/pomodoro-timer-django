document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    loginTab.addEventListener('click', function() {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
    });

    registerTab.addEventListener('click', function() {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
    });

    // Form submissions
    const loginFormEl = document.getElementById('loginForm');
    const registerFormEl = document.getElementById('registerForm');

    if (loginFormEl) {
        loginFormEl.addEventListener('submit', function(e) {
            e.preventDefault();
            submitForm(this, '/login/');
        });
    }

    if (registerFormEl) {
        registerFormEl.addEventListener('submit', function(e) {
            e.preventDefault();
            submitForm(this, '/register/');
        });
    }

    function submitForm(form, url) {
        const formData = new FormData(form);
        const formObject = Object.fromEntries(formData.entries());
        
        console.log(`Submitting to ${url}:`, formObject);
        
        fetch(url, {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': form.querySelector('[name=csrfmiddlewaretoken]').value,
                'X-Requested-With': 'XMLHttpRequest'  // Add this header
            },
        })
        .then(response => {
            console.log('Raw response:', response);
            
            if (response.redirected) {
                console.log('Redirecting to:', response.url);
                window.location.href = response.url;
                return;
            }
            
            return response.json().then(data => {
                console.log('Parsed response:', data);
                
                if (data && data.errors) {
                    alert(data.errors.join('\n'));
                } else if (data && data.success) {
                    window.location.href = data.redirect;
                }
            }).catch(err => {
                console.error('Error parsing JSON:', err);
                return response.text().then(text => {
                    console.error('Response text:', text);
                });
            });
        })
        .catch(error => {
            console.error('Fetch error:', error);
            alert('An error occurred. Please check console for details.');
        });
    }
});