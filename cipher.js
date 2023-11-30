// Load history from local storage when the page loads
window.onload = function () {
    const storedHistory = localStorage.getItem('historyStore');
    if (storedHistory) {
        const historyList = document.getElementById("historyList");
        historyList.innerHTML = storedHistory;
        document.getElementById('clearCipherHistory').style.display = 'block';
        
    }
};



function encrypt() {
    const plainTextIn = document.getElementById("plainText").value;
    const plainText=plainTextIn.toLowerCase();
    const key = parseInt(document.getElementById("key").value);
    
    // Call your Caesar Cipher function here and update the cipherText textarea
    const cipherText = caesarCipher(key, plainText);

    
    //Encrypted
    function caesarCipher(key, planText){
        const letters=['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j','k', 'l', 'm','n', 'o', 'p', 'q', 'r', 's', 't','u', 'v', 'w', 'x', 'y', 'z'];

        const toArray=planText.split('');
        let newKey2, newKey;
        let cipherText='';
        toArray.forEach(e => {  
            
            if(letters.includes(e)){
                newKey=letters.indexOf(e)+key;
                if(newKey>25){
                    newKey2=newKey%26;
                    cipherText+=letters[newKey2];
                }
                else{
                    cipherText+=letters[newKey];
                }
            }
            else{
                cipherText+=e;
            }
        });
        return cipherText;
    }

    document.getElementById("cipherText").value = cipherText;
    // document.getElementById("plainText").value = '';
    // parseInt(document.getElementById("key").value=' ');
    
    updateHistory(plainText, cipherText, key)
    
}


//updateHistoryOfCipherText
function updateHistory(plainText, cipherText,key) {
    if (plainText && key) {
        const historyList = document.getElementById("historyList");
    
        // Create a new list item
        const listItem = document.createElement("li");
        listItem.innerHTML = `Plain Text: <p class="plainTextOut"> ${plainText}</p> <br/>Cipher Text: <p class="cipherTexrOut">${cipherText}</p> `;

        // Add the new item to the history list
        let firtOnListItem = historyList.firstChild;
        historyList.insertBefore(listItem, firtOnListItem);

        //store the data in localStorage
        const historyData = historyList.innerHTML;
    
        localStorage.setItem("historyStore", historyData);
        document.getElementById('clearCipherHistory').style.display = 'block';
    }
     else if(!plainText && !key){
        alert(`🙏🙏\nPlease enter the text 📝 to encrypt & key 🔑`);
    }
    else if (!key) {
        alert(`🙏🙏\nPlease enter the key 🔑`);
    }
     else if (!plainText) {
        alert(`🙏🙏\nPlease enter the text 📝 to encrypt`);
    }
   
}

//clearHistory

function clearhistory() {
    localStorage.removeItem("historyStore");
    document.getElementById("historyList").innerHTML = ' ';
    document.getElementById('clearCipherHistory').style.display = 'none';
}


// Dencrypt 
function dencrypt() { 
    const letters=['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j','k', 'l', 'm','n', 'o', 'p', 'q', 'r', 's', 't','u', 'v', 'w', 'x', 'y', 'z'];

    const caesarCipherIn = document.getElementById("plainText").value;
    const caesarCipher=caesarCipherIn.toLowerCase();
    const key = parseInt(document.getElementById("key").value);
    let oldKey;
    let oldKey2;
    let oldPlainText='';

    CipherToPlanText(caesarCipher, key);
    //Dencrypted
    function CipherToPlanText(caesarCipher,key){
        const currentCipher=caesarCipher;
        const currentCipherToArray=currentCipher.split('');
        currentCipherToArray.forEach(e=> {
            if (letters.includes(e)){

            
                oldKey=letters.indexOf(e)-key;
                if(oldKey<0){
                    oldKey2=oldKey+26;
                    oldPlainText+=letters[oldKey2];
                }
                else{
                    oldPlainText+=letters[oldKey];
                }   
            }
            else{
                oldPlainText+=e;
            }
        });
        return oldPlainText;
    }

    document.getElementById("cipherText").value = oldPlainText;
    updateHistory(oldPlainText, caesarCipher, key)
}

//change mode

function changeModeDe() {
    document.getElementById('container1').innerHTML = `
     <div id="caesarCipherSection" class="main-content">
                <h1>Vigenere Cipher</h1>
                <div class="chooseMode">
                   <button title="Change mode" onclick="changeModeEn()">Change Mode</button>                 
                </div>
                <div class="input-container">
                    <label for="plainText" class="lable1">Enter cipher Text:</label>
                    <textarea type="text" name="" id="plainText" cols="30" rows="10" placeholder="Enter your cipher to Dencrypt" ></textarea>
                  <!-- //  <input  id="" required> -->
                </div>
                <div class="input-container">
                    <label for="key" class="lable1">Enter Key:</label>
                    <input type="number" id="key" placeholder="Enter your key" required>
                </div>
                <button onclick="dencrypt('caesar')">Dencrypt</button>
                <div class="result-container">
                    <label for="cipherText">PlainText Text:</label>
                    <textarea id="cipherText" placeholder="Your plainText will appaer here!"></textarea>
                </div>
            </div>
    `
};
function changeModeEn() {
    document.getElementById('container1').innerHTML = `
      <div id="caesarCipherSection" class="main-content">
                <h1>Caesar Cipher</h1>
                <div class="chooseMode">
                   <button title="Change mode" onclick="changeModeDe()">Change Mode</button>                 
                </div>
                <div class="input-container">
                    <label for="plainText" class="lable1">Enter Plain Text:</label>
                    <textarea type="text" name="" id="plainText" cols="30" rows="10" placeholder="Enter your text to Encrypt" ></textarea>
                  <!-- //  <input  id="" required> -->
                </div>
                <div class="input-container">
                    <label for="key" class="lable1">Enter Key:</label>
                    <input type="number" id="key" placeholder="Enter your key" required>
                </div>
                <button onclick="encrypt('caesar')">Encrypt</button>
                <div class="result-container">
                    <label for="cipherText">Cipher Text:</label>
                    <textarea id="cipherText" placeholder="Your Cipher will appaer here!"></textarea>
                </div>
            </div>
    `
};



// function showCaesarCipher() {
//     document.getElementById("caesarCipherSection").style.display = "block";
//     document.getElementById("playfairCipherSection").style.display = "none";
//     document.getElementById("vigenereCipherSection").style.display = "none";
// }

// function showPlayfairCipher() {
//     document.getElementById("caesarCipherSection").style.display = "none";
//     document.getElementById("playfairCipherSection").style.display = "block";
//     document.getElementById("vigenereCipherSection").style.display = "none";
// }

// function showVigenereCipher() {
//     document.getElementById("caesarCipherSection").style.display = "none";
//     document.getElementById("playfairCipherSection").style.display = "none";
//     document.getElementById("vigenereCipherSection").style.display = "block";
// }
