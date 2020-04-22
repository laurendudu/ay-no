// Listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        user.getIdTokenResult().then(idTokenResult => {
            user.admin = idTokenResult.claims.admin;
            setupUI(user);
        });
    } else {
        setupUI();
        setupDashboard([]);
    };
});