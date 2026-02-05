// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    const btnYes = document.getElementById('btnYes');
    const btnNo = document.getElementById('btnNo');
    const successWrapper = document.getElementById('successWrapper');
    const successMessage = document.getElementById('successMessage');
    const noMessage = document.getElementById('noMessage');
    const btnRetry = document.getElementById('btnRetry');
    const heart = document.getElementById('heart');
    const buttonsContainer = document.querySelector('.buttons-container');
    
    // Create floating code particles
    createCodeParticles();
    
    // Yes button click handler
    btnYes.addEventListener('click', function(e) {
        // Create ripple effect
        createRipple(e, this);
        
        // Hide buttons and other content (but keep heart visible for animation)
        buttonsContainer.style.display = 'none';
        document.querySelector('.proposal-text').style.display = 'none';
        document.querySelector('.subtitle').style.display = 'none';
        document.querySelector('.subtitle-main').style.display = 'none';
        document.querySelector('.title').style.display = 'none';
        document.querySelector('.terminal').style.display = 'none';
        
        // Keep heart container visible and center it on screen
        const heartContainer = document.querySelector('.heart-container');
        heartContainer.style.position = 'fixed';
        heartContainer.style.top = '50%';
        heartContainer.style.left = '50%';
        heartContainer.style.transform = 'translate(-50%, -50%)';
        heartContainer.style.zIndex = '1000';
        
        // Apply zoom animation to heart
        heart.classList.add('zooming');
        
        // Show success message when heart starts zooming out (at 50% of animation)
        setTimeout(() => {
            successWrapper.style.display = 'block';
            successWrapper.classList.add('show');
            successMessage.classList.add('show');
            createConfetti();
            playSuccessAnimation();
        }, 1000); // Show success card when zooming out starts (50% of 2s)
        
        // After animation completes, keep heart visible and switch to normal heartbeat
        setTimeout(() => {
            heart.classList.remove('zooming');
            heart.classList.add('zoomed');
            
            // Keep heart centered on screen (50% top, 50% left)
            heartContainer.style.top = '50%';
            heartContainer.style.left = '50%';
            heartContainer.style.transform = 'translate(-50%, -50%)';
            heartContainer.style.zIndex = '999'; // Below success card but visible
        }, 2000); // Match animation duration
    });
    
    // Cute error messages with loving praise
    const errorMessages = [
        {
            code: 'if (response === "no") {',
            error: 'Uncaught TypeError: "no" is not a valid response',
            message: '💕 Prerna, you\'re too amazing to say no - you light up my world!'
        },
        {
            code: 'const answer = "no";',
            error: 'SyntaxError: Invalid value assigned',
            message: '✨ Prerna, you\'re the most beautiful person I\'ve ever met!'
        },
        {
            code: 'user.choice = "no";',
            error: 'ReferenceError: "no" is undefined',
            message: '💖 Prerna, your smile makes every day brighter!'
        },
        {
            code: 'if (userSaysNo) {',
            error: 'LogicError: This condition will never be true',
            message: '🌟 Prerna, you\'re perfect in every way!'
        },
        {
            code: 'return "no";',
            error: 'TypeError: Cannot return invalid value',
            message: '💝 Prerna, you\'re the best thing that ever happened to me!'
        },
        {
            code: 'case "no":',
            error: 'SyntaxError: Unreachable case statement',
            message: '🎉 Prerna, you\'re absolutely incredible and I\'m so lucky!'
        }
    ];
    
    let errorIndex = 0;
    const errorPopup = document.getElementById('errorPopup');
    const errorText = document.getElementById('errorText');
    const errorMessage = document.getElementById('errorMessage');
    const errorOkBtn = document.getElementById('errorOkBtn');
    
    // No button click handler - show cute error
    btnNo.addEventListener('click', function() {
        // Get random error message
        const currentError = errorMessages[errorIndex % errorMessages.length];
        errorIndex++;
        
        // Update error popup content
        errorText.textContent = currentError.code;
        errorMessage.innerHTML = `<strong>${currentError.error}</strong><br>${currentError.message}`;
        
        // Show error popup with animation
        errorPopup.classList.add('show');
        
        // Make "No" button shake
        this.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            this.style.animation = '';
        }, 500);
    });
    
    // Error OK button - close popup
    errorOkBtn.addEventListener('click', function() {
        errorPopup.classList.remove('show');
    });
    
    // Create ripple effect on button click
    function createRipple(event, button) {
        const ripple = document.createElement('div');
        ripple.classList.add('btn-ripple');
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Create confetti effect
    function createConfetti() {
        const colors = ['#ff6b9d', '#4dabf7', '#c77dff', '#ffbd2e', '#00ff88'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.width = Math.random() * 10 + 5 + 'px';
                confetti.style.height = Math.random() * 10 + 5 + 'px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.top = '-10px';
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                confetti.style.zIndex = '9999';
                confetti.style.pointerEvents = 'none';
                
                document.body.appendChild(confetti);
                
                const animationDuration = Math.random() * 3 + 2;
                const animationDelay = Math.random() * 0.5;
                
                confetti.style.animation = `confettiFall ${animationDuration}s ${animationDelay}s ease-out forwards`;
                
                setTimeout(() => {
                    confetti.remove();
                }, (animationDuration + animationDelay) * 1000);
            }, i * 50);
        }
    }
    
    // Add confetti fall animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Play success animation
    function playSuccessAnimation() {
        // Add sparkle effects
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createSparkle();
            }, i * 100);
        }
    }
    
    // Create sparkle effect
    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'fixed';
        sparkle.style.width = '4px';
        sparkle.style.height = '4px';
        sparkle.style.backgroundColor = '#fff';
        sparkle.style.borderRadius = '50%';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.boxShadow = '0 0 10px #ff6b9d';
        sparkle.style.zIndex = '9998';
        sparkle.style.pointerEvents = 'none';
        
        document.body.appendChild(sparkle);
        
        sparkle.style.animation = 'sparkle 1s ease-out forwards';
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
    
    // Add sparkle animation
    const sparkleStyle = document.createElement('style');
    sparkleStyle.textContent = `
        @keyframes sparkle {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: scale(1.5) rotate(180deg);
                opacity: 1;
            }
            100% {
                transform: scale(0) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(sparkleStyle);
    
    // Create floating code particles
    function createCodeParticles() {
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            // Randomize starting position
            const randomStart = Math.random() * 100;
            particle.style.top = randomStart + '%';
            
            // Randomize animation duration
            const duration = 10 + Math.random() * 10;
            particle.style.animationDuration = duration + 's';
        });
    }
    
    // Add interactive heart hover effect
    heart.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    heart.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    // Add keyboard support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'y' || e.key === 'Y') {
            btnYes.click();
        } else if (e.key === 'n' || e.key === 'N') {
            btnNo.click();
        }
    });
    
    // Add mouse trail effect on success
    let mouseTrail = [];
    const maxTrailLength = 20;
    
    document.addEventListener('mousemove', function(e) {
        if (successMessage.classList.contains('show')) {
            const trail = document.createElement('div');
            trail.style.position = 'fixed';
            trail.style.width = '6px';
            trail.style.height = '6px';
            trail.style.borderRadius = '50%';
            trail.style.backgroundColor = '#ff6b9d';
            trail.style.left = e.clientX + 'px';
            trail.style.top = e.clientY + 'px';
            trail.style.pointerEvents = 'none';
            trail.style.zIndex = '9997';
            trail.style.boxShadow = '0 0 10px rgba(255, 107, 157, 0.8)';
            
            document.body.appendChild(trail);
            
            setTimeout(() => {
                trail.style.opacity = '0';
                trail.style.transform = 'scale(0)';
                trail.style.transition = 'all 0.5s ease-out';
                setTimeout(() => trail.remove(), 500);
            }, 100);
        }
    });
    
    // Console easter egg
    console.log('%c💕 Will you be my valentine? 💕', 'color: #ff6b9d; font-size: 20px; font-weight: bold;');
    console.log('%cYou found the easter egg! You\'re definitely a developer! 😊', 'color: #4dabf7; font-size: 14px;');
});
