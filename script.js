'use strict';

const sliderLine = document.querySelector('.slider_line')
const slideNext = document.querySelector('.btn_next')
const slidePrev = document.querySelector('.btn_prev')
const catalogTabs = document.querySelectorAll('.catalog__tab')
let position = 0

const catalogNext = document.querySelectorAll('.catalog-item__next')
const catalogPrev = document.querySelectorAll('.catalog-item__prev')
const catalogList = document.querySelectorAll('.catalog-item__list')
const catalogItem = document.querySelectorAll('.catalog-item__content')



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



catalogTabs.forEach((catalogTab) => {
    catalogTab.addEventListener('click', function() {
        if (!catalogTab.classList.contains('catalog__tab_active')) {
            catalogTabs.forEach((tab) => {
                tab.classList.remove('catalog__tab_active');
            });
            catalogTab.classList.add('catalog__tab_active');

        }
    });
  });


///////////////////////////////////   Catalog  //////////////////////////////////////////////

// catalogPrev.addEventListener('click', function() {
//     catalogList.classList.remove('catalog-item__list_active')
//     catalogContent.classList.add('catalog-item__content_active')
// })
// catalogNext.addEventListener('click', function() {
//     catalogContent.classList.remove('catalog-item__content_active')
//     catalogList.classList.add('catalog-item__list_active')
// })

const catalogSwich = function(list, content) {
    list.classList.toggle('catalog-item__list_active');
    content.classList.toggle('catalog-item__content_active');
}

catalogPrev.forEach((prev, index) => {
    prev.addEventListener('click', function() {
        catalogSwich(catalogList[index], catalogItem[index]);
    });
});

catalogNext.forEach((next, index) => {
    next.addEventListener('click', function() {
        catalogSwich(catalogList[index], catalogItem[index]);
    });
});
