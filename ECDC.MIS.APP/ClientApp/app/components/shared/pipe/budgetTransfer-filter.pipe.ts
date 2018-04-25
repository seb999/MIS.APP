import { Pipe, PipeTransform } from '@angular/core';
import { BudgetTransfer } from '../interface/budgetTransfer.interface';

@Pipe({
    name: 'budgetTransferFilter',
    pure: false
})

export class BudgetTransferFilterPipe implements PipeTransform {
    transform(items: BudgetTransfer[], filter: BudgetTransfer): BudgetTransfer[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
        return items.filter((item: BudgetTransfer) => this.applyFilter(item, filter));
  }
  
    applyFilter(budgetTransfer: BudgetTransfer, filter: BudgetTransfer): boolean {
        for (let field in filter) {

      if (filter[field]) {
        if (typeof filter[field] === 'string') {
            if (budgetTransfer[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
            if (budgetTransfer[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}