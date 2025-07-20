const shockedSoundEffectEl = document.getElementById('shocked-sound-effect');
shockedSoundEffectEl.load();

async function startVideoHandler() {
    // await hookTextHandler();
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

            // // Shake Image
            // let checkbox = document.getElementById("checkedBox");
            // if (!checkbox.checked) {
            //     imgEl.classList.remove('animate');
            // } else {
            //     imgEl.classList.add('animate');
            // }

            // // Appear With Effect
            // let appearCheckbox = document.getElementById("appear-checkbox");
            // if (appearCheckbox.checked) {
            //     // imageContainer.classList.add('blink');
            //     await sleep(2);
            //     imgEl.classList.add("appear-animation");
            // } else {
            //     // imageContainer.classList.remove('blink');
            //     imgEl.classList.remove("appear-animation");
            // }

            // // Burning Image
            // let burningCheckbox = document.getElementById("burning-checkbox");
            // if (!burningCheckbox.checked) {
            //     imageContainer.classList.remove('burning-parent');
            //     imgEl.classList.remove('burning-animation');
            // } else {
            //     imageContainer.classList.add('burning-parent');
            //     imgEl.classList.add('burning-animation');
            // }

            imgEl.src = imageSrc;
            imgEl.style.display = 'none';
            imageAnimationsHandler();
        };
    }

    addVideoText();
    appearHandler();
}

async function appearHandler() {
    const appearInputEl = document.getElementById('appear-input');
    if (appearInputEl) {
        let appearAfterTime = appearInputEl.value;
        setTimeout(() => {
            const videoContainerEl = document.getElementById('video-container');
            videoContainerEl.style.opacity = 'unset';
            videoContainerEl.style.animation = 'appearAnimation 5s';
            playUploadedAudio();
        }, appearAfterTime * 1000);
    }
}

async function addVideoText() {
    const videoTextInputEl = document.getElementById('video-text-input');
    if(videoTextInputEl && videoTextInputEl.value) {
        const videoTextEl = document.getElementById('video-text');
        const textContainerEl = document.getElementById('text-container');
        textContainerEl.style.display = 'flex';
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
    const bgImgEl = document.getElementById('bg-image-container');
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

function sleep(s) {
    return new Promise(resolve => setTimeout(resolve, s * 1000));
}