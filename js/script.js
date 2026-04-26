// Scroll Reveal Observer
const initReveal = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// Mobile Menu Toggle
const navSlide = () => {
    const burger = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav-links');
    
    if (!burger || !nav) return;

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
        });
    });
}

// Generate Resume PDF
const generateResume = () => {
    const originalTitle = document.title;
    document.title = "Cindy_Hoang_Performance_Marketing_Resume";
    window.print();
    document.title = originalTitle;
}

// Refined Sakura Animation
const createPetal = () => {
    const container = document.getElementById('sakura-bg');
    if (!container) return;

    const maxPetals = window.innerWidth < 768 ? 8 : 20;
    if (container.children.length > maxPetals) return;

    const petal = document.createElement('div');
    petal.classList.add('petal');

    // Randomize shape slightly
    const size = Math.random() * 15 + 10 + 'px';
    const left = Math.random() * 100 + '%';
    const duration = Math.random() * 15 + 15 + 's';
    const delay = Math.random() * 10 + 's';

    petal.style.width = size;
    petal.style.height = size;
    petal.style.left = left;
    petal.style.top = '-10%';
    petal.style.opacity = Math.random() * 0.3 + 0.1;
    petal.style.animation = `falling ${duration} linear infinite ${delay}`;

    container.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, (parseFloat(duration) + parseFloat(delay)) * 1000);
}

// Chart.js Initialization
let roiChart;
const initCharts = () => {
    const ctx = document.getElementById('roiChart');
    if (!ctx) return;

    if (roiChart) roiChart.destroy();

    roiChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'ROAS Improvement',
                data: [2.1, 2.8, 3.2, 3.8, 4.5, 4.8],
                borderColor: '#E8A2AF',
                backgroundColor: 'rgba(232, 162, 175, 0.1)',
                borderWidth: 4,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: '#E8A2AF',
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index',
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1D1D1F',
                    padding: 12,
                    titleFont: { size: 14, weight: 'bold' },
                    bodyFont: { size: 13 },
                    displayColors: false,
                    callbacks: {
                        label: function(context) { return `ROAS: ${context.parsed.y}x`; }
                    }
                }
            },
            scales: {
                y: {
                    display: false,
                    beginAtZero: true
                },
                x: {
                    grid: { display: false },
                    ticks: { 
                        font: { family: 'Inter', size: 11, weight: '600' },
                        color: '#86868B'
                    }
                }
            }
        }
    });
}

// Smooth Scroll
const initScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add Keyframes
const addKeyframes = () => {
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes falling {
            0% { transform: translateY(0) rotate(0deg) translateX(0); opacity: 0; }
            10% { opacity: 0.3; }
            90% { opacity: 0.3; }
            100% { transform: translateY(110vh) rotate(720deg) translateX(100px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    addKeyframes();
    navSlide();
    initScroll();
    initCharts();
    initReveal();
    
    for(let i = 0; i < 10; i++) {
        createPetal();
    }
    setInterval(createPetal, 3000);

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(initCharts, 250);
    });
});
