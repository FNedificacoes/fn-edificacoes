document.addEventListener("DOMContentLoaded", function() {
    const introVideoWrapper = document.getElementById('intro-video-container');
    const video = document.getElementById('commercial-video');
    const skipBtn = document.getElementById('skip-intro-btn');
    const audio = document.getElementById('bg-music');
    
    const slides = document.querySelectorAll('.hero-carousel .slide');
    let currentSlide = 0;
    let carouselInterval = null;
    let isVideoPlaying = true;

    // Configura o volume da música de fundo para 50%
    if (audio) {
        audio.volume = 0.5;
    }

    // Função para iniciar o carrossel de fotos e a música de fundo
    function startCarouselAndMusic() {
        if (!isVideoPlaying) return;
        isVideoPlaying = false;

        // Esconde o vídeo comercial
        if (introVideoWrapper) {
            introVideoWrapper.classList.remove('active');
        }
        if (video) {
            video.pause();
        }

        // Toca a música de fundo em 50%
        if (audio) {
            audio.play().catch(error => {
                console.log("Áudio aguardando interação do usuário.");
            });
        }

        // Inicia a troca de fotos do carrossel
        if (slides.length > 0 && !carouselInterval) {
            carouselInterval = setInterval(() => {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add('active');
            }, 4000); // Troca de foto a cada 4 segundos
        }
    }

    // Tenta iniciar o vídeo comercial com áudio ao carregar
    if (video) {
        video.muted = false; // Garante com som
        video.play().catch(error => {
            console.log("O navegador bloqueou o autoplay com som do vídeo. Aguardando clique.");
        });

        // Quando o vídeo comercial de 28 segundos terminar sozinho
        video.addEventListener('ended', function() {
            startCarouselAndMusic();
        });
    }

    // Botão "Pular Vídeo": encerra o vídeo antes dos 28s e vai direto para as fotos/música
    if (skipBtn) {
        skipBtn.addEventListener('click', function() {
            startCarouselAndMusic();
        });
    }

    // Fallback de segurança: Se o navegador bloquear o vídeo com som no início,
    // o primeiro clique na tela ativa o vídeo com som e destrava tudo perfeitamente.
    document.addEventListener('click', function() {
        if (isVideoPlaying && video && video.paused) {
            video.muted = false;
            video.play().catch(() => {});
        }
    }, { once: true });
});