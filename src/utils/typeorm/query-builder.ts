import { Brackets, SelectQueryBuilder } from 'typeorm';

export function addSingleConditionQuery(target: string) {
  return (fieldName: string, value: number | string) => {
    const paramName = `${fieldName}_0`; // Use a more descriptive name for clarity
    const where = `${target}.${fieldName} = :${paramName}`;
    const params = { [paramName]: value }; // Corrected to use dynamic key based on paramName
    return { where, params };
  };
}

export function addMultipleConditionQuery(target: string) {
  return (fieldName: string, values: Array<number | string>) => {
    return new Brackets((qb) => {
      values.forEach((val, index) => {
        const paramName = `${fieldName}_${index}`;
        const condition = `${target}.${fieldName} = :${paramName}`;
        // qb[index === 0 ? 'where' : 'orWhere'](condition, {
        //   [paramName]: val,
        // });
        qb.orWhere(condition, {
          [paramName]: val,
        });
      });
    });
  };
}

export function applyConditions<T>(
  targetTable: string,
  queryBuilder: SelectQueryBuilder<T>,
  // isDefaultAddWhere = true,
) {
  // if (isDefaultAddWhere) queryBuilder.where('1=1');
  return ({
    fieldName,
    values,
  }: {
    fieldName: string;
    values: number | string | Array<number | string>;
  }) => {
    if (Array.isArray(values)) {
      // For multiple values
      const bracketsQuery = addMultipleConditionQuery(targetTable)(
        fieldName,
        values as Array<string | number>,
      );
      queryBuilder.andWhere(bracketsQuery);
    } else {
      // For single value
      const singleValue = values as string | number;
      const { where, params } = addSingleConditionQuery(targetTable)(
        fieldName,
        singleValue,
      );
      queryBuilder.andWhere(where, params);
    }
  };
}
