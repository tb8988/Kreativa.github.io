// Three.js Particle System
function initParticles() {
    const canvas = document.querySelector('#threeCanvas');
    const renderer = new THREE.WebGLRenderer({ 
        canvas, 
        antialias: true,
        alpha: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create particles
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

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.001;
        renderer.render(scene, camera);
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    animate();
}

// Services Data - Updated with Risk Management
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

// Initialize Services Grid
function initServices() {
    const grid = document.querySelector('.services-grid');
    
    services.forEach(service => {
        const card = document.createElement('div');
        card.className = 'service-card scroll-reveal';
        
        card.innerHTML = `
            <div class="service-icon">
                <i class="fas fa-${service.icon}"></i>
            </div>
            <h3 class="service-title">${service.title}</h3>
            <p>${service.description}</p>
        `;
        
        grid.appendChild(card);
    });
}

// Initialize Radar Chart
function initRadarChart() {
    const ctx = document.getElementById('radarChart').getContext('2d');
    
    const chart = new Chart(ctx, {
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
    
    return chart;
}

// Run Threat Scan
function setupScanButton(chart) {
    const scanBtn = document.getElementById('scanBtn');
    
    scanBtn.addEventListener('click', () => {
        scanBtn.disabled = true;
        scanBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Scanning...';
        
        setTimeout(() => {
            // Generate random scan results
            const newData = chart.data.datasets[0].data.map(() => 
                Math.floor(Math.random() * 60) + 10
            );
            
            chart.data.datasets[0].data = newData;
            chart.update();
            
            scanBtn.disabled = false;
            scanBtn.innerHTML = 'Scan Completed <i class="fas fa-check"></i>';
            
            setTimeout(() => {
                scanBtn.innerHTML = 'Run Security Scan';
            }, 2000);
        }, 1500);
    });
}

// Enhanced Contact Button Functionality
function initContactButton() {
    const contactBtn = document.getElementById('contactBtn');
    const contactModal = document.getElementById('contactModal');
    const closeBtn = document.querySelector('.close-btn');
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.querySelector('.success-message');
    
    // Open modal
    contactBtn.addEventListener('click', () => {
        contactModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        contactModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close when clicking outside
    contactModal.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            contactModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate form submission
        setTimeout(() => {
            contactForm.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Reset form after 3 seconds
            setTimeout(() => {
                contactModal.style.display = 'none';
                document.body.style.overflow = 'auto';
                contactForm.style.display = 'block';
                successMessage.style.display = 'none';
                contactForm.reset();
            }, 3000);
        }, 1000);
    });
}

// Scroll Reveal Animation
function initScrollReveal() {
    const scrollReveals = document.querySelectorAll('.scroll-reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });
    
    scrollReveals.forEach(el => observer.observe(el));
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    initParticles();
    initServices();
    const chart = initRadarChart();
    setupScanButton(chart);
    initScrollReveal();
    initContactButton();
});