import { DataService, numOrMap } from "./dataService";
import { FileReader } from "./fileReader";

export class StockManager {

  private dataService: DataService;
  private fileReader: FileReader;


  constructor () {  
    this.dataService = DataService.getInstance();
    this.fileReader = new FileReader();
  }

  public async getStockInfo (file: string, stock: string, date: Date) {
    if (!this.dataService.getFileData() || !this.dataService.getFileData().has(file)) {
      await this.fileReader.readFiles([file]);
    }
    file = this.dataService.getFilename(file).split('.')[0];
    if (this.dataService.getFileData() && this.dataService.getFileData().has(file)) {
      let fileData = await this.dataService.getFileData();
      let stockMap = fileData.get(file) as Map<string, numOrMap>;
  
      if (!stockMap.has(stock)) {
        return null;
      }
      let stockData = stockMap.get(stock) as Map<string, numOrMap>;
  
      let key = this.getKey(date);
      if (!stockData.has(key)) {
        return null;
      }
  
      return stockData.get(key);
    }
  }

  public async getStockValues (file: string, stock: string) {
    if (!this.dataService.getFileData() || !this.dataService.getFileData().has(file)) {
      await this.fileReader.readFiles([file]);
    }
    file = this.dataService.getFilename(file).split('.')[0];
    let fileData = await this.dataService.getFileData();
    let stockMap = fileData.get(file) as Map<string, numOrMap>;

    if (!stockMap.has(stock)) {
      return null;
    }
    let stockData = stockMap.get(stock) as Map<string, numOrMap>;

    return stockData;
  }

  private getKey(date: Date):string {
    let dtStr = new Date(date).toISOString();
    return dtStr.slice(0, 10);
  }

  public async getClosestStockInfo (file: string, stock: string, date: Date) {
 
    // let day = date.split["-"][0];
    let day = date.getDay();
    let reqMon = date.getMonth();
  
    // let reqMon = getMonthNo(date);
    if(day < 15) {
      reqMon = reqMon - 1;
    }
    date.setMonth(reqMon);
    let stockInfo = await this.getStockInfo(file, stock, date);
    return stockInfo;
  
  }

}