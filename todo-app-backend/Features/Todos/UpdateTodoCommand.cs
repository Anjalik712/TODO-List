using MediatR;
using todo_app_backend.Models;

namespace todo_app_backend.Features.Todos
{
    public record UpdateTodoCommand(int Id, string Task, DateOnly DueDate) : IRequest<Todo>;

}
