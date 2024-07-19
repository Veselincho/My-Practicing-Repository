using OpenQA.Selenium;

namespace SumTwoNumbersPOM.SumNumbersPages
{
    public class SumNumbersPage
    {
        private readonly IWebDriver driver;

        public SumNumbersPage(IWebDriver driver)
        {
            this.driver = driver;
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(5);
        }

        const string pageUrl = "https://c86183ce-c205-4fb1-a382-8e804598bbe2-00-3nz686sjuh9z9.janeway.replit.dev/";

        public IWebElement fieldNum1 => driver.FindElement(By.CssSelector("input#number1"));
        public IWebElement fieldNum2 => driver.FindElement(By.CssSelector("input#number2"));
        public IWebElement ButtonCalc => driver.FindElement(By.CssSelector(".buttons-bar  > input[type='button']"));
        public IWebElement ButtonReset => driver.FindElement(By.Id("resetButton"));
        public IWebElement ElementResult => driver.FindElement(By.CssSelector("#result"));

        public void OpenPage()
        {
            driver.Navigate().GoToUrl(pageUrl);
        }

        public void AddNumbers(string firstValue, string secondValue)
        {
            fieldNum1.Clear();
            fieldNum2.Clear();
            fieldNum1.SendKeys(firstValue);
            fieldNum2.SendKeys(secondValue);
            ButtonCalc.Click();
        }

        public void ResetForm()
        {
            ButtonReset.Click();
        }

        public bool IsFormEmpty() => fieldNum1.Text == string.Empty && fieldNum2.Text == string.Empty;
        // using a conditional expression here


        //
        public bool IsFormEmptyTernaryOperator()
        {
            return (fieldNum1.Text == string.Empty && fieldNum2.Text == string.Empty) ? true : false;
        }



    }
}
