import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatriceComponent } from './calculatrice.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CalculatriceComponent', () => {
  let component: CalculatriceComponent;
  let fixture: ComponentFixture<CalculatriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CalculatriceComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  //resetCanAddDot
  it('resetCanAddDot when no operator', () => {
    component.canAddDot = false;
    component.resetCanAddDot("0.2");
    expect(component.canAddDot).toBe(false);
  });
  it('resetCanAddDot when empty', () => {
    component.canAddDot = false;
    component.resetCanAddDot("");
    expect(component.canAddDot).toBe(true);
  });
  it('resetCanAddDot when operator after dot', () => {
    component.canAddDot = false;
    component.resetCanAddDot("0.2+2");
    expect(component.canAddDot).toBe(true);
  });
});
