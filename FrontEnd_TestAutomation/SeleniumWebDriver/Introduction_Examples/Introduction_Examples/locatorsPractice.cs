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

            IWebElement firstNameElement = driver.FindElement(By.XPath("//label[@for='fname']"));
            IWebElement lastNameElement = driver.FindElement(By.XPath("//label[@for='lname']"));

            Assert.That(firstNameElement.Text, Is.EqualTo("First name:"));
            Assert.That(lastNameElement.Text, Is.EqualTo("Last name:"));
         
            IWebElement phoneNumber = driver.FindElement(By.XPath("//html//form//div[@class='additional-info']"));
            Assert.That(phoneNumber.Displayed, Is.True);   // chgecks for visibility
            Assert.That(phoneNumber.Text, Is.EqualTo("Phone Number:"));

            IWebElement textElement = driver.FindElement(By.LinkText("Softuni Official Page"));
            Assert.That(textElement.Displayed, Is.True);
            Assert.That(textElement.Text, Is.EqualTo("Softuni Official Page"));

            var textElement2 = driver.FindElement(By.PartialLinkText("fficial Pa"));
            Assert.That(textElement2.Displayed, Is.True);
            Assert.That(textElement2.Text, Is.EqualTo("Softuni Official Page"));
            Console.WriteLine(textElement2);
        }
    }
}
