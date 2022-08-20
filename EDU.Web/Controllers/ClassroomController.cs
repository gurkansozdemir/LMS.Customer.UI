using EDU.Web.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EDU.Web.Controllers
{
    //[SessionFilter]
    [Authorize(Roles = "Teacher,Supervisor")]
    public class ClassroomController : Controller
    {
        public IActionResult All()
        {
            return View();
        }

        public IActionResult Detail(int id)
        {
            return View(id);
        }
    }
}
