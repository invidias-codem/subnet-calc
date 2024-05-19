// Lookup table for subnet class based on first octet
const subnetClassLookup = {
    1: "A",  // Start with 1 to cover the entire range efficiently
    ...(function() {
      let i = 2;
      const lookup = {};
      while (i <= 127) {
        lookup[i] = "A";
        i++;
      }
      while (i <= 191) {
        lookup[i] = "B";
        i++;
      }
      while (i <= 223) {
        lookup[i] = "C";
        i++;
      }
      return lookup;
    })(),
    223: "C" // Ensure the last entry (223) is also assigned
  };
    
  // Pre-calculated network bits for each subnet class
  const subnetClassMap = {
    "A": { min: 1, max: 127, subnetMask: "255.0.0.0", prefixNotation: "/8", networkBits: 8 },
    "B": { min: 128, max: 191, subnetMask: "255.255.0.0", prefixNotation: "/16", networkBits: 16 },
    "C": { min: 192, max: 223, subnetMask: "255.255.255.0", prefixNotation: "/24", networkBits: 24 },
  };
  
  function validateIpAddress(ipAddress) {
    // Validate each octet individually
    for (const octet of ipAddress.split(".")) {
      const value = parseInt(octet, 10);
      if (isNaN(value) || value < 0 || value > 255) {
        return false;
      }
    }
    return true;
  }
  
  function determineSubnetClass(firstOctet) {
    return subnetClassLookup[firstOctet];
  }

  function calculateNetworkRange(ipAddress, subnetMask) {
    // Validate IP address and subnet mask format
    if (!validateIpAddress(ipAddress) || !validateIpAddress(subnetMask)) {
      return "Invalid IP address or subnet mask. Please enter valid values.";
    }
  
    // 1. Convert IP address and subnet mask to binary
    const ipBinary = ipAddress.split(".").map(octet => octet.toString(2).padStart(8, "0")).join("");
    const maskBinary = subnetMask.split(".").map(octet => octet.toString(2).padStart(8, "0")).join("");
  
    // 2. Perform bitwise AND operation
    let networkBinary = "";
    for (let i = 0; i < 32; i++) {
      networkBinary += (ipBinary[i] === "1" && maskBinary[i] === "1") ? "1" : "0";
    }
  
    // 3. Convert network address back to decimal
    const networkAddress = networkBinary.match(/(.{8})/g).map(octet => parseInt(octet, 2)).join(".");
  
    // 4. Calculate broadcast address (all host bits set to 1)
    const broadcastBinary = networkBinary.slice(0, subnetClassMap[determineSubnetClass(ipAddress.split(".")[0])].networkBits) + "1".repeat(32 - subnetClassMap[determineSubnetClass(ipAddress.split(".")[0])].networkBits);
    const broadcastAddress = broadcastBinary.match(/(.{8})/g).map(octet => parseInt(octet, 2)).join(".");
  
    return `Network Range: ${networkAddress} - ${broadcastAddress}`;
  }
  
  
  let subnetChartTBody; // Cache DOM element
  let prefixNotation;
  
  const updateSubnetChart = (ipAddress, subnetMask, subnetClass) => {
    // Cache tbody element on first call
    if (!subnetChartTBody) {
      subnetChartTBody = document.getElementById("subnetClassTable").querySelector("tbody");
    }
  
    // 2. Create a new table row
    const newRow = subnetChartTBody.insertRow();
  
    // 3. Create and populate table cells
    newRow.insertCell().textContent = subnetClass;
  
    const networkRangeCell = newRow.insertCell();
    networkRangeCell.textContent = calculateNetworkRange(ipAddress, subnetMask);
  
    newRow.insertCell().textContent = subnetMask;
  
    const networkBitsCell = newRow.insertCell();
    networkBitsCell.textContent = subnetClassMap[subnetClass].networkBits;  // Use pre-calculated network bits
  
    const hostBitsCell = newRow.insertCell();
    hostBitsCell.textContent = 32 - networkBitsCell.textContent;  // Update based on network bits
  
    // 4. Optionally update cell with prefix notation (if available)
    if (prefixNotation) {
      const prefixCell = newRow.insertCell();
      prefixCell.textContent = subnetClassMap[subnetClass].prefixNotation;
    }
  };
  
  
  document.getElementById("subnetMaskButton").addEventListener("click", () => {
    const ipAddress = document.getElementById("ipAddress").value;
    if (!validateIpAddress(ipAddress)) {
      return "Invalid IP address. Please enter a valid IP address (e.g., 192.168.1.1)";
    }
  
    // Extract first octet
    const firstOctet = parseInt(ipAddress.split(".")[0], 10);
  
    // Validate and determine subnet class
    const subnetClass = determineSubnetClass(firstOctet);
    if (!subnetClass) {
      return "Class D or E addresses not supported";
    }
  
    const subnetMask = subnetClassMap[subnetClass].subnetMask;
  
    // Update subnet chart information
    updateSubnetChart(ipAddress, subnetMask, subnetClass);
  });
  
  
  
  

  
   