// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize visible content first
    initServices();
    initCaseStudies();
    const chart = initRadarChart();
    initContactForm();
    
    // 2. Initialize interactive elements
    initChat();
    setupScanButton(chart);
    
    // 3. Initialize decorative elements last
    initParticles();
    initCardGlowEffects();
    
    console.log("Website fully initialized");
});

// Service Cards
function initServices() {
    const services = [
        {
            icon: 'shield-alt',
            title: 'Cybersecurity',
            description: 'End-to-end protection with real-time threat detection'
        },
        {
            icon: 'brain',
            title: 'AI Solutions',
            description: 'Custom machine learning models for your business needs'
        },
        {
            icon: 'exclamation-triangle',
            title: 'Risk Management',
            description: 'Comprehensive risk assessment and mitigation strategies'
        },
        {
            icon: 'project-diagram',
            title: 'Systems Architecture',
            description: 'Scalable infrastructure design and implementation'
        },
        {
            icon: 'mobile-alt',
            title: 'App Development',
            description: 'Cross-platform mobile applications for iOS and Android'
        },
        {
            icon: 'code',
            title: 'Web Development',
            description: 'Modern, responsive web applications and sites'
        }
    ];

    const grid = document.querySelector('.services-grid');
    if (!grid) return;

    grid.innerHTML = services.map(service => `
        <div class="service-card">
            <div class="service-icon">
                <i class="fas fa-${service.icon}"></i>
            </div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
        </div>
    `).join('');
}

// Case Studies
function initCaseStudies() {
    const studies = [
        { 
            title: "Banking Security Upgrade", 
            industry: "finance", 
            description: "Implemented zero-trust architecture reducing breaches by 98%",
            roi: "240% ROI"
        },
        { 
            title: "Healthcare Data Protection", 
            industry: "healthcare", 
            description: "HIPAA-compliant encryption system for patient records",
            roi: "180% ROI"
        }
    ];

    const grid = document.querySelector('.case-study-grid');
    if (!grid) return;

    grid.innerHTML = studies.map(study => `
        <div class="case-study" data-industry="${study.industry}">
            <h3>${study.title}</h3>
            <p>${study.description}</p>
            <p><strong>${study.roi}</strong></p>
        </div>
    `).join('');
}

// Radar Chart
function initRadarChart() {
    const ctx = document.getElementById('radarChart');
    if (!ctx) return null;

    return new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Network', 'Applications', 'Data', 'Endpoints', 'Cloud'],
            datasets: [{
                label: 'Threat Level',
                data: [30, 45, 25, 50, 35],
                backgroundColor: 'rgba(0, 255, 0, 0.1)',
                borderColor: '#00FF00',
                pointBackgroundColor: '#00FF00',
                pointBorderColor: '#fff',
                pointHoverRadius: 5,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(204, 214, 246, 0.1)'
                    },
                    grid: {
                        color: 'rgba(204, 214, 246, 0.1)'
                    },
                    pointLabels: {
                        color: '#CCD6F6',
                        font: {
                            family: 'Inter'
                        }
                    },
                    ticks: {
                        display: false,
                        beginAtZero: true
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Run Threat Scan
function setupScanButton(chart) {
    const scanBtn = document.getElementById('scanBtn');
    if (!scanBtn || !chart) return;

    scanBtn.addEventListener('click', () => {
        scanBtn.disabled = true;
        scanBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Scanning...';
        
        const tl = gsap.timeline({
            onComplete: () => {
                scanBtn.disabled = false;
                scanBtn.innerHTML = 'Scan Completed <i class="fas fa-check"></i>';
                
                setTimeout(() => {
                    scanBtn.innerHTML = 'Run Security Scan';
                }, 2000);
            }
        });
        
        tl.to({}, {
            duration: 1.5,
            onUpdate: () => {
                const progress = tl.progress();
                if (progress > 0.5) {
                    const newData = chart.data.datasets[0].data.map((val, i) => {
                        const fluctuation = Math.sin(progress * Math.PI * 4 + i) * 20;
                        return Math.min(100, Math.max(0, val + fluctuation));
                    });
                    chart.data.datasets[0].data = newData;
                    chart.update();
                }
            },
            onComplete: () => {
                const finalData = chart.data.datasets[0].data.map(() => 
                    Math.floor(Math.random() * 60) + 10
                );
                chart.data.datasets[0].data = finalData;
                chart.update();
            }
        });
    });
}

// Chat Widget
function initChat() {
    const chatWidget = document.getElementById('chatWidget');
    const chatToggle = document.getElementById('chatToggle');
    
    if (!chatWidget || !chatToggle) return;

    chatToggle.addEventListener('click', () => {
        chatWidget.style.display = chatWidget.style.display === 'block' ? 'none' : 'block';
    });
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will contact you soon.');
        form.reset();
    });
}

// Particle Background
function initParticles() {
    const canvas = document.getElementById('threeCanvas');
    if (!canvas || !window.THREE) return;
    
    const renderer = new THREE.WebGLRenderer({ 
        canvas, 
        antialias: true,
        alpha: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 2000;
    
    const posArray = new Float32Array(particleCount * 3);
    for(let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: new THREE.Color(0x00FF00),
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    function animate() {
        requestAnimationFrame(animate);
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.001;
        renderer.render(scene, camera);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Dynamic Glow Position Tracking
function initCardGlowEffects() {
    const cards = document.querySelectorAll('.service-card, .case-study, .chart-container, .contact-container, #contactForm');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.removeProperty('--mouse-x');
            card.style.removeProperty('--mouse-y');
        });
    });
}