using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace UserManagementApi.Migrations
{
    /// <inheritdoc />
    public partial class RemoveSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Activo", "Apellido", "Email", "FechaCreacion", "Nombre", "Rol" },
                values: new object[,]
                {
                    { 1, true, "Sistema", "admin@ejemplo.com", new DateTime(2025, 4, 18, 13, 54, 55, 528, DateTimeKind.Local).AddTicks(6743), "Admin", "Administrador" },
                    { 2, true, "Común", "usuario@ejemplo.com", new DateTime(2025, 4, 18, 13, 54, 55, 528, DateTimeKind.Local).AddTicks(6761), "Usuario", "Usuario" }
                });
        }
    }
}
