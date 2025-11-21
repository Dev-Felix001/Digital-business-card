// Enhanced Business Card JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // 1. Animated Typewriter Effect for Name
    const nameElement = document.querySelector('.name');
    const originalName = nameElement.textContent;
    nameElement.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < originalName.length) {
            nameElement.textContent += originalName.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // 2. Interactive Skill Tags with Hover Effects
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
            this.style.transition = 'all 0.3s ease';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Click to highlight
        tag.addEventListener('click', function() {
            this.classList.toggle('skill-highlighted');
        });
    });

    // 3. Dynamic Contact Button Animation
    const contactBtn = document.querySelector('.contact-btn');
    contactBtn.addEventListener('mouseenter', function() {
        this.style.background = 'linear-gradient(135deg, #764ba2, #667eea)';
        this.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    contactBtn.addEventListener('mouseleave', function() {
        this.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
        this.style.transform = 'translateY(0) scale(1)';
    });

    // 4. Floating Animation for Avatar
    const avatar = document.querySelector('.avatar-placeholder');
    function floatAvatar() {
        avatar.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            avatar.style.transform = 'translateY(0px)';
        }, 2000);
    }
    setInterval(floatAvatar, 4000);

    // 5. Dynamic Theme Switching
    const themeToggle = document.createElement('button');
    themeToggle.textContent = '🌙';
    themeToggle.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 100;
    `;
    
    document.querySelector('.business-card').appendChild(themeToggle);
    
    let isDarkMode = false;
    themeToggle.addEventListener('click', function() {
        isDarkMode = !isDarkMode;
        
        if (isDarkMode) {
            document.body.style.background = 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)';
            document.querySelector('.business-card').style.background = '#1a1a1a';
            document.querySelector('.business-card').style.color = '#ecf0f1';
            themeToggle.textContent = '☀️';
        } else {
            document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            document.querySelector('.business-card').style.background = 'white';
            document.querySelector('.business-card').style.color = '#333';
            themeToggle.textContent = '🌙';
        }
    });

    // 6. Interactive Contact Items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.querySelector('span').textContent;
            navigator.clipboard.writeText(text).then(() => {
                const originalText = this.querySelector('span').textContent;
                this.querySelector('span').textContent = 'Copied!';
                setTimeout(() => {
                    this.querySelector('span').textContent = originalText;
                }, 2000);
            });
        });
        
        item.style.cursor = 'pointer';
    });

    // 7. Scroll-triggered Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for scroll animations
    document.querySelectorAll('.card-header, .contact-info, .skills, .social-links, .cta, .qr-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });

    // 8. Particle Background Effect
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        `;
        document.body.appendChild(particlesContainer);

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
            `;
            
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.top = Math.random() * 100 + 'vh';
            particle.style.animation = `float ${3 + Math.random() * 4}s infinite ease-in-out`;
            particle.style.animationDelay = Math.random() * 5 + 's';
            
            particlesContainer.appendChild(particle);
        }
    }

    // 9. Digital Clock in Footer
    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        const dateString = now.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        const clockElement = document.querySelector('.footer p');
        if (clockElement) {
            clockElement.innerHTML = `Last updated: ${dateString} | ${timeString}`;
        }
    }

    // 10. Initialize all features
    function init() {
        // Start typewriter effect
        setTimeout(typeWriter, 1000);
        
        // Create particles
        createParticles();
        
        // Start clock
        updateClock();
        setInterval(updateClock, 1000);
        
        // Add CSS for animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0) translateX(0); }
                25% { transform: translateY(-20px) translateX(10px); }
                50% { transform: translateY(-10px) translateX(-10px); }
                75% { transform: translateY(-15px) translateX(5px); }
            }
            
            .skill-highlighted {
                background: linear-gradient(135deg, #ff6b6b, #ee5a24) !important;
                transform: scale(1.2) !important;
                z-index: 10;
            }
            
            .pulse {
                animation: pulse 2s infinite;
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }

    // Start everything
    init();
});