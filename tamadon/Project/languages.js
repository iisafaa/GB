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
  
  // Example usage when the Arabic button is clicked
  document.getElementById('ar').addEventListener('click', () => {
    changeLanguage('arabic');
  });
  
  // Example usage when the English button is clicked
  document.getElementById('eng').addEventListener('click', () => {
    changeLanguage('english');
  });
  