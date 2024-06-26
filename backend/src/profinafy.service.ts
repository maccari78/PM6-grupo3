import { Injectable, OnModuleInit } from '@nestjs/common';
import * as leoProfanity from 'leo-profanity';

@Injectable()
export class ProfanityFilterService implements OnModuleInit {
  onModuleInit() {
    const wordExclude = [
      'henry',
      'fracasados',
      'fracasado',
      'fracasar',
      'fracasada',
      'soyhenry',
      'pene',
      'pija',
      'pito',
      'tetas',
      'culo',
      'puta',
      'puto',
      'estudiar',
      'saturar',
      'saturado',
      'tonto',
      'mogolico',
      'mogolica',
      'chota',
      'chotas',
      'mierda',
      'pelotudo',
      'pelotuda',
      'pajero',
      'pajera',
      'estupido',
      'estupida',
    ];
    leoProfanity.add(wordExclude);
  }
}
