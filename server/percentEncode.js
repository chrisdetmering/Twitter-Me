const ASCII_CHARACTERS = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 
'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 
'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 
's', 't', 'u', 'v', 'w', 'x', 'y','z', '-', '.', '_','~']; 


const percentEncode = (string) => { 
  let encodedString = ''; 
  string.split("").forEach(char => {
      if (ASCII_CHARACTERS.includes(char)) { 
        encodedString += char; 
      } else { 
        const encoded = '%' + char.charCodeAt(0).toString(16); 
        encodedString += encoded.toUpperCase(); 
      }
  });

  return encodedString; 
}

console.log(percentEncode('')); 

module.exports = percentEncode; 