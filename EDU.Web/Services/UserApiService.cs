using EDU.Web.Models;
using EDU.Web.Models.UserViewModels;

namespace EDU.Web.Services
{
    public class UserApiService
    {
        private readonly HttpClient _httpClient;
        public UserApiService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<UserVM> LoginAsync(LoginVM login)
        {
            var response = await _httpClient.PostAsJsonAsync("user/login", login);
            if (!response.IsSuccessStatusCode) return null;
            var responseData = await response.Content.ReadFromJsonAsync<CustomResponseVM<UserVM>>();
            return responseData.Data;
        }

        public async Task<List<MenuItemVM>> GetMenuItemAsync(int id)
        {
            var response = await _httpClient.GetFromJsonAsync<CustomResponseVM<List<MenuItemVM>>>("user/getMenuItemsByRoleId/" + id);
            return response.Data;
        }
    }
}