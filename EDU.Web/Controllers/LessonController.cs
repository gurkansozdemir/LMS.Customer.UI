using Microsoft.AspNetCore.Mvc;

namespace EDU.Web.Controllers
{
    public class LessonController : Controller
    {
        public IActionResult All()
        {
            return View();
        }
    }
}
