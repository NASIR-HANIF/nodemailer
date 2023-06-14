require("dotenv").config();
// dotenv ko vareable me nahi rakhna hey,
// or config preDefine function hey is ko call karna zarori hey
const http = require("http");
const nodemailer = require("nodemailer");
const fs = require("fs");
 

const email = (templete,response) =>{
    const auth =  nodemailer.createTransport({
        service : "gmail", // servise provider ka name
       auth : {
        user : process.env.EMAIL_ID, // jo send ker raha hey us ka email
        pass : process.env.EMAIL_PASS // google app password
       }
    
    })
    
    const message = {
        from : process.env.EMAIL_ID,  // env vareable 
         to : "hammadakram287@gmail.com",
        subject : "nasir Test ...",
       // text : "i am a message"    // ager text bhajna hey to key text use karen gey
       html : templete,
       attachments : [              // her 1 file ka alag object ho ga
        {
            filename : "abcd.jpg",   // jis name se downlode karwani hey
            content : fs.createReadStream("assets/hammad.jpg")  // bineary data me convert karney ke leye
        },
        {
            filename : "a.pdf",
            content : fs.createReadStream("assets/hammad_document.pdf")
        }

       ]
    }
    auth.sendMail(message,(error,mailRes)=>{
        if(error)
        throw error;
        console.log("success !")
        response.end();
    })
}
const server = http.createServer((request,response)=>{

fs.readFile("templet.html",(error,templete)=>{
email(templete,response)
});

})
server.listen(8080)
