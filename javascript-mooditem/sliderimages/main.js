const slider = document.querySelector(".slider");
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const sliderimages = document.querySelectorAll(".slider-img")
let currentIndex = 0;

// updateSlider 
const updateSlider = () => {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
};
    
    // UPDATE SLIDER INLINEY
updateSlider();

// go to next slide
const goToNext = () => {
  // currentIndex =currentIndex + 1;
  currentIndex += 1;
  if (currentIndex > sliderimages.length - 1) {
    currentIndex = 0;
  }
  updateSlider();
};
// const goToPrev = () =>
//   currentIndex -= 1;
// if (currentIndex > sliderimages.length + 1) {
//   currentIndex = 0;
// }

// contorl Buttons
nextBtn.addEventListener("click", goToNext);

// go to previous image clicking to next button
const goToPrev = () => {
  currentIndex -= 1;
  if (currentIndex > 0) {
    currentIndex = sliderimages1 - 1; 
    
  }
    updateSlider()
  }


prevBtn.addEventListener("click", goToPrev);
// CHANGE SLIDER IMAGE 4 SECONDS AUTMATIC
setInterval(goToNext,'4000')
  

