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
    "/assets/1.png",
    "/assets/2.png",
    "/assets/3.png",
  ],
};

const imageContainer = document.getElementById("view-image-container");
const viewImage = document.getElementById("view-image");
const navigation = document.querySelector(".navigation .buttons");

product.images.forEach((image) => {
  const button = document
    .querySelector(".navigation .clonnable")
    .cloneNode(true);
  button.classList.remove("none", "clonnable");
  button.querySelector("img").src = image;

  navigation.appendChild(button);
});

const navButtons = document.querySelectorAll(
  ".navigation .buttons button:not(.clonnable)"
);

navButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    viewImage.setAttribute("src", button.firstElementChild.src);
    navButtons.forEach((button) => button.classList.remove("selected"));
    button.classList.add("selected");
  });

  if (index == 0) {
    button.classList.add("selected");
  }
});

viewImage.addEventListener("load", (e) => {
  if (viewImage.width > viewImage.height) {
    imageContainer.style.width = "100%";
    imageContainer.style.height = "auto";
    imageContainer.style.borderLeft = 0;
    imageContainer.style.borderRight = 0;
    imageContainer.style.borderTop = "1px solid #9da7b0";
    imageContainer.style.borderBottom = "1px solid #9da7b0";
    viewImage.style.width = "100%";
    viewImage.style.height = "auto";
  } else {
    imageContainer.style.height = "100%";
    imageContainer.style.width = "auto";
    imageContainer.style.borderTop = 0;
    imageContainer.style.borderBottom = 0;
    imageContainer.style.borderLeft = "1px solid #9da7b0";
    imageContainer.style.borderRight = "1px solid #9da7b0";
    viewImage.style.height = "100%";
    viewImage.style.width = "auto";
  }
});

let imagesDisplayed = 6;
let bottomScrolled = 0;
const topNavButton = document.getElementById("top-nav-button");
const bottomNavButton = document.getElementById("bottom-nav-button");

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
  if (imagesDisplayed + bottomScrolled == product.images.length) {
    return;
  }
  topNavButton.removeAttribute("disabled");
  bottomScrolled++;

  if (imagesDisplayed + bottomScrolled == product.images.length) {
    bottomNavButton.disabled = true;
  }

  const computedTop = window.getComputedStyle(navigation).top;
  const currentTop = parseFloat(computedTop); // e.g., "0px" -> 0
  const newTop = currentTop - 64;

  navigation.style.top = `${newTop}px`;
});

(function bootstrap() {
  // Set the first image of product into view image
  if (product.images.length > 0) {
    viewImage.setAttribute("src", product.images[0]);
  }

  if (imagesDisplayed < product.images.length) {
    document.getElementById("bottom-nav-button").removeAttribute("disabled");
    navigation.style.top = 0;
  }
})();
