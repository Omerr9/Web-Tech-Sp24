function validateFormSubmission(e) {
    var dob = new Date(document.getElementById('dateOfBirth').value);
    var now = new Date();
    var fiveYearsAgo = new Date(now.getFullYear() - 5, now.getMonth(), now.getDate());

    if (dob > fiveYearsAgo) {
        alert('Your age must be greater than 5 years old to submit this form.');
        e.preventDefault();
    }
}
function showSidebar() {
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
}
function closeSidebar() {
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
}

window.onload = function() {
    document.getElementById('myForm').onsubmit = validateFormSubmission;
    showSidebar();
    closeSidebar();
};

