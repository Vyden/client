import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSearchword'
})
export class FilterSearchwordPipe implements PipeTransform {

  transform(value: any, args?: any): any {
  
    // console.log('value is ', )

    return null;
  }


}
