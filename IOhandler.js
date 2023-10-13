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
  PNG = require("pngjs").PNG,
  path = require("path");

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  // return new Transform ({ ObjectMode: true, Transform: (chunk, enc, push) => {
  //   unzipper.Parse(pathIn);
  //   fileName = chunk.path;
  //   if (filaName.includes(".png")) {
  //     chunk.pipe(fs.createWriteStream(pathOut))
  //       .on("end", push)
  //   }
  // }})

  // unzipper.ParseOne(pathIn)
  //   .pipe(fs.createWriteStream(pathOut));

  fs.createReadStream(pathIn)
    .pipe(unzipper.Extract( {path: pathOut}))
    .on("entry", entry => entry.autoDrain())
    .promise()
    .then(() => console.log("Extraction operation complete"))
    .catch((err) => console.log(err));
};
// const unzipped = path.join(__dirname, "unzipped")
// const zipFilePath = path.join(__dirname, "myfile.zip");
// unzip(zipFilePath, unzipped)

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
    })
};


// greyscale = path.join(__dirname, "test", "in2.png");
// console.log(greyscale)
// grayScale(greyscale, "out2.png");


module.exports = {
  unzip,
  readDir,
  // grayScale,
};
