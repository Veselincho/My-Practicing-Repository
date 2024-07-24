global using NUnit.Framework;

using OpenQA.Selenium;
using OpenQA.Selenium.Appium;
using OpenQA.Selenium.Appium.Android;
using OpenQA.Selenium.Appium.Service;

namespace appiumTesting
{
    public class Tests
    {
        private AndroidDriver driver;
        private AppiumLocalService service;
        [SetUp]
        public void SetUp()
        {
            service = new AppiumServiceBuilder()
                .WithIPAddress("127.0.0.1")
                .UsingPort(4723)
                .Build();

            AppiumOptions options = new AppiumOptions();
            options.PlatformName = "Android";
            options.AutomationName = "UIAutomator2";
            options.DeviceName = "phone";
            options.App = @"C:\Users\VesoPC\Desktop\My-Practicing-Repository\FrontEnd_TestAutomation\Appium\apks\com.example.androidappsummator.apk";

            driver = new AndroidDriver(service, options);
        }

        [TearDown]
        public void TearDown()
        {
            driver?.Quit();
            driver?.Dispose();
            service.Dispose();
        }

        [Test]
        public void Test_ValidSummation()
        {
            var fistInput = driver.FindElement(MobileBy.Id("com.example.androidappsummator:id/editText1"));
            fistInput.Clear();
            fistInput.SendKeys("2");

            var secInput = driver.FindElement(MobileBy.Id("com.example.androidappsummator:id/editText2"));
            secInput.Clear();
            secInput.SendKeys("2");

            var calcButton = driver.FindElement(MobileBy.ClassName("android.widget.Button"));
            calcButton.Click();

            var result = driver.FindElement(MobileBy.Id("com.example.androidappsummator:id/editTextSum"));
            Assert.That(result.Text, Is.EqualTo("4"), "Summation isnt correct!");      
        }

        [Test]
        public void Test_SumButtonText()
        {
            var button = driver.FindElement(MobileBy.XPath("//android.widget.RelativeLayout//android.widget.Button"));
            Assert.That(button.Text, Is.EqualTo("CALC"));
        }

        [Test]
        public void Test_INValidSummation()
        {
            var fistInput = driver.FindElement(MobileBy.Id("com.example.androidappsummator:id/editText1"));
            fistInput.Clear();
            fistInput.SendKeys(".");

            var secInput = driver.FindElement(MobileBy.Id("com.example.androidappsummator:id/editText2"));
            secInput.Clear();
            secInput.SendKeys(".");

            var calcButton = driver.FindElement(MobileBy.ClassName("android.widget.Button"));
            calcButton.Click();

            var result = driver.FindElement(MobileBy.Id("com.example.androidappsummator:id/editTextSum"));
            Assert.That(result.Text, Is.EqualTo("error"));
        }

        [Test]
        public void SymbolsText()
        {
            AppiumElement plus = driver.FindElement(MobileBy.XPath("//android.widget.TextView[@resource-id='com.example.androidappsummator:id/textViewPlus']"));
            Assert.That(plus.Text, Is.EqualTo("+"));

            AppiumElement equal = driver.FindElement(MobileBy.Id("com.example.androidappsummator:id/textViewEquals"));
            Assert.That(equal.Text, Is.EqualTo("="));
        }

        [Test]
        [TestCase("3", "3", "6")]
        [TestCase("5", "", "error")]
        public void Paramentrized_ValidSummation(string input1, string input2, string expectedResult)
        {
            var fistInput = driver.FindElement(MobileBy.Id("com.example.androidappsummator:id/editText1"));
            fistInput.Clear();
            fistInput.SendKeys(input1);

            var secInput = driver.FindElement(MobileBy.Id("com.example.androidappsummator:id/editText2"));
            secInput.Clear();
            secInput.SendKeys(input2);

            var calcButton = driver.FindElement(MobileBy.ClassName("android.widget.Button"));
            calcButton.Click();

            var result = driver.FindElement(MobileBy.Id("com.example.androidappsummator:id/editTextSum"));
            Assert.That(result.Text, Is.EqualTo(expectedResult), "Summation isnt correct!");
        }
    }
}