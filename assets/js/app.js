//function to set a given theme/color-scheme
function setTheme(themeName) {
  localStorage.setItem('theme', themeName);
  document.documentElement.className = themeName; 
}

//function to toggle between light and dark theme
function toggleTheme() {
  console.log('button was clicked');
  if (localStorage.getItem('theme') === 'theme-light') {
    setTheme('theme-dark');
  } else if (localStorage.getItem('theme') === 'theme-dark') {
    setTheme('theme-light');
  }
}

//Immediately invoked function to set the theme on initial load
(function () {
  setTheme('theme-dark');
  var button = document.getElementById('themeSwitch');
  button.addEventListener('click', () => { toggleTheme(); });

  document.addEventListener('input', function(event) {
    if (event.target.tagName.toLowerCase() !== 'textarea') return;
    autoExpand(event.target);
  });
})();

const autoExpand = function(field) {
  //reset field height
  field.style.height = 'inherit';

  //get the computed styles for the element
  var computed = window.getComputedStyle(field);

  //calculate the height
  var height = parseInt(computed.getPropertyValue('border-top-width'), 10)
             + parseInt(computed.getPropertyValue('padding-top'), 10)
             + field.scrollHeight
             + parseInt(computed.getPropertyValue('padding-bottom'), 10)
             + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

  console.log
  //set textarea height
  field.style.height = height + 'px';

  //set label height for field
  let label = field.nextElementSibling;
  let topStyle = '4px';
}
