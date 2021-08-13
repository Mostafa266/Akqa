import Swiper from 'swiper';

export default function Slider(slider_name,per_view) {
    let swiper = new Swiper(`${'.'+slider_name}`, {
        slidesPerView: per_view,
        spaceBetween: 30,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
         breakpoints: {
          150: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          }
        }
      });

}
