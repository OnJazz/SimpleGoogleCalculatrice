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

  getClass = (): string => {
    if (this.txtButton == "=") return "blueBackground";
    else if (["x", "÷", "-", "+"].includes(this.txtButton)) return "greyBackground";
    else return "";
  }

  isClicked = () => {
    this.isClickedEvent.emit(this.txtButton);
  }
}
