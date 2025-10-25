const videoContainerEl = document.getElementById('video-container');
const shockedSoundEffectEl = document.getElementById('shocked-sound-effect');
shockedSoundEffectEl.load();

const profiles = [
    {
        index: 0,
        img: "./assets/channels4_profile.jpg",
        name: "SpaceExploration",
        handle: "@SpaceExploration3",
        postedAt: 'just after big bang'
    },
    {
        index: 1,
        img: "./assets/channels4_profile2.png",
        name: "Space Talk 101",
        handle: "@SpaceTalk101",
        postedAt: 'just now'
    },
    {
        index: 2,
        img: "./assets/channel_profile_3.png",
        name: "Space Nerds",
        handle: "@Space_Nerds_101",
        postedAt: 'few seconds ago'
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

let textOnly = false;
async function uploadHandler() {
    videoContainerEl.requestFullscreen();
    await sleep(5);
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

            const tpBlinkCheckEl = document.getElementById('tp-blink-checkbox');
            if (tpBlinkCheckEl && tpBlinkCheckEl.checked) {
                videoContainerEl.classList.add('blink');
            }

            const shakeImageEl = document.getElementById('shake-image');
            if (shakeImageEl && shakeImageEl.checked) {
                imageContainer.classList.add('shake-image');
            }

            imgEl.src = imageSrc;
            imgEl.style.display = 'none';
            imageAnimationsHandler();
        };
    }

    if (!bgImage && !file) {
        textOnly = true;
    } else {
        textOnly = false;
    }

    playUploadedAudio();
    addVideoText();
    // changingImagesHandler();
}

async function addVideoText() {
    const videoTextInputEl = document.getElementById('video-text-input');
    const typingTextCheckEl = document.getElementById('typing-text-check');
    if (videoTextInputEl && videoTextInputEl.value) {
        if (typingTextCheckEl && typingTextCheckEl.checked) {
            const typingTextEl = document.getElementById('typing-text');
            const textSizeEl = document.getElementById('top-text-size');
            typingTextEl.style.fontSize = `${textSizeEl.value}px`;

            await sleep(1);
            startTyping({
                textEl: typingTextEl,
                text: videoTextInputEl.value,
                typingSpeed: 0.03   // character delay in seconds
            });
            // typingTextEl.innerText = videoTextInputEl.value;
        } else {
            const textSizeEl = document.getElementById('top-text-size');
            const videoTextEl = document.getElementById('video-text');
            const textContainerEl = document.getElementById('text-container');
            textContainerEl.style.display = 'flex';
            videoTextEl.style.fontSize = `${textSizeEl.value}px`;
            videoTextEl.innerText = videoTextInputEl.value;

            if (textOnly) {
                videoTextEl.classList.add('extra-spacing');
            }
        }
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
    const tpAppearCheckEl = document.getElementById('tp-appear-checkbox');
    const tpContainerEl = document.getElementById('twitter-post-container');
    const tpTextInputEl = document.getElementById('tp-text-input');
    const tpUploadImageEl = document.getElementById('tp-upload-image');
    const tpUploadVideoEl = document.getElementById('videoInput');
    const tpTextSizeEl = document.getElementById('tp-text-size');

    const tpImage = tpUploadImageEl.files[0];
    const tpVideo = tpUploadVideoEl.files[0];
    if (tpTextInputEl.value || tpImage || tpVideo) {
        tpContainerEl.style.display = 'flex';
        tpContainerEl.requestFullscreen();
        await sleep(5);
        const tpCaptionContainerEl = document.getElementById('tp-caption-container');
        const tpProfileImageEl = document.getElementById('tp-user-image');
        const tpProfileNameEl = document.getElementById('tp-name');
        const tpProfileUsernameEl = document.getElementById('tp-username');
        const postedAtEl = document.getElementById('posted-at-text');

        tpProfileImageEl.setAttribute('src', profiles[selectedProfileIndex].img);
        tpProfileNameEl.innerText = profiles[selectedProfileIndex].name;
        tpProfileUsernameEl.innerText = profiles[selectedProfileIndex].handle;
        postedAtEl.innerText = profiles[selectedProfileIndex].postedAt;
        const tpBlinkCheckEl = document.getElementById('tp-blink-checkbox');
        if (tpBlinkCheckEl && tpBlinkCheckEl.checked) {
            tpContainerEl.classList.add('blink');
        }

        const shakeImageEl = document.getElementById('shake-image');
        if (shakeImageEl && shakeImageEl.checked) {
            const tpImageContainer = document.getElementById('tp-image-container');
            tpImageContainer.classList.add('shake-image');
        }

        if (profiles[selectedProfileIndex].handle === '@SpaceTalk101') {
            const tpUserDataEl = document.getElementById('tp-user-data');
            tpUserDataEl.style.background = 'yellow';
            tpUserDataEl.style.color = 'black';
            tpProfileUsernameEl.style.color = '#656565';
            postedAtEl.style.color = '#656565';
            tpCaptionContainerEl.style.backgroundColor = 'yellow';
            tpCaptionContainerEl.style.color = 'black';
            tpProfileImageEl.style.border = '1px solid #6f6f6f';
        } else if (profiles[selectedProfileIndex].handle === '@Space_Nerds_101') {
            const tpUserDataEl = document.getElementById('tp-user-data');
            tpUserDataEl.style.background = '#00FF00';
            tpUserDataEl.style.color = 'black';
            tpProfileUsernameEl.style.color = '#656565';
            postedAtEl.style.color = '#656565';
            tpCaptionContainerEl.style.backgroundColor = '#00FF00';
            tpCaptionContainerEl.style.color = 'black';
            tpProfileImageEl.style.border = '1px solid #6f6f6f';
        }
    }

    if (tpTextInputEl.value) {
        const tpCaptionEl = document.getElementById('tp-caption');
        if (tpTextSizeEl && tpTextSizeEl.value) {
            tpCaptionEl.style.fontSize = `${tpTextSizeEl.value}px`;
        }
        tpCaptionEl.innerText = tpTextInputEl.value;
    }
    if (tpImage) {
        const reader = new FileReader();
        reader.readAsDataURL(tpImage);
        reader.onloadend = async function () {
            const imageSrc = reader.result;
            const tpImageEl = document.getElementById('tp-image');
            tpImageEl.src = imageSrc;

            if (tpAppearCheckEl && tpAppearCheckEl.checked) {
                // await sleep(1);
                tpImageEl.classList.add('appear-animation');
                tpImageEl.style.display = 'block';
                await sleep(10);
                tpImageEl.classList.remove('appear-animation');
            }

            tpImageEl.style.display = 'none';
            tpAnimationsHandler();
        };
    }

    if (tpVideo) {
        const tpVideoContainerEl = document.getElementById('tp-video-container');
        tpVideoContainerEl.style.display = 'block';

        const tpVideoEl = document.getElementById('tp-video');
        tpVideoEl.src = URL.createObjectURL(tpVideo);
        const videoCreditEl = document.getElementById('credit');
        const tpVideoCreditEl = document.getElementById('tp-video-credit');
        if (videoCreditEl && videoCreditEl.value) {
            tpVideoCreditEl.innerHTML = `<img src="./assets/video-image.png" class="credit-text-icon"> ${videoCreditEl.value}`;
        }

        if (tpAppearCheckEl && tpAppearCheckEl.checked) {
            tpVideoEl.classList.add('appear-animation');
            tpVideoEl.style.display = 'block';

            tpVideoCreditEl.classList.add('appear-animation');
            tpVideoCreditEl.style.display = 'flex';

            await sleep(1);
            tpVideoEl.loop = true;
            tpVideoEl.play();

            await sleep(9);
            tpVideoEl.classList.remove('appear-animation');
            tpVideoCreditEl.classList.remove('appear-animation');
        } else {
            tpVideoEl.style.display = 'block';
            tpVideoEl.loop = true;
            tpVideoEl.play();
        }
    }
    popupHandler();

    if (!tpImage && !tpVideo) {
        tpContainerEl.classList.add('extra-spacing');
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

async function tpVideoStyleUpdate() {
    const tpVideoContainerEl = document.getElementById('tp-video-container');
    const tpVideoStylesEl = document.getElementById('tp-video-styles');
    if (tpVideoStylesEl && tpVideoStylesEl.value) {
        let oldStyles = tpVideoContainerEl.getAttribute('style') || '';
        let updatedStyles = oldStyles + tpVideoStylesEl.value;
        tpVideoContainerEl.setAttribute('style', updatedStyles);
    }

    const popup = document.getElementById('popup');
    if (popup) {
        popup.style.display = 'none';
    }

    if (true) {
        const tpUserDataEl = document.getElementById('tp-user-data');
        const tpCaptionContainerEl = document.getElementById('tp-caption-container');
        const tpProfileUsernameEl = document.getElementById('tp-username');
        const postedAtEl = document.getElementById('posted-at-text');
        const tpProfileImageEl = document.getElementById('tp-user-image');
        const tpProfileNameEl = document.getElementById('tp-name');

        tpProfileImageEl.setAttribute('src', profiles[selectedProfileIndex].img);
        tpProfileNameEl.innerText = profiles[selectedProfileIndex].name;
        tpProfileUsernameEl.innerText = profiles[selectedProfileIndex].handle;
        postedAtEl.innerText = profiles[selectedProfileIndex].postedAt;

        if (profiles[selectedProfileIndex].handle === '@SpaceTalk101') {
            tpUserDataEl.style.background = 'yellow';
            tpUserDataEl.style.color = 'black';
            tpProfileUsernameEl.style.color = '#656565';
            postedAtEl.style.color = '#656565';
            tpCaptionContainerEl.style.backgroundColor = 'yellow';
            tpCaptionContainerEl.style.color = 'black';
            tpProfileImageEl.style.border = '1px solid #6f6f6f';
        } else if (profiles[selectedProfileIndex].handle === '@Space_Nerds_101') {
            tpUserDataEl.style.background = '#00FF00';
            tpUserDataEl.style.color = 'black';
            tpProfileUsernameEl.style.color = '#656565';
            postedAtEl.style.color = '#656565';
            tpCaptionContainerEl.style.backgroundColor = '#00FF00';
            tpCaptionContainerEl.style.color = 'black';
            tpProfileImageEl.style.border = '1px solid #6f6f6f';
        } else {
            tpUserDataEl.style.background = 'black';
            tpUserDataEl.style.color = 'unset';
            tpProfileUsernameEl.style.color = '#a5a5a5';
            postedAtEl.style.color = '#9e9e9e';
            tpCaptionContainerEl.style.backgroundColor = 'black';
            tpCaptionContainerEl.style.color = 'unset';
            tpProfileImageEl.style.border = 'none';
        }
    }
}

async function popupHandler() {
    let popupUI = `<div class="popup-overlay" id="popup">
        <div class="popup-box">
            <div class="tp-profile-card">
                <div class="tp-profile-select">Switch profile</div>
                <div class="tp-profile-options">
                    <div class="tp-option">
                        <span class="tp-option-label">SpaceExploration</span>
                        <input class="tp-option-radio" type="radio" name="switch-profile" value="0" ${selectedProfileIndex == 0 ? 'checked' : ''}>
                    </div>
                    <div class="tp-option">
                        <span class="tp-option-label">Space Talk 101</span>
                        <input class="tp-option-radio" type="radio" name="switch-profile" value="1" ${selectedProfileIndex == 1 ? 'checked' : ''}>
                    </div>
                    <div class="tp-option">
                        <span class="tp-option-label">Space Nerds</span>
                        <input class="tp-option-radio" type="radio" name="switch-profile" value="2" ${selectedProfileIndex == 2 ? 'checked' : ''}>
                    </div>
                </div>
            </div>
            <textarea id="tp-video-styles" name="tp-video-styles" class="tp-video-styles"
                placeholder="transform: scale(1.5) translateY(50px);" rows="3" cols="40">transform: scale(1.5);</textarea>
            <button class="close-btn" id="closePopupBtn">Apply</button>
        </div>
    </div>`;

    let tpContainerEl = document.getElementById('twitter-post-container');
    tpContainerEl.insertAdjacentHTML('beforeend', popupUI);


    const openBtn = document.getElementById('openPopupBtn');
    const closeBtn = document.getElementById('closePopupBtn');
    const popup = document.getElementById('popup');

    openBtn.addEventListener('click', () => {
        popup.style.display = 'flex';
        bindChangeEventsToProfileRadios();
    });

    closeBtn.addEventListener('click', () => {
        tpVideoStyleUpdate();
    });

    window.addEventListener('click', (e) => {
        if (e.target === popup) {
            tpVideoStyleUpdate();
        }
    });
}

function bindChangeEventsToProfileRadios() {
    const profileRadios = document.querySelectorAll('input[name="switch-profile"]');
    profileRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.checked) {
                selectedProfileIndex = radio.value;
            }
        });
    });
}

const profileRadios = document.querySelectorAll('input[name="profile"]');
profileRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        if (radio.checked) {
            selectedProfileIndex = radio.value;
        }
    });
});



let typingText = '';
let speed = 0;
let charIndex = 0;
let pauseCharacters = ['.', ','];
let specialLength = 0;
async function startTyping({ textEl, text, typingSpeed }) {
    if (textEl && text && typingSpeed) {
        textEl.style.display = 'block';
    };
    if (text) typingText = text;
    if (typingSpeed) speed = typingSpeed;

    if (charIndex < typingText.length) {
        textEl.textContent = textEl.textContent.substring(0, textEl.textContent.length - specialLength);
        textEl.textContent += typingText.charAt(charIndex);

        charIndex++;
        await sleep(speed);
        await startTyping({ textEl });
    } else {
        typingText = '';
        speed = 0;
        charIndex = 0;
    }

}

