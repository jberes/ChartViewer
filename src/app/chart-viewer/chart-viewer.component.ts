import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { StockData } from '../models/stocks/stock-data';
import { Stock } from '../models/stocks/stock';
import { StocksService } from '../services/stocks.service';

@Component({
  selector: 'app-chart-viewer',
  templateUrl: './chart-viewer.component.html',
  styleUrls: ['./chart-viewer.component.scss']
})
export class ChartViewerComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public selected_stock?: Stock;
  public stocksStockData: StockData[] = [];

  constructor(
    private stocksService: StocksService,
  ) {}

  ngOnInit() {
    this.stocksService.getStock('UNH').pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => this.selected_stock = data,
      error: (_err: any) => this.selected_stock = undefined
    });
    this.stocksService.getStockDataList().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => this.stocksStockData = data,
      error: (_err: any) => this.stocksStockData = []
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
