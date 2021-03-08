using System.Collections.Generic;
using System.Threading.Tasks;
using SchoolChallenge.Models;

namespace SchoolChallenge.Data
{
    public interface IRepository
    {
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveChangesAsync();

        Task<Student[]> GetAllStudentAsync();        
    
        Task<Student> GetStudentAsyncById(int id);

        Task<Subject[]> GetAllSubjetcAsync();
        Task<List<Subject>> GetSubjetcsByIdsAsync(int[] id);

        Task<Subject> GetSubjectAsyncById(int id);

        
        
    }
}