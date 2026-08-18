document.addEventListener("DOMContentLoaded", function() {
    // Lógica do Carrossel Automático de Fotos do Topo
    const slides = document.querySelectorAll('.hero-carousel .slide');
    
    if (slides.length > 0) {
        let currentSlide = 0;
        const slideInterval = 4000; // Tempo em milissegundos (4 segundos por foto)

        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        setInterval(nextSlide, slideInterval);
    }
});