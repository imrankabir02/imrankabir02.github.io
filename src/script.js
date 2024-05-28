// function updateTime(){
//     let date = new Date();

//     let hours = date.getHours();
//     let minutes = date.getMinutes();
//     let seconds = date.getSeconds();
//     let ampm = hours > 12 ? 'PM' : 'AM';

//     hours = hours > 12 ? (hours%12) : hours;
//     minutes = minutes < 10 ? '0' + minutes : minutes;
//     seconds = seconds <10 ? '0' + seconds : seconds;

//     document.getElementById('hours').textContent = hours;
//     document.getElementById('minutes').textContent = minutes;
//     document.getElementById('seconds').textContent = seconds;
//     document.getElementById('ampm').textContent = ampm;
// }
// setInterval(updateTime,1000);


let menu = document.querySelector('#menu-icon-js');
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let navtc = document.querySelector('#nav-tc-js');

menu.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('open');
    navtc.classList.toggle('nav-touch-close-open');
}

navtc.onclick = () => {
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('open');
    navtc.classList.remove('nav-touch-close-open');
    navtc.classList.remove('nav-tc-z');
    navtc.classList.remove('nav-LR-TC');
}

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
	var currentScrollPos = window.pageYOffset;

	document.getElementById("header").classList.add('scrolled');
	if (currentScrollPos === 0) {
		// console.log("Hello");
		document.getElementById("header").classList.remove('scrolled');
	}
	if (navtc.classList.contains('nav-touch-close-open')) {
		return;
	}
	if (prevScrollpos > currentScrollPos) {
		document.getElementById("header").style.top = "0";
	} else {
		document.getElementById("header").style.top = "-100px";
	}
	prevScrollpos = currentScrollPos;
}