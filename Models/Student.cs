using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SchoolChallenge.Models
{
    public class Student
    {
        [Key]
        public int Id {get;set;}
        public string RegistrationCode {get;set;}
        public string Cpf {get;set;}
        public string Name {get;set;}
        public string Photo {get;set;}
        public string ClassName {get;set;}
        public List<Subject> Subjects {get;set;}
    }
}