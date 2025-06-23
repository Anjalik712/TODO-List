using Microsoft.EntityFrameworkCore;
using todo_app_backend.Models;

namespace todo_app_backend.Data
{
    public class TodoDbContext :DbContext
    {
        public TodoDbContext(DbContextOptions<TodoDbContext> options) : base(options)
        {
        }
        public DbSet<Todo> Todo { get; set; }
    }
}
