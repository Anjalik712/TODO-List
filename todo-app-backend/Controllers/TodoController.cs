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
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateTodoCommand command)
        {
            if (id != command.Id) return BadRequest("ID mismatch");
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [HttpPatch("{id}/status")]
        public async Task<IActionResult> ChangeStatus(int id, [FromBody] bool completed)
        {
            var result = await _mediator.Send(new ChangeTodoStatusCommand(id, completed));
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _mediator.Send(new DeleteTodoCommand(id));
            return NoContent();
        }
    }
}
