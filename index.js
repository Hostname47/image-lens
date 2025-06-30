const product = {
  name: "Stoeger STR-9 Semi-Auto Pistol - 9mm",
  price: 274.97,
  currency: "$",
  reviews: {
    count: 19,
    percentage: 4.6,
  },
  description:
    "The Stoeger® STR-9 Semi-Auto Pistol utilizes a striker-fired mechanism and outstanding ergonomics to deliver rapid shots with unfailing reliability. The polymer frame features aggressive texturing, thumb groves, and an under-cut trigger guard to provide a non-slip hold and position the shooter's hand close to the bore axis for enhanced control and quick follow-up shots.",
  features: [
    "Striker-fired operation",
    "Interchangeable backstrap",
    "Dovetailed, 3-dot sights",
    "Trigger lever safety",
  ],
  images: [
    "/assets/1.png",
    "/assets/2.png",
    "/assets/3.png",
    "/assets/4.png",
    "/assets/5.png",
    "/assets/6.png",
    "/assets/2.png",
    "/assets/3.png",
  ],
};

const imageContainer = document.getElementById("view-image-container");
const viewImage = document.getElementById("view-image");

const navigation = document.querySelector(".navigation .buttons");
const topNavButton = document.getElementById("top-nav-button");
const bottomNavButton = document.getElementById("bottom-nav-button");
const NAVIGATION_SIZE = 6;
let bottomScrolled = 0;

const previewBox = document.getElementById("preview-box");
const previewImage = document.getElementById("preview-image");

const lens = document.getElementById("lens");
const lensSize = 80;
const lensHalfSize = lensSize / 2;

viewImage.addEventListener("load", (e) => {
  const borderStyle = "1px solid #9da7b0";
  if (viewImage.width > viewImage.height) {
    imageContainer.style.width = "100%";
    imageContainer.style.height = "auto";
    imageContainer.style.borderLeft = 0;
    imageContainer.style.borderRight = 0;
    imageContainer.style.borderTop = borderStyle;
    imageContainer.style.borderBottom = borderStyle;
    viewImage.style.width = "100%";
    viewImage.style.height = "auto";
  } else {
    imageContainer.style.height = "100%";
    imageContainer.style.width = "auto";
    imageContainer.style.borderTop = 0;
    imageContainer.style.borderBottom = 0;
    imageContainer.style.borderLeft = borderStyle;
    imageContainer.style.borderRight = borderStyle;
    viewImage.style.height = "100%";
    viewImage.style.width = "auto";
  }

  const rect = imageContainer.getBoundingClientRect();

  previewImage.style.backgroundSize = `${
    (rect.width / lensSize) * rect.width
  }px`;
});

topNavButton.addEventListener("click", () => {
  if (bottomScrolled == 0) {
    return;
  }

  bottomScrolled--;
  bottomNavButton.removeAttribute("disabled");

  if (bottomScrolled == 0) {
    topNavButton.disabled = true;
  }

  const computedTop = window.getComputedStyle(navigation).top;
  const currentTop = parseFloat(computedTop); // e.g., "0px" -> 0
  const newTop = currentTop + 64;

  navigation.style.top = `${newTop}px`;
});

bottomNavButton.addEventListener("click", () => {
  if (NAVIGATION_SIZE + bottomScrolled == product.images.length) {
    return;
  }
  topNavButton.removeAttribute("disabled");
  bottomScrolled++;

  if (NAVIGATION_SIZE + bottomScrolled == product.images.length) {
    bottomNavButton.disabled = true;
  }

  const computedTop = window.getComputedStyle(navigation).top;
  const currentTop = parseFloat(computedTop); // e.g., "0px" -> 0
  const newTop = currentTop - 64;

  navigation.style.top = `${newTop}px`;
});

(function () {
  product.images.forEach((image) => {
    const button = document
      .querySelector(".navigation .clonnable")
      .cloneNode(true);
    button.classList.remove("none", "clonnable");
    button.querySelector("img").src = image;

    button.addEventListener("click", () => {
      viewImage.setAttribute("src", button.firstElementChild.src);
      previewImage.style.backgroundImage = `url(${button.firstElementChild.src})`;
      navButtons.forEach((button) => button.classList.remove("selected"));
      button.classList.add("selected");
    });

    navigation.appendChild(button);
  });

  const navButtons = document.querySelectorAll(
    ".navigation .buttons button:not(.clonnable)"
  );

  // Set the first image of product into view image
  if (product.images.length > 0) {
    navButtons[0].click();
  }

  if (NAVIGATION_SIZE < product.images.length) {
    document.getElementById("bottom-nav-button").removeAttribute("disabled");
    navigation.style.top = 0;
  }
})();

imageContainer.addEventListener("mouseenter", (e) => {
  lens.style.display = "block";
  previewBox.style.display = "flex";
});

imageContainer.addEventListener("mouseleave", () => {
  lens.style.display = "none";
  previewBox.style.display = "none";
});

imageContainer.addEventListener("mousemove", (e) => {
  const rect = imageContainer.getBoundingClientRect();
  const containerTop = rect.top + window.scrollY;
  const containerLeft = rect.left + window.scrollX;

  let lensLeft = e.pageX - containerLeft - lensHalfSize;
  let lensTop = e.pageY - containerTop - lensHalfSize;

  if (lensLeft <= 0) lensLeft = 0;
  if (lensTop <= 0) lensTop = 0;
  if (lensLeft + lensSize >= rect.width) lensLeft = rect.width - lensSize;
  if (lensTop + lensSize >= rect.height) lensTop = rect.height - lensSize;

  lens.style.left = `${lensLeft}px`;
  lens.style.top = `${lensTop}px`;

  previewImage.style.backgroundPosition = `left ${
    (lensLeft * 100) / (rect.width - lensSize)
  }% top ${(lensTop * 100) / (rect.height - lensSize)}%`;
});
