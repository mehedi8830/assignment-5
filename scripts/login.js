document.getElementById("login-btn").addEventListener("click", function () {
  const inputUsername = document.getElementById("inputUsername");
  const inputPassword = document.getElementById("inputPassword");

  if (inputUsername.value == "admin" && inputPassword.value == "admin123") {
    alert("Sign In Successfully.");
    window.location.assign("home.html");
  } else {
    alert("Sign In Failed.");
  }
  return;
});