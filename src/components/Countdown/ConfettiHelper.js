export const fireConfettiBlast = (canvas) => {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resizeCanvas();

  const particles = [];
  const colors = ["#C49A3A", "#DDBB68", "#C96D7A", "#BFC8A4", "#FFF8EF", "#FFD700", "#FF69B4", "#87CEEB"];
  const particleCount = 600; // Increased count for dense blast

  class Particle {
    constructor(side) {
      this.side = side; // "left", "right" or "center"
      this.age = 0; // Particle lifetime counter

      if (side === "center") {
        // Starts at the center of the viewport
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;

        // Radial explosion oriented upwards (200 to 340 degrees)
        const angle = (Math.random() * 140 + 200) * (Math.PI / 180);
        const speed = (Math.random() * 6 + 10) * 1.2; // Increased speed by 10%
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
      } else {
        this.x = side === "left" ? 0 : canvas.width;
        this.y = canvas.height - 20;

        // Shoot more vertically (45-75 deg on left, 105-135 deg on right)
        const angle = side === "left"
          ? (Math.random() * 30 + 45) * (Math.PI / 180)
          : (Math.random() * 30 + 105) * (Math.PI / 180);

        // Higher speed to propel particles higher into the viewport - increased by 10%
        const speed = (Math.random() * 10 + 16) * 1.1;
        this.vx = Math.cos(angle) * speed;
        this.vy = -Math.sin(angle) * speed;
      }

      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.size = Math.random() * 9 + 6;
      this.width = this.size;
      this.height = this.size * (Math.random() * 0.6 + 0.6);
      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 12;
      this.gravity = 0.05; // Ultra light gravity for zero-g drifting effect
      this.friction = 0.98; // Glides smoothly through the air
      this.opacity = 1;
    }

    update() {
      this.vx *= this.friction;
      this.vy *= this.friction;
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotationSpeed;

      // Initially opacity 1, then drops to 0.8, then fades after 240 frames
      this.age++;
      if (this.age > 240) {
        this.opacity -= 0.002;
      } else if (this.age > 30) {
        this.opacity = 0.7;
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, this.opacity);
      ctx.fillStyle = this.color;
      ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
      ctx.restore();
    }
  }

  // Generate initial burst from left, right, and center
  const burstCount = Math.floor(particleCount / 3);
  for (let i = 0; i < burstCount; i++) {
    particles.push(new Particle("left"));
    particles.push(new Particle("right"));
    particles.push(new Particle("center"));
  }

  let animationId;
  const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let activeParticles = 0;
    particles.forEach((p) => {
      if (p.opacity > 0 && p.y < canvas.height + 50) {
        p.update();
        p.draw();
        activeParticles++;
      }
    });

    if (activeParticles > 0) {
      animationId = requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  render();

  // Handle screen resize dynamically
  const handleResize = () => {
    resizeCanvas();
  };
  window.addEventListener("resize", handleResize);

  // Return a cleanup function
  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener("resize", handleResize);
  };
};
