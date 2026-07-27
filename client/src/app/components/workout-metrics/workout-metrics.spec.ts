import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutMetrics } from './workout-metrics';

describe('WorkoutMetrics', () => {
  let component: WorkoutMetrics;
  let fixture: ComponentFixture<WorkoutMetrics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutMetrics],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutMetrics);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
