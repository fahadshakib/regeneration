"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var sections = document.querySelectorAll("section");
var containers = document.querySelectorAll(".introduction__container");
var header = document.querySelector(".header");
var footer = document.querySelector(".footer");
var links = document.querySelectorAll(".header__sidebar--link");
var introduction = document.querySelector(".introduction");
var navigation = document.querySelector(".navigation");
var tabs = document.querySelector(".partners__content");
var introductionInitialTop = introduction.getBoundingClientRect().top;

//Fixed Navigation
////////////////////////////////////////////////////////
window.addEventListener("scroll", function () {
  var currTop = introduction.getBoundingClientRect().top;
  if (currTop < introductionInitialTop) navigation.classList.add("fixed");else navigation.classList.remove("fixed");
});

// Observing Intersection of Sections
//////////////////////////////////////////////////////
var observeSection = function observeSection(entries, observer) {
  var _entries = _slicedToArray(entries, 1),
    entry = _entries[0];
  if (!entry.isIntersecting) return;
  var id = entry.target.getAttribute("id");
  // Animating Links

  if (id === "header" || id === "footer") {
    links.forEach(function (link) {
      link.classList.remove("link-active");
      link.nextElementSibling.classList.add("text-hidden");
    });
  } else {
    var currTarget = document.querySelector(".header__sidebar--link-".concat(id));
    var sibling = currTarget.nextElementSibling;
    links.forEach(function (link) {
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
    var target = entry.target.firstChild.nextElementSibling.querySelectorAll("*");
    target.forEach(function (child) {
      child.classList.remove("hidden");
      child.style.animation = "slideFromBottom 0.6s ease";
      observer.unobserve(child);
    });
  }
};
var observerSection = new IntersectionObserver(observeSection, {
  root: null,
  rootMargin: "0px",
  threshold: 0.3
});
[].concat(_toConsumableArray(sections), [header, footer]).forEach(function (sec) {
  observerSection.observe(sec);
});

// Observing Intersection of individual Containers
//////////////////////////////////////////////////////
var observeContainers = function observeContainers(entries, observer) {
  var _entries2 = _slicedToArray(entries, 1),
    item = _entries2[0];
  if (!item.isIntersecting) return;
  var left, right;
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
var observerContainer = new IntersectionObserver(observeContainers, {
  root: null,
  rootMargin: "0px",
  threshold: 0.25
});
containers.forEach(function (item) {
  observerContainer.observe(item);
  item.classList.add("hidden");
});
//Accordion
/////////////////////////////////////////////////

tabs.addEventListener("click", function (e) {
  var plus = e.target.closest(".tab__icon--plus");
  if (!plus) return;
  var minus = plus.nextElementSibling;
  var details = plus.parentElement.parentElement.nextElementSibling;
  plus.classList.add("hidden");
  minus.classList.remove("hidden");
  details.classList.remove("hidden");
  minus.addEventListener("click", function (e) {
    plus.classList.remove("hidden");
    minus.classList.add("hidden");
    details.classList.add("hidden");
  });
});