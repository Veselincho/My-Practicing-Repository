using OpenQA.Selenium;

namespace StudentsRegistryPOM.Pages
{
    public class BasePage
    {
        protected readonly IWebDriver driver;
        public virtual string PageUrl { get; }

        public BasePage(IWebDriver driver)
        {
            this.driver = driver;
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(5);  
        }

        
      


    }
}
