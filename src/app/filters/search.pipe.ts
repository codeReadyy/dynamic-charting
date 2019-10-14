import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(item: any, searchText?: any, searchItem?:any): any {
    if(!item) return [];
    if(!searchText) return item;
    searchText = searchText.toLowerCase();
    
    return item.filter( value => {
      let searchFields =""      
      for(let tag of value.tags)
      {
        searchFields += tag;
      }
      searchFields +=value.name.first + value.name.last+value.address.house_number+value.address.street+ value.address.city+value.address.state+value.address.pincode;
      return searchFields.toLowerCase().includes(searchText);
    });
  }
}
