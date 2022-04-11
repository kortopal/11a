const numpad = $id("numpad");
const input_timer = $id("input_timer");
const input_currency = $id("input_currency");
const input_timer_numpad = $id("input_timer_numpad");
const input_currency_numpad = $id("input_currency_numpad");
var historyContent = "";
var totalHistoryContent;
var lastSettingsUpdate;
var lastHistoryClear;
var numpadType;

document.oncontextmenu = function() {return false;}
window.addEventListener("load",function() {
    switch (window.location.hash) {
        case "#settings":
            $id("btn_settings_on").click();
            break;
        case "#history":
            $id("btn_settings_on").click();
            $id("fragment2_tab2").click();
            break;
        case "#other":
            $id("btn_settings_on").click();
            $id("fragment2_tab3").click();
            break;
        default:
            window.location.hash = "#main";
            break;
    }

    setBackgroundFile("popup.html");
    if(5<getDateAndTime("Hours") && getDateAndTime("Hours")<10) {
        $id("header_text").innerHTML = "Günaydın";
        $id("header_text").style.fontSize = "26px";
    } else if(9<getDateAndTime("Hours") && getDateAndTime("Hours")<12) {
        $id("header_text").innerHTML = "11/A";
        $id("header_text").style.fontSize = "30px";
    } else if(12<=getDateAndTime("Hours") && getDateAndTime("Hours")<15) {
        $id("header_text").innerHTML = "Tünaydın";
        $id("header_text").style.fontSize = "26px";
    } else{
        $id("header_text").innerHTML = "11/A";
        $id("header_text").style.fontSize = "30px";
    }
},false);

function openNumpad(numpad_type) {
    $id("fill_bg").style.display = "block";
    $id("numpad").style.display = "block";
    if(numpad_type === "Timer") {
        $id("btn_timer").disabled = true;
        input_timer_numpad.style.display = "block";
        input_currency_numpad.style.display = "none";
        $id("btn_timer_numpad").style.display = "block";
        $id("btn_currency_numpad").style.display = "none";
        numpadType = "Timer";
    } else if(numpad_type === "Currency") {
        input_timer_numpad.style.display = "none";
        input_currency_numpad.style.display = "block";
        $id("btn_timer_numpad").style.display = "none";
        $id("btn_currency_numpad").style.display = "block";
        numpadType = "Currency";
    }
}

function numpadAdd(num) {
    var new_input_timer_value;
    var new_input_currency_value;
    if(numpadType === "Timer") {
        if(input_timer_numpad.value.toString().length < parseInt(input_timer_numpad.getAttribute("maxlength"))) {
            new_input_timer_value = parseInt(input_timer_numpad.value + num);
            input_timer_numpad.value = new_input_timer_value;
        }
        if(input_timer_numpad.value.charAt(0) === "0") {
            input_timer_numpad.value = null;
        }
        input_timer_numpad.focus();
    } else if(numpadType === "Currency") {
        if(input_currency_numpad.value.length < parseInt(input_currency_numpad.getAttribute("maxlength"))) {
            new_input_currency_value = parseInt(input_currency_numpad.value + num);
            input_currency_numpad.value = new_input_currency_value;
        }
        if(input_currency_numpad.value.charAt(0) === "0") {
            input_currency_numpad.value = null;
        }
        input_currency_numpad.focus();
    }
}

$id("btn_settings_on").addEventListener("click", function() {
    $id("fragment1").style.display = "none";
    $id("btn_settings_on").style.display = "none";
    $id("fragment2").style.display = "block";
    $id("btn_settings_off").style.display = "block";
    window.location.hash = "#settings";
    document.title = "Ayarlar - 11/A Akıllı Tahta Eklentisi";
});
$id("btn_settings_off").addEventListener("click", function() {
    $id("fragment1").style.display = "block";
    $id("btn_settings_on").style.display = "block";
    $id("fragment2").style.display = "none";
    $id("btn_settings_off").style.display = "none";
    $id("btn_hide_details").click();
    $id("btn_hide_history").click();
    window.location.hash = "#main";
    document.title = "11/A Akıllı Tahta Eklentisi";
});
$id("btn_fullscreen").addEventListener("click", function() {
    openTab(chrome.runtime.getURL("/popup.html"));
});

input_currency.addEventListener("click", function() {
    openNumpad("Currency");
});

$id("btn_dollar").addEventListener("click", function() {
    if(input_currency.value.length > 0) {
        openTab("https://www.google.com/search?q=" + input_currency.value + "+Dolar+Ka%C3%A7+TL&ie=UTF-8", input_currency.value + " Dolar Kaç TL - Google'da Ara", "www.google.com");
    } else{
        openTab("https://www.google.com/search?q=Dolar%2FTL&ie=UTF-8", "Dolar/TL - Google'da Ara", "www.google.com");
    }
});
$id("btn_euro").addEventListener("click", function() {
    if(input_currency.value.length > 0) {
        openTab("https://www.google.com/search?q=" + input_currency.value + "+Euro+Ka%C3%A7+TL&ie=UTF-8", input_currency.value + " Euro Kaç TL - Google'da Ara", "www.google.com");
    } else{
        openTab("https://www.google.com/search?q=Euro%2FTL&ie=UTF-8", "Euro/TL - Google'da Ara", "www.google.com");
    }
});  
$id("btn_pound").addEventListener("click", function() {
    if(input_currency.value.length > 0) {
        openTab("https://www.google.com/search?q=" + input_currency.value + "+Sterlin+Ka%C3%A7+TL&ie=UTF-8", input_currency.value + " Sterlin Kaç TL - Google'da Ara", "www.google.com");
    } else{
        openTab("https://www.google.com/search?q=Sterlin%2FTL&ie=UTF-8", "Sterlin/TL - Google'da Ara", "www.google.com");
    }
});
$id("btn_covid19").addEventListener("click", function() {
    openTab("https://covid19.saglik.gov.tr/", "Covid 19 - T.C. Sağlık Bakanlığı", "covid19.saglik.gov.tr");
});
$id("btn_timer").addEventListener("click", function() {
    if(input_timer_numpad.value.toString().length > 0) {
        input_timer_numpad.value = Math.abs(input_timer_numpad.value);
        input_timer_numpad.value = parseInt(input_timer_numpad.value);
    }
    openTab("chrome-extension://" + chrome.runtime.id + "/timer.html?timer=" + ((input_timer_numpad.value.length > 0) ? input_timer_numpad.value : 0), "Zamanlayıcı" + ((input_timer_numpad.value.length > 0) ? " ("  + input_timer_numpad.value + " Dakika)" : ""), "Yerel Eklenti Dosyası");
});
$id("btn_weather").addEventListener("click", function() {
    openTab("https://www.mgm.gov.tr/tahmin/il-ve-ilceler.aspx?il=Tunceli", "Tunceli Hava Durumu - Meteoroloji Genel Müdürlüğü", "www.mgm.gov.tr");
});

input_timer_numpad.addEventListener("keypress", function(event) {
    if(event.key === "Enter") {
        event.preventDefault();
        $id("btn_timer").disabled = false;
        $id("btn_timer").click();
        $id("btn_numclose").click();
    }
    if(input_timer_numpad.value.toString().length == parseInt(input_timer_numpad.getAttribute("maxlength"))) {
        event.preventDefault();
        return false;
    }
});
input_currency_numpad.addEventListener("keypress", function(event) {
    if(event.key === "Enter") {
        event.preventDefault();
        $id("btn_currency_numpad").click();
    }
    if(input_currency_numpad.value.toString().length == parseInt(input_currency_numpad.getAttribute("maxlength"))) {
        event.preventDefault();
        return false;
    }
});

input_timer.addEventListener("click", function() {
    openNumpad("Timer");
    input_timer_numpad.focus();
});
input_currency.addEventListener("click", function() {
    openNumpad("Currency");
    input_currency_numpad.focus();
});

numpad.addEventListener("click", function(e) {
    if (e.target && e.target.nodeName.toLowerCase() === "button" && e.target.getAttribute("num") != null) {
        numpadAdd(parseInt(e.target.getAttribute("num")));
    }
});

$id("btn_numback").addEventListener("click", function() {
    if(numpadType === "Timer") {
        if(input_timer_numpad.value.toString().length > 1) {input_timer_numpad.value = parseInt(input_timer_numpad.value.toString().slice(0, -1));}
        else{input_timer_numpad.value = null;}
        input_timer_numpad.focus();
    } else if(numpadType === "Currency") {
        if(input_currency_numpad.value.toString().length > 1) {
            input_currency_numpad.value = parseInt(input_currency_numpad.value.toString().slice(0, -1));
        } else{
            input_currency_numpad.value = null;
        }
        input_currency_numpad.focus();
    }
});
$id("btn_numclose").addEventListener("click", function() {
    input_timer_numpad.value = null;
    input_currency_numpad.value = null;
    $id("fill_bg").style.display = "none";
    $id("numpad").style.display = "none";
    if(numpadType === "Timer") {
        $id("btn_timer").disabled = false;
    }
});
$id("btn_music").addEventListener("click", function() {
    openTab("https://www.youtube.com/" + music, "Şarkı Köşesi", "www.youtube.com");
    lastMusic = music;
    setStorage();
    loadStorage();
});
$id("btn_timer_numpad").addEventListener("click", function() {
    $id("btn_timer").disabled = false;
    $id("btn_timer").click();
    $id("btn_numclose").click();
});
$id("btn_currency_numpad").addEventListener("click", function() {
    input_currency.value = input_currency_numpad.value;
    $id("btn_numclose").click();
});

$id("fragment2_tab1").addEventListener("click", function() {
    $id("fragment2_tab-fragment1").style.display = "block";
    $id("fragment2_tab-fragment2").style.display = "none";
    $id("fragment2_tab-fragment3").style.display = "none";
    $id("fragment2_tab1").classList.add("active-tab");
    $id("fragment2_tab2").classList.remove("active-tab");
    $id("fragment2_tab3").classList.remove("active-tab");
    window.location.hash = "#settings";
});
$id("fragment2_tab2").addEventListener("click", function() {
    $id("fragment2_tab-fragment2").style.display = "block";
    $id("fragment2_tab-fragment1").style.display = "none";
    $id("fragment2_tab-fragment3").style.display = "none";
    $id("fragment2_tab2").classList.add("active-tab");
    $id("fragment2_tab1").classList.remove("active-tab");
    $id("fragment2_tab3").classList.remove("active-tab");
    window.location.hash = "#history";
});
$id("fragment2_tab3").addEventListener("click", function() {
    $id("fragment2_tab-fragment3").style.display = "block";
    $id("fragment2_tab-fragment2").style.display = "none";
    $id("fragment2_tab-fragment1").style.display = "none";
    $id("fragment2_tab3").classList.add("active-tab");
    $id("fragment2_tab2").classList.remove("active-tab");
    $id("fragment2_tab1").classList.remove("active-tab");
    window.location.hash = "#other";
});

$id("input_theme_color").addEventListener("change", function() {
    lastSettingsUpdate = getDateAndTime("DateAndTime");
    setStorage();
    loadStorage();
});

$id("btn_show_details").addEventListener("click", function() {
    $id("btn_show_details").style.display = "none";
    $id("btn_hide_details").style.display = "block";
    $id("details_content").style.display = "block";
    $id("details_scroll").scrollIntoView();
});
$id("btn_hide_details").addEventListener("click", function() {
    $id("btn_show_details").style.display = "block";
    $id("btn_hide_details").style.display = "none";
    $id("details_content").style.display = "none";
});
$id("btn_show_history").addEventListener("click", function() {
    $id("btn_show_history").style.display = "none";
    $id("btn_hide_history").style.display = "block";
    $id("history_content").style.display = "block";
    $id("history_scroll").scrollIntoView();
    if(historyContent.length > 0) {
        $id("btn_clear_history").style.display = "block";
    }
});
$id("btn_hide_history").addEventListener("click", function() {
    $id("btn_show_history").style.display = "block";
    $id("btn_hide_history").style.display = "none";
    $id("btn_clear_history").style.display = "none";
    $id("history_content").style.display = "none";
});
$id("btn_clear_history").addEventListener("click", function() {
    $id("fill_bg").style.display = "block";
    $id("dialog").style.display = "block";
});
$id("btn_extension_page").addEventListener("click", function() {
    openTab("chrome://extensions/?id=" + chrome.runtime.id);
});
$id("btn_dialog_yes").addEventListener("click", function() {
    $id("history_content").innerHTML = "<i style='font-size: 120px;margin-bottom: 5px;' class='fas fa-trash'></i><br>Geçmiş Boş";
    $id("btn_clear_history").style.display = "none";
    lastHistoryClear = getDateAndTime("DateAndTime");
    historyContent = "";
    totalHistoryContent = 0;
    setStorage();
    loadStorage();
    $id("fill_bg").style.display = "none";
    $id("dialog").style.display = "none";
});
$id("btn_dialog_no").addEventListener("click", function() {
    $id("fill_bg").style.display = "none";
    $id("dialog").style.display = "none";
});