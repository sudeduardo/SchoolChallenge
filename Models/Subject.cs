using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SchoolChallenge.Models
{
    public class Subject
    {
         [Key]
        public int Id {get;set;}
        public string Name {get;set;}
        public string Teacher {get;set;}
         public List<Student> students {get;set;}
    }
}