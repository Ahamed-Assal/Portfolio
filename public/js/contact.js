/**
 * Contact Form JavaScript
 * Handles form submission and API communication
 */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const alertContainer = document.getElementById('alert-container');
    const submitBtn = document.getElementById('submit-btn');
    const spinner = document.getElementById('spinner');

    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    /**
     * Handle contact form submission
     * @param {Event} e - Form submit event
     */
    async function handleFormSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        // Validate form data
        if (!formData.name || !formData.email || !formData.message) {
            showAlert('Please fill in all required fields.', 'danger', alertContainer);
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showAlert('Please enter a valid email address.', 'danger', alertContainer);
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        spinner.classList.remove('d-none');
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending...';

        try {
            console.log('Submitting form with data:', formData);
            
            // Send data to backend API
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            console.log('Response status:', response.status);
            const data = await response.json();
            console.log('Response data:', data);

            if (response.ok && data.success) {
                // Success - show success message and reset form
                console.log('Success! Message sent:', data);
                showAlert(data.message || 'Your message has been sent successfully!', 'success', alertContainer);
                contactForm.reset();
                
                // Keep success message visible longer
                setTimeout(() => {
                    const successAlert = document.querySelector('#alert-container .alert-success');
                    if (successAlert) {
                        console.log('Success alert found:', successAlert);
                    }
                }, 100);
            } else {
                // Error - show error message
                console.log('Error response:', data);
                showAlert(data.error || 'Failed to send message. Please try again.', 'danger', alertContainer);
            }
        } catch (error) {
            // Network or other error
            console.error('Error submitting form:', error);
            showAlert('Network error. Please check your connection and try again.', 'danger', alertContainer);
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            spinner.classList.add('d-none');
            submitBtn.innerHTML = 'Send Message';
        }
    }
});

/**
 * Show alert message (using function from main.js if available, otherwise define locally)
 */
function showAlert(message, type = 'info', container) {
    if (typeof window.showAlert === 'function') {
        window.showAlert(message, type, container);
        return;
    }

    // Fallback implementation
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.setAttribute('role', 'alert');
    
    // Make success messages more prominent
    if (type === 'success') {
        alertDiv.style.cssText = `
            font-weight: 600;
            font-size: 1.1rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(40, 167, 69, 0.15);
            border-left: 4px solid #28a745;
        `;
    }
    
    alertDiv.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="bi ${type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} me-2"></i>
            <div>${message}</div>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    if (container) {
        container.innerHTML = '';
        container.appendChild(alertDiv);
    }
    
    // Auto-dismiss after longer time for success messages
    const dismissTime = type === 'success' ? 10000 : 5000; // 10 seconds for success, 5 for errors
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.classList.remove('show');
            setTimeout(() => {
                if (alertDiv.parentNode) {
                    alertDiv.remove();
                }
            }, 150);
        }
    }, dismissTime);
}
