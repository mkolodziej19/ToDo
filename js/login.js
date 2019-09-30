let formLogin = document.getElementById('formLogin');

// Form submit event
formLogin.addEventListener('submit', functionLogin);

// Function Login
function functionLogin(e){
	e.preventDefault();
	console.log("Kliknięto");
}

