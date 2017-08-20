var auth = WeDeploy.auth('https://auth-andicom.wedeploy.io');
var data = WeDeploy.data('https://db-andicom.wedeploy.io');

// Profile

if (!auth.currentUser) {
	document.location.href = '/';
}

// Logout

var logout = document.querySelector('.profile-logout');

logout.addEventListener('click', function() {
	auth.signOut()
		.then(function() {
			document.location.href = '/';
		})
		.catch(function() {
			alert('Something wrong happened, try later.');
		})
});

// Ranking

var table = document.querySelector('table tbody');

data.orderBy('maxScore', 'desc')
	.limit(500)
	.get('players')
	.then(function(players) {
		console.log(players);
		createLeaderboard(players);
	})
	.catch(function(err) {
		console.log(err);
		alert('Something wrong happened, try later.');
	});

function createLeaderboard(players) {
	var html = '';

	for (var i = 0; i < players.length; i++) {
		players[i].position = i + 1;
		players[i].name = players[i].name || players[i].email;

		if (players[i].id === auth.currentUser.id) {
			appendCurrentUser(players[i]);
		}

		html += '<tr>' +
			'<td class="ranking-position">' + players[i].position + '</td>' +
			'<td class="ranking-name">' + players[i].name +'</td>' +
			'<td class="ranking-score">' + players[i].maxScore +'</td>' +
		'</tr>';
	}

	table.innerHTML = html;
}

function appendCurrentUser(user) {
	var profileName = document.querySelector('.profile-name');
	var profilePosition = document.querySelector('.profile-position');
	var profileScore = document.querySelector('.profile-score');

	profileName.innerText = user.name;
	profilePosition.innerText = user.position;
	profileScore.innerText = user.maxScore;
}