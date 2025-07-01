import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../../core/models/todo.model';

@Pipe({
  name: 'searchFilterPipe',
})
export class SearchFilterPipe implements PipeTransform {
  transform(value: Todo[], userSearchInput: string) {
    userSearchInput = userSearchInput ? userSearchInput.toLowerCase() : ''; //check if any input is there
    return userSearchInput
      ? value.filter(
          (todo) => todo.task.toLowerCase().indexOf(userSearchInput) > -1
        )
      : value;
  }
}
