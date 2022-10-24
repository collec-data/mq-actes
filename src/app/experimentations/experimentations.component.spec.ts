import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentationsComponent } from './experimentations.component';

describe('ExperimentationsComponent', () => {
  let component: ExperimentationsComponent;
  let fixture: ComponentFixture<ExperimentationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperimentationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperimentationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
