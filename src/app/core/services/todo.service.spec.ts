import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { ITodo } from '../models/todo.model';

interface TodoServiceTestContext {
  service: TodoService;
  httpMock: HttpTestingController;
}

describe('TodoService', () => {
  // Reusable setup method to get instances
  const setup = (): TodoServiceTestContext => {
    const service = TestBed.inject(TodoService);
    const httpMock = TestBed.inject(HttpTestingController);
    return { service, httpMock };
  };

  const mockTodos: ITodo[] = [
    { id: 1, task: 'Learn Angular', dueDate: '01-07-2025', completed: false },
    { id: 2, task: 'Build Todo App', dueDate: '02-07-2025', completed: true },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoService, provideHttpClient(), provideHttpClientTesting()],
    });
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it('should return a non-null service instance', () => {
    const { service } = setup();
    expect(service).toBeTruthy();
  });

  it('should return correct list of todos', () => {
    const { service, httpMock } = setup();

    service.getAllTodos().subscribe((todos) => {
      expect(todos).toEqual(mockTodos);
    });

    const req = httpMock.expectOne('todos');
    expect(req.request.method).toBe('GET');
    req.flush(mockTodos);
  });

  it('should return empty list when no todos are available', () => {
    const { service, httpMock } = setup();

    service.getAllTodos().subscribe((todos) => {
      expect(todos.length).toBe(0);
    });

    const req = httpMock.expectOne('todos');
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should propagate 404 error correctly', () => {
    const { service, httpMock } = setup();
    const errorMessage = 'Failed to fetch todos';

    service.getAllTodos().subscribe({
      next: () => fail('Expected an error'),
      error: (error) => {
        expect(error.status).toBe(404);
      },
    });

    const req = httpMock.expectOne('todos');
    expect(req.request.method).toBe('GET');
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });

  it('should call correct API endpoint', () => {
    const { service, httpMock } = setup();

    service.getAllTodos().subscribe();

    const req = httpMock.expectOne('todos');
    expect(req.request.url).toBe('todos');
    req.flush(mockTodos);
  });
});
