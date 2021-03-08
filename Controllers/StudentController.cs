using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SchoolChallenge.Data;
using SchoolChallenge.Models;

namespace SchoolChallenge.Controllers {

  [ApiController]
  [Route("[controller]")]
  public class StudentController: ControllerBase {
    private readonly ILogger <StudentController> _logger;
    private readonly IRepository _repo;
    public StudentController(ILogger <StudentController> logger, IRepository repo) {
      _logger = logger;
      _repo = repo;
    }

    [HttpGet]
    public async Task < IActionResult > Get() {
      try {
        var result = await _repo.GetAllStudentAsync();

        return Ok(result);
      } catch (Exception ex) {
        return BadRequest($"Erro: {ex.Message}");
      }
    }

    [HttpGet("{id}")]
    public async Task < IActionResult > GetByStudentId(int id) {
      try {
        var student = await _repo.GetStudentAsyncById(id);
          if (student == null) return NotFound();

        return Ok(student);
      } catch (Exception ex) {
        return BadRequest($"Erro: {ex.Message}");
      }
    }

    [HttpPost]
    public async Task < IActionResult > post(Student model) {
      try {

         _repo.Add(model);
        if (await _repo.SaveChangesAsync()) {
          return Ok(model);
        }
      } catch (Exception ex) {
        return BadRequest($"Erro: {ex.Message}");
      }

      return BadRequest();
    }

    [HttpPut("{id}")]
    public async Task < IActionResult > put(int id, Student model) {

       try
            {
                var aluno = await _repo.GetStudentAsyncById(id);
                if(aluno == null) return NotFound();
                model.Id = id;
                _repo.Update(model);

                if(await _repo.SaveChangesAsync())
                {
                    return Ok(model);
                }                
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }

            return BadRequest();
    }

    [HttpDelete("{id}")]
    public async Task < IActionResult > delete(int id) {
      try {
        var student = await _repo.GetStudentAsyncById(id);
        if (student == null) return NotFound();

        _repo.Delete(student);

        if (await _repo.SaveChangesAsync()) {
          return Ok();
        }
      } catch (Exception ex) {
        return BadRequest($"Erro: {ex.Message}");
      }

      return BadRequest();
    }

  }
}