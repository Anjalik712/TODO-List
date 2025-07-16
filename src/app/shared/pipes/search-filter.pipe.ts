import { Pipe, PipeTransform } from '@angular/core';

import { ITodo } from '../../core/models/todo.model';
/**
 * Filters the list of todos based on the search input.
 * @param value - The array of todo items.
 * @param userSearchInput - The search term entered by the user.
 * @returns A filtered list of todos that match the search input.
 */
@Pipe({
  name: 'searchFilterPipe',
})
export class SearchFilterPipe implements PipeTransform {
  transform(value: ITodo[], userSearchInput: string): ITodo[] {
    // Convert input to lowercase if it's provided; else use empty string
    userSearchInput = userSearchInput ? userSearchInput.toLowerCase() : '';

    // Return filtered list if input exists, else return original list
    return userSearchInput
      ? value.filter(
          (todo) => todo.task.toLowerCase().indexOf(userSearchInput) > -1
        )
      : value;
  }
}
