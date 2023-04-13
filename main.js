'use strict';

// 메뉴가 처음에는 투명하다가 메뉴 높이 만큼 스크롤시 배경색이 생김
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
});

//스크롤
// window.scrollTo(x-좌표, y-좌표)
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (e) => {
  const target = e.target;
  const link = target.dataset.link;

  if (link == null) return;

  console.log(e.target.dataset.link);

  const scrollTo = document.querySelector(link);
  console.log(scrollTo);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
});
