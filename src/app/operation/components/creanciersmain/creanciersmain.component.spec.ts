import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreanciersMainComponent } from './creanciersmain.component';

describe('CreanciersMainComponent', () => {
  let component: CreanciersMainComponent;
  let fixture: ComponentFixture<CreanciersMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreanciersMainComponent]
    });
    fixture = TestBed.createComponent(CreanciersMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
