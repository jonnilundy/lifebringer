var auth = WeDeploy.auth('auth-ccctesttest.wedeploy.sh');
var currentUser = WeDeploy.auth().currentUser;

if (currentUser) {
	document.location.href = '/dashboard/';
}

// Login

var btnGoogle = document.querySelector('.btn-google');

btnGoogle.addEventListener('click', function(e) {
	var googleProvider = new auth.provider.Google();
	googleProvider.setProviderScope('email');
	auth.signInWithRedirect(googleProvider);
});

// var btnFacebook = document.querySelector('.btn-facebook');

// btnFacebook.addEventListener('click', function(e) {
// 	var facebookProvider = new auth.provider.Facebook();
// 	facebookProvider.setProviderScope('public_profile,email');
// 	auth.signInWithRedirect(facebookProvider);
// });

var btnGithub = document.querySelector('.btn-github');

btnGithub.addEventListener('click', function(e) {
	var githubProvider = new auth.provider.Github();
	githubProvider.setProviderScope('user:email');
	auth.signInWithRedirect(githubProvider);
});

// Redirect

auth.onSignIn(function(currentUser) {
	currentUser.id = window.md5(currentUser.email);

	WeDeploy
		.data('db-ccctesttest.wedeploy.sh')
		.where('id', currentUser.id)
		.get('players')
		.then(function(user) {
			if (user.length > 0) {
				document.location.href = '/game/';
			} else {
				createUser(currentUser);
			}
		})
		.catch(function() {
			alert('Something wrong happened, try later.');
		})
});

function createUser(currentUser) {
	WeDeploy
		.data('db-ccctesttest.wedeploy.sh')
		.create('players', {
			id: currentUser.id,
			name: currentUser.name,
			email: currentUser.email,
			photoUrl: currentUser.photoUrl,
			count: 0,
			maxScore: 0,
			games: []
		})
		.then(function() {
			document.location.href = '/game/';
		})
		.catch(function() {
			alert('Something wrong happened, try later.');
		})
}