using MediatR;
using todo_app_backend.Models;

namespace todo_app_backend.Features.Todos
{
    public record ChangeTodoStatusCommand(int Id, bool Completed) : IRequest<Todo>;

}
