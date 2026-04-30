import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  currentLang: string = 'en';
  hasAnimatedStats = false;
  animatedStats: Record<string, number> = {};
  private observer?: IntersectionObserver;
  private counterTimers: number[] = [];

  constructor(private translate: TranslateService) {
    this.currentLang = this.translate.currentLang || 'en';
  }

  sectors = [
    { icon: 'construction', key: 'HOME.SECTORS.ITEM1' },
    { icon: 'local_cafe', key: 'HOME.SECTORS.ITEM2' },
    { icon: 'storefront', key: 'HOME.SECTORS.ITEM3' },
    { icon: 'directions_car', key: 'HOME.SECTORS.ITEM4' },
    { icon: 'inventory_2', key: 'HOME.SECTORS.ITEM5' },
    { icon: 'devices', key: 'HOME.SECTORS.ITEM6' }
  ];

  journey = [
    { year: '2012', key: 'HOME.JOURNEY.Y2012' },
    { year: '2016', key: 'HOME.JOURNEY.Y2016' },
    { year: '2019', key: 'HOME.JOURNEY.Y2019' },
    { year: '2021', key: 'HOME.JOURNEY.Y2021' },
    { year: '2023', key: 'HOME.JOURNEY.Y2023' },
    { year: '2025', key: 'HOME.JOURNEY.Y2025' }
  ];

  stats = [
    { key: 'branches', value: 20, prefix: '+', label: 'HOME.NUMBERS.BRANCHES' },
    { key: 'brands', value: 6, prefix: '+', label: 'HOME.NUMBERS.BRANDS' },
    { key: 'years', value: 10, prefix: '+', label: 'HOME.NUMBERS.YEARS' },
    { key: 'employees', value: 100, prefix: '+', label: 'HOME.NUMBERS.EMPLOYEES' },
    { key: 'countries', value: 3, prefix: '+', label: 'HOME.NUMBERS.COUNTRIES' },
    { key: 'customers', value: 50, prefix: '+', suffix: 'K', label: 'HOME.NUMBERS.CUSTOMERS' }
  ];

  mapLocations = [
    { top: 56, left: 55, title: 'Egypt - Cairo HQ' },
    { top: 48, left: 58, title: 'Kuwait - Regional Partner' },
    { top: 43, left: 52, title: 'Turkey - Trading Hub' },
    { top: 52, left: 62, title: 'UAE - Strategic Office' }
  ];

  featuredProjects = [
    { key: 'HOME.PROJECTS.ITEM1', image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=1887' },
    { key: 'HOME.PROJECTS.ITEM2', image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=2070' },
    { key: 'HOME.PROJECTS.ITEM3', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070' },
    { key: 'HOME.PROJECTS.ITEM4', image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=2070' }
  ];

  values = ['HOME.VALUES.ITEM1', 'HOME.VALUES.ITEM2', 'HOME.VALUES.ITEM3', 'HOME.VALUES.ITEM4', 'HOME.VALUES.ITEM5'];
  sustainPillars = ['HOME.SUSTAIN.ITEM1', 'HOME.SUSTAIN.ITEM2', 'HOME.SUSTAIN.ITEM3', 'HOME.SUSTAIN.ITEM4'];
  partners = ['Bubble Hope', 'FORTO', 'ALAMANA', 'T4 TEA', 'DAL', 'Elsaeid Tea'];

  brandsList = [
    { id: 'alamana', name: 'Al-Amana', nameAr: 'الامانة', image: 'assets/imges/a22.png', textColor: 'text-purple-400', translateKey: 'BRANDS.alamana_DESC' },
    { id: 'bubble-hope', name: 'Bubble Hope', nameAr: 'بابل هوب', image: 'assets/imges/b10.png', textColor: 'text-orange-500', translateKey: 'BRANDS.BUBBLE_DESC' },
    { id: 't4-tea', name: 'T4 TEA', nameAr: 'تي فور تي', image: 'assets/imges/p4.jpg', textColor: 'text-white', translateKey: 'BRANDS.T4_DESC' },
    { id: 'saidy-tea', name: 'Elsaeid Tea', nameAr: 'شاي الصعيد', image: 'assets/imges/33.jpg', textColor: 'text-white', translateKey: 'BRANDS.SAIDY_DESC' },
    { id: 'forto', name: 'FORTO', nameAr: 'فورتو', image: 'assets/imges/2.jpg', textColor: 'text-orange-400', translateKey: 'BRANDS.FORTO_DESC' },
    { id: 'dall', name: 'DAL', nameAr: 'دال للبرمجية', image: 'assets/imges/dal-logo2.png', textColor: 'text-white', translateKey: 'BRANDS.DALL_DESC' }
  ];

  ngOnInit() {
    this.translate.onLangChange.subscribe(event => {
      this.currentLang = event.lang;
    });
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
  }

  ngAfterViewInit(): void {
    const numbersSection = document.getElementById('numbersSection');
    if (!numbersSection) {
      return;
    }

    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.hasAnimatedStats) {
            this.hasAnimatedStats = true;
            this.startCounters();
            this.observer?.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    this.observer.observe(numbersSection);
  }

  private startCounters(): void {
    this.stats.forEach(stat => {
      const duration = 1600;
      const steps = 40;
      const stepValue = stat.value / steps;
      let currentStep = 0;

      this.animatedStats[stat.key] = 0;

      const timerId = window.setInterval(() => {
        currentStep += 1;
        const nextValue = Math.round(stepValue * currentStep);
        this.animatedStats[stat.key] = currentStep >= steps ? stat.value : nextValue;

        if (currentStep >= steps) {
          clearInterval(timerId);
        }
      }, duration / steps);

      this.counterTimers.push(timerId);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.counterTimers.forEach(timerId => clearInterval(timerId));
  }
}
