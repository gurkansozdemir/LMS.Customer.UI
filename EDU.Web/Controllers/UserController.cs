using EDU.Web.Models.UserViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

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
