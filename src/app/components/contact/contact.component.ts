import { Component, HostListener, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

interface CategoryOption {
  value: string;
  labelKey: string;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  currentLang = 'en';
  categoryOpen = false;
  selectedCategory = 'general';

  categoryOptions: CategoryOption[] = [
    { value: 'general', labelKey: 'CONTACT.CAT1' },
    { value: 'partnership', labelKey: 'CONTACT.CAT2' },
    { value: 'careers', labelKey: 'CONTACT.CAT3' }
  ];

  constructor(private translate: TranslateService) {}

  get selectedCategoryLabelKey(): string {
    return this.categoryOptions.find(option => option.value === this.selectedCategory)?.labelKey ?? 'CONTACT.CAT1';
  }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang || 'en';
    this.translate.onLangChange.subscribe(event => {
      this.currentLang = event.lang;
    });
  }

  toggleCategoryDropdown(): void {
    this.categoryOpen = !this.categoryOpen;
  }

  selectCategory(option: CategoryOption): void {
    this.selectedCategory = option.value;
    this.categoryOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.contact-custom-select')) {
      this.categoryOpen = false;
    }
  }
}