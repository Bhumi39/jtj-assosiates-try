// ============== INITIAL SETUP ==============
document.addEventListener('DOMContentLoaded', () => {
    setupCallbackForm();
    setupSmoothScroll();
    initChatWelcome();
});

// ============== CALL BACK FORM ==============
function setupCallbackForm() {
    const form = document.getElementById('callbackForm');
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();

        const nameInput = form.querySelector('input[placeholder="Your Name"]');
        const phoneInput = form.querySelector('input[placeholder="Phone Number"]');

        const name = nameInput ? nameInput.value.trim() : '';
        const phone = phoneInput ? phoneInput.value.trim() : '';

        if (!phone) {
            alert('Please enter your phone number so we can call you back.');
            return;
        }

        alert(`Thank you ${name || 'Client'}! Your call back request (${phone}) has been submitted. We will contact you soon.`);
        form.reset();
    });
}

// ============== SMOOTH SCROLL FOR HEADER LINKS ==============
function setupSmoothScroll() {
    const links = document.querySelectorAll('.nav-links a[href^="#"], .cta-btn[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const id = link.getAttribute('href');
            const target = document.querySelector(id);
            if (!target) return;

            // simple smooth scroll (header static so no offset needed)
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// ============== CHAT WIDGET ==============
function toggleChat() {
    const box = document.getElementById('chatBox');
    if (!box) return;
    box.style.display = (box.style.display === 'flex') ? 'none' : 'flex';
}

function handleKey(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
    }
}

function sendMessage() {
    const input = document.getElementById('userInput');
    const content = document.getElementById('chatContent');
    if (!input || !content) return;

    const text = input.value.trim();
    if (!text) return;

    // show user message
    const userDiv = document.createElement('div');
    userDiv.className = 'user-msg';
    userDiv.textContent = text;
    content.appendChild(userDiv);

    input.value = '';
    content.scrollTop = content.scrollHeight;

    // simple auto reply
    setTimeout(() => {
        const reply = document.createElement('div');
        reply.className = 'bot-msg';
        reply.textContent = getBotReply(text.toLowerCase());
        content.appendChild(reply);
        content.scrollTop = content.scrollHeight;
    }, 800);
}

function getBotReply(msg) {
    if (msg.includes('audit')) {
        return 'We provide statutory, internal and tax audits with detailed reporting.';
    }
    if (msg.includes('gst')) {
        return 'We assist with GST registration, returns and audits for all types of businesses.';
    }
    if (msg.includes('tax') || msg.includes('itr')) {
        return 'We help with Income Tax planning, ITR filing and assessments.';
    }
    if (msg.includes('call') || msg.includes('contact')) {
        return 'You can also fill the Request Call Back form with your number. Our team will call you shortly.';
    }
    return 'Thanks for contacting JTJ & Associates. Our team will get back to you shortly.';
}

// optional: initial welcome line in chat
function initChatWelcome() {
    const content = document.getElementById('chatContent');
    if (!content) return;
    // already has one default message in HTML, so no extra needed
}
