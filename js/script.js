const navbar = document.querySelector('.navbar');
const hamburger = navbar.querySelector('.navbar__hamburger');
const menu = document.querySelector('.mobile__menu');
const body = document.querySelector('body');
const toggleCheckbox = document.querySelector('.toggleCheckbox');

const localStorage = window.localStorage;
// localStorage.clear();

const editMode = localStorage.getItem('edit_mode');
const isEditMode = editMode == 'true' ?? false;
const editModeContainer = document.querySelector('.editMode');

const changeBodyBackground = document.querySelector('.changeBodyBackground');
const targetBodyBackground = document.getElementsByClassName('target-body-background');
const selectedBodyBackground = localStorage.getItem('target-body-background');


const changeFontColor = document.querySelector('.changeFontColor');
const targetFontColor = document.getElementsByClassName('target-font-color');
const selectedFontColor = localStorage.getItem('target-font-color');

const changeFontStyle = document.querySelector('.changeFontStyle');
const targetFontStyle = document.getElementsByClassName('target-font-style');
const selectedFontStyle = localStorage.getItem('target-font-style');

const backgroundClasses = ['bg-dark', 'bg-basic', 'bg-primary', 'bg-secondary', 'bg-tertiary', 'bg-quaternary'];
const fontClasses = ['text-basic', 'text-primary', 'text-secondary', 'text-tertiary', 'text-quaternary', 'text-dark'];
const fontStyles = ['poppins', 'rubik', 'nunito', 'calistoga', 'autowide'];

addClass(targetBodyBackground, selectedBodyBackground);
addClass(targetFontColor, selectedFontColor);
addClass(targetFontStyle, selectedFontStyle);

document.getElementById('toggle').checked = isEditMode;

function toggleMenu() {
  hamburger.classList.toggle('navbar__hamburger--active');
  menu.classList.toggle('mobile__menu--active');
  body.classList.toggle('body-scroll-lock');
}

function addClass(elements, className) {
  if (className === null) {
    return;
  }

	for (var i = 0; i < elements.length; i++) {
		var element = elements[i];
		if (element.classList) {
			element.classList.add(className);
		} else {
			element.className += ' ' + className;
		}
	}
}

function removeClass(elements, className) {
  if (className === null) {
    return;
  }

	for (var i = 0; i < elements.length; i++) {
		var element = elements[i];
		if (element.classList) {
			element.classList.remove(className);
		} else {
			element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
		}
	}
}

menu.addEventListener('click', function (e) {
  if (e.target.matches('.mobile__links a')) {
    toggleMenu();
  }
});

toggleCheckbox.addEventListener('click', function (e) {
  let toggle = document.getElementById('toggle');
  let key = 'edit_mode';
  localStorage.removeItem(key);
  if (toggle.checked) {
    localStorage.setItem(key, true);
    editModeContainer.style.display = 'block';
    body.style.padding = '0 0 100px 0';
  } else {
    localStorage.setItem(key, false);
    editModeContainer.style.display = 'none';
    body.style.padding = '0';
  }
});

if (isEditMode) {
  editModeContainer.style.display = 'block';
  body.style.padding = '0 0 100px 0';
} else {
  editModeContainer.style.display = 'none';
  body.style.padding = '0';
}

document.querySelector('.reset').addEventListener('click', function (e) {
  localStorage.clear();
  window.location.reload();
});


changeBodyBackground.addEventListener('click', function (e) {
  let value = e.target.classList.value;
  let key = 'target-body-background';
  
  if (value != '') {
    backgroundClasses.forEach(function (i){
      removeClass(targetBodyBackground, i);
    });
    localStorage.setItem(key, value);
    addClass(targetBodyBackground, value);
  }
});

changeFontColor.addEventListener('click', function (e) {
  let value = e.target.classList.value;
  let key = 'target-font-color';
  
  if (value != '') {
    fontClasses.forEach(function (i){
      removeClass(targetFontColor, i);
    });
    localStorage.setItem(key, value);
    addClass(targetFontColor, value);
  }
});

changeFontStyle.addEventListener('click', function (e) {
  let value = e.target.classList.value;
  let key = 'target-font-style';
  
  if (value != '') {
    fontStyles.forEach(function (i){
      removeClass(targetFontStyle, i);
    });
    localStorage.setItem(key, value);
    addClass(targetFontStyle, value);
  }
});

window.addEventListener('scroll', function(ev) {

  let hobbies = document.getElementById('hobbies');
  let title = document.getElementById('hobbies-title');
  let distanceToTop = hobbies.getBoundingClientRect().top;
  let rightContainer = document.getElementById('right-container');
  let leftContainer = document.getElementById('left-container');
  let width = window.screen.width;
  let distance;

  if (width > 900) {
    distance = 300;
  } else {
    distance = 550;
  }

  if (distanceToTop < distance) {
      if (width > 425) {
        leftContainer.style.transition = '1s';
        rightContainer.style.transition = '1s';
        rightContainer.style.transform = 'translateX(100%)';
        leftContainer.style.transform = 'translateX(-100%)';
        leftContainer.style.opacity = '0';
      }
      
      hobbies.innerHTML = rightContainer.innerHTML;
      hobbies.style.transition = '1s';
      hobbies.style.transform = 'translateX(0)';
      hobbies.style.opacity = '1';

      title.style.transition = '1s';
      title.style.transform = 'translateY(0)';
      title.style.opacity = '1';
  } else {
      if (width > 425) {
        rightContainer.style.transition = '1s';
        rightContainer.style.transition = '1s';
        rightContainer.style.transform = 'translateX(0)';
        leftContainer.style.transform = 'translateX(0)';
        leftContainer.style.opacity = '1';
      }

      hobbies.style.transition = '1s';
      hobbies.style.transform = 'translateX(100%)';
      hobbies.style.opacity = '0';

      title.style.transition = '1s';
      title.style.transform = 'translateX(-100%)';
      title.style.opacity = '0';
  }
});


const modal = document.getElementById("modal");
const span = document.getElementsByClassName("close")[0];

function toggleModal(target) {
  modal.style.display = "block";
  let modalContent = document.getElementById('modal-content');
  let targetContent = document.getElementById(target);
  modalContent.innerHTML = targetContent.innerHTML;
}

span.onclick = function() {
  modal.style.display = "none";
}
