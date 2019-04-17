import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixBadgeComponent } from './matrix-badge.component';

describe('MatrixBadgeComponent', () => {
  let component: MatrixBadgeComponent;
  let fixture: ComponentFixture<MatrixBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrixBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
