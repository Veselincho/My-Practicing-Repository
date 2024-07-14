global using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
namespace Selenium_Waits
{
    public class SeleniumWaits
    {
        string url = "https://www.selenium.dev/selenium/web/dynamic.html";

        [SetUp] // beforeEach()
        public void Setup()
        {
            IWebDriver driver = new ChromeDriver();
            
        }

        [Test]
        public void Test1()
        {
            Assert.Pass();
        }
    }
}