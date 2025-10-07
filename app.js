// Raretail Comprehensive Presentation Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initNavigation();
    initAnimatedCounters();
    initScrollAnimations();
    initInteractiveElements();
    initTableInteractions();
    initChartInteractions();
    initProgressiveDisclosure();
    initResponsiveFeatures();
});

// Enhanced Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effects and active section highlighting
    window.addEventListener('scroll', function() {
        // Add scrolled class to navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Highlight active section in navigation
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Enhanced animated counters for statistics
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    const counterOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseFloat(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    }, counterOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000; // 2 seconds
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format the number display
        let displayValue;
        if (target >= 10) {
            displayValue = current.toFixed(1);
        } else {
            displayValue = current.toFixed(2);
        }
        
        element.textContent = displayValue;
        
        // Add pulsing effect when animation completes
        if (current >= target) {
            element.style.animation = 'pulse 0.5s ease-in-out';
        }
    }, stepTime);
}

// Enhanced scroll animations for all elements
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.summary-card, .pillar-card, .channel-card, .persona-card, ' +
        '.timeline-item, .swot-card, .risk-item, .rec-card, .metric-card, ' +
        '.demo-card, .psycho-item, .table-container, .chart-container'
    );
    
    const animationOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'all 0.6s ease';
                
                // Add staggered delay for grid items
                const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 100;
                entry.target.style.transitionDelay = `${delay}ms`;
            }
        });
    }, animationOptions);
    
    // Initially hide elements and set up animation
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        animationObserver.observe(element);
    });
}

// Interactive elements enhancement
function initInteractiveElements() {
    // Enhanced hover effects for cards
    const cards = document.querySelectorAll(
        '.summary-card, .pillar-card, .channel-card, .persona-card, ' +
        '.swot-card, .risk-category, .rec-card, .metric-card, .demo-card'
    );
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            this.style.transition = 'all 0.3s ease';
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            this.style.zIndex = '1';
        });
    });
    
    // Interactive statistics with additional info
    const statNumbers = document.querySelectorAll('.stat-number, .highlight-number, .stat-value');
    statNumbers.forEach(stat => {
        stat.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.3s ease';
            this.style.cursor = 'pointer';
        });
        
        stat.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // SWOT cards interactive features
    const swotCards = document.querySelectorAll('.swot-card');
    swotCards.forEach(card => {
        card.addEventListener('click', function() {
            // Toggle detailed view
            const isExpanded = this.classList.contains('expanded');
            
            // Remove expanded state from all cards
            swotCards.forEach(c => c.classList.remove('expanded'));
            
            if (!isExpanded) {
                this.classList.add('expanded');
                this.style.transform = 'scale(1.05)';
                this.style.zIndex = '20';
            } else {
                this.style.transform = 'scale(1)';
                this.style.zIndex = '1';
            }
        });
    });
}

// Table interactions
function initTableInteractions() {
    const tables = document.querySelectorAll('.data-table');
    
    tables.forEach(table => {
        const rows = table.querySelectorAll('tbody tr');
        
        rows.forEach(row => {
            row.addEventListener('mouseenter', function() {
                this.style.backgroundColor = 'rgba(212, 175, 55, 0.2)';
                this.style.transform = 'scale(1.02)';
                this.style.transition = 'all 0.2s ease';
                this.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
            });
            
            row.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '';
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '';
            });
        });
        
        // Make tables sortable (simple implementation)
        const headers = table.querySelectorAll('th');
        headers.forEach((header, index) => {
            header.style.cursor = 'pointer';
            header.addEventListener('click', function() {
                sortTable(table, index);
            });
        });
    });
}

function sortTable(table, columnIndex) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    // Simple text-based sorting
    rows.sort((a, b) => {
        const aText = a.cells[columnIndex].textContent.trim();
        const bText = b.cells[columnIndex].textContent.trim();
        
        // Try to parse as numbers first
        const aNum = parseFloat(aText.replace(/[$,%]/g, ''));
        const bNum = parseFloat(bText.replace(/[$,%]/g, ''));
        
        if (!isNaN(aNum) && !isNaN(bNum)) {
            return bNum - aNum; // Descending order for numbers
        }
        
        return aText.localeCompare(bText);
    });
    
    // Clear and re-append sorted rows
    rows.forEach(row => tbody.appendChild(row));
    
    // Visual feedback
    const header = table.querySelectorAll('th')[columnIndex];
    header.style.backgroundColor = 'rgba(212, 175, 55, 0.3)';
    setTimeout(() => {
        header.style.backgroundColor = '';
    }, 1000);
}

// Chart interactions
function initChartInteractions() {
    const chartImages = document.querySelectorAll('.chart-image');
    
    chartImages.forEach(image => {
        image.style.cursor = 'pointer';
        image.addEventListener('click', function() {
            openImageModal(this);
        });
        
        image.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        });
        
        image.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '';
        });
    });
}

function openImageModal(image) {
    // Create modal for full-size image viewing
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 3000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modalImage = document.createElement('img');
    modalImage.src = image.src;
    modalImage.alt = image.alt;
    modalImage.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 8px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    `;
    
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '×';
    closeButton.style.cssText = `
        position: absolute;
        top: 20px;
        right: 30px;
        background: none;
        border: none;
        color: white;
        font-size: 3rem;
        cursor: pointer;
        z-index: 3001;
    `;
    
    modal.appendChild(modalImage);
    modal.appendChild(closeButton);
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Close handlers
    function closeModal() {
        modal.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
    
    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Progressive disclosure functionality
function initProgressiveDisclosure() {
    // Expandable SWOT items
    const swotItems = document.querySelectorAll('.swot-list li');
    swotItems.forEach(item => {
        item.addEventListener('click', function() {
            const details = getSwotDetails(this.textContent);
            if (details) {
                showDetailPopup(details, this);
            }
        });
        
        item.style.cursor = 'pointer';
        item.title = 'Click for more details';
    });
    
    // Expandable recommendation cards
    const recCards = document.querySelectorAll('.rec-card');
    recCards.forEach(card => {
        card.addEventListener('click', function() {
            toggleRecommendationDetails(this);
        });
    });
    
    // Interactive risk items
    const riskItems = document.querySelectorAll('.risk-item');
    riskItems.forEach(item => {
        item.addEventListener('click', function() {
            toggleRiskDetails(this);
        });
        
        item.style.cursor = 'pointer';
    });
}

function getSwotDetails(text) {
    const details = {
        'Authentic Coorg Heritage': 'Raretail leverages 150 years of coffee heritage from the Western Ghats, providing authentic provenance that competitors cannot replicate.',
        'Growing Luxury Market': 'The global luxury coffee market is expanding at 12.8% CAGR, with premium segments showing resilience even during economic downturns.',
        'New Brand Recognition': 'As a startup brand, Raretail faces the challenge of building awareness in a crowded market dominated by established players.',
        'Established Competitors': 'Major coffee companies have significant resources, distribution networks, and brand recognition that pose competitive threats.'
    };
    
    for (const [key, value] of Object.entries(details)) {
        if (text.includes(key)) {
            return value;
        }
    }
    return null;
}

function showDetailPopup(details, element) {
    // Remove existing popup
    const existingPopup = document.querySelector('.detail-popup');
    if (existingPopup) {
        existingPopup.remove();
    }
    
    const popup = document.createElement('div');
    popup.className = 'detail-popup';
    popup.style.cssText = `
        position: absolute;
        background: white;
        border: 2px solid #D4AF37;
        border-radius: 8px;
        padding: 1rem;
        max-width: 300px;
        font-size: 0.9rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: fadeInUp 0.3s ease;
    `;
    
    popup.textContent = details;
    
    // Position popup
    const rect = element.getBoundingClientRect();
    popup.style.top = (rect.bottom + window.scrollY + 10) + 'px';
    popup.style.left = (rect.left + window.scrollX) + 'px';
    
    document.body.appendChild(popup);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (popup.parentNode) {
            popup.remove();
        }
    }, 5000);
    
    // Remove on click outside
    document.addEventListener('click', function(e) {
        if (!popup.contains(e.target) && e.target !== element) {
            popup.remove();
        }
    });
}

function toggleRecommendationDetails(card) {
    const existingDetails = card.querySelector('.rec-details');
    
    if (existingDetails) {
        existingDetails.remove();
        card.style.transform = '';
    } else {
        const details = document.createElement('div');
        details.className = 'rec-details';
        details.style.cssText = `
            margin-top: 1rem;
            padding: 1rem;
            background: rgba(27, 67, 50, 0.05);
            border-radius: 6px;
            font-size: 0.9rem;
            line-height: 1.6;
            color: #8B4513;
            animation: fadeIn 0.3s ease;
        `;
        
        // Add specific details based on recommendation
        const title = card.querySelector('h4').textContent;
        const detailText = getRecommendationDetails(title);
        details.textContent = detailText;
        
        card.appendChild(details);
        card.style.transform = 'scale(1.02)';
    }
}

function getRecommendationDetails(title) {
    const details = {
        'Secure Funding & Partnerships': 'Focus on angel investors and VCs with portfolio companies in luxury goods or F&B. Target estate partnerships in Coorg with proven track records in quality and ethical practices.',
        'Launch Premium E-commerce Platform': 'Implement luxury UX/UI design, educational content about civet coffee production, sustainability story, and premium packaging options.',
        'Establish Hospitality Partnerships': 'Target 5-star hotels, Michelin-starred restaurants, and luxury resorts. Provide training for staff and exclusive menu positioning.',
        'Execute European Expansion': 'Start with UK and Germany markets, establish local distribution partnerships, and adapt marketing for regional preferences.'
    };
    
    return details[title] || 'Detailed implementation strategy available in full business plan.';
}

function toggleRiskDetails(item) {
    const existingDetails = item.querySelector('.risk-details');
    
    if (existingDetails) {
        existingDetails.remove();
    } else {
        const details = document.createElement('div');
        details.className = 'risk-details';
        details.style.cssText = `
            margin-top: 0.5rem;
            padding: 0.75rem;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 4px;
            font-size: 0.85rem;
            border-left: 3px solid #D4AF37;
        `;
        
        details.innerHTML = '<strong>Additional Mitigation:</strong> Regular risk assessment reviews, contingency planning, and adaptive strategy implementation.';
        item.appendChild(details);
    }
}

// Responsive features
function initResponsiveFeatures() {
    // Handle mobile navigation
    if (window.innerWidth <= 768) {
        const navBrand = document.querySelector('.nav-brand');
        const mobileMenuButton = document.createElement('button');
        mobileMenuButton.innerHTML = '☰';
        mobileMenuButton.style.cssText = `
            background: none;
            border: none;
            font-size: 1.5rem;
            color: var(--color-forest-green);
            cursor: pointer;
        `;
        
        navBrand.appendChild(mobileMenuButton);
        
        mobileMenuButton.addEventListener('click', function() {
            const navMenu = document.getElementById('nav-menu');
            if (navMenu.style.display === 'none' || !navMenu.style.display) {
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '70px';
                navMenu.style.left = '0';
                navMenu.style.right = '0';
                navMenu.style.background = 'white';
                navMenu.style.padding = '1rem';
                navMenu.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navMenu.style.display = 'none';
            }
        });
    }
    
    // Adjust hero stats layout on mobile
    window.addEventListener('resize', function() {
        const heroStats = document.querySelector('.hero-stats');
        if (window.innerWidth <= 768) {
            heroStats.style.flexDirection = 'column';
            heroStats.style.gap = '1.5rem';
        } else {
            heroStats.style.flexDirection = 'row';
            heroStats.style.gap = '3rem';
        }
    });
}

// Utility function for smooth scrolling to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Add progress indicator
function addProgressIndicator() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 70px;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #D4AF37, #1B4332);
        z-index: 999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize progress indicator
addProgressIndicator();

// Add CSS for animations
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    .swot-card.expanded {
        transform: scale(1.05) !important;
        z-index: 20 !important;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25) !important;
    }
    
    .detail-popup {
        animation: fadeInUp 0.3s ease;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

document.head.appendChild(additionalStyles);

// Initialize everything when DOM is ready
console.log('Raretail Comprehensive Presentation Interactive Features Loaded');

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    const sections = ['hero', 'executive-summary', 'market-analysis', 'global-expansion', 
                     'consumer-insights', 'swot-analysis', 'competitive-analysis', 
                     'brand-positioning', 'financial-projections', 'marketing-strategy', 
                     'implementation', 'risk-analysis', 'recommendations'];
    
    const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
    });
    
    const currentIndex = sections.indexOf(currentSection);
    
    if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
        e.preventDefault();
        scrollToSection(sections[currentIndex + 1]);
    } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        e.preventDefault();
        scrollToSection(sections[currentIndex - 1]);
    }
});