using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using SumTwoNumbersPOM.SumNumbersPages;

namespace SumTwoNumbersPOM.SumNumbersTests
{
    public class SumNumbersTests
    {
        public IWebDriver driver;
        [SetUp]
        public void SetUp()
        {
            driver = new ChromeDriver();
        }

        [TearDown]
        public void TearDown()
        {
            if (driver != null)
            {
                driver.Quit(); // Properly close and quit the driver
                driver.Dispose(); // Dispose of the driver to free resources
            }
        }

        [Test]
        public void Test_SumTwoNumbers()
        {
            var sumNumbersPage = new SumNumbersPage(driver);
            sumNumbersPage.OpenPage();
            sumNumbersPage.AddNumbers("3", "3");
            Assert.That(sumNumbersPage.ElementResult.Text, Is.EqualTo("Sum: 6"));
        }

        [Test]
        public void Test_ResetButtonClearsInputs()
        {
            var sumNumbersPage = new SumNumbersPage(driver);
            sumNumbersPage.OpenPage();
            sumNumbersPage.fieldNum1.SendKeys("3");
            sumNumbersPage.fieldNum2.SendKeys("3");
            sumNumbersPage.ResetForm();

            Assert.Multiple(() =>
            {
                Assert.That(sumNumbersPage.fieldNum1.Text, Is.EqualTo(string.Empty), "fieldNum1 should be empty");
                Assert.That(sumNumbersPage.fieldNum2.Text, Is.EqualTo(string.Empty), "fieldNum2 should be empty");
            });
        }

        [Test]
        public void Test_InvalidInput()
        {
            var sumNumbersPage = new SumNumbersPage(driver);
            sumNumbersPage.OpenPage();
            sumNumbersPage.fieldNum1.SendKeys("asd");
            sumNumbersPage.fieldNum2.SendKeys("$$");
            sumNumbersPage.ButtonCalc.Click();
            Assert.That(sumNumbersPage.ElementResult.Text, Is.EqualTo("Sum: invalid input"));
        }
    }
}
