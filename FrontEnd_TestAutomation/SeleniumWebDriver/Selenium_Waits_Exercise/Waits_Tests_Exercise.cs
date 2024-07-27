using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;

namespace Selenium_Waits_Exercise
{
    [TestFixture]
    public class Waits_Tests_Exercise
    {
        private string url = "https://practice.bpbonline.com/";
        private IWebDriver driver;

        [SetUp] // beforeEach()
        public void Setup()
        {
            var options = new ChromeOptions();
            // options.AddArgument("--headless"); //
            driver = new ChromeDriver(options); // Assign to the class-level driver
            // Setting implicit wait
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(3);
            // Navigate to the URL
            driver.Navigate().GoToUrl(url);
        }

        [TearDown] // afterEach()
        public void Teardown()
        {
            driver.Quit(); // 
            driver.Dispose();
        }

        [Test, Order(1)]
        public void SearchProduct_Keyboard_ShouldAddToCard()
        {
            driver.FindElement(By.XPath("//form[@name='quick_find']//input[@type='text']")).SendKeys("keyboard" + Keys.Enter);

            try
            {
                driver.FindElement(By.XPath("//a[@id='tdb4']")).Click();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Unexpected exception: " + ex.Message);
            }

            // Assert that the cart page is displayed
            Assert.That(driver.PageSource.Contains("What's In My Cart?"));
            // kinda same
            Assert.True(driver.PageSource.Contains("What's In My Cart?"));
        }

        [Test, Order(2)]
        public void AddElementToCart_junk_ShouldNotFindElement()
        {
            driver.FindElement(By.XPath("//form[@name='quick_find']//input[@type='text']")).SendKeys("junk" + Keys.Enter);

            WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(3));

            bool isElementAbsent = wait.Until(driver =>
            {
                try
                {
                    driver.FindElement(By.CssSelector("#bodyContent > div > div.contentText > div.ui-widget.infoBoxContainer > div.ui-widget-content.ui-corner-bottom.productListTable"));
                    return false;
                }
                catch (NoSuchElementException)
                {
                    return true;
                }
            });

            Assert.True(isElementAbsent, "thee element was unexpectedly found.");
        }

        [Test, Order(3)]
        public void SearchProduct_Junk_ShouldThrowNoSuchElementException()
        {
            driver.FindElement(By.Name("keywords")).SendKeys("junk");
            driver.FindElement(By.XPath("//input[@title=' Quick Find ']")).Click();

            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(0);

            try
            {
                WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
                IWebElement buyNowLink = wait.Until(e => e.FindElement(By.LinkText("Buy Now")));

                buyNowLink.Click();
                Assert.Fail("The 'Buy Now' link was found for a non-existing product.");
            }
            catch (WebDriverTimeoutException)
            {
                Assert.Pass("Expected WebDriverTimeoutException was thrown.");
            }
            catch (Exception ex)
            {
                Assert.Fail("Unexpected exception: " + ex.Message);
            }
            finally
            {
                driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);
            }
        }



       
    }
}