function uploadHandler() {
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
        };
    }


    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            const imageSrc = reader.result;
            let imageContainer = document.getElementById("uploaded-img-container");
            let imgEl = document.getElementById('uploaded-img');

            // Curtain Effect
            let curtainCheckbox = document.getElementById("curtain-effect");
            let curtainBox = document.getElementById("rxWorld");
            if(curtainCheckbox.checked) {
                imageContainer.remove();
                curtainBox.style.display = 'block';
                let curtainTopEl = document.getElementById("curtain-position-top");
                let rnInnerEl = document.getElementById("rnInner");
                rnInnerEl.style.top = `${curtainTopEl.value}%`;
                imgEl = document.getElementById('uploaded-img');
            }

            // Shake Image
            let checkbox = document.getElementById("checkedBox");
            if (!checkbox.checked) {
                imgEl.classList.remove('animate');
            } else {
                imgEl.classList.add('animate');
            }

            // Appear With Effect
            let appearCheckbox = document.getElementById("appear-checkbox");
            if(appearCheckbox.checked) {
                imageContainer.classList.add('blink');
                imgEl.classList.add("appear-animation");
            } else {
                imageContainer.classList.remove('blink');
                imgEl.classList.remove("appear-animation");
            }
            
            imgEl.src = imageSrc;
            imgEl.style.display = 'none';
            animationsHandler();
        };
    }
}

async function animationsHandler() {
    const imgEl = document.getElementById('uploaded-img');
    imgEl.style.display = 'block';
    const transformRowsContainerEl = document.getElementById("transform-rows-container");

    const animationRows = Array.from(transformRowsContainerEl.getElementsByClassName('new-row'));
    if(animationRows.length <= 0) return;

    for(let i = 0; i < animationRows.length; i++) {
        let rowEl = animationRows[i];
        let animation = Array.from(rowEl.getElementsByClassName('new-animation'))[0].value;
        let duration = Array.from(rowEl.getElementsByClassName('new-animation-duration'))[0].value;
        
        await sleep(0);
        console.log(animation, duration);
        imgEl.style.transition = `transform ${duration}s`;
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

function sleep(s) {
    return new Promise(resolve => setTimeout(resolve, s * 1000));
}