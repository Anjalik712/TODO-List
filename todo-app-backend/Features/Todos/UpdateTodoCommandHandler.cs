using MediatR;
using Microsoft.VisualBasic;
using todo_app_backend.Data;
using todo_app_backend.Models;

namespace todo_app_backend.Features.Todos
{
    public class UpdateTodoCommandHandler : IRequestHandler<UpdateTodoCommand, Todo>
    {
        private readonly TodoDbContext _context;

        public UpdateTodoCommandHandler(TodoDbContext context)
        {
            _context = context;
        }

        public async Task<Todo> Handle(UpdateTodoCommand request, CancellationToken cancellationToken)
        {
            var todo = await _context.Todo.FindAsync(request.Id);
            if (todo == null) throw new Exception("Todo not found");

            todo.Task = request.Task;
            todo.DueDate = request.DueDate;

            await _context.SaveChangesAsync();
            return todo;
        }
    }

}
