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
            const formData = new FormData(this);
            formData.append('action', 'login');
            submitForm(this, formData);
        });
    }

    if (registerFormEl) {
        registerFormEl.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            formData.append('action', 'register');
            submitForm(this, formData);
        });
    }

    function submitForm(form, formData) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        
        fetch('/auth/', {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': form.querySelector('[name=csrfmiddlewaretoken]').value,
                'X-Requested-With': 'XMLHttpRequest'
            },
        })
        .then(response => {
            if (response.redirected) {
                window.location.href = response.url;
                return;
            }
            return response.json().then(data => {
                if (!response.ok) {
                    throw data;
                }
                return data;
            });
        })
        .then(data => {
            if (data && data.redirect) {
                window.location.href = data.redirect;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            
            if (error.errors) {
                const errorContainer = document.createElement('div');
                errorContainer.className = 'error-messages';
                errorContainer.innerHTML = `
                    <p><strong>Please fix the following errors:</strong></p>
                    <ul>
                        ${error.errors.map(err => `<li>${err}</li>`).join('')}
                    </ul>
                `;
                
                const existingErrors = form.querySelector('.error-messages');
                if (existingErrors) {
                    existingErrors.remove();
                }
                
                form.insertBefore(errorContainer, submitBtn);
                errorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                alert('An unexpected error occurred. Please try again.');
            }
        });
    }
});

// Add this logout functionality to your script.js or auth.js
document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            fetch('/logout/', {
                method: 'POST',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken'),
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            .then(response => {
                if (response.redirected) {
                    window.location.href = '/auth/';
                    return;
                }
                return response.json();
            })
            .then(data => {
                if (data && data.redirect) {
                    window.location.href = data.redirect;
                } else {
                    window.location.href = '/auth/';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                window.location.href = '/auth/';
            });
        });
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});