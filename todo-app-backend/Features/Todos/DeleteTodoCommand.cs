using MediatR;

namespace todo_app_backend.Features.Todos
{
    public record DeleteTodoCommand(int Id) : IRequest<Unit>;
}
