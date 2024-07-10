global using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.DevTools.V124.Network;

namespace Introduction_Examples
{
    public class Wikipedia
    {
        private string path = "C:\\Users\\VesoPC\\Desktop\\My-Practicing-Repository\\FrontEnd_TestAutomation\\SeleniumWebDriver\\simpleForm";

        [Test]
        public void firstStepsInWebDriver()
        {
            
            string url = "https://wikipedia.org";

            //Create new driver (browser) to use
            var driver = new ChromeDriver();

            //Na
            driver.Navigate().GoToUrl(url);
            var searchBox = driver.FindElement(By.Id("searchInput"));
            searchBox.Click();
            searchBox.SendKeys("John Travolta" + Keys.Enter);
            var pageTitle = driver.Title;
            // I can see the print result in the TestExplorer/StandartOutput:
            Console.WriteLine(pageTitle);
            Assert.That(pageTitle,Is.EqualTo("John Travolta - Wikipedia"));
        }
    }
}