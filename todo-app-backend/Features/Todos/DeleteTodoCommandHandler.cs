using MediatR;
using todo_app_backend.Data;

namespace todo_app_backend.Features.Todos
{
    public class DeleteTodoCommandHandler : IRequestHandler<DeleteTodoCommand, bool>
    {
        private readonly TodoDbContext _context;

        public DeleteTodoCommandHandler(TodoDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Handle(DeleteTodoCommand request, CancellationToken cancellationToken)
        {
            var todo = await _context.Todo.FindAsync(request.Id);
            if (todo == null)
            {
                return false;
            }

            _context.Todo.Remove(todo);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
