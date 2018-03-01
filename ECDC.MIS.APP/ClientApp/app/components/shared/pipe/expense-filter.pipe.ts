import { Pipe, PipeTransform } from '@angular/core';
import { Expense } from '../interface/expense.interface';

@Pipe({
    name: 'expenseFilter',
    pure: false
})

export class ExpenseFilterPipe implements PipeTransform {
    transform(items: Expense[], filter: Expense): Expense[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: Expense) => this.applyFilter(item, filter));
  }
  
    applyFilter(expense: Expense, filter: Expense): boolean {
        for (let field in filter) {

      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (expense[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
            if (expense[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}