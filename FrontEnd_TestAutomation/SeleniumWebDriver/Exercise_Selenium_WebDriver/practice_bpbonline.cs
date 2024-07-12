global using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using static System.Net.WebRequestMethods;

namespace Exercise_Selenium_WebDriver
{
    [TestFixture]
    public class BPB_Tests
    {
        private IWebDriver driver;
        string url = "https://practice.bpbonline.com/";

        [SetUp]
        public void Setup()
        {
            driver = new ChromeDriver();
            // Create Chrome options
            var options = new ChromeOptions();
            options.AddArgument("--headless"); // Enable headless mode
        }

        [TearDown]
        public void TearDown()
        {
            driver.Quit();
            driver.Dispose();
        }

        [Test, Order(1)]
        public void HandlingFormInput()
        {
            driver.Navigate().GoToUrl(url);
            driver.FindElement(By.XPath("//span[a][3]//a")).Click();
            driver.FindElement(By.XPath("//span[@class='ui-button-text' and text()='Continue']")).Click();

        }
    }
}
