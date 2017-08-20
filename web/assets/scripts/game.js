var auth = WeDeploy.auth('https://auth-andicom.wedeploy.io');

if (auth.currentUser) {
    runLifeBringer({
        currentUser: auth.currentUser,
        weDeploy: WeDeploy
    });
}
else {
    document.location.href = '/';
}