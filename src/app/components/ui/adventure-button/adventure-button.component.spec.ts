import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventureButtonComponent } from './adventure-button.component';

describe('AdventureButtonComponent', () => {
  let component: AdventureButtonComponent;
  let fixture: ComponentFixture<AdventureButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdventureButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdventureButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
