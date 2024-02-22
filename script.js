const button = document.querySelector('.toggletheme');
const body = document.body;
const header = document.querySelector('header');
const logo = document.getElementById('logo');
const lightbulb = document.querySelector('.lightbulb');
const logolink = document.getElementById('logolink'); 
const togglelang = document.querySelector('.togglelang');
const languageBox = document.querySelector('.language-dropdown');
const languageOptions = document.querySelectorAll('.language-dropdown img');

let currentLanguage = 'english';

function loadJSON(file, callback) {   
    fetch(file)
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => console.error('Error loading JSON:', error));
}


function updateTextContent(language) {
    const encodedLanguage = encodeURIComponent(language);
    
    const jsonFile = language === 'english' ? 'english.json' : 'russian.json';
    
    loadJSON(jsonFile, function(response) {
        try {
            var translations = response; // No need to parse JSON since fetch returns JSON data
            console.log(translations); // Log translations to verify they are loaded correctly
            Object.keys(translations).forEach(function(key) {

                var elements = document.querySelectorAll('[data-translation="' + key + '"]');
                elements.forEach(function(element) {
                    if (element.classList.contains('rectangle-title')) {
                        // Update text color for "Lorem Ipsum" text
                        element.style.color = '#ff8424'; // Orange color
                    } else {
                        // Update text content for other elements
                        element.innerText = decodeURIComponent(translations[key]);
                    }
                });
            });
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    });
}

// Function to toggle language
// Function to toggle language
// Function to toggle language
function toggleLanguage(event) {
    // Get the target language based on the clicked image
    let targetLanguage = event.target.alt.toLowerCase();
    
    // Set the language box image based on the target language
    document.querySelector('.languagebox').src = targetLanguage === 'english' ? 'transeng.png' : 'transrus.png';
    
    // Update the text content only if the target language is different from the current language
    if (currentLanguage !== targetLanguage) {
        currentLanguage = targetLanguage;
        updateTextContent(currentLanguage);
    }
}






// Event listener for language options
languageOptions.forEach(option => {
    option.addEventListener('click', toggleLanguage);
    });

button.addEventListener('click', () => {
    const currentTheme = body.classList.contains('darktheme') ? 'darktheme' : 'lighttheme';

    body.classList.toggle(currentTheme);
    header.classList.toggle(currentTheme);
    
    const currentLogo = logo.src;
    const darkLogoPath = 'darklogo.png';
    const lightLogoPath = 'lightlogo.png';

    if (currentLogo.includes(darkLogoPath)) {
        logo.src = lightLogoPath;
        lightbulb.src = 'transblack.png';
    } else if (currentLogo.includes(lightLogoPath)) {
        logo.src = darkLogoPath;
        lightbulb.src = 'transwhite.png';
    }
});

logolink.addEventListener('click', (event) => {
    const homepageURL = 'index.html';

    if (window.location.pathname === '/' || window.location.pathname === homepageURL) {
        event.preventDefault();
    }
});

function openLangbox() {
    const dropdown = document.querySelector('.language-dropdown');
    dropdown.classList.toggle('show');
  }
  document.addEventListener('click', function(event) {
    const isLanguageButton = event.target.closest('.togglelang');
    const dropdown = document.querySelector('.language-dropdown');
    
    if (!isLanguageButton && dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
    }
});
