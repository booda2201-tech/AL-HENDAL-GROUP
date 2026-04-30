import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LanguageService } from './language.service';

type SeoContent = {
  title: string;
  description: string;
  keywords: string;
};

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly siteName = 'Al Hendal Group';
  private readonly baseUrl = 'https://alhendalgroup.com';
  private readonly defaultImage = 'https://alhendalgroup.com/assets/imges/logo%20(4).png';
  private currentLang: 'en' | 'ar' = 'en';

  constructor(
    private router: Router,
    private title: Title,
    private meta: Meta,
    private languageService: LanguageService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  init(): void {
    this.languageService.languageChanged$.subscribe(lang => {
      this.currentLang = (lang === 'ar' ? 'ar' : 'en');
      this.document.documentElement.setAttribute('lang', this.currentLang);
      this.applySeo(this.router.url || '/');
    });

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(event => this.applySeo(event.urlAfterRedirects));
  }

  private applySeo(url: string): void {
    const cleanUrl = (url || '/').split('?')[0].split('#')[0];
    const canonicalUrl = `${this.baseUrl}${cleanUrl === '/' ? '' : cleanUrl}`;
    const content = this.getContent(cleanUrl, this.currentLang);

    this.title.setTitle(content.title);
    this.meta.updateTag({ name: 'description', content: content.description });
    this.meta.updateTag({ name: 'keywords', content: content.keywords });
    this.meta.updateTag({ name: 'robots', content: 'index,follow,max-image-preview:large' });
    this.meta.updateTag({ name: 'author', content: this.siteName });

    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: this.siteName });
    this.meta.updateTag({ property: 'og:title', content: content.title });
    this.meta.updateTag({ property: 'og:description', content: content.description });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ property: 'og:image', content: this.defaultImage });
    this.meta.updateTag({ property: 'og:locale', content: this.currentLang === 'ar' ? 'ar_EG' : 'en_US' });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: content.title });
    this.meta.updateTag({ name: 'twitter:description', content: content.description });
    this.meta.updateTag({ name: 'twitter:image', content: this.defaultImage });

    this.setCanonical(canonicalUrl);
  }

  private setCanonical(url: string): void {
    let link = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private getContent(path: string, lang: 'en' | 'ar'): SeoContent {
    const en: Record<string, SeoContent> = {
      '/': {
        title: 'Al Hendal Group | Diversified Regional Business Group',
        description: 'Al Hendal Group is a diversified regional business group across construction materials, hospitality, automotive services, and digital solutions.',
        keywords: 'Al Hendal Group, construction materials, hospitality, automotive care, digital solutions, Egypt'
      },
      '/home': {
        title: 'Home | Al Hendal Group',
        description: 'Explore Al Hendal Group brands, sectors, and growth journey across Egypt and regional markets.',
        keywords: 'Al Hendal home, brands, sectors, regional expansion'
      },
      '/about': {
        title: 'About Us | Al Hendal Group',
        description: 'Learn about Al Hendal Group heritage, vision, mission, and core values driving long-term growth.',
        keywords: 'about Al Hendal, vision, mission, core values'
      },
      '/projects': {
        title: 'Projects & Subsidiaries | Al Hendal Group',
        description: 'Discover Al Hendal Group subsidiaries and diversified portfolio across key industries and services.',
        keywords: 'Al Hendal projects, subsidiaries, portfolio'
      },
      '/contact': {
        title: 'Contact & Media | Al Hendal Group',
        description: 'Get in touch with Al Hendal Group for partnerships, media, careers, and business inquiries.',
        keywords: 'contact Al Hendal, media releases, business partnership'
      },
      '/sustainability': {
        title: 'Sustainability | Al Hendal Group',
        description: 'Read Al Hendal Group sustainability strategy, commitments, and long-term growth initiatives.',
        keywords: 'Al Hendal sustainability, growth, responsibility'
      }
    };

    const ar: Record<string, SeoContent> = {
      '/': {
        title: 'مجموعة الهندال | مجموعة أعمال إقليمية متعددة الأنشطة',
        description: 'مجموعة الهندال كيان أعمال إقليمي يعمل في مواد البناء والضيافة وخدمات السيارات والحلول الرقمية.',
        keywords: 'مجموعة الهندال, مواد البناء, الضيافة, خدمات السيارات, الحلول الرقمية'
      },
      '/home': {
        title: 'الرئيسية | مجموعة الهندال',
        description: 'اكتشف قطاعات وعلامات مجموعة الهندال ومسيرة النمو داخل مصر وخارجها.',
        keywords: 'الرئيسية, مجموعة الهندال, العلامات التجارية, القطاعات'
      },
      '/about': {
        title: 'من نحن | مجموعة الهندال',
        description: 'تعرف على تراث مجموعة الهندال ورؤيتها ورسالتها وقيمها الأساسية.',
        keywords: 'من نحن, رؤية, رسالة, قيم, مجموعة الهندال'
      },
      '/projects': {
        title: 'المشاريع والشركات التابعة | مجموعة الهندال',
        description: 'استعرض محفظة مجموعة الهندال والشركات التابعة عبر قطاعات متنوعة.',
        keywords: 'المشاريع, الشركات التابعة, محفظة الأعمال'
      },
      '/contact': {
        title: 'التواصل والإعلام | مجموعة الهندال',
        description: 'تواصل مع مجموعة الهندال للشراكات والاستفسارات وفرص العمل والتغطيات الإعلامية.',
        keywords: 'تواصل, إعلام, شراكات, مجموعة الهندال'
      },
      '/sustainability': {
        title: 'الاستدامة | مجموعة الهندال',
        description: 'اطلع على استراتيجية الاستدامة والالتزامات طويلة الأمد في مجموعة الهندال.',
        keywords: 'الاستدامة, مجموعة الهندال, النمو المسؤول'
      }
    };

    if (path.startsWith('/brand/')) {
      return lang === 'ar'
        ? {
            title: 'تفاصيل العلامة التجارية | مجموعة الهندال',
            description: 'استعرض تفاصيل العلامات التجارية التابعة لمجموعة الهندال ومنتجاتها وخدماتها.',
            keywords: 'تفاصيل العلامة التجارية, مجموعة الهندال, العلامات التجارية'
          }
        : {
            title: 'Brand Details | Al Hendal Group',
            description: 'View details of Al Hendal Group brands, services, and product experiences.',
            keywords: 'brand details, Al Hendal brands, services'
          };
    }

    const dictionary = lang === 'ar' ? ar : en;
    return dictionary[path] || dictionary['/'];
  }
}
