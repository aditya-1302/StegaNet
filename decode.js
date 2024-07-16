// Function to decode message from image
function decodeMessage() {
  const encodedImageInput = document.getElementById('encoded-image-input');
  const decodedMessageContainer = document.getElementById('decoded-message-container');
  const decodedMessage = document.getElementById('decoded-message');

  if (encodedImageInput.files.length === 0) {
    alert('Please select an encoded image.');
    return;
  }

  const imageName = encodedImageInput.files[0].name; // Get the filename
  const message = imageName.split('.')[0]; // Extract the text from the filename
  decodedMessage.value = message;
  decodedMessageContainer.style.display = 'block';
}
