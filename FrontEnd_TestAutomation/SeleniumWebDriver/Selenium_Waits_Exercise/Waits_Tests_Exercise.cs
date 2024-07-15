global using NUnit.Framework;
using OpenQA.Selenium; // the general web driver
using OpenQA.Selenium.Chrome; // for chrome driver 
using OpenQA.Selenium.Support; // for waits
namespace Selenium_Waits_Exercise

{
    [TestFixture]
    public class Waits_Tests_Exercise
    {
        private string url = "https://practice.bpbonline.com/";
        private IWebDriver driver;

        [SetUp] //beforeEach()
        public void Setup()
        {
            var options = new ChromeOptions();
          //  options.AddArgument("--headless");
            IWebDriver driver = new ChromeDriver(options);
            driver.Navigate().GoToUrl(url); 
        }

        [TearDown] // afterEach()
        public void Teardown() 
        {
            driver.Close();
            driver.Dispose(); 
        }      

        [Test,Order(1)]
        public void SearchProductWithImplicitWait()
        {

        }
    }
}