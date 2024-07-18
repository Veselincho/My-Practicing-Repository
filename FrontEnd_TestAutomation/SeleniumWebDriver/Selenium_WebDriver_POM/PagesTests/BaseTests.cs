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

        //declare OneTimeSetUp and OneTimeTearDown in the base class, NUnit automatically executes
        //them for every derived test class without needing any explicit calls in those classes.
        [OneTimeSetUp]
        public void OneTimeSetUp()
        {
            var options = new ChromeOptions();
            options.AddArgument("--headless");
            driver = new ChromeDriver(options);
        }
     
        [OneTimeTearDown]
        public void OneTimeTearDown()
        {
            driver.Quit();
            driver.Dispose();
        }

        // baseTests class does not need any [Test] attributes,it serves solely as a foundational setup for other test classes ^^ 
    }
}
