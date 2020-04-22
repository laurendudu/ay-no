// Listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        user.getIdTokenResult().then(idTokenResult => {
            user.admin = idTokenResult.claims.admin;
            setupUI(user);
        });
        db.collection('test').onSnapshot(snapshot => {
            setupQuiz(snapshot.docs);
        }, err => {
            console.log(err.message);
        });
    } else {
        setupUI();
        setupQuiz([]);
    };
});