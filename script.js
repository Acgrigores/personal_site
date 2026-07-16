// DATA CONFIGURATION
const galleryData = [
    {
        id: 'About me',
        title: 'About Me',
        ropeColor: '#1B3B2B', // Pine Infusion
        items: [
            { 
                src: 'src/anna.png', 
                title: 'Welcome!', 
                details: 'I\'m Anna, a computer science student at UIUC. This gallery (which draws inspiration from my art history minor) is an overview of my experience and projects.',
                link: '../index.html' 
            },
        ]
    },
    {
        id: 'Work',
        title: 'Work Experience',
        ropeColor: '#8CA399', // Sage Slate
        items: [
            { 
                src: 'src/google.png', 
                title: 'Google ASDI Intern', 
                details: 'Summer 2025. Kotlin, Linux, Android, Jetpack Compose',
                link: 'work.html#google'
            },
            { 
                src: 'src/luc.png', 
                title: 'Loyola University Research Intern', 
                details: 'Summers 2022 and 2024. Python, Linux, Flask, HTML/CSS/JS, Pandas, Git', 
                link: 'work.html#luc'
            },
            { 
                src: 'src/eths.png', 
                title: 'Chrome Support Intern', 
                details: '2021-2024. Chromebook repair, customer service.', 
                link: 'work.html#chrome'
            }
        ]
    },
    {
        id: 'Education',
        title: 'Education',
        ropeColor: '#1B3B2B', // Pine Infusion
        items: [
            { 
                src: 'src/siebel.png', 
                title: 'University of Illinois Urbana-Champaign', 
                details: 'Expected Graduation May 2028. 3.93 GPA. Relevant courses: Data Structures, Statistics, Linear Algebra, Calculus.', 
                link: 'education.html#uiuc'
            },
            { 
                src: 'src/eths.png', 
                title: 'Evanston Township High School', 
                details: '4.0 GPA. Relevant classes: Computer Science, Cybersecurity, Robotics, Calculus.', 
                link: 'education.html#eths'
            }
        ]
    },
    {
        id: 'Projects',
        title: 'Projects',
        ropeColor: '#E5C07B', // Champagne Gold
        items: [
            { 
                src: 'src/cc.png', 
                title: 'Google Calling Card', 
                details: 'Intern Project. Kotlin, Jetpack Compose, Design Docs, Data Services, State Management.', 
                link: 'projects.html#google'
            },
            { 
                src: 'src/photostrip.png', 
                title: 'pAInt me a picture photobooth', 
                details: 'Project for UIUC\'s annual engineering fair on behalf of Alpha Omega Epsilon. Python, Streamlit, Vertex API.', 
                link: 'projects.html#photobooth'
            },
            { 
                src: 'src/louvre.png', 
                title: 'Louvre CTF Challenge', 
                details: 'Group project for a course. Python, Flask, Linux, Git.', 
                link: 'projects.html#ctf'
            },
            { 
                src: 'src/vxv.png', 
                title: 'HSHacks Winning Submission', 
                details: 'Hackathon project. HTML, CSS, JS, Google Apps Script.', 
                link: 'projects.html#hshacks'
            },
            { 
                src: 'src/beans.png', 
                title: 'Castor Bean Counter', 
                details: 'Project in collaboration with a nonprofit. Python, various LLM APIs, Google Sheets scripts', 
                link: 'projects.html#beans'
            },
            { 
                src: 'src/asgard.png', 
                title: 'Asgard', 
                details: 'Project for my Loyola Chicago research internship. Python, Flask, HTML, CSS, JS.', 
                link: 'projects.html#asgard'
            },
            { 
                src: 'src/124.png', 
                title: 'CS 124 Project', 
                details: 'Project for my intro CS course. Kotlin, Android Studio.', 
                link: 'projects.html#124'
            },
            { 
                src: 'src/128.png', 
                title: 'CS 128 Projects', 
                details: 'Projects for my intro CS  course. C++.', 
                link: 'projects.html#128'
            },
            { 
                src: 'src/maze.gif', 
                title: 'CS 225 Projects', 
                details: 'Projects for my data structures course. C++.', 
                link: 'projects.html#225'
            },
            { 
                src: 'src/evolution.gif', 
                title: 'AI Projects', 
                details: 'Solo projects for fun. Python.', 
                link: 'projects.html#ai'
            }
        ]
    },
    {
        id: 'Awards',
        title: 'Awards',
        ropeColor: '#E5C07B', // Champagne Gold
        items: [
            { 
                src: 'src/nmsc.png', 
                title: 'National Merit Scholar', 
                details: 'Awarded to ~0.5% of high school seniors each year', 
                link: 'awards.html#nmsc'
            },
            { 
                src: 'src/grainger.png', 
                title: 'James Scholar', 
                details: 'Selected for the Honors Program within UIUC\'s Grainger College of Engineering.', 
                link: 'awards.html#james'
            },
            { 
                src: 'src/NCSF.png', 
                title: 'National Cyber Scholar with Honors', 
                details: 'National award for cybersecurity talent.', 
                link: 'awards.html#cyberscholar'
            },
            { 
                src: 'src/vxv.png', 
                title: 'HsHacks Winner', 
                details: 'Won a hackathon.', 
                link: 'awards.html#hshacks'
            },
            { 
                src: 'src/iss.png', 
                title: 'Illinois State Scholar', 
                details: 'Selected as an Illinois State Scholar.', 
                link: 'awards.html#iss'
            },
            { 
                src: 'src/grainger.png', 
                title: 'Matthews Scholar', 
                details: 'A UIUC award and scholarship awarded to incoming students.', 
                link: 'awards.html#ms'
            },
            { 
                src: 'src/desmos.png', 
                title: 'Desmos Global Graphing Art Contest Finalist', 
                details: 'Selected out of 10,000 entries for my blending of math and art.', 
                link: 'awards.html#desmos'
            },
            { 
                src: 'src/naqt.png', 
                title: 'Social Science and Art History Knowledge', 
                details: 'Ranked top 20 in the country for social science and visual art by National Academic Quiz Tournaments.', 
                link: 'awards.html#naqt'
            },
        ]
    },
    {
        id: 'Contact',
        title: 'Contact',
        ropeColor: '#8CA399', // Sage Slate
        items: [
            { 
                src: 'src/email.png',
                title: 'Email', 
                details: 'Feel free to reach out for opportunities or collaborations at annacg4@illinois.edu', 
                link: 'mailto:annacg4@illinois.edu' 
            },
            { 
                src: 'src/linkedin.png',
                title: 'LinkedIn', 
                details: 'Connect with me on LinkedIn!', 
                link: 'https://www.linkedin.com/in/anna-grigorescu' 
            }
        ]
    },
];

// BUILDER LOGIC
const track = document.getElementById('gallery-track');
const navbar = document.getElementById('navbar');

galleryData.forEach(section => {
    // Navbar Link
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
    // Insert the "DO Touch the Art" floor easel inside the "About me" section so it scrolls
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
        sectionDiv.appendChild(floorSign); // Appends to the section container so it scrolls away
    }
});

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

    // First, find which section is currently active based on an early trigger (right-hand threshold)
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        
        // Turns on sooner: triggers when the section enters 75% of the screen width from the right
        if (rect.left <= window.innerWidth * 0.75 && rect.right >= window.innerWidth * 0.25) {
            activeSectionIndex = index;
        }
    });

    // Apply lighting states based on index position
    sections.forEach((section, index) => {
        // If it's the active section, OR any section to the left of it, keep the lights on!
        if (index <= activeSectionIndex && activeSectionIndex !== -1) {
            section.classList.add('active-light');
            
            // Set rope color to match the current active section
            if (index === activeSectionIndex) {
                const sectionData = galleryData.find(d => d.id === section.id);
                if (sectionData && sectionData.ropeColor) {
                    document.documentElement.style.setProperty('--rope-red', sectionData.ropeColor);
                }
            }
        } else {
            // Keep sections to the right dark
            section.classList.remove('active-light');
        }
    });

    requestAnimationFrame(animateGallery);
}

animateGallery();

// VISIBILITY OF POP-UP HINTS ON SCROLL
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

// Fixed target: Listen to scroll on the custom #gallery-track container
if (track) {
    track.addEventListener('scroll', handleHintVisibility, { passive: true });
}