document.addEventListener('DOMContentLoaded', () => {
    const words = ["Vidhi.", "an Engineering Student."];
    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    const typingSpeed = 150;
    const erasingSpeed = 100;
    const delayBetweenWords = 2000;
    const typingElement = document.querySelector('.typing-text');

    function type() {
        const currentWord = words[wordIdx];
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIdx - 1);
            charIdx--;
        } else {
            typingElement.textContent = currentWord.substring(0, charIdx + 1);
            charIdx++;
        }

        if (!isDeleting && charIdx === currentWord.length) {
            isDeleting = true;
            setTimeout(type, delayBetweenWords);
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            wordIdx = (wordIdx + 1) % words.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? erasingSpeed : typingSpeed);
        }
    }
    if (typingElement) type();

    const themeToggleBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    const progressElements = document.querySelectorAll('.progress');
    const skillSection = document.getElementById('skills');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progressElements.forEach(prog => {
                    prog.style.width = prog.getAttribute('data-level');
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    if (skillSection) skillObserver.observe(skillSection);

    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const targetFilter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (targetFilter === 'all' || card.getAttribute('data-category') === targetFilter) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isFormValid = true;

        const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            const formGroup = input.parentElement;
            if (input.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value.trim())) {
                    formGroup.classList.add('invalid');
                    isFormValid = false;
                } else {
                    formGroup.classList.remove('invalid');
                }
            } else {
                if (input.value.trim() === '') {
                    formGroup.classList.add('invalid');
                    isFormValid = false;
                } else {
                    formGroup.classList.remove('invalid');
                }
            }
        });

        if (isFormValid) {
            alert('Validation successful! Your placeholder message was sent.');
            contactForm.reset();
        }
    });

    let currentCount = parseInt(localStorage.getItem('visitor_count') || '0', 10);
    currentCount += 1;
    localStorage.setItem('visitor_count', currentCount);
    const counterDisplay = document.getElementById('counter');
    if (counterDisplay) counterDisplay.textContent = currentCount;
});
