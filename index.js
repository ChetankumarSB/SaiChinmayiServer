const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const UserModel = require('./models/Users');
const RcnumberModel = require('./models/Rcnumbers');
const RcnumModel = require('./models/Rcnum');
require("dotenv").config();

var bodyParser = require('body-parser')

app.use(cors());
var bodyParser = require('body-parser');
const { count } = require('./models/Users');
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));


mongoose.connect(
    "mongodb+srv://cyberblackcats:CBCsaichinmayihub@saichinmayicluster.arvtx.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// mongoose.connect(
//     "mongodb+srv://cyberblackcats:CBC123gmail@cluster0.ibqqe.mongodb.net/?retryWrites=true&w=majority",
//     mongodb+srv://cyberblackcats:<password>@saichinmayicluster.arvtx.mongodb.net/test
//   { useNewUrlParser: true, useUnifiedTopology: true }
// );


// const cleanrc = () => {

//     RcnumModel.deleteMany({},(err, result) => {
//         if (err) {
//             console.log(err)
//         } else{
//             console.log(result)
//         }
//     })

//     RcnumberModel.find({}, (err, result) => {
//         if (err) {
//          //    res.send(err);
//          console.log("ErroRRRRRRRRRRR"+err)
//         } else {

//             console.log("hai....")
         
        
//          for (let index = 0; index < result.length; index++) {
//              for (let i = 0; i < result[index].number.length; i++) {
              
                
//                  var rc= (result[index].number[i])
//                 //     // rc= rc.sort();
//                 // console.log(rc);
    

//                  const user = new RcnumModel({ rcnum: rc});
//                   user.save()

//              }
//          }
//         }
//     }
//     )
// }


app.get("/api/v1/app/rcnumber/read", async (req,res) => {

    
    RcnumModel.find({}, (err, result) => {
       if (err) {
           res.send(err);
       } else {
           res.send(result);
       }
   })
})




app.post("/api/v1/rcnumber/post", async (req,res) => {

    const number = req.body.rcNumber;  
    const docName = req.body.docName;
    const docDate = req.body.docDate;

    const user = new RcnumberModel({ number: number, docName: docName, docDate: docDate});
    await user.save()
    .then("hai")

    //cleanrc();
    res.send('Success of rc');

})

app.post("/api/v1/user/addUser", async (req,res) => {

    const name = req.body.name
    const code = req.body.code
    const phoneNumber = req.body.phoneNumber
    const active = true

  
    const user = new UserModel({ name: name, code: code, phoneNumber: phoneNumber, active: active});
    await user.save();
    res.send('Success');

})


app.get("/api/v1/rcnumber/read", async (req,res) => {

    
    RcnumberModel.find({}, (err, result) => {
       if (err) {
           res.send(err);
       } else {
           res.send(result);
       }
   })

})



app.delete("/api/v1/rcnumber/delete/:id", async (req, res) => {
    const id = req.params.id;
    await RcnumberModel.findByIdAndRemove(id).exec();

    //cleanrc();
    res.send("alldeleted");

})

app.delete("/api/v1/user/delete/:id", async (req, res) => {
    const id = req.params.id;
    await UserModel.findByIdAndRemove(id).exec();
    res.send("itemdeleted");
})

app.put("/api/v1/user/update/", async (req, res) => {
    const id = req.body.id;
    const active = req.body.active;
    
       await UserModel.findById(id, (error, userToUpdate) => {
           userToUpdate.active = Boolean(active);
           userToUpdate.save();
       }).clone().catch((error) => {
        console.log(error);
      });
   
    res.send("itemdeleted");
})

app.get("/api/v1/user/read", async (req,res) => {

    
    UserModel.find({}, (err, result) => {
       if (err) {
           res.send(err);
       } else {
           res.send(result);
       }
   })
})
  
let port = process.env.PORT || 8001;

app.listen(port, () => {
    console.log("App is running on port " + port);
});