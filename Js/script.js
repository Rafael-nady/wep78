const surpriseTextElement = document.getElementById("surpriseText");
const music = document.getElementById("music");

const fullMessage = [
    "You are not special only today,",
    "you are special every single day 🤍",
    "",
    "We've been together for a year now, and",
    "from the deep of my heart",
    "it was the best year in my life,",
    "and I wish you many more years of happiness and success.",
    "Happy Birthday again ya Bastot! 🎉🎂",
    ">0_0<",
];

let currentLine = 0;
let intervalId = null;

function playSurprise() {
    music.play();
    surpriseTextElement.textContent = "";
    currentLine = 0;
    intervalId = setInterval(() => {
        if (currentLine < fullMessage.length) {
            surpriseTextElement.textContent += fullMessage[currentLine] + "\n";
            currentLine++;
        } else {
            clearInterval(intervalId);
        }
    }, 2000);
}

function pauseSurprise() {
    music.pause();
}

function resetSurprise(){
    music.pause();
    music.currentTime = 0;
    surpriseTextElement.textContent = "";
    clearInterval(intervalId);
}

// ======= Background Canvas Animation =======

const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

let width, height;
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const particles = [];
const particleCount = 80;

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 3 + 1;WWWWWWW
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > width) this.speedX = -this.speedX;
        if (this.y < 0 || this.y > height) this.speedY = -this.speedY;
    }
    draw() {
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

canvas.addEventListener("mousemove", (e) => {
    particles.forEach((p) => {
        let dx = p.x - e.clientX;
        let dy = p.y - e.clientY;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
            let angle = Math.atan2(dy, dx);
            p.x += Math.cos(angle);
            p.y += Math.sin(angle);
        }
    });
});

initParticles();
animate();
