const path = require("path");
/*
 * Project: Milestone 1
 * File Name: main.js
 * Description: Run the functions from IOhandler
 *
 * Created Date: October 17, 2023
 * Author: Kody Millar
 * 
 */

const IOhandler = require("./IOhandler");
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");

IOhandler.unzip(zipFilePath, pathUnzipped)
    .then(() => IOhandler.readDir(pathUnzipped))
    .then((files) => { files.forEach((file) => {
        IOhandler.grayScale(path.join(pathUnzipped, file), path.join(pathProcessed, file.replace("in", "greyscale")))
        .catch(err => console.log(err)) 
      })
      return "Conversion to Grayscale Successful"
    })
    .then(msg => console.log(msg))
    .catch(err => console.log(err));
