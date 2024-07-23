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
    }
}