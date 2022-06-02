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
    console.log(event)
    if (this.validKey.includes(event.key)) {
      if (event.key == "/") {
        if (lastChar == "x" || lastChar == "+" || lastChar == "-") {
          this.txt = this.txt.substring(0, length - 1);
          this.txt += "÷";
        }
        else if (lastChar != "÷") this.txt += "÷";
      }
      else if (event.key == "*") {
        if (lastChar == "÷" || lastChar == "+" || lastChar == "-") {
          this.txt = this.txt.substring(0, length - 1);
          this.txt += "x";
        }
        else if (lastChar != "x") this.txt += "x";
      }
      else if (event.key == "+") {
        if (lastChar == "÷" || lastChar == "x" || lastChar == "-") {
          this.txt = this.txt.substring(0, length - 1);
          this.txt += event.key;
        }
        else if (lastChar != event.key) this.txt += event.key;
      }
      else if (event.key == "-") {
        if (lastChar == "÷" || lastChar == "x" || lastChar == "+") {
          this.txt = this.txt.substring(0, length - 1);
          this.txt += event.key;
        }
        else if (lastChar != event.key) this.txt += event.key
      }
      else if (event.key == "Enter") this.sendRequest();
      else if (event.key == "Backspace") console.log(this.txt);
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
    if (value == "=") {
      this.resetButton = "AC";
      this.sendRequest();
    }
    if (value == "AC") {
      this.answer = "Ans = " + this.txt;
      this.txt = "0";
      this.resetButton = "CE";
    }
    if (value == "CE") {
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
    else this.txt += value;
  }

}
