const ciphertext = "U2FsdGVkX19puVeJZeMCWYayHr2jp8rBMYFXDgG9eegPWN7OaSwgHDguYq0v6wLEH4OWOK1d+uGfcOuvHEYXBkk+BWEEHhXuMfe07lD6PJw/WLIIKiTUxqOztVD4h91Is5olqEYrcOdVQA7BlbbSy5vaM0VZxseWS9vL2h2Bimlh8eg/EkvOipGSKM0k2HT27O0rwHwyyaF4aZT6S0NavyuMW42hq+WnatX3crjTzF5j/2S+OrzF/OP2oIegc1Pf"; // Replace with actual ciphertext




function decryptContactInfo(password) {
    try {
        const bytes = CryptoJS.AES.decrypt(ciphertext, password);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        let html = '<div class="d-flex flex-wrap justify-content-center">';
        decryptedData.forEach(person => {
            html += `<div class="card m-2" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">${person.Name}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">Contact Information</h6>
                            <p class="card-text">
                                Email: <a href="mailto:${person.Email}">${person.Email}</a><br>
                                Cell Phone: <a href="tel:${person["Cell Phone"]}">${person["Cell Phone"]}</a>
                            </p>
                        </div>
                    </div>`;
        });
        html += '</div>';

        document.getElementById('contactInfo').innerHTML = html;

    } catch (error) {
        document.getElementById('contactInfo').innerHTML = '<p style="color:red;">Incorrect password.</p>';
    }
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

document.addEventListener('DOMContentLoaded', function() {
    const passwordFromURL = getParameterByName('pass');
    if (passwordFromURL) {
        decryptContactInfo(passwordFromURL);
    }

    document.getElementById('decryptButton').addEventListener('click', function() {
        const password = document.getElementById('password').value;
        decryptContactInfo(password);
    });

    document.getElementById('password').addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            const password = document.getElementById('password').value;
            decryptContactInfo(password);
        }
    });
});
