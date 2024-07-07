global using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace Introduction_Examples
{
    public class FirstTest
    {
        private IWebDriver driver;
        private string url = "https://nakov.com/";

        [TearDown]
        public void TearDown()
        {
            driver.Quit();
            //driver.Dispose();
        }

        [SetUp]
        public void SetUp()
        {
            driver = new ChromeDriver();
        }

        [Test]
        public void GetTitle()
        {
            driver.Navigate().GoToUrl(url);
            string title = driver.Title;
            Console.WriteLine(title);
            Assert.That(title, Is.EqualTo("Svetlin Nakov - Svetlin Nakov – Official Web Site and Blog"));
        }

        [Test]
        public void MatchPlaceholderValue()
        {
            driver.Navigate().GoToUrl(url);
            driver.FindElement(By.CssSelector("a[href=\"#search\"]")).Click();
            var element = driver.FindElement(By.CssSelector("form #s"));
            var attributeValue = element.GetAttribute("placeholder");
            Assert.That(attributeValue, Is.EqualTo("Search this site"));
        }
    }

}
