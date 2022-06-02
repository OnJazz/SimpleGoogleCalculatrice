import { Component, OnInit } from '@angular/core';
import { CalculRequestService } from '../services/calcul-request.service';

@Component({
  selector: 'app-calculatrice',
  templateUrl: './calculatrice.component.html',
  styleUrls: ['./calculatrice.component.scss']
})
export class CalculatriceComponent implements OnInit {

  txt: string = "0";
  answer: string = "Ans = 4";
  validKey: string[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "*", "/", ".", "Enter", "Backspace"];
  resetButton: string = "CE";
  canAddDot: boolean = true;
  constructor(private calculService: CalculRequestService) { }

  ngOnInit(): void {
  }

  sendRequest = () => {
    this.calculService.getResultFromCalcul(this.txt).subscribe(res => {
      console.log(res)
      this.answer = res;
    });
  }
  /**
   * Return a boolean that valid or not the key pressed
   * @param event a KeyBoardEvent 
   * @returns true when it s a valid key pressed. False otherwise
   */
  checkKeyPress = (event: KeyboardEvent) => {
    let length = this.txt.length;
    let lastChar = this.txt.substring(length - 1);
    if (this.validKey.includes(event.key)) {
      if (event.key == "/") {
        this.addDivision(lastChar, length);
      }
      else if (event.key == "*") {
        this.addMultiplication(lastChar, length);
      }
      else if (event.key == "+") {
        this.addAddition(lastChar, length);
      }
      else if (event.key == "-") {
        this.addSoustraction(lastChar, length);
      }
      else if (event.key == ".") {
        if (lastChar != "." && this.canAddDot) {
          this.txt += event.key;
          this.canAddDot = false;
        }
      }
      else if (event.key == "Enter") {
        this.egalTreatment(lastChar);
      }
      else if (event.key == "Backspace") {
        if (length == 1) this.txt = "0";
        else this.txt = this.txt.substring(0, length - 1);
      }
      else {
        if (this.txt == "0") this.txt = event.key;
        else this.txt += event.key;
      }
      return true;
    }
    else {
      return false
    }
  }
  updateTxtValue = (value: string) => {
    let length = this.txt.length;
    let lastChar = this.txt.substring(length - 1);
    if (value == "=") {
      this.egalTreatment(lastChar);
    }
    else if (value == "-") this.addSoustraction(lastChar, length);
    else if (value == "+") this.addAddition(lastChar, length);
    else if (value == "x") this.addMultiplication(lastChar, length);
    else if (value == "÷") this.addDivision(lastChar, length);
    else if (value == "AC") {
      this.answer = "Ans = " + this.txt;
      this.txt = "0";
      this.resetButton = "CE";
    }
    else if (value == "CE") {
      this.deletePrevious();
    }
    else this.addValue(value);
  }

  deletePrevious = () => {
    if (this.txt != "0") {
      this.txt = this.txt.substring(0, this.txt.length - 1);
      if (this.txt.length == 0) this.txt = "0";
    }
  }
  addValue = (value: string) => {
    if (this.txt == "0") this.txt = value;
    else if (this.resetButton == "AC") {
      this.txt = value;
      this.resetButton = "CE";
    }
    else this.txt += value;
  }


  addDivision = (lastChar: string, length: number) => {
    if (this.resetButton == "AC") this.resetButton = "CE";
    if (lastChar == "x" || lastChar == "+" || lastChar == "-") {
      this.txt = this.txt.substring(0, length - 1);
      this.txt += "÷";
    }
    else if (lastChar != "÷") {
      this.txt += "÷";
      this.canAddDot = true;
    }

  }

  addMultiplication = (lastChar: string, length: number) => {
    if (this.resetButton == "AC") this.resetButton = "CE";
    if (lastChar == "÷" || lastChar == "+" || lastChar == "-") {
      this.txt = this.txt.substring(0, length - 1);
      this.txt += "x";
    }
    else if (lastChar != "x") {
      this.txt += "x";
      this.canAddDot = true;
    }
  }

  addAddition = (lastChar: string, length: number) => {
    if (this.resetButton == "AC") this.resetButton = "CE";
    if (lastChar == "÷" || lastChar == "x" || lastChar == "-") {
      this.txt = this.txt.substring(0, length - 1);
      this.txt += "+";
    }
    else if (lastChar != "+") {
      this.canAddDot = true;
      this.txt += "+";
    }
  }

  addSoustraction = (lastChar: string, length: number) => {
    if (this.resetButton == "AC") this.resetButton = "CE";
    if (lastChar == "÷" || lastChar == "x" || lastChar == "+") {
      this.txt = this.txt.substring(0, length - 1);
      this.txt += "-";
    }
    else if (lastChar != "-") {
      this.canAddDot = true;
      this.txt += "-";
    }
  }

  egalTreatment(lastChar: string) {
    if (!["x", "+", "-", "÷"].includes(lastChar)) {
      this.resetButton = "AC";
      this.sendRequest();
    }
  }
}
