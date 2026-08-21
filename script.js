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

// If the item doesn't have a local src or is an external link preview:
function getItemImage(item) {
  if (item.src) {
    return item.src;
  }
  // Generates the OpenGraph image / link preview card automatically:
  return `https://api.microlink.io?url=${encodeURIComponent(item.link)}&screenshot=true&meta=false&embed=screenshot.url`;
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

            // Explicitly force <img> for standard image formats (including .gif)
            const srcIsImage = item.src.endsWith('.gif') || item.src.endsWith('.png') || item.src.endsWith('.jpg') || item.src.endsWith('.jpeg');
            const isVideo = !srcIsImage && (item.src.endsWith('.mov') || item.src.endsWith('.mp4') || item.src.endsWith('.webm') || item.mediaType === 'video');

            const mediaHTML = isVideo ? `
                <video autoplay loop muted playsinline style="width: 100%; height: 100%; object-fit: cover; border-radius: inherit; display: block;" onloadedmetadata="this.muted=true">
                    <source src="${item.src}" type="video/mp4">
                    <source src="${item.src}" type="video/quicktime">
                </video>
            ` : `
                <img src="${item.src}" alt="${item.title}" loading="lazy">
            `;

            artPiece.innerHTML = `
                <a href="${finalHref}" ${target} class="frame">
                    ${hintHTML}
                    ${mediaHTML}
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

window.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splash-overlay');
  const splashImg = splash ? splash.querySelector('img') : null;

  if (splashImg) {
    const originalSrc = splashImg.src.split('?')[0];
    splashImg.src = `${originalSrc}?t=${Date.now()}`;
  }

  if (splash) {
    setTimeout(() => {
      splash.classList.add('hidden');
      
      setTimeout(() => {
        splash.style.display = 'none';
      }, 500);
    }, 1700);
  }
});

// Interactive Gallery Cat
document.addEventListener("DOMContentLoaded", () => {
  const trackEl = document.getElementById("gallery-track") || document.body;

  // Asset paths
  const IMG_SITTING = "src/sittingcat.png";
  const IMG_WALKING = "big-src/walkingcat.GIF";

  // Preload walking GIF
  const preloadGif = new Image();
  preloadGif.src = IMG_WALKING;

  // Create cat element
  const cat = document.createElement("img");
  cat.src = IMG_SITTING;
  cat.id = "gallery-cat";
  cat.alt = "Gallery Cat";

  // Floor height placement
  const FLOOR_OFFSET = 120; // Distance in px from bottom of track/viewport to the floor line
  
  // Starting position in total world/track pixels
  let catWorldX = 300;
  let isMoving = false;

  // Append cat to the track container
  trackEl.appendChild(cat);

  function updateCatY() {
    const trackHeight = trackEl.clientHeight || window.innerHeight;
    const catY = trackHeight - FLOOR_OFFSET;
    cat.style.top = `${catY}px`;
  }
  updateCatY();
  window.addEventListener('resize', updateCatY);

  // Position initialized
  cat.style.left = `${catWorldX}px`;

  // Movement & state variables
  const MAX_SPEED = 1.2;
  let targetWorldX = catWorldX;

  let moveTimeout = null;
  let initialMouseSide = null;
  let pendingTargetWorldX = null;

  // Calculate cursor's true world X position across viewport & inner track scrolls
  function getEventWorldX(e) {
    const trackScroll = trackEl.scrollLeft || 0;
    const windowScroll = window.pageXOffset || document.documentElement.scrollLeft || 0;
    const trackRect = trackEl.getBoundingClientRect();
    
    // If track is an internal scrollable container:
    if (trackEl !== document.body && trackEl.scrollWidth > trackEl.clientWidth) {
      return e.clientX - trackRect.left + trackScroll;
    }
    // If window/document handles the scroll:
    return e.clientX + windowScroll;
  }

  // Mouse move listener
  window.addEventListener("mousemove", (e) => {
    const currentWorldMouseX = getEventWorldX(e);
    const currentSide = currentWorldMouseX < catWorldX ? "left" : "right";

    if (moveTimeout) {
      // If mouse crosses to the opposite side of the cat before 3s, abort
      if (currentSide !== initialMouseSide) {
        clearTimeout(moveTimeout);
        moveTimeout = null;
        pendingTargetWorldX = null;
        return;
      }
      pendingTargetWorldX = currentWorldMouseX;
    } else {
      initialMouseSide = currentSide;
      pendingTargetWorldX = currentWorldMouseX;

      moveTimeout = setTimeout(() => {
        if (pendingTargetWorldX !== null) {
          targetWorldX = pendingTargetWorldX;

          // Face target direction
          if (targetWorldX < catWorldX) {
            cat.classList.add("facing-left");
            cat.classList.remove("facing-right");
          } else {
            cat.classList.add("facing-right");
            cat.classList.remove("facing-left");
          }
        }
        moveTimeout = null;
      }, 3000); // 3-second delay
    }
  });

  // Animation Loop (Moves in World Coordinates)
  function animateCat() {
    const dx = targetWorldX - catWorldX;

    if (Math.abs(dx) > 1.5) {
      if (!isMoving) {
        isMoving = true;
        cat.src = IMG_WALKING;
      }

      const moveStep = Math.sign(dx) * Math.min(Math.abs(dx), MAX_SPEED);
      catWorldX += moveStep;
      cat.style.left = `${catWorldX}px`;
    } else {
      if (isMoving) {
        isMoving = false;
        cat.src = IMG_SITTING;
      }
    }

    requestAnimationFrame(animateCat);
  }

  animateCat();
});

initGallery();