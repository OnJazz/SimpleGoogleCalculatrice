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
  @Output() hasClickedOnResEvent: EventEmitter<string> = new EventEmitter<string>();
  @Input() historyList: HistoryElement[] = [];
  constructor() { }

  ngOnInit(): void {
  }
  sendParentClosePanel() {
    this.closePanelEvent.emit(false);
  }
  hasClickedOnCalc = (calcul: string) => {
    this.hasClickedOnCalcEvent.emit(calcul)
  }
  hasClickedOnRes = (res: string) => {
    this.hasClickedOnResEvent.emit(res);
  }

}
