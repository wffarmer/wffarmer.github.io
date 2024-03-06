const hamburger = document.getElementById("burgerbars");
const leftmenu = document.querySelector(".leftmenu");

const languageSelect = document.getElementById('togglelang');


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
const topmenu = document.querySelector(".topmenu");
const themeSelect = document.querySelector("select[name='theme']");
const colorSelect = document.querySelector("select[name='color']");

if (theme.classList.contains("theme")){
    theme.classList.add("darktheme");
}


themeSelect.addEventListener("change", function() {
    const selectedTheme = this.value;
  
    const burgerImg = document.getElementById("burgerbars");
    const logoImg = document.getElementById("logo").querySelector("img");
    const logo = document.getElementById("logo");

    const color = document.querySelector("select[name='color']").value; // Get the current text color
    const logoSuffix = color === "orange" ? "" : `${color.toLowerCase()}`; // Append color to logo filename if not orange


    if (selectedTheme === "darktheme") {
        burgerImg.src = `images/${logoSuffix}burger.png`; 
        logoImg.src = `images/${logoSuffix}logo.png`;
        theme.classList.add("darktheme");
        topmenu.classList.add("darktheme");
        theme.classList.remove("lighttheme");
        topmenu.classList.remove("lighttheme"); 
        document.querySelector(".leftmenu.active").style.backgroundColor = "var(--darkbgmenu)";
    } else if (selectedTheme === "lighttheme") {
        burgerImg.src = "images/lightburger.png";
        logoImg.src = "images/lightlogo.png";
        theme.classList.add("lighttheme"); 
        topmenu.classList.add("lighttheme");
        theme.classList.remove("darktheme"); 
        topmenu.classList.remove("darktheme");
        document.querySelector(".leftmenu.active").style.backgroundColor = "var(--lightbgmenu)";
    }
  });

  colorSelect.addEventListener("change", function() {
    const selectedColor = this.value;
    const darktheme = document.querySelector(".darktheme");
    
    const burgerImg = document.getElementById("burgerbars");
    const logoImg = document.getElementById("logo").querySelector("img");

    // Remove all other color classes before applying the selected one
    darktheme.classList.remove("white", "red", "blue", "orange"); // Optimized
  
    if (selectedColor) { // Check if a color is selected (handles potential null value)
      darktheme.classList.add(selectedColor);
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
  });



  document.addEventListener("DOMContentLoaded", function() {

    languageSelect.addEventListener("change", function() {
        const selectedLanguage = this.value;
        loadTranslations(selectedLanguage);
    });
});

function loadTranslations(language) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
              const translations = JSON.parse(xhr.responseText);
              translatePage(translations);
          } else {
              console.error('Failed to load translations');
          }
      }
  };

  // Replace 'translations_en.json' and 'translations_ru.json' with your actual file names
  xhr.open('GET', `/jsons/${language}.json`, true);
  xhr.send();
}

function translatePage(translations) {
  const elements = document.querySelectorAll('[data-translate]');
  elements.forEach(element => {
      const key = element.dataset.translate;
      if (translations[key]) {
        if (element.hasAttribute('placeholder')) {
          element.placeholder = translations[key];
        } else {
          element.textContent = translations[key];
        }
      }
  });
}

document.addEventListener("DOMContentLoaded", function() {
  loadLanguage(languageSelect.value);

  languageSelect.addEventListener("change", function() {
    const selectedLanguage = this.value;
    loadLanguage(selectedLanguage);
  });
});

function loadLanguage(language) {
  // Fetch the JSON file corresponding to the selected language
  const filename = language === 'russian' ? 'jsons/russian.json' : 'jsons/english.json';
  fetch(filename)
      .then(response => {
          if (!response.ok) {
              throw new Error(`Failed to load language data for ${language}`);
          }
          return response.json();
      })
      .then(data => {
          // Update all text content with the language data
          updateLanguageText(data);
      })
      .catch(error => {
          console.error(error);
      });
}

function updateLanguageText(data) {
  // Update text content for all elements with the corresponding data from the JSON
  // For example:
  document.getElementById('pg').textContent = data.paragraph;
  // Add more similar lines for other elements as needed
}


