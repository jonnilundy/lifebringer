var currentUser = WeDeploy.auth().currentUser;

if (currentUser) {
    runLifeBringer({
        currentUser: currentUser,
        weDeploy : WeDeploy
    });
}
else {
    document.location.href = '/';
}