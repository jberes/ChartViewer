import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Stock } from '../models/stocks/stock';
import { StockData } from '../models/stocks/stock-data';
import { StocksService } from '../services/stocks.service';
import { Context } from '@finos/fdc3';

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
    private cdr: ChangeDetectorRef
  ) {
    this.cdr = cdr;
  }

  ngOnInit() {
    if (window.fdc3) {
      const handler = (context: Context) => this.contextHandler(context);
      window.fdc3.addContextListener(null, handler);
      window.fdc3.addIntentListener('ViewChart', handler);
    } else {
      console.error('Error: fdc3 is not available.');
    }
    this.getItem('UNH');
  }

  contextHandler(ctx: Context) {
    if (ctx.type === 'fdc3.instrument') {
      this.getItem(ctx.id?.stock);
    }
  }

  getItem(value: string) {
    console.log(value);
    this.stocksService.getStock(value).pipe(takeUntil(this.destroy$)).subscribe({
      next: (stock: Stock) => {
        this.selected_stock = stock;
        const { company_name, stock_symbol, avg_volume, previous_close } = stock;
        this.stocksService.getPriceHistory(previous_close, avg_volume).pipe(takeUntil(this.destroy$)).subscribe({
          next: (data: StockData[]) => {
            this.stocksStockData = data;
            (this.stocksStockData as any).__dataIntents = { close: [`SeriesTitle/${company_name} (${stock_symbol})`] };
            this.cdr.detectChanges();
          },
          error: () => this.stocksStockData = []
        });
      },
      error: () => this.selected_stock = undefined
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
