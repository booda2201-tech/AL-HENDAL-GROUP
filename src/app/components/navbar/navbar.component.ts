import { Component, HostListener } from '@angular/core';
import { LanguageService } from '../../Service/language.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isMenuOpen = false;
  isScrolled = false;
  isVisible = true;
  lastScrollPosition = 0;
  currentLang: string = 'en';

  @HostListener('window:scroll', [])

onWindowScroll() {
    const currentScroll = window.scrollY;
    this.isScrolled = currentScroll > 50;

    if (currentScroll > this.lastScrollPosition && currentScroll > 150) {
      this.isVisible = false;
    } else {
      this.isVisible = true;
    }
    this.lastScrollPosition = currentScroll;
  }

constructor(private langService: LanguageService) {

    this.langService.languageChanged$.subscribe(lang => {
      this.currentLang = lang;
    });
  }
toggleLanguage() {
    const nextLang = this.currentLang === 'en' ? 'ar' : 'en';
    this.langService.switchLanguage(nextLang);
  }
}
