import { changeClass, getStatus, setDisplay } from "./modules/functions.js";
import { fetchNUI } from "./modules/fetch.js"

const doc = document;

const currentDuration = localStorage.getItem('currentDuration') || 0;
const currentCancel = localStorage.getItem('currentCancel') || 0;
const currentEmote = localStorage.getItem('currentEmote') || 0;
const currentKey = localStorage.getItem('currentKey') || 0;

doc.getElementById('home').addEventListener('click', e => {
    changeClass(e.target);
});

doc.getElementById('settings').addEventListener('click', e => {
    changeClass(e.target);
});

doc.getElementById('exit').addEventListener('click', e => {
    changeClass(doc.getElementById('home'));
    fetchNUI('exitPanel');
});

doc.addEventListener('keyup', e => {
    if (e.key == 'Escape') {
        changeClass(doc.getElementById('home'));
        fetchNUI('exitPanel');
    }
})

doc.getElementById('favorite').addEventListener('click', e => changeClass(e.target));
doc.getElementById('dances').addEventListener('click', e => changeClass(e.target));
doc.getElementById('scenarios').addEventListener('click', e => changeClass(e.target));
doc.getElementById('walks').addEventListener('click', e => changeClass(e.target));
doc.getElementById('expressions').addEventListener('click', e => changeClass(e.target));
doc.getElementById('shared').addEventListener('click', e => changeClass(e.target));

doc.getElementById('search-bar').addEventListener('input', e => {
    let input = e.target.value.toUpperCase();
    const panels = doc.getElementsByClassName('anim');
    for (let i = 0; i < panels.length; i++) {
        let text = panels[i].getElementsByTagName('div')[0].firstChild
        let val = text.textContent || text.innerText;
        if (val.toUpperCase().indexOf(input) > -1) {
            panels[i].style.display = "";
        } else {
            text = panels[i].getElementsByTagName('div')[0].lastChild
            val = text.textContent || text.innerText;
            if (val.toUpperCase().indexOf(input) > -1) {
                panels[i].style.display = "";
            } else {
                panels[i].style.display = "none";
            }
        }
    }
})

doc.getElementById('cancel').addEventListener('click', e => {
    let currentColor = e.target.style.backgroundColor
    e.target.classList.add('pop');
    e.target.style.backgroundColor = "#ff0d4ecc";
    setTimeout(() => {
        e.target.style.backgroundColor = currentColor;
        e.target.classList.remove('pop');
    }, 500);
    fetchNUI('cancelAnimation');
});

doc.getElementById('delete').addEventListener('click', e => {
    let currentColor = e.target.style.backgroundColor
    e.target.classList.add('pop');
    e.target.style.backgroundColor = "#ff0d4ecc";
    setTimeout(() => {
        e.target.style.backgroundColor = currentColor;
        e.target.classList.remove('pop');
    }, 500);
    fetchNUI('removeProps');
});

doc.getElementById('movement').addEventListener('click', e => (getStatus(e.target)));
doc.getElementById('loop').addEventListener('click', e => getStatus(e.target));

doc.getElementById('save-settings').addEventListener('click', () => {
    const duration = doc.getElementById('set-duration');
    const cancel = doc.getElementById('set-cancel');
    const emote = doc.getElementById('set-emote');
    const key = doc.getElementById('set-key');

    if (duration.value) {
        localStorage.setItem('currentDuration', duration.value);
        duration.placeholder = duration.value;
        duration.value = '';
    }

    if (cancel.value) {
        localStorage.setItem('currentCancel', cancel.value);
        cancel.placeholder = cancel.value;
        cancel.value = '';
    }

    if (emote.value) {
        localStorage.setItem('currentEmote', emote.value);
        emote.placeholder = emote.value;
        emote.value = '';
    }

    if (key.value) {
        localStorage.setItem('currentKey', key.value);
        key.placeholder = key.value;
        key.value = '';
    }

    fetchNUI('changCfg', {type: 'settings', duration: currentDuration, cancel: currentCancel, emote: currentEmote, key: currentKey})
})