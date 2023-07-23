$(function () {
  $('#navbar').load('navbar.html');
  $('#footer').load('footer.html');
})


const swiper = new Swiper('.swiper', {
    autoplay:{
        delay:3000,
        disableOnInteraction:false,
    },
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable:true
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

});
let hamburger=document.querySelector(".hamburger-menu")
function handleHamburger(){
  console.log("hello")
  hamburger.classList.toggle("activate")

}