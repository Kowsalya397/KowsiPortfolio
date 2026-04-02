using System.Threading.Tasks;

namespace KowsiPortfolio.Services
{
    public interface IEmailService
    {
        Task SendEmailAsync(string name, string email, string message); 
    }
}
