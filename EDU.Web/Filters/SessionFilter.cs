using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace EDU.Web.Filters
{
    public class SessionFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (context.HttpContext.Session.GetString("CurrentUser") == null)
            {
                context.Result = new RedirectToActionResult("LogIn", "Account", null);
            }
        }
    }
}
