import {
  Injectable,
  Renderer2,
  RendererFactory2,
  OnDestroy,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
// import * as MobileDetect from 'mobile-detect';
import { BpDesktopMin, BpMobileSMax } from '../style/variables/breakpoints';
import { isPlatformBrowser } from '@angular/common';

interface DeviceResolution {
  width: number;
  height: number;
  desktop: boolean;
  stDesktop: boolean;
  mobileS: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DeviceService implements OnDestroy {
  public readonly pixelRatio: number;

  private IsTouch: boolean;
  private IsMouse: boolean;
  private listeningToMouse: boolean;
  private lastTouchTime = 0;

  // public readonly isMobile: boolean;
  // public readonly isIos: boolean;
  // public readonly isAndroid: boolean;

  private readonly renderer: Renderer2;
  private touchstartRemoveListener;
  private resizeRemoveListener;

  constructor(
    private rendererFactory: RendererFactory2,
    @Inject(PLATFORM_ID) private platformId
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.renderer = this.rendererFactory.createRenderer(null, null);
      // We have to listen touch events constantly to filter out mouse events coming from touch event
      this.touchstartRemoveListener = this.renderer.listen(
        'document',
        'touchstart',
        () => {
          this.lastTouchTime = new Date().getTime();
          if (!this.IsTouch) {
            this.setToTouch();
          }
        }
      );
      this.listenToMouse();

      this.pixelRatio = window.devicePixelRatio;

      // const md = new MobileDetect(window.navigator.userAgent);
      // this.isMobile = !!md.mobile();
      // this.isIos = md.is('iPhone');
      // this.isAndroid = md.is('AndroidOS');
    }
  }

  ngOnDestroy() {
    this.touchstartRemoveListener();
    this.resizeRemoveListener();
  }

  public get resolution(): DeviceResolution {
    if (isPlatformBrowser(this.platformId)) {
      const width = window.innerWidth;
      const height = window.innerWidth;
      return {
        width,
        height,
        desktop: width >= BpDesktopMin,
        stDesktop: width < BpDesktopMin,
        mobileS: width <= BpMobileSMax
      };
    } else {
      return undefined;
    }
  }

  public get isTouch(): boolean {
    return this.IsTouch;
  }

  public get isMouse(): boolean {
    return this.IsMouse;
  }

  private listenToMouse(): void {
    if (this.listeningToMouse) {
      return;
    }

    // It's enough to listen just one mouse event
    // Next time we need to listen if device is mouse, we will subscribe again
    const mousemoveRemoveListener = this.renderer.listen(
      'document',
      'mousemove',
      () => {
        this.listeningToMouse = false;
        this.setToMouse();
        mousemoveRemoveListener();
      }
    );
    this.listeningToMouse = true;
  }

  private setToMouse(): void {
    // Filter out mouse events coming from touch events
    if (new Date().getTime() - this.lastTouchTime < 500) {
      this.listenToMouse();
      return;
    }

    this.IsTouch = false;
    this.IsMouse = true;
  }

  private setToTouch(): void {
    this.IsTouch = true;
    this.IsMouse = false;

    this.listenToMouse();
  }
}
