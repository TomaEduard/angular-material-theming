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
  light = 'light_theme',
  dark = 'dark_theme'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  @HostBinding('class')
  className: Theme | null = Theme.light;
  
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
    const darkClassName = Theme.dark;
    const classes = this.overlay.getContainerElement().classList;

    // Se executa o singura data la nivel de root pentru a seta valoarea themei
    var localstorage_cookbook_theme = window.localStorage.getItem('cookbook-theme');
    if (localstorage_cookbook_theme) {
      classes.add(darkClassName);
      this.className = darkClassName;
      this.toggleControl.setValue(true);
    }

    this.toggleControl.valueChanges.subscribe((darkMode) => {
      this.className = darkMode ? darkClassName : null;

      if (darkMode) {
        classes.add(darkClassName);
        window.localStorage.setItem('cookbook-theme', darkClassName);
      } else {
        window.localStorage.removeItem('cookbook-theme');
        classes.remove(darkClassName);
      }
    });
  }

  showDialog(): void {
    this.dialog.open(SimpleDialogComponent, {
      width: '500px',
    });
  }

}
