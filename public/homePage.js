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

const logoutButton = new LogoutButton();
logoutButton.action = () => {
  ApiConnector.logout((response) => {
    if (response.success) {
      window.location.href = "/";
    } else {
      showMessage(response.error || "Ошибка при выходе.", false);
    }
  });
};

ApiConnector.current((response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  } else {
    showMessage(
      response.error || "Не удалось загрузить данные пользователя.",
      false
    );
  }
});

const ratesBoard = new RatesBoard();
const updateRates = () => {
  ApiConnector.getStocks((response) => {
    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    } else {
      showMessage(response.error || "Ошибка при загрузке курсов валют.", false);
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
      showMessage("Баланс успешно пополнен.", true);
    } else {
      showMessage(response.error || "Ошибка при пополнении баланса.", false);
    }
  });
};

moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      showMessage("Конвертация выполнена успешно.", true);
    } else {
      showMessage(response.error || "Ошибка при конвертации валюты.", false);
    }
  });
};

moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      showMessage("Перевод выполнен успешно.", true);
    } else {
      showMessage(response.error || "Ошибка при переводе валюты.", false);
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
      showMessage(
        response.error || "Ошибка при загрузке списка избранного.",
        false
      );
    }
  });
};
updateFavorites();

favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      showMessage("Пользователь успешно добавлен в избранное.", true);
    } else {
      showMessage(
        response.error || "Ошибка при добавлении в избранное.",
        false
      );
    }
  });
};

favoritesWidget.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, (response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      showMessage("Пользователь успешно удалён из избранного.", true);
    } else {
      showMessage(
        response.error || "Ошибка при удалении из избранного.",
        false
      );
    }
  });
};
