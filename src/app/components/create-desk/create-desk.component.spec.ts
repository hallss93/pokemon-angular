import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDeskComponent } from './create-desk.component';

describe('CreateDeskComponent', () => {
  let component: CreateDeskComponent;
  let fixture: ComponentFixture<CreateDeskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDeskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateDeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
