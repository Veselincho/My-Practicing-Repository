global using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace Introduction_Examples
{
    public class Tests
    {

        [Test]
        public void firstStepsInWebDriver()
        {
            string url = "htts://wikipedia.org";

            //Create new driver (browser) to use
            var driver = new ChromeDriver();

            //Na
            driver.Navigate().GoToUrl(url);
            var searchBox = driver.FindElement(By.Id("searchInput"));
            searchBox.Click();
            searchBox.SendKeys("John Travolta" + Keys.Enter);
           
        }
    }
}