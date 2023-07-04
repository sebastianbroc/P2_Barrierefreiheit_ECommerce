using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GuidelineAPI.Migrations
{
    /// <inheritdoc />
    public partial class version001 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    Username = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    ProfilePicture = table.Column<string>(type: "text", nullable: false),
                    IsExpert = table.Column<bool>(type: "boolean", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Qualification = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Guidelines",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    Authorid = table.Column<Guid>(type: "uuid", nullable: false),
                    Text = table.Column<string>(type: "text", nullable: false),
                    ApprovedBy = table.Column<List<Guid>>(type: "uuid[]", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Guidelines", x => x.id);
                    table.ForeignKey(
                        name: "FK_Guidelines_Users_Authorid",
                        column: x => x.Authorid,
                        principalTable: "Users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Comments",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    WrittenByid = table.Column<Guid>(type: "uuid", nullable: false),
                    Text = table.Column<string>(type: "text", nullable: false),
                    UpVotes = table.Column<int>(type: "integer", nullable: false),
                    DownVotes = table.Column<int>(type: "integer", nullable: false),
                    Guidelineid = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comments", x => x.id);
                    table.ForeignKey(
                        name: "FK_Comments_Guidelines_Guidelineid",
                        column: x => x.Guidelineid,
                        principalTable: "Guidelines",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_Comments_Users_WrittenByid",
                        column: x => x.WrittenByid,
                        principalTable: "Users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Comments_Guidelineid",
                table: "Comments",
                column: "Guidelineid");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_WrittenByid",
                table: "Comments",
                column: "WrittenByid");

            migrationBuilder.CreateIndex(
                name: "IX_Guidelines_Authorid",
                table: "Guidelines",
                column: "Authorid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Comments");

            migrationBuilder.DropTable(
                name: "Guidelines");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
