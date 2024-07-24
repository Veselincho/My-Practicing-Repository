global using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Appium;
using OpenQA.Selenium.Appium.Android;
using OpenQA.Selenium.Appium.Service;
using OpenQA.Selenium.Support.UI;
using OpenQA.Selenium.DevTools.V124.CSS;
using OpenQA.Selenium.Internal;
using OpenQA.Selenium.Support.UI;
using SeleniumExtras.WaitHelpers;

namespace noteAPP


{
    public class Tests
    {
        //C:\Users\VesoPC\Desktop\My-Practicing-Repository\FrontEnd_TestAutomation\Appium\apks\Notepad.apk

        private WebDriverWait _wait;
        private AndroidDriver? _driver;
        private AppiumLocalService? _service;
        private AppiumOptions? _options;

        //mapping locators:
        public string menuButtonByID = "com.socialnmobile.dictapps.notepad.color.note:id/icon_nav";
        public string addButtonByID = "com.socialnmobile.dictapps.notepad.color.note:id/main_btn1";
        public string searchButtonByID = "com.socialnmobile.dictapps.notepad.color.note:id/main_btn2";
        public string moreDropDownButtonByID = "com.socialnmobile.dictapps.notepad.color.note:id/main_btn3";
        public string noteListViewByID = "com.socialnmobile.dictapps.notepad.color.note:id/note_list";
        public string firstNoteElementByID = "com.socialnmobile.dictapps.notepad.color.note:id/title";
        public string pencilEditButtonById = "com.socialnmobile.dictapps.notepad.color.note:id/edit_btn";
        public string titleEditInputFieldById = "com.socialnmobile.dictapps.notepad.color.note:id/edit_title";
        public string doneButtonById = "com.socialnmobile.dictapps.notepad.color.note:id/back_btn";
        public string noteOptionsById = "com.socialnmobile.dictapps.notepad.color.note:id/menu_btn";
        public string deleteNoteButtonByXPATH = "//android.widget.TextView[@resource-id='com.socialnmobile.dictapps.notepad.color.note:id/text' and @text='Delete']";
        public string confirmDeleteButtonByID = "android:id/button1";


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

        [Test]
        public void AddandEditTextNote()
        {
            AddTextNote(); //using the first test to create a note
            _driver.FindElement(MobileBy.Id(firstNoteElementByID)).Click();
            _driver.FindElement(MobileBy.Id(pencilEditButtonById)).Click();
            _driver.FindElement(MobileBy.Id(titleEditInputFieldById)).Clear();
            _driver.FindElement(MobileBy.Id(titleEditInputFieldById)).SendKeys("Edited");
            _driver.FindElement(MobileBy.Id(doneButtonById)).Click();
            _driver.FindElement(MobileBy.Id(doneButtonById)).Click();   // backButton but same id 

            var res = _driver.FindElement(MobileBy.Id(firstNoteElementByID));
            var actualResult = res.Text;

            Assert.AreEqual("Edited", actualResult);
        }

        [Test]
        public void DeleteTextNote()
        {
            AddTextNote(); //using the first test to create a note
            _driver.FindElement(MobileBy.Id(firstNoteElementByID)).Click();
            _driver.FindElement(MobileBy.Id(noteOptionsById)).Click();
            _driver.FindElement(MobileBy.XPath(deleteNoteButtonByXPATH)).Click();
            _driver.FindElement(MobileBy.Id(confirmDeleteButtonByID)).Click();

            // Assert that the element is not found
            bool elementNotFound = false;
            try
            {
                _driver.FindElement(MobileBy.Id(firstNoteElementByID));
            }
            catch (NoSuchElementException)
            {
                elementNotFound = true;
            }

            Assert.IsTrue(elementNotFound, "Element was found, but it should have been deleted.");

        }

        // [Test]
        // public void DeleteNoteWithAssertThrows() 
    }
}