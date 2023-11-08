import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { IgxCategoryChartModule } from 'igniteui-angular-charts';
import { ChartViewerComponent } from './chart-viewer.component';

describe('ChartViewerComponent', () => {
  let component: ChartViewerComponent;
  let fixture: ComponentFixture<ChartViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartViewerComponent ],
      imports: [ NoopAnimationsModule, FormsModule, HttpClientTestingModule, IgxCategoryChartModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
