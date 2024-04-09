const hamburger = document.getElementById("burgerbars");
const leftmenu = document.querySelector(".leftmenu");
const languageSelect = document.getElementById('togglelang');
const theme = document.querySelector(".theme");
const topmenu = document.querySelector(".topmenu");
const themeSelect = document.querySelector("select[name='theme']");
const colorSelect = document.querySelector("select[name='color']");
const okButton = document.querySelector(".ok");
const disclaimer = document.querySelector(".disclaimer");  
const p = document.querySelector(".maintext");
const content = document.querySelector(".content");
const storedLanguage = localStorage.getItem("selectedLanguage");
const storedTheme = localStorage.getItem("selectedTheme");
const storedColor = localStorage.getItem("selectedColor");  
const iframe = document.querySelector(".content iframe");
const maintext = document.querySelector(".maintext");

var disclaimerHidden = localStorage.getItem("disclaimerHidden");

function replaceNewlinesWithBreaks(text) {
  return text.replace(/\\n/g, '<br>');
}

var disclaimerHeight = disclaimer.clientHeight;
if (!disclaimer.style.display === "flex")
{
  disclaimerHeight = "0px";;
}

if (!theme.classList.contains("darktheme")) {
  leftmenu.classList.add("darktheme");
}

function updateIframeSource(language) {
  if (language === 'russian') {
    // Set the iframe source for Russian language
    iframe.src = "https://www.youtube.com/embed/YourRussianVideoID";
  } else {
    // Set the iframe source for English language (or any other language)
    iframe.src = "https://www.youtube.com/embed/YourEnglishVideoID";
  }
}

function saveSettingsToLocalStorage() {
  localStorage.setItem("selectedLanguage", languageSelect.value);
  localStorage.setItem("selectedTheme", themeSelect.value);
  localStorage.setItem("selectedColor", colorSelect.value);
}

function applyLanguage() {
  const selectedLanguage = languageSelect.value;

  // Save selected language to local storage
  localStorage.setItem("selectedLanguage", selectedLanguage);

  // Load translations for the selected language
  loadLanguage(selectedLanguage);
}

function applyThemeAndColor() {
  const selectedTheme = themeSelect.value;
  const selectedColor = colorSelect.value;

  // Reset theme and color classes
  theme.className = "theme";

  // Apply theme and color classes
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

function applyLanguageAndTranslation() {
  const selectedLanguage = languageSelect.value;

  // Save selected language to local storage
  localStorage.setItem("selectedLanguage", selectedLanguage);

  // Fetch and apply translations for the selected language
  loadTranslations(selectedLanguage);
}

if (storedLanguage) {
  languageSelect.value = storedLanguage;
}
if (storedTheme) {
  themeSelect.value = storedTheme;
}
if (storedColor) {
  colorSelect.value = storedColor;
}

applyThemeAndColor();



applyLanguageAndTranslation();

languageSelect.addEventListener("change", function() {
  
  applyLanguageAndTranslation();
  saveSettingsToLocalStorage();
  loadLanguage(this.value);
});

loadLanguage(languageSelect.value);

hamburger.addEventListener("click", () => {
    leftmenu.classList.toggle("active");
    if (leftmenu.classList.contains("active")) {
      disclaimer.style.left = "175px";
      disclaimer.style.width = `calc(100% - 175px)`;
      disclaimerHeight = disclaimer.clientHeight;
      maintext.style.paddingTop = (20 + disclaimerHeight) + 'px';
      p.style.paddingTop = (40 + disclaimerHeight) + 'px';
  } else {
      disclaimer.style.left = "0";
      disclaimer.style.width = "100%";
      
      if (!disclaimer.style.display === "flex")
      {
        disclaimerHeight = "0px";;
      }
      disclaimerHeight = disclaimer.clientHeight;
      maintext.style.paddingTop = (20 + disclaimerHeight) + 'px';
      p.style.paddingTop = (40 + disclaimerHeight) + 'px';
  }
  disclaimerHeight = disclaimer.clientHeight;
  if (!disclaimer.style.display === "flex")
  {
    disclaimerHeight = "0px";;
  }
  //content.style.paddingTop = (30 + disclaimerHeight) + 'px';
  p.style.paddingTop = (40 + disclaimerHeight) + 'px';
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
        disclaimerHeight = disclaimer.clientHeight;
        maintext.style.paddingTop = (20 + disclaimerHeight) + 'px';
        p.style.paddingTop = (40 + disclaimerHeight) + 'px';
      }
    }
  });

themeSelect.addEventListener("change", function() {
    const selectedTheme = this.value;
    const color = document.querySelector("select[name='color']").value;
    const logo = document.getElementById("logo");
  
    const burgerImg = document.getElementById("burgerbars");
    const logoImg = document.getElementById("logo").querySelector("img");
    const logoSuffix = color === "orange" ? "" : `${color.toLowerCase()}`; // Append color to logo filename if not orange


    if (selectedTheme === "darktheme") {
        burgerImg.src = `images/${logoSuffix}burger.png`; 
        logoImg.src = `images/${logoSuffix}logo.png`;
        theme.classList.add("darktheme");
        topmenu.classList.add("darktheme");
        leftmenu.classList.add("darktheme");
        theme.classList.remove("lighttheme");
        topmenu.classList.remove("lighttheme");
        leftmenu.classList.remove("lighttheme");
        localStorage.setItem("selectedTheme", this.value);
      } else if (selectedTheme === "lighttheme") {
        burgerImg.src = "images/lightburger.png";
        logoImg.src = "images/lightlogo.png";
        theme.classList.add("lighttheme"); 
        topmenu.classList.add("lighttheme");
        leftmenu.classList.add("lighttheme");
        theme.classList.remove("darktheme"); 
        topmenu.classList.remove("darktheme");
        leftmenu.classList.remove("darktheme");
        localStorage.setItem("selectedTheme", this.value);
        
      }

    localStorage.setItem("selectedTheme", this.value);
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

    localStorage.setItem("selectedColor", this.value);
  });

    languageSelect.addEventListener("change", function() {
        const selectedLanguage = this.value;
        loadTranslations(selectedLanguage);
        localStorage.setItem("selectedLanguage", this.value);
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

  if (!disclaimerHidden) {
    disclaimer.style.display = "flex"; // Show the disclaimer if it hasn't been clicked before
} else {
    disclaimer.style.display = "none"; // Hide the disclaimer if it has been clicked before
}

  if (!disclaimer.style.display === "flex")
  {
    disclaimerHeight = "0px";;
  }
  else{
    disclaimerHeight = disclaimer.clientHeight;
    maintext.style.paddingTop = (20 + disclaimerHeight) + 'px';
    p.style.paddingTop = (40 + disclaimerHeight) + 'px';
  }
  const storedTheme = localStorage.getItem("selectedTheme");
  if (storedTheme) {
    themeSelect.value = storedTheme;
    // Apply the theme based on the retrieved value
    themeSelect.dispatchEvent(new Event("change")); // Trigger the change event to apply styling
  }

  // Similar logic for loading selected color and language from Local Storage
  const storedColor = localStorage.getItem("selectedColor");
  if (storedColor) {
    colorSelect.value = storedColor;
    // Apply the color based on the retrieved value
    colorSelect.dispatchEvent(new Event("change"));
  }

  const storedLanguage = localStorage.getItem("selectedLanguage");
  if (storedLanguage) {
    languageSelect.value = storedLanguage;
    // Load translations based on the retrieved language
    loadLanguage(storedLanguage);
  }

  //loadLanguage(languageSelect.value); 

  languageSelect.addEventListener("change", function() {
    applyLanguage();
  });
});

loadLanguage(languageSelect.value);

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
  //document.getElementById('pg').textContent = data.paragraph;
  //document.getElementById('pg').textContent = data.paragraph;
  // Add more similar lines for other elements as needed
}

okButton.addEventListener("click", function() {
  disclaimer.style.display = "none";
  localStorage.setItem("disclaimerHidden", "true");
  disclaimerHeight = "0px";
  //content.style.paddingTop = "30px";
  p.style.paddingTop = "40px";
});


document.addEventListener("DOMContentLoaded", function() {
  // Adjust padding-top of the menu based on disclaimer visibility
  if (disclaimer.style.display === "flex") {
    //content.style.paddingTop = `${disclaimer.clientHeight + 30}px`;
    p.style.paddingTop = (40 + disclaimerHeight) + 'px'
  } else {
    //content.style.paddingTop = "30px"; // Default padding-top value
    p.style.paddingTop = "40px";
  }
});

window.addEventListener('resize', function() {
  disclaimerHeight = disclaimer.clientHeight;
  if (!disclaimer.style.display === "flex")
  {
    disclaimerHeight = "0px";;
  }
      
  //content.style.paddingTop = (30 + disclaimerHeight) + 'px';
  p.style.paddingTop = (40 + disclaimerHeight) + 'px';
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
  });
});


