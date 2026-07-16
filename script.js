let galleryData = [];

const track = document.getElementById('gallery-track');
const navbar = document.getElementById('navbar');

// Fetch static data from JSON file and build the DOM
async function initGallery() {
    try {
        const response = await fetch('./gallery.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        galleryData = await response.json();
        buildGalleryDOM();
        // Listen to scroll events on the track container once it's populated
        if (track) {
            track.addEventListener('scroll', handleHintVisibility, { passive: true });
        }
        
        animateGallery();
    } catch (error) {
        console.error("Failed to load gallery configuration data:", error);
    }
}

function buildGalleryDOM() {
    galleryData.forEach(section => {
        const link = document.createElement('a');
        link.innerText = section.title;
        link.onclick = () => {
            const targetSection = document.getElementById(section.id);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        };
        navbar.appendChild(link);

        // Section Container
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'gallery-section';
        sectionDiv.id = section.id;

        // Title
        const floatTitle = document.createElement('div');
        floatTitle.className = 'section-floating-title';
        floatTitle.innerText = section.title;
        sectionDiv.appendChild(floatTitle);

        // Art Container
        const artGroup = document.createElement('div');
        artGroup.className = 'art-group';
        section.items.forEach((item, index) => {
            const artPiece = document.createElement('div');
            artPiece.className = 'art-piece';

            const isExternal = item.link.startsWith('http') || item.link.startsWith('mailto');
            const finalHref = isExternal ? item.link : `details/${item.link}`;
            const target = isExternal ? 'target="_blank"' : '';

            let hintHTML = '';
            if (section.id !== 'About me' && section.id !== 'Contact' && index === 0) {
                hintHTML = `<div class="click-hint section-hint">Click for details!</div>`;
            }

            artPiece.innerHTML = `
                <a href="${finalHref}" ${target} class="frame">
                    ${hintHTML}
                    <img src="${item.src}" alt="${item.title}">
                </a>
                <div class="plaque">
                    <div class="plaque-inner">
                        <h3>${item.title}</h3>
                        <p>${item.details}</p>
                    </div>
                </div>
            `;
            artGroup.appendChild(artPiece);
        });
        sectionDiv.appendChild(artGroup);
        track.appendChild(sectionDiv);

        // DYNAMIC FLOOR SIGN INJECTION
        if (section.id === 'About me') {
            const floorSign = document.createElement('div');
            floorSign.className = 'floor-sign-container';
            floorSign.innerHTML = `
                <div class="easel-back-leg"></div>
                <div class="easel-frame">
                    <div class="easel-board">
                        <span class="warning-icon">🫵</span>
                        <h3>DO Touch</h3>
                        <p class="subtitle">the art!</p>
                        <div class="divider"></div>
                        <p class="instruction">Click on images to get more context.</p>
                    </div>
                </div>
                <div class="easel-shadow"></div>
            `;
            sectionDiv.appendChild(floorSign); 
        }
    });
}

// 3D TILT & COLOR CHANGE ANIMATION LOOP
function animateGallery() {
    const tiltElements = document.querySelectorAll('.frame, .plaque');
    const sections = document.querySelectorAll('.gallery-section');
    const center = window.innerWidth / 2;

    // 1. Handle Tilt
    tiltElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const elCenter = rect.left + rect.width / 2;
        const dist = elCenter - center;
        
        let rotation = dist / 25;
        rotation = Math.max(-45, Math.min(45, rotation));
        const finalRot = rotation * -1;

        el.style.setProperty('--rot', `${finalRot}deg`);
    });

    // 2. Handle Rope Color, Early Motion Light Triggers, & Persistent Left Lighting
    let activeSectionIndex = -1;

    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.left <= window.innerWidth * 0.75 && rect.right >= window.innerWidth * 0.25) {
            activeSectionIndex = index;
        }
    });

    sections.forEach((section, index) => {
        if (index <= activeSectionIndex && activeSectionIndex !== -1) {
            section.classList.add('active-light');
            
            if (index === activeSectionIndex) {
                const sectionData = galleryData.find(d => d.id === section.id);
                if (sectionData && sectionData.ropeColor) {
                    document.documentElement.style.setProperty('--rope-red', sectionData.ropeColor);
                }
            }
        } else {
            section.classList.remove('active-light');
        }
    });

    requestAnimationFrame(animateGallery);
}

let isScrolling;
let fadeOutTimer;

function handleHintVisibility() {
    const allHints = document.querySelectorAll('.section-hint');
    allHints.forEach(hint => hint.classList.remove('show'));
    
    window.clearTimeout(isScrolling);
    window.clearTimeout(fadeOutTimer);

    isScrolling = setTimeout(() => {
        const center = window.innerWidth / 2;
        const sections = document.querySelectorAll('.gallery-section');

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.left <= center && rect.right >= center) {
                const hint = section.querySelector('.section-hint');
                if (hint) {
                    hint.classList.add('show');
                    fadeOutTimer = setTimeout(() => {
                        hint.classList.remove('show');
                    }, 2500); 
                }
            }
        });
    }, 500); 
}

initGallery();