export const GameEvents = {
  // Unity -> React
  REQUEST_BACK_TO_HOMEPAGE: "RequestBackToHomePage",
  REQUEST_WALLET_CONNECTION: "RequestWalletConnection", // Check if the wallet is connected
  PURCHASE_ITEM_REQUEST: "PurchaseItemRequest", // Request to purchase an item
  HANDLE_UNITY_MESSAGE: "HandleUnityMessage",
  HANDLE_FIRE_AND_FORGET: "HandleFireAndForget",
  GET_PLAYER_DATA_FROM_JS: "GetPlayerDataFromJS",

  // React -> Unity
  WALLET_CONNECTED: "WalletConnected", // Wallet has been connected
  PURCHASE_ITEM_SUCCESS: "PurchaseItemSuccess", // Item purchase successful
  PURCHASE_ITEM_FAILURE: "PurchaseItemFailure", // Item purchase failed
  START_GAME: "StartGame",
};

export const UnityClassName = "UIManager";
