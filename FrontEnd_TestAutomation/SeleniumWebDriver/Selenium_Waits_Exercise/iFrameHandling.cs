using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.DevTools.V124.Page;
using OpenQA.Selenium.Support.UI;
using SeleniumExtras.WaitHelpers;

namespace Selenium_Waits_Exercise
{
    [TestFixture]
    public class iFrameHandling
    {
        private IWebDriver driver;
        private const string URL = "https://codepen.io/pervillalva/full/abPoNLd";

        [SetUp]
        public void Setup()
        {
            driver = new ChromeDriver();
            driver.Navigate().GoToUrl(URL); 
        }
        [TearDown]
        public void TearDown()
        {
            driver.Quit();      
            driver.Dispose();           
        }

        [Test]
        public void FindElementWithoutFrameFails()
        {
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(3); // set implicit to load the page properly
            WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(3));

            //regular explicit wait
            wait.Until(ExpectedConditions.ElementIsVisible(By.CssSelector("div[class='dropdown'] .dropbtn")));
        }

        [Test]
        public void FindElementWithIFramePasses()
        {
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(3); // set implicit to load the page properly
            WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(3));

            //wait until frame is found and switch to it
            wait.Until(ExpectedConditions.FrameToBeAvailableAndSwitchToIt(By.TagName("iframe"))); // id #result

            var buttonElement = driver.FindElement(By.CssSelector("body > div > button"));
            Assert.That(buttonElement, Is.Not.Null);        
        }
    }
}
