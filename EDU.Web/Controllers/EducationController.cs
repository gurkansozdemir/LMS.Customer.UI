using Microsoft.AspNetCore.Mvc;

namespace EDU.Web.Controllers
{
    public class EducationController : Controller
    {
        public IActionResult All()
        {
            return View();
        }
    }
}
