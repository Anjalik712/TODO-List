using MediatR;
using todo_app_backend.Data;
using todo_app_backend.Models;

namespace todo_app_backend.Features.Todos
{
    public class CreateTodoCommandHandler : IRequestHandler<CreateTodoCommand, Todo>
    {
        private readonly TodoDbContext _context;
        public CreateTodoCommandHandler(TodoDbContext context)
        {
            _context = context;
        }
        public async Task<Todo> Handle(CreateTodoCommand request, CancellationToken cancellationToken)
        {
            var todo = new Todo { Task = request.Task, DueDate = request.DueDate, Completed = request.Completed };
            _context.Todo.Add(todo);
            await _context.SaveChangesAsync();
            return todo;
        }
    }
}
