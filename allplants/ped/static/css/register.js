// code for password to show or hide password

document.addEventListener("DOMContentLoaded", function () {
    let togglePassword = document.getElementById("togglePassword");
    let passwordField = document.getElementById("password");

    togglePassword.addEventListener("click", function () {
        if (passwordField.type === "password") {
            passwordField.type = "text";
            togglePassword.classList.remove("bxs-lock-alt");
            togglePassword.classList.add("bxs-lock-open-alt");
        } else {
            passwordField.type = "password";
            togglePassword.classList.remove("bxs-lock-open-alt");
            togglePassword.classList.add("bxs-lock-alt");
        }
    });
});

