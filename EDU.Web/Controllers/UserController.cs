using Microsoft.AspNetCore.Mvc;

namespace EDU.Web.Controllers
{
    public class UserController : Controller
    {
        public IActionResult All()
        {
            return View();
        }
    }
}
