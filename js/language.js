class Language {
  constructor() {
    this._localStorage = window.localStorage;
    this._language =
      this._getStorageItem("Lang") || this._getStorageItem("origLang");
    this._languageFallback = "en_us";
    this._languagePack = this._getLanguagePack();

    if (this._language != "en_us") {
      this._translateInterface();
    }
  }

  _saveOriginalLanguage() {
    this._localStorage.setItem("origLang", "en_us");
  }

  _getStorageItem(item) {
    return this._localStorage.getItem(String(item));
  }

  _getLanguagePack() {
    return languagePack[this._language];
  }

  _getErrorMessages() {
    return typeof this._languagePack.errorMessages == "undefined"
      ? languagePack[this._languageFallback].errorMessages
      : this._languagePack.errorMessages;
  }

  _getSuccessfulMessages() {
    return typeof this._languagePack.successfulMessages == "undefined"
      ? languagePack[this._languageFallback].successfulMessages
      : this._languagePack.successfulMessages;
  }

  _getPowerTranslate(powerItem, fallback, powerItemIndex = null) {
    return typeof this._languagePack.power[powerItem] == "undefined"
      ? fallback
      : powerItemIndex != null
      ? this._languagePack.power[powerItem][powerItemIndex]
      : this._languagePack.power[powerItem];
  }

  _getTanslateStringByIdElement(idItem) {
    return this._languagePack[String(idItem).replace(/-/g, "_")];
  }

  _getTranslatedItem(item, fallback = null) {
    return typeof this._languagePack[item] != "undefined"
      ? this._languagePack[item]
      : fallback != null
      ? fallback
      : languagePack[this._languageFallback][item];
  }

  _getDaysArray() {
    return typeof this._languagePack.days != "undefined"
      ? this._languagePack.days
      : languagePack[this._languageFallback].days;
  }

  _getMonthsArray() {
    return typeof this._languagePack.months != "undefined"
      ? this._languagePack.months
      : languagePack[this._languageFallback].months;
  }

  _translateInterface() {
    const get = (id) => document.getElementById(id);

    const InputElements = {
      input_password: get("input-password"),
    };

    Object.keys(InputElements).forEach((key) => {
      let translate = this._getTanslateStringByIdElement(InputElements[key].id);
      if (
        typeof translate != "undefined" &&
        translate != null &&
        translate != ""
      ) {
        InputElements[String(key)].placeholder = translate;
      }
    });

    const InterfaceElements = {
      goodbye: get("goodbye-message"),
      item_account: get("sidebar-item-account"),
      item_sessions: get("sidebar-item-sessions"),
      item_background: get("sidebar-item-background"),
      item_themes: get("sidebar-item-themes"),
      item_keybinding: get("sidebar-item-keybinding"),
      item_power: get("sidebar-item-power"),
      button_themes_reset: get("button-input-themes-reset"),
      button_themes_apply: get("button-input-themes-apply"),
      button_keybind_reset: get("button-input-keybind-reset"),
      button_keybind_apply: get("button-input-keybind-apply"),
      sidebar_input_background: get("sidebar-input-background"),
      sidebar_input_foregorund: get("sidebar-input-foregorund"),
      sidebar_input_blur: get("sidebar-input-blur"),
      sidebar_input_animation: get("sidebar-input-animation"),
      sidebar_input_language: get("sidebar-input-language"),
      sidebar_input_modifier: get("sidebar-input-modifier"),
      sidebar_input_sidebar_key: get("sidebar-input-sidebar-key"),
      sidebar_input_sessions_key: get("sidebar-input-sessions-key"),
      sidebar_input_power_key: get("sidebar-input-power-key"),
      sidebar_input_accounts_key: get("sidebar-input-accounts-key"),
      sidebar_input_close_back: get("sidebar-input-close-back"),
    };

    Object.keys(InterfaceElements).forEach((key) => {
      let translate = this._getTanslateStringByIdElement(
        InterfaceElements[String(key)].id
      );
      if (
        typeof translate != "undefined" &&
        translate != null &&
        translate != ""
      ) {
        InterfaceElements[String(key)].innerHTML = "";
        InterfaceElements[String(key)].appendChild(
          document.createTextNode(translate)
        );
      }
    });
  }
}
