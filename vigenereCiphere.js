function vigenereFunc(plainText, key) {
    key = key.split('');
    if (plainText.length == key.length) {
        return key.join(' ');
        
    }
    else {
        let temp = key.length;
        for (let i = 0; i < (plainText.length - temp); i++) {
            key.push(plainText[i % ((key).length)]);
        }
     
        return console.log( key.join(''));
    }


}




let keyword = 'henry';
let plainText = 'welcome';
let key=vigenereFunc(plainText, keyword);