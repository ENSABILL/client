import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QstAnswerComponent } from './qst-answer.component';

describe('QstAnswerComponent', () => {
  let component: QstAnswerComponent;
  let fixture: ComponentFixture<QstAnswerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QstAnswerComponent]
    });
    fixture = TestBed.createComponent(QstAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
