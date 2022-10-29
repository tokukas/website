type TConfigApp = {
  /**
   * The name of the app.
   *
   * Change the `APP_NAME` in the `.env` file to change the name of the app.
   */
  name: string;
}

const AppConfig: TConfigApp = {
  name: window.document.getElementsByTagName('title')[0]?.innerText,
};

export default AppConfig;
