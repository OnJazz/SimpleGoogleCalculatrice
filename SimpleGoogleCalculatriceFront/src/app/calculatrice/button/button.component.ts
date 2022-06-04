import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() txtButton: string = "";
  @Output() isClickedEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Add a class to the element depending on the txtButton 
   * @returns a string representing the class added to the element
   */
  getClass = (): string => {
    if (this.txtButton == "=") return "blueBackground";
    else if (["x", "÷", "-", "+"].includes(this.txtButton)) return "greyBackground";
    else return "";
  }

  /**
   * Send to the parent an event with txtbutton value when is cliked on
   */
  isClicked = () => {
    this.isClickedEvent.emit(this.txtButton);
  }
}
