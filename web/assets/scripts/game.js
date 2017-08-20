var auth = WeDeploy.auth('https://auth-lifebringer.wedeploy.io');

if (auth.currentUser) {
    runLifeBringer({
        currentUser: auth.currentUser,
        weDeploy: WeDeploy
    });
}
else {
    document.location.href = '/';
}