import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventureStepComponent } from './adventure-step.component';

describe('AdventureStepComponent', () => {
  let component: AdventureStepComponent;
  let fixture: ComponentFixture<AdventureStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdventureStepComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdventureStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
