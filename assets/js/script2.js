const firebaseConfig = {
    apiKey: "AIzaSyAcINU2KIYxsV2WZVTTaZ3tnIXESVOSsWQ",
    authDomain: "dsplayz.firebaseapp.com",
    databaseURL: "https://dsplayz-default-rtdb.firebaseio.com/",
    projectId: "dsplayz",
    storageBucket: "dsplayz.appspot.com",
    messagingSenderId: "565599758200",
    appId: "1:565599758200:web:4f09f33c2565b5d2528a8d",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to the Realtime Database
const database = firebase.database();

document.addEventListener("DOMContentLoaded", function () {
    const redeemBtn = document.getElementById('redeemBtn');
    const prizeDisplay = document.getElementById('prize');
    const cooldownToast = document.getElementById('cooldownToast');
    let toastTimeout;
    let lastRedeemTime = 0;

    const validCodes = {
        "RBX_WIN-Vw7LZ3": "5",
        "RBX_WIN-0nK4OF": "20",
        "RBX_WIN-eyWmsP": "5",
        "RBX_WIN-V1KNd7": "5",
        "RBX_WIN-Az55dC": "5",
        "RBX_WIN-piSH00": "10",
        "RBX_WIN-GlPEi3": "20",
        "RBX_WIN-m1qSwF": "5",
        "RBX_WIN-ApVJy3": "5",
        "RBX_WIN-G7kisC": "10"
    };

    const savedUsername = localStorage.getItem("savedUsername");
    if (savedUsername) {
        document.getElementById('passwordInput').value = savedUsername;
    }

    function showToast(text, color, duration) {
        const toast = document.getElementById("toast");
        toast.textContent = text;
        toast.style.backgroundColor = color;

        if (!toast.classList.contains("show")) {
            toast.classList.add("show");

            toastTimeout = setTimeout(() => {
                toast.classList.remove("show");
            }, duration);
        }
    }

    redeemBtn.addEventListener("click", async function () {
        const currentTime = Date.now();
        const cooldownTime = 15000;

        if (currentTime - lastRedeemTime < cooldownTime) {
            const remainingTime = Math.ceil((cooldownTime - (currentTime - lastRedeemTime)) / 1000);
            showToast(`Too fast, please slow down. Try again in ${remainingTime} seconds.`, "black", 2000);
            return;
        }

        const scInput = document.getElementById('scInput').value;
        const usernameInput = document.getElementById('passwordInput').value;

        if (!usernameInput) {
            showToast("Please enter a username", "black", 2000);
            clearPrize();
            return;
        }

        localStorage.setItem("savedUsername", usernameInput);

        if (!scInput) {
            showToast("Please enter a code", "black", 2000);
            clearPrize();
            return;
        }

        if (validCodes.hasOwnProperty(scInput)) {
            try {
                const redemptionStatus = await checkCodeRedemption(scInput);

                if (redemptionStatus) {
                    showToast("Code has already been redeemed", "red", 2000);
                    clearPrize();
                } else {
                    lastRedeemTime = currentTime;
                    await redeemCode(scInput);
                    showToast(`Code redeemed successfully! You've received ${validCodes[scInput]} Robux. Your Robux will be credited within 24 hours.`, "green", 5000);

                    // Send redemption email using SendGrid
                    const emailDetails = {
                        code: scInput,
                        robux: validCodes[scInput],
                        username: usernameInput,
                        date: new Date().toLocaleString() // You can format the date as needed
                    };
                    sendRedemptionEmail(emailDetails);
                }
            } catch (error) {
                showToast("An error occurred", "red", 2000);
                console.error(error);
            }
        } else {
            showToast("This Code is invalid", "black", 2000);
            clearPrize();
        }
    });

    async function checkCodeRedemption(code) {
        const snapshot = await database.ref('redeemedCodes').child(code).once('value');
        return snapshot.val() === true;
    }

    async function redeemCode(code) {
        await database.ref('redeemedCodes').child(code).set(true);
    }

    function clearPrize() {
        prizeDisplay.textContent = "";
    }

    async function sendRedemptionEmail(details) {
        const emailData = {
            sender: { email: "darkshadowplayz1@gmail.com" },
            to: [{ email: "darkshadowplayz1@gmail.com" }],
            subject: "Redemption Email",
            templateId: 5, // Replace with your actual SendinBlue template ID
            params: {
                username: details.username,
                code: details.code,
                robux: details.robux,
                date: details.date
            }
        };

        try {
            const response = await fetch('https://api.sendinblue.com/v3/smtp/email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': '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'
                },
                body: JSON.stringify(emailData)
            });

            if (response.ok) {
                console.log('Redemption email sent successfully');
            } else {
                console.error('Error sending redemption email:', response.statusText);
            }
        } catch (error) {
            console.error('Error sending redemption email:', error);
        }
    }
});