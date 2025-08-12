const shockedSoundEffectEl = document.getElementById('shocked-sound-effect');
shockedSoundEffectEl.load();

const profiles = [
    {
        index: 0,
        img: "./assets/channels4_profile.jpg",
        name: "QuickFactz",
        handle: "QuickFactz"
    },
    {
        index: 1,
        img: "./assets/channels4_profile2.jpg",
        name: "HardcoreCoder",
        handle: "HardcoreCoder"
    }
]
let selectedProfileIndex = 0;

async function startVideoHandler() {
    // await hookTextHandler();
    await twitterPostHandler();
    await uploadHandler();
}

async function hookTextHandler() {
    let hookTextEl = document.getElementById('hookText');
    let hookText = hookTextEl.value;
    if (!hookText) return;
    const buttons = document.getElementById('buttons');
    buttons.style.display = 'none';
    await sleep(3);


    let hookTextContainerEl = document.getElementById('hookTextContainer');
    let words = hookText.split(' ').map(w => w.trim());
    for (let i = 0; i < words.length; i++) {
        await sleep(0.5);
        shockedSoundEffectEl.currentTime = 0;
        shockedSoundEffectEl.play();
        let word = words[i];
        let divEl = document.createElement('div');
        divEl.classList.add('hookTextWord');
        divEl.innerHTML = word;
        hookTextContainerEl.appendChild(divEl);
    }

    await sleep(2);
    await hideHookText();
}

async function hideHookText() {
    let hookTextContainerEl = document.getElementById('hookTextContainer');
    hookTextContainerEl.classList.add('hideHookTextClass');
    await sleep(0.2);
    hookTextContainerEl.remove();
}

async function uploadHandler() {
    const fileInput = document.getElementById('fileInput');
    const bgImageEl = document.getElementById('bg-image');
    const buttons = document.getElementById('buttons');
    buttons.style.display = 'none';

    const bgImage = bgImageEl.files[0];
    if (bgImage) {
        const reader = new FileReader();
        reader.readAsDataURL(bgImage);
        reader.onloadend = function () {
            const imageSrc = reader.result;
            const imgEl = document.getElementById('img');
            imgEl.src = imageSrc;
            imgEl.style.display = 'none';
            bgAnimationsHandler();
        };
    }


    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async function () {
            const imageSrc = reader.result;
            let imageContainer = document.getElementById("uploaded-img-container");
            let imgEl = document.getElementById('uploaded-img');

            // Shake Image
            let checkbox = document.getElementById("checkedBox");
            if (!checkbox.checked) {
                imgEl.classList.remove('animate');
            } else {
                imgEl.classList.add('animate');
            }

            // Appear With Effect
            let appearCheckbox = document.getElementById("appear-checkbox");
            if (appearCheckbox.checked) {
                // imageContainer.classList.add('blink');
                await sleep(2);
                imgEl.classList.add("appear-animation");
            } else {
                // imageContainer.classList.remove('blink');
                imgEl.classList.remove("appear-animation");
            }

            imgEl.src = imageSrc;
            imgEl.style.display = 'none';
            imageAnimationsHandler();
        };
    }

    playUploadedAudio();
    addVideoText();
    // changingImagesHandler();
}

async function addVideoText() {
    const videoTextInputEl = document.getElementById('video-text-input');
    if (videoTextInputEl && videoTextInputEl.value) {
        const textSizeEl = document.getElementById('top-text-size');
        const videoTextEl = document.getElementById('video-text');
        const textContainerEl = document.getElementById('text-container');
        textContainerEl.style.display = 'flex';
        videoTextEl.style.fontSize = `${textSizeEl.value}px`;
        videoTextEl.innerText = videoTextInputEl.value;
    }
}

async function imageAnimationsHandler() {
    const imgEl = document.getElementById('uploaded-img');
    imgEl.style.display = 'block';

    const imageStylesEl = document.getElementById("imageStyles");
    if (imageStylesEl.value) {
        let oldStyles = imgEl.getAttribute("style");
        let updatedStyles = oldStyles + imageStylesEl.value;
        console.log(updatedStyles);
        imgEl.setAttribute("style", updatedStyles);
    }

    const transformRowsContainerEl = document.getElementById("transform-rows-container");
    const animationRows = Array.from(transformRowsContainerEl.getElementsByClassName('new-row'));
    if (animationRows.length <= 0) return;

    for (let i = 0; i < animationRows.length; i++) {
        let rowEl = animationRows[i];
        let animation = Array.from(rowEl.getElementsByClassName('new-animation'))[0].value;
        let duration = Array.from(rowEl.getElementsByClassName('new-animation-duration'))[0].value;

        await sleep(0);
        console.log(animation, duration);
        imgEl.style.transition = `transform ${duration}s linear`;
        imgEl.style.transform = animation;
        await sleep(duration);
    }
}

let animationRowCount = 0;
function addNewAnimationHandler() {
    const transformRowsContainerEl = document.getElementById("transform-rows-container");

    let newRow = `
        <div class="new-row" id="new-row-${animationRowCount}">
            <input type="text" placeholder="scale(2) translate(10%, 0%)" class="new-animation" id="new-animation-${animationRowCount}">
            <input type="number" placeholder="duration(s)" class="new-animation-duration" id="new-row-animation-duration-${animationRowCount}">
        </div>
    `;

    let divEl = document.createElement('div');
    divEl.innerHTML = newRow;
    let newRowEl = divEl.querySelector('div');
    transformRowsContainerEl.append(newRowEl);
    divEl.remove();
    animationRowCount++;
}

async function bgAnimationsHandler() {
    const imgEl = document.getElementById('img');
    imgEl.style.display = 'block';

    const imageStylesEl = document.getElementById("bgImageStyles");
    if (imageStylesEl.value) {
        let oldStyles = imgEl.getAttribute("style");
        let updatedStyles = oldStyles + imageStylesEl.value;
        imgEl.setAttribute("style", updatedStyles);
    }

    const transformRowsContainerEl = document.getElementById("transform-bgrows-container");
    const animationRows = Array.from(transformRowsContainerEl.getElementsByClassName('new-bg-row'));
    if (animationRows.length <= 0) return;

    for (let i = 0; i < animationRows.length; i++) {
        let rowEl = animationRows[i];
        let animation = Array.from(rowEl.getElementsByClassName('new-bg-animation'))[0].value;
        let duration = Array.from(rowEl.getElementsByClassName('new-bg-animation-duration'))[0].value;

        await sleep(0);
        console.log(animation, duration);
        imgEl.style.transition = `transform ${duration}s linear`;
        imgEl.style.transform = animation;
        await sleep(duration);
    }
}


let bgAnimationRowCount = 0;
function addNewBGAnimationHandler() {
    const transformRowsContainerEl = document.getElementById("transform-bgrows-container");

    let newRow = `
        <div class="new-bg-row">
            <input type="text" placeholder="scale(2) translate(10%, 0%)" class="new-bg-animation">
            <input type="number" placeholder="duration(s)" class="new-bg-animation-duration">
        </div>
    `;

    let divEl = document.createElement('div');
    divEl.innerHTML = newRow;
    let newRowEl = divEl.querySelector('div');
    transformRowsContainerEl.append(newRowEl);
    divEl.remove();
    animationRowCount++;
}

function playUploadedAudio() {
    const fileInput = document.getElementById('audio-upload');
    const audioElement = document.getElementById('uploaded-audio');
    const file = fileInput.files[0];

    if (file) {
        const audioURL = URL.createObjectURL(file);
        audioElement.src = audioURL;
        audioElement.play();
    }
}


const changingImagesEl = document.getElementById('changing-images');
changingImagesEl.addEventListener('change', function () {
    const changingImagesBoxEl = document.getElementById('changing-images-box');
    if (changingImagesEl && changingImagesEl.checked) {
        let uploadImagesEl = document.createElement('input');
        uploadImagesEl.setAttribute('type', 'file');
        uploadImagesEl.setAttribute('accept', 'image/*');
        uploadImagesEl.setAttribute('multiple', true);
        uploadImagesEl.setAttribute('id', 'changing-images-input');
        uploadImagesEl.classList.add('changing-images-input');
        changingImagesBoxEl.appendChild(uploadImagesEl);
    }
})

async function changingImagesHandler() {
    const changingImagesInputEl = document.getElementById('changing-images-input');
    const changingImagesVideoEl = document.getElementById('changing-images-video');
    const realChangingImageEl = document.getElementById('real-changing-image');
    const files = changingImagesInputEl.files;
    files.length > 0 ? changingImagesVideoEl.style.display = 'flex' : changingImagesVideoEl.style.display = 'none';
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imageSrc = await readFileAsDataURL(file);
        realChangingImageEl.setAttribute('src', imageSrc);
        realChangingImageEl.classList.add(`show-changing-image-${i % 2 == 0 ? 'left' : 'right'}`);
        await sleep(1);
        realChangingImageEl.classList.remove(`show-changing-image-${i % 2 == 0 ? 'left' : 'right'}`);

        // realChangingImageEl.classList.add(`shake-changing-image`);
        // await sleep(1);
        // realChangingImageEl.classList.remove(`shake-changing-image`);

        realChangingImageEl.classList.add(`hide-changing-image-${i % 2 == 0 ? 'left' : 'right'}`);
        await sleep(0.5);
        realChangingImageEl.classList.remove(`hide-changing-image-${i % 2 == 0 ? 'left' : 'right'}`);
    }
}

function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function sleep(s) {
    return new Promise(resolve => setTimeout(resolve, s * 1000));
}



async function twitterPostHandler() {
    const tpContainerEl = document.getElementById('twitter-post-container');
    const tpTextInputEl = document.getElementById('tp-text-input');
    const tpUploadImageEl = document.getElementById('tp-upload-image');

    const tpImage = tpUploadImageEl.files[0];

    if(tpTextInputEl.value || tpImage) {
        tpContainerEl.style.display = 'flex';
        tpContainerEl.requestFullscreen();
        const tpProfileImageEl = document.getElementById('tp-user-image');
        const tpProfileNameEl = document.getElementById('tp-name');
        const tpProfileUsernameEl = document.getElementById('tp-username');
        tpProfileImageEl.setAttribute('src', profiles[selectedProfileIndex].img);
        tpProfileNameEl.innerText = profiles[selectedProfileIndex].name;
        tpProfileUsernameEl.innerText = profiles[selectedProfileIndex].handle;
    }

    if (tpTextInputEl.value) {
        const tpCaptionEl = document.getElementById('tp-caption');
        tpCaptionEl.innerText = tpTextInputEl.value;
    }
    if (tpImage) {
        const reader = new FileReader();
        reader.readAsDataURL(tpImage);
        reader.onloadend = async function () {
            const imageSrc = reader.result;
            const tpImageEl = document.getElementById('tp-image');
            tpImageEl.src = imageSrc;

            const tpAppearCheckEl = document.getElementById('tp-appear-checkbox');
            if (tpAppearCheckEl && tpAppearCheckEl.checked) {
                tpImageEl.classList.add('appear-animation');
                tpImageEl.style.display = 'block';
                await sleep(5);
                tpImageEl.classList.remove('appear-animation');
            }

            tpImageEl.style.display = 'none';
            tpAnimationsHandler();
        };
    }
}

async function tpAnimationsHandler() {
    const imgEl = document.getElementById('tp-image');
    imgEl.style.display = 'block';

    const transformRowsContainerEl = document.getElementById("tp-transform-rows-container");
    const animationRows = Array.from(transformRowsContainerEl.getElementsByClassName('new-row'));
    if (animationRows.length <= 0) return;

    for (let i = 0; i < animationRows.length; i++) {
        let rowEl = animationRows[i];
        let animation = Array.from(rowEl.getElementsByClassName('new-animation'))[0].value;
        let duration = Array.from(rowEl.getElementsByClassName('new-animation-duration'))[0].value;

        await sleep(0);
        console.log(animation, duration);
        imgEl.style.transition = `transform ${duration}s linear`;
        imgEl.style.transform = animation;
        await sleep(duration);
    }
}

function addNewTPAnimationHandler() {
    const transformRowsContainerEl = document.getElementById("tp-transform-rows-container");

    let newRow = `
        <div class="new-row" id="tp-new-row-${animationRowCount}">
            <input type="text" placeholder="scale(2) translate(10%, 0%)" class="new-animation" id="tp-new-animation-${animationRowCount}">
            <input type="number" placeholder="duration(s)" class="new-animation-duration" id="tp-new-row-animation-duration-${animationRowCount}">
        </div>
    `;

    let divEl = document.createElement('div');
    divEl.innerHTML = newRow;
    let newRowEl = divEl.querySelector('div');
    transformRowsContainerEl.append(newRowEl);
    divEl.remove();
    animationRowCount++;
}


const profileRadios = document.querySelectorAll('input[name="profile"]');
profileRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        if (radio.checked) {
            selectedProfileIndex = radio.value;
        }
    });
});