import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-counter",
  templateUrl: "./counter.component.html",
  styleUrl: "./counter.component.css",
})
export class CounterComponent {
  @Output() addCount = new EventEmitter();
  @Output() reduceCount = new EventEmitter();
  @Input() count = 0;

  onAddCount(): void {
    const count = this.count + 1;
    this.addCount.emit(count);
  }

  onReduceCount(): void {
    if (this.count > 0) {
      const counter = this.count - 1;
      this.reduceCount.emit(counter);
    }
  }
}
