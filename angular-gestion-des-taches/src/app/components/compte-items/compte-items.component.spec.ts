import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteItemsComponent } from './compte-items.component';

describe('CompteItemsComponent', () => {
  let component: CompteItemsComponent;
  let fixture: ComponentFixture<CompteItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompteItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompteItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
