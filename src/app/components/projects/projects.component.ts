import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
export class ProjectsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('portfolioCarouselTrack') portfolioCarouselTrack?: ElementRef<HTMLElement>;

  activeFilter = 'All';
  currentLang = 'en';
  activeSlideIndex = 0;
  activePortfolioSlide = 0;
  private slideInterval?: ReturnType<typeof setInterval>;
  private portfolioScrollRaf = 0;
  private portfolioDidSwipe = false;
  private portfolioPointerId = -1;
  private portfolioIsDragging = false;
  private portfolioDragStartX = 0;
  private portfolioDragScrollLeft = 0;
  private portfolioDragCleanup?: () => void;

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

  constructor(
    private translate: TranslateService,
    private router: Router
  ) {}

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
      setTimeout(() => this.resetPortfolioCarousel(), 0);
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

  ngAfterViewInit(): void {
    this.resetPortfolioCarousel();
    this.setupPortfolioCarouselDrag();
  }

  private resetPortfolioCarousel(): void {
    const track = this.portfolioCarouselTrack?.nativeElement;
    if (!track || window.innerWidth >= 640) {
      return;
    }

    track.scrollLeft = 0;
    this.activePortfolioSlide = 0;
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

  onPortfolioScroll(): void {
    if (this.portfolioIsDragging) {
      return;
    }

    cancelAnimationFrame(this.portfolioScrollRaf);
    this.portfolioScrollRaf = requestAnimationFrame(() => this.updateActivePortfolioSlide());
  }

  openBrand(id: string): void {
    if (this.portfolioDidSwipe) {
      return;
    }

    this.router.navigate(['/brand', id]);
  }

  goToPortfolioSlide(index: number): void {
    const track = this.portfolioCarouselTrack?.nativeElement;
    const slide = track?.children[index] as HTMLElement | undefined;
    if (!track || !slide) {
      return;
    }

    const offset = slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2;
    track.scrollTo({ left: offset, behavior: 'smooth' });
    this.activePortfolioSlide = index;
  }

  private updateActivePortfolioSlide(): void {
    const track = this.portfolioCarouselTrack?.nativeElement;
    if (!track || !track.children.length) {
      return;
    }

    this.activePortfolioSlide = this.getCarouselActiveIndex(track);
  }

  private setupPortfolioCarouselDrag(): void {
    const track = this.portfolioCarouselTrack?.nativeElement;
    if (!track || this.portfolioDragCleanup) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      if (window.innerWidth >= 640) {
        return;
      }

      this.portfolioPointerId = event.pointerId;
      this.portfolioIsDragging = false;
      this.portfolioDidSwipe = false;
      this.portfolioDragStartX = event.clientX;
      this.portfolioDragScrollLeft = track.scrollLeft;
      track.classList.add('is-dragging');
      track.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerId !== this.portfolioPointerId) {
        return;
      }

      const deltaX = event.clientX - this.portfolioDragStartX;
      if (!this.portfolioIsDragging && Math.abs(deltaX) > 6) {
        this.portfolioIsDragging = true;
        this.portfolioDidSwipe = true;
      }

      if (!this.portfolioIsDragging) {
        return;
      }

      event.preventDefault();
      track.scrollLeft = this.portfolioDragScrollLeft - deltaX;
      this.updateActivePortfolioSlide();
    };

    const endDrag = (event: PointerEvent) => {
      if (event.pointerId !== this.portfolioPointerId) {
        return;
      }

      track.classList.remove('is-dragging');
      if (track.hasPointerCapture(event.pointerId)) {
        track.releasePointerCapture(event.pointerId);
      }

      const wasDragging = this.portfolioIsDragging;
      this.portfolioPointerId = -1;
      this.portfolioIsDragging = false;

      if (wasDragging) {
        this.snapToNearestPortfolioSlide();
        window.setTimeout(() => {
          this.portfolioDidSwipe = false;
        }, 180);
      }
    };

    track.addEventListener('pointerdown', onPointerDown);
    track.addEventListener('pointermove', onPointerMove, { passive: false });
    track.addEventListener('pointerup', endDrag);
    track.addEventListener('pointercancel', endDrag);

    this.portfolioDragCleanup = () => {
      track.removeEventListener('pointerdown', onPointerDown);
      track.removeEventListener('pointermove', onPointerMove);
      track.removeEventListener('pointerup', endDrag);
      track.removeEventListener('pointercancel', endDrag);
    };
  }

  private snapToNearestPortfolioSlide(): void {
    const track = this.portfolioCarouselTrack?.nativeElement;
    if (!track || !track.children.length) {
      return;
    }

    this.goToPortfolioSlide(this.getCarouselActiveIndex(track));
  }

  ngOnDestroy(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }

    cancelAnimationFrame(this.portfolioScrollRaf);
    this.portfolioDragCleanup?.();
  }

  setFilter(cat: string) {
    this.activeFilter = cat;
    setTimeout(() => AOS.refresh(), 100);
  }

  isBrandActive(brandId: string): boolean {
    return this.activeBrandId === brandId;
  }
}
