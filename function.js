// Encode message into image
function encodeMessage() {
    const imageInput = document.getElementById('image-input');
    const messageInput = document.getElementById('message-input');
    const encodedImageContainer = document.getElementById('encoded-image-container');
    const encodedImage = document.getElementById('encoded-image');

    if (imageInput.files.length === 0 || messageInput.value.trim() === '') {
        alert('Please select an image and enter a message.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            const message = messageInput.value;
            const binaryMessage = stringToBinary(message) + '00000000'; // Add delimiter (null byte)
            let messageIndex = 0;

            for (let i = 0; i < data.length; i += 4) {
                if (messageIndex >= binaryMessage.length) break;
                // Modify the least significant bit of the red channel
                data[i] = (data[i] & 0xFE) | parseInt(binaryMessage[messageIndex], 2);
                messageIndex++;
            }

            ctx.putImageData(imageData, 0, 0);
            encodedImage.src = canvas.toDataURL('image/png');
            encodedImageContainer.style.display = 'block';
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(imageInput.files[0]);
}

// Decode message from image
function decodeMessage() {
    const decodeImageInput = document.getElementById('decode-image-input');
    const decodedMessageContainer = document.getElementById('decoded-message-container');
    const decodedMessage = document.getElementById('decoded-message');

    if (decodeImageInput.files.length === 0) {
        alert('Please select an image.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            let binaryMessage = '';

            for (let i = 0; i < data.length; i += 4) {
                binaryMessage += (data[i] & 1).toString();
            }

            let message = binaryToString(binaryMessage);
            message = message.split('\0')[0]; // Remove the delimiter

            decodedMessage.value = message;
            decodedMessageContainer.style.display = 'block';
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(decodeImageInput.files[0]);
}

// Helper functions to convert between string and binary
function stringToBinary(str) {
    return str.split('').map(c => {
        return c.charCodeAt(0).toString(2).padStart(8, '0');
    }).join('');
}

function binaryToString(binary) {
    let str = '';
    for (let i = 0; i < binary.length; i += 8) {
        const byte = binary.slice(i, i + 8);
        str += String.fromCharCode(parseInt(byte, 2));
    }
    return str;
}

// Event listeners for form submissions
document.getElementById('encode-form').addEventListener('submit', function(event) {
    event.preventDefault();
    encodeMessage();
});

document.getElementById('decode-form').addEventListener('submit', function(event) {
    event.preventDefault();
    decodeMessage();
});

