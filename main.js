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

  navbarMenu.classList.remove('open');
  scrollIntoView(link);
});

// 홈화면에 있는 Contact Me 버튼
const contactBtn = document.querySelector('.home__contact');
contactBtn.addEventListener('click', () => {
  scrollIntoView('#contact');
});

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

// 토글 버튼
if (matchMedia('screen and (max-width: 768px)').matches) {
  const togglebtn = document.querySelector('.navbar__toggle-btn');
  const navbarMenu = document.querySelector('.navbar__menu');

  togglebtn.addEventListener('click', () => {
    if (!navbarMenu.classList.contains('open')) {
      navbarMenu.classList.add('open');
    } else {
      navbarMenu.classList.remove('open');
    }
  });
}

const sectionIds = [
  '#home',
  '#about',
  '#skills',
  '#works',
  '#testimonials',
  '#contact',
];

const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-link="${id}"]`)
);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected) {
  selectedNavItem.classList.remove('selected');
  selectedNavItem = selected;
  selectedNavItem.classList.add('selected');
}

// 매개변수 위치로 이동(스크롤)하는 함수
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.4,
};
const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      //스크롤이 아래로 되어서 페이지가 올라옴
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};
const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

window.addEventListener('wheel', () => {
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (
    Math.round(window.scrollY + window.innerHeight) >=
    document.body.clientHeight
  ) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});
