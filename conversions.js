const binaryToDecimal = (binaryString) => {
    // Error handling for invalid binary input
    if (!/^[01]+$/.test(binaryString)) {
      return "Invalid binary input. Please enter only 0s and 1s.";
    }
  
    let decimalValue = 0;
    for (let i = 0; i < binaryString.length; i++) {
      let digit = parseInt(binaryString[i]);
      decimalValue += digit * Math.pow(2, binaryString.length - i - 1);
    }
    return decimalValue;
  };
  
  const decimalToBinary = (decimalNumber) => {
    // Error handling for negative input
    if (decimalNumber < 0) {
      return "Invalid decimal input. Please enter a non-negative number.";
    }
  
    let binaryString = "";
    while (decimalNumber > 0) {
      binaryString = (decimalNumber % 2) + binaryString;
      decimalNumber = Math.floor(decimalNumber / 2);
    }
    return binaryString;
  };
  
  const dottedDecimalToBinary = (dottedDecimalString) => {
    const octets = dottedDecimalString.split('.');
    let binaryOctetString = "";
  
    for (let octet of octets) {
      let binaryOctet = decimalToBinary(parseInt(octet));
      binaryOctet = binaryOctet.padStart(8, '0');  // Pad with leading zeros if needed
      binaryOctetString += binaryOctet + '.';
    }
  
    return binaryOctetString.slice(0, -1);  // Remove trailing dot
  };
  
  const validateSubnetMask = (binaryMask) => {
    // Check for contiguous block of 1s followed by zeros
    let foundZero = false;
    for (let i = 0; i < binaryMask.length; i++) {
      if (binaryMask[i] === "0" && !foundZero) {
        return false;  // Found a zero before encountering all 1s
      }
      if (binaryMask[i] === "0") {
        foundZero = true;  // Encountered a zero, subsequent bits should be 0
      }
    }
    return true;
  };
  
  const convertValue = () => {
    let conversionType = document.getElementById("conversionType").value;
    let userValue = document.getElementById("userInput").value;
  
    let convertedValue;
    if (conversionType === "binary") {
      convertedValue = binaryToDecimal(userValue);
    } else if (conversionType === "decimal") {
      convertedValue = decimalToBinary(userValue);
    } else if (conversionType === "dottedDecimal") {
      convertedValue = dottedDecimalToBinary(userValue);
    } else {
      convertedValue = "Invalid input";
    }
  
    let resultElement = document.getElementById("result");
    resultElement.textContent = "Converted value: " + convertedValue;
  
    // Check for subnet mask validity only if conversion is successful (binary to decimal)
    if (typeof convertedValue === "number" && conversionType === "binary") {
      let binaryMask = decimalToBinary(255);  // Replace with user input for subnet mask in future enhancement
      if (validateSubnetMask(binaryMask)) {
        console.log("The converted value (" + convertedValue + ") is a valid subnet mask.");
      } else {
        console.log("The converted value (" + convertedValue + ") is not a valid subnet mask.");
      }
    }
  };
  
  // Add event listener for Enter key press
  document.getElementById("userInput").addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
      convertValue();
    }
  });
  
  
  
  

  
  
  
  
  
