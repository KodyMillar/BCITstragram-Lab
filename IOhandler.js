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
  return new Transform ({ ObjectMode: true, Transform: (chunk, enc, push) => {
    unzipper.Parse(pathIn);
    fileName = chunk.path;
    if (filaName.includes(".png")) {
      chunk.pipe(fs.createWriteStream(pathOut))
        .on("end", push)
    }
  }})
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 * *only include the PNG files, nothing else!*
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 * *only care about greyscale filter (black and white)*
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
