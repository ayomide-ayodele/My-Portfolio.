// tsParticles Configuration
document.addEventListener('DOMContentLoaded', function() {
    if (typeof tsParticles !== 'undefined') {
        tsParticles.load('particles-js', {
            background: {
                color: {
                    value: "transparent"
                }
            },
            fpsLimit: 60,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: "push"
                    },
                    onHover: {
                        enable: true,
                        mode: "repulse",
                        parallax: {
                            enable: true,
                            force: 60,
                            smooth: 10
                        }
                    },
                    resize: true
                },
                modes: {
                    push: {
                        quantity: 4
                    },
                    repulse: {
                        distance: 100,
                        duration: 0.4
                    },
                    attract: {
                        distance: 200,
                        duration: 0.4,
                        speed: 1
                    }
                }
            },
            particles: {
                color: {
                    value: ["#1F5CB0", "#42A4FF", "#2B7BD8"]
                },
                links: {
                    color: "#42A4FF",
                    distance: 120,
                    enable: true,
                    opacity: 0.3,
                    width: 1,
                    triangles: {
                        enable: true,
                        color: "#42A4FF",
                        opacity: 0.1
                    }
                },
                collisions: {
                    enable: true
                },
                move: {
                    enable: true,
                    speed: 1.5,
                    direction: "none",
                    random: true,
                    straight: false,
                    outModes: {
                        default: "bounce"
                    },
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                },
                number: {
                    density: {
                        enable: true,
                        area: 800
                    },
                    value: window.innerWidth < 768 ? 60 : 80
                },
                opacity: {
                    value: 0.6,
                    random: true,
                    animation: {
                        enable: true,
                        speed: 1,
                        minimumValue: 0.3,
                        sync: false
                    }
                },
                shape: {
                    type: "circle"
                },
                size: {
                    value: { min: 1, max: 3 },
                    random: true,
                    animation: {
                        enable: true,
                        speed: 2,
                        minimumValue: 0.5,
                        sync: false
                    }
                },
                twinkle: {
                    particles: {
                        enable: true,
                        color: "#42A4FF",
                        frequency: 0.05,
                        opacity: 0.7
                    }
                },
                life: {
                    delay: {
                        random: {
                            enable: true,
                            minimumValue: 1
                        },
                        value: 0
                    },
                    duration: {
                        random: {
                            enable: true,
                            minimumValue: 2
                        },
                        value: 0
                    }
                }
            },
            detectRetina: true
        });
    }
});

class EnhancedTimezoneClock {
    constructor() {
        this.timeDisplay = document.getElementById('currentTime');
        this.mobileTimeDisplay = document.getElementById('mobileCurrentTime');
        this.timezoneDropdown = document.getElementById('timezoneDropdown');
        this.timeDisplayBtn = document.getElementById('timeDisplay');
        this.timezoneSearch = document.getElementById('timezoneSearch');
        this.timezoneList = document.querySelector('.timezone-list');
        this.timezone = 'Africa/Lagos';
        this.timezones = [
            { id: 'Africa/Lagos', name: 'Lagos, Nigeria', offset: 'GMT+1' },
            { id: 'America/New_York', name: 'New York, USA', offset: 'GMT-5' },
            { id: 'America/Los_Angeles', name: 'Los Angeles, USA', offset: 'GMT-8' },
            { id: 'Europe/London', name: 'London, UK', offset: 'GMT+0' },
            { id: 'Europe/Paris', name: 'Paris, France', offset: 'GMT+1' },
            { id: 'Asia/Tokyo', name: 'Tokyo, Japan', offset: 'GMT+9' },
            { id: 'Asia/Singapore', name: 'Singapore', offset: 'GMT+8' },
            { id: 'Asia/Dubai', name: 'Dubai, UAE', offset: 'GMT+4' },
            { id: 'Australia/Sydney', name: 'Sydney, Australia', offset: 'GMT+11' },
            { id: 'Pacific/Auckland', name: 'Auckland, New Zealand', offset: 'GMT+13' },
            { id: 'America/Toronto', name: 'Toronto, Canada', offset: 'GMT-5' },
            { id: 'Asia/Shanghai', name: 'Shanghai, China', offset: 'GMT+8' },
            { id: 'Asia/Kolkata', name: 'Mumbai, India', offset: 'GMT+5:30' },
            { id: 'Africa/Johannesburg', name: 'Johannesburg, SA', offset: 'GMT+2' },
            { id: 'America/Sao_Paulo', name: 'Sao Paulo, Brazil', offset: 'GMT-3' }
        ];
        
        this.init();
    }
    
    init() {
        const savedTimezone = localStorage.getItem('portfolio-timezone');
        if (savedTimezone && this.timezones.some(tz => tz.id === savedTimezone)) {
            this.timezone = savedTimezone;
        }
        
        this.setActiveTimezone(this.timezone);
        this.timeDisplayBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.timezoneDropdown.classList.toggle('show');
            if (this.timezoneDropdown.classList.contains('show')) {
                this.timezoneSearch.focus();
            }
        });
        
        document.addEventListener('click', (e) => {
            if (!this.timeDisplayBtn.contains(e.target) && !this.timezoneDropdown.contains(e.target)) {
                this.timezoneDropdown.classList.remove('show');
            }
        });
        
        this.timezoneSearch.addEventListener('input', () => this.filterTimezones());
        this.timezoneList.addEventListener('click', (e) => {
            const option = e.target.closest('.timezone-option');
            if (option) {
                const timezone = option.dataset.timezone;
                this.setTimezone(timezone);
                this.timezoneDropdown.classList.remove('show');
            }
        });
        
        document.querySelectorAll('.mobile-timezone-list .timezone-option').forEach(option => {
            option.addEventListener('click', () => {
                const timezone = option.dataset.timezone;
                this.setTimezone(timezone);
            });
        });
        
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);
    }
    
    setTimezone(timezone) {
        this.timezone = timezone;
        localStorage.setItem('portfolio-timezone', timezone);
        this.setActiveTimezone(timezone);
        this.updateTime();
    }
    
    setActiveTimezone(timezone) {
        document.querySelectorAll('.timezone-option').forEach(option => {
            option.classList.remove('active');
            if (option.dataset.timezone === timezone) {
                option.classList.add('active');
            }
        });
    }
    
    filterTimezones() {
        const searchTerm = this.timezoneSearch.value.toLowerCase();
        const options = this.timezoneList.querySelectorAll('.timezone-option');
        
        options.forEach(option => {
            const text = option.textContent.toLowerCase();
            option.style.display = text.includes(searchTerm) ? 'block' : 'none';
        });
    }
    
    updateTime() {
        try {
            const now = new Date();
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: this.timezone,
                hour12: true,
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short'
            });
            
            const parts = formatter.formatToParts(now);
            let time = '';
            let timeZoneName = '';
            
            parts.forEach(part => {
                if (part.type === 'hour' || part.type === 'minute' || part.type === 'dayPeriod') {
                    time += part.value;
                } else if (part.type === 'literal' && part.value !== ' ') {
                    time += part.value;
                } else if (part.type === 'timeZoneName') {
                    timeZoneName = part.value;
                }
            });
            
            const timezoneData = this.timezones.find(tz => tz.id === this.timezone);
            const displayName = timezoneData ? timezoneData.name.split(',')[0] : timeZoneName;
            
            this.timeDisplay.textContent = `${displayName}: ${time}`;
            if (this.mobileTimeDisplay) {
                this.mobileTimeDisplay.textContent = `${displayName}: ${time}`;
            }
        } catch (error) {
            const now = new Date();
            const time = now.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' });
            this.timeDisplay.textContent = `Local: ${time}`;
            if (this.mobileTimeDisplay) {
                this.mobileTimeDisplay.textContent = `Local: ${time}`;
            }
        }
    }
}

class TitleAnimator {
    constructor() {
        this.titles = [
            'Product Manager',
            'Product Strategist',
            'Product Thinker',
            'Digital Product Specialist',
            'Product Operations Manager',
            'Technical Product Manager',
            'Full-Stack Product Manager',
            'AI & Automation Enthusiast',
            'Product Operations Specialist',
            'Product Analyst',
            'Product Specialist',
            'Product Strategy Associate',
            'Digital Product Manager',
            'AI Product Manager',
            'Product Coordinator',
            'Business Analyst',
            'Digital Transformation Analyst'
        ];
        this.currentIndex = 0;
        this.titleElement = document.getElementById('animatedTitle');
        this.isDeleting = false;
        this.text = '';
        this.typeSpeed = 100;
        this.deleteSpeed = 50;
        this.pauseTime = 8000; // 8 seconds
        this.init();
    }
    
    init() {
        this.type();
    }
    
    type() {
        const currentTitle = this.titles[this.currentIndex];
        
        if (this.isDeleting) {
            this.text = currentTitle.substring(0, this.text.length - 1);
        } else {
            this.text = currentTitle.substring(0, this.text.length + 1);
        }
        
        this.titleElement.textContent = this.text;
        
        let typeDelay = this.isDeleting ? this.deleteSpeed : this.typeSpeed;
        
        if (!this.isDeleting && this.text === currentTitle) {
            typeDelay = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.text === '') {
            this.isDeleting = false;
            this.currentIndex = (this.currentIndex + 1) % this.titles.length;
            typeDelay = 500;
        }
        
        setTimeout(() => this.type(), typeDelay);
    }
}

class FixedMobileNavigation {
    constructor() {
        this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        this.mobileMenuClose = document.getElementById('mobileMenuClose');
        this.mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
        this.mobileMenu = document.getElementById('mobileMenu');
        this.navLinks = document.querySelectorAll('.mobile-nav a');
        this.init();
    }
    
    init() {
        this.mobileMenuBtn.addEventListener('click', () => this.openMenu());
        this.mobileMenuClose.addEventListener('click', () => this.closeMenu());
        this.mobileMenuOverlay.addEventListener('click', () => this.closeMenu());
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.mobileMenu.classList.contains('active')) {
                this.closeMenu();
            }
        });
        // REMOVED: touchmove event prevention that was causing scrolling issues
    }
    
    openMenu() {
        this.mobileMenuOverlay.classList.add('active');
        this.mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeMenu() {
        this.mobileMenuOverlay.classList.remove('active');
        this.mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

class ExperienceModalManager {
    constructor() {
        this.modal = document.getElementById('experienceModal');
        this.modalContent = this.modal.querySelector('.modal-content');
        this.modalOverlay = this.modal.querySelector('.modal-overlay');
        this.modalClose = this.modal.querySelector('.modal-close');
        this.modalDate = document.getElementById('modalDate');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalCompany = document.getElementById('modalCompany');
        this.modalBody = document.getElementById('modalBody');
        this.experienceData = {
            experience0: {
                date: 'APRIL 2026 - PRESENT',
                title: 'Product & Strategy Manager',
                company: '',
                content: `
                    <p>At PhlipTech, I contribute to product and strategy initiatives across 5+ digital product engagements spanning fintech, healthtech, telemedicine, mental health, and education.</p>
                    <p>I work across the full product lifecycle, from research and discovery to requirements definition, delivery coordination, testing, and iteration, translating business and user needs into actionable product outcomes.</p>
                    <p><strong>Key Achievements:</strong></p>
                    <ul>
                        <li>Drove product discovery and strategic positioning across 5+ engagements by conducting competitor analysis, market research, and feasibility assessments, informing go-to-market and prioritization decisions for fintech, healthtech, and education products.</li>
                        <li>Translated stakeholder requirements into clear product direction by drafting PRDs, BRDs, user stories, and acceptance criteria, reducing ambiguity for engineering and design teams during handoff.</li>
                        <li>Managed delivery execution through Jira ticket creation, backlog management, and sprint coordination, keeping cross-functional teams (engineers, designers, QA, business analysts, founders, and clients) aligned on scope and priorities.</li>
                        <li>Supported product quality by creating test cases, documenting bugs and edge cases, and validating implemented features against requirements, catching issues before release.</li>
                        <li>Contributed to core product flows across KYC, investment, savings, withdrawal, bank-linking, payment, authentication, and profile management, translating complex financial and healthcare requirements into user-facing experiences.</li>
                        <li>Documented third-party integration and API-dependent workflows, translating technical constraints into clear product specifications for engineering teams.</li>
                    </ul>
                `
            },
            experience1: {
                date: 'AUGUST 2025 - NOVEMBER 2025',
                title: 'Product Manager (HNG)',
                company: 'Intern',
                content: `
                    <p>At HNG, I worked on Telex, a multi-platform SaaS product, as an integral member of a cross-functional team. My role centered on bridging product strategy with execution. I triaged over 30 tickets, authored sections of structured PRDs, and helped define sprint goals to keep delivery on track.</p>
                    <p>Beyond daily coordination with engineers and QA, I engaged deeply in the discovery process, most notably through an exploratory "unknown product" initiative. This work honed my ability to frame problems, conduct user research, and ideate solutions from first principles. The experience gave me a practical, end-to-end understanding of how product teams transform ambiguity into shipped software.</p>
                    <p><strong>Key Achievements:</strong></p>
                    <ul>
                        <li>Successfully triaged and prioritized 30+ product tickets</li>
                        <li>Authored comprehensive PRD sections for key features</li>
                        <li>Facilitated sprint planning and goal definition</li>
                        <li>Conducted user research for exploratory product initiatives</li>
                    </ul>
                `
            },
            experience2: {
                date: 'SEPTEMBER 2025 - NOVEMBER 2025',
                title: 'Campus Director (United Nations Academic Impact)',
                company: '',
                content: `
                    <p>At the United Nations Academic Impact, I led the end-to-end discovery and validation of Ecoloop: a digital product concept designed to address weight management challenges for residents in Lagos State. From defining the product scope to conducting over 50 user interviews, I grounded the initiative in real behaviors and needs, moving beyond assumptions.</p>
                    <p>I transformed these insights into a high-fidelity Figma prototype, using it to test usability, validate solution clarity, and refine the concept through direct user feedback.</p>
                    <p>Alongside driving this product process, I served as Campus Director, where I coordinated a cohort working on multiple impact projects, ensuring alignment, tracking progress, and supporting collaboration across initiatives.</p>
                    <p><strong>Key Achievements:</strong></p>
                    <ul>
                        <li>Conducted 50+ user interviews for product discovery</li>
                        <li>Developed high-fidelity Figma prototypes for user testing</li>
                        <li>Led cross-functional team of 20+ members</li>
                        <li>Coordinated multiple impact projects simultaneously</li>
                    </ul>
                `
            },
            experience3: {
                date: 'SEPTEMBER 2024 - NOVEMBER 2024',
                title: 'Product Management (GENZiFY Africa)',
                company: 'Extern',
                content: `
                    <p>During my product management externship at Genzify Africa, I supported the development of customer-facing features for a growing e-commerce platform. Working under the guidance of senior product managers, I contributed directly to the product lifecycle by drafting product requirement documents (PRDs), proposing feature improvements, and creating clear product documentation for engineering and design teams.</p>
                    <p>I engaged in real-world problem discovery, requirement definition, and cross-functional collaboration, applying agile frameworks and product tools in a live product environment. This experience provided me with a practical, output-oriented foundation in product management and deepened my ability to contribute effectively within a structured product team.</p>
                    <p><strong>Key Achievements:</strong></p>
                    <ul>
                        <li>Drafted comprehensive PRDs for new features</li>
                        <li>Proposed data-driven feature improvements</li>
                        <li>Created technical documentation for engineering teams</li>
                        <li>Participated in agile ceremonies and sprint planning</li>
                    </ul>
                `
            },
            experience4: {
                date: 'SEPTEMBER 2019 - JULY 2022',
                title: 'Operations & Systems Manager',
                company: '',
                content: `
                    <p>As an Operations and Systems Manager, I orchestrated the operational roadmap for our academic cycles and technology initiatives, focusing on modernizing systems to support sustained growth. This strategic alignment directly contributed to steady increases in student enrollment over time.
                    </p>
                    <p>A key initiative I spearheaded was the launch of a new Learning Management System (LMS) platform, designed to solve long-standing challenges with manual grading and low digital engagement. The introduction of remote testing and personalized learning tracks within the platform successfully reduced grading time by an average of 10 hours per teacher each week.
                    </p>
                    <p>Additionally, I served as the de facto data product owner, transforming raw system and student metrics into an actionable strategy. This work closed critical insight gaps and provided a clearer view of academic performance, ultimately leading to a measurable increase in parent satisfaction.
                    </p>
                    <p><strong>Key Achievements:</strong></p>
                    <ul>
                        <li>Modernized academic operations, driving steady enrollment increases.
                        </li>
                        <li>Launched an LMS that saved teachers 10+ hours weekly.
                        </li>
                        <li>Transformed raw data into a strategy, boosting parent satisfaction.</li>
                        <li> Spearheaded platform launch to solve low digital engagement.
                        </li>
                    </ul>
                `
            }
        };
        
        this.init();
    }
    
    init() {
        document.querySelectorAll('.read-more').forEach(button => {
            button.addEventListener('click', (e) => {
                const modalId = e.currentTarget.dataset.modal;
                this.openModal(modalId);
            });
        });
        document.querySelectorAll('.experience-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.read-more')) {
                    const modalId = e.currentTarget.dataset.modal;
                    this.openModal(modalId);
                }
            });
        });
        this.modalClose.addEventListener('click', () => this.closeModal());
        this.modalOverlay.addEventListener('click', () => this.closeModal());
        this.modalContent.addEventListener('click', (e) => e.stopPropagation());
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }
    
    openModal(modalId) {
        const data = this.experienceData[modalId];
        if (!data) return;
        this.modalDate.textContent = data.date;
        this.modalTitle.textContent = data.title;
        this.modalCompany.textContent = data.company;
        this.modalBody.innerHTML = data.content;
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            this.observerOptions
        );
        this.init();
    }
    
    init() {
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
            this.observer.observe(el);
        });
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                this.observer.unobserve(entry.target);
            }
        });
    }
}

class MetricCounter {
    constructor() {
        this.metrics = document.querySelectorAll('.metric-number');
        this.observerOptions = { threshold: 0.5 };
        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            this.observerOptions
        );
        this.init();
    }
    
    init() {
        this.metrics.forEach(metric => this.observer.observe(metric));
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.animateCounter(entry.target);
                this.observer.unobserve(entry.target);
            }
        });
    }
    
    animateCounter(element) {
        const target = parseInt(element.dataset.target);
        const duration = 2000;
        const startTime = Date.now();
        const startValue = 0;
        const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = easeOutQuart(progress);
            const current = Math.floor(target * ease);
            element.textContent = `${current}+`;
            if (progress < 1) requestAnimationFrame(animate);
        };
        animate();
    }
}

class HorizontalScrollManager {
constructor() {
this.scrollContainers = [
{ container: '.experience-scroll', containerParent: '.experience-container' },
{ container: '.cases-scroll', containerParent: '.cases-container' },
{ container: '.skills-scroll', containerParent: '.skills-container' }
];
this.init();
}

init() {
this.scrollContainers.forEach(config => {
const container = document.querySelector(config.container);
if (!container) return;

const parent = container.closest(config.containerParent);
if (!parent) return;

const prevBtn = parent.querySelector('.scroll-btn.prev');
const nextBtn = parent.querySelector('.scroll-btn.next');

const getScrollAmount = () => {
const firstCard = container.querySelector('.experience-card, .case-card, .skill-card');
if (!firstCard) return 300; // fallback
const style = getComputedStyle(container);
const gap = parseFloat(style.gap) || parseFloat(style.columnGap) || 20;
return firstCard.offsetWidth + gap;
};

if (prevBtn) {
prevBtn.addEventListener('click', () => {
container.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
});
}
if (nextBtn) {
nextBtn.addEventListener('click', () => {
container.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
});
}
});
}
}

class ContactFormHandler {
constructor() {
this.form = document.getElementById('contactForm');
this.init();
}

init() {
if (!this.form) return;
this.form.addEventListener('submit', (e) => {
e.preventDefault();
const submitBtn = this.form.querySelector('button[type="submit"]');
const originalText = submitBtn.innerHTML;
submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
submitBtn.disabled = true;

// Formspree endpoint
const formspreeEndpoint = 'https://formspree.io/f/mrebgzvk';

// Create FormData from the form
const formData = new FormData(this.form);

// Send to Formspree
fetch(formspreeEndpoint, {
method: 'POST',
body: formData,
headers: {
'Accept': 'application/json'
}
})

.then(response => {
if (response.ok) {
// Show custom success message
const successDiv = document.getElementById('formSuccess');
successDiv.style.display = 'flex';
this.form.reset();
// Hide after 4 seconds
setTimeout(() => {
successDiv.style.display = 'none';
}, 4000);
} else {
throw new Error('Form submission failed');
}
})
.catch(error => {
alert('Oops! There was a problem sending your message. Please try again.');
console.error('Form submission error:', error);
})
.finally(() => {
submitBtn.innerHTML = originalText;
submitBtn.disabled = false;
});
});
}
}

class NavigationScroll {
constructor() {
this.navLinks = document.querySelectorAll('a[href^="#"]');
this.sections = document.querySelectorAll('section');
this.header = document.querySelector('header');
this.init();
}

init() {
this.navLinks.forEach(link => {
link.addEventListener('click', (e) => {
e.preventDefault();
const targetId = link.getAttribute('href');
if (targetId === '#') return;
const target = document.querySelector(targetId);
if (target) {
const headerHeight = this.header.offsetHeight;
const targetPosition = target.offsetTop - headerHeight;
window.scrollTo({ top: targetPosition, behavior: 'smooth' });
}
});
});
window.addEventListener('scroll', () => this.updateActiveNav());
this.updateActiveNav();
window.addEventListener('scroll', () => {
if (window.scrollY > 50) {
this.header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
} else {
this.header.style.boxShadow = 'none';
}
});
}

updateActiveNav() {
let current = '';
const scrollPosition = window.scrollY + this.header.offsetHeight + 100;
this.sections.forEach(section => {
const sectionTop = section.offsetTop;
if (scrollPosition >= sectionTop) {
current = section.getAttribute('id');
}
});
this.navLinks.forEach(link => {
link.classList.remove('active');
if (link.getAttribute('href') === `#${current}`) {
link.classList.add('active');
}
});
document.querySelectorAll('.mobile-nav a').forEach(link => {
link.classList.remove('active');
if (link.getAttribute('href') === `#${current}`) {
link.classList.add('active');
}
});
}
}

/* ===== ABOUT READ MORE / READ LESS (mobile/tablet) ===== */
class AboutCollapseManager {
    constructor() {
        this.init();
    }
    init() {
        const profileContent = document.querySelector('.profile-content');
        if (!profileContent) return;
        const paragraphs = profileContent.querySelectorAll('p');
        if (paragraphs.length <= 1) return; // nothing to collapse
        const firstP = paragraphs[0];
        const hiddenDiv = document.createElement('div');
        hiddenDiv.className = 'about-hidden-content';
        // move paragraphs after the first one into the hidden container
        for (let i = 1; i < paragraphs.length; i++) {
            hiddenDiv.appendChild(paragraphs[i]);
        }
        firstP.insertAdjacentElement('afterend', hiddenDiv);
        const btn = document.createElement('button');
        btn.className = 'about-read-more-btn';
        btn.textContent = 'Read More';
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-label', 'Read more about me');
        hiddenDiv.insertAdjacentElement('afterend', btn);
        btn.addEventListener('click', () => {
            const expanded = hiddenDiv.classList.toggle('expanded');
            btn.textContent = expanded ? 'Read Less' : 'Read More';
            btn.setAttribute('aria-expanded', expanded);
        });
    }
}

/* ===== CERTIFICATIONS COLLAPSE (mobile/tablet) ===== */
class CertificationsCollapseManager {
    constructor() {
        this.init();
    }
    init() {
        const educationList = document.querySelector('.education-list');
        if (!educationList) return;
        const items = educationList.querySelectorAll('.education-item');
        if (items.length <= 4) return; // need education + at least 3 certifications + hidden ones
        // Items: index 0 = education, 1-3 = first three certifications, the rest are hidden
        const hiddenItems = [];
        for (let i = 4; i < items.length; i++) {
            hiddenItems.push(items[i]);
        }
        if (hiddenItems.length === 0) return;
        // wrapper <li> that will hold the hidden certifications
        const wrapperLi = document.createElement('li');
        wrapperLi.className = 'education-item';
        const hiddenUl = document.createElement('ul');
        hiddenUl.className = 'certifications-hidden-list';
        wrapperLi.appendChild(hiddenUl);
        // move the hidden <li>s into the inner <ul>
        hiddenItems.forEach(item => hiddenUl.appendChild(item));
        // insert after the 3rd certification (index 3)
        const thirdCertItem = items[3];
        thirdCertItem.insertAdjacentElement('afterend', wrapperLi);
        // create toggle button
        const btn = document.createElement('button');
        btn.className = 'certifications-toggle-btn';
        btn.textContent = 'View All Certifications';
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-label', 'View all certifications');
        educationList.insertAdjacentElement('afterend', btn);
        btn.addEventListener('click', () => {
            const expanded = hiddenUl.classList.toggle('expanded');
            btn.textContent = expanded ? 'Show Less' : 'View All Certifications';
            btn.setAttribute('aria-expanded', expanded);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize EnhancedTimezoneClock
        new EnhancedTimezoneClock();

        // Initialize TitleAnimator
        new TitleAnimator();

        // Initialize FixedMobileNavigation
        new FixedMobileNavigation();

        // Initialize ExperienceModalManager
        new ExperienceModalManager();

        // Initialize ScrollAnimations
        new ScrollAnimations();

        // Initialize MetricCounter
        new MetricCounter();

        // Initialize HorizontalScrollManager
        new HorizontalScrollManager();

        // Initialize ContactFormHandler
        new ContactFormHandler();

        // Initialize NavigationScroll
        new NavigationScroll();

        // Set current year in footer
        document.getElementById('currentYear').textContent = new Date().getFullYear();

        // Prevent horizontal scroll on mobile
        const preventHorizontalScroll = () => {
            if (window.innerWidth <= 480) {
                document.body.style.overflowX = 'hidden';
            } else {
                document.body.style.overflowX = '';
            }
        };
        window.addEventListener('resize', preventHorizontalScroll);
        preventHorizontalScroll();

        // --- NEW COLLAPSE FEATURES ---
        new AboutCollapseManager();
        new CertificationsCollapseManager();
    } catch (error) {
        console.error('Error initializing portfolio:', error);
    }
});