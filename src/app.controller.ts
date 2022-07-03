import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { resolve } from 'path';

@Controller()
export class AppController {
  @Get()
  public getApp(@Res() response: Response) {
    response.sendFile(resolve(__dirname, 'index.html'));
  }
}
