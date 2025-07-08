const sections = ['about', 'experience', 'projects', 'skills', 'contact'];

function showSection(sectionId, pushState = true) {
    // Hide all sections
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = 'none';
        }
    });

    // Show the selected section
    const selected = document.getElementById(sectionId);
    if (selected) {
        selected.style.display = 'block';
        selected.scrollIntoView({ behavior: 'smooth' });
    }

    // Update URL and history state
    if (pushState) {
        history.pushState({ section: sectionId }, '', `#${sectionId}`);
    }
}

// Handle browser back/forward buttons
window.onpopstate = function(event) {
    if (event.state && event.state.section) {
        showSection(event.state.section, false);
    } else {
        // Default to hero section (hide all)
        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });
    }
};

// Initialize page based on URL hash
window.onload = function() {
    const hash = window.location.hash.substring(1);
    if (sections.includes(hash)) {
        showSection(hash, false);
    } else {
        // Hide all sections initially
        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });
    }
};

// Attach click handlers to nav links
document.querySelectorAll('.hero-nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        if (sections.includes(targetId)) {
            showSection(targetId);
        }
    });
});

// Contact form submission alert
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for reaching out! I will get back to you soon.');
    this.reset();
});
