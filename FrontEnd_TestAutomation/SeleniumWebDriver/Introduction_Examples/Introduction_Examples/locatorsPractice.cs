using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System.Collections.ObjectModel;

namespace Introduction_Examples
{
    [TestFixture]
    public class LocatorsPractice
    {
        private string baseUrl = "file:///C:/Users/VesoPC/Desktop/My-Practicing-Repository/FrontEnd_TestAutomation/SeleniumWebDriver/Introduction_Examples/simpleForm/Locators.html";

        private IWebDriver driver;

        [OneTimeSetUp]
        public void OneTimeSetup() // nodeJS playwright analog => beforeAll()
        {
            driver = new ChromeDriver();
            driver.Navigate().GoToUrl(baseUrl);
        }

        [OneTimeTearDown] // nodeJS playwright analog => afterAll()
        public void OneTimeTearDown()
        {
            driver.Quit();
        }

        [Test, Order(1)] //Ordering
        public void xPaths()
        {
            IWebElement element = driver.FindElement(By.XPath("//body//h2"));
            Assert.That(element.Text, Is.EqualTo("Contact Form"));

            IWebElement submitButton = driver.FindElement(By.XPath("//html//body//form//input[@class='button' and @type='submit']"));
            Assert.That(submitButton.Displayed, Is.True);

            ReadOnlyCollection<IWebElement> genderElements = driver.FindElements(By.XPath("//body//form[@action]//input[@type='radio']"));

            Assert.That(genderElements.Count, Is.EqualTo(2));
                
            Console.WriteLine(genderElements.GetType());

            IWebElement h3Content = driver.FindElement(By.XPath("//body//form//h3"));
            Assert.That(h3Content.Text, Is.EqualTo("Additional Information"));
        }

        

    }
}
