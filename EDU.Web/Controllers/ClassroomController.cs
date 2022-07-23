using Microsoft.AspNetCore.Mvc;

namespace EDU.Web.Controllers
{
    public class ClassroomController : Controller
    {
        public IActionResult All()
        {
            return View();
        }
    }
}
