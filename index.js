import { catsData } from '/data.js'

const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal') 
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')


emotionRadios.addEventListener('change',highlightCheckedOption)

memeModalCloseBtn.addEventListener('click', closeModal)

getImageBtn.addEventListener('click', renderCat)


function highlightCheckedOption(e){

    const radios = document.getElementsByClassName('radio')
    for (let radio of radios ){
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}



function closeModal(){
    memeModal.style.display = 'none'
}


function renderCat(){
    const catObject = getSingleCatObject()

    memeModalInner.innerHTML =  
    `<img 
    class="cat-img" 
    src="./images/${catObject.image}"
    alt="${catObject.image}"
    >`

    memeModal.style.display = 'flex';

}


function getSingleCatObject(){
    const catsArray = getMatchingCatsArray()

    if(catsArray.length === 1){
        return catsArray[0] //to take out [] and get only object {}
    }else{
        const randomNumber = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomNumber] //math.random: get 0.000-0.999
    }
}


function getMatchingCatsArray(){
        if(document.querySelector('input[type="radio"]:checked')){
            const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
            const isGif = gifsOnlyOption.checked

            // get an array of cats which have the selected emotion in their emotionTags array. 
            const MatchingCatsArray = catsData.filter(function(cat){
        
                if(isGif){
                    return cat.emotionTags.includes(selectedEmotion) && cat.isGif
                }else{
                return cat.emotionTags.includes(selectedEmotion)
                }
            })
            return MatchingCatsArray
        }
}



            

function getEmotionsArray(cats){    //nested "for of". use "cats" as name of  catsData inside the function (parameter)
    const emotionsArray =[]

    for (let cat of cats){
        for(let emotion of cat.emotionTags){
            if(!emotionsArray.includes(emotion)){
            emotionsArray.push(emotion) //const new array and push eash emotion to it
            }
        }      
    }
    return emotionsArray
 
}



function renderEmotionsRadios(cats){
    let radioItems = `` //making a box to put emotions letters inside
    const emotions = getEmotionsArray(cats) //using the result of other function and out the result into new variable
    for(let emotion of emotions){ // other parameters
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input 
            type="radio"
            // id="${emotion}" 
            value="${emotion}"
            name="choice-radios"
            >
    </div>`
// dontforget "" for id and value
        
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios(catsData)

