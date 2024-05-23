const fromText = document.querySelector('.from-text');
const toText = document.querySelector('.to-text');
const rotateBtn = document.querySelector('.exchange');
const selectTag = document.querySelectorAll('select');
const translateBtn = document.querySelector('button');
const icons = document.querySelectorAll('.row i')
selectTag.forEach((tag, id) => {
    for(let country_code in countries){
        let selected = '';
        if(id === 0 && country_code === "en-GB"){
            selected = 'selected';
        } else if(id !== 0 && country_code === "ur-PK"){
            selected = 'selected';
        }
        let Option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
        tag.insertAdjacentHTML('beforeend', Option);
    }
});

rotateBtn.addEventListener('click', () => {
    let firstText = fromText.value;
    fromText.value = toText.value;
    toText.value = firstText;
    let firstLang = selectTag[0].value;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = firstLang;   
});

fromText.addEventListener('keyup', () => {
    if(!fromText.value){
        toText.value= '';
    }
});

const translationFunc = async () => {
    let text = fromText.value.trim();
    let translateFrom = selectTag[0].value;
    let translateTo = selectTag[1].value;
    if(!text) return;
    toText.setAttribute('placeholder', 'Translating...');
    
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        // Set the translated text
        toText.value = data.responseData.translatedText;
        
        // Check for alternative translations
        data.matches.forEach(match => {
            if (match.id === 0) {
                toText.value = match.translation;
            }
        });
        
        // Reset placeholder
        toText.setAttribute("placeholder", "Translation");
    } catch (error) {
        console.error("Error fetching translation:", error);
    }
};

translateBtn.addEventListener('click', translationFunc);
