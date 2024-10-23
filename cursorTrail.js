document.addEventListener('DOMContentLoaded', function () {
    const cursor = document.getElementById('fire-cursor');
  
    document.addEventListener('mousemove', function (e) {
      const x = e.clientX;
      const y = e.clientY;
      cursor.style.left = `${x}px`;
      cursor.style.top = `${y}px`;
    });
  
    // Create fire particles
    for (let i = 0; i < 30; i++) {
      createParticle();
    }
  
    function createParticle() {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      cursor.appendChild(particle);
  
      const size = Math.random() * 30 + 10; // Random size between 10 and 40 pixels
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
  
      const color = `hsl(${Math.random() * 40 + 10}, 100%, 50%)`; // Random hue between 10 and 50
      particle.style.backgroundColor = color;
  
      const animationDuration = Math.random() * 2 + 1; // Random duration between 1 and 3 seconds
      particle.style.animation = `fire ${animationDuration}s linear infinite`;
  
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
  
      // Remove particle after animation ends
      particle.addEventListener('animationiteration', function () {
        particle.remove();
        createParticle();
      });
    }
  });
  