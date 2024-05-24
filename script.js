const hamburger = document.getElementById("burgerbars");
const leftmenu = document.querySelector(".leftmenu");
const theme = document.querySelector(".theme");
const topmenu = document.querySelector(".topmenu");
const themeSelect = document.querySelector("select[name='theme']");
const colorSelect = document.querySelector("select[name='color']");
const okButton = document.querySelector(".ok");
const disclaimer = document.querySelector(".disclaimer");  
const content = document.querySelector(".content");
const links = document.querySelectorAll(".content a");
const storedTheme = localStorage.getItem("selectedTheme");
const storedColor = localStorage.getItem("selectedColor");  
const iframe = document.querySelector(".content iframe");
const maintext = document.querySelector(".maintext");
const footer = document.querySelector(".footer");
const colors = ["white", "red", "blue", "orange", "yellow"];
const searchForm = document.getElementById("searchform");
const searchInput = document.getElementById("searcharea");
const elements = document.querySelectorAll(".content ul li p");
const imageUrls = ["/images/icon.png", "/images/yellowlogo.png", "/images/yellowburger.png", "/images/logo.png", 
"/images/bluelogo.png", "/images/redlogo.png", "/images/whitelogo.png", "/images/burger.png", 
"/images/blueburger.png", "/images/redburger.png", "/images/whiteburger.png", "/images/1.png", 
"/images/2.png", "/images/lightburger.png", "/images/builds.png", "/images/lightlogo.png",
"/images/gauss1.png", "/images/gauss2.png", "/images/titania1.png", "/images/dexpixia.png"];
const searchResultsList = document.getElementById("searchResultsList");
const pages = [ 
  {title:"Top Warframe Platinum Farm for Beginners", url:"plat.html"}, 
  {title:"Warframe Void Fissures Guide", url:"voidfissures.html"}, 
  {title:"Warframe Builds for Void Fissures", url:"buildsforfissures.html"}
];



disclaimershow = localStorage.getItem("disclaimershow");
if(localStorage.getItem("disclaimershow") !== "true" && localStorage.getItem("disclaimershow") !== "false")
{
  disclaimershow = "true";
}

function getSearchResults(searchTerm) {
  const filteredResults = pages.filter(page => page.title.toLowerCase().includes(searchTerm.toLowerCase()));
  return filteredResults;
}

searchForm.addEventListener("submit", function(event) {
   const searchTerm = searchInput.value.trim().toLowerCase(); // Lowercase the search term
   event.preventDefault(); 
  
   const results = [];
   const titles = pages.map(page => page.title);
  
  
   for (const title of titles) {
    if (title.toLowerCase().includes(searchTerm)) {
     results.push(title); 
    }
   }
   
  
   if (results.length > 0) {
    window.location.href = `searchresults.html?s=${encodeURIComponent(searchTerm)}`;
    console.log(results);
   } else {
    window.location.href = `nothingfound.html?s=${searchTerm}`;
   }
  });

function preloadImages(urls) {
  urls.forEach(url => {
      const img = new Image();
      img.src = url;
  });
}

$(document).ready(function() {
  $('.maintext').hide();
  $('.disclaimer').hide();
  $('.topmenu').hide();
  $('.content').hide();
  $('.footer').hide();
});

$(window).on('load', function() {
  setTimeout(() => {
    maintext.style.display = "block";
    if(disclaimershow === "true")
    {
      disclaimer.style.display = "flex";
      $('.disclaimer').show();
      maintext.style.paddingTop = (30 + disclaimer.clientHeight) + 'px';
    }
    $('.maintext').show();
    topmenu.style.display = "flex";
    $('.topmenu').show();
    content.style.display = "flex";
  $('.content').show();
    footer.style.display = "flex";
  $('.footer').show();
  searchInput.value = "";
}, 100);
});

preloadImages(imageUrls);

function replaceNewlinesWithBreaks(text) {
  return text.replace(/\\n/g, '<br>');
}

if (!theme.classList.contains("darktheme")) {
  leftmenu.classList.add("darktheme");
  footer.classList.add("darktheme");
  content.classList.add("darktheme");
}

function saveSettingsToLocalStorage() {
  localStorage.setItem("selectedTheme", themeSelect.value);
  localStorage.setItem("selectedColor", colorSelect.value);
}

function applyThemeAndColor() {
  const selectedTheme = themeSelect.value;
  const selectedColor = colorSelect.value;

  theme.className = "theme";

  theme.classList.add(selectedTheme);
  theme.classList.add(selectedColor);
  topmenu.classList.add(selectedTheme);
  topmenu.classList.add(selectedColor);
  leftmenu.classList.add(selectedTheme);
  leftmenu.classList.add(selectedColor);
  footer.classList.add(selectedTheme);
  footer.classList.add(selectedColor);
  content.classList.add(selectedTheme);
  content.classList.add(selectedColor);
}

themeSelect.addEventListener("change", function() {
  applyThemeAndColor();
  saveSettingsToLocalStorage();
});

if (storedTheme) {
  themeSelect.value = storedTheme;
}
if (storedColor) {
  colorSelect.value = storedColor;
}

applyThemeAndColor();

hamburger.addEventListener("click", () => {
    leftmenu.classList.toggle("active");
    if (leftmenu.classList.contains("active") && disclaimershow === "true") {
      disclaimer.style.left = "175px";
      disclaimer.style.width = `calc(100% - 175px)`;
  } else {
      disclaimer.style.left = "0";
      disclaimer.style.width = "100%";
  }
    setTimeout(function() {
      maintext.style.paddingTop = (30 + disclaimer.clientHeight) + 'px';
  }, 25);
})

document.addEventListener("click", (event) => {
    const isLeftMenuClick = leftmenu.contains(event.target) || event.target === hamburger;
    const isDisclaimerButtonClick = event.target === okButton || event.target.closest('.disclaimer');;

    if (leftmenu.classList.contains("active") && !isLeftMenuClick && !isDisclaimerButtonClick) {
      leftmenu.classList.remove("active");
      disclaimer.style.left = "0";
      disclaimer.style.left = "1";
      disclaimer.style.left = "0";
      disclaimer.style.width = "100%";
    setTimeout(function() {
      maintext.style.paddingTop = (30 + disclaimer.clientHeight) + 'px';
  }, 25);
    }
  });

themeSelect.addEventListener("change", function() {
    const selectedTheme = this.value;
    const color = document.querySelector("select[name='color']").value;
    const logo = document.getElementById("logo");
  
    const burgerImg = document.getElementById("burgerbars");
    const logoImg = document.getElementById("logo").querySelector("img");
    const logoSuffix = color === "orange" ? "" : `${color.toLowerCase()}`;


    if (selectedTheme === "darktheme") {
        burgerImg.src = `images/${logoSuffix}burger.png`; 
        logoImg.src = `images/${logoSuffix}logo.png`;
        theme.classList.add("darktheme");
        topmenu.classList.add("darktheme");
        leftmenu.classList.add("darktheme");
        footer.classList.add("darktheme");
        content.classList.add("darktheme");
        content.classList.remove("lighttheme");
        theme.classList.remove("lighttheme");
        topmenu.classList.remove("lighttheme");
        leftmenu.classList.remove("lighttheme");
        footer.classList.remove("lighttheme");
        localStorage.setItem("selectedTheme", this.value);
      } else if (selectedTheme === "lighttheme") {
        burgerImg.src = "images/lightburger.png";
        logoImg.src = "images/lightlogo.png";
        theme.classList.add("lighttheme"); 
        topmenu.classList.add("lighttheme");
        leftmenu.classList.add("lighttheme");
        footer.classList.add("lighttheme");
        content.classList.add("lighttheme");
        content.classList.remove("darktheme");
        theme.classList.remove("darktheme"); 
        topmenu.classList.remove("darktheme");
        leftmenu.classList.remove("darktheme");
        footer.classList.remove("darktheme");
        localStorage.setItem("selectedTheme", this.value);
        
      }
      applyThemeAndColor();
      saveSettingsToLocalStorage();

    localStorage.setItem("selectedTheme", this.value);
  });

  colorSelect.addEventListener("change", function() {
    const selectedColor = this.value;
    const darktheme = document.querySelector(".darktheme");

    const burgerImg = document.getElementById("burgerbars");
    const logoImg = document.getElementById("logo").querySelector("img");

    colors.forEach(className => {
      if(darktheme !== null)
      if (darktheme.classList.contains(className)) {
          darktheme.classList.remove(className);
      }
  });
  if(darktheme !== null){
    footer.classList.remove("white", "red", "blue", "orange", "yellow");
    content.classList.remove("white", "red", "blue", "orange", "yellow");
    topmenu.classList.remove("white", "red", "blue", "orange", "yellow");
    if (selectedColor) { 
      darktheme.classList.add(selectedColor);
      footer.classList.add(selectedColor);
      content.classList.add(selectedColor);
      leftmenu.classList.add(selectedColor);
      colors.forEach(color =>{
        if(color !== selectedColor){
        leftmenu.classList.remove(color);
        }
      })
    }
    else{ //DEFAULT COLOR
      darktheme.classList.add("yellow");
      footer.classList.add("yellow");
      content.classList.add("yellow");
      leftmenu.classList.add("yellow");
    }
    
    if (selectedColor === "red") {
        burgerImg.src = "images/redburger.png"; 
        logoImg.src = "images/redlogo.png";
    } else if (selectedColor === "white") {
        burgerImg.src = "images/whiteburger.png"; 
        logoImg.src = "images/whitelogo.png";
    } else if (selectedColor === "blue") {
        burgerImg.src = "images/blueburger.png"; 
        logoImg.src = "images/bluelogo.png";
    } 
    else if (selectedColor === "yellow") {
      burgerImg.src = "images/yellowburger.png"; 
      logoImg.src = "images/yellowlogo.png";
    }
    else if (selectedColor === "orange") {
        burgerImg.src = "images/burger.png"; 
        logoImg.src = "images/logo.png";
    }
  }
  applyThemeAndColor();
  saveSettingsToLocalStorage();
  });

function translatePage(translations) {
  const elements = document.querySelectorAll('[data-translate]');
  elements.forEach(element => {
      const key = element.dataset.translate;
      if (translations[key]) {
        const translatedText = translations[key]
        if (element.hasAttribute('placeholder')) {
          element.placeholder = translatedText;
        } else {
          element.innerHTML = translatedText;;
        }
      }
  });
}

document.addEventListener("DOMContentLoaded", function() {

  const storedTheme = localStorage.getItem("selectedTheme");
  if (storedTheme) {
    themeSelect.value = storedTheme;
    themeSelect.dispatchEvent(new Event("change"));
    colorSelect.dispatchEvent(new Event("change"));
  }
  else{
    themeSelect.dispatchEvent(new Event("change"));
    colorSelect.dispatchEvent(new Event("change"));
  }

  const storedColor = localStorage.getItem("selectedColor");
  if (storedColor) {
    colorSelect.value = storedColor;
    colorSelect.dispatchEvent(new Event("change"));
  }
  else{
    colorSelect.dispatchEvent(new Event("change"));
  }
  var screenWidth = window.innerWidth;
});

okButton.addEventListener("click", function() {
  disclaimer.style.display = "none";
  localStorage.setItem("disclaimershow", "false");
  setTimeout(function() {
    maintext.style.paddingTop = (30 + disclaimer.clientHeight) + 'px';
}, 25);
});

window.addEventListener('DOMContentLoaded', function() {
  function updateInputWidth() {
      var input = document.querySelector('input');
      var screenWidth = window.innerWidth;
      var newWidth = (screenWidth - 260) + 'px';

      if (screenWidth < 475) {
          input.style.width = newWidth;
      } else {
          input.style.width = '175px';
      }
  }

  updateInputWidth();

  window.addEventListener('resize', function() {
      updateInputWidth();
      setTimeout(function() {
        maintext.style.paddingTop = (30 + disclaimer.clientHeight) + 'px';
    }, 25);
  });
});