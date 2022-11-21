import express from "express";
import 'express-async-errors';
import myroutes from "./routes/index";
import sharp from "sharp";
import path from "path";
const port = 8080;
const app = express();

//import  querystring  from "querystring";
import url from "url";

//import { promises as fsPromises } from "fs";
//Home page
app.get("/" as string, async (req: express.Request,  res:express.Response) => {
  res.send(
    "<h1 style='text-align:center'>Welcome to Image processing API</h1><br>Please enter in the url details for the image you want to resize <br><ul><li> filename</li><li>width</li> <li>height </li></ul>"
  );
});

//Display image 
app.get("/api"as string, async (req: express.Request,  res:express.Response, next: express.NextFunction)=> {

  try {
    //Get Image details from url
   
    const imgname = req.query.filename as string;
    const imgwidth = Number(req.query.width) ||100;
    const imgheight = Number(req.query.height) ||100;
    //Check img detail
    if (CheckImageDetails(imgname as string ) && 
    CheckImageDetails(req.query.width as string )&&
    CheckImageDetails(req.query.height as string ))
    { 
      //call function to resize image
      sharpresizeImage(imgname as string, imgwidth as number, imgheight as number);
    //Display
    res.sendFile("./output/" + imgname, { root: __dirname });
    }
    
     else
     res.redirect('/error');

  }
  catch (error) {
 
 res.redirect('/error')
 //next(error);
  }
});

app.use("/myroutes", myroutes);
//Adding cash module
app.use('/getCached', require('./routes/getCashed'));
//Start the server
app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});
//check image details
const CheckImageDetails=(strquery:string):boolean=>{
let resultmsg=true;

if (strquery==undefined || strquery=='')resultmsg=false;
else{
 // if (strquery.includes("filename"))resultmsg='please Enter File Name';
  //if (strquery.width=="")resultmsg='please Enter width';
  //if (strquery.height=="")resultmsg='please Enter width';
}
return resultmsg;

}
//Resize image using Sharp
async function sharpresizeImage(
  
  imgname: string,
  imgwidth: number,
  imgheight: number
){
 // let reslt='';
  try {
    await sharp(path.resolve(__dirname)+"/input/" + imgname)
      .resize({
        width: imgwidth  ,
        height: imgheight  ,
      })
      .toFile(path.resolve(__dirname)+"/output/" + imgname);
     // result= 'Conversion Succssed';
  } catch (error) {
    console.log(error);
   // result= 'Conversion Faild';
  }
 // return  result;
}
//catch errorrs
app.get('/error', (req, res) => {
  res.send("Enter valid url.")
})

process.on('unhandledRejection', (reason: Error | any) => {
  console.log(`Unhandled Rejection: ${reason.message || reason}`);

  throw new Error(reason.message || reason);
  //res.redirect('/error')
});

export default {sharpresizeImage,CheckImageDetails};