import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stock } from '../models/stocks/stock';
import { StockData } from '../models/stocks/stock-data';

const API_ENDPOINT = 'https://fintechcloud.azurewebsites.net';

@Injectable({
  providedIn: 'root'
})
export class StocksService {
  constructor(
    private http: HttpClient
  ) { }

  public getStock(symbol: string = 'UNH'): Observable<Stock> {
    return this.http.get<Stock>(`${API_ENDPOINT}/stocks/${symbol}`);
  }

  public getStockDataList(): Observable<StockData[]> {
    return this.http.get<StockData[]>(`${API_ENDPOINT}/stockpricestemp`);
  }
}
