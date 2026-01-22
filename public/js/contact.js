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
            
            // For GitHub Pages, use Formspree instead of local API
            const formspreeEndpoint = 'https://formspree.io/f/xlggyegw';
            
            // Send data to Formspree
            const response = await fetch(formspreeEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            console.log('Response status:', response.status);
            
            if (response.ok) {
                // Success - show success message and reset form
                console.log('Success! Message sent via Formspree');
                showAlert('Your message has been sent successfully! I\'ll get back to you soon.', 'success', alertContainer);
                contactForm.reset();
            } else {
                // Try local API as fallback (for development)
                try {
                    const localResponse = await fetch('/api/contact', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData)
                    });

                    const localData = await localResponse.json();
                    console.log('Local API response:', localData);

                    if (localResponse.ok && localData.success) {
                        showAlert(localData.message || 'Your message has been sent successfully!', 'success', alertContainer);
                        contactForm.reset();
                    } else {
                        showAlert(localData.error || 'Failed to send message. Please try again.', 'danger', alertContainer);
                    }
                } catch (localError) {
                    console.error('Local API also failed:', localError);
                    showAlert('Please set up Formspree or run the local server to send messages.', 'danger', alertContainer);
                }
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
    // Always use the local showAlert function, not the one from main.js
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
