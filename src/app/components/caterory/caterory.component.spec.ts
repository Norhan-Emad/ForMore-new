import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CateroryComponent } from './caterory.component';

describe('CateroryComponent', () => {
  let component: CateroryComponent;
  let fixture: ComponentFixture<CateroryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CateroryComponent]
    });
    fixture = TestBed.createComponent(CateroryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
