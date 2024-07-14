global using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace Selenium_Waits
{
    [TestFixture]
    public class SeleniumWaits
    {
        private IWebDriver driver;
        private readonly string url = "https://www.selenium.dev/selenium/web/dynamic.html";

        [SetUp] // beforeEach()
        public void Setup()
        {
            driver = new ChromeDriver();
            var options = new ChromeOptions();
        }

        [Test]
        public void Test1()
        {
            driver.Navigate().GoToUrl(url);
            Assert.Pass();
        }

        [TearDown] // afterEach()
        public void Teardown()
        {
            driver.Quit();
            driver.Dispose();
        }
    }
}
