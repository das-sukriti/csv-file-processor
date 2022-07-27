
import { StockManager } from "./stockManager";

let stockManager = new StockManager();

//Q1: Return the value of the entry in row "MO_BS_INV" and with a start date of 2014-10-01 in file "MNZIRS0108.csv"
//2053000000
stockManager.getStockInfo('./Data files/MNZIRS0108.csv', 'MO_BS_INV', new Date('2014-10-01')).then((result) => {
  console.log("Q1) Stp" + result);
});

//Q2: Return the mean of row "MO_BS_AP" in file "Y1HZ7B0146.csv"
//Mean: 5,72,49,28,571.428571
stockManager.getStockValues('./Data files/Y1HZ7B0146.csv', 'MO_BS_AP').then((result) => {
  let sum:number = 0;
  result.forEach(value => {
    sum = sum + Number.parseFloat(value.toString());
  })
  console.log("Q2) Mean is: " + sum/result.size);
});

