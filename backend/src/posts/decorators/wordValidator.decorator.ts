// profanity-validator.ts
import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import * as leoProfanity from 'leo-profanity';

@Injectable()
@ValidatorConstraint({ async: false })
export class ProfanityValidator implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return typeof text === 'string' && !leoProfanity.check(text);
  }

  defaultMessage(args: ValidationArguments) {
    return 'El texto contiene palabras ofensivas';
  }
}

export function NoProfanity(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ProfanityValidator,
    });
  };
}
