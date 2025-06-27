import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../../core/models/todo.model';

@Pipe({
  name: 'searchFilterPipe',
})
export class SearchFilterPipe implements PipeTransform {
  transform(value: Todo[], userInput: string) {
    userInput = userInput ? userInput.toLowerCase() : '';
    return userInput
      ? value.filter(
          (data) => data.task.toLowerCase().indexOf(userInput) > -1
          // ||data.dueDate.toLowerCase().indexOf(userInput) > -1
        )
      : value;
  }
}
