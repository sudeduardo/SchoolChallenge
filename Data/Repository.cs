using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SchoolChallenge.Models;

namespace SchoolChallenge.Data
{
    public class Repository : IRepository
    {
        public readonly Connection _context;

        public Repository(Connection context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }
        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }
        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }
        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }

        public async Task<Student[]> GetAllStudentAsync()
        {
            IQueryable<Student> query = _context.Students;
            query = query.AsNoTracking()
                         .OrderBy(c => c.Id);

            return await query.ToArrayAsync();
        }
        public async Task<Student> GetStudentAsyncById(int id)
        {
            IQueryable<Student> query = _context.Students;

            query = query.AsNoTracking()
                         .OrderBy(student => student.Id)
                         .Where(student => student.Id == id);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Subject[]> GetAllSubjetcAsync()
        {
            IQueryable<Subject> query = _context.Subjects;
            query = query.AsNoTracking()
                         .OrderBy(c => c.Id);

            return await query.ToArrayAsync();
        }
        public async Task<Subject> GetSubjectAsyncById(int id)
        {
            IQueryable<Subject> query = _context.Subjects;

            query = query.AsNoTracking()
                         .OrderBy(subject => subject.Id)
                         .Where(subject => subject.Id == id);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<List<Subject>> GetSubjetcsByIdsAsync(int[] ids)
        {
            IQueryable<Subject> query = _context.Subjects;

            query = query.AsNoTracking()
                         .OrderBy(subject => subject.Id)
                         .Where(subject => ids.Contains(subject.Id));

            return await query.ToListAsync();
        }

    }
}
