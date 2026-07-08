import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as AOS from 'aos';

interface Subsidiary {
  id: string;
  tag: string;
  tag_ar: string;
  title: string;
  title_ar: string;
  location: string;
  location_ar: string;
  type: 'image' | 'card';
  image: string;
  industry: string;
  industry_ar: string;
  translateKey: string;
}

interface HeroSlide {
  brandId: string;
  image: string;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  activeFilter = 'All';
  currentLang = 'en';
  activeSlideIndex = 0;
  private slideInterval?: ReturnType<typeof setInterval>;

  private readonly brandHeroImages: Record<string, string[]> = {
    forto: [
      'assets/imges/1.jpg',
      'assets/imges/2.jpg',
      'assets/imges/3.jpg',
      'assets/imges/4.jpg'
    ],
    'bubble-hope': [
      'assets/imges/b4.jpg',
      'assets/imges/b5.jpg',
      'assets/imges/b6.jpg',
      'assets/imges/02.jpg'
    ],
    alamana: [
      'assets/imges/al-8.jpg',
      'assets/imges/al-3.png',
      'assets/imges/al-1.png'
    ],
    'saidy-tea': ['assets/imges/33.jpg'],
    't4-tea': ['assets/imges/p4.jpg'],
    dall: ['assets/imges/d-1.png', 'assets/imges/d-2.png']
  };

  heroSlides: HeroSlide[] = Object.entries(this.brandHeroImages).flatMap(([brandId, images]) =>
    images.map(image => ({ brandId, image }))
  );

  subsidiaries: Subsidiary[] = [
    {
      id: 'alamana',
      tag: 'building',
      tag_ar: 'مواد بناء',
      title: 'Alamana',
      title_ar: 'الامانة',
      location: 'Kuwait - Egypt',
      location_ar: 'الكويت - مصر',
      type: 'image',
      image: 'assets/imges/a22.png',
      industry: 'building & construction materials',
      industry_ar: 'مواد بناء',
      translateKey: 'BRANDS.alamana_DESC'
    },
    {
      id: 'bubble-hope',
      tag: 'F&B',
      tag_ar: 'أغذية ومشروبات',
      title: 'Bubble Hope',
      title_ar: 'بابل هوب',
      location: 'Egypt',
      location_ar: ' مصر ',
      type: 'image',
      image: 'assets/imges/b3.jpg',
      industry: 'Food & Beverage',
      industry_ar: 'أغذية ومشروبات',
      translateKey: 'BRANDS.BUBBLE_DESC'
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
      image: 'assets/imges/33.jpg',
      industry: 'Premium Tea',
      industry_ar: 'شاي فاخر',
      translateKey: 'BRANDS.SAIDY_DESC'
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
      image: 'assets/imges/3.jpg',
      industry: 'Supply Chain',
      industry_ar: 'سلسلة التوريد',
      translateKey: 'BRANDS.FORTO_DESC'
    },
    {
      id: 't4-tea',
      tag: 'F&B',
      tag_ar: 'أغذية ومشروبات',
      title: 'T4 Tea',
      title_ar: 'تي فور تي',
      location: 'Egypt',
      location_ar: 'مصر',
      type: 'image',
      image: 'assets/imges/p4.jpg',
      industry: 'Premium Tea',
      industry_ar: 'شاي فاخر',
      translateKey: 'BRANDS.T4_DESC'
    },
    {
      id: 'dall',
      tag: 'Tech',
      tag_ar: 'تكنولوجيا',
      title: 'DALL',
      title_ar: 'دال',
      location: 'Egypt',
      location_ar: 'مصر',
      type: 'image',
      image: 'assets/imges/dal-logo2.png',
      industry: 'Software Solutions',
      industry_ar: 'حلول برمجية',
      translateKey: 'BRANDS.DALL_DESC'
    }
  ];

  constructor(private translate: TranslateService) {}

  get filteredSubsidiaries() {
    if (this.activeFilter === 'All') return this.subsidiaries;
    return this.subsidiaries.filter(item => item.tag === this.activeFilter);
  }

  get activeBrandId(): string {
    return this.heroSlides[this.activeSlideIndex]?.brandId ?? '';
  }

  get activeBrand(): Subsidiary | undefined {
    return this.subsidiaries.find(item => item.id === this.activeBrandId);
  }

  ngOnInit() {
    this.currentLang = this.translate.currentLang || 'en';
    this.translate.onLangChange.subscribe(event => {
      this.currentLang = event.lang;
    });

    this.slideInterval = setInterval(() => {
      this.activeSlideIndex = (this.activeSlideIndex + 1) % this.heroSlides.length;
    }, 4500);

    AOS.init({
      duration: 500,
      once: true,
      offset: 100,
      easing: 'ease-in-out'
    });
  }

  ngOnDestroy(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  setFilter(cat: string) {
    this.activeFilter = cat;
    setTimeout(() => AOS.refresh(), 100);
  }

  isBrandActive(brandId: string): boolean {
    return this.activeBrandId === brandId;
  }
}
