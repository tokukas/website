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
}

const AppConfig: TConfigApp = {
  name: window.document.getElementsByTagName('title')[0]?.innerText,
  description: `Tokukas adalah tempat jual beli buku bekas berkualitas dengan
    harga terjangkau. #YangBekasPastiLebihMurah`,
};

export default AppConfig;
