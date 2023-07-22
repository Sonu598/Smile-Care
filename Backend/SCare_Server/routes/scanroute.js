const express = require("express");
const scanRouter = express.Router();
const bp = require("body-parser");
const qr = require("qrcode");

scanRouter.use(bp.urlencoded({ extended: false }));
scanRouter.use(bp.json());
scanRouter.post("/qr", (req, res) => {
    const url = req.body.url;

    // If the input is null return "Empty Data" error
    if (url.length === 0) res.send("Empty Data!");
    
    // Let us convert the input stored in the url and return it as a representation of the QR Code image contained in the Data URI(Uniform Resource Identifier)
    // It shall be returned as a png image format
    // In case of an error, it will save the error inside the "err" variable and display it
    
    qr.toDataURL(url, (err, src) => {
        if (err) res.send("Error occured");
      
        // Let us return the QR code image as our response and set it to be the source used in the webpage
        res.render("scan", { src });
    });
});

module.exports ={
    scanRouter
}