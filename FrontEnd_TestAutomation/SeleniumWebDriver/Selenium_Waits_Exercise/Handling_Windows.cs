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

        [Test]
        public void HandleMultipleWindowsV2()
        {
            driver.FindElement(By.LinkText("Click Here")).Click();
            var handles = driver.WindowHandles;

            driver.SwitchTo().Window(handles[1]);
            var h3Element = driver.FindElement(By.CssSelector("h3")).Text; // get its text directlyy

            Assert.That(driver.PageSource, Contains.Substring(h3Element), "Page does not contain h3 element text");
            Assert.That(h3Element, Is.EqualTo("New Window"), "h3 element text is not `New Window`");

            string path = Path.Combine(Directory.GetCurrentDirectory(), "content.txt");
            if (File.Exists(path))
            {
                File.Delete(path);  
            }
            else
            {
                File.AppendAllText(path, "current handle: "+driver.CurrentWindowHandle);
                File.AppendAllText(path, "page content: "+driver.PageSource);
            }

            driver.Close();
            driver.SwitchTo().Window(handles.First());  // same as bottom
                                                        //     driver.SwitchTo().Window(handles[0]);  
            string originalWindowContent = driver.FindElement(By.CssSelector("h3")).Text;
            Assert.That(originalWindowContent, Is.EqualTo("Opening a new window"));

            // append the content from the first handle 
            File.AppendAllText(path, "current handle: " + driver.CurrentWindowHandle);
            File.AppendAllText(path, "page content: " + driver.PageSource);
        }

        [Test]
        public void handleNoSuchWindow()
        {
            var handles = driver.WindowHandles;
            driver.FindElement(By.LinkText("Click Here")).Click();
            handles = driver.WindowHandles;

            driver.SwitchTo().Window(handles[1]);
            driver.Close();
            driver.SwitchTo().Window(handles[0]);

            try
            {         
                //try to visit closed window
                driver.SwitchTo().Window(handles[1]);
            }
            catch (NoSuchWindowException ex)
            {
                Assert.Pass("catched the expected NoSuchWindowException: " + ex.Message); // catched the EXpected exception so the test passes
            }
            catch (Exception ex)
            {
                Assert.Fail("unexpected except: " + ex.Message); //marks the test as failed 'cuz of UNexpected exception caugh
            }
        }
    }
}
