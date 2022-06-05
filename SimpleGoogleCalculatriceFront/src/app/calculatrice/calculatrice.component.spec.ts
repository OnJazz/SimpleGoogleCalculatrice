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
  //HasClickedOnHistory
  it('hasClickedOnHistory should reset button to CE', () => {
    component.resetButton = "AC";
    component.hasClickedOnHistory("10+10");
    expect(component.resetButton).toBe("CE");
  });
  it('hasClickedOnHistory should change txt component value', () => {
    component.txt = "45+10";
    component.hasClickedOnHistory("10+10");
    expect(component.txt).toBe("10+10");
  });
  it('hasClickedOnHistory should put display panel to false', () => {
    component.displayPanel = true;
    component.hasClickedOnHistory("10+10");
    expect(component.displayPanel).toBe(false);
  });
  it('hasClickedOnHistory should give focus to the div element', () => {
    component.displayPanel = true;
    component.hasClickedOnHistory("10+10");
    expect(document.getElementById("lowerElement") == document.activeElement).toBe(true);
  });
  it('hasClickedOnHistory should reset to true canAddDot propertie', () => {
    component.canAddDot = false;
    component.hasClickedOnHistory("10+10");
    expect(component.canAddDot).toBe(true);
  });
  it('hasClickedOnHistory should reset to false canAddDot propertie', () => {
    component.canAddDot = true;
    component.hasClickedOnHistory("10+10.");
    expect(component.canAddDot).toBe(false);
  });
  //EgalTreatment
  it('egalTreatment should reset button to AC when lastchar is not an operator', () => {
    component.resetButton = "CE";
    component.egalTreatment("5");
    expect(component.resetButton).toBe("AC");
  });
  it('egalTreatment should not reset button to AC when lastchar is an operator', () => {
    component.resetButton = "CE";
    component.egalTreatment("x");
    expect(component.resetButton).toBe("CE");
  });
  // GiveFocus
  it('giveFocus should give focus to the div element', () => {
    component.displayPanel = true;
    component.giveFocus();
    expect(document.getElementById("lowerElement") == document.activeElement).toBe(true);
  });
  //Push Answer 
  it('pushAnswer should push txt value in anwser when reset button is AC', () => {
    component.resetButton = "AC";
    component.txt = "15";
    component.answer = "";
    component.pushAnswer();
    expect(component.answer).toBe("Ans = 15");
  });
  it('pushAnswer should not push txt value in anwser when reset button is CE', () => {
    component.resetButton = "CE";
    component.txt = "15";
    component.answer = "";
    component.pushAnswer();
    expect(component.answer).toBe("");
  });
  it('pushAnswer should reset button to CE when it is AC', () => {
    component.resetButton = "AC";
    component.txt = "15";
    component.answer = "";
    component.pushAnswer();
    expect(component.resetButton).toBe("CE");
  });

  //AddDot
  it('addDot when 0, lenght 1 and can add dot as false', () => {
    component.canAddDot = false;
    component.addDot("0", 1);
    expect(component.canAddDot).toBe(false);
    expect(component.txt).toBe(".");
  });
  it('addDot when 0, lenght 1 and can add dot as true', () => {
    component.canAddDot = true;
    component.addDot("0", 1);
    expect(component.canAddDot).toBe(false);
    expect(component.txt).toBe(".");
  });
  it('addDot when 0 ,lenght >1 with can add dot as true', () => {
    component.canAddDot = true;
    component.txt = "4740";
    component.addDot("0", 4);
    expect(component.canAddDot).toBe(false);
    expect(component.txt).toBe("4740.");
  });
  it('addDot when 0, lenght >1 but can add dot as false', () => {
    component.canAddDot = false;
    component.txt = "4740";
    component.addDot("0", 4);
    expect(component.canAddDot).toBe(false);
    expect(component.txt).toBe("4740");
  });
  //AddSubstraction
  it('addSubstraction when lastchar is +', () => {
    component.resetButton = "AC";
    component.txt = "45+"
    component.addSubstraction("+", 3);
    expect(component.txt).toBe("45-");
    expect(component.resetButton).toBe("CE");
  });
  it('addSubstraction when lastchar is -', () => {
    component.txt = "45-"
    component.addSubstraction("-", 3);
    expect(component.txt).toBe("45-");
  });
  it('addSubstraction when lastchar is ÷', () => {
    component.txt = "470÷"
    component.addSubstraction("÷", 4);
    expect(component.txt).toBe("470÷-");
  });
  it('addSubstraction when lastchar is x', () => {
    component.txt = "470x"
    component.addSubstraction("x", 4);
    expect(component.txt).toBe("470x-");
  });
  it('addSubstraction when lastchar 0 and lenght 1', () => {
    component.txt = "0"
    component.addSubstraction("0", 1);
    expect(component.txt).toBe("-");
  });
  it('addSubstraction when lastchar 0 and lenght >1', () => {
    component.txt = "470"
    component.addSubstraction("0", 3);
    expect(component.txt).toBe("470-");
  });
  it('addSubstraction when lastchar is .', () => {
    component.txt = "470."
    component.addSubstraction(".", 4);
    expect(component.txt).toBe("470.-");
  });
  it('addSubstraction reset can add dot', () => {
    component.txt = "470."
    component.canAddDot = false;
    component.addSubstraction(".", 4);
    expect(component.canAddDot).toBe(true);
  });
  it('addSubstraction dont reset can add dot when it replace +', () => {
    component.txt = "470.+"
    component.canAddDot = false;
    component.addSubstraction("+", 5);
    expect(component.canAddDot).toBe(false);
  });
  //AddAddition
  it('AddAddition when lastchar is x', () => {
    component.resetButton = "AC";
    component.txt = "45x"
    component.addAddition("x", 3, "5");
    expect(component.txt).toBe("45+");
    expect(component.resetButton).toBe("CE");
  });
  it('AddAddition when lastchar is ÷', () => {
    component.txt = "45÷"
    component.addAddition("÷", 3, "5");
    expect(component.txt).toBe("45+");
  });
  it('AddAddition when lastchar is +', () => {
    component.txt = "45+"
    component.addAddition("+", 3, "5");
    expect(component.txt).toBe("45+");
  });
  it('AddAddition when lastchar is - and twochar before x', () => {
    component.txt = "45x-"
    component.addAddition("-", 4, "x");
    expect(component.txt).toBe("45x-");
  });
  it('AddAddition when lastchar is - and twochar before ÷', () => {
    component.txt = "45÷-"
    component.addAddition("-", 4, "÷");
    expect(component.txt).toBe("45÷-");
  });
  it('AddAddition when lastchar is - and twochar before different than ÷, x', () => {
    component.txt = "45-"
    component.addAddition("-", 3, "5");
    expect(component.txt).toBe("45+");
  });
  it('AddAddition reset can add dot', () => {
    component.txt = "470."
    component.canAddDot = false;
    component.addAddition(".", 4, "0");
    expect(component.canAddDot).toBe(true);
  });
  it('AddAddition dont reset can add dot when it replace operator', () => {
    component.txt = "470.x"
    component.canAddDot = false;
    component.addAddition("x", 5, ".");
    expect(component.canAddDot).toBe(false);
  });
  //AddMultiplication
  it('AddMultiplication when lastchar is ÷', () => {
    component.resetButton = "AC";
    component.txt = "45÷"
    component.addMultiplication("÷", 3, "5");
    expect(component.txt).toBe("45x");
    expect(component.resetButton).toBe("CE");
  });
  it('AddMultiplication when lastchar is +', () => {
    component.txt = "45+"
    component.addMultiplication("+", 3, "5");
    expect(component.txt).toBe("45x");
  });
  it('AddMultiplication when lastchar is x', () => {
    component.txt = "45x"
    component.addMultiplication("x", 3, "5");
    expect(component.txt).toBe("45x");
  });
  it('AddMultiplication when lastchar is - and twochar before x', () => {
    component.txt = "45x-"
    component.addMultiplication("-", 4, "x");
    expect(component.txt).toBe("45x-");
  });
  it('AddMultiplication when lastchar is - and twochar before ÷', () => {
    component.txt = "45÷-"
    component.addMultiplication("-", 4, "÷");
    expect(component.txt).toBe("45÷-");
  });
  it('AddMultiplication when lastchar is - and twochar before different than ÷, x', () => {
    component.txt = "45-"
    component.addMultiplication("-", 3, "5");
    expect(component.txt).toBe("45x");
  });
  it('AddMultiplication reset can add dot', () => {
    component.txt = "470."
    component.canAddDot = false;
    component.addMultiplication(".", 4, "0");
    expect(component.canAddDot).toBe(true);
  });
  it('AddMultiplication dont reset can add dot when it replace operator', () => {
    component.txt = "470.+"
    component.canAddDot = false;
    component.addMultiplication("+", 5, ".");
    expect(component.canAddDot).toBe(false);
  });
  //AddDivision ÷
  it('AddDivision when lastchar is x', () => {
    component.resetButton = "AC";
    component.txt = "45x"
    component.addDivision("x", 3, "5");
    expect(component.txt).toBe("45÷");
    expect(component.resetButton).toBe("CE");
  });
  it('AddDivision when lastchar is ÷', () => {
    component.txt = "45÷"
    component.addDivision("÷", 3, "5");
    expect(component.txt).toBe("45÷");
  });
  it('AddDivision when lastchar is +', () => {
    component.txt = "45+"
    component.addDivision("+", 3, "5");
    expect(component.txt).toBe("45÷");
  });
  it('AddDivision when lastchar is - and twochar before x', () => {
    component.txt = "45x-"
    component.addDivision("-", 4, "x");
    expect(component.txt).toBe("45x-");
  });
  it('AddDivision when lastchar is - and twochar before ÷', () => {
    component.txt = "45÷-"
    component.addDivision("-", 4, "÷");
    expect(component.txt).toBe("45÷-");
  });
  it('AddDivision when lastchar is - and twochar before different than ÷, x', () => {
    component.txt = "45-"
    component.addDivision("-", 3, "5");
    expect(component.txt).toBe("45÷");
  });
  it('AddDivision reset can add dot', () => {
    component.txt = "470."
    component.canAddDot = false;
    component.addDivision(".", 4, "0");
    expect(component.canAddDot).toBe(true);
  });
  it('AddDivision dont reset can add dot when it replace operator', () => {
    component.txt = "470.+"
    component.canAddDot = false;
    component.addDivision("+", 5, ".");
    expect(component.canAddDot).toBe(false);
  });
  //Add Value
  it('AddValue should replace txt by the value when txt is 0 on first calc', () => {
    component.resetButton = "AC";
    component.txt = "0"
    component.isFirstCal = true;
    component.addValue("5");
    expect(component.txt).toBe("5");
  });
  it('AddValue should replace txt by the value when txt is 0 with false as first cal', () => {
    component.resetButton = "AC";
    component.txt = "0"
    component.isFirstCal = false;
    component.addValue("5");
    expect(component.txt).toBe("5");
  });
  it('AddValue should not replace answer with true as first cal', () => {
    component.resetButton = "AC";
    component.txt = "0"
    component.isFirstCal = true;
    component.answer = ""
    component.addValue("5");
    expect(component.answer).toBe("");
  });
  it('AddValue should put false to isFirstCal if it was first calc', () => {
    component.resetButton = "AC";
    component.txt = "0"
    component.isFirstCal = true;
    component.addValue("5");
    expect(component.isFirstCal).toBe(false);
  });
  it('AddValue should reset button to CE when it is AC', () => {
    component.resetButton = "AC";
    component.txt = "0"
    component.isFirstCal = true;
    component.addValue("5");
    expect(component.resetButton).toBe("CE");
  });
  //DeletePrevious
  it('deletePrevious should not delete when txt is 0', () => {
    component.txt = "0"
    component.deletePrevious();
    expect(component.txt).toBe("0");
  });
  it('deletePrevious should put 0 in txt when after deleting size is 0', () => {
    component.txt = "5"
    component.deletePrevious();
    expect(component.txt).toBe("0");
  });
  it('deletePrevious should reset canAddDot boolean to true if deleted char was a dot', () => {
    component.txt = "150."
    component.canAddDot = false;
    component.deletePrevious();
    expect(component.canAddDot).toBe(true);
  });
  //UpdateTxtValue
  it('updateTxtValue should reset txt to 0 when value is AC', () => {
    component.txt = "54";
    component.updateTxtValue("AC");
    expect(component.txt).toBe("0");
  });
  it('updateTxtValue should put in answer the value of txt when value is AC', () => {
    component.txt = "54";
    component.updateTxtValue("AC");
    expect(component.answer).toBe("Ans = 54");
  });
  it('updateTxtValue should reset button to CE when value is AC', () => {
    component.resetButton = "AC";
    component.updateTxtValue("AC");
    expect(component.resetButton).toBe("AC");
  });
  it('updateTxtValue should reset can add dot boolean to true when value is AC', () => {
    component.canAddDot = false;
    component.updateTxtValue("AC");
    expect(component.canAddDot).toBe(true);
  });
  //CheckKeyPress
  it('checkKeyPress should reset txt to 0 when reset button is Ac pressing backsapce key', () => {
    component.txt = "54";
    component.resetButton = "AC";
    let keyEvent: KeyboardEvent = new KeyboardEvent("keydown");
    Object.defineProperty(keyEvent, 'key', { get: () => "Backspace" });
    component.checkKeyPress(keyEvent);
    expect(component.txt).toBe("0");
  });
  it('checkKeyPress should reset can add dot when it delete a dot', () => {
    component.txt = "54.";
    component.resetButton = "CE";
    component.canAddDot = false;
    let keyEvent: KeyboardEvent = new KeyboardEvent("keydown");
    Object.defineProperty(keyEvent, 'key', { get: () => "Backspace" });
    component.checkKeyPress(keyEvent);
    expect(component.canAddDot).toBe(true);
  });
  it('checkKeyPress should reset can add dot when it delete with AC reset button', () => {
    component.txt = "54.";
    component.resetButton = "AC";
    component.canAddDot = false;
    let keyEvent: KeyboardEvent = new KeyboardEvent("keydown");
    Object.defineProperty(keyEvent, 'key', { get: () => "Backspace" });
    component.checkKeyPress(keyEvent);
    expect(component.canAddDot).toBe(true);
  });
  it('checkKeyPress should delete lastchar when CE button and lenght >1', () => {
    component.txt = "5469";
    component.resetButton = "CE";
    let keyEvent: KeyboardEvent = new KeyboardEvent("keydown");
    Object.defineProperty(keyEvent, 'key', { get: () => "Backspace" });
    component.checkKeyPress(keyEvent);
    expect(component.txt).toBe("546");
  });
});
