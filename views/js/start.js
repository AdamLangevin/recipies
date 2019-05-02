//This block strips any query from the URL entered into
//the browser.
let text ='';
console.log(window.location.search);
let query = window.location.search;
if(query !== ''){
  let pos = query.indexOf('=');
  text = query.slice(pos+1,query.length)
  console.log(text);
  handleURLSubmit(text);
}

//if the submit button was used to enter an ingredient request, its
//handled here
function handleSubmitButton(){
  let userText = $('#text-search-feild').val();
  console.log("Button submission query made: " + userText);
  makeAPIRequest(userText);
  $('#text-search-feild').val('');
}

//If the user has submitted a request via the URL its handled here
function handleURLSubmit(userText){
  if(userText === '') return;
  console.log("URL query made: " + userText);
  makeAPIRequest(userText);
  $('#text-search-feild').val('');
};

//Makes the API request. The server allows the client to make
//the request without being sent through the server.
function makeAPIRequest(userText) {
  if(userText && userText != ''){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          let res = JSON.parse(xhr.responseText);
        let recipes = res.recipes;
        let count = res.count;
        let textDiv = document.getElementById("search-return-box");
        textDiv.innerHTML = '';
        for(let i=0; i<count; i++){
          textDiv.innerHTML = textDiv.innerHTML +
          `<div id="card" class="card">
            <a href =${recipes[i].source_url} target ="_blank"><img id="card-image" name=${recipes[i].recipe_id} src=${recipes[i].image_url}></a>
            <div id="card-info" class="container">
              <a href =${recipes[i].source_url} target ="_blank"><h1 id="card-info-headers">${recipes[i].title}</h1></a>
              <p>${recipes[i].publisher}</p></a>
            </div>
          </div>`;
          console.log(JSON.stringify(recipes[i].source_url));
        }
      }
    };
    xhr.open('GET', `/api?ingredient=${userText}`, true)
    xhr.send();
  }
}

//Quick function to handle the enter key being pressed. Taken from
//proffessor Nel's Assignment 1 demo code
const ENTER=13
document.getElementById("text-search-feild")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === ENTER) {
        document.getElementById("submit-button").click();
    }
});
