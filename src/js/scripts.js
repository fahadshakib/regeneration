"use strict";

const sections = document.querySelectorAll("section");
const containers = document.querySelectorAll(".introduction__container");
const header = document.querySelector(".header");
const footer = document.querySelector(".footer");
const links = document.querySelectorAll(".header__sidebar--link");
const introduction = document.querySelector(".introduction");
const navigation = document.querySelector(".navigation");
const tabs = document.querySelector(".partners__content");
const introductionInitialTop = introduction.getBoundingClientRect().top;


//Fixed Navigation
////////////////////////////////////////////////////////
window.addEventListener("scroll", () => {
  const currTop = introduction.getBoundingClientRect().top;
  if (currTop < introductionInitialTop) navigation.classList.add("fixed");
  else navigation.classList.remove("fixed");
});

// Observing Intersection of Sections
//////////////////////////////////////////////////////
const observeSection = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  let id = entry.target.getAttribute("id");
  // Animating Links

  if (id === "header" || id === "footer") {
    links.forEach((link) => {
      link.classList.remove("link-active");
      link.nextElementSibling.classList.add("text-hidden");
    });
  } else {
    const currTarget = document.querySelector(`.header__sidebar--link-${id}`);
    const sibling = currTarget.nextElementSibling;
    links.forEach((link) => {
      link.classList.remove("link-active");
      link.nextElementSibling.classList.add("text-hidden");
    });
    currTarget.classList.add("link-active");
    sibling.classList.remove("text-hidden");
  }
  //////////////////////////////////////////////

  if (id === "mission") {
    entry.target.style.animation = "slideFromBottom 0.6s ease";
    observer.unobserve(entry.target);
  }

  if (id === "process" || id === "partners") {
    const target =
      entry.target.firstChild.nextElementSibling.querySelectorAll("*");
    target.forEach((child) => {
      child.classList.remove("hidden");
      child.style.animation = "slideFromBottom 0.6s ease";
      observer.unobserve(child);
    });
  }
};

const observerSection = new IntersectionObserver(observeSection, {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
});

[...sections, header, footer].forEach((sec) => {
  observerSection.observe(sec);
});

// Observing Intersection of individual Containers
//////////////////////////////////////////////////////
const observeContainers = (entries, observer) => {
  const [item] = entries;
  if (!item.isIntersecting) return;
  let left, right;
  if (item.target.firstChild.nextElementSibling === null) {
    left = item.target.firstChild.previousElementSibling;
    right = item.target.lastChild.nextElementSibling;
  } else {
    left = item.target.firstChild.nextElementSibling;
    right = item.target.lastChild.previousElementSibling;
  }
  item.target.classList.remove("hidden");
  left.style.animation = "slideFromLeft 0.7s ease";
  right.style.animation = "slideFromRight .8s ease";
  observer.unobserve(item.target);
};
const observerContainer = new IntersectionObserver(observeContainers, {
  root: null,
  rootMargin: "0px",
  threshold: 0.25,
});
containers.forEach((item) => {
  observerContainer.observe(item);
  item.classList.add("hidden");
});
//Accordion
/////////////////////////////////////////////////

tabs.addEventListener("click", (e) => {
  const plus = e.target.closest(".tab__icon--plus");
  if (!plus) return;
  const minus = plus.nextElementSibling;
  const details = plus.parentElement.parentElement.nextElementSibling;
  plus.classList.add("hidden");
  minus.classList.remove("hidden");
  details.classList.remove("hidden");
  minus.addEventListener("click", (e) => {
    plus.classList.remove("hidden");
    minus.classList.add("hidden");
    details.classList.add("hidden");
  });
});
