const hamburger = document.getElementById("burgerbars");
const leftmenu = document.querySelector(".leftmenu");

hamburger.addEventListener("click", () => {
    const leftmenu = document.querySelector(".leftmenu");
    leftmenu.classList.toggle("active");
})

document.addEventListener("click", (event) => {
    const leftMenu = document.querySelector(".leftmenu");
    const hamburger = document.getElementById("burgerbars"); // Get the hamburger menu element
  
    // Check if the clicked element is part of the left menu or the hamburger menu
    const isLeftMenuClick = leftMenu.contains(event.target) || event.target === hamburger;
  
    if (leftMenu.classList.contains("active") && !isLeftMenuClick) {
      leftMenu.classList.remove("active");
    }
  });

const theme = document.querySelector(".theme");
const themeSelect = document.querySelector("select[name='theme']");

themeSelect.addEventListener("change", function() {
    const selectedTheme = this.value;
  
    const burgerImg = document.getElementById("burgerbars");
    const logoImg = document.getElementById("logo").querySelector("img");

    if (selectedTheme === "darktheme") {
        burgerImg.src = "images/burger.png"; 
        logoImg.src = "images/logo.png";
        theme.classList.add("darktheme");
        theme.classList.remove("lighttheme"); 
        document.querySelector(".leftmenu.active").style.backgroundColor = "var(--darkbgmenu)";
    } else if (selectedTheme === "lighttheme") {
        burgerImg.src = "images/lightburger.png";
        logoImg.src = "images/lightlogo.png";
        theme.classList.add("lighttheme"); 
        theme.classList.remove("darktheme"); 
        document.querySelector(".leftmenu.active").style.backgroundColor = "var(--lightbgmenu)";
    }
  });



