using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using StudentsRegistryPOM.Pages;

namespace StudentsRegistryPOM.PagesTests
{
   //basetests.cs is designed to be inherited by all other test classes. By doing so, you ensure that the setup and teardown methods for the
   //WebDriver are automatically applied to all your tests without having to duplicate the setup and teardown code in each test class
    public class BaseTests 
    {
        protected IWebDriver driver;

        [OneTimeSetUp]
        public void OneTimeSetup()
        {
            driver = new ChromeDriver();
        }
     
        [OneTimeTearDown]
        public void OneTimeTearDown()
        {
            driver.Quit();
            driver.Dispose();
        }
    }


}
