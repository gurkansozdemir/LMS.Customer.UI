using Microsoft.AspNetCore.Mvc;

namespace EDU.Web.Controllers
{
    public class AccountController : Controller
    {
        public IActionResult LogIn()
        {
            return View();
        }
    }
}
