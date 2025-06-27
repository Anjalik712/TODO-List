using MediatR;
using todo_app_backend.Models;

namespace todo_app_backend.Features.Todos
{
    public record CreateTodoCommand(string Task, DateTime DueDate, bool Completed ) : IRequest<Todo>;
  
}
