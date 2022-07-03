namespace EDU.Web.Models
{
    public class CustomResponseVM<T> where T : class
    {
        public T Data { get; set; }
        public List<string> Errors { get; set; }
        public int StatusCode { get; set; }
    }
}
