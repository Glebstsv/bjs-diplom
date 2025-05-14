"use strict";

const logoutButton = new LogoutButton();
logoutButton.action = () => {
  ApiConnector.logout((response) => {
    if (response.success) {
      window.location.href = "/";
    } else {
      alert(response.error || "Ошибка при выходе.");
    }
  });
};

ApiConnector.current((response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  } else {
    alert(response.error || "Не удалось загрузить данные пользователя.");
  }
});

const ratesBoard = new RatesBoard();
const updateRates = () => {
  ApiConnector.getStocks((response) => {
    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    } else {
      alert(response.error || "Ошибка при загрузке курсов валют.");
    }
  });
};
updateRates();
setInterval(updateRates, 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      alert("Баланс успешно пополнен.");
    } else {
      alert(response.error || "Ошибка при пополнении баланса.");
    }
  });
};

moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      alert("Конвертация выполнена успешно.");
    } else {
      alert(response.error || "Ошибка при конвертации валюты.");
    }
  });
};

moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      alert("Перевод выполнен успешно.");
    } else {
      alert(response.error || "Ошибка при переводе валюты.");
    }
  });
};

const favoritesWidget = new FavoritesWidget();

const updateFavorites = () => {
  ApiConnector.getFavorites((response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
    } else {
      alert(response.error || "Ошибка при загрузке списка избранного.");
    }
  });
};
updateFavorites();

favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success) {
      updateFavorites();
      alert("Пользователь успешно добавлен в избранное.");
    } else {
      alert(response.error || "Ошибка при добавлении в избранное.");
    }
  });
};

favoritesWidget.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, (response) => {
    if (response.success) {
      updateFavorites();
      alert("Пользователь успешно удалён из избранного.");
    } else {
      alert(response.error || "Ошибка при удалении из избранного.");
    }
  });
};
