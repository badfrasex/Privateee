// DOM Elements
const ageModal = document.getElementById('ageModal');
const confirmAgeBtn = document.getElementById('confirmAge');
const denyAgeBtn = document.getElementById('denyAge');
const cookieConsent = document.getElementById('cookieConsent');
const acceptCookiesBtn = document.getElementById('acceptCookies');
const rejectCookiesBtn = document.getElementById('rejectCookies');
const mainContent = document.getElementById('mainContent');

// Plan selection elements
const planButtons = document.querySelectorAll('.plan');
const statsTabButtons = document.querySelectorAll('.stats-tab');
const actionButtons = document.querySelectorAll('.action-btn');

// State management
let selectedPlan = 'monthly';
let activeStatsTab = 'posts';
let userPreferences = {
    ageVerified: false,
    cookiesAccepted: null,
    likedContent: false,
    savedContent: false
};

// Initialize the application
function init() {
    // Check if user has already verified age
    const ageVerified = localStorage.getItem('ageVerified');
    if (ageVerified === 'true') {
        hideAgeModal();
        showCookieConsent();
    } else {
        showAgeModal();
    }
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize UI state
    initializeUIState();
}

// Event Listeners Setup
function setupEventListeners() {
    // Age verification
    confirmAgeBtn.addEventListener('click', handleAgeConfirmation);
    denyAgeBtn.addEventListener('click', handleAgeDenial);
    
    // Cookie consent
    acceptCookiesBtn.addEventListener('click', handleCookieAcceptance);
    rejectCookiesBtn.addEventListener('click', handleCookieRejection);
    
    // Plan selection
    planButtons.forEach(button => {
        button.addEventListener('click', handlePlanSelection);
    });
    
    // Stats tabs
    statsTabButtons.forEach(button => {
        button.addEventListener('click', handleStatsTabChange);
    });
    
    // Action buttons
    actionButtons.forEach(button => {
        button.addEventListener('click', handleActionButtonClick);
    });
    
    // Read more functionality
    const readMoreBtn = document.querySelector('.read-more-btn');
    if (readMoreBtn) {
        readMoreBtn.addEventListener('click', handleReadMore);
    }
    
    // Promotions toggle
    const promotionsTitle = document.querySelector('.promotions .section-title');
    if (promotionsTitle) {
        promotionsTitle.addEventListener('click', togglePromotions);
    }
}

// Age Verification Handlers
function handleAgeConfirmation() {
    userPreferences.ageVerified = true;
    localStorage.setItem('ageVerified', 'true');
    hideAgeModal();
    showCookieConsent();
}

function handleAgeDenial() {
    // Redirect to a safe page or show exit message
    alert('Você deve ter pelo menos 18 anos para acessar este conteúdo.');
    window.location.href = 'https://www.google.com';
}

function showAgeModal() {
    ageModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function hideAgeModal() {
    ageModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Cookie Consent Handlers
function handleCookieAcceptance() {
    userPreferences.cookiesAccepted = true;
    localStorage.setItem('cookiesAccepted', 'true');
    hideCookieConsent();
    showMainContent();
}

function handleCookieRejection() {
    userPreferences.cookiesAccepted = false;
    localStorage.setItem('cookiesAccepted', 'false');
    hideCookieConsent();
    showMainContent();
}

function showCookieConsent() {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (cookiesAccepted === null) {
        cookieConsent.classList.remove('hidden');
    } else {
        showMainContent();
    }
}

function hideCookieConsent() {
    cookieConsent.classList.add('hidden');
}

function showMainContent() {
    mainContent.classList.remove('hidden');
}

// Plan Selection Handler
function handlePlanSelection(event) {
    const clickedPlan = event.currentTarget;
    const planType = clickedPlan.dataset.plan;
    
    // Remove active class from all plans
    planButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Add active class to clicked plan
    clickedPlan.classList.add('active');
    
    // Update selected plan
    selectedPlan = planType;
    
    // Add visual feedback
    clickedPlan.style.transform = 'scale(0.98)';
    setTimeout(() => {
        clickedPlan.style.transform = '';
    }, 150);
    
    // Log selection (for analytics)
    console.log(`Plan selected: ${planType}`);
    
    // You could trigger a checkout process here
    // triggerCheckout(planType);
}

// Stats Tab Handler
function handleStatsTabChange(event) {
    const clickedTab = event.currentTarget;
    const tabType = clickedTab.dataset.tab;
    
    // Remove active class from all tabs
    statsTabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Add active class to clicked tab
    clickedTab.classList.add('active');
    
    // Update active tab
    activeStatsTab = tabType;
    
    console.log(`Stats tab changed to: ${tabType}`);
}

// Action Button Handler
function handleActionButtonClick(event) {
    const button = event.currentTarget;
    const buttonClass = button.className;
    
    if (buttonClass.includes('like-btn')) {
        handleLikeAction(button);
    } else if (buttonClass.includes('comment-btn')) {
        handleCommentAction();
    } else if (buttonClass.includes('tip-btn')) {
        handleTipAction();
    } else if (buttonClass.includes('save-btn')) {
        handleSaveAction(button);
    }
}

function handleLikeAction(button) {
    userPreferences.likedContent = !userPreferences.likedContent;
    
    if (userPreferences.likedContent) {
        button.style.color = '#ff6b35';
        button.style.transform = 'scale(1.1)';
        setTimeout(() => {
            button.style.transform = '';
        }, 200);
    } else {
        button.style.color = '#666';
    }
    
    console.log(`Content ${userPreferences.likedContent ? 'liked' : 'unliked'}`);
}

function handleCommentAction() {
    // Open comment modal or navigate to comments
    alert('Funcionalidade de comentários em desenvolvimento!');
}

function handleTipAction() {
    // Open tip/gift modal
    showTipModal();
}

function handleSaveAction(button) {
    userPreferences.savedContent = !userPreferences.savedContent;
    
    if (userPreferences.savedContent) {
        button.style.color = '#ff6b35';
        button.style.transform = 'scale(1.1)';
        setTimeout(() => {
            button.style.transform = '';
        }, 200);
    } else {
        button.style.color = '#666';
    }
    
    console.log(`Content ${userPreferences.savedContent ? 'saved' : 'unsaved'}`);
}

// Tip Modal Functions
function showTipModal() {
    const tipModal = createTipModal();
    document.body.appendChild(tipModal);
    document.body.style.overflow = 'hidden';
}

function createTipModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>💝 Enviar Mimo</h2>
            </div>
            <div class="modal-body">
                <p>Escolha o valor do seu mimo para Gaby Lopez:</p>
                <div class="tip-options" style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 16px 0;">
                    <button class="tip-option" data-amount="5">R$ 5,00</button>
                    <button class="tip-option" data-amount="10">R$ 10,00</button>
                    <button class="tip-option" data-amount="25">R$ 25,00</button>
                    <button class="tip-option" data-amount="50">R$ 50,00</button>
                </div>
                <div style="margin-top: 16px;">
                    <label for="customAmount" style="display: block; margin-bottom: 8px; font-size: 14px; color: #666;">Valor personalizado:</label>
                    <input type="number" id="customAmount" placeholder="R$ 0,00" style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-size: 16px;">
                </div>
            </div>
            <div class="modal-actions">
                <button class="btn-primary" onclick="processTip()">Enviar Mimo</button>
                <button class="btn-secondary" onclick="closeTipModal()">Cancelar</button>
            </div>
        </div>
    `;
    
    // Add event listeners for tip options
    modal.querySelectorAll('.tip-option').forEach(option => {
        option.style.cssText = `
            background: linear-gradient(135deg, #ff6b35 0%, #ff8a5b 100%);
            color: white;
            border: none;
            border-radius: 8px;
            padding: 12px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.2s ease;
        `;
        
        option.addEventListener('click', function() {
            const amount = this.dataset.amount;
            document.getElementById('customAmount').value = amount;
            
            // Visual feedback
            modal.querySelectorAll('.tip-option').forEach(opt => {
                opt.style.opacity = '0.7';
            });
            this.style.opacity = '1';
            this.style.transform = 'scale(1.05)';
        });
        
        option.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(255, 107, 53, 0.3)';
        });
        
        option.addEventListener('mouseleave', function() {
            if (this.style.opacity !== '1') {
                this.style.transform = '';
                this.style.boxShadow = '';
            }
        });
    });
    
    return modal;
}

function processTip() {
    const amount = document.getElementById('customAmount').value;
    if (amount && parseFloat(amount) > 0) {
        alert(`Mimo de R$ ${parseFloat(amount).toFixed(2)} enviado com sucesso! 💝`);
        closeTipModal();
    } else {
        alert('Por favor, selecione ou digite um valor válido.');
    }
}

function closeTipModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal && modal.querySelector('.modal-header h2').textContent.includes('Mimo')) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

// Read More Handler
function handleReadMore() {
    const warningText = document.querySelector('.warning-text');
    const readMoreBtn = document.querySelector('.read-more-btn');
    
    if (warningText && readMoreBtn) {
        if (readMoreBtn.textContent === 'Ler mais') {
            warningText.innerHTML = `
                Conteúdo totalmente EXPLÍCITO mostrando tudo <span class="age-restriction">🔞</span><br>
                Vídeos solo e CENAS reais de sexo com parceiros. Conteúdo fetichista, 
                BDSM e muito mais! Acesso ilimitado a fotos e vídeos exclusivos, 
                chat privado 24h e lives especiais apenas para assinantes.
                <br><br>
                ⚠️ Este perfil contém nudez explícita e atividade sexual. 
                Apenas para maiores de 18 anos.
            `;
            readMoreBtn.textContent = 'Ler menos';
        } else {
            warningText.innerHTML = `
                Conteúdo totalmente EXPLÍCITO mostrando tudo 
                <span class="age-restriction">🔞</span> 
                Vídeos solo e CENAS...
            `;
            readMoreBtn.textContent = 'Ler mais';
        }
    }
}

// Promotions Toggle
function togglePromotions() {
    const promotionsSection = document.querySelector('.promotions .plans');
    const chevron = document.querySelector('.chevron-up');
    
    if (promotionsSection && chevron) {
        if (promotionsSection.style.display === 'none') {
            promotionsSection.style.display = 'flex';
            chevron.style.transform = 'rotate(0deg)';
        } else {
            promotionsSection.style.display = 'none';
            chevron.style.transform = 'rotate(180deg)';
        }
    }
}

// Initialize UI State
function initializeUIState() {
    // Set default active plan
    const monthlyPlan = document.querySelector('[data-plan="monthly"]');
    if (monthlyPlan) {
        monthlyPlan.classList.add('active');
    }
    
    // Set default active stats tab
    const postsTab = document.querySelector('[data-tab="posts"]');
    if (postsTab) {
        postsTab.classList.add('active');
    }
}

// Utility Functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(amount);
}

function trackEvent(eventName, eventData) {
    // Analytics tracking would go here
    console.log(`Event: ${eventName}`, eventData);
}

// Error Handling
window.addEventListener('error', function(event) {
    console.error('JavaScript Error:', event.error);
    // You could send this to an error tracking service
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('Page hidden');
    } else {
        console.log('Page visible');
    }
});

// Handle online/offline status
window.addEventListener('online', function() {
    console.log('Connection restored');
});

window.addEventListener('offline', function() {
    console.log('Connection lost');
});
