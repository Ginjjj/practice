function isLetter(char, alphabet) {
  for (let i = 0; i < alphabet.length; i++) {
    if (char === alphabet[i]) {
      return true;
    }
  }
  return false;
}

function findIndex(char, alphabet) {
  for (let i = 0; i < alphabet.length; i++) {
    if (char === alphabet[i]) {
      return i;
    }
  }
}

function rot13(input) {
  const low = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",];
  const high = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",];
  const codeLow = ["n","o","p","q","r","s","t","u","v","w","x","y","z","a","b","c","d","e","f","g","h","i","j","k","l","m",];
  const codeHigh = ["N","O","P","Q","R","S","T","U","V","W","X","Y","Z","A","B","C","D","E","F","G","H","I","J","K","L","M",];
  let result = "";

  for (let i = 0; i < input.length; i++) {
    let char = input[i];

    if (isLetter(char, low)) {
      let curIndex = findIndex(char, low);
      result += codeLow[curIndex];
    } else if (isLetter(char, high)) {
      let curIndex = findIndex(char, high);
      result += codeHigh[curIndex];
    } else {
      result += char;
    }
  }

  return result;
}

document.getElementById("field").addEventListener("submit", function (event) {
  event.preventDefault();

  const encryptedText = rot13(document.getElementById("textInput").value);

  document.getElementById("result").textContent = encryptedText;
});
