import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'customDate', async: true })
@Injectable()
export class CustomDateValidator implements ValidatorConstraintInterface {
  async validate(date: string) {
    const regexp = /^\d\d\d\d-W\d\d$/;

    return regexp.test(date);
  }

  defaultMessage() {
    return "Date must be in this format 'yyyy-Www'";
  }
}
