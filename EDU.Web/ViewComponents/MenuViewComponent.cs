using EDU.Web.Services;
using Microsoft.AspNetCore.Mvc;

namespace EDU.Web.ViewComponents
{
    public class MenuViewComponent : ViewComponent
    {
        private readonly UserApiService _userApiService;
        public MenuViewComponent(UserApiService userApiService)
        {
            _userApiService = userApiService;
        }

        public async Task<IViewComponentResult> InvokeAsync(int roleId)
        {
            return View("_MenuPartial", await _userApiService.GetMenuItemAsync(roleId));
        }
    }
}
