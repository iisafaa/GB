// Function to change the language
function changeLanguage(language) {
  // Load the appropriate language file based on 'language'
  fetch(`lang-${language}.json`)
    .then((response) => response.json())
    .then((translations) => {
      document.querySelectorAll('[data-lang]').forEach((element) => {
        const translationKey = element.getAttribute('data-lang');
        if (translations[translationKey]) {
          element.textContent = translations[translationKey];
        }
      });
    });

  // Save the selected language in local storage
  localStorage.setItem('selectedLanguage', language);

  // Change the stylesheet based on the selected language
  const arabicStylesheet = document.getElementById('ar-stylesheet');
  const englishStylesheet = document.getElementById('eng-stylesheet');

  if (language === 'arabic') {
    arabicStylesheet.disabled = false;
    englishStylesheet.disabled = true;
  } else {
    arabicStylesheet.disabled = true;
    englishStylesheet.disabled = false;
  }
}

// Load language selection on page load
const storedLanguage = localStorage.getItem('selectedLanguage');
if (storedLanguage) {
  changeLanguage(storedLanguage);
}

// Example usage when the Arabic button is clicked
document.getElementById('ar').addEventListener('click', () => {
  changeLanguage('arabic');
  window.location.href = 'staticsPage.html'; // Optionally, navigate to another page
});

// Example usage when the English button is clicked
document.getElementById('eng').addEventListener('click', () => {
  changeLanguage('english');
  window.location.href = 'staticsPage.html'; // Optionally, navigate to another page
});

