// Main App Controller
class KreativaTechApp {
    constructor() {
        this.initTheme();
        this.initParticles();
        this.initServices();
        this.initCaseStudies();
        this.initChat();
        this.initAnalytics();
        this.setupEventListeners();
    }

    initTheme() {
        const savedTheme = localStorage.getItem('kreativa-theme') || 'dark';
        document.documentElement.dataset.theme = savedTheme;
        
        document.getElementById('themeSwitcher').addEventListener('click', () => {
            const currentTheme = document.documentElement.dataset.theme;
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.dataset.theme = newTheme;
            localStorage.setItem('kreativa-theme', newTheme);
            
            // Update icon
            const icon = document.querySelector('#themeSwitcher i');
            icon.className = newTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        });
    }

    initParticles() {
        const canvas = document.querySelector('#threeCanvas');
        if (!canvas) return;

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

        const animate = () => {
            requestAnimationFrame(animate);
            particlesMesh.rotation.x += 0.0005;
            particlesMesh.rotation.y += 0.001;
            renderer.render(scene, camera);
        };
        
        animate();
    }

    initServices() {
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
            <div class="service-card scroll-reveal">
                <div class="service-icon">
                    <i class="fas fa-${service.icon}"></i>
                </div>
                <h3 class="service-title">${service.title}</h3>
                <p>${service.description}</p>
            </div>
        `).join('');
    }

    initCaseStudies() {
        const studies = [
            { id: 1, title: "Banking Security Upgrade", industry: "finance", roi: "240%"},
            { id: 2, title: "Hospital Data Protection", industry: "healthcare", roi: "180%"}
        ];

        const grid = document.querySelector('.case-study-grid');
        if (!grid) return;

        grid.innerHTML = studies.map(study => `
            <div class="case-study" data-industry="${study.industry}">
                <h3>${study.title}</h3>
                <p>ROI: <span class="roi">${study.roi}</span></p>
            </div>
        `).join('');

        document.querySelectorAll('.filters button').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelector('.filters .active').classList.remove('active');
                btn.classList.add('active');
                
                const filter = btn.dataset.filter;
                document.querySelectorAll('.case-study').forEach(study => {
                    study.style.display = filter === 'all' || study.dataset.industry === filter 
                        ? 'block' : 'none';
                });
            });
        });
    }

    initChat() {
        const chatWidget = document.getElementById('chatWidget');
        const contactBtn = document.getElementById('contactBtn');
        const closeChat = document.getElementById('closeChat');
        const sendBtn = document.getElementById('sendMessage');
        const userInput = document.getElementById('userMessage');
        const messages = document.getElementById('chatMessages');

        if (!chatWidget) return;

        const toggleChat = () => {
            chatWidget.classList.toggle('active');
            chatWidget.style.display = chatWidget.classList.contains('active') ? 'block' : 'none';
        };

        contactBtn.addEventListener('click', toggleChat);
        closeChat.addEventListener('click', toggleChat);

        const addMessage = (text, isUser = false) => {
            const message = document.createElement('div');
            message.className = `message ${isUser ? 'user' : 'bot'}`;
            message.innerHTML = `<p>${text}</p>`;
            messages.appendChild(message);
            messages.scrollTop = messages.scrollHeight;
        };

        const sendMessage = () => {
            const text = userInput.value.trim();
            if (text) {
                addMessage(text, true);
                userInput.value = '';
                
                // Simulate AI response
                setTimeout(() => {
                    addMessage("Thanks for your message! Our team will respond shortly.");
                }, 800);
            }
        };

        sendBtn.addEventListener('click', sendMessage);
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    initAnalytics() {
        // Initialize analytics tools here
        console.log('Analytics initialized');
    }

    setupEventListeners() {
        // Initialize scroll animations
        gsap.registerPlugin(ScrollTrigger);
        
        gsap.utils.toArray('.scroll-reveal').forEach(element => {
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 50,
                duration: 1
            });
        });

        // Initialize radar chart
        const initRadarChart = () => {
            const ctx = document.getElementById('radarChart')?.getContext('2d');
            if (!ctx) return;
            
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
                            angleLines: { color: 'rgba(204, 214, 246, 0.1)' },
                            grid: { color: 'rgba(204, 214, 246, 0.1)' },
                            pointLabels: { color: '#CCD6F6' },
                            ticks: { display: false }
                        }
                    },
                    plugins: { legend: { display: false } }
                }
            });
        };

        const chart = initRadarChart();
        
        // Setup scan button
        document.getElementById('scanBtn')?.addEventListener('click', () => {
            const btn = document.getElementById('scanBtn');
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Scanning...';
            
            setTimeout(() => {
                if (chart) {
                    chart.data.datasets[0].data = chart.data.datasets[0].data.map(
                        () => Math.floor(Math.random() * 60) + 10
                    );
                    chart.update();
                }
                
                btn.disabled = false;
                btn.innerHTML = 'Scan Completed <i class="fas fa-check"></i>';
                
                setTimeout(() => {
                    btn.innerHTML = 'Run Security Scan';
                }, 2000);
            }, 1500);
        });
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new KreativaTechApp();
});