
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

// Initialize on page load
initTheme();

/* FAQ Accordion functionality */
// FAQ data - answers for each questionv
const faqData = {
  'question-1': 'Simply open domoment and tap the microphone icon or start typing. Your voice notes are instantly transcribed, organized, and turned into actionable tasks by AI. You can capture ideas anywhere, anytime — while driving, working out, or during a meeting.',
  'question-2': 'Absolutely. Your privacy is our top priority. All voice recordings are encrypted end-to-end, and we never sell or share your data. You can also enable local-only processing for maximum privacy. Your privacy matters to us sdodsdssdsdsdsdsd',
  'question-3': 'No problem! domoment works offline too. Record your voice notes without internet, and they\'ll sync automatically once you\'re back online. Your ideas are always captured, no matter where you are.',
  'question-4': 'domoment offers a free plan with core features to get you started. For power users, we offer premium plans with unlimited voice notes, advanced AI features, team collaboration, and priority support. Try it free — no credit card required.',
  'question-5': 'Unlike traditional notes apps, domoment is built for speed and action. Voice-first capture, AI-powered organization, and instant task creation mean you spend less time managing notes and more time executing. It\'s designed for people who think fast and move faster.'
};

// Initialize FAQ accordion
function initFAQs() {
  const questions = document.querySelectorAll('.question');
  
  questions.forEach((question) => {
    // Set initial aria-expanded state
    if (!question.hasAttribute('aria-expanded')) {
      question.setAttribute('aria-expanded', 'false');
    }
    
    // Wrap question in faq-item div if not already wrapped
    if (!question.parentElement.classList.contains('faq-item')) {
      const wrapper = document.createElement('div');
      wrapper.className = 'faq-item';
      question.parentNode.insertBefore(wrapper, question);
      wrapper.appendChild(question);
    }
    
    // Get the question's class to find its answer
    const classList = Array.from(question.classList);
    const questionClass = classList.find(cls => cls.startsWith('question-'));
    
    // Create answer div if it doesn't exist
    let answerDiv = question.nextElementSibling;
    if (!answerDiv || !answerDiv.classList.contains('faq-answer')) {
      answerDiv = document.createElement('div');
      answerDiv.className = 'faq-answer';
      answerDiv.innerHTML = `<p>${faqData[questionClass]}</p>`;
      question.parentNode.insertBefore(answerDiv, question.nextSibling);
    }
    
    // Add click event listener
    question.addEventListener('click', () => {
      toggleFAQ(question, answerDiv);
    });
  });
}

// Toggle FAQ answer visibility
function toggleFAQ(questionBtn, answerDiv) {
  const isOpen = questionBtn.getAttribute('aria-expanded') === 'true';
  const arrow = questionBtn.querySelector('.arrow-icon');
  
  if (isOpen) {
    // Close the answer
    questionBtn.setAttribute('aria-expanded', 'false');
    answerDiv.style.maxHeight = null;
    answerDiv.classList.remove('active');
    if (arrow) {
      arrow.style.transform = 'rotate(0deg)';
    }
  } else {
    // Open the answer
    questionBtn.setAttribute('aria-expanded', 'true');
    answerDiv.style.maxHeight = answerDiv.scrollHeight + 'px';
    answerDiv.classList.add('active');
    if (arrow) {
      arrow.style.transform = 'rotate(180deg)';
    }
  }
}

// Initialize FAQs when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFAQs);
} else {
  initFAQs();
}