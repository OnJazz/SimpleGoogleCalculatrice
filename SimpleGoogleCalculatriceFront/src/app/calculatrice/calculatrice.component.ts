import { Component, OnInit } from '@angular/core';
import { HistoryElement } from '../beans/historyElement';
import { CalculRequestService } from '../services/calcul-request.service';

@Component({
  selector: 'app-calculatrice',
  templateUrl: './calculatrice.component.html',
  styleUrls: ['./calculatrice.component.scss']
})
export class CalculatriceComponent implements OnInit {

  txt: string = "0";
  answer: string = "";
  validKey: string[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "*", "/", ".", "Enter", "Backspace"];
  resetButton: string = "CE";
  canAddDot: boolean = true;
  displayPanel = false;
  historyList: HistoryElement[] = [];
  constructor(private calculService: CalculRequestService) { }

  ngOnInit(): void {
  }

  /**
   * Send the calcul as a string to the back.
   * Get Back result then push it to history
   */
  sendRequest = () => {
    this.calculService.getResultFromCalcul(this.txt).subscribe(res => {
      console.log(res)
      this.historyList.push({ calcul: this.txt, res: res });
      this.answer = this.txt + " =";
      this.txt = res;
      this.resetCanAddDot(res);
    });
  }

  /**
   * Return a boolean that valid or not the key pressed
   * Depending the valid key pressed it does add (soustraction/division/multiplication/addition/deletePrevious/Enter)
   * @param event a KeyBoardEvent 
   * @returns true when it s a valid key pressed. False otherwise
   */
  checkKeyPress = (event: KeyboardEvent) => {
    let length = this.txt.length;
    let twoCharBefore = this.txt.substring(length - 2, length - 1);
    let lastChar = this.txt.substring(length - 1);
    if (this.validKey.includes(event.key)) {
      if (event.key == "/") {
        this.addDivision(lastChar, length, twoCharBefore);
      }
      else if (event.key == "*") {
        this.addMultiplication(lastChar, length, twoCharBefore);
      }
      else if (event.key == "+") {
        this.addAddition(lastChar, length, twoCharBefore);
      }
      else if (event.key == "-") {
        this.addSubstraction(lastChar, length);
      }
      else if (event.key == ".") {
        this.addDot(lastChar, length);
      }
      else if (event.key == "Enter") {
        this.egalTreatment(lastChar);
      }
      else if (event.key == "Backspace") {
        let lastChar = this.txt[this.txt.length - 1];
        if (lastChar == ".") this.canAddDot = true;
        if (length == 1 || this.resetButton == "AC") {
          this.txt = "0";
          this.canAddDot = true;
        }
        else this.txt = this.txt.substring(0, length - 1);
      }
      else {
        this.addValue(event.key);
      }
      return true;
    }
    else {
      return false
    }
  }
  /**
   * Depending the button pressed it does add the action requested (soustraction/division/multiplication/addition/deletePrevious/Enter)
   * @param value a string representing the value pressed by the button (ex: "+"/"-"....)
   */
  updateTxtValue = (value: string) => {
    let length = this.txt.length;
    let twoCharBefore = this.txt.substring(length - 2, length - 1);
    let lastChar = this.txt.substring(length - 1);
    if (value == "=") {
      this.egalTreatment(lastChar);
    }
    else if (value == "-") {
      this.pushAnswer();
      this.addSubstraction(lastChar, length);
    }
    else if (value == "+") {
      this.pushAnswer();
      this.addAddition(lastChar, length, twoCharBefore);
    }
    else if (value == "x") {
      this.pushAnswer();
      this.addMultiplication(lastChar, length, twoCharBefore);
    }
    else if (value == "÷") {
      this.pushAnswer();
      this.addDivision(lastChar, length, twoCharBefore);
    }
    else if (value == ".") {
      this.pushAnswer();
      this.addDot(lastChar, length);
    }
    else if (value == "AC") {
      this.answer = "Ans = " + this.txt;
      this.txt = "0";
      this.resetButton = "CE";
      this.canAddDot = true;
    }
    else if (value == "CE") {
      this.deletePrevious();
    }
    else this.addValue(value);
    this.giveFocus();
  }

  /**
   * Delete previous char
   */
  deletePrevious = () => {
    if (this.txt != "0") {
      let lastChar = this.txt[this.txt.length - 1];
      this.txt = this.txt.substring(0, this.txt.length - 1);
      if (this.txt.length == 0) this.txt = "0";
      if (lastChar == ".") this.canAddDot = true;
    }
  }
  /**
   * Depending of resetbutton, as AC it replace the value.
   * Otherwise it add the value to the calcul as string.
   * @param value a value to add into the calcul as string. Depending valid key it should be (0... 9)
   */
  addValue = (value: string) => {
    if (this.txt == "0") {
      this.txt = value;
      this.resetButton = "CE";
    }
    else if (this.resetButton == "AC") {
      this.answer = "Answ = " + this.txt;
      this.txt = value;
      this.resetButton = "CE";
      this.canAddDot = true;
    }
    else this.txt += value;
  }

  /**
   * Add division symbol to the calcul as string
   * @param lastChar a string, the last char of the calcul as string
   * @param length a number, lenght of the calcul as string 
   * @param twoCharBefore a string, the char before last char of the calcul as string 
   */
  addDivision = (lastChar: string, length: number, twoCharBefore: string) => {
    if (this.resetButton == "AC") this.resetButton = "CE";
    if ((lastChar == "x" || lastChar == "+") || ((lastChar == "-") && twoCharBefore != "x" && twoCharBefore != "÷")) {
      this.txt = this.txt.substring(0, length - 1);
      this.txt += "÷";
    }
    else if (lastChar != "÷" && twoCharBefore != "x" && twoCharBefore != "÷") {
      this.txt += "÷";
      this.canAddDot = true;
    }

  }

  /**
   * Add multiplication symbol to the calcul as string
   * @param lastChar a string, the last char of the calcul as string
   * @param length a number, lenght of the calcul as string 
   * @param twoCharBefore a string, the char before last char of the calcul as string 
   */
  addMultiplication = (lastChar: string, length: number, twoCharBefore: string) => {
    if (this.resetButton == "AC") this.resetButton = "CE";
    if ((lastChar == "÷" || lastChar == "+") || ((lastChar == "-") && twoCharBefore != "x" && twoCharBefore != "÷")) {
      this.txt = this.txt.substring(0, length - 1);
      this.txt += "x";
    }
    else if (lastChar != "x" && twoCharBefore != "x" && twoCharBefore != "÷") {
      this.txt += "x";
      this.canAddDot = true;
    }
  }

  /**
   * Add addition symbol to the calcul as string
   * @param lastChar a string, the last char of the calcul as string
   * @param length a number, lenght of the calcul as string 
   * @param twoCharBefore a string, the char before last char of the calcul as string 
   */
  addAddition = (lastChar: string, length: number, twoCharBefore: string) => {
    if (this.resetButton == "AC") this.resetButton = "CE";
    if ((lastChar == "÷" || lastChar == "x") || ((lastChar == "-") && twoCharBefore != "x" && twoCharBefore != "÷")) {
      this.txt = this.txt.substring(0, length - 1);
      this.txt += "+";
    }
    else if (lastChar != "+" && twoCharBefore != "x" && twoCharBefore != "÷") {
      this.canAddDot = true;
      this.txt += "+";
    }
  }

  /**
   * Add substraction symbol to the calcul as string
   * @param lastChar a string, the last char of the calcul as string
   * @param length a number, lenght of the calcul as string 
   * @param twoCharBefore a string, the char before last char of the calcul as string 
   */
  addSubstraction = (lastChar: string, length: number) => {
    if (this.resetButton == "AC") this.resetButton = "CE";
    if (lastChar == "+") {
      this.txt = this.txt.substring(0, length - 1);
      this.txt += "-";
    }
    else if (lastChar == "0" && length == 1) this.txt = "-";
    else if (lastChar != "-") {
      this.canAddDot = true;
      this.txt += "-";
    }
  }

  /**
   * Give the focus on the div element with id Lowerelement.
   * Usefull to press keybutton from keyboard reacting with div input
   */
  giveFocus = () => {
    document.getElementById("lowerElement")?.focus();
  }

  /**
   * Rename the answer into: "Ans =" + preivous res
   */
  pushAnswer() {
    if (this.resetButton == "AC") {
      this.answer = "Ans = " + this.txt;
      this.resetButton = "CE";
    }
  }

  /**
   * Add dot symbol to the calcul as string
   * @param lastChar a string, the last char of the calcul as string
   * @param length a number, lenght of the calcul as string 
   */
  addDot(lastChar: string, length: number) {
    if ((length == 1 && lastChar == "0") || (this.resetButton == "AC")) {
      this.resetButton = "CE";
      this.canAddDot = false;
      this.txt = ".";
    }
    if (lastChar != "." && this.canAddDot) {
      this.resetButton = "CE";
      this.txt += ".";
      this.canAddDot = false;
    }
  }

  /**
   * Check if we can request the back, it means that last char is valid (different then an operator)
   * @param lastChar a string, the last char of the calcul as string
   */
  egalTreatment(lastChar: string) {
    if (!["x", "+", "-", "÷"].includes(lastChar)) {
      this.resetButton = "AC";
      this.sendRequest();
    }
  }
  /**
   * User has clicked on history element.
   * Then it replace the calcul string by the clicked element
   * @param clickedElement 
   */
  hasClickedOnHistory = (clickedElement: string) => {
    this.resetCanAddDot(clickedElement);
    this.txt = clickedElement;
    this.resetButton = "CE"
    this.displayPanel = false;
    this.giveFocus();

  }

  /**
   * Reset the can Add dot boolean depending on the calcul as string passed as parameter
   * @param clickedElement calcul as string
   */
  resetCanAddDot(clickedElement: string) {
    if (clickedElement.includes(".")) {
      let splittedCacl = clickedElement.split(".")[clickedElement.split(".").length - 1];
      if (splittedCacl.includes("x") || splittedCacl.includes("-") || splittedCacl.includes("+") || splittedCacl.includes("÷")) {
        this.canAddDot = true;
      }
      else this.canAddDot = false;
    }
    else this.canAddDot = true;
  }
}
