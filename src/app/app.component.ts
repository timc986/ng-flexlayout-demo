import { Component } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isOpen = true;
  private isOpenByClick = true;
  private isOpenByAuto = true;
  private mediaSubscription;

  constructor(public mediaObserver: MediaObserver) {

    // xs is up to 599px
    if (window.innerWidth < 600) {
      this.isOpen = false;
    }

    this.mediaSubscription = mediaObserver.asObservable().subscribe(changes => {
      // console.log(changes.map(c => c.mqAlias));
      this.isOpenByAuto = (changes[0].mqAlias !== 'xs');

      if (this.isOpenByClick) {
        this.isOpen = this.isOpenByAuto;
      }
    });
  }

  ngOnDestroy() {
    this.mediaSubscription.unsubscribe();
  }

  toggleSideNav() {
    this.isOpenByClick = !this.isOpenByClick;
    this.isOpen = this.isOpenByClick;
  }

}
