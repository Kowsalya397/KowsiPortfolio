using KowsiPortfolio.Models;
using KowsiPortfolio.Services;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace KowsiPortfolio.Controllers
{
    public class HomeController : Controller
    {
        private readonly IEmailService _emailService;

        public HomeController(IEmailService emailService)
        {
            _emailService = emailService;
        }

        public IActionResult Index()
        {
            return View(new ContactModel());
        }

        //[HttpPost]
        //public async Task<IActionResult> SendMessage(ContactModel model)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        await _emailService.SendEmailAsync(model.Name, model.Email, model.Message);
        //        ViewBag.Success = "Message sent successfully!";
        //    }

        //    return View("Index", model);
        //}

        [HttpPost]
        public async Task<IActionResult> SendMessage(ContactModel model)
        {
            if (ModelState.IsValid)
            {
                await _emailService.SendEmailAsync(model.Name, model.Email, model.Message);

                ViewBag.Success = "Message sent successfully!";

                ModelState.Clear();

                return View("Index");
            }

            return View("Index", model);
        }

        public IActionResult ViewResume()
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/files/KowsalyaS.pdf");
            return PhysicalFile(filePath, "application/pdf");
        }

        public IActionResult DownloadResume()
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/files/KowsalyaS.pdf");
            return File(System.IO.File.ReadAllBytes(filePath), "application/pdf", "KowsalyaS.pdf");
        }
    }

}
