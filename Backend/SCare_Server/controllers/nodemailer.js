const nodemailer=require("nodemailer");

let transporter= nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"smilecare.operation@gmail.com",
        pass:"plyrofexnvxtkhqp"
    }

});

module.exports={transporter};