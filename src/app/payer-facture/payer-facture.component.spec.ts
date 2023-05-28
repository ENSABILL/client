import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayerFactureComponent } from './payer-facture.component';

describe('PayerFactureComponent', () => {
  let component: PayerFactureComponent;
  let fixture: ComponentFixture<PayerFactureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayerFactureComponent]
    });
    fixture = TestBed.createComponent(PayerFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
