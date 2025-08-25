import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMovieCard } from './user-movie-card';

describe('UserMovieCard', () => {
  let component: UserMovieCard;
  let fixture: ComponentFixture<UserMovieCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserMovieCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMovieCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
