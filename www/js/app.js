
        function openCamera(text) { 
            if(text == "scan"){
                console.log('yo got that right')
            }
                console.log('hello');
               cordova.plugins.barcodeScanner.scan(
                    function (result) {
                        alert("We got a barcode\n" +
                              "Result: " + result.text + "\n" +
                              "Format: " + result.format + "\n" +
                              "Cancelled: " + result.cancelled);
                            getJsonData(result.text);
                            
                    },
                    function (error) {
                        alert("Scanning failed: " + error);
                    },
                    {
                        preferFrontCamera : true, // iOS and Android
                        showFlipCameraButton : true, // iOS and Android
                        showTorchButton : true, // iOS and Android
                        torchOn: true, // Android, launch with the torch switched on (if available)
                        saveHistory: true, // Android, save scan history (default false)
                        prompt : "Place a barcode inside the scan area", // Android
                        resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                        formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
                        orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
                        disableAnimations : true, // iOS
                        disableSuccessBeep: false // iOS and Android
                    }
                 );
               
        }
    
    $('#openCamera').on('touchstart', function() { 
        openCamera();
    });

  function getJsonData(codeBare){
    var cardSelector = $("#card"); 
    // https://world.openfoodfacts.org/api/v0/product/7622210449283.json
     
    $("#card *:not(div)").remove();
    //https://world.openfoodfacts.org/api/v0/product/7622210449283.json?fields=product_name,quantity
    $.getJSON("https://world.openfoodfacts.org/api/v0/product/" + codeBare+".json?fields=product_name,quantity,ingredients_text,image_url", 
    function(result) { 
    var codeBAR = result.code; 
    var quantite = result.product["ingredients_text"];
    var image = result.product["image_url"];


    cardSelector.append('<form>');
    cardSelector.append("<ul><li>Code bar :<b> " + codeBAR + "</b></li>");
    cardSelector.append("<ul><li>Qantité :<b> " + quantite + "</b></li>");
    cardSelector.append("<ul><li>Image :<br><img src='"+ image +"' alt='Weather Icon' width='80px' height='80px'></li>");
    cardSelector.append('<a class="waves-effect waves-light btn" style="margin: 0px;" href="/informations.html" id="showMore">Voir plus</a>');
    cardSelector.append('</form>')
});


  }


  function findProduct(){
    var myValue = $('input').val(); 
    $("#card *:not(div)").remove();
    // https://world.openfoodfacts.org/category/pizzas.json?fields=product_name
    $.getJSON("https://world.openfoodfacts.org/api/v0/category/" + myValue + ".json?fields=product_name", 
    function(result) { 
    var codeBAR = result.code; 
    var quantite = result.product["ingredients_text"];
    var image = result.product["image_url"];


    cardSelector.append('<form>');
    cardSelector.append("<ul><li>Code bar :<b> " + codeBAR + "</b></li>");
    // cardSelector.append("<ul><li>Qantité :<b> " + quantite + "</b></li>");
    // cardSelector.append("<ul><li>Image :<br><img src='"+ image +"' alt='Weather Icon' width='80px' height='80px'></li>");
    cardSelector.append('</form>')
});



}