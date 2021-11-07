import { Pipe, PipeTransform } from '@angular/core';

import * as marked from 'marked';

@Pipe({
  name: 'markdown'
})
export class MarkdownPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    
    if (value && value.length > 0) {
      let markedValue = marked(value);
      console.log(markedValue);
      return markedValue;
    }
    return value;
  }

}
