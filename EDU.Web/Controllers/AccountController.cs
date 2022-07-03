using EDU.Web.Models.UserViewModels;
using EDU.Web.Services;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace EDU.Web.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserApiService _userApiService;

        public AccountController(UserApiService userApiService)
        {
            _userApiService = userApiService;
        }

        [HttpGet]
        public IActionResult LogIn()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> LogIn(LoginVM login)
        {
            var response = await _userApiService.LoginAsync(login);
            if (response != null)
            {            
                HttpContext.Session.SetString("CurrentUser", JsonSerializer.Serialize(response));
                return RedirectToAction("Index", "Home");
            }
            return View();
        }
    }
}
