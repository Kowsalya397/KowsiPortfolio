// =========================
// TYPING ANIMATION
// =========================
const textList = [
    "Full Stack .NET Developer",
];

let textIndex = 0;
let charIndex = 0;

function typeEffect() {
    const el = document.getElementById("typing");
    if (!el) return;


    if (charIndex < textList[textIndex].length) {
        el.innerHTML += textList[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 80);
    } else {
        setTimeout(eraseEffect, 1500);
    }
}

function eraseEffect() {
    const el = document.getElementById("typing");
    if (!el) return;

    if (charIndex > 0) {
        el.innerHTML = textList[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseEffect, 40);
    } else {
        textIndex = (textIndex + 1) % textList.length;
        setTimeout(typeEffect, 500);
    }
}

// =========================
// NAVBAR SCROLL EFFECT
// =========================
window.addEventListener("scroll", function () {
    const nav = document.querySelector(".navbar");
    if (nav) {
        nav.classList.toggle("scrolled", window.scrollY > 50);
    }
});

// =========================
// SCROLL ANIMATION
// =========================
function revealOnScroll() {
    const elements = document.querySelectorAll(".scroll-animate");

    elements.forEach(el => {
        const position = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (position < windowHeight - 100) {
            el.classList.add("active");
        }
    });
}

// ── Project Slider ──
(function () {
    const track = document.getElementById('projTrack');
    const dotsWrap = document.getElementById('projDots');
    const prevBtn = document.getElementById('projPrev');
    const nextBtn = document.getElementById('projNext');

    if (!track) return;

    const cards = Array.from(track.querySelectorAll('.pcard'));
    const total = cards.length;
    let current = 0;
    let autoTimer = null;

    cards.slice(0, 3).forEach(function (card) {
        track.appendChild(card.cloneNode(true));
    });

    // Build dots
    cards.forEach(function (_, i) {
        const d = document.createElement('button');
        d.className = 'proj-dot-btn' + (i === 0 ? ' active' : '');
        d.addEventListener('click', function () { goTo(i); resetAuto(); });
        dotsWrap.appendChild(d);
    });

    function getCardWidth() {
        return cards[0].offsetWidth + 24; // card width + gap
    }

    function updateDots() {
        dotsWrap.querySelectorAll('.proj-dot-btn').forEach(function (d, i) {
            d.classList.toggle('active', i === (current % total));
        });
    }

    function goTo(index) {
        current = index;
        track.style.transform = 'translateX(-' + (current * getCardWidth()) + 'px)';
        updateDots();

        // 🔥 reset without jump
        if (current >= total) {
            setTimeout(function () {
                track.style.transition = 'none';
                current = 0;
                track.style.transform = 'translateX(0px)';

                setTimeout(function () {
                    track.style.transition = 'transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)';
                }, 50);
            }, 550);
        }

        if (current < 0) {
            current = total - 1;
            track.style.transform = 'translateX(-' + (current * getCardWidth()) + 'px)';
        }
    }

    function resetAuto() {
        clearInterval(autoTimer);
        autoTimer = setInterval(function () { goTo(current + 1); }, 3500);
    }

    prevBtn.addEventListener('click', function () { goTo(current - 1); resetAuto(); });
    nextBtn.addEventListener('click', function () { goTo(current + 1); resetAuto(); });

    // Mouse drag
    var startX = 0, isDrag = false;
    track.addEventListener('mousedown', function (e) { isDrag = true; startX = e.clientX; track.style.transition = 'none'; });
    track.addEventListener('mousemove', function (e) {
        if (!isDrag) return;
        track.style.transform = 'translateX(-' + (current * getCardWidth() - (e.clientX - startX)) + 'px)';
    });
    track.addEventListener('mouseup', function (e) {
        if (!isDrag) return;
        isDrag = false;
        track.style.transition = 'transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)';
        var diff = startX - e.clientX;
        if (diff > 60) goTo(current + 1);
        else if (diff < -60) goTo(current - 1);
        else goTo(current);
        resetAuto();
    });
    track.addEventListener('mouseleave', function () {
        if (!isDrag) return;
        isDrag = false;
        track.style.transition = 'transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)';
        goTo(current);
    });

    // Touch drag
    var touchX = 0;
    track.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; });
    track.addEventListener('touchend', function (e) {
        var diff = touchX - e.changedTouches[0].clientX;
        if (diff > 50) goTo(current + 1);
        else if (diff < -50) goTo(current - 1);
        resetAuto();
    });

    resetAuto();
})();

// =========================
// INIT
// =========================
document.addEventListener("DOMContentLoaded", function () {
    typeEffect();
    revealOnScroll();
});

window.addEventListener("scroll", revealOnScroll);


const backTop = document.getElementById("back-top");

window.addEventListener("scroll", function () {
    if (window.scrollY > 200) {
        backTop.style.display = "block";
    } else {
        backTop.style.display = "none";
    }
});

// SMOOTH SCROLL
document.querySelector("#back-top a").addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
});


// PAGE LOAD HIDE
window.addEventListener("load", function () {
    const loader = document.getElementById("loader-fade");

    setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.transition = "0.5s";

        setTimeout(() => {
            loader.style.display = "none";
        }, 500);

    }, 800);
});

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("contactForm");
    const btn = document.getElementById("sendBtn");
    const text = document.getElementById("btnText");
    const spinner = document.getElementById("btnSpinner");

    if (!form) return;

    form.addEventListener("submit", function () {

        // Disable button
        btn.disabled = true;

        // Change text
        text.innerText = "Sending";

        // Show spinner
        spinner.style.display = "inline-block";

    });

});

document.addEventListener("DOMContentLoaded", function () {

    const nav = document.getElementById("nav");
    const icon = document.getElementById("menuIcon");
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    if (!nav || !icon) return;

    // ICON CHANGE ONLY
    nav.addEventListener("show.bs.collapse", function () {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    });

    nav.addEventListener("hide.bs.collapse", function () {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    });

    // NAV LINK CLICK CLOSE (THIS IS OK)
    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            const bsCollapse = bootstrap.Collapse.getInstance(nav);
            if (bsCollapse) bsCollapse.hide();
        });
    });

});


