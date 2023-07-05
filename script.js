const containerInstructions = document.querySelector('.container')
const leftBtn = document.querySelector('.left');
const rightBtn = document.querySelector('.right');

let slideIndex = 0;

leftBtn.addEventListener('click', () => {
    if (PhoneSize()) {
        slideIndex = (slideIndex - 1 + containerInstructions.children.length) % containerInstructions.children.length;
        updateCarousel()
    } else {
        return
    }
    
})

rightBtn.addEventListener('click', () => {
    if (PhoneSize()) {
        slideIndex = (slideIndex + 1)  % containerInstructions.children.length;
    updateCarousel()
    } else {
        return
    }

})


function updateCarousel() {
    if (PhoneSize()) {

    
    for (let i = 0; i < containerInstructions.children.length; i++) {
        containerInstructions.children[i].style.display = 'none';

    }
    containerInstructions.children[slideIndex].style.display = 'block';
    }   else return
}

updateCarousel()


function PhoneSize() {
    return window.innerWidth <= 767
}



//nav

const toggleBtn = document.querySelector('.toggle-btn');
const navLinks = document.querySelector('.links');

toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
  });

  