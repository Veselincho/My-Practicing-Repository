global using NUnit.Framework;
using OpenQA.Selenium.Appium;
using OpenQA.Selenium.Appium.Android;
using OpenQA.Selenium.Appium.Service;
using OpenQA.Selenium.Internal;

namespace noteAPP


{
    public class Tests
    {
        //C:\Users\VesoPC\Desktop\My-Practicing-Repository\FrontEnd_TestAutomation\Appium\apks\Notepad.apk

        private AndroidDriver? _driver;
        private AppiumLocalService? _service;
        private AppiumOptions? _options;

        [SetUp]
        public void SetUp()
        {
            _service = new AppiumServiceBuilder()
                .WithIPAddress("127.0.0.1")
                .UsingPort(4723)
                .Build();

            _options = new AppiumOptions();

            _options.PlatformName = "Android";
            _options.AutomationName = "UIAutomator2";
            _options.DeviceName = "phone";
            _options.App = @"C:\Users\VesoPC\Desktop\My-Practicing-Repository\FrontEnd_TestAutomation\Appium\apks\Notepad.apk";


            // eensure there arent any pop up permissions shown and directly the app stars
            _options.AddAdditionalAppiumOption("autoGrantPermissions", true); 

            _driver = new AndroidDriver(_service, _options);

            _driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);

            //skips tutorial
            _driver.FindElement(MobileBy.Id("com.socialnmobile.dictapps.notepad.color.note:id/btn_start_skip")).Click();
        }

        [TearDown]
        public void TearDown()
        {
            _driver?.Quit();
            _driver?.Dispose();   
            _service?.Dispose();
        }


        [Test]
        public void AddTextNote()
        {
            var addNoteElement = _driver.FindElement(MobileBy.Id("com.socialnmobile.dictapps.notepad.color.note:id/img_add"));
            addNoteElement.Click();
                
            //choosing the text element
            _driver.FindElement(MobileBy.XPath("//android.widget.TextView[@resource-id='com.socialnmobile.dictapps.notepad.color.note:id/text' and @text='Text']")).Click();

            //type input in the text field
            _driver.FindElement(MobileBy.Id("com.socialnmobile.dictapps.notepad.color.note:id/edit_note")).SendKeys("test");

            //click done Icon button
            _driver.FindElement(MobileBy.Id("com.socialnmobile.dictapps.notepad.color.note:id/back_btn")).Click();

            //click back button
            _driver.FindElement(MobileBy.Id("com.socialnmobile.dictapps.notepad.color.note:id/back_btn")).Click();

            var result = _driver.FindElement(MobileBy.XPath("//android.widget.TextView[@resource-id='com.socialnmobile.dictapps.notepad.color.note:id/title' and @text='test']"));
            Assert.That(result.Text, Is.EqualTo("test"));
        }
    }
}