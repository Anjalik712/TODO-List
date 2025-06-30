import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TodoServices } from './todo.services';
import { Todo } from '../models/todo.model';

describe('TodoServices', () => {
  let service: TodoServices;
  let httpMock: HttpTestingController;
  const mockTodos: Todo[] = [
    { id: 1, task: 'Learn Angular', dueDate: '01-07-2025', completed: false },
    { id: 2, task: 'Build Todo App', dueDate: '02-07-2025', completed: true },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoServices,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(TodoServices);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all todos using GET request', () => {
    service.getAllTodos().subscribe((todos) => {
      expect(todos.length).toBe(2);
      expect(todos).toEqual(mockTodos);
      expect(todos[0].task).toBe('Learn Angular');
      expect(todos[1].completed).toBe(true);
    });

    const req = httpMock.expectOne('todos');
    expect(req.request.method).toBe('GET');
    req.flush(mockTodos);
  });

  it('should handle empty response', () => {
    const emptyTodos: Todo[] = [];

    service.getAllTodos().subscribe((todos) => {
      expect(todos).toEqual([]);
      expect(todos.length).toBe(0);
    });

    const req = httpMock.expectOne('todos');
    expect(req.request.method).toBe('GET');
    req.flush(emptyTodos);
  });

  it('should handle HTTP error', () => {
    const errorMessage = 'Failed to fetch todos';

    service.getAllTodos().subscribe({
      next: () => fail('Expected an error'),
      error: (error) => {
        expect(error.status).toBe(404);
        expect(error.statusText).toBe('Not Found');
      },
    });

    const req = httpMock.expectOne('todos');
    expect(req.request.method).toBe('GET');
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });

  it('should make request to correct endpoint', () => {
    service.getAllTodos().subscribe();

    const req = httpMock.expectOne('todos');
    expect(req.request.url).toBe('todos');
    req.flush(mockTodos);
  });
});
