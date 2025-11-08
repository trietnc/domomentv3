
/* Theme toggle functionality */
const themeToggle = document.getElementById("theme-toggle");
const html = document.documentElement;

// Initialize theme from localStorage or default to light
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);
}

// Apply theme to the document
function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  const isOn = theme === 'dark';
  if (themeToggle) {
    themeToggle.setAttribute('aria-checked', isOn.toString());
  }
  localStorage.setItem('theme', theme);
}

// Toggle between light and dark themes
themeToggle && themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(newTheme);
});

initTheme();

// FAQ Accordion
document.querySelectorAll('.faq-item').forEach(item => {
    const button = item.querySelector('.faq-btn');
    const panel = item.querySelector('.faq-panel');
    
    if (!button || !panel) return; // Skip if elements don't exist
    
    button.setAttribute('aria-expanded', 'false');
    panel.style.height = '0px';
    
    button.addEventListener('click', () => togglePanel(button, panel));
});

function togglePanel(button, panel) {
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    
    if (isOpen) {
        // Close the panel
        button.setAttribute('aria-expanded', 'false');
        panel.style.height = panel.scrollHeight + 'px';
        panel.getBoundingClientRect(); // Force reflow
        panel.style.height = '0px';
        panel.classList.remove('open');
        panel.classList.add('closing');
    } else {
        // Open the panel
        button.setAttribute('aria-expanded', 'true');
        panel.classList.remove('closing');
        panel.classList.add('opening');
        panel.style.height = panel.scrollHeight + 'px';
    }
    
    // Handle transition end
    const onEnd = (e) => {
        if (e.propertyName !== 'height') return;
        panel.removeEventListener('transitionend', onEnd);
        
        if (!isOpen) {
            // Just opened
            panel.classList.remove('opening');
            panel.classList.add('open');
            panel.style.height = 'auto';
        } else {
            // Just closed
            panel.classList.remove('closing');
        }
    };
    
    panel.addEventListener('transitionend', onEnd);
}

