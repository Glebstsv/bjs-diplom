"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = ({ login, password }) => {
  ApiConnector.login({ login, password }, (response) => {
    console.log("Ответ от сервера на авторизацию:", response);
    if (response.success) {
      location.reload();
    } else {
      alert(response.error || "Неверный логин или пароль.");
    }
  });
};

userForm.registerFormCallback = ({ login, password }) => {
  ApiConnector.register({ login, password }, (response) => {
    console.log("Ответ от сервера на регистрацию:", response);
    if (response.success) {
      location.reload();
    } else {
      alert(response.error || "Ошибка при регистрации.");
    }
  });
};
