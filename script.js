// Initialize Collection Swiper
const collectionSwiper = new Swiper('.collection-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
        delay: 3500,
        disableOnInteraction: false,
    },
    speed: 600,
    effect: 'slide',
    grabCursor: true,
    pagination: {
        el: '.collection-swiper .swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
    navigation: {
        nextEl: '.collection-swiper .swiper-button-next',
        prevEl: '.collection-swiper .swiper-button-prev',
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 15,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        1280: {
            slidesPerView: 4,
            spaceBetween: 20,
        },
    },
    on: {
        init: function () {
            this.slides.forEach((slide) => {
                slide.style.transition = 'transform 0.3s ease';
            });
        },
        slideChange: function () {
            this.slides.forEach((slide) => {
                slide.style.transform = 'scale(1)';
            });
            this.slides[this.activeIndex].style.transform = 'scale(1.03)';
        },
    },
});

// Initialize Best Sellers Swiper
const bestSellersSwiper = new Swiper('.best-sellers-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
        delay: 3500,
        disableOnInteraction: false,
    },
    speed: 600,
    effect: 'slide',
    grabCursor: true,
    pagination: {
        el: '.best-sellers-swiper .swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
    navigation: {
        nextEl: '.best-sellers-swiper .swiper-button-next',
        prevEl: '.best-sellers-swiper .swiper-button-prev',
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 15,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        1280: {
            slidesPerView: 4,
            spaceBetween: 20,
        },
    },
    on: {
        init: function () {
            this.slides.forEach((slide) => {
                slide.style.transition = 'transform 0.3s ease';
            });
        },
        slideChange: function () {
            this.slides.forEach((slide) => {
                slide.style.transform = 'scale(1)';
            });
            this.slides[this.activeIndex].style.transform = 'scale(1.03)';
        },
    },
});

// Animation du header au scroll
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Animation des éléments au scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.watch-card, .feature-card, .option');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Chatbot functionality
const chatbotButton = document.getElementById('chatbotButton');
const chatbotWindow = document.getElementById('chatbotWindow');
const closeChatbot = document.getElementById('closeChatbot');
const userInput = document.getElementById('userInput');
const sendMessage = document.getElementById('sendMessage');
const chatbotMessages = document.getElementById('chatbotMessages');

let isChatbotOpen = false;

// Ouvrir/Fermer le chatbot
chatbotButton.addEventListener('click', () => {
    isChatbotOpen = !isChatbotOpen;
    chatbotWindow.classList.toggle('active');
    chatbotButton.classList.toggle('active');
    
    if (isChatbotOpen) {
        chatbotButton.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        chatbotButton.innerHTML = '<i class="fas fa-comments"></i>';
    }
});

closeChatbot.addEventListener('click', () => {
    isChatbotOpen = false;
    chatbotWindow.classList.remove('active');
    chatbotButton.classList.remove('active');
    chatbotButton.innerHTML = '<i class="fas fa-comments"></i>';
});

// Envoyer un message
const sendUserMessage = () => {
    const message = userInput.value.trim();
    if (message) {
        addMessage(message, 'user');
        userInput.value = '';
        setTimeout(() => {
            generateBotResponse(message);
        }, 500);
    }
};

sendMessage.addEventListener('click', sendUserMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendUserMessage();
    }
});

// Ajouter un message au chat
const addMessage = (text, sender) => {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = text;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
};

// Générer une réponse du bot
const generateBotResponse = (userMessage) => {
    const responses = {
        'bonjour': 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?',
        'prix': 'Nos montres sont disponibles à partir de 399€. Voulez-vous voir notre collection ?',
        'livraison': 'Nous proposons une livraison express en 24h pour toute commande en France.',
        'garantie': 'Toutes nos montres sont garanties 2 ans.',
        'personnalisation': 'Vous pouvez personnaliser votre montre en choisissant le cadran, le bracelet et en ajoutant une gravure.',
        'contact': 'Vous pouvez nous contacter par email à contact@seiko.com ou par téléphone au +33 1 23 45 67 89.',
    };

    const defaultResponse = 'Je suis désolé, je ne comprends pas votre question. Pouvez-vous la reformuler ?';

    const message = userMessage.toLowerCase();
    let response = defaultResponse;

    for (const [key, value] of Object.entries(responses)) {
        if (message.includes(key)) {
            response = value;
            break;
        }
    }

    setTimeout(() => {
        addMessage(response, 'bot');
    }, 1000);
};

// Quick View functionality
const quickViewButtons = document.querySelectorAll('.quick-view');
quickViewButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const watchCard = button.closest('.watch-card');
        const watchName = watchCard.querySelector('h3').textContent;
        const watchPrice = watchCard.querySelector('.price').textContent;
        const watchImage = watchCard.querySelector('img').src;
        
        // Créer une modal pour l'aperçu rapide
        const modal = document.createElement('div');
        modal.classList.add('quick-view-modal');
        modal.innerHTML = `
            <div class="modal-content">
                <button class="close-modal"><i class="fas fa-times"></i></button>
                <div class="modal-body">
                    <div class="modal-image">
                        <img src="${watchImage}" alt="${watchName}">
                    </div>
                    <div class="modal-info">
                        <h3>${watchName}</h3>
                        <p class="modal-price">${watchPrice}</p>
                        <div class="modal-features">
                            <div class="feature">
                                <i class="fas fa-check"></i>
                                <span>Mouvement Seiko NH35</span>
                            </div>
                            <div class="feature">
                                <i class="fas fa-check"></i>
                                <span>Verre saphir</span>
                            </div>
                            <div class="feature">
                                <i class="fas fa-check"></i>
                                <span>Bracelet acier</span>
                            </div>
                        </div>
                        <button class="btn primary">Ajouter au panier</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('active'), 10);
        
        // Fermer la modal
        const closeModal = modal.querySelector('.close-modal');
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        });
    });
});

// Newsletter form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        if (email) {
            // Simuler l'envoi de l'email
            const button = newsletterForm.querySelector('button');
            const originalText = button.textContent;
            button.textContent = 'Inscription réussie !';
            button.style.background = '#4CAF50';
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
                newsletterForm.reset();
            }, 2000);
        }
    });
}

// Smooth scroll pour les liens d'ancrage
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

// Menu mobile
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav ul');
const overlay = document.querySelector('.overlay');

function toggleMenu() {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

menuToggle.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

// Fermer le menu quand on clique sur un lien
document.querySelectorAll('nav ul a').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Fermer le menu quand on redimensionne la fenêtre
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        toggleMenu();
    }
}); 