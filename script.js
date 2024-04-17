const hamburger = document.getElementById("burgerbars");
const leftmenu = document.querySelector(".leftmenu");
const theme = document.querySelector(".theme");
const topmenu = document.querySelector(".topmenu");
const themeSelect = document.querySelector("select[name='theme']");
const colorSelect = document.querySelector("select[name='color']");
const okButton = document.querySelector(".ok");
const disclaimer = document.querySelector(".disclaimer");  
const p = document.querySelector(".maintext");
const content = document.querySelector(".content");
const storedTheme = localStorage.getItem("selectedTheme");
const storedColor = localStorage.getItem("selectedColor");  
const iframe = document.querySelector(".content iframe");
const maintext = document.querySelector(".maintext");
const footer = document.querySelector(".footer");

disclaimerHidden = localStorage.getItem("disclaimerHidden");

function replaceNewlinesWithBreaks(text) {
  return text.replace(/\\n/g, '<br>');
}

if (!theme.classList.contains("darktheme")) {
  leftmenu.classList.add("darktheme");
  footer.classList.add("darktheme");
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
}

themeSelect.addEventListener("change", function() {
  applyThemeAndColor();
  saveSettingsToLocalStorage();
});

colorSelect.addEventListener("change", function() {
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
    if (leftmenu.classList.contains("active")) {
      disclaimer.style.left = "175px";
      disclaimer.style.width = `calc(100% - 175px)`;
  } else {
      disclaimer.style.left = "0";
      disclaimer.style.width = "100%";
  }
  if(disclaimerHidden)
    {
      disclaimer.style.display = "none";
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
      disclaimerHidden = localStorage.getItem("disclaimerHidden");
      if (!disclaimerHidden){
        disclaimer.style.left = "0";
        disclaimer.style.width = "100%";
      }
      if(disclaimerHidden)
    {
      disclaimer.style.display = "none";
    }
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
        theme.classList.remove("darktheme"); 
        topmenu.classList.remove("darktheme");
        leftmenu.classList.remove("darktheme");
        footer.classList.remove("darktheme");
        localStorage.setItem("selectedTheme", this.value);
        
      }

    localStorage.setItem("selectedTheme", this.value);
  });

  colorSelect.addEventListener("change", function() {
    const selectedColor = this.value;
    const darktheme = document.querySelector(".darktheme");

    const burgerImg = document.getElementById("burgerbars");
    const logoImg = document.getElementById("logo").querySelector("img");

    darktheme.classList.remove("white", "red", "blue", "orange"); 
    footer.classList.remove("white", "red", "blue", "orange");
    if (selectedColor) { 
      darktheme.classList.add(selectedColor);
      footer.classList.add(selectedColor);
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
    } else if (selectedColor === "orange") {
        burgerImg.src = "images/burger.png"; 
        logoImg.src = "images/logo.png";
    }

    localStorage.setItem("selectedColor", this.value);
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
  }

  const storedColor = localStorage.getItem("selectedColor");
  if (storedColor) {
    colorSelect.value = storedColor;
    colorSelect.dispatchEvent(new Event("change"));
  }
});

okButton.addEventListener("click", function() {
  disclaimer.style.display = "none";
  localStorage.setItem("disclaimerHidden", "true");
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

  window.onload = function() {
    if(disclaimerHidden)
    {
      disclaimer.style.display = "none";
    }
    setTimeout(function() {
      maintext.style.paddingTop = (30 + disclaimer.clientHeight) + 'px';
  }, 25);
};
});