# subnet-calc

Binary Conversion & Subnet Mask Tool

This is a web application designed to assist users with network-related calculations. It offers two key functionalities:

Binary Conversion: Convert between binary, decimal, and dotted decimal representations of numerical values. Users can select the desired conversion type from a dropdown menu and enter their value in the designated input field. Clicking the "Convert" button will display the converted value in the result section below.
Subnet Mask Calculation: The tool allows users to validate potential subnet masks. By entering an IP address in the provided field and clicking the "Calculate Subnet Mask" button, the script determines a suitable subnet mask and potentially displays additional information about the network configuration (details depend on the actual implementation in subnetCalc.js).
Technical Details:

The HTML file structures the layout of the web page, including headings, labels, input fields, buttons, and a table for displaying subnet information.
The CSS file (referenced in the <link> tag) likely defines styles for the various elements, controlling their appearance and layout.
Two JavaScript files, conversions.js and subnetCalc.js, handle the conversion logic and subnet mask calculations, respectively.
