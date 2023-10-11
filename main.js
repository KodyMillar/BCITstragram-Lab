const path = require("path");
/*
 * Project: Milestone 1
 * File Name: main.js
 * Description:
 *
 * Created Date:
 * Author:
 *
 * Phase 1:
 * step 1: read data out of zip file
 * step 2: pipe to transform stream that unzips the file
 * step 3: pipe to writable stream, should end up with three png images
 * Note: recommended to use unzipper, will do a lot of the steps for you
 * 
 * phase 2:
 * step 1: read the extracted folder (fs.readdir, only return png images) - should have a list of png images
 * 
 * Phase 3:
 * step 1: take all images in the list from phase 2 and loop through them
 *      - First image should be in.png
 *      - start reading bytes from this image
 *      - once reading the image, give it to the png decoder
 *      - png decoder is library pngjs
 *      - gives dictionary that has data
 *      - pixels that you can directly modify
 * step 2: inside pngjs, take the byte and average it into greyscale
 * step 3: pipe to a writable stream to a folder called grescaled
 *      - the image inside the folder should be black and white
 * 
 */

const IOhandler = require("./IOhandler");
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");


