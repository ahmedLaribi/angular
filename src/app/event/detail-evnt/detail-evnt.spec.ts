import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEvnt } from './detail-evnt';

describe('DetailEvnt', () => {
  let component: DetailEvnt;
  let fixture: ComponentFixture<DetailEvnt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailEvnt],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailEvnt);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
