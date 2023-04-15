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

// 매개변수 위치로 이동(스크롤)하는 함수
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

// up arrow btn
const arrow = document.querySelector('.arrow');
document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight) {
    arrow.classList.add('upBtn');
  } else {
    arrow.classList.remove('upBtn');
  }
});

const arrowBtn = document.querySelector('.arrow');
arrowBtn.addEventListener('click', () => {
  scrollIntoView('#home');
});

// 프로젝트 카테고리에 따라 보이는 프로젝트 필터링
const projectContainer = document.querySelector('.work__projects');
const projectBtn = document.querySelector('.work__categories');
projectBtn.addEventListener('click', (e) => {
  const target = e.target;
  const targetBtn = target.dataset.btn;
  const activeMenu = document.querySelector('.category__btn.active');

  if (targetBtn == null) return;

  // 프로젝트 카테고리가 눌리면 배경색이 더해지도록
  activeMenu.classList.remove('active');
  target.classList.add('active');

  projectContainer.classList.add('anim-out');
  const projects = document.querySelectorAll('.project');
  setTimeout(() => {
    projects.forEach((element) => {
      const projectType = element.dataset.btn;
      if (projectType == targetBtn || targetBtn == 'all') {
        element.classList.remove('invisible');
      } else {
        element.classList.add('invisible');
      }
    });
    projectContainer.classList.remove('anim-out');
  }, 300);
});

// navbar 선택된 메뉴에 border 처리
navbarMenu.addEventListener('click', (e) => {
  const target = e.target;
  const selectedMenuLink = target.dataset.link;
  const activeMenu = document.querySelector('.navbar__menu__item.selected');

  if (selectedMenuLink == null) return;

  activeMenu.classList.remove('selected');
  target.classList.add('selected');
});
