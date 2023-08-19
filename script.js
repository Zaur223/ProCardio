'use strict';

const sliderLine = document.querySelector('.slider_line')
const slideNext = document.querySelector('.btn_next')
const slidePrev = document.querySelector('.btn_prev')
const catalogTabs = document.querySelectorAll('.catalog__tab')
const catalog = document.querySelector('.catalog')
let position = 0

const catalogContents = document.querySelectorAll('.catalog__content')
const catalogNext = document.querySelectorAll('.catalog-item__next')
const catalogPrev = document.querySelectorAll('.catalog-item__prev')
const catalogList = document.querySelectorAll('.catalog-item__list')
const catalogItem = document.querySelectorAll('.catalog-item__content')
const carts = document.querySelectorAll('.catalog-item__cart')

const overlay = document.querySelector('.overlay')
const btn = document.querySelector('.button')
const btnMain = document.querySelector('.button_main')
const modalConsultation = document.querySelector('.modal_block_consultation')
const modalOrder = document.querySelector('.modal_block_order')
const modalMini = document.querySelector('.modal_block_mini')
const catalogItemBtn = document.querySelectorAll('.catalog-item__btn')
const consultationBtnMain = document.querySelector('.consultation_button_main')

const scrollLink = document.querySelector('.promo_link')
const btnUp = document.querySelector('.button_up')
const consultation = document.querySelector('.consultation')

const reviews = document.querySelectorAll('.review')

const inputElements = document.querySelectorAll('input')



slideNext.addEventListener('click', function() {
    position += 750
    if(position > 1500) {
        position = 0
    }
    sliderLine.style.left = -position + 'px'
})

slidePrev.addEventListener('click', function() {
    position -= 750
    if(position < 0) {
        position = 1500
    }
    sliderLine.style.left = -position + 'px'
})



const swipeContent = function(num) {
    catalogContents.forEach((catalogContent, index) => {
        if(num != index) {
            catalogContent.style.display = 'none'
        } else {
            catalogContent.style.display = 'flex'
        }
    })
}

catalogTabs.forEach((catalogTab, index) => {
    catalogTab.addEventListener('click', function() {
        if (!catalogTab.classList.contains('catalog__tab_active')) {
            catalogTabs.forEach((tab) => {
                tab.classList.remove('catalog__tab_active');
            });
            catalogTab.classList.add('catalog__tab_active');
            swipeContent(index)
            

        }
    });
  });


///////////////////////////////////  Catalog  //////////////////////////////////////////////

// catalogPrev.addEventListener('click', function() {
//     catalogList.classList.remove('catalog-item__list_active')
//     catalogContent.classList.add('catalog-item__content_active')
// })
// catalogNext.addEventListener('click', function() {
//     catalogContent.classList.remove('catalog-item__content_active')
//     catalogList.classList.add('catalog-item__list_active')
// })

const cartMove = function(cart, shiftAmount) {
    const currentRightValue = parseInt(cart.style.right) || 0;
    cart.style.right = (currentRightValue + shiftAmount) + 'px'
}

const catalogSwich = function(list, content) {
    list.classList.toggle('catalog-item__list_active');
    content.classList.toggle('catalog-item__content_active');
}

catalogPrev.forEach((prev, index) => {
    prev.addEventListener('click', function() {
        catalogSwich(catalogList[index], catalogItem[index]);
        cartMove(carts[index], -22)
    });
});

catalogNext.forEach((next, index) => {
    next.addEventListener('click', function() {
        catalogSwich(catalogList[index], catalogItem[index]);
        cartMove(next, index)
        cartMove(carts[index], 22)
    });
});



////////////////////////////////// Modals //////////////////////////////////

const showModal = function() {
    if(modalConsultation.classList.contains('modal_block_consultation_hidden')) {
        modalConsultation.style.display = 'block'
        overlay.style.display = 'block'
    }
}

const modalHidden = function() {
    modalOrder.style.display = 'none'
    modalConsultation.style.display = 'none'
    modalMini.style.display = 'none'
    overlay.style.display = 'none'
}

btn.addEventListener('click', showModal)
btnMain.addEventListener('click', showModal)

document.addEventListener('click', function(event) {  // при клике на любой элемент с классом modal_close, даже если этот элемент был создан динамически.
    if (event.target.closest('.modal_close')) {
        modalHidden();
    }
});


catalogItemBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        if(modalOrder.classList.contains('modal_block_order_hidden')) {
            modalOrder.style.display = 'block'
            overlay.style.display = 'block'
            
        }
    })
})


document.addEventListener('click', function(e) {
    if(e.target.classList.contains('consultation_button') && e.target.closest('.modal_block_consultation')) {
        const inputInConsultation = e.target.closest('.modal_block_consultation').querySelectorAll('input');
        const allInputFilled = [...inputInConsultation].every(input => input.value.trim() !== '');

        if(allInputFilled) {
            e.preventDefault()
            modalOrder.style.display = 'none'
            modalConsultation.style.display = 'none'
            overlay.style.display = 'block'
            modalMini.style.display = 'block'

            inputInConsultation.forEach(input => input.value = '')
        }
    }

})

consultationBtnMain.addEventListener('click', function(e) {
    if(e.target.closest('.form_consultation')) {
        const inputInConsultation = e.target.closest('.form_consultation').querySelectorAll('input');
        const allInputFilled = [...inputInConsultation].every(input => input.value.trim() !== '');

        if(allInputFilled) {
            e.preventDefault()
            overlay.style.display = 'block';
            modalMini.style.display = 'block';

            inputInConsultation.forEach(input => input.value = '')
        }

    }
})

////////////////////////////////// scrolling //////////////////////////////////////

scrollLink.addEventListener('click', function(e) {
    e.preventDefault()
    const catalogOffsetTop = catalog.offsetTop;
    window.scrollTo({
        top: catalogOffsetTop,
        behavior: "smooth"
    })
})

window.addEventListener('scroll', function() {
    const consultationOffsetTop = consultation.offsetTop
    const scrollTop = window.scrollY;

    if(scrollTop >= consultationOffsetTop) {
        btnUp.style.display = 'block'
    } else {
        btnUp.style.display = 'none'
    }
})

btnUp.addEventListener('click', function(e) {
    e.preventDefault()
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
})


///////////////////////////////// Intersection Observer API //////////////////////////////////////

const appearancrReview = function(entries, observer) {
    const entry = entries[0]
    if(!entry.isIntersecting) return;
    entry.target.classList.remove('review_hidden')
    observer.unobserve(entry.target);
}

const reviewObserver = new IntersectionObserver(appearancrReview, {
    root: null,
    threshold: 0.2,
})

reviews.forEach(function(review) {
    reviewObserver.observe(review)
    review.classList.add('review_hidden')
})