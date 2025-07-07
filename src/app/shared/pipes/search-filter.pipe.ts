import { Pipe, PipeTransform } from '@angular/core';
import { ITodo } from '../../core/models/ITodo.model';

@Pipe({
  name: 'searchFilterPipe',
})
export class SearchFilterPipe implements PipeTransform {
  transform(value: ITodo[], userSearchInput: string): ITodo[] {
    userSearchInput = userSearchInput ? userSearchInput.toLowerCase() : ''; //check if any input is there
    return userSearchInput
      ? value.filter(
          (todo) => todo.task.toLowerCase().indexOf(userSearchInput) > -1
        )
      : value;
  }
}
