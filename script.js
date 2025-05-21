// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize visible content first
    initServices();
    initCaseStudies();
    const chart = initRadarChart();
    initAppsShowcase();
    initContactForm();
    
    // 2. Initialize interactive elements
    initChat();
    setupScanButton(chart);
    
    // 3. Initialize decorative elements last
    initParticles();
    initCardGlowEffects();
    initThreatMap();
    
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

// Enhanced Chat Widget
function initChat() {
    const chatWidget = document.getElementById('chatWidget');
    const chatToggle = document.getElementById('chatToggle');
    const closeChat = document.getElementById('closeChat');
    const sendMessage = document.getElementById('sendMessage');
    const userMessage = document.getElementById('userMessage');
    const chatMessages = document.getElementById('chatMessages');
    
    if (!chatWidget || !chatToggle || !closeChat || !sendMessage || !userMessage || !chatMessages) return;

    // Toggle chat visibility
    const toggleChat = () => {
        chatWidget.style.display = chatWidget.style.display === 'block' ? 'none' : 'block';
    };

    // Add welcome message
    const addWelcomeMessage = () => {
        const welcomeMsg = `
            <div class="message bot-message">
                <p>Hello! I'm Kreativa Assistant. How can I help you today?</p>
                <p>You can ask about:</p>
                <ul>
                    <li>Our services</li>
                    <li>Pricing information</li>
                    <li>Technical support</li>
                </ul>
            </div>
        `;
        chatMessages.innerHTML = welcomeMsg;
    };

    // Add message to chat
    const addMessage = (message, isUser = false) => {
        const messageClass = isUser ? 'user-message' : 'bot-message';
        const messageElement = `
            <div class="message ${messageClass}">
                <p>${message}</p>
            </div>
        `;
        chatMessages.insertAdjacentHTML('beforeend', messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    // Handle sending messages
    const handleSendMessage = () => {
        const message = userMessage.value.trim();
        if (message) {
            addMessage(message, true);
            userMessage.value = '';
            
            // Simulate bot response after a short delay
            setTimeout(() => {
                const responses = [
                    "Thanks for your message! Our team will get back to you soon.",
                    "I've noted your question. Would you like me to connect you with a specialist?",
                    "That's a great question! Let me find the right information for you.",
                    "We'd be happy to help with that. Can you provide more details?"
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addMessage(randomResponse);
            }, 1000);
        }
    };
// Add to initChat()
const smartReplies = {
    "pricing": "Our enterprise packages start at $15K/month with volume discounts. Would you like a custom quote?",
    "case studies": "We've helped 37 Fortune 500 companies. Here's our healthcare case study: [link]",
    // Add more intent responses
};

// Add NLP-like keyword detection
function detectIntent(message) {
    const keywords = {
        'price': 'pricing',
        'cost': 'pricing',
        'example': 'case studies'
    };
    return keywords[message.toLowerCase()] || 'default';
}
    // Event listeners
    chatToggle.addEventListener('click', toggleChat);
    closeChat.addEventListener('click', toggleChat);
    
    sendMessage.addEventListener('click', handleSendMessage);
    
    userMessage.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });

    // Initialize with welcome message
    addWelcomeMessage();
}

// Contact Form
// Contact Form with Formspree
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // Set reply-to dynamically
    document.getElementById('contactEmail').addEventListener('input', (e) => {
        document.getElementById('replyTo').value = e.target.value;
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        try {
            // UI feedback
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            // Send form data
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success UI
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                form.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            // Error UI
            submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
            setTimeout(() => {
                submitBtn.textContent = 'Try Again';
                submitBtn.disabled = false;
            }, 2000);
            console.error('Form error:', error);
        }
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
    const cards = document.querySelectorAll('.service-card, .case-study, .chart-container, .contact-container, #contactForm, .app-card');
    
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


// Initialize Apps Showcase
function initAppsShowcase() {
    const apps = [
        {
            icon: 'mobile-screen',
            title: 'SecureVault',
            description: 'Military-grade encrypted storage for sensitive documents',
            badges: ['Security', 'iOS', 'Android']
        },
        {
            icon: 'chart-network',
            title: 'Network Sentinel',
            description: 'Real-time network monitoring and threat detection',
            badges: ['Enterprise', 'Dashboard', 'AI']
        },
        {
            icon: 'robot',
            title: 'AI Companion',
            description: 'Personal productivity assistant with natural language processing',
            badges: ['AI', 'Productivity', 'Cross-platform']
        },
        {
            icon: 'database',
            title: 'DataFlow',
            description: 'Enterprise data integration and visualization platform',
            badges: ['Big Data', 'Analytics', 'Cloud']
        }
    ];

    const grid = document.querySelector('.apps-grid');
    if (!grid) return;

    grid.innerHTML = apps.map(app => `
        <div class="app-card">
            <div class="app-icon">
                <i class="fas fa-${app.icon}"></i>
            </div>
            <h3>${app.title}</h3>
            <p>${app.description}</p>
            <div class="app-badges">
                ${app.badges.map(badge => `<span class="app-badge">${badge}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

// Update the initialization to include the apps showcase
document.addEventListener('DOMContentLoaded', () => {
    // ... existing initialization code ...
    initAppsShowcase();
    initCardGlowEffects(); // This will now include app cards too
});



// Add to Threat Analyzer section
/* function initThreatTicker() {
    const threats = [
        "New Zero-Day Exploit Detected in Wild",
        "Global Ransomware Attacks +37% This Month",
        "AI-Powered Phishing Campaigns Rising"
    ];
    
    const ticker = document.createElement('div');
    ticker.className = 'threat-ticker';
    document.querySelector('.hero').appendChild(ticker);
    
    // Rotate threats every 8 seconds
    setInterval(() => {
        const randomThreat = threats[Math.floor(Math.random() * threats.length)];
        ticker.innerHTML = `<span class="alert-badge">LIVE THREAT</span> ${randomThreat}`;
        ticker.classList.add('pulse');
        setTimeout(() => ticker.classList.remove('pulse'), 1000);
    }, 8000);
} */

// ======================
// Threat Analyzer (Real API)
// ======================
async function initRadarChart() {
    const ctx = document.getElementById('radarChart');
    if (!ctx) return null;

    try {
        const response = await fetch(CONFIG.API_ENDPOINTS.THREAT_DATA);
        if (!response.ok) throw new Error('API error');
        const data = await response.json();

        return new Chart(ctx, {
            type: 'radar',
            data: {
                labels: data.categories,
                datasets: [{
                    label: 'Threat Level',
                    data: data.values,
                    backgroundColor: 'rgba(0, 255, 0, 0.1)',
                    borderColor: '#00FF00',
                    pointBackgroundColor: '#00FF00',
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
    } catch (error) {
        console.error("Threat API failed:", error);
        return createMockRadarChart(ctx); // Fallback
    }
}


// New calculator component
function initROICalculator() {
    // Sample calculation logic
    document.getElementById('calculate-roi').addEventListener('click', () => {
        const potentialLoss = document.getElementById('potential-loss').value;
        const investment = document.getElementById('solution-cost').value;
        const roi = (potentialLoss * 0.7 - investment) / investment * 100;
        document.getElementById('roi-result').innerHTML = `
            <h4>Estimated ROI: <span class="highlight">${Math.round(roi)}%</span></h4>
            <p>Potential breach cost reduction: $${(potentialLoss * 0.7).toLocaleString()}</p>
        `;
    });
}

// Threat Map 
function initThreatMap() {
    if (!window.d3) {
        console.warn("D3.js not loaded - skipping threat map");
        return;
    }

    // Map dimensions
    const width = document.getElementById('threatMap').clientWidth;
    const height = 500;

    // Create SVG container
    const svg = d3.select("#threatMap")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // Projection and path
    const projection = d3.geoMercator()
        .scale(130)
        .translate([width / 2, height / 1.5]);

    const path = d3.geoPath().projection(projection);

    // Load world map data
    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then(world => {
        const countries = topojson.feature(world, world.objects.countries);

        // Draw countries
        svg.selectAll(".country")
            .data(countries.features)
            .enter()
            .append("path")
            .attr("class", "country")
            .attr("d", path)
            .style("fill", "rgba(136, 146, 176, 0.1)")
            .style("stroke", "rgba(136, 146, 176, 0.3)");

        // Generate fake threat data
        const threatData = [
            { loc: [ -74.006, 40.7128 ], severity: "critical" },  // NYC
            { loc: [ -118.2437, 34.0522 ], severity: "warning" }, // LA
            { loc: [ 139.6917, 35.6895 ], severity: "critical" }, // Tokyo
            { loc: [ -0.1276, 51.5072 ], severity: "warning" },  // London
            { loc: [ 37.6173, 55.7558 ], severity: "neutral" }    // Moscow
        ];

        // Plot threats
        threatData.forEach((threat) => {
            const [x, y] = projection(threat.loc);
            
            svg.append("circle")
                .attr("cx", x)
                .attr("cy", y)
                .attr("r", 8)
                .style("fill", getSeverityColor(threat.severity))
                .style("opacity", 0.7)
                .call(pulse, threat.severity);
        });

        // Simulate real-time updates
        /* setInterval(() => {
            const newThreat = {
                loc: [Math.random() * 360 - 180, Math.random() * 180 - 90],
                severity: ["critical", "warning", "neutral"][Math.floor(Math.random() * 3)]
            };
            
            const [x, y] = projection(newThreat.loc);
            
            svg.append("circle")
                .attr("cx", x)
                .attr("cy", y)
                .attr("r", 0)
                .style("fill", getSeverityColor(newThreat.severity))
                .transition()
                .duration(1000)
                .attr("r", 8)
                .call(pulse, newThreat.severity);
        }, 3000); */
		// ======================
// Threat Map (Live Data)
// ======================
async function initThreatMap() {
    try {
        const response = await fetch('https://api.kreativatech.com/threat-map');
        const threats = await response.json();
        renderThreatMap(threats);
        updateThreatStats(threats.stats);
    } catch (error) {
        console.error("Using mock threat data", error);
        renderThreatMap(CONFIG.FALLBACK_DATA.threats);
    }
}
    });

    // Pulse animation function
    function pulse(selection, severity) {
        if (severity === "neutral") return;
        
        selection.transition()
            .duration(2000)
            .attr("r", 12)
            .style("opacity", 0)
            .transition()
            .duration(1000)
            .attr("r", 8)
            .style("opacity", 0.7)
            .on("end", function() {
                if (severity === "critical") {
                    d3.select(this).call(pulse, severity);
                }
            });
    }

    // Helper function for severity colors
    function getSeverityColor(severity) {
        return {
            critical: "#ff4d4d",
            warning: "#ffcc00",
            neutral: "#00ff00"
        }[severity];
    }

    // Animate stats counters
    animateStats();
}

function animateStats() {
    document.querySelectorAll('[data-count]').forEach(el => {
        const target = +el.getAttribute('data-count');
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        
        let current = start;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                current = target;
            }
            el.textContent = Math.floor(current).toLocaleString();
        }, 16);
    });
}


