using Microsoft.AspNetCore.Mvc;

namespace EDU.Web.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
