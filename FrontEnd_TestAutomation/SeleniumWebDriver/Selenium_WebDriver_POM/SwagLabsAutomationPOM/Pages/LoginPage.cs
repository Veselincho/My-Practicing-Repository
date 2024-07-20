using OpenQA.Selenium;

namespace SwagLabsAutomationPOM.Pages
{
    public class LoginPage : BasePage
    {
        // mapping locators:

        private readonly By usernameField = By.XPath("//div[@class='form_group']//input[@placeholder='Username']");
        private readonly By passwordField = By.XPath("//div[@class='form_group']//input[@placeholder='Password']");
        private readonly By loginButton = By.CssSelector("#login-button");
        private readonly By errorMessage = By.CssSelector("h3");
        private readonly By clearErrorMessageButton = By.CssSelector("#login_button_container > div > form > div.error-message-container.error > h3 > button");

        //By: This is a class in Selenium WebDriver that is used to locate web elements on a web page. 

        public LoginPage(IWebDriver driver) : base(driver)
        {
            
        }

        public void FillUserName(string username)
        {
            Type(usernameField, username);
        }

        public void FillPassword(string password)
        {
            Type(passwordField, password);  
        }

        public void ClickLoginButton()
        {
            Click(loginButton); 
        }

        public string GetErrorMessage()
        {
            return GetText(errorMessage); 
        }

        public void LoginUser(string username, string password)
        {
            FillUserName(username); 
            FillPassword(password);
            ClickLoginButton();
        }
    }
}
