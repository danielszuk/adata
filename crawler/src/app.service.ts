import { Injectable } from '@nestjs/common';
import * as Puppeteer from 'puppeteer';
import { Env } from './modules/util/env';
import { Logger } from './modules/util/logger';
import { AwsS3Service } from './modules/aws/aws-s3/aws-s3.service';

const logger = new Logger('AppService');

@Injectable()
export class AppService {
  constructor(private readonly s3: AwsS3Service) {}

  public async visualizationScreenshot(id: number) {
    const browser = await Puppeteer.launch();
    const page = await browser.newPage();
    page.setViewport({
      width: Env.CRAWLER_WIDTH,
      height: Env.CRAWLER_HEIGHT,
      deviceScaleFactor: Env.CRAWLER_DEVICE_SCALE,
    });

    await page.goto(`${Env.FE_URL}/visualization/${id}/full-screen`, {
      waitUntil: 'networkidle0',
    });
    const buffer = await page.screenshot({ type: 'jpeg' });
    this.s3.uploadFile(
      Env.AWS_BUCKET_VISUALIZATION_SCREEN_SHOTS,
      `${id}.jpg`,
      buffer,
      { public: true },
    );
  }
}
