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
    }
}
