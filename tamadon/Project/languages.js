function changeLanguage(language) {
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

  localStorage.setItem('selectedLanguage', language);

  const arabicStylesheet = document.getElementById('ar-stylesheet');
  const englishStylesheet = document.getElementById('eng-stylesheet');

  if (language === 'arabic') {
    arabicStylesheet.disabled = false;
    englishStylesheet.disabled = true;
  } else {
    arabicStylesheet.disabled = true;
    englishStylesheet.disabled = false;
  }

  if (language === 'english') {
    const buttons = document.querySelectorAll('.Side-button1, .Side-button2');
    buttons.forEach((button) => {
      const icon = button.querySelector('.chart') || button.querySelector('.element-plus');
      const text = button.querySelector('.text-wrapper-12') || button.querySelector('.text-wrapper-13');
      
      if (icon && text) {
        button.appendChild(icon);
        button.appendChild(text);
      }
    });
  }
}


document.getElementById('ar').addEventListener('click', () => {
  changeLanguage('arabic');
 
});

document.getElementById('eng').addEventListener('click', () => {
  changeLanguage('english');

});


// Load language selection on page load
const storedLanguage = localStorage.getItem('selectedLanguage');
if (storedLanguage) {
  changeLanguage(storedLanguage);
}
