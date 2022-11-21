"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const index_1 = __importDefault(require("./routes/index"));
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const port = 8080;
const app = (0, express_1.default)();
//import { promises as fsPromises } from "fs";
//Home page
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("<h1 style='text-align:center'>Welcome to Image processing API</h1><br>Please enter in the url details for the image you want to resize <br><ul><li> filename</li><li>width</li> <li>height </li></ul>");
}));
//Display image 
app.get("/api", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Get Image details from url
        const imgname = req.query.filename;
        const imgwidth = Number(req.query.width) || 100;
        const imgheight = Number(req.query.height) || 100;
        //Check img detail
        if (CheckImageDetails(imgname) &&
            CheckImageDetails(req.query.width) &&
            CheckImageDetails(req.query.height)) {
            //call function to resize image
            sharpresizeImage(imgname, imgwidth, imgheight);
            //Display
            res.sendFile("./output/" + imgname, { root: __dirname });
        }
        else
            res.redirect('/error');
    }
    catch (error) {
        res.redirect('/error');
        //next(error);
    }
}));
app.use("/myroutes", index_1.default);
//Adding cash module
app.use('/getCached', require('./routes/getCashed'));
//Start the server
app.listen(port, () => {
    console.log(`server started at localhost:${port}`);
});
//check image details
const CheckImageDetails = (strquery) => {
    let resultmsg = true;
    if (strquery == undefined || strquery == '')
        resultmsg = false;
    else {
        // if (strquery.includes("filename"))resultmsg='please Enter File Name';
        //if (strquery.width=="")resultmsg='please Enter width';
        //if (strquery.height=="")resultmsg='please Enter width';
    }
    return resultmsg;
};
//Resize image using Sharp
function sharpresizeImage(imgname, imgwidth, imgheight) {
    return __awaiter(this, void 0, void 0, function* () {
        // let reslt='';
        try {
            yield (0, sharp_1.default)(path_1.default.resolve(__dirname) + "/input/" + imgname)
                .resize({
                width: imgwidth,
                height: imgheight,
            })
                .toFile(path_1.default.resolve(__dirname) + "/output/" + imgname);
            // result= 'Conversion Succssed';
        }
        catch (error) {
            console.log(error);
            // result= 'Conversion Faild';
        }
        // return  result;
    });
}
//catch errorrs
app.get('/error', (req, res) => {
    res.send("Enter valid url.");
});
process.on('unhandledRejection', (reason) => {
    console.log(`Unhandled Rejection: ${reason.message || reason}`);
    throw new Error(reason.message || reason);
    //res.redirect('/error')
});
exports.default = { sharpresizeImage, CheckImageDetails };
