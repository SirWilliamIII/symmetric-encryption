const encryptButton = document.getElementById("encrypt");
    const decryptButton = document.getElementById("decrypt");
    const generateKeyButton = document.getElementById("generateKey");

    encryptButton.addEventListener("click", async () => {
      const message = document.getElementById("message").value;
      const key = document.getElementById("key").value;

      try {
        const response = await fetch("/encrypt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message, key })
        });
        const data = await response.json();
        if (data.encrypted) {
          document.getElementById("encryptedMessage").value = data.encrypted;
        } else {
          alert(data.error);
        }
      } catch (err) {
        alert("Error encrypting the message.");
      }
    });

    decryptButton.addEventListener("click", async () => {
      const encryptedMessage = document.getElementById("decryptMessage").value;
      const key = document.getElementById("decryptKey").value;

      try {
        const response = await fetch("/decrypt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ encryptedMessage, key })
        });
        const data = await response.json();
        if (data.decrypted) {
          document.getElementById("decryptedMessage").value = data.decrypted;
        } else {
          alert(data.error);
        }
      } catch (err) {
        alert("Error decrypting the message.");
      }
    });

    generateKeyButton.addEventListener("click", async () => {
      try {
        const response = await fetch("/generate-key");
        const data = await response.json();
        if (data.key) {
          document.getElementById("generatedKey").value = data.key;
        }
      } catch (err) {
        alert("Error generating a symmetric key.");
      }
    });