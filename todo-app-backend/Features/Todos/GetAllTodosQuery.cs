using MediatR;
using todo_app_backend.Models;
namespace todo_app_backend.Features.Todos
{
    public class GetAllTodosQuery : IRequest<IEnumerable<Todo>>;
}
