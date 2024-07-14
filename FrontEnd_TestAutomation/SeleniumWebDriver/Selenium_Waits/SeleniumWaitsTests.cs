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
            driver.Navigate().GoToUrl(url);
        }

        [TearDown] // afterEach()
        public void Teardown()
        {
            driver.Quit();
            driver.Dispose();
        }

        [Test,Order(1)]
        public void AddBoxWhitoutWaitsFails()
        {
            driver.FindElement(By.Id("#adder")).Click();
            var box = driver.FindElement(By.CssSelector("#box0"));
            Assert.That(box.Displayed, Is.True);
        }

        [Test,Order(2)]
        public void RevealInputWhitoutWaitsFails()
        {
            driver.FindElement(By.Id("reveal")).Click();
            IWebElement revealed = driver.FindElement(By.Id("reveal"));
            revealed.SendKeys("Displayed");
            Assert.That(revealed.GetAttribute("value"), Is.EqualTo("Displayed"));
        }
    }
}
