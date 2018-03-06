import { Pipe, PipeTransform } from '@angular/core';
import { ExpenseStaff } from '../interface/expenseStaff.interface';

@Pipe({
    name: 'expenseStaffFilter',
    pure: false
})

export class ExpenseStaffFilterPipe implements PipeTransform {
    transform(items: ExpenseStaff[], filter: ExpenseStaff): ExpenseStaff[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: ExpenseStaff) => this.applyFilter(item, filter));
  }
  
    applyFilter(item: ExpenseStaff, filter: ExpenseStaff): boolean {
        for (let field in filter) {

      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (item[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
            if (item[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}