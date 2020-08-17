using System;
using System.ComponentModel.DataAnnotations;
using AbpXAmis.Books;

namespace AbpXAmis.Web.Pages.Books.Book.ViewModels
{
    public class CreateEditBookViewModel
    {
        [Display(Name = "BookName")]
        public string Name { get; set; }

        [Display(Name = "BookType")]
        public BookType Type { get; set; }

        [Display(Name = "BookPublishDate")]
        public DateTime PublishDate { get; set; }

        [Display(Name = "BookPrice")]
        public float Price { get; set; }
    }
}