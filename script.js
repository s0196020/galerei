const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const currentPageEl = document.getElementById('current-page');
const totalPagesEl = document.getElementById('total-pages');
const pageIndicator = document.getElementById('page-indicator');

let currentSlide = 0;
let slidesPerView = 3;
let totalSlides = slides.length;

function updateSlidesPerView() {
    if (window.innerWidth <= 768) {
        slidesPerView = 1;
    } else {
        slidesPerView = 3;
    }
    updateSlider();
}

function updateSlider() {
    const slideWidth = 100 / slidesPerView;
    const translateX = -currentSlide * slideWidth;
    slider.style.transform = `translateX(${translateX}%)`;
    
    const totalPages = Math.ceil(totalSlides / slidesPerView);
    const currentPage = Math.floor(currentSlide / slidesPerView) + 1;
    
    currentPageEl.textContent = currentPage;
    totalPagesEl.textContent = totalPages;
    
    updatePageIndicator(totalPages, currentPage);
}

function updatePageIndicator(totalPages, currentPage) {
    pageIndicator.innerHTML = '';
    
    for (let i = 1; i <= totalPages; i++) {
        const dot = document.createElement('div');
        dot.className = `page-dot ${i === currentPage ? 'active' : ''}`;
        dot.addEventListener('click', () => {
            currentSlide = (i - 1) * slidesPerView;
            updateSlider();
        });
        pageIndicator.appendChild(dot);
    }
}

function nextSlide() {
    if (currentSlide < totalSlides - slidesPerView) {
        currentSlide += slidesPerView;
    } else {
        currentSlide = 0;
    }
    updateSlider();
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide -= slidesPerView;
    } else {
        currentSlide = totalSlides - slidesPerView;
    }
    updateSlider();
}

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

window.addEventListener('resize', updateSlidesPerView);

updateSlidesPerView();