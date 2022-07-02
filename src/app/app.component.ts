import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SimpleDialogComponent } from './simple-dialog/simple-dialog.component';

interface Food {
  value: string;
  viewValue: string;
}

export enum Theme {
  'light-theme',
  'dark-theme',
  'deep-purple-and-amber',
  'deep-purple-and-amber-dark',
  'purple-green',
  'purple-green-dark',

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  @HostBinding('class')
  className: string | null = Theme[0];
  
  // toolbar
  toggleControl = new FormControl(false);

  // matSelect
  typeList: string[] = ['none', 'info', 'warn', 'success'];
  type: 'success' | 'info' | 'warn' | 'none' = 'success';

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  constructor(
    private dialog: MatDialog, 
    private overlay: OverlayContainer
  ) { }

  ngOnInit(): void {
    const classes = this.overlay.getContainerElement().classList;

    // Se executa o singura data la nivel de root pentru a seta valoarea initiala a themei
    var localstorage_cookbook_theme = window.localStorage.getItem('cookbook-theme');

    const indexOfS = Object.values(Theme).indexOf(localstorage_cookbook_theme as unknown as Theme);
    console.log('indexOfS', indexOfS);

    if (indexOfS && indexOfS > 0) {
      classes.add(Theme[indexOfS]);
      this.className = Theme[indexOfS];
      if (this.className.endsWith('dark')) {
        this.toggleControl.setValue(true);
      }
    }

    // this.toggleControl.valueChanges.subscribe((darkMode) => {
    //   this.className = darkMode ? Theme[1] : null;
    //   console.log('darkMode', darkMode);

    //   if (darkMode) {
    //     classes.add(Theme[0]);
    //     window.localStorage.setItem('cookbook-theme', Theme[0]);
    //     this.toggleControl.setValue(true);
    //   } else {
    //     window.localStorage.removeItem('cookbook-theme');
    //     classes.remove(Theme[1]);
    //     this.toggleControl.setValue(false);
    //   }
    // });
  }

  // 
  // deep-purple-and-amber
  changeTheme(theme: string) {
    const indexOfS = Object.values(Theme).indexOf(theme as unknown as Theme);

		const classList = this.overlay.getContainerElement().classList;
    window.localStorage.setItem('cookbook-theme', theme);
    classList.add(theme);
    this.className = Theme[indexOfS];
  }

  showDialog(): void {
    this.dialog.open(SimpleDialogComponent, {
      width: '500px',
    });
  }

}
