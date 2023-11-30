window.onload = () => {
    const historyStoreForVigenere = localStorage.getItem('historyStoreForVigenere');
    if (historyStoreForVigenere) {
        const historyList = document.getElementById("historyList");
        historyList.innerHTML = historyStoreForVigenere;
        document.getElementById('clearCipherHistory').style.display = 'block';
        
    }
}



function encrypt() {
    const plainText = document.getElementById("plainText").value.toUpperCase();
    const keyIn = document.getElementById("key").value.toUpperCase();
  
    const key = generateKey(plainText, keyIn) 
    const vigenereCipher=cipherText(plainText, key);

    // This function generates the key in a cyclic manner
    function generateKey(plainText,key)
    {
        
        key = key.split("");
        if (plainText.length == key.length) {
            
            return key.join(""); 
        }  
        else
        {
            let temp = key.length; 
            for (let i = 0;i<(plainText.length-temp) ; i++)
            {
                
                key.push(key[i % ((key).length)])
            }
        }
        return key.join("");
    }

    // This function returns the encrypted text
    function cipherText(plainText,key)
    {
        
        let cipherText="";

        

        for (let i = 0; i < plainText.length; i++)
        {
            if (plainText[i] >= 'a' && plainText[i] <= 'z' || plainText[i] >= 'A' && plainText[i] <= 'Z') {

                // converting in range 0-25
            let x = (plainText[i].charCodeAt(0) + key[i].charCodeAt(0)) %26;

            // convert into alphabets(ASCII)
            x += 'A'.charCodeAt(0);

            cipherText+=String.fromCharCode(x);
               
            }
            else {
                
                cipherText += plainText[i];
            }
            
        }
        return cipherText;
    }
    document.getElementById("cipherText").value = vigenereCipher;
    updateHistory(plainText, vigenereCipher, key);
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
    
        localStorage.setItem("historyStoreForVigenere", historyData);
        document.getElementById('clearCipherHistory').style.display = 'block';
    }
     else if(!plainText && !key){
        alert(`🙏🙏\nPlease enter the text 📝 to encrypt & key word 🔑`);
    }
    else if (!key) {
        alert(`🙏🙏\nPlease enter the key word🔑`);
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



function dencrypt() {

    const cipherText = document.getElementById("plainText").value.toUpperCase();
    const keyIn = document.getElementById("key").value.toUpperCase();
  
    const key = generateKey(cipherText, keyIn) 
    const plainText = originalText(cipherText, key);
    
    
   


    // This function generates the key in a cyclic manner
    function generateKey(cipherText,key)
    {
        
        key = key.split("");
        if (cipherText.length == key.length) {
            
            return key.join(""); 
        }  
        else
        {
            let temp = key.length; 
            for (let i = 0;i<(cipherText.length-temp) ; i++)
            {
                
                key.push(key[i % ((key).length)])
            }
        }
        return key.join("");
    }

 //This function decrypts the encrypted text

function originalText(cipherText,key)
{
    

	let plainText="";

	for (let i = 0 ; i < cipherText.length ; i++)
    {
        

        if (cipherText[i] >= 'a' && cipherText[i] <= 'z' || cipherText[i] >= 'A' && cipherText[i] <= 'Z') {
           // converting in range 0-25
		let x = (cipherText[i].charCodeAt(0) -
					key[i].charCodeAt(0) + 26) %26;

		// convert into alphabets(ASCII)
		x += 'A'.charCodeAt(0);
		plainText+=String.fromCharCode(x); 
        }
        else {
            plainText+=cipherText[i];
        }
		
	}
	return plainText;
}
    
    document.getElementById("cipherText").value = plainText;
    updateHistory(plainText, cipherText, key);

}



function changeModeDe() {
    document.getElementById('container1').innerHTML = `
            <div id="caesarCipherSection" class="main-content">
                <h1>Vigenere Cipher</h1>
                <div class="chooseMode">
                   <button title="Change mode" onclick="changeModeEn()">Mode</button>                 
                </div>
                <div class="input-container">
                    <label for="plainText" class="lable1">Enter Cipher Text:</label>
                    <textarea type="text" name="" id="plainText" cols="30" rows="10" placeholder="Enter your cipher to Dencrypt" ></textarea>
                    <!-- //  <input  id="" required> -->
                </div>
                <div class="input-container">
                    <label for="key" class="lable1">Enter Keyword:</label>
                    <input type="text" id="key" placeholder="Enter your keyword" required>
                </div>
                <button onclick="dencrypt()">Dencrypt</button>
                <div class="result-container">
                    <label for="cipherText">Plain Text:</label>
                    <textarea id="cipherText" placeholder="Your plainText will appaer here!"></textarea>
                </div>
            </div>
            
        </div>
    `
};


function changeModeEn() {
    document.getElementById('container1').innerHTML = `
 <div id="caesarCipherSection" class="main-content">
                <h1>Vigenere Cipher</h1>
                <div class="chooseMode">
                   <button title="Change mode" onclick="changeModeDe()">Mode</button>                 
                </div>
                <div class="input-container">
                    <label for="plainText" class="lable1">Enter Plain Text:</label>
                    <textarea type="text" name="" id="plainText" cols="30" rows="10" placeholder="Enter your text to Encrypt" ></textarea>
                  <!-- //  <input  id="" required> -->
                </div>
                <div class="input-container">
                    <label for="key" class="lable1">Enter Keyword:</label>
                    <input type="text" id="key" placeholder="Enter your keyword" required>
                </div>
                <button onclick="encrypt()">Encrypt</button>
                <div class="result-container">
                    <label for="cipherText">Cipher Text:</label>
                    <textarea id="cipherText" placeholder="Your Cipher will appaer here!"></textarea>
                </div>
            </div>
            `
};





//This function will convert the lower
//case character to Upper case
// function LowerToUpper(s)
// {
// 	let str =(s).split("");
// 	for(let i = 0; i < s.length; i++)
// 	{
// 		if(s[i] == s[i].toLowerCase())
// 		{
// 			str[i] = s[i].toUpperCase();
// 		}
// 	}
// 	s = str.toString();
// 	return s;
// }




// // Driver code
// let str = "PLEASE STUDY HARD";
// let keyword = "BUSINESS";


// let key = generateKey(str, keyword);


// originalText(cipherText(str, key), key);

