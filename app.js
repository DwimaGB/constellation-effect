const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
    x: undefined,
    y: undefined
}
let deg = 0;
let particles = [];

class Particle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        // this.x = Math.random() * canvas.width + 1;
        // this.y = Math.random() * canvas.height + 1;
        this.dx = Math.random() * 3 - 1.5;
        this.dy = Math.random() * 3 - 1.5;
        this.radius = Math.floor(Math.random() * 3) + 1;
        this.color = `hsl(${deg}, 100%, 50%)`;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {

        this.radius -= 0.01;

        this.x += this.dx;
        this.y += this.dy;
    }
}

window.addEventListener('click', (evt) => {
    mouse.x = evt.x;
    mouse.y = evt.y;
    for (let i = 0; i < 30; i++) {
        particles.push(new Particle());
    }
    init();
})

window.addEventListener('mousemove', (evt) => {
    mouse.x = evt.x;
    mouse.y = evt.y;
    for (let i = 0; i < 2; i++) {
        particles.push(new Particle());
    }
    // init();
})

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

function init() {

    for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
        particles[i].update();

        for (let j = i; j < particles.length; j++) {
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 60) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.lineWidth = 0.3;
                ctx.strokeStyle = particles[i].color;
                ctx.stroke();
            }

        }

        if (particles[i].radius < 0.2) {
            particles.splice(i, 1);
            i--;
            // console.log(particles.length);
        }

    }
}

function animation() {
    
    if (deg > 360) {
        deg = 0;
        // cancelAnimationFrame(id);
    }
    // console.log(deg);
    deg += 5;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    init();

    const id = requestAnimationFrame(animation);

}
animation();