export type numOrMap = number | Map<string, numOrMap>;

export class DataService {

  private fileData: Map<string, numOrMap>;
  private stockMap: Map<string, numOrMap>;
  public static instance: DataService;

  private constructor() {
  }

  public static getInstance(): DataService {
    if(!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }
  
  public getFileData() {
    return this.fileData;
  }
  
  public processData (headerRow: Array<string>, row: Array<string>) {

    let scale:number = Number.parseFloat(row[1]);
    let stockValueMap = new Map<string, number>();
    for(let i = 2; i < row.length; i++) {
      stockValueMap.set(headerRow[i], (Number.parseFloat(row[i]) * scale));
    }

    if(!this.stockMap) {
      this.stockMap = new Map<string, numOrMap>();
    }
    
    let stockName = row[0];
    this.stockMap.set(stockName, stockValueMap);
    
  }

  public processFileMap(file: string) {
    
    let fileName = this.getFilename(file).split('.')[0];

    if(!this.fileData) {
      this.fileData = new Map<string, numOrMap>();
    }

    this.fileData.set(fileName, this.stockMap);
    this.stockMap.delete;
  }

  public getFilename(fullPath: string) {
    return fullPath.replace(/^.*[\\\/]/, '');
  }

}

