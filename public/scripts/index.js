const dashboardUI = document.querySelector('.dashboard');
const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');

const setupUI = (user) => {
    if (user) {
        if (user.admin) {
            adminItems.forEach(item => item.style.display = 'block');
        };
        // Account info
        db.collection('users').doc(user.uid).get().then(doc => {
            const html = `
                <div>Logged in as ${user.email}</div>
                <div>${doc.data().bio}</div>
                <div class="pink-text">${user.admin ? 'Admin' : ''}</div>
            `;
            accountDetails.innerHTML = html;
        });
        // Toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
        adminItems.forEach(item => item.style.display = 'none');
        // Hide account info
        accountDetails.innerHTML = '';
        // Toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
}

// Setup guides
const setupDashboard = (data) => {

    if (dashboardUI != null) {

    if (data.length) {
    let html = '';
    data.forEach(doc => {
        const rule = doc.data();
        const li = `
        <li>
            <div class="collapsible-header grey lighten-4">${rule.title}</div>
            <div class="collapsible-body white">${rule.content}</div>
        </li>
        `;
        html += li;
    });

    dashboardUI.innerHTML = html;
} else {
    dashboardUI.innerHTML = '<h5 class="center-align">Login to view your dashboards</h5>';
    };
}
};



// Setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});