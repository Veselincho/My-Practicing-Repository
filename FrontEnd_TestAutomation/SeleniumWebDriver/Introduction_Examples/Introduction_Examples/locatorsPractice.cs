using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace Introduction_Examples
{
    [TestFixture]
    public class LocatorsPractice
    {
        private string baseUrl = "file:///C:/Users/VesoPC/Desktop/My-Practicing-Repository/FrontEnd_TestAutomation/SeleniumWebDriver/Introduction_Examples/simpleForm/Locators.html";

        private IWebDriver driver;

        [OneTimeSetUp]
        public void OneTimeSetup() // nodeJS playwright analog => beforeAll()
        {
            driver = new ChromeDriver();
            driver.Navigate().GoToUrl(baseUrl);
        }

        [OneTimeTearDown] // nodeJS playwright analog => afterAll()
        public void OneTimeTearDown()
        {
            driver.Quit();
        }

        [Test]
        public void ExampleTest()
        {

        }

        

    }
}
