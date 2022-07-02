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
  'theme',
  'deep-purple-and-amber',
  'purple-green',
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
  darkTheme: boolean = false;

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

    // It is executed only once at root level to set the initial value of the theme
    var localstorage_cookbook_theme = window.localStorage.getItem('cookbook-theme');
    this.className = localstorage_cookbook_theme;
    console.log('localstorage_cookbook_theme', localstorage_cookbook_theme);

    if (localstorage_cookbook_theme && localstorage_cookbook_theme.endsWith('-dark')) {
      this.darkTheme = true;
    }
  }

  changeTheme(theme: string) {
		const classList = this.overlay.getContainerElement().classList;

    let suffix = '';
    if (this.darkTheme) {
      suffix = '-dark';
    }
    const applyTheme = theme + suffix;
    
    window.localStorage.setItem('cookbook-theme', applyTheme);
    classList.add(applyTheme);
    this.className = applyTheme;
  }

  showDialog(): void {
    this.dialog.open(SimpleDialogComponent, {
      width: '500px',
    });
  }

  setDarkTheme(value: boolean) {
    var localstorage_cookbook_theme = window.localStorage.getItem('cookbook-theme');
    // set default theme
    if (!localstorage_cookbook_theme) {
      localstorage_cookbook_theme = 'theme';
    }

    // if toggle is true, we'll add '-dark' suffix on current theme
    if (value) {
      const suffix = '-dark';
      const applyTheme = localstorage_cookbook_theme + suffix;
      const classList = this.overlay.getContainerElement().classList;
      window.localStorage.setItem('cookbook-theme', applyTheme);
      classList.add(applyTheme);
      this.className = applyTheme;

      this.darkTheme = true;
    } else {
      const applyTheme = localstorage_cookbook_theme.slice(0, -5);
      const classList = this.overlay.getContainerElement().classList;
      window.localStorage.setItem('cookbook-theme', applyTheme);
      classList.add(applyTheme);
      this.className = applyTheme;
      
      this.darkTheme = false
    }
  }
  
  disabledTheme(currentTheme: string) {
    var localstorage_cookbook_theme = window.localStorage.getItem('cookbook-theme');
    if (!localstorage_cookbook_theme) {
      return false;
    }

    // currentTheme added dark theme
    const currentThemeAddDarkTheme: string[] = [];
    currentThemeAddDarkTheme.push(currentTheme);
    currentThemeAddDarkTheme.push(currentTheme + '-dark');
    
    return currentThemeAddDarkTheme.includes(localstorage_cookbook_theme);
  }

}
