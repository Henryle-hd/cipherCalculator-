const letters=['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j','k', 'l', 'm','n', 'o', 'p', 'q', 'r', 's', 't','u', 'v', 'w', 'x', 'y', 'z'];


//Encrypted
function caesarCipher(key, planText){
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
   // return cipherText;
    document.getElementById("cipherText").value = cipherText;
}


//Dencrypted
function CipherToPlanText(caesarCipher,key){
    let oldKey;
    let oldKey2;
    let oldPlainText='';
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

const key=document.getElementById('key').value;
const planText=document.getElementById('planText').value;

console.log('Text received: '+planText);

console.log('cipher'+': '+caesarCipher(key, planText));
console.log('Plain'+': '+CipherToPlanText(caesarCipher(key, planText),key))
