type TConfigApp = {
  /**
   * The name of the app.
   *
   * Change the `APP_NAME` in the `.env` file to change the name of the app.
   */
  name: string;
  /**
   * The default description of the app.
   */
  description: string;
  /**
   * The address of the shop.
   *
   * Set this value by changing the `APP_SHOP_ADDRESS` in the `.env` file.
   */
  shopAddress?: string;
  /**
   * The social media accounts of the app.
   *
   * Change the value in the `.env` file.
   */
  socialAccounts: {
    email?: string;
    instagramUsername?: string;
    telegramUsername?: string;
    twitterUsername?: string;
    whatsAppNumber?: string;
  }
}

const AppConfig: TConfigApp = {
  name: window.document.getElementsByTagName('title')[0]?.innerText,
  description: `Tokukas adalah tempat jual beli buku bekas berkualitas dengan
    harga terjangkau. #YangBekasPastiLebihMurah`,
  shopAddress: import.meta.env.VITE_APP_SHOP_ADDRESS,
  socialAccounts: {
    email: import.meta.env.VITE_APP_EMAIL,
    instagramUsername: import.meta.env.VITE_APP_INSTAGRAM_USERNAME,
    telegramUsername: import.meta.env.VITE_APP_TELEGRAM_USERNAME,
    twitterUsername: import.meta.env.VITE_APP_TWITTER_USERNAME,
    whatsAppNumber: import.meta.env.VITE_APP_WHATSAPP_NUMBER,
  },
};

export default AppConfig;
