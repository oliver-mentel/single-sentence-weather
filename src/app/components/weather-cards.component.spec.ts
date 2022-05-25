import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherCardsComponent } from './weather-cards.component';

describe('ParentComponent', () => {
  let component: WeatherCardsComponent;
  let fixture: ComponentFixture<WeatherCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
