using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SchoolChallenge.Data;
using SchoolChallenge.Models;

namespace SchoolChallenge.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SubjectController : ControllerBase
    {
    
        private readonly ILogger<SubjectController> _logger;
        private readonly IRepository _repo;
        public SubjectController(ILogger<SubjectController> logger,IRepository repo)
        {
            _logger = logger;
            _repo = repo;
        }
    [HttpGet]
    public async Task < IActionResult > Get() {
      try {
        var result = await _repo.GetAllSubjetcAsync();

        return Ok(result);
      } catch (Exception ex) {
        return BadRequest($"Erro: {ex.Message}");
      }
    }

    [HttpGet("{id}")]
    public async Task < IActionResult > GetBySubjectId(int id) {
      try {
        var subject = await _repo.GetSubjectAsyncById(id);
          if (subject == null) return NotFound();

        return Ok(subject);
      } catch (Exception ex) {
        return BadRequest($"Erro: {ex.Message}");
      }
    }

    [HttpPost]
    public async Task < IActionResult > post(Subject model) {
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
    public async Task < IActionResult > put(int id, Subject model) {
      try {
        var subject = await _repo.GetSubjectAsyncById(id);
        if (subject == null) return NotFound();

        _repo.Update(model);

        if (await _repo.SaveChangesAsync()) {
          return Ok(subject);
        }
      } catch (Exception ex) {
        return BadRequest($"Erro: {ex.Message}");
      }

      return BadRequest();
    }

    [HttpDelete("{id}")]
    public async Task < IActionResult > delete(int id) {
      try {
        var subject = await _repo.GetSubjectAsyncById(id);
        if (subject == null) return NotFound();

        _repo.Delete(subject);

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
