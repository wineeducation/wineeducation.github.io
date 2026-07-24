let modalName = "";
let transitioning = false;

let masthead;
let content;
let modalBackground;
let backButton;
let loadScreen;

const INTRO_DELAY = 400;
const INTRO_FADE = 1750;
const MODAL_TOTAL = 1250;
const CROSSFADE = 400;


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
//	LOAD MODAL
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

async function loadFunctions() {

    masthead = document.getElementById('masthead');
    content = document.getElementById('content');
    modalBackground = document.getElementById('modalBackground');
    loadScreen = document.getElementById('loadScreenModal');

    await new Promise(requestAnimationFrame);
    await sleep(INTRO_DELAY);

    modalBackground.classList.replace('hidden','visible');
    loadScreen.classList.replace('hidden','visible');

    await sleep(INTRO_FADE);

    hideLoadScreen();

    await sleep(INTRO_FADE);

    modalBackground.style.visibility = "hidden";
    modalBackground.style.pointerEvents = "none";

    await new Promise(requestAnimationFrame);
    await new Promise(requestAnimationFrame);

    loadBody();

    document.body.classList.remove('noScroll');

    await sleep(INTRO_FADE);
}


//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
//	INTRO HELPERS
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

function hideLoadScreen(){
    loadScreen.classList.replace('visible', 'hidden');
}

function loadBody(){
    requestAnimationFrame(() => {
        masthead.classList.replace('hidden', 'visible');
        content.classList.replace('hidden', 'visible');
    });
}


//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
//	SHOW MODAL
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

async function showModal(modalID){

    if (transitioning) return;

    transitioning = true;

    modalName = modalID;

    document.body.classList.add('noScroll');

    hideMain();

    await sleep(CROSSFADE);

    showModalBackground();

    document
        .getElementById(modalName)
        .classList.replace('hidden','visible');

    transitioning = false;

}


//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
//	HIDE MODAL
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

async function hideModal(){

    if (transitioning) return;
    transitioning = true;

    const modal = document.getElementById(modalName);

    modal.classList.replace('visible','hidden');

    await sleep(CROSSFADE);

    showMain();

    await sleep(Math.max(0, MODAL_TOTAL - CROSSFADE));

    hideModalBackground();

    document.body.classList.remove('noScroll');

    modalName = "";

    transitioning = false;

}


//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
//	MAIN CONTENT HELPERS
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

function showMain(){

    [masthead, content].forEach(element =>
        element.classList.replace('hidden','visible')
    );

}

function hideMain(){

    [masthead, content].forEach(element =>
        element.classList.replace('visible','hidden')
    );

}


//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
//	MODAL BACKGROUND HELPERS
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

function showModalBackground(){

    Object.assign(modalBackground.style, {
        visibility: "visible",
        opacity: 1,
        pointerEvents: "auto"
    });
}

function hideModalBackground(){

    Object.assign(modalBackground.style, {
        visibility: "hidden",
        opacity: 0,
        pointerEvents: "none"
    });
}

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
//	ZIP VALIDATION
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

const zip = document.getElementById("zip");

zip.addEventListener("input", () => {
    const value = zip.value;

    const valid =
        /^9310[1-9]$/.test(value) ||
        /^9311[0-7]$/.test(value);

    if (value.length === 5 && !valid) {
        zip.setCustomValidity(
            "Sorry, I currently only offer classes within the Santa Barbara area."
        );
    } else {
        zip.setCustomValidity("");
    }
});


//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
//	START PAGE
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

loadFunctions();

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
//	CLOSE MODAL
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

modalBackground.addEventListener("click", (e) => {

    if (!modalName) return;
   	 const modal = document.getElementById(modalName);

    if (modalName === "ContactModal") {
        if (!modal.querySelector(".modalBody").contains(e.target)) {
            hideModal();
        }

        return;
    }

    hideModal();

});
