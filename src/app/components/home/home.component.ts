import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as AOS from 'aos';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('brandsCarouselTrack') brandsCarouselTrack?: ElementRef<HTMLElement>;

  currentLang: string = 'en';
  activeBrandSlide = 0;
  hasAnimatedStats = false;
  animatedStats: Record<string, number> = {};
  private observer?: IntersectionObserver;
  private counterTimers: number[] = [];
  private brandsScrollRaf = 0;
  private brandsDidSwipe = false;
  private brandsPointerId = -1;
  private brandsIsDragging = false;
  private brandsDragStartX = 0;
  private brandsDragScrollLeft = 0;
  private brandsDragCleanup?: () => void;

  constructor(
    private translate: TranslateService,
    private router: Router
  ) {
    this.currentLang = this.translate.currentLang || 'en';
  }

  heroMetrics = [
    { value: '6+', labelKey: 'HOME.NUMBERS.BRANDS' },
    { value: '6', labelKey: 'HERO.METRIC_SECTORS' },
    { value: '3+', labelKey: 'HOME.NUMBERS.COUNTRIES' }
  ];

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
    HomeComponent.mapPin(30.04, 31.24, 'FOOTPRINT.COUNTRIES.EGYPT'),
    HomeComponent.mapPin(39.9, 32.85, 'FOOTPRINT.COUNTRIES.TURKEY'),
    HomeComponent.mapPin(29.38, 47.99, 'FOOTPRINT.COUNTRIES.KUWAIT'),
    HomeComponent.mapPin(23.59, 58.38, 'FOOTPRINT.COUNTRIES.OMAN')
  ];

  private static mapPin(lat: number, lon: number, labelKey: string) {
    return {
      top: +(((90 - lat) / 180) * 100).toFixed(2),
      left: +(((lon + 180) / 360) * 100).toFixed(2),
      labelKey
    };
  }

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
      setTimeout(() => this.resetBrandsCarousel(), 0);
    });
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
  }

  ngAfterViewInit(): void {
    const numbersSection = document.getElementById('numbersSection');
    if (numbersSection) {
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

    this.resetBrandsCarousel();
    this.setupBrandsCarouselDrag();
  }

  private resetBrandsCarousel(): void {
    const track = this.brandsCarouselTrack?.nativeElement;
    if (!track || window.innerWidth >= 640) {
      return;
    }

    track.scrollLeft = 0;
    this.activeBrandSlide = 0;
  }

  private getCarouselActiveIndex(track: HTMLElement): number {
    const scrollCenter = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let minDistance = Infinity;

    Array.from(track.children).forEach((child, index) => {
      const slide = child as HTMLElement;
      const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
      const distance = Math.abs(slideCenter - scrollCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closest = index;
      }
    });

    return closest;
  }

  onBrandsScroll(): void {
    if (this.brandsIsDragging) {
      return;
    }

    cancelAnimationFrame(this.brandsScrollRaf);
    this.brandsScrollRaf = requestAnimationFrame(() => this.updateActiveBrandSlide());
  }

  openBrand(id: string): void {
    if (this.brandsDidSwipe) {
      return;
    }

    this.router.navigate(['/brand', id]);
  }

  goToBrandSlide(index: number): void {
    const track = this.brandsCarouselTrack?.nativeElement;
    const slide = track?.children[index] as HTMLElement | undefined;
    if (!track || !slide) {
      return;
    }

    const offset = slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2;
    track.scrollTo({ left: offset, behavior: 'smooth' });
    this.activeBrandSlide = index;
  }

  private updateActiveBrandSlide(): void {
    const track = this.brandsCarouselTrack?.nativeElement;
    if (!track || !track.children.length) {
      return;
    }

    this.activeBrandSlide = this.getCarouselActiveIndex(track);
  }

  private setupBrandsCarouselDrag(): void {
    const track = this.brandsCarouselTrack?.nativeElement;
    if (!track || this.brandsDragCleanup) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      if (window.innerWidth >= 640) {
        return;
      }

      this.brandsPointerId = event.pointerId;
      this.brandsIsDragging = false;
      this.brandsDidSwipe = false;
      this.brandsDragStartX = event.clientX;
      this.brandsDragScrollLeft = track.scrollLeft;
      track.classList.add('is-dragging');
      track.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerId !== this.brandsPointerId) {
        return;
      }

      const deltaX = event.clientX - this.brandsDragStartX;
      if (!this.brandsIsDragging && Math.abs(deltaX) > 6) {
        this.brandsIsDragging = true;
        this.brandsDidSwipe = true;
      }

      if (!this.brandsIsDragging) {
        return;
      }

      event.preventDefault();
      track.scrollLeft = this.brandsDragScrollLeft - deltaX;
      this.updateActiveBrandSlide();
    };

    const endDrag = (event: PointerEvent) => {
      if (event.pointerId !== this.brandsPointerId) {
        return;
      }

      track.classList.remove('is-dragging');
      if (track.hasPointerCapture(event.pointerId)) {
        track.releasePointerCapture(event.pointerId);
      }

      const wasDragging = this.brandsIsDragging;
      this.brandsPointerId = -1;
      this.brandsIsDragging = false;

      if (wasDragging) {
        this.snapToNearestBrandSlide();
        window.setTimeout(() => {
          this.brandsDidSwipe = false;
        }, 180);
      }
    };

    track.addEventListener('pointerdown', onPointerDown);
    track.addEventListener('pointermove', onPointerMove, { passive: false });
    track.addEventListener('pointerup', endDrag);
    track.addEventListener('pointercancel', endDrag);

    this.brandsDragCleanup = () => {
      track.removeEventListener('pointerdown', onPointerDown);
      track.removeEventListener('pointermove', onPointerMove);
      track.removeEventListener('pointerup', endDrag);
      track.removeEventListener('pointercancel', endDrag);
    };
  }

  private snapToNearestBrandSlide(): void {
    const track = this.brandsCarouselTrack?.nativeElement;
    if (!track || !track.children.length) {
      return;
    }

    this.goToBrandSlide(this.getCarouselActiveIndex(track));
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
    cancelAnimationFrame(this.brandsScrollRaf);
    this.brandsDragCleanup?.();
  }
}
