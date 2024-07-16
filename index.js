function encode() {
    var message = document.getElementById("message").value;
    var imageInput = document.getElementById("image-input").files[0];
  
    if (!message || !imageInput) {
      alert("Please enter a message and select an image.");
      return;
    }
  
    var reader = new FileReader();
    reader.onload = function(e) {
      var image = new Image();
      image.onload = function() {
        var canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
  
        var context = canvas.getContext("2d");
        context.drawImage(image, 0, 0);
        
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        var pixels = imageData.data;
  
        for (var i = 0; i < message.length; i++) {
          pixels[i * 4] = message.charCodeAt(i);
        }
  
        context.putImageData(imageData, 0, 0);
  
        var encodedImage = canvas.toDataURL("image/png");
        document.getElementById("image-container").innerHTML = '<img src="' + encodedImage + '" alt="Encoded Image">';
      };
      image.src = e.target.result;
    };
    reader.readAsDataURL(imageInput);
  }
  
  function decode() {
    var imageInput = document.getElementById("image-input").files[0];
  
    if (!imageInput) {
      alert("Please select an image.");
      return;
    }
  
    var reader = new FileReader();
    reader.onload = function(e) {
      var image = new Image();
      image.onload = function() {
        var canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
  
        var context = canvas.getContext("2d");
        context.drawImage(image, 0, 0);
        
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        var pixels = imageData.data;
  
        var decodedMessage = "";
        for (var i = 0; i < pixels.length; i += 4) {
          var asciiCode = pixels[i];
          if (asciiCode === 0) {
            break;
          }
          decodedMessage += String.fromCharCode(asciiCode);
        }
  
        document.getElementById("decoded-message").textContent = decodedMessage;
      };
      image.src = e.target.result;
    };
    reader.readAsDataURL(imageInput);
  }