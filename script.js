document.addEventListener("DOMContentLoaded", function() {
    // Carrossel das imagens do Hero
    const slides = document.querySelectorAll('.hero-carousel .slide');
    
    if (slides.length > 0) {
        let currentSlide = 0;
        const slideInterval = 4000; // Tempo de troca entre as fotos (4 segundos)

        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        setInterval(nextSlide, slideInterval);
    }

    // Liberação da música de fundo após o primeiro clique do usuário
    document.addEventListener('click', function() {
        const audio = document.getElementById('bg-music');
        if (audio && audio.paused) {
            audio.play().catch(error => console.log("Áudio aguardando interação."));
        }
    }, { once: true });
});