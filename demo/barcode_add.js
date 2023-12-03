
  let isScannerRunning = false;

  function startScanner() {
    if (isScannerRunning) {
      console.log("Scanner is already running.");
      return;
    }

    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector("#scanner-container"),
      },
      decoder: {
        readers: ["code_128_reader", "ean_reader", "upc_reader"],
      },
    }, function (err) {
      if (err) {
        console.error("Error initializing Quagga: ", err);
        return;
      }
  
      Quagga.start();
      isScannerRunning = true;
    });

    Quagga.onDetected(function (result) {
      const scannedCode = result.codeResult.code;
      console.log("Barcode detected and read: ", scannedCode);
      document.getElementById("barcode-input").value = scannedCode;
      stopScanner();
    });
  }

  function stopScanner() {
    if (isScannerRunning) {
      Quagga.stop();
      isScannerRunning = false;
    } else {
      console.log("Scanner is not running.");
    }
  }