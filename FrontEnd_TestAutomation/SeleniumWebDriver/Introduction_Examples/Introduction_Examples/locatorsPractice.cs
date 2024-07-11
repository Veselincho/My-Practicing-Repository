using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace Introduction_Examples
{
    [TestFixture]
    public class LocatorsPractice
    {
        private string baseUrl = "file:///C:/Users/VesoPC/Desktop/My-Practicing-Repository/FrontEnd_TestAutomation/SeleniumWebDriver/Introduction_Examples/simpleForm";

        private IWebDriver driver;

        [OneTimeSetUp]
        public void OneTimeSetup()
        {
            // One-time setup code (runs once before any tests in this fixture)
            driver = new ChromeDriver();
            driver.Navigate().GoToUrl(baseUrl);
            // Additional setup code if needed
        }

        [OneTimeTearDown]
        public void OneTimeTearDown()
        {
            // One-time teardown code (runs once after all tests in this fixture)
            driver.Quit();
        }

        [SetUp]
        public void Setup()
        {
            // Setup code that runs before each test method
            // For example, logging in or navigating to a specific page
        }

        [TearDown]
        public void TearDown()
        {
            // Teardown code that runs after each test method
            // For example, logging out or cleaning up resources
        }

        [Test]
        public void ExampleTest()
        {
            // Example test method
            // Use driver to interact with the web page and perform assertions
        }

        // Add more test methods as needed

    }
}
