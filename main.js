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

// 메뉴가 클릭되면 해당 페이지로 이동
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (e) => {
  const target = e.target;
  const link = target.dataset.link;

  if (link == null) return;

  scrollIntoView(link);
});

// 홈화면에 있는 Contact Me 버튼
const contactBtn = document.querySelector('.home__contact');
contactBtn.addEventListener('click', () => {
  scrollIntoView('#contact');
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}

// 스크롤 시 홈화면 메인 프로필, 글씨 투명처리
const home = document.querySelector('#homeElements');
const homeHeight = home.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});
