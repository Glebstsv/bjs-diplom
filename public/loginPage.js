"use strict";

function showMessage(text, isSuccess = true) {
  const messageBlock = document.getElementById("message");
  if (!messageBlock) return;
  messageBlock.textContent = text;
  messageBlock.style.display = "block";
  messageBlock.style.background = isSuccess ? "#d4edda" : "#f8d7da";
  messageBlock.style.color = isSuccess ? "#155724" : "#721c24";
  messageBlock.style.border =
    "1px solid " + (isSuccess ? "#c3e6cb" : "#f5c6cb");
  setTimeout(() => {
    messageBlock.style.display = "none";
    messageBlock.textContent = "";
  }, 4000);
}

const userForm = new UserForm();

userForm.loginFormCallback = ({ login, password }) => {
  ApiConnector.login({ login, password }, (response) => {
    if (response.success) {
      location.reload();
    } else {
      showMessage(response.error || "Неверный логин или пароль.", false);
    }
  });
};

userForm.registerFormCallback = ({ login, password }) => {
  ApiConnector.register({ login, password }, (response) => {
    if (response.success) {
      location.reload();
    } else {
      showMessage(response.error || "Ошибка при регистрации.", false);
    }
  });
};
