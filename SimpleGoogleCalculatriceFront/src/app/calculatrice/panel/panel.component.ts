import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HistoryElement } from 'src/app/beans/historyElement';


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  @Output() closePanelEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() hasClickedOnCalcEvent: EventEmitter<string> = new EventEmitter<string>();
  @Input() historyList: HistoryElement[] = [];
  constructor() { }

  ngOnInit(): void {
  }
  /**
   * Send to the parent an event with a boolean
   */
  sendParentClosePanel() {
    this.closePanelEvent.emit(false);
  }
  /**
   * Send to the parent an event containing the calcul which has been clicked on
   * @param calcul a string representing a calcul
   */
  hasClickedOnCalc = (calcul: string) => {
    this.hasClickedOnCalcEvent.emit(calcul)
  }

}
