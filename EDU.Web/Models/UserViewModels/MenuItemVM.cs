namespace EDU.Web.Models.UserViewModels
{
    public class MenuItemVM : BaseVM
    {
        public string Name { get; set; }
        public string Url { get; set; }
        public string IconPath { get; set; }
        public int RowNumber { get; set; }
    }
}
