import { Controller, Get, Param, Delete } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('visualization/:id/screen-shot')
  async visualizationScreenshot(@Param('id') id: number) {
    return await this.appService.visualizationScreenshot(id);
  }

  @Delete('visualization/:id/screen-shot')
  async deleteVisualizationScreenshot(@Param('id') id: number) {
    return await this.appService.deleteVisualizationScreenshot(id);
  }
}
