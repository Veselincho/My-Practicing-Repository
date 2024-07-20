using OpenQA.Selenium;

namespace SwagLabsAutomationPOM.Pages
{
    public class HiddenMenuPage : BasePage
    {
        public HiddenMenuPage(IWebDriver driver) : base(driver) 
        {
            
        }

        private readonly By menuButton = By.CssSelector("#react-burger-menu-btn");
        private readonly By logoutButton = By.XPath("//nav//a[3]");

        public void ClickMenuButton()
        {
            Click(menuButton);
        }

        public void ClickLogoutButton()
        {
            ClickMenuButton();
            ClickLogoutButton();
        }

        public bool IsMenuOpen()
        {
            return FindElement(menuButton).Displayed;
        }
    }
}
