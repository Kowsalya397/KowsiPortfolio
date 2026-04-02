using KowsiPortfolio.Services;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Configuration;
using MimeKit;
using System.Threading.Tasks;

public class EmailService : IEmailService
{
    private readonly IConfiguration _config;

    public EmailService(IConfiguration config)
    {
        _config = config;
    }

    public async Task SendEmailAsync(string name, string email, string message)
    {
        var settings = _config.GetSection("EmailSettings");

        var mimeMessage = new MimeMessage();

        mimeMessage.From.Add(new MailboxAddress(
            settings["SenderName"] ?? "",
            settings["SenderEmail"] ?? ""
        ));

        mimeMessage.To.Add(new MailboxAddress(
            "Admin",
            settings["SenderEmail"] ?? ""
        ));

        mimeMessage.Subject = "Contact Form Message";

        mimeMessage.Body = new TextPart("plain")
        {
            Text = $"Name: {name}\nEmail: {email}\nMessage:\n{message}"
        };

        using (var smtp = new SmtpClient())
        {
            await smtp.ConnectAsync(
                settings["SmtpServer"],
                int.Parse(settings["Port"] ?? "587"),
                SecureSocketOptions.StartTls
            );

            await smtp.AuthenticateAsync(
                settings["Username"] ?? "",
                settings["Password"] ?? ""
            );

            await smtp.SendAsync(mimeMessage);
            await smtp.DisconnectAsync(true);
        }
    }
}