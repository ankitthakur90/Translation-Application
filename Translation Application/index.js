const language = {
  "am-ET": "Amharic",
  "ar-SA": "Arabic",
  "be-BY": "Bielarus",
  "bem-ZM": "Bemba",
  "bi-VU": "Bislama",
  "bjs-BB": "Bajan",
  "bn-IN": "Bengali",
  "bo-CN": "Tibetan",
  "br-FR": "Breton",
  "bs-BA": "Bosnian",
  "ca-ES": "Catalan",
  "cop-EG": "Coptic",
  "cs-CZ": "Czech",
  "cy-GB": "Welsh",
  "da-DK": "Danish",
  "dz-BT": "Dzongkha",
  "de-DE": "German",
  "dv-MV": "Maldivian",
  "el-GR": "Greek",
  "en-GB": "English",
  "es-ES": "Spanish",
  "et-EE": "Estonian",
  "eu-ES": "Basque",
  "fa-IR": "Persian",
  "fi-FI": "Finnish",
  "fn-FNG": "Fanagalo",
  "fo-FO": "Faroese",
  "fr-FR": "French",
  "gl-ES": "Galician",
  "gu-IN": "Gujarati",
  "ha-NE": "Hausa",
  "he-IL": "Hebrew",
  "hi-IN": "Hindi",
  "hr-HR": "Croatian",
  "hu-HU": "Hungarian",
  "id-ID": "Indonesian",
  "is-IS": "Icelandic",
  "it-IT": "Italian",
  "ja-JP": "Japanese",
  "kk-KZ": "Kazakh",
  "km-KM": "Khmer",
  "kn-IN": "Kannada",
  "ko-KR": "Korean",
  "ku-TR": "Kurdish",
  "ky-KG": "Kyrgyz",
  "la-VA": "Latin",
  "lo-LA": "Lao",
  "lv-LV": "Latvian",
  "men-SL": "Mende",
  "mg-MG": "Malagasy",
  "mi-NZ": "Maori",
  "ms-MY": "Malay",
  "mt-MT": "Maltese",
  "my-MM": "Burmese",
  "ne-NP": "Nepali",
  "niu-NU": "Niuean",
  "nl-NL": "Dutch",
  "no-NO": "Norwegian",
  "ny-MW": "Nyanja",
  "ur-PK": "Pakistani",
  "pau-PW": "Palauan",
  "pa-IN": "Panjabi",
  "ps-PK": "Pashto",
  "pis-SB": "Pijin",
  "pl-PL": "Polish",
  "pt-PT": "Portuguese",
  "rn-BI": "Kirundi",
  "ro-RO": "Romanian",
  "ru-RU": "Russian",
  "sg-CF": "Sango",
  "si-LK": "Sinhala",
  "sk-SK": "Slovak",
  "sm-WS": "Samoan",
  "sn-ZW": "Shona",
  "so-SO": "Somali",
  "sq-AL": "Albanian",
  "sr-RS": "Serbian",
  "sv-SE": "Swedish",
  "sw-SZ": "Swahili",
  "ta-LK": "Tamil",
  "te-IN": "Telugu",
  "tet-TL": "Tetum",
  "tg-TJ": "Tajik",
  "th-TH": "Thai",
  "ti-TI": "Tigrinya",
  "tk-TM": "Turkmen",
  "tl-PH": "Tagalog",
  "tn-BW": "Tswana",
  "to-TO": "Tongan",
  "tr-TR": "Turkish",
  "uk-UA": "Ukrainian",
  "uz-UZ": "Uzbek",
  "vi-VN": "Vietnamese",
  "wo-SN": "Wolof",
  "xh-ZA": "Xhosa",
  "yi-YD": "Yiddish",
  "zu-ZA": "Zulu",
};

let languageOptions = document.querySelectorAll("select");
let fromTextArea = document.querySelector(".from-text");
let translatedTextArea = document.querySelector(".translated-text");
let fromVoiceBtn = document.querySelector(".from-voice");
let toVoiceBtn = document.querySelector(".to-voice");
let copyBtn = document.querySelector(".bx-copy");
let charCount = document.querySelector(".char-count");
let transferBtn = document.querySelector(".bx-transfer");

languageOptions.forEach((selectElement, index) => {
  for (let countryCode in language) {
    let selected =
      (index === 0 && countryCode === "en-GB") ||
      (index === 1 && countryCode === "hi-IN")
        ? "selected"
        : "";
    let option = `<option value="${countryCode}" ${selected}>${language[countryCode]}</option>`;
    selectElement.insertAdjacentHTML("beforeend", option);
  }
});

fromTextArea.addEventListener("input", function () {
  let content = fromTextArea.value;
  let fromLanguage = languageOptions[0].value;
  let toLanguage = languageOptions[1].value;

  let translationLink = `https://api.mymemory.translated.net/get?q=${content}!&langpair=${fromLanguage}|${toLanguage}`;

  fetch(translationLink)
    .then((response) => response.json())
    .then((data) => {
      translatedTextArea.value = data.responseData.translatedText;
    });
});

fromVoiceBtn.addEventListener("click", function () {
  let speech = new SpeechSynthesisUtterance(fromTextArea.value);
  speech.lang = languageOptions[0].value;
  speechSynthesis.speak(speech);
});

toVoiceBtn.addEventListener("click", function () {
  let speech = new SpeechSynthesisUtterance(translatedTextArea.value);
  speech.lang = languageOptions[1].value;
  speechSynthesis.speak(speech);
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(translatedTextArea.value);
  alert("Copied Text");
});

fromTextArea.addEventListener("keyup", () => {
  charCount.textContent = `${fromTextArea.value.length}/5000`;
});

transferBtn.addEventListener("click", () => {
  let tempText = fromTextArea.value;
  fromTextArea.value = translatedTextArea.value;
  translatedTextArea.value = tempText;

  let tempLang = languageOptions[0].value;
  languageOptions[0].value = languageOptions[1].value;
  languageOptions[1].value = tempLang;
});




