global using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using SeleniumExtras.WaitHelpers;

namespace Selenium_Waits
{
    [TestFixture]
    public class SeleniumWaits
    {
        private IWebDriver driver;
        private readonly string url = "https://www.selenium.dev/selenium/web/dynamic.html";

        [SetUp] // beforeEach()
        public void Setup()
        {
            var options = new ChromeOptions();
          //  options.AddArgument("--headless");
            driver = new ChromeDriver(options);
            driver.Navigate().GoToUrl(url);
        }

        [TearDown] // afterEach()
        public void Teardown()
        {
            driver.Quit();
            driver.Dispose();
        }

        [Test,Order(1)]
        public void AddBoxWhitoutWaitsFails()
        {
            driver.FindElement(By.Id("adder")).Click();
            var box = driver.FindElement(By.CssSelector("#box0"));
            Assert.That(box.Displayed, Is.True);
        }

        [Test,Order(2)]
        public void RevealInputWhitoutWaitsFails()
        {
            driver.FindElement(By.Id("reveal")).Click();
            IWebElement revealed = driver.FindElement(By.Id("reveal"));
            revealed.SendKeys("Displayed");
            Assert.That(revealed.GetAttribute("value"), Is.EqualTo("Displayed"));
        }

        [Test, Order(3)]
        public void AddBoxWithThreatSleep()
        {
            driver.FindElement(By.Id("adder")).Click();
            Thread.Sleep(5000); // NB!!! Thread.Sleep can make tests pass by introducing fixed delays, it is inefficient and can make tests slow and unreliable
            var box = driver.FindElement(By.CssSelector("#box0"));
            Assert.That(box.Displayed, Is.True);
        }

        [Test,Order(4)] 
        public void AddBoxWithImplicitWait()
        {
            driver.FindElement(By.Id("adder")).Click();
            //setup an  implicit wait
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);

            //attempt to find the newly added box element 
            IWebElement newBox = driver.FindElement(By.Id("box0"));

            Assert.That(newBox.Displayed, Is.True);
        }

        [Test,Order(5)] 
        public void RevealInputWithImplicitWait()
        {
            driver.FindElement(By.Id("reveal")).Click();
            
            //setup the implcit wait
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);
            
            //attempts to find the element
            IWebElement revealedInput = driver.FindElement(By.Id("revealed"));

            Assert.That(revealedInput.TagName, Is.EqualTo("input"));      
        }

        [Test,Order(6)] 
        public void RevealInputWithExplicitWait()
        {
            IWebElement revealed = driver.FindElement(By.Id("revealed"));
            driver.FindElement(By.Id("reveal")).Click();

            //setup explicit wait
            WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(2));
            wait.Until(d => revealed.Displayed);

            revealed.SendKeys("Displayed");

            Assert.That(revealed.GetAttribute("value"), Is.EqualTo("Displayed"));
        }

        [Test,Order(7)]
        public void AddBoxWithFluentWaitExpectedConditionsAndIgnoredExceptions()
        {
            driver.FindElement(By.Id("adder")).Click();

            //setup flueunt wait with expected conditions
            WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
            wait.PollingInterval = TimeSpan.FromMilliseconds(500); // makes a polling interval that checks if element is found every 0.5sec
            wait.IgnoreExceptionTypes(typeof(NoSuchElementException)); // ignores the exception types as nosuchelement

            //wait until the new box element is present and displayedd 
            IWebElement newBox = wait.Until(ExpectedConditions.ElementIsVisible(By.Id("box0")));
            Assert.IsTrue(newBox.Displayed);    

        }

        [Test, Order(8)]
        public void RevealInputWithCustomFluentWait()
        {
            var revealed = driver.FindElement(By.Id("revealed"));
            driver.FindElement(By.Id("reveal")).Click();

            WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(5))
            {
                PollingInterval = TimeSpan.FromMilliseconds(200)
            };

            wait.IgnoreExceptionTypes(typeof(ElementNotInteractableException));
            wait.Until(d =>
            {
                revealed.SendKeys("Displayed");
                return true;
            });

            Assert.That(revealed.TagName, Is.EqualTo("input"));
            Assert.That(revealed.GetAttribute("value"), Is.EqualTo("Displayed"));        
        }


    }
}
