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


// ========== Main Enhancements ========== //

// 1. AI Chat Assistant
class ChatAssistant {
  constructor() {
    this.widget = document.getElementById('chatWidget');
    this.messages = document.getElementById('chatMessages');
    this.initChat();
  }

  initChat() {
    document.getElementById('contactBtn').addEventListener('click', () => {
      this.widget.classList.add('active');
      this.addMessage("Hi! I'm Kreativa's AI assistant. How can I help?");
    });

    document.getElementById('sendMessage').addEventListener('click', this.sendMessage.bind(this));
  }

  addMessage(text, isUser = false) {
    const message = document.createElement('div');
    message.className = `message ${isUser ? 'user' : 'bot'}`;
    message.innerHTML = `<p>${text}</p>`;
    this.messages.appendChild(message);
    this.messages.scrollTop = this.messages.scrollHeight;
  }

  async sendMessage() {
    const input = document.getElementById('userMessage');
    const text = input.value.trim();
    if (text) {
      this.addMessage(text, true);
      input.value = '';
      
      // Simulate API call
      const response = await this.getAIResponse(text);
      this.addMessage(response);
    }
  }

  async getAIResponse(query) {
    // In production, replace with actual API call
    const responses = {
      "cybersecurity": "Our cybersecurity services include...",
      "pricing": "We offer customized pricing based on...",
      "default": "I can help with: cybersecurity, AI solutions, risk management..."
    };

    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (query.toLowerCase().includes('security')) return responses.cybersecurity;
    if (query.toLowerCase().includes('price')) return responses.pricing;
    return responses.default;
  }
}

// 2. Case Study Filter
class CaseStudyFilter {
  constructor() {
    this.grid = document.querySelector('.case-study-grid');
    this.init();
  }

  async init() {
    const studies = await this.fetchCaseStudies();
    this.renderStudies(studies);
    this.setupFilters();
  }

  async fetchCaseStudies() {
    // Mock data - replace with API call
    return [
      { id: 1, title: "Banking Security Upgrade", industry: "finance", roi: "240%"},
      { id: 2, title: "Hospital Data Protection", industry: "healthcare", roi: "180%"}
    ];
  }

  renderStudies(studies) {
    this.grid.innerHTML = studies.map(study => `
      <div class="case-study" data-industry="${study.industry}">
        <h3>${study.title}</h3>
        <p>ROI: <span class="roi">${study.roi}</span></p>
      </div>
    `).join('');
  }

  setupFilters() {
    document.querySelectorAll('.filters button').forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        this.filterStudies(filter);
      });
    });
  }

  filterStudies(filter) {
    document.querySelectorAll('.case-study').forEach(study => {
      study.style.display = filter === 'all' || study.dataset.industry === filter 
        ? 'block' : 'none';
    });
  }
}

// 3. Theme Management
class ThemeManager {
  constructor() {
    this.themeBtn = document.getElementById('themeSwitcher');
    this.init();
  }

  init() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    this.setTheme(savedTheme);
    
    this.themeBtn.addEventListener('click', () => {
      const newTheme = document.documentElement.dataset.theme === 'dark' 
        ? 'light' : 'dark';
      this.setTheme(newTheme);
    });
  }

  setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
    this.themeBtn.innerHTML = theme === 'dark' 
      ? '<i class="fas fa-moon"></i>' 
      : '<i class="fas fa-sun"></i>';
  }
}

// 4. Biometric Authentication Demo
class BiometricAuth {
  constructor() {
    this.prompt = document.createElement('div');
    this.prompt.className = 'biometric-prompt';
    this.prompt.innerHTML = `
      <h3>Secure Login</h3>
      <p>Verify your identity</p>
      <button id="useBiometric"><i class="fas fa-fingerprint"></i> Use Biometrics</button>
    `;
    document.body.appendChild(this.prompt);
    this.init();
  }

  async init() {
    if (!window.PublicKeyCredential) {
      console.log("Biometrics not supported");
      return;
    }

    document.getElementById('primary-btn').addEventListener('click', () => {
      this.showPrompt();
    });

    document.getElementById('useBiometric').addEventListener('click', () => {
      this.authenticate();
    });
  }

  showPrompt() {
    this.prompt.style.display = 'block';
  }

  async authenticate() {
    try {
      const credential = await navigator.credentials.get({
        publicKey: {
          challenge: new Uint8Array([/* ... */]),
          rpId: window.location.hostname,
          userVerification: "required"
        }
      });
      this.prompt.innerHTML = '<p>Authentication successful!</p>';
    } catch (err) {
      this.prompt.innerHTML = '<p>Authentication failed</p>';
    }
  }
}

// ========== Initialize Everything ========== //
document.addEventListener('DOMContentLoaded', () => {
  // Existing initializations
  gsap.registerPlugin(ScrollTrigger);
  initParticles();
  initServices();
  const chart = initRadarChart();
  setupScanButton(chart);
  initScrollReveal();
  initContactButton();

  // New feature initializations
  new ChatAssistant();
  new CaseStudyFilter();
  new ThemeManager();
  
  if (window.PublicKeyCredential) {
    new BiometricAuth();
  }

  // WASM Performance Demo
  if (window.WebAssembly) {
    initWASMDemo();
  }
});

// 5. WASM Performance Demo (separate file wasm-loader.js)
async function initWASMDemo() {
  const response = await fetch('encryption.wasm');
  const buffer = await response.arrayBuffer();
  const module = await WebAssembly.instantiate(buffer);
  window.wasmEncrypt = module.instance.exports.encrypt;
}

// 6. Analytics Setup
function initAnalytics() {
  // Hotjar
  (function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:YOUR_HOTJAR_ID,hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
}  