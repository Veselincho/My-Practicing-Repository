using Newtonsoft.Json.Bson;
using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace Selenium_Waits_Exercise
{
    [TestFixture]
    public class Alert_Handling
    {
        private IWebDriver driver;
        private const string URL = "https://the-internet.herokuapp.com/javascript_alerts";

        [SetUp]
        public void setup()
        {
            driver = new ChromeDriver();
            driver.Navigate().GoToUrl(URL);
        }

        [TearDown]
        public void teardown()
        {
            driver.Quit();
            driver.Dispose();
        }

        [Test]
        public void HandleBasicAlert()
        {
            driver.FindElement(By.XPath("//div[@id='content']//ul//button[.='Click for JS Alert']")).Click();
            IAlert alert = driver.SwitchTo().Alert();

            Assert.That(alert.Text, Is.EqualTo("I am a JS Alert"));

            alert.Accept();

            var result = driver.FindElement(By.Id("result"));
            Assert.That(result.Text, Is.EqualTo("You successfully clicked an alert"));
        }

        [Test]
        public void HandleConfirmAlert()
        {
            // accept alert :
            driver.FindElement(By.CssSelector("#content > div > ul > li:nth-child(2) > button")).Click();
            IAlert alert = driver.SwitchTo().Alert();
            Assert.That(alert.Text, Is.EqualTo("I am a JS Confirm"));
            alert.Accept();
            var resElement = driver.FindElement(By.Id("result"));
            Assert.That(resElement.Text, Is.EqualTo("You clicked: Ok"));

            // dismiss alert :
            driver.FindElement(By.CssSelector("#content > div > ul > li:nth-child(2) > button")).Click();
            IAlert alert2 = driver.SwitchTo().Alert();
            Assert.That(alert2.Text, Is.EqualTo("I am a JS Confirm"));
            alert.Dismiss();
            var resElement2 = driver.FindElement(By.Id("result"));
            Assert.That(resElement2.Text, Is.EqualTo("You clicked: Cancel"));
        }

        [Test]
        public void HandlePrompt()
        {
            //accepting the prompt
            driver.FindElement(By.XPath("//button[text()='Click for JS Prompt']")).Click();
            IAlert alert = driver.SwitchTo().Alert();
            alert.SendKeys("asd");
            alert.Accept();
            var resElement = driver.FindElement(By.Id("result"));
            Assert.That(resElement.Text, Is.EqualTo("You entered: asd"));



            //dismissing the prompt
            driver.FindElement(By.XPath("//button[text()='Click for JS Prompt']")).Click();
            IAlert alert2 = driver.SwitchTo().Alert();
            alert2.SendKeys("asd");
            alert2.Dismiss();
            var resElement2 = driver.FindElement(By.Id("result"));
            Assert.That(resElement2.Text, Is.EqualTo("You entered: null"));
        }


    }
}
