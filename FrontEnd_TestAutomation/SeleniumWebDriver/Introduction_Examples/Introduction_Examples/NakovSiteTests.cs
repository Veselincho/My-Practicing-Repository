global using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Interactions;
using System;

namespace Introduction_Examples
{
    public class NakovWebsite
    {
        private IWebDriver driver;
        private string url = "https://nakov.com/";

        [SetUp]
        public void SetUp()
        {
            driver = new ChromeDriver();
        }

        [TearDown]
        public void TearDown()
        {
            driver.Quit();
            //driver.Dispose();
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

        [Test]
        public void NavBarLIElementsAreHiddenWithLessThan1153pxWidth()
        {
            driver.Navigate().GoToUrl(url);
            System.Drawing.Size windowSize = new System.Drawing.Size(1152, 300);
            driver.Manage().Window.Size = windowSize;
            Thread.Sleep(3000);

            var navBar = driver.FindElement(By.CssSelector("body > header > nav"));
            Assert.False(navBar.Displayed);

            // the media Queries I found
            // only screen and (max-width: 1152px) NON Visible
            // only screen and (max-width: 1153px) Visible
        }

        [Test]
        public void NavBarLIElementsAreVisibleWhenWidthIsGreaterThan1152()
        {
            driver.Navigate().GoToUrl(url);
            System.Drawing.Size windowSize = new System.Drawing.Size(2000, 353);
            driver.Manage().Window.Size = windowSize;
            Thread.Sleep(10000);

            var navBar = driver.FindElement(By.CssSelector("body > header > nav"));
            Assert.True(navBar.Displayed);

            // the conditions for media Queries I found:
            // only screen and (max-width: 1152px) NON Visible
            // only screen and (max-width: 1153px) Visible
        }
    }
}
