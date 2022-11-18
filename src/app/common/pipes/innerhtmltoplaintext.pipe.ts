import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'innerhtmltoplaintext'
})
export class InnerhtmltoplaintextPipe implements PipeTransform {

  transform(value: string | undefined): string {
    if(value==undefined){
      return '';
    }
    return value.replace(/<[^>]+>/g, '').replace(/[$#-;]/g,' ');
  }

}
