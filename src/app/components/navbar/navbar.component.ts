import { Component, HostListener } from '@angular/core';
import { LanguageService } from '../../Service/language.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isMenuOpen = false;
  isVisible = true;
  lastScrollPosition = 0;
  currentLang: string = 'en';

  constructor(private langService: LanguageService) {
    this.langService.languageChanged$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScroll = window.scrollY;

    // إذا كانت القائمة مفتوحة، لا تقم بإخفاء الناف بار
    if (this.isMenuOpen) {
      this.isVisible = true;
      return;
    }

    // إخفاء عند النزول، إظهار عند الصعود
    if (currentScroll > this.lastScrollPosition && currentScroll > 100) {
      this.isVisible = false;
    } else {
      this.isVisible = true;
    }

    this.lastScrollPosition = currentScroll;
  }

  toggleLanguage() {
    const nextLang = this.currentLang === 'en' ? 'ar' : 'en';
    this.langService.switchLanguage(nextLang);
    // اختياري: إغلاق القائمة عند تغيير اللغة
    this.isMenuOpen = false;
  }
}
