// Utility to generate new ciphertext for contact.js
// Run this in a browser console or Node.js environment with crypto-js

// Example: Encrypt new contact data
function generateCiphertext(data, password) {
    try {
        // Convert data to JSON string
        const jsonString = JSON.stringify(data);

        // Encrypt using CryptoJS AES
        const ciphertext = CryptoJS.AES.encrypt(jsonString, password);

        // Return the encrypted string
        return ciphertext.toString();
    } catch (error) {
        console.error('Error generating ciphertext:', error);
        return null;
    }
}

// Example usage:
// 1. Define your contact data
const sampleContactData = [
    {
        "Name": "John Doe",
        "Email": "john@example.com",
        "Cell Phone": "555-123-4567"
    },
    {
        "Name": "Jane Smith",
        "Email": "jane@example.com",
        "Cell Phone": "555-987-6543"
    }
];

// 2. Choose a password
const password = "your_secure_password";

// 3. Generate ciphertext
const newCiphertext = generateCiphertext(sampleContactData, password);

console.log('New ciphertext:', newCiphertext);
console.log('Password:', password);

// To update your contact.js file, replace the ciphertext variable with this new value:
// const ciphertext = "YOUR_NEW_CIPHERTEXT_HERE";

// Test decryption
function testDecryption(ciphertext, password) {
    try {
        const bytes = CryptoJS.AES.decrypt(ciphertext, password);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        console.log('✅ Decryption successful!');
        console.log('Decrypted data:', decryptedData);
        return decryptedData;
    } catch (error) {
        console.log('❌ Decryption failed:', error.message);
        return null;
    }
}

// Test the generated ciphertext
if (newCiphertext) {
    const decrypted = testDecryption(newCiphertext, password);
}
