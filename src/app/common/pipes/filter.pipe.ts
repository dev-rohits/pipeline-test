import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    const list: any[] = items.filter((it) => {
      const name = it.name ? it.name : it.categoryName
      return name.toLowerCase().includes(searchText);
    });
    if (list.length == 0) {
      list.push(null);
      return list;
    }
    return list;
  }
}
