import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adminmoviecard } from './adminmoviecard';

describe('Adminmoviecard', () => {
  let component: Adminmoviecard;
  let fixture: ComponentFixture<Adminmoviecard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Adminmoviecard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Adminmoviecard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
