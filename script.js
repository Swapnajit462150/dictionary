const form = document.querySelector('form');
const resultDiv = document.querySelector('.result');

form.addEventListener('submit' , (e)=>{
    e.preventDefault();
    getWordInfo(form.elements[0].value);
    
});

const getWordInfo =  async (word)=>{
  try{
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();
    console.log(data);
    document.querySelector('.result').style.display="block"
    let definitions = data[0].meanings[0].definitions[0];
    resultDiv.innerHTML = `
    <h3><strong>Word :</strong> ${data[0].word}</h3>
    <p class="partOfSpeech">${data[0].meanings[0].partOfSpeech}</p>
    <p> <strong> Meaing : </strong> ${definitions.definition === undefined ? "Not Available" :
        definitions.definition }</p>
    <p> <strong> Example : </strong> ${definitions.example === undefined ? "Not Available" :
        definitions.example}</p>
    <p><strong>Antonyms :</strong></p>

    `;
    if(definitions.antonyms.length === 0){
        resultDiv.innerHTML += `<p><span> Not Available </span></p>`;
    }else{
        for(let i=0; i<definitions.antonyms.length; i++){
            resultDiv.innerHTML += `<li>${definitions.antonyms[i]}</li>`
        }
    }
    resultDiv.innerHTML +=`<P><strong>Synonyms :</strong> </P>`;
    if(definitions.synonyms.length === 0){
        resultDiv.innerHTML += `<p><span> Not Available </span></p>`;
    }else{
        for(let i=0; i<definitions.synonyms.length; i++){
            resultDiv.innerHTML += `<li>${definitions.synonyms[i]}</li>`
        }
    }
   ;
       resultDiv.innerHTML +=`<P><strong>Audio :</strong> </P>`;
        if(data[0].phonetics[0].audio.length === 0){
            resultDiv.innerHTML += `<p><span> Audio Not Available </span></p>`;
        }else{
            
             resultDiv.innerHTML += ` <audio controls>
                <source src="${data[0].phonetics[0].audio}" type="audio/ogg">
            </audio>`
            
        }
    resultDiv.innerHTML +=`<p class="readMore"><a href="${data[0].sourceUrls}" target="_blank">Read More...</a></p>`
  }
  catch (error){
    resultDiv.innerHTML =`<h3> Sorry, this word is not available in this Dictionary..... </h3>`
  }
   
   
}