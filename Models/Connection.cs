using Microsoft.EntityFrameworkCore;

namespace SchoolChallenge.Models
{
    public class Connection:DbContext
    {
        private static bool _created = false;
        public Connection(DbContextOptions<Connection> options) : base (options) {
            if (!_created)
            {
                _created = true;
                Database.EnsureDeleted();
                Database.EnsureCreated();
                }
        }   
        public DbSet<Student> Students{ get; set; }
        public DbSet<Subject> Subjects { get; set; }

    }
}