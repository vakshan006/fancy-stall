document.addEventListener('DOMContentLoaded', () => {

    // ========== NAVBAR SCROLL ==========
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ========== MOBILE MENU ==========
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => navLinks.classList.remove('open'));
        });
    }

    // ========== SCROLL REVEAL ==========
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // ========== PRODUCT FILTER ==========
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            productCards.forEach((card, i) => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                    card.classList.add('visible');
                    card.style.animationDelay = (i * 0.08) + 's';
                } else {
                    card.classList.add('hidden');
                    card.classList.remove('visible');
                }
            });
        });
    });

    // ========== LUCKY DRAW ==========
    const bags = document.querySelectorAll('.lucky-bag');
    const luckyResult = document.getElementById('lucky-result');
    const prizeTitle = document.getElementById('prize-title');
    const prizeDesc = document.getElementById('prize-desc');
    let hasDrawn = false;

    // Each bag number (1-12) has a FIXED prize
    // Numbers 4, 8, 11 = "Try Again" | Rest = actual product prizes
    const prizeMap = {
        1:  { title: "📿 Coin Chain!", desc: "You won a beautiful gold Coin Chain worth LKR 250! ✨", isWin: true },
        2:  { title: "💫 Pendant Chain!", desc: "A gorgeous Pendant Chain is yours! Worth LKR 250! 💖", isWin: true },
        3:  { title: "💍 Bracelet!", desc: "You won a stylish Bracelet worth LKR 180! So trendy! 🌟", isWin: true },
        4:  { title: "😢 Try Again!", desc: "Oops! Better luck next time! Come try again for just LKR 100 💪", isWin: false },
        5:  { title: "💎 Fashion Earrings!", desc: "You won a pair of trendy Fashion Earrings worth LKR 200! 💎", isWin: true },
        6:  { title: "👑 Jimiki Earrings!", desc: "Traditional Jimiki Earrings are yours! Worth LKR 200! 👑", isWin: true },
        7:  { title: "🦶 Anklet!", desc: "You won a beautiful Anklet worth LKR 250! Gorgeous! ✨", isWin: true },
        8:  { title: "😢 Try Again!", desc: "So close! Don't give up — try another bag for LKR 100! 🎯", isWin: false },
        9:  { title: "🎀 Hair Claw Clips!", desc: "You won pastel Hair Claw Clips worth LKR 250! Cute! 🎀", isWin: true },
        10: { title: "🔑 Cute Keytag!", desc: "An adorable Keytag is yours! Worth LKR 100-200! 🎉", isWin: true },
        11: { title: "😢 Try Again!", desc: "Not this time! But every bag is worth the thrill! Try again! 🔄", isWin: false },
        12: { title: "🎁 Mystery Gift!", desc: "WOW! You won a surprise mystery item from our collection! 🧐✨", isWin: true }
    };

    function createConfetti() {
        const colors = ['#FF6B9D', '#B19CD9', '#D4A574', '#FF69B4', '#FFD700', '#E6E6FA'];
        for (let i = 0; i < 60; i++) {
            const piece = document.createElement('div');
            piece.classList.add('confetti-piece');
            piece.style.left = Math.random() * 100 + 'vw';
            piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            piece.style.animationDelay = Math.random() * 2 + 's';
            piece.style.width = (Math.random() * 8 + 6) + 'px';
            piece.style.height = piece.style.width;
            document.body.appendChild(piece);
            setTimeout(() => piece.remove(), 3500);
        }
    }

    bags.forEach(bag => {
        bag.addEventListener('click', () => {
            if (hasDrawn) return;
            hasDrawn = true;

            // Shake effect
            bag.style.animation = 'none';
            bag.offsetHeight; // reflow
            bag.style.animation = 'shake 0.5s ease-in-out';

            setTimeout(() => {
                const bagNumber = parseInt(bag.dataset.number);
                const prize = prizeMap[bagNumber];

                bag.classList.add('opened');

                if (prize.isWin) {
                    bag.innerHTML = '<i class="fas fa-box-open"></i><span>🎉</span>';
                    createConfetti();
                } else {
                    bag.innerHTML = '<i class="fas fa-times-circle"></i><span>😢</span>';
                }

                prizeTitle.textContent = prize.title;
                prizeDesc.textContent = prize.desc;
                luckyResult.style.display = 'block';
                luckyResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 600);
        });
    });

    // Shake keyframe (injected)
    const shakeStyle = document.createElement('style');
    shakeStyle.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0) scale(1.05); }
            20%, 60% { transform: translateX(-8px) rotate(-8deg) scale(1.1); }
            40%, 80% { transform: translateX(8px) rotate(8deg) scale(1.1); }
        }
    `;
    document.head.appendChild(shakeStyle);

    // ========== WHATSAPP ORDER FORM ==========
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const product = document.getElementById('product').value;
            const quantity = document.getElementById('quantity').value;
            const message = document.getElementById('message').value;

            const whatsappNumber = "94778633468";
            const text = `Hi StyleU Kadai! ✨%0A%0AI want to place an order:%0A👤 *Name*: ${name}%0A📞 *Phone*: ${phone}%0A🛍️ *Product*: ${product}%0A🔢 *Quantity*: ${quantity}%0A📝 *Note*: ${message}%0A%0AOrder via Website 🌐`;
            window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
        });
    }

    // ========== ACTIVE NAV LINK ON SCROLL ==========
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 100;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-links a[href="#${id}"]`);
            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    link.style.color = '';
                    link.classList.add('active-link');
                } else {
                    link.classList.remove('active-link');
                }
            }
        });
    });
});
