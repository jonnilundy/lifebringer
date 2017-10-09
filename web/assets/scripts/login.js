var auth = WeDeploy.auth('https://auth-devoxx.wedeploy.io');

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
	button.innerText = 'Loading...';

	auth.signInWithEmailAndPassword(form.email.value, form.password.value)
		.then(function() {
			document.location.href = '/game/';
		})
		.catch(function(err) {
			button.disabled = false;
			button.innerText = 'Sign In';

			alert('Something wrong happened, try later.');
			form.reset();
		});
});