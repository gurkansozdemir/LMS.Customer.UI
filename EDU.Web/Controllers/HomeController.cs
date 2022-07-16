using EDU.Web.Filters;
using EDU.Web.Models.UserViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace EDU.Web.Controllers
{
    [SessionFilter]
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            var response = JsonSerializer.Deserialize<UserVM>(HttpContext.Session.GetString("CurrentUser"));
            return View(response);
        }
    }
}
