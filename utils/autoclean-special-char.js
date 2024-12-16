export function AutoCleanSpecialChar(inputString) {
    // Define a regular expression to match punctuation symbols
    const punctuationRegex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
  
    // Replace all punctuation symbols with an empty string
    const stringWithoutPunctuation = inputString.replace(punctuationRegex, "");
  
    return stringWithoutPunctuation;
  }
  