using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Interactions;
using OpenQA.Selenium.Support.UI;
using SeleniumExtras.WaitHelpers;


namespace Selenium_Waits_Exercise
{
    [TestFixture]
    public class freestylePractice
    {
        private IWebDriver _driver;
        private const string URL = "https://the-internet.herokuapp.com/";
        private WebDriverWait wait;

        [SetUp]
        public void SetUp()
        {
            _driver = new ChromeDriver();
            _driver.Navigate().GoToUrl(URL);
            _driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(2); // implicit
            wait = new WebDriverWait(_driver, TimeSpan.FromSeconds(5)); // explicit
        }

        [TearDown]
        public void TearDown()
        {
            _driver.Quit();
            _driver.Dispose();
        }


        [Test]
        public void MouseHover()
        {
            _driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(0); // setting implicit 0

            _driver.Navigate().GoToUrl(URL);
            _driver.FindElement(By.XPath("//li//a[@href='/hovers']")).Click();

            Actions action = new Actions(_driver);
            var firstElement = _driver.FindElement(By.CssSelector("#content > div > div:nth-child(3)"));
            action.MoveToElement(firstElement)
                .Perform();
            wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("//div//h5[text()='name: user1']")));
            var elementText = _driver.FindElement(By.XPath("//div//h5[text()='name: user1']")).Text;

            Assert.AreEqual("name: user1", elementText);
        }

        [Test]
        public void DynamicLoading()
        {
            _driver.FindElement(By.CssSelector("#content > ul > li:nth-child(14) > a")).Click();
            _driver.FindElement(By.CssSelector("#content > div > a:nth-child(5)")).Click();
            _driver.FindElement(By.CssSelector("#start > button")).Click();

            wait.Until(ExpectedConditions.ElementIsVisible(By.CssSelector("#finish > h4")));
            var element = _driver.FindElement(By.CssSelector("#finish > h4"));
            Assert.IsTrue(element.Displayed);
        }

        [Test]
        public void DropDown()
        {
            _driver.FindElement(By.CssSelector("#content > ul > li:nth-child(11) > a")).Click();
            wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("//*[@id=\"dropdown\"]")));
            var dropdownElement = _driver.FindElement(By.XPath("//*[@id=\"dropdown\"]"));
            SelectElement select = new SelectElement(dropdownElement);
            select.SelectByText("Option 1");
            Thread.Sleep(500);
            select.SelectByText("Option 2");
            Thread.Sleep(500);
            select.SelectByText("Option 1");
            Thread.Sleep(500);
            select.SelectByText("Option 2");
            Thread.Sleep(500);
            select.SelectByText("Option 1");

            Assert.AreEqual("Option 1", select.SelectedOption.Text);
        }
    }
}


