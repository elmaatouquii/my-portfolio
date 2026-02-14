
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});


window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 26, 46, 0.95)';
    } else {
        navbar.style.background = 'rgba(26, 26, 46, 0.8)';
    }
});


document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();


    const formData = new FormData(this);
    const data = Object.fromEntries(formData);


    if (!data.name || !data.email || !data.message) {
        alert('Veuillez remplir tous les champs.');
        return;
    }


    alert('Merci pour votre message! Je vous répondrai bientôt.');


    this.reset();
});

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.href && this.href !== '#') {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Chargement...';
            setTimeout(() => {
                this.innerHTML = this.textContent;
            }, 2000);
        }
    });
});


function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}


const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const originalText = heroSubtitle.textContent;
    typeWriter(heroSubtitle, originalText, 100);
}


window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});


function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

