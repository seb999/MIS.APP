import { Pipe, PipeTransform } from '@angular/core';
import { Activity } from './activity';

@Pipe({
    name: 'activityFilter',
    pure: false
})

export class ActivityFilterPipe implements PipeTransform {
    transform(items: Activity[], filter: Activity): Activity[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: Activity) => this.applyFilter(item, filter));
  }
  
    applyFilter(activity: Activity, filter: Activity): boolean {
        for (let field in filter) {

      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (activity[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
            if (activity[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}