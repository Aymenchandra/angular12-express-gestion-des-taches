import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifCompteComponent } from './modif-compte.component';

describe('ModifCompteComponent', () => {
  let component: ModifCompteComponent;
  let fixture: ComponentFixture<ModifCompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifCompteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
