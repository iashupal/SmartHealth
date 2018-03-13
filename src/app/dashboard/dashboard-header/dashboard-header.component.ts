import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { ObservableMedia, MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
})
export class DashboardHeaderComponent {

  @Input() title: string
  @Output() sidenavTogglEvent : EventEmitter<any> = new EventEmitter();

  isMenuVisible: boolean = false;

  constructor(private media: ObservableMedia){
    this.media.subscribe((mediaChange: MediaChange) => {
      this.isMenuVisible = this.getButtonVisibility(mediaChange);
    });
  }

  toggle(){
    this.sidenavTogglEvent.emit(true);
  }

  private getButtonVisibility(mediaChange: MediaChange): boolean {
    // set mode based on a breakpoint
    if (this.media.isActive('lt-md')) {
      return true;
    } else {
      return false;
    }
  }
}
