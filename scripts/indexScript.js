// On Click Carousel

let slide1 = document.getElementById('slide1')
let slide2 = document.getElementById('slide2')
let slide3 = document.getElementById('slide3')

function switchSlide(slide) {
    if(slide == 'slide1') {
        slide3.classList.remove('shown')
        slide1.classList.add('shown')
    }
    if(slide == 'slide2') {
        slide1.classList.remove('shown')
        slide2.classList.add('shown')
    }
    if(slide == 'slide3') {
        slide2.classList.remove('shown')
        slide3.classList.add('shown')
    }

}

slide1.addEventListener('click' , () => {
    switchSlide(slide2.id)
})

slide2.addEventListener('click' , () => {
    switchSlide(slide3.id)
})

slide3.addEventListener('click' , () => {
    switchSlide(slide1.id)
})
