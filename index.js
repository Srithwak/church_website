const events = [
    { title: 'Sunday Service', description: 'Join us every Sunday at 5 PM for worship, message and fellowship.' },
    { title: `Church's 11th Anniversary`, description: 'Church Anniversary Service on October 12th' },
    { title: `Church Picnic`, description: 'Picnic at "address" on October 18th' },
    { title: `Men's Fellowship`, description: 'Wednesday Bible study and prayer for men at 9 PM.' },
    { title: `Women's Fellowship`, description: 'Worship Service at 6:30 AM \n Intercessory prayer from 8 AM - 10 PM, 11 AM - 12 PM, 2 PM - 3 PM, 6 PM - 7 PM' },
    { title: `Women's Conference`, description: 'Worship Service for Women on September 13th' },
];

const landingSectionImgs = 3;
let currentImageIndex = 1;

const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const landingSection = document.getElementById('landing');
const mobileNav = document.querySelector('.mobile-nav');

function initMobileMenu() {
    mobileMenuBtn?.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                mobileNav?.classList.remove('active');
            }
        });
    });
}

function cycleBackgroundImages() {
    if (!landingSection) return;

    let isFading = false;
    let activeLayerIsMain = true;

    for (let i = 1; i <= landingSectionImgs; i++) {
        new Image().src = `land_imgs/${i}.jpg`;
    }

    landingSection.style.backgroundImage = `url('land_imgs/${currentImageIndex}.jpg')`;

    setInterval(() => {
        if (isFading) return;
        isFading = true;

        currentImageIndex = (currentImageIndex % landingSectionImgs) + 1;
        const nextImageURL = `url('land_imgs/${currentImageIndex}.jpg')`;

        if (activeLayerIsMain) {
            landingSection.style.setProperty('--after-bg-image', nextImageURL);
            landingSection.style.setProperty('--after-opacity', '1');
        } else {
            landingSection.style.backgroundImage = nextImageURL;
            landingSection.style.setProperty('--after-opacity', '0');
        }

        activeLayerIsMain = !activeLayerIsMain;
        setTimeout(() => { isFading = false; }, 1500);
    }, 6000);
}

function generateEvents() {
    const eventsContainer = document.querySelector('.events-container');
    if (!eventsContainer) return;

    const eventElements = events.map(event => {
        const eventBox = document.createElement('div');
        eventBox.className = 'event-box';
        eventBox.style.backgroundColor = '#71cde2';
        eventBox.innerHTML = `<h3>${event.title}</h3><p>${event.description}</p>`;
        return eventBox;
    });

    eventsContainer.append(...eventElements);
}

function loadVideoEmbed() {
    const videoContainer = document.querySelector('.video-container');
    if (!videoContainer) return;

    fetch('./liveVidEmbed.txt')
        .then(response => response.ok ? response.text() : Promise.reject(response.status))
        .then(data => videoContainer.innerHTML = data)
        .catch(() => videoContainer.innerHTML = '<p>Video temporarily unavailable</p>');
}

function generatePhotoGallery() {
    const galleryContainer = document.getElementById('gallery-container');
    if (!galleryContainer) return;

    const photoCategories = [
        { name: 'Worship Services', thumbnail: '../photos/cat1/1.jpg' },
        { name: 'Community Events', thumbnail: '../photos/cat2/1.jpg' },
        { name: 'Youth Activities', thumbnail: '../photos/cat3/1.jpg' },
    ];

    const folders = photoCategories.map(category => {
        const folder = document.createElement('div');
        folder.className = 'folder';
        folder.addEventListener('click', () => {
            window.location.href = `photos.html?name=${encodeURIComponent(category.name)}`;
        });

        const name = document.createElement('div');
        name.className = 'folder-name';
        name.textContent = category.name;
        folder.appendChild(name);
        return folder;
    });

    galleryContainer.append(...folders);
}

document.addEventListener('DOMContentLoaded', function () {
    initMobileMenu();
    initSmoothScroll();
    cycleBackgroundImages();
    generateEvents();
    loadVideoEmbed();
    generatePhotoGallery();
});