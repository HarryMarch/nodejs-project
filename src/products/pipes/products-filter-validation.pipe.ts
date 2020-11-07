import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ProductsFilterCriteria } from '../dto/products-filter.dto';

/**
 * This class is used to validate product filter query string object
 *
 * @export
 * @class ProductsFilterValidationPipe
 * @implements {PipeTransform}
 */
export class ProductsFilterValidationPipe implements PipeTransform {
  readonly allowedCriteria = [
    ProductsFilterCriteria.BRAND,
    ProductsFilterCriteria.COLOR,
    ProductsFilterCriteria.NAME,
  ];

  transform(filter: any) {
    if (!this.isValidCriterion(filter.criterion)) {
      throw new BadRequestException(`criterion is invalid`);
    }

    if (!filter.value) {
      throw new BadRequestException(`value is empty`);
    }

    return filter;
  }

  /**
   * Check if the criterion property in the Filter query string object is valid
   *
   * @private
   * @param {*} criterion The criterion property in the Filter query string object
   * @return {*}  {boolean} true if it is valid criterion, else false
   * @memberof ProductsFilterValidationPipe
   */
  private isValidCriterion(criterion: any): boolean {
    const index = this.allowedCriteria.indexOf(criterion);
    return index !== -1;
  }
}
