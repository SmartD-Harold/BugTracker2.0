import { instanceToPlain } from 'class-transformer';

export function ResultToPlainWithoutMap() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      args.forEach((arg, index) => {
        if (!(arg instanceof Map)) {
          args[index] = instanceToPlain(arg);
        }
      });

      const result = originalMethod.apply(this, args);
      return result;
      // return instanceToPlain(result) || [];
    };

    return descriptor;
  };
}
