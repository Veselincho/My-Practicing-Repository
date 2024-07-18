using OpenQA.Selenium;

namespace StudentsRegistryPOM.Pages
{
    public class BasePage
    {
        protected readonly IWebDriver driver;
        public virtual string PageUrl { get; }

        // build a ctor
        public BasePage(IWebDriver driver)  
        {
            this.driver = driver;
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(5);  
        }

        public IWebElement HomeLink => driver.FindElement(By.CssSelector("a[href='/']"));
        public IWebElement ViewStudentLink => driver.FindElement(By.CssSelector("a[href='/students']"));
        public IWebElement AddStudentLink => driver.FindElement(By.CssSelector("a[href='/add-student']"));
        public IWebElement PageHeading => driver.FindElement(By.CssSelector("body > h1"));
        
        public void OpenPage()
        {
            driver.Navigate().GoToUrl(PageUrl);     
        }

        public bool IsPageOpen()
        {
            return driver.Url == this.PageUrl; // returns true or false depending on the cond
        }

        public string GetPageTitle()
        {
            return driver.Title;
        }

        public string GetPageHeading()
        {
            return PageHeading.Text;
        }   
    }
}