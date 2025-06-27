using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using todo_app_backend.Data;
using todo_app_backend.Features.Todos;
using todo_app_backend.Models;

namespace todo_app_backend.Controllers
{
    [Route("api/todos")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly IMediator _mediator;
        public TodoController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Todo>>> GetAllTodos()
        {
            var todos = await _mediator.Send(new Features.Todos.GetAllTodosQuery());
            return Ok(todos);
        }
        [HttpPost]
        public async Task<IActionResult> CreateTodo([FromBody] CreateTodoCommand command)
        {
            var todo=await _mediator.Send(command);
            return Ok(todo);
        }
    }
}
