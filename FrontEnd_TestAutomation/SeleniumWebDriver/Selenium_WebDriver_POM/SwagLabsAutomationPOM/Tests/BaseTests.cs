using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using SwagLabsAutomationPOM.Pages;

namespace SwagLabsAutomationPOM.Tests
{
    public class BaseTests
    {
        protected IWebDriver driver;

        [SetUp]
        public void Setup()
        {
            var options = new ChromeOptions();
            options.AddUserProfilePreference("credentials_enable_service", false);
            // This setting, when set to false, disables the password saving prompt
            options.AddUserProfilePreference("profile.password_manager_enabled", false);
            // This setting, when set to false, disables the password manager itself
            //when set to false disables the password manager functionality in Chrome,
            //which includes not only the prompt to save credentials but also the autofill of saved passwords.


            // options.AddArgument("--headless");
            driver = new ChromeDriver(options);

            driver.Manage().Window.Maximize();
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);  
        }

        [TearDown]
        public void Teardown()
        {
            if (driver != null)
            {
                driver.Quit();
                driver.Dispose();
            }
        }

        protected void Login(string username, string password)
        {
            driver.Navigate().GoToUrl("https://www.saucedemo.com/");
            var loginPage = new LoginPage(driver);
            loginPage.LoginUser(username, password);
        }
    }
}