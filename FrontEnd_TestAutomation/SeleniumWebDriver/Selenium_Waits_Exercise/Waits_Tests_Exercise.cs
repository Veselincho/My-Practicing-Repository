using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;

namespace Selenium_Waits_Exercise
{
    [TestFixture]
    public class Waits_Tests_Exercise
    {
        private string url = "https://practice.bpbonline.com/";
        private IWebDriver driver;

        [SetUp] // beforeEach()
        public void Setup()
        {
            var options = new ChromeOptions();
            // options.AddArgument("--headless"); //
            driver = new ChromeDriver(options); // Assign to the class-level driver
            // Setting implicit wait
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);
            // Navigate to the URL
            driver.Navigate().GoToUrl(url);
        }

        [TearDown] // afterEach()
        public void Teardown()
        {
            driver.Quit(); // 
            driver.Dispose();   
        }

        [Test, Order(1)]
        public void SearchProduct_Keyboard_ShouldAddToCard()
        {
            // Use implicit wait
            driver.FindElement(By.XPath("//form[@name='quick_find']//input[@type='text']")).SendKeys("keyboard" + Keys.Enter);

            try
            {
                driver.FindElement(By.XPath("//a[@id='tdb4']")).Click();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Unexpected exception: " + ex.Message);
            }

            // Assert that the cart page is displayed
            Assert.That(driver.PageSource.Contains("What's In My Cart?"));
            // kinda same
            Assert.True(driver.PageSource.Contains("What's In My Cart?"));
        }

   
    }
}
