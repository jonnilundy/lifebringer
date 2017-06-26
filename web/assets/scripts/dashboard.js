// Profile

var currentUser = WeDeploy.auth().currentUser;

if (!currentUser) {
	document.location.href = '/';
}

// Logout

var auth = WeDeploy.auth('auth-ccctestwedeploy.sh');
var logout = document.querySelector('.profile-logout');

logout.addEventListener('click', function() {
	auth.signOut().then(function() {
		document.location.href = '/';
	});
});

// Ranking

var table = document.querySelector('table tbody');

WeDeploy
	.data('db-ccctestwedeploy.sh')
	.orderBy('maxScore', 'desc')
	.limit(500)
	.get('players')
	.then(function(players) {
		createLeaderboard(players);
	});

function createLeaderboard(players) {
	var html = '';

	for (var i = 0; i < players.length; i++) {
		players[i].position = i + 1;
		players[i].photoUrl = players[i].photoUrl || '/assets/images/avatar.jpg';
		players[i].name = players[i].name || players[i].email;

		if (players[i].id === window.md5(currentUser.email)) {
			appendCurrentUser(players[i]);
		}

		html += '<tr>' +
			'<td class="ranking-position">' + players[i].position + '</td>' +
			'<td class="ranking-avatar"><img src="' + players[i].photoUrl +'"></td>' +
			'<td class="ranking-name">' + players[i].name +'</td>' +
			'<td class="ranking-score">' + players[i].maxScore +'</td>' +
		'</tr>';
	}

	table.innerHTML = html;
}

function appendCurrentUser(user) {
	var profileAvatar = document.querySelector('.profile-avatar');
	var profileName = document.querySelector('.profile-name');
	var profilePosition = document.querySelector('.profile-position');
	var profileScore = document.querySelector('.profile-score');

	profileAvatar.setAttribute('src', user.photoUrl);
	profileName.innerText = user.name;
	profilePosition.innerText = user.position;
	profileScore.innerText = user.maxScore;
}