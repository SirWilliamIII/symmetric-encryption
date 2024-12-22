document.getElementById('decryptButton').addEventListener('click', (e) => {
    const encryptedMessage = document.getElementById('encryptedMessage').value;
    const key = document.getElementById('key').value;

    if (!encryptedMessage || !key) {
      alert('Please provide an encrypted message and the key.');
      return;
    }

    console.log(e.target)

    // Decrypt the message
    const decrypted = CryptoJS.AES.decrypt(encryptedMessage, key).toString(CryptoJS.enc.Utf8);

    // Display the decrypted message
    document.getElementById('decryptedMessage').value = decrypted
});