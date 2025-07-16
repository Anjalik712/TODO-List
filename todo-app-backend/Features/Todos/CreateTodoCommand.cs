using MediatR;
using todo_app_backend.Models;

namespace todo_app_backend.Features.Todos
{
    public record CreateTodoCommand(string Task, DateOnly DueDate, bool Completed ) : IRequest<Todo>;
  
}
