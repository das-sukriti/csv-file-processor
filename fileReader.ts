import { DataService, numOrMap } from "./dataService";

const fs = require("fs");
const { parse } = require("csv-parse");

export class FileReader {

  private isHeaderRow:boolean = true;
  private headerRow: any;
  private dataService: DataService;

  constructor () {
    this.isHeaderRow = true;
    this.headerRow = [];    
    this.dataService = DataService.getInstance();
  }

  public readFile(file) { 
    let that = this;
    return new Promise((resolve, reject) => {
      fs.createReadStream(file)
        .pipe(parse({ delimiter: "," }))
        .on("data", function (row) {
    
          if (that.isHeaderRow === true) {
            that.headerRow = row;
            that.isHeaderRow = false;
          }
          else {
            that.dataService.processData(that.headerRow, row);
          }
        })
        .on("end", function () {    
          that.dataService.processFileMap(file);    
          resolve('done');
        })
        .on("error", function (error) {
          console.log(error.message);
          reject(error);
        });
    });
  };
  
  public async readFiles (files: string[]) {
    for (let file of files) {
      await this.readFile(file);
    }
  };
}