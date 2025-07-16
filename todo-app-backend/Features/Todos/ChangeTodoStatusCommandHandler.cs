using MediatR;
using todo_app_backend.Data;
using todo_app_backend.Models;

namespace todo_app_backend.Features.Todos
{
    public class ChangeTodoStatusCommandHandler : IRequestHandler<ChangeTodoStatusCommand, Todo>
    {
        private readonly TodoDbContext _context;

        public ChangeTodoStatusCommandHandler(TodoDbContext context)
        {
            _context = context;
        }

        public async Task<Todo> Handle(ChangeTodoStatusCommand request, CancellationToken cancellationToken)
        {
            var todo = await _context.Todo.FindAsync(request.Id);
            if (todo == null) throw new Exception("Todo not found");

            todo.Completed = request.Completed;
            await _context.SaveChangesAsync();

            return todo;
        }
    }
}
