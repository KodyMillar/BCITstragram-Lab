/*
 * Project: Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date:
 * Author:
 *
 * 
 * take the lab to the next level - change to filters besides greyscale
 * 
 */

const unzipper = require("unzipper"),
  fs = require("fs"),
  { pipeline } = require("node:stream"),
  PNG = require("pngjs").PNG,
  path = require("path");
  AdmZip = require("adm-zip")

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  // fs.createReadStream(pathIn)
  //   .pipe(unzipper.Extract( {path: pathOut}))
  //   .on("entry", entry => entry.autoDrain())
  //   .promise()
  //   .then(() => console.log("Extraction operation complete"))
  //   .catch((err) => console.log(err));

  return new Promise((resolve, reject) => {
    const zip = new AdmZip(pathIn);
    
    try {
      zip.extractAllTo(pathOut, true);
    }
    catch (err){
      reject(err);
    }

    resolve("Extraction operation complete")
  })
    .then(() => console.log("Extraction operation complete"))
    .catch((err) => console.log(err));
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 * *only include the PNG files, nothing else!*
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(files.filter(file => {
          return path.extname(file) === ".png"
        }))
      }
    })
  })
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 * *only care about greyscale filter (black and white)*
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(pathIn)
      .pipe(
        new PNG({
          filterType: 4
        })
      )
      .on("parsed", function () {
        for (var y = 0; y < this.height; y++) {
          for (var x = 0; x < this.width; x++) {
            var idx = (this.width * y + x) << 2;
  
            var grey = (this.data[idx] + this.data[idx + 1] + this.data[idx + 2]) / 3;
            this.data[idx] = grey;
            this.data[idx + 1] = grey;
            this.data[idx + 2] = grey;
          }
        }
        this.pack().pipe(fs.createWriteStream(pathOut));
        resolve("Conversion to grayscale successful")
      })
      
  })
};


module.exports = {
  unzip,
  readDir,
  grayScale,
};
