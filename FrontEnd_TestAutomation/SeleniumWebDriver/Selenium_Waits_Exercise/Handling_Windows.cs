using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System.Collections.ObjectModel;

namespace Selenium_Waits_Exercise
{
    [TestFixture]
    public class Handling_Windows
    {
        private IWebDriver driver;
        const string URL = "https://the-internet.herokuapp.com/windows";

        [SetUp]
        public void SetUp()
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
        public void HandleMultipleWindows()
        {
            driver.FindElement(By.LinkText("Click Here")).Click();
            ReadOnlyCollection<string> handles = driver.WindowHandles;
            Assert.That(handles.Count, Is.EqualTo(2), "the number of open tabs(windows) should be 2");

            driver.Close();
            driver.SwitchTo().Window(handles[1]);

            handles = driver.WindowHandles; // refresh the handles collection
            Assert.That(handles.Count, Is.EqualTo(1), "the number of open tabs(windows) should be 1");

            driver.Close();
            try
            {
                handles = driver.WindowHandles; // attempt to refresh the handles collection
                Assert.Fail("The session should be closed, but it is not."); //  fail if no exception is thrown
            }
            catch (OpenQA.Selenium.WebDriverException)
            {
                //Expected exception aas the session is closed
            }
        }
      
    }
}
