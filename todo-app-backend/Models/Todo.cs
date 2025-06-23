namespace todo_app_backend.Models
{
    public class Todo
    {
        public int id { get; set; }
        public string task { get; set; } = string.Empty;
        public DateTime dueDate { get; set; }
        public bool completed { get; set; }
    }
}
