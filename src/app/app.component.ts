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
    if (window.innerWidth < 600) { // xs is up to 599px
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
    this.isOpen = !this.isOpen;
  }

}
