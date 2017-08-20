var auth = WeDeploy.auth('https://auth-andicom.wedeploy.io');

// Check Authentication

if (auth.currentUser) {
	document.location.href = '/dashboard/';
}

// Log in

var form = document.querySelector('form');
var button = document.querySelector('button');

form.addEventListener('submit', function(e) {
	e.preventDefault();

	button.disabled = true;
	button.innerText = 'Cargando...';

	auth.signInWithEmailAndPassword(form.email.value, form.password.value)
		.then(function() {
			document.location.href = '/game/';
		})
		.catch(function(err) {
			button.disabled = false;
			button.innerText = 'Ingresar';

			alert('Something wrong happened, try later.');
			form.reset();
		});
});