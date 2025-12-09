
document.addEventListener('DOMContentLoaded', function () {
    console.log("Script de NutriDog cargado correctamente.");


    initMenuInteractivity();


    initScrollAnimations();


    initReviewsCarousel();

    initButtonInteractions();
});


function initMenuInteractivity() {
    console.log("Inicializando interactividad del menú...");

    const submenuTriggers = document.querySelectorAll('.nav-item.has-submenu');

    submenuTriggers.forEach(item => {
        const submenu = item.querySelector('.submenu');
        let timeoutId;

        item.addEventListener('mouseenter', function () {
            clearTimeout(timeoutId);
            submenu.classList.add('show');
            submenu.classList.remove('hide');
        });


        item.addEventListener('mouseleave', function () {

            timeoutId = setTimeout(() => {
                submenu.classList.add('hide');
                setTimeout(() => {
                    if (submenu.classList.contains('hide')) {
                        submenu.classList.remove('show');
                    }
                }, 250);
            }, 150);
        });


        submenu.addEventListener('mouseenter', function () {
            clearTimeout(timeoutId);
        });
    });
}


function initScrollAnimations() {
    console.log("Inicializando animaciones de scroll generalizadas...");

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }

        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll(
        'section, article, .hero-section, .productos-seccion, .popular-menu, .services, .ingrediente-item, #ingredientes-banner'
    );

    elementsToAnimate.forEach(element => {

        if (!element.classList.contains('visible')) {
            observer.observe(element);
        }
    });
}


function initReviewsCarousel() {
    console.log("Inicializando carrusel de opiniones...");
    const carousel = document.querySelector('.reviews-carousel');
    if (!carousel) {
        console.warn("Carrusel de opiniones no encontrado (posiblemente no estás en index.html).");
        return;
    }

    const reviews = carousel.querySelectorAll('.review');
    if (reviews.length <= 1) {
        console.warn("No hay suficientes opiniones para crear un carrusel.");
        return;
    }

    let currentIndex = 0;
    const intervalTime = 5000;


    function showReview(index) {
        reviews.forEach((review, i) => {
            if (i === index) {
                review.classList.add('activo');

                review.style.opacity = '1';
                review.style.display = 'block';
            } else {
                review.classList.remove('activo');
                review.style.display = 'none';
            }
        });
    }


    function nextReview() {
        currentIndex = (currentIndex + 1) % reviews.length;
        showReview(currentIndex);
    }


    let carouselInterval = setInterval(nextReview, intervalTime);


    carousel.addEventListener('mouseenter', () => {
        clearInterval(carouselInterval);
    });

    carousel.addEventListener('mouseleave', () => {
        carouselInterval = setInterval(nextReview, intervalTime);
    });


    showReview(currentIndex);
}



function initButtonInteractions() {
    console.log("Inicializando interacciones de botones...");


    const allButtons = document.querySelectorAll('button, .boton, .boton-nose, .boton-membresia, .boton-enviar');

    allButtons.forEach(button => {

        button.addEventListener('mousedown', function () {
            this.classList.add('pressed');
        });


        button.addEventListener('mouseup', function () {
            this.classList.remove('pressed');
        });

        button.addEventListener('mouseleave', function () {
            this.classList.remove('pressed');
        });
    });
}