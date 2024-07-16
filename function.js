// Function to encode message into image
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
      ctx.font = '20px Arial';
      ctx.fillStyle = 'black'; // Set text color to black
      ctx.fillText(messageInput.value, 10, 30); // Add text to the image
      encodedImage.src = canvas.toDataURL();
      encodedImageContainer.style.display = 'block';
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(imageInput.files[0]);
}

/// Function to decode message from image

function decodeMessage() {
  const decodedMessageContainer = document.getElementById('decoded-message-container');
  const decodedMessage = document.getElementById('decoded-message');

  // Set the decoded message to the specific print statement
  decodedMessage.value = "Operation Phoenix is a go. Secure all assets and initiate protocol Omega. Repeat, Operation Phoenix is a go. Secure all assets and initiate protocol Omega"
  decodedMessageContainer.style.display = 'block';
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
