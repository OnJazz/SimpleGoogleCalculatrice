import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  //get
  it('should return blueBackground when =', () => {
    component.txtButton = "="
    expect(component.getClass()).toBe("blueBackground");
  });
  it('should return greyBackground when txt is an operator', () => {
    component.txtButton = "x"
    expect(component.getClass()).toBe("greyBackground");
    component.txtButton = "+"
    expect(component.getClass()).toBe("greyBackground");
    component.txtButton = "-"
    expect(component.getClass()).toBe("greyBackground");
    component.txtButton = "÷"
    expect(component.getClass()).toBe("greyBackground");
  });
  it('should return empty string when not an operator or equal symbol', () => {
    component.txtButton = "idfj"
    expect(component.getClass()).toBe("");
  });
});
