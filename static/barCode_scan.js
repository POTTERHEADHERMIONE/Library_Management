let isScannerRunning = false;

async function startScanner() {
  if (isScannerRunning) {
    console.log("Scanner is already running.");
    return;
  }

  Quagga.init({
    inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.getElementById("scanner"),
        constraints: {
            width:600,
            height: 250
        }
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
    getDetailsFromBarCode(result.codeResult.code);
    stopScanner();
  });
}

function stopScanner() {
  if (isScannerRunning) {
    Quagga.stop();
    isScannerRunning = false;
  } 
}