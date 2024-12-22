document.getElementById('encryptButton').addEventListener('click', () => {
    // Get message and key from the input fields
    const message = document.getElementById('message').value;
    const key = document.getElementById('key').value;

    if (!message || !key) {
      alert('Please enter both a message and a symmetric key.');
      return "error";
    }

    console.log(e.target)
 
    // Encrypt the message
    const encrypted = CryptoJS.AES.encrypt(message, key).toString();

    // Display the encrypted message
    document.getElementById('encryptedMessage').value = encrypted

  });