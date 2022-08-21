using EDU.Web.Filters;
using Microsoft.AspNetCore.Mvc;

namespace EDU.Web.Controllers
{
    [SessionFilter]
    public class UserController : Controller
    {
        public IActionResult All()
        {
            return View();
        }

        public IActionResult AllStudents()
        {
            return View();
        }

        public IActionResult AllTeachers()
        { 
            return View();
        }
}
}
