global using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Appium;
using OpenQA.Selenium.Appium.Android;
using OpenQA.Selenium.Appium.Interfaces;
using OpenQA.Selenium.Appium.MultiTouch;
using OpenQA.Selenium.Appium.Service;
using OpenQA.Selenium.Interactions;
using OpenQA.Selenium.Internal;
using System.Drawing;

namespace ApiDemosAPP

{
    public class Gesture_Tests
    {
        private AndroidDriver _driver;
        private AppiumOptions _options;
        private AppiumLocalService _service;

        private void ScrollToText(string text)
        {
            _driver.FindElement(MobileBy.AndroidUIAutomator("new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text(\"" + text + "\"))"));
           // _driver.FindElement(MobileBy.AndroidUIAutomator($"new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text('{text}'))"));
        }

        private void MoveSeekBarWithInspectorCoordinates(int startX, int startY, int endX, int endY)
        {
            var finger = new PointerInputDevice(PointerKind.Touch);
            var start = new Point(startX, startY);
            var end = new Point(endX, endY);
            var swipe = new ActionSequence(finger);
            swipe.AddAction(finger.CreatePointerMove(CoordinateOrigin.Viewport, start.X, start.Y, TimeSpan.Zero));
            swipe.AddAction(finger.CreatePointerDown(MouseButton.Left));
            swipe.AddAction(finger.CreatePointerMove(CoordinateOrigin.Viewport, end.X, end.Y, TimeSpan.FromMilliseconds(1000)));
            swipe.AddAction(finger.CreatePointerUp(MouseButton.Left));
            _driver.PerformActions(new List<ActionSequence> { swipe });
        }

        private void PerformZoom(int ffStartX, int ffStartY, int ffEndX, int ffEndY,        //first finger 
                                   int sfStartX, int sfStartY, int sfEndX, int sfEndY)      //second finger
            
        {
            var finger1 = new PointerInputDevice(PointerKind.Touch);
            var finger2 = new PointerInputDevice(PointerKind.Touch);
            var zoomFinger1 = new ActionSequence(finger1);
            var zoomFinger2 = new ActionSequence(finger2);

            // ----- First finger actions :
            zoomFinger1.AddAction(finger1.CreatePointerMove(CoordinateOrigin.Viewport, ffStartX, ffStartY, TimeSpan.Zero)); // Move to initial position
            zoomFinger1.AddAction(finger1.CreatePointerDown(MouseButton.Left));
            zoomFinger1.AddAction(finger1.CreatePointerMove(CoordinateOrigin.Viewport, ffEndX, ffEndY, TimeSpan.FromSeconds(2)));
            zoomFinger1.AddAction(finger1.CreatePointerUp(MouseButton.Left));

            // ----- Second finger actions :
            zoomFinger2.AddAction(finger2.CreatePointerMove(CoordinateOrigin.Viewport, sfStartX, sfStartY, TimeSpan.Zero)); // Move to initial position
            zoomFinger2.AddAction(finger2.CreatePointerDown(MouseButton.Left));
            zoomFinger2.AddAction(finger2.CreatePointerMove(CoordinateOrigin.Viewport, sfEndX, sfEndY, TimeSpan.FromSeconds(2)));
            zoomFinger2.AddAction(finger2.CreatePointerUp(MouseButton.Left));

            // === perfortm the whole operation
            _driver.PerformActions(new List<ActionSequence> { zoomFinger1, zoomFinger2 });
        }

        [OneTimeSetUp] // beforeeAll()
        public void Setup()
        {
            _service = new AppiumServiceBuilder()
                .WithIPAddress("127.0.0.1")
                .UsingPort(4723)
                .Build();

            _service.Start(); // runs the Appium server service

            _options = new AppiumOptions();
            _options.PlatformName = "Android";
            _options.AutomationName = "UIAutomator2";
            _options.DeviceName = "phone";
            _options.App = @"C:\Users\VesoPC\Desktop\My-Practicing-Repository\FrontEnd_TestAutomation\Appium\apks\ApiDemos-debug.apk";

            _driver = new AndroidDriver(_service, _options);
            
            //setting implicit wait to the driver
            _driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(15);
        }

        [OneTimeTearDown] //   aafterAll() 
        public void TearDown()
        {
            _driver.Quit();
            _driver.Dispose();
            _service.Dispose();
        }

        [Test]
        public void Scroll()
        {
            AppiumElement viewsButton = _driver.FindElement(MobileBy.AccessibilityId("Views"));
            viewsButton.Click();
            ScrollToText("Lists");

            AppiumElement listButton = _driver.FindElement(MobileBy.AccessibilityId("Lists"));
            Assert.That(listButton, Is.Not.Null, "the lists element is not present");

            listButton.Click();

            var photosButton = _driver.FindElement(MobileBy.AccessibilityId("08. Photos"));
            Assert.That(photosButton, Is.Not.Null, "photos button is not present on the page"); 
        }

        [Test]
        public void Swipe()
        {
            _driver.FindElement(MobileBy.AccessibilityId("Views")).Click();
            _driver.FindElement(MobileBy.AccessibilityId("Gallery")).Click();
            _driver.FindElement(MobileBy.AccessibilityId("1. Photos")).Click();

            var firstImage = _driver.FindElements(By.ClassName("android.widget.ImageView"))[0];

            var actions = new Actions(_driver);
            var swipe = actions.ClickAndHold(firstImage)
                .MoveByOffset(-200, 0)
                .Release()
                .Build();

            swipe.Perform();

            var thirdImage = _driver.FindElements(MobileBy.ClassName("android.widget.ImageView"))[2];

            Assert.That(thirdImage, Is.Not.Null, "third image is noot visible");
        }

        [Test]
        public void DragAndDropJSapproach()
        {
            _driver.FindElement(MobileBy.AccessibilityId("Views")).Click();
            _driver.FindElement(MobileBy.AccessibilityId("Drag and Drop")).Click();

            AppiumElement? firstDotElement = _driver.FindElement(MobileBy.Id("io.appium.android.apis:id/drag_dot_1"));
            AppiumElement? secDotElement = _driver.FindElement(MobileBy.Id("io.appium.android.apis:id/drag_dot_2"));

            var scriptArgs = new Dictionary<string, object>()
            {
                { "elementId", firstDotElement.Id },
                { "endX", secDotElement.Location.X + (secDotElement.Size.Width/2) },
                { "endY", secDotElement.Location.Y + (secDotElement.Size.Height/2) },
                {"speed", 2500 }
            };

            _driver.ExecuteScript("mobile: dragGesture", scriptArgs);

            var droppedMsg = _driver.FindElement(MobileBy.Id("io.appium.android.apis:id/drag_result_text"));

            Assert.That(droppedMsg.Text, Is.EqualTo("Dropped!"));
        }

        [Test]
        public void DragAndDropActionsAlternativeApproach()
        {
            _driver.FindElement(MobileBy.AccessibilityId("Views")).Click();
            _driver.FindElement(MobileBy.AccessibilityId("Drag and Drop")).Click();

            AppiumElement? firstDotElement = _driver.FindElement(MobileBy.Id("io.appium.android.apis:id/drag_dot_1"));
            AppiumElement? secDotElement = _driver.FindElement(MobileBy.Id("io.appium.android.apis:id/drag_dot_2"));

            var actions = new Actions(_driver);

            // Perform the drag and drop action
            actions.ClickAndHold(firstDotElement)    // Click and hold the first element
                .Build()                            // Build the action sequence
                .Perform();                         // Perform the action

            // simulates the delay needed after touch & hold
            Thread.Sleep(3000);                     // Wait for 3 seconds


            actions.MoveToElement(secDotElement)    // Move to the target element
                .Release()                         // Release the hold
                .Build()                            // Build the action sequence
                .Perform();                         // Perform the action

            var droppedMsg = _driver.FindElement(MobileBy.Id("io.appium.android.apis:id/drag_result_text"));

            Assert.That(droppedMsg.Text, Is.EqualTo("Dropped!"));
        }

        [Test]
        public void SlidingWithActions()
        {
            _driver.FindElement(MobileBy.AccessibilityId("Views")).Click();
            ScrollToText("Seek Bar");
            _driver.FindElement(MobileBy.AccessibilityId("Seek Bar")).Click();

            var button = _driver.FindElement(MobileBy.Id("io.appium.android.apis:id/seek"));
            var resultBar = _driver.FindElement(MobileBy.Id("io.appium.android.apis:id/progress"));

            var actions = new Actions(_driver);

            actions.ClickAndHold(button)
                .MoveByOffset(200, 0)
                .Build()
                .Perform();

            Assert.That(resultBar.Text, Is.EqualTo("70 from touch=true"));
        }

        [Test]
        public void SlidingWithMethodUsingActionSequence()
        {
            var views = _driver.FindElement(MobileBy.AccessibilityId("Views"));
            views.Click();

            ScrollToText("Seek Bar");

            var seekBarOption = _driver.FindElement(MobileBy.AccessibilityId("Seek Bar"));
            seekBarOption.Click();

            // Use the exact coordinates from Appium Inspector
            MoveSeekBarWithInspectorCoordinates(546, 300, 1052, 300);

            var seekBarValueElement = _driver.FindElement(By.Id("io.appium.android.apis:id/progress"));
            var seekBarValueText = seekBarValueElement.Text;
            Assert.That(seekBarValueText, Is.EqualTo("100 from touch=true"), "SeekBar did not move to the expected value.");
        }

        [Test]
        public void ZoomInAndOut()
        {
            _driver.FindElement(MobileBy.AccessibilityId("Views")).Click();
            ScrollToText("WebView");
            _driver.FindElement(MobileBy.AccessibilityId("WebView")).Click();
            Thread.Sleep(5000);
            PerformZoom(550, 550, 550, 100, 550, 750, 550, 1100); //ZoomIN
            Thread.Sleep(5000);
            var linkElement = _driver.FindElement(MobileBy.XPath("//android.widget.TextView[@text='i am a link']"));
            PerformZoom(550, 300, 550, 600, 550, 1400, 550, 1100); //Zoom out
            Thread.Sleep(2000);
            Assert.NotNull(linkElement);
            Assert.True(linkElement.Displayed, "The link element should be visible.");
            Assert.That(linkElement.Text, Is.EqualTo("i am a link"));
        }

        [Test]
        public void TextEvent()
        {
            ScrollToText("Text");
            _driver.FindElement(MobileBy.AccessibilityId("Text")).Click();
            _driver.FindElement(MobileBy.AccessibilityId("LogTextBox")).Click();
            _driver.FindElement(MobileBy.AccessibilityId("Add")).Click();
            var fieldElement = _driver.FindElement(By.Id("io.appium.android.apis:id/text"));
            Thread.Sleep(3000);
            Assert.That(fieldElement.Text, Contains.Substring("This is a test"));
        }


        [Test] // views date widgets
        public void DateWidgetsDialog()
        {
            _driver.FindElement(MobileBy.AccessibilityId("Views")).Click();
            _driver.FindElement(MobileBy.AccessibilityId("Date Widgets")).Click();
            _driver.FindElement(MobileBy.AccessibilityId("1. Dialog")).Click();

            var changeDateButton = _driver.FindElement(By.Id("io.appium.android.apis:id/pickDate"));
            var changeTimeButton = _driver.FindElement(By.Id("io.appium.android.apis:id/pickTime"));
            var changeTimeButtonSpinner = _driver.FindElement(By.Id("io.appium.android.apis:id/pickTimeSpinner"));

            var resultDate = _driver.FindElement(By.Id("io.appium.android.apis:id/dateDisplay"));
            changeDateButton.Click();

            var okButton = _driver.FindElement(By.Id("android:id/button1"));
            var dateElement = _driver.FindElement(MobileBy.AndroidUIAutomator("new UiSelector().text(\"10\")"));
            dateElement.Click();
            string dateElementContent = dateElement.GetAttribute("content-desc");

            okButton.Click();

            changeTimeButton.Click();
            DateTime now = DateTime.Now;
            string timeOnly = now.ToString("HH:mm");
            string hours = timeOnly.Substring(0, 2);
            
            string mins = timeOnly.Substring(3);

            DateTime now2 = DateTime.Now;
            string period = now2.ToString("tt");

            _driver.FindElement(By.Id("android:id/toggle_mode")).Click();
            _driver.FindElement(By.Id("android:id/input_hour")).SendKeys(hours);
            _driver.FindElement(By.Id("android:id/input_minute")).SendKeys(mins);

            if (period == "PM")
            {
                _driver.FindElement(By.Id("android:id/text1")).Click();
                _driver.FindElement(MobileBy.XPath("//android.widget.CheckedTextView[@resource-id='android:id/text1' and @text='PM']")).Click();
            }

            _driver.FindElement(By.Id("android:id/button1")).Click();

            int calcHours = int.Parse(hours) -3 ;
            hours = calcHours.ToString();

            Assert.That(resultDate.Text, Is.EqualTo($"{dateElementContent} {hours}:{mins}"));
        }
    }
}