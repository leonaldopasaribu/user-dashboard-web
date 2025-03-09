import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { TableColumnHeader } from './table.model';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize columnHeaders to an empty array', () => {
    expect(component.columnHeaders()).toEqual([]);
  });

  it('should accept input values for columnHeaders', () => {
    const mockColumnHeaders: TableColumnHeader[] = [
      { label: 'Column 1' },
      { label: 'Column 2' },
    ];

    fixture.componentRef.setInput('columnHeaders', mockColumnHeaders);
    fixture.detectChanges();

    expect(component.columnHeaders()).toEqual(mockColumnHeaders);
  });
});
