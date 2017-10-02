var auth = WeDeploy.auth('https://auth-javaone.liferay.com');
var data = WeDeploy.data('https://db-javaone.liferay.com');

// Check Authentication

if (auth.currentUser) {
	document.location.href = '/dashboard/';
}

// Sign up

var form = document.querySelector('form');
var button = document.querySelector('button');

form.addEventListener('submit', function(e) {
	e.preventDefault();

	button.disabled = true;
	button.innerText = 'Loading...';

	createUser(form)
		.then(function() {
			return loginUser(form);
		})
		.then(function() {
			return saveUser(form);
		})
		.then(function() {
			document.location.href = '/game/';
		})
		.catch(function(err) {
			button.disabled = false;
			button.innerText = 'Sign In';

			if (err.errors[0].reason === 'exists') {
				alert('This email has been used before, try another one.');
				form.reset();
			} else {
				alert('Something wrong happened, try later.');
				form.reset();
			}
		});
});

// Create User

function createUser(form) {
	return auth.createUser({
			id: window.md5(form.email.value),
			name: form.name.value,
			email: form.email.value,
			company: form.company.value,
			jobtitle: form.jobtitle.value,
			password: form.password.value
		});
}

function loginUser(form) {
	return auth.signInWithEmailAndPassword(form.email.value, form.password.value);
}

function saveUser(form) {
	return data.create('players', {
			id: window.md5(form.email.value),
			name: form.name.value,
			count: 0,
			maxScore: 0,
			games: []
		});
}