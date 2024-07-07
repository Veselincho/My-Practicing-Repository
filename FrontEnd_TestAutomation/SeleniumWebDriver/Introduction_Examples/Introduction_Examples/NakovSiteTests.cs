global using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace Introduction_Examples
{
    public class FirstTest
    {
        private IWebDriver driver;

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
            string url = "https://nakov.com/";
            driver.Navigate().GoToUrl(url);
            string title = driver.Title;
            Console.WriteLine(title);
            Assert.That(title, Is.EqualTo("Svetlin Nakov - Svetlin Nakov – Official Web Site and Blog"));
        }
    }

}
