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
  // 'theme-dark',
  'deep-purple-and-amber',
  // 'deep-purple-and-amber-dark',
  'purple-green',
  // 'purple-green-dark',
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

  setDarkTheme(value: boolean) {
    var localstorage_cookbook_theme = window.localStorage.getItem('cookbook-theme');
    if (!localstorage_cookbook_theme) {
      localstorage_cookbook_theme = 'theme';
    }

    // daca valoarea este true, aplicam -dark in fata temei curente
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
    this.className = localstorage_cookbook_theme;
    console.log('localstorage_cookbook_theme', localstorage_cookbook_theme);

    // TODO:
    // const indexOfS = Object.values(Theme).indexOf(localstorage_cookbook_theme as unknown as Theme);
    // console.log('indexOfS', indexOfS);

    if (localstorage_cookbook_theme && localstorage_cookbook_theme.endsWith('-dark')) {
      this.darkTheme = true;
    }
  }

  // 
  // deep-purple-and-amber
  changeTheme(theme: string) {


    const indexOfS = Object.values(Theme).indexOf(theme as unknown as Theme);
		const classList = this.overlay.getContainerElement().classList;

    let suffix = '';
    if (this.darkTheme) {
      console.log('👍', );
      suffix = '-dark';
    }
    const applyTheme = theme + suffix;
    
    window.localStorage.setItem('cookbook-theme', applyTheme);
    classList.add(applyTheme);
    this.className = applyTheme;

    console.log('🟢🟢🟢', applyTheme);
  }

  showDialog(): void {
    this.dialog.open(SimpleDialogComponent, {
      width: '500px',
    });
  }

}
