
class Language {
    constructor()
    {
        this._localStorage = window.localStorage;
        this._language = this._getStorageItem('Lang') ||
                        this._getStorageItem('origLang');
        this._languagePack = this._getLanguagePack();
        this._languageFallback = 'en_us';

        if(this._language !== 'en_us')
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

        return (typeof this._languagePack.errorMessages == 'undefined' ? languagePack[this._languageFallback].errorMessages : this._languagePack.errorMessages);
    }

    _getSuccessfulMessages()
    {
        return (typeof this._languagePack.successfulMessages == 'undefined' ? languagePack[this._languageFallback].successfulMessages : this._languagePack.successfulMessages);
    }

    _getPowerTranslate(powerItem, fallback, powerItemIndex = null) {
        return this._languagePack.power && typeof this._languagePack.power[powerItem] !== 'undefined' ? (powerItemIndex !== null && typeof this._languagePack.power[powerItem][powerItemIndex] !== 'undefined' ? this._languagePack.power[powerItem][powerItemIndex] : this._languagePack.power[powerItem]) : fallback;
    }

    _getTranslateStringByIdElement(idItem)
    {
        console.log(idItem);
        return this._languagePack[String(idItem).replace(/-/g,'_')];
    }

    _getTranslatedItem(item, fallback = null)
    {
        return (typeof this._languagePack[item] != 'undefined' ?  this._languagePack[item] : (fallback != null ? fallback : languagePack[this._languageFallback][item]));
    }

    _getDaysArray()
    {
        return (typeof this._languagePack.days != 'undefined' ? this._languagePack.days : languagePack[this._languageFallback].days);
    }

    _getMonthsArray()
    {
        return (typeof this._languagePack.months != 'undefined' ? this._languagePack.months : languagePack[this._languageFallback].months);
    }

    _translateInterface()
    {
        const InputElements = {
             input_password: document.getElementById("input-password"),
        };

        Object.keys(InputElements).forEach(key => {
            let translate = this._getTranslateStringByIdElement(InputElements[key].id);
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
            let translate = this._getTranslateStringByIdElement(InterfaceElements[String(key)].id);
          if(typeof translate != 'undefined' && translate != null && translate != '')
          {
            InterfaceElements[String(key)].innerHTML = '';
            InterfaceElements[String(key)].appendChild(document.createTextNode(translate));
          }
        });
    }

}








