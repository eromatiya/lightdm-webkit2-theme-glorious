
class Language {
    constructor()
    {
        this._localStorage = window.localStorage;
        this._language =
            this._getStorageItem("Lang") ??
            this._getStorageItem("origLang") ??
            "en_us";
        this._languageFallback = 'en_us';
        this._languagePack = this._getLanguagePack();
        
        if(this._language != 'en_us')
        {
            this._translateInterface();
        }
    }

    _saveOriginalLanguage()
	{
		this._localStorage.setItem(
			'origLang',
			'en_us'
		);
	}

    _getStorageItem(item) {
		return this._localStorage.getItem(String(item));
	}

    
    _getLanguagePack()
    {
        return languagePack[this._language];
    }

    _getErrorMessages()
    {
        return this._getItem("errorMessages") ?? this._getDefault("errorMessages");
    }

    _getSuccessfulMessages()
    {
        return this._getItem("successfulMessages") ?? this._getDefault("successfulMessages");
    }

    _getPowerTranslate(powerItem, fallback, powerItemIndex = null)
    {
        const item = this._getItem("power");
        if (!item && !item?.hasOwnProperty(powerItem)) {
            return fallback;
        }
        const powerObject = item[powerItem];
        if (powerItemIndex) {
            return powerObject[powerItemIndex];
        }
        return powerObject;
    }

    _getTanslateStringByIdElement(idItem)
    {
        return this._languagePack[String(idItem).replace(/-/g,'_')];
    }

    _getTranslatedItem(item, fallback = null)
    {
        return this._getItem(item) ?? fallback ?? this._getDefault(item);
    }

    _getDaysArray()
    {
        return this._getItem("days") ?? this._getDefault("days");
    }

    _getMonthsArray()
    {
        return this._getItem("months") ?? this._getDefault("months");
    }

    _getItem(itemName) {
        if (!this._languagePack) {
            return this._getDefault(itemName);
        }
        if (!this._languagePack.hasOwnProperty(itemName)) {
            return;
        }
        return this._languagePack[itemName];
    }

    _getDefault(itemName) {
        if (!languagePack.en_us.hasOwnProperty(itemName)) {
            return;
        }
        return languagePack.en_us[itemName];
    }
    
    _translateInterface()
    {
        const InputElements = {
             input_password: document.getElementById("input-password"),
        };

        Object.keys(InputElements).forEach(key => {
            let translate = this._getTanslateStringByIdElement(InputElements[key].id);
          if(typeof translate != 'undefined' && translate != null && translate != '')
          {
            InputElements[String(key)].placeholder = translate;
           
          }
        });
       
        const InterfaceElements = {
            goodbye: document.getElementById("goodbye-message"),
            item_account: document.getElementById("sidebar-item-account"),
            item_sessions: document.getElementById("sidebar-item-sessions"),
            item_background: document.getElementById("sidebar-item-background"),
            item_themes: document.getElementById("sidebar-item-themes"),
            item_keybinding: document.getElementById("sidebar-item-keybinding"),
            item_power: document.getElementById("sidebar-item-power"),
            button_themes_reset: document.getElementById('button-input-themes-reset'),
            button_themes_apply: document.getElementById('button-input-themes-apply'),
            button_keybind_reset: document.getElementById('button-input-keybind-reset'),
            button_keybind_apply: document.getElementById('button-input-keybind-apply'),
            sidebar_input_background: document.getElementById('sidebar-input-background'),
            sidebar_input_foregorund: document.getElementById('sidebar-input-foregorund'),
            sidebar_input_blur: document.getElementById('sidebar-input-blur'),
            sidebar_input_animation: document.getElementById('sidebar-input-animation'),
            sidebar_input_language: document.getElementById('sidebar-input-language'),
            sidebar_input_modifier: document.getElementById('sidebar-input-modifier'),
            sidebar_input_sidebar_key: document.getElementById('sidebar-input-sidebar-key'),
            sidebar_input_sessions_key: document.getElementById('sidebar-input-sessions-key'),
            sidebar_input_power_key: document.getElementById('sidebar-input-power-key'),
            sidebar_input_accounts_key: document.getElementById('sidebar-input-accounts-key'),
            sidebar_input_close_back: document.getElementById('sidebar-input-close-back'),
        }

        Object.keys(InterfaceElements).forEach(key => {
            let translate = this._getTanslateStringByIdElement(InterfaceElements[String(key)].id);
          if(typeof translate != 'undefined' && translate != null && translate != '')
          {
            InterfaceElements[String(key)].innerHTML = '';
            InterfaceElements[String(key)].appendChild(document.createTextNode(translate));
          }
        });
    }

}








