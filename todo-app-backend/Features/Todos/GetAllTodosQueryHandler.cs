using MediatR;
using Microsoft.EntityFrameworkCore;
using todo_app_backend.Data;
using todo_app_backend.Models;

namespace todo_app_backend.Features.Todos
{
    public class GetAllTodosQueryHandler : IRequestHandler<GetAllTodosQuery, IEnumerable<Todo>>
    {
        private readonly TodoDbContext _context;
        public GetAllTodosQueryHandler(TodoDbContext context) {
            _context = context;
        }
        public async Task<IEnumerable<Todo>> Handle(GetAllTodosQuery request, CancellationToken cancellationToken)
        {
            return await _context.Todo.ToListAsync(cancellationToken);
        }
    }
}
