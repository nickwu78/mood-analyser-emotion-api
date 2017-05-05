// Check various browser versions of getUserMedia
navigator.getUserMedia = (navigator.getUserMedia ||  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia);

// Check browser support     
navigator.getUserMedia(
  {
    video: true
  },

  function handleVideo(localMediaStream) {
  var video = document.getElementById('camera-stream');
  video.src = window.URL.createObjectURL(localMediaStream);
  var dataURL, context, canvas;
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  document.getElementById("capture-button").addEventListener("click", function () {
  context.drawImage(video, 20, 20, 600, 450, 0, 0, 300, 200);
  
  document.getElementById("use-this").addEventListener("click", function () {
    $(".here-you-go").empty()
    $("ul.emotions-result").empty()
    dataURL = canvas.toDataURL("image/png");
    makeblob = function (dataURL) {
                var BASE64_MARKER = ';base64,';
                if (dataURL.indexOf(BASE64_MARKER) == -1) {
                    var parts = dataURL.split(',');
                    var contentType = parts[0].split(':')[1];
                    var raw = decodeURIComponent(parts[1]);
                    return new Blob([raw], {
                        type: contentType
                    });
                }
                var parts = dataURL.split(BASE64_MARKER);
                var contentType = parts[0].split(':')[1];
                var raw = window.atob(parts[1]);
                var rawLength = raw.length;

                var uInt8Array = new Uint8Array(rawLength);

                for (var i = 0; i < rawLength; ++i) {
                    uInt8Array[i] = raw.charCodeAt(i);
                }

                return new Blob([uInt8Array], {
                    type: contentType
                });
            };

  var emotion_api_key = "[YOUR API KEY HERE]";

  $.ajax({
      url: "https://api.projectoxford.ai/emotion/v1.0/recognize",
      beforeSend: function(xhrObj) {
          // Request headers
          xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", emotion_api_key);
      },

      type: "POST",
      // Request body
      data: makeblob(dataURL),
      processData: false,
      success: function(data) {
        var resultLog = data;
        console.log(resultLog)
        var emotions = ["anger", "contempt", "disgust", "fear", "happiness", "neutral", "sadness", "surprise"], emotionResult = $("ul.emotions-result");
        
        $(".here-you-go").text("Emotion Analysis Complete"),
        
        $.each(emotions, function(output){
          var result = $("<li/>").appendTo(emotionResult);
          $("<h2>").text(emotions[output] + " " + 100 * data[0].scores[emotions[output]].toFixed(1) + "%").appendTo(result),
          $("<div>").addClass("emotions-per").text("Raw Score: " + 100 * data[0].scores[emotions[output]]).appendTo(emotionResult)
        });
        var o = data[0].faceRectangle.width,
            r = data[0].faceRectangle.height,
            n = data[0].faceRectangle.top,
            s = data[0].faceRectangle.left;
        $(".face-rectangle").css({
            width: o,
            height: r,
            top: n,
            left: s,
            display: "block"
        })
      }
  })
  .fail(function(data) {
      alert("Code: " + data.responseJSON.error.code + " Message:" +                  data.responseJSON.error.message);
  });
});
});
}, videoError)

function videoError(err) {
  console.log('The following error occurred when trying to use getUserMedia: ' + err);
}