


function bms_loadStylesheet(href) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
}
// =======================loading external libraries and stylesheets

bms_loadStylesheet('https://buymeasamosa.github.io/bms-js/bms_style.css');
// bms_loadStylesheet('/bms_style.css');

document.head.innerHTML += `
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet">
`;


// ==============================================================

var scriptElement = document.createElement('script');
scriptElement.src = 'https://cdn.jsdelivr.net/npm/qrcode-generator/qrcode.js';

scriptElement.onload = bms_data_inj;
document.head.appendChild(scriptElement);

// ===============================================================




function injectHTML() {
    var htmlToInject = `
        <div id="bms-main-card">
            <div id="bms_usernamecontainer"></div>
            <div id="bms-qrcodecontainer">
                <div id="bms_qrcodemain"></div>
                <span id="bms_userupiid"></span>
            </div>
            <div id="bms_useramount"></div>
            <div id="bms_message"></div>
            <span id="bms_inst">SCAN TO PAY WITH ANY UPI APP </span>
            <div id="bms_logocont">
                <img src="https://buymeasamosa.arycodes.in/assets/images/logo_512.png" alt="">
                <span id="bms_logotxt">Buy Me A Samosa</span>
            </div>

             <span class="bms-pay">
                on phone? click to<a class="bms-paybutton" id="bms-paybutton" href="/"> Pay</a>
            </span>

            <span id="bms_closebtn" onclick="toggle_bms_lb()">
                <span></span>
                <span></span>
            </span>
        </div>

        <button id="bms_togglebutton" onclick="toggle_bms_lb()">
            <img src="https://buymeasamosa.arycodes.in/assets/images/logo_512.png" alt="BMS LOGO">
        </button>
    `;

    document.body.innerHTML += htmlToInject;
}

injectHTML();

function bms_qr_maker(bms_upiidqrcnt) {
    var qr = qrcode(0, 'H');
    qr.addData(bms_upiidqrcnt);
    qr.make();
    var qrSvg = qr.createSvgTag();
    document.getElementById('bms_qrcodemain').innerHTML = qrSvg;
    document.getElementById('bms_qrcodemain').innerHTML += `<img src="https://buymeasamosa.arycodes.in/assets/images/logo_512.png" alt="">`;
}

function toggle_bms_lb() {
    let lb = document.getElementById("bms-main-card");

    if (window.getComputedStyle(lb).display === "flex") {
        lb.style.display = "none";
        document.getElementById("bms_togglebutton").innerHTML = `<img src="https://buymeasamosa.arycodes.in/assets/images/logo_512.png" alt="BMS LOGO">`
    } else {
        lb.style.display = "flex";
        document.getElementById("bms_togglebutton").innerHTML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19 9L14 14.1599C13.7429 14.4323 13.4329 14.6493 13.089 14.7976C12.7451 14.9459 12.3745 15.0225 12 15.0225C11.6255 15.0225 11.2549 14.9459 10.9109 14.7976C10.567 14.6493 10.2571 14.4323 10 14.1599L5 9" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`

    }
}



var bms_scriptElement = document.querySelector('script[data-bms="bms"]');

function bms_data_inj() {

    bms_upiid = bms_scriptElement.getAttribute('data-bms_userupi');
    bms_user_name = bms_scriptElement.getAttribute('data-bms_user_name');
    bms_usertmsg = bms_scriptElement.getAttribute('data-bms_usertmsq');
    bms_useramt = bms_scriptElement.getAttribute('data-bms_user_amount') || "";
    console.log(bms_useramt)
    bms_upiidqrcont = `upi://pay?pa=${bms_upiid}&pn=${bms_user_name}&am=${bms_useramt}&cu=INR`

    bms_qr_maker(bms_upiidqrcont)
    document.getElementById("bms_userupiid").innerHTML = bms_upiid
    document.getElementById("bms_usernamecontainer").innerHTML = bms_user_name
    document.getElementById("bms_message").innerHTML = bms_usertmsg
    document.getElementById("bms-paybutton").setAttribute("href", bms_upiidqrcont)

    if (bms_useramt) {
        document.getElementById("bms_useramount").innerHTML = `₹ ${bms_useramt}`
    }

}