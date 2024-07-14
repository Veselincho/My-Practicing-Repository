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
            var options = new ChromeOptions();
            options.AddArgument("--headless");
            driver = new ChromeDriver(options);
        }

        [TearDown] // afterEach()
        public void Teardown()
        {
            driver.Quit();
            driver.Dispose();
        }

        [Test]
        public void AddBoxWhitoutWaitsFails()
        {
            driver.Navigate().GoToUrl(url);
            driver.FindElement(By.Id("#adder")).Click();
            var box = driver.FindElement(By.CssSelector("#box0"));
            Assert.That(box.Displayed, Is.True);
        }



       
    }
}
