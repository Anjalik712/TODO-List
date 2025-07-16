using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace todo_app_backend.Migrations
{
    /// <inheritdoc />
    public partial class casesensitivity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "task",
                table: "Todo",
                newName: "Task");

            migrationBuilder.RenameColumn(
                name: "dueDate",
                table: "Todo",
                newName: "DueDate");

            migrationBuilder.RenameColumn(
                name: "completed",
                table: "Todo",
                newName: "Completed");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Todo",
                newName: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Task",
                table: "Todo",
                newName: "task");

            migrationBuilder.RenameColumn(
                name: "DueDate",
                table: "Todo",
                newName: "dueDate");

            migrationBuilder.RenameColumn(
                name: "Completed",
                table: "Todo",
                newName: "completed");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Todo",
                newName: "id");
        }
    }
}
