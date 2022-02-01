import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable()
export class AppService {
  private heroesService;

  constructor(@Inject('HERO_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.heroesService = this.client.getService('HeroesService');
  }

  async getHello(): Promise<any> {
    return lastValueFrom(this.getHero());
  }

  getHero(): Observable<any> {
    return this.heroesService.findOne({ id: 1 });
  }
}
