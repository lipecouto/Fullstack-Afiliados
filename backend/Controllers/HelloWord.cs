using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
    [Route("[controller]")]
    public class HelloWordController : ControllerBase
    {
        [HttpGet]
        public ActionResult<string> Get()
        {
            return "Hello, World!";
        }
    }