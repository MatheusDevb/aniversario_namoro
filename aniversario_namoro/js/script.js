// Variáveis globais
const correctPassword = "280975";
let carouselImages = [
  "img/carousel1.jpg",
  "img/carousel2.jpg",
  "img/carousel3.jpg",
  "img/carousel4.jpg",
  "img/carousel6.jpg",
  "img/carousel7.jpg",
  "img/carousel8.jpg",
  "img/carousel9.jpg",
  "img/carousel10.jpg",
  "img/carousel11.jpg",
  "img/carousel12.jpg",
  "img/carousel13.jpg",
  "img/carousel14.jpg",
  "img/carousel15.jpg",
  "img/carousel16.jpg",
  "img/carousel17.jpg",
  "img/carousel18.jpg",
  "img/carousel19.jpg",
  "img/carousel20.jpg",
  "img/carousel21.jpg",
  "img/carousel22.jpg",
  "img/carousel23.jpg",
  "img/carousel35.jpg",
  "img/carousel24.jpg",
  "img/carousel25.jpg",
  "img/carousel26.jpg",
  "img/carousel27.jpg",
  "img/carousel32.jpg",
  "img/carousel33.jpg",
  "img/carousel34.jpg",
  "img/carousel28.jpg",
  "img/carousel29.jpg",
  "img/carousel30.jpg",
  "img/carousel31.jpg",
];

// Elementos DOM
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM carregado, inicializando script...");

  // Referências aos elementos
  const giftScreen = document.getElementById("gift-screen");
  const gift = document.getElementById("gift");
  const passwordScreen = document.getElementById("password-screen");
  const passwordInput = document.getElementById("password-input");
  const submitPassword = document.getElementById("submit-password");
  const passwordError = document.getElementById("password-error");
  const contentScreen = document.getElementById("content-screen");
  const surpriseButton = document.getElementById("surprise-button");
  const carouselScreen = document.getElementById("carousel-screen");
  const carousel = document.querySelector(".carousel");
  const fireworksScreen = document.getElementById("fireworks-screen");
  const fireworksCanvas = document.getElementById("fireworks-canvas");
  const initialSong = document.getElementById("initial-song");
  const mainSong = document.getElementById("main-song");

  // Verificar se todos os elementos foram encontrados
  console.log("Elemento presente:", gift ? "Sim" : "Não");
  console.log("Tela de senha:", passwordScreen ? "Sim" : "Não");

  // Inicialização
  initParallaxEffect();

  // Evento de clique no presente
  if (gift) {
    gift.addEventListener("click", function () {
      console.log("Presente clicado");
      giftScreen.classList.remove("active");
      passwordScreen.classList.add("active");
    });
  }

  // Verificação de senha
  if (submitPassword) {
    submitPassword.addEventListener("click", checkPassword);
  }

  if (passwordInput) {
    passwordInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        checkPassword();
      }
    });
  }

  // Função para verificar a senha
  function checkPassword() {
    console.log("Verificando senha:", passwordInput.value);
    if (passwordInput.value === correctPassword) {
      passwordScreen.classList.remove("active");
      contentScreen.classList.add("active");
      passwordError.textContent = "";
    } else {
      passwordError.textContent = "Senha incorreta. Tente novamente.";
      passwordInput.value = "";
      passwordInput.focus();

      // Efeito de shake no input
      passwordInput.classList.add("shake");
      setTimeout(() => {
        passwordInput.classList.remove("shake");
      }, 500);
    }
  }

  // Efeito Parallax
  function initParallaxEffect() {
    window.addEventListener("scroll", function () {
      const parallaxBgs = document.querySelectorAll(".parallax-bg");

      parallaxBgs.forEach((bg) => {
        const section = bg.parentElement;
        const distance = window.scrollY - section.offsetTop;
        const speed = 0.5;

        if (isElementInViewport(section)) {
          bg.style.transform = `translateY(${distance * speed}px)`;
        }
      });
    });
  }

  // Verificar se elemento está visível na viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  // Botão de surpresa
  if (surpriseButton) {
    surpriseButton.addEventListener("click", function () {
      contentScreen.classList.remove("active");
      carouselScreen.classList.add("active");
      startCarousel();
    });
  }

  // Carrossel de imagens com música
  function startCarousel() {
    // Limpar carrossel
    carousel.innerHTML = "";

    // Adicionar imagens ao carrossel
    carouselImages.forEach((src, index) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = `Momento especial ${index + 1}`;
      carousel.appendChild(img);
    });

    // Iniciar música inicial
    initialSong
      .play()
      .catch((e) => console.log("Erro ao tocar música inicial:", e));

    // Configurar troca de música após 5 segundos
    setTimeout(() => {
      initialSong.pause();
      initialSong.currentTime = 0;
      mainSong
        .play()
        .catch((e) => console.log("Erro ao tocar música principal:", e));
    }, 15000);

    // Iniciar carrossel
    let currentSlide = 0;
    const slides = carousel.querySelectorAll("img");
    slides[0].classList.add("active");

    const slideInterval = setInterval(() => {
      slides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add("active");

      // Se chegou ao final do carrossel
      if (currentSlide === slides.length - 1) {
        // Esperar a última imagem ser exibida por completo
        setTimeout(() => {
          clearInterval(slideInterval);
          carouselScreen.classList.remove("active");
          fireworksScreen.classList.add("active");
          startFireworks();

          // Parar a música após um tempo
          setTimeout(() => {
            mainSong.pause();
            mainSong.currentTime = 0;
          }, 10000);
        }, 3000);
      }
    }, 3000);
  }

  // Fogos de artifício
  function startFireworks() {
    const canvas = fireworksCanvas;
    const ctx = canvas.getContext("2d");

    // Configurar tamanho do canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Cores para os fogos
    const colors = ["#e91e63", "#ffffff", "#f8bbd0", "#ff5252", "#f48fb1"];

    // Array para armazenar os fogos
    let fireworks = [];

    // Classe para os fogos
    class Firework {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.targetY = canvas.height / 4 + Math.random() * (canvas.height / 2);
        this.speed = 2 + Math.random() * 3;
        this.radius = 2;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.particles = [];
        this.exploded = false;
      }

      update() {
        if (!this.exploded) {
          this.y -= this.speed;

          if (this.y <= this.targetY) {
            this.explode();
          }
        } else {
          for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].update();

            if (this.particles[i].alpha <= 0) {
              this.particles.splice(i, 1);
              i--;
            }
          }
        }
      }

      draw() {
        if (!this.exploded) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
          ctx.closePath();
        } else {
          for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].draw();
          }
        }
      }

      explode() {
        this.exploded = true;

        for (let i = 0; i < 50; i++) {
          this.particles.push(new Particle(this.x, this.y, this.color));
        }
      }
    }

    // Classe para as partículas dos fogos
    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.radius = 1 + Math.random();
        this.color = color;
        this.speed = 1 + Math.random() * 3;
        this.angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;
        this.alpha = 1;
        this.decay = 0.01 + Math.random() * 0.02;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.05; // Gravidade
        this.alpha -= this.decay;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
      }
    }

    // Função para criar novos fogos
    function createFirework() {
      fireworks.push(new Firework());
    }

    // Criar fogos iniciais
    for (let i = 0; i < 3; i++) {
      createFirework();
    }

    // Intervalo para criar novos fogos
    const fireworkInterval = setInterval(createFirework, 500);

    // Função de animação
    function animate() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < fireworks.length; i++) {
        fireworks[i].update();
        fireworks[i].draw();

        if (fireworks[i].exploded && fireworks[i].particles.length === 0) {
          fireworks.splice(i, 1);
          i--;
        }
      }

      requestAnimationFrame(animate);
    }

    // Iniciar animação
    animate();

    // Parar após 10 segundos
    setTimeout(() => {
      clearInterval(fireworkInterval);

      // Esperar mais 5 segundos para os últimos fogos terminarem
      setTimeout(() => {
        fireworksScreen.classList.remove("active");
        giftScreen.classList.add("active");
      }, 5000);
    }, 10000);
  }

  // Adicionar classe shake para animação de erro
  if (!document.querySelector(".shake-animation")) {
    const style = document.createElement("style");
    style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
                20%, 40%, 60%, 80% { transform: translateX(10px); }
            }
            .shake {
                animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
            }
        `;
    document.head.appendChild(style);
  }
});
