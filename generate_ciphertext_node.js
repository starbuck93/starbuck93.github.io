// Node.js utility to generate ciphertext for contact.js
const CryptoJS = require('crypto-js');

// Function to generate ciphertext
function generateCiphertext(data, password) {
    try {
        // Convert data to JSON string
        const jsonString = JSON.stringify(data, null, 2);

        // Encrypt using CryptoJS AES
        const ciphertext = CryptoJS.AES.encrypt(jsonString, password);

        // Return the encrypted string
        return {
            success: true,
            ciphertext: ciphertext.toString(),
            password: password,
            originalData: data
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}

// Function to test decryption
function testDecryption(ciphertext, password) {
    try {
        const bytes = CryptoJS.AES.decrypt(ciphertext, password);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return {
            success: true,
            data: decryptedData
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}

// Example usage
console.log('🔐 Ciphertext Generator for contact.js\n');

// Sample contact data
const sampleData = [
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

const password = "your_secure_password";

console.log('📝 Original data:');
console.log(JSON.stringify(sampleData, null, 2));
console.log('\n🔑 Password:', password);
console.log('\n🔄 Generating ciphertext...\n');

// Generate ciphertext
const result = generateCiphertext(sampleData, password);

if (result.success) {
    console.log('✅ Ciphertext generated successfully!');
    console.log('📋 New ciphertext:');
    console.log(result.ciphertext);
    console.log('\n🔧 To update your contact.js file, replace this line:');
    console.log(`const ciphertext = "${result.ciphertext}";`);

    // Test decryption
    console.log('\n🧪 Testing decryption...');
    const testResult = testDecryption(result.ciphertext, password);

    if (testResult.success) {
        console.log('✅ Decryption test passed!');
        console.log('📝 Decrypted data:');
        console.log(JSON.stringify(testResult.data, null, 2));
    } else {
        console.log('❌ Decryption test failed:', testResult.error);
    }

    console.log('\n💡 How to use:');
    console.log('1. Copy the new ciphertext above');
    console.log('2. Open js/contact.js');
    console.log('3. Replace the ciphertext variable with the new value');
    console.log('4. Save the file');
    console.log('5. Test it by opening contact.html');

} else {
    console.log('❌ Error generating ciphertext:', result.error);
}

// Instructions for custom data
console.log('\n📖 To use with your own data:');
console.log('1. Edit the sampleData variable above with your contact information');
console.log('2. Change the password variable to your desired password');
console.log('3. Run: node generate_ciphertext_node.js');
