import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeskDetailsComponent } from './desk-details.component';

describe('DeskDetailsComponent', () => {
  let component: DeskDetailsComponent;
  let fixture: ComponentFixture<DeskDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeskDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeskDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
