import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  activeFilter = 'All';
  currentLang = 'en';

  subsidiaries = [
    {
      id: 'bubble-hope',
      tag: 'F&B',
      tag_ar: 'أغذية ومشروبات',
      title: 'Bubble Hope',
      title_ar: 'بابل هوب',
      location: 'Kuwait - Egypt',
      location_ar: 'الكويت - مصر',
      type: 'image',
      image: '../../../assets/imges/b3.jpg',
      industry: 'Food & Beverage',
      industry_ar: 'أغذية ومشروبات'
    },
    {
      id: 'saidy-tea',
      tag: 'F&B',
      tag_ar: 'أغذية ومشروبات',
      title: 'Alsaeid Tea',
      title_ar: 'شاي الصعيد',
      location: 'Arab Markets',
      location_ar: 'الأسواق العربية',
      type: 'image',
      image: '../../../assets/imges/33.jpg ',
      industry: 'Premium Tea',
      industry_ar: 'شاي فاخر'
    },
    {
      id: 'forto',
      tag: 'Logistics',
      tag_ar: 'لوجستيات',
      title: 'FORTO',
      title_ar: 'فورتو',
      location: 'Egypt',
      location_ar: 'مصر',
      type: 'image',
      image: '../../../assets/imges/3.jpg',
      industry: 'Supply Chain',
      industry_ar: 'سلسلة التوريد'
    },
    {
      id: 't4-tea',
      tag: 'F&B',
      tag_ar: 'أغذية ومشروبات',
      title: 'T4 Tea',
      title_ar: 'تي ٤ شاي',
      location: 'Egypt',
      location_ar: 'مصر',
      type: 'image',
      image: '../../../assets/imges/p4.jpg',
      industry: 'Premium Tea',
      industry_ar: 'شاي فاخر'
    }
  ];

  constructor(private translate: TranslateService) {}

  get filteredSubsidiaries() {
    if (this.activeFilter === 'All') return this.subsidiaries;
    return this.subsidiaries.filter(item => item.tag === this.activeFilter);
  }

  ngOnInit() {
    this.currentLang = this.translate.currentLang || 'en';
    this.translate.onLangChange.subscribe(event => {
      this.currentLang = event.lang;
    });

    AOS.init({
      duration: 500,
      once: true,
      offset: 100,
      easing: 'ease-in-out'
    });
  }

  setFilter(cat: string) {
    this.activeFilter = cat;
    setTimeout(() => AOS.refresh(), 100);
  }
}
