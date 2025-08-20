const ciphertext = "U2FsdGVkX18OBpN7O3QXm/54nfCwl4BYawiJQ8oNIwbkU1aiPxC7PCXwJDWgmFjtlN5tCLV7nb0+Gf0apAC1wCKqjGcJi1aVMNfrJB7SiWT5YSFQ17y9Wn34if9jpVf2MKnJiBGi7wtz6Zmfm0+f1kny/g8+wTyQBE9TFLEYJGxbjd5OzoX6FV3Iu6/LE1alqO0DtAXFQ0qm6k304f/7vJZyVGjE+QKzvuRU34WDkOPaQw5HAl4IMF/W5KKMpIrf"; // Replace with actual ciphertext




function decryptContactInfo(password, fromURL = false) {
    try {
        const bytes = CryptoJS.AES.decrypt(ciphertext, password);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        let html = '<div class="d-flex flex-wrap justify-content-center">';
        decryptedData.forEach(person => {
            html += `<div class="card m-2" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">${person.Name}</h5>
                            <p class="card-text">
                                Email: <a href="mailto:${person.Email}">${person.Email}</a><br>
                                Cell Phone: <a href="tel:${person["Cell Phone"]}">${person["Cell Phone"]}</a>
                            </p>
                        </div>
                    </div>`;
        });
        html += '</div>';

        document.getElementById('contactInfo').innerHTML = html;

        // if (fromURL) {
            document.getElementById('password').style.display = 'none';
            document.getElementById('decryptButton').style.display = 'none';
            document.querySelector('.mb-3').style.display = 'none'; // Hide the entire div containing label and input
            document.getElementById('contact-protected').style.display = 'none';
        // }

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
        decryptContactInfo(passwordFromURL, true);
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
