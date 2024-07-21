using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using SeleniumExtras.WaitHelpers;

namespace SwagLabsAutomationPOM.Pages
{ 
    public class BasePage
    {
        //link https://www.saucedemo.com/cart.html ^^

        protected readonly IWebDriver driver; //private readonly IWebDriver driver; // Make driver readonly to ensure it is not reassigned
        protected WebDriverWait wait;

        public BasePage(IWebDriver driver)
        {
            this.driver = driver;
            wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10)); //set Explicit wait
        }

        protected IWebElement FindElement(By by)
        {
            //    waits until the element located by `by` is visible and returns it
            return wait.Until(ExpectedConditions.ElementIsVisible(by));
            //⦁	Find a single web element that matches the provided By locator  
        }

        protected IReadOnlyCollection<IWebElement> FindElements(By by)
        {
            return driver.FindElements(by);
        }

        protected void Click(By by)
        {
            FindElement(by).Click();
            // the method signature protected void Click(By by), the first By indicates
            // the type of the parameter, and the second by is the name of the parameter. 
        }   

        protected void Type(By by, string text)
        {
            // ⦁	Typing into input field
            var element = FindElement(by); // locates the element
            element.Clear();     // ensures its field 
            element.SendKeys(text);  // inputs the specified text
        }

        //⦁	Getting text from elements
        protected string GetText(By by)
        {
            return FindElement(by).Text;
        }
    }
}
