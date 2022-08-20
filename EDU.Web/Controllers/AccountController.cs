using EDU.Web.Models.UserViewModels;
using EDU.Web.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
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
                ClaimsIdentity claims = new ClaimsIdentity(CookieAuthenticationDefaults.AuthenticationScheme);
                claims.AddClaim(new Claim(ClaimTypes.Role, response.Role));
                var principal = new ClaimsPrincipal(claims);
                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);

                HttpContext.Session.SetString("CurrentUser", JsonSerializer.Serialize(response));
                return RedirectToAction("Index", "Home");
            }
            return View();
        }

        public async Task<IActionResult> AccessDenied()
        {
            return View();
        }

        public async Task<IActionResult> LogOut()
        {
            HttpContext.Session.Clear();
            await HttpContext.SignOutAsync();
            return RedirectToAction("LogIn");
        }
    }
}
