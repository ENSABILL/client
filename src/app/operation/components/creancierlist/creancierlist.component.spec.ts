import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreancierlistComponent } from './creancierlist.component';

describe('CreancierlistComponent', () => {
  let component: CreancierlistComponent;
  let fixture: ComponentFixture<CreancierlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreancierlistComponent]
    });
    fixture = TestBed.createComponent(CreancierlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
