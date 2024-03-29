import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';

interface ValidationResult<T> {
    isValid: boolean;
    validatedData?: T;
    errors?: string[];
}

export const validateData = async <T>(dto: any, data: T): Promise<ValidationResult<T>> => {
  const object = plainToInstance(dto, data);
  const errors: ValidationError[] = await validate(object as object);

  if (errors.length > 0) {
    const errorMessages = errors.map(error => Object.values(error.constraints || {}));
    return { isValid: false, errors: errorMessages.flat() };
  }

  return { isValid: true, validatedData: object as T };
};

