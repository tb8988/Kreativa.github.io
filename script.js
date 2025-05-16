// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize visible content first
    initServices();
    initCaseStudies();
    initRadarChart();
    initContactForm();
    
    // 2. Initialize interactive elements
    initChat();
    
    // 3. Initialize decorative elements last
    initParticles();
    
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
    if (!ctx) return;

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Network', 'Applications', 'Data', 'Endpoints', 'Cloud'],
            datasets: [{
                data: [65, 59, 80, 81, 56],
                backgroundColor: 'rgba(0, 255, 0, 0.1)',
                borderColor: '#00FF00',
                pointBackgroundColor: '#00FF00'
            }]
        }
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

    // Particle system implementation
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create particles
    const particles = new THREE.BufferGeometry();
    const particleCount = 1000;
    const posArray = new Float32Array(particleCount * 3);

    for(let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const material = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x00FF00,
        transparent: true,
        opacity: 0.8
    });

    const particleMesh = new THREE.Points(particles, material);
    scene.add(particleMesh);

    function animate() {
        requestAnimationFrame(animate);
        particleMesh.rotation.x += 0.0005;
        particleMesh.rotation.y += 0.001;
        renderer.render(scene, camera);
    }

    animate();
}