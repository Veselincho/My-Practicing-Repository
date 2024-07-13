global using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using System;
using System.Collections.ObjectModel;

namespace Exercise_Selenium_WebDriver
{
    [TestFixture]
    public class BPB_Tests
    {
        private IWebDriver driver;
        string url = "https://practice.bpbonline.com/";
        string? emailCredential;
        string? passwordCredential;

        [SetUp]
        public void Setup()
        {
            var options = new ChromeOptions();
            // options.AddArgument("--headless"); // Enable headless
            driver = new ChromeDriver(options);
        }

        [TearDown]
        public void TearDown()
        {
            driver.Quit();
            driver.Dispose();
        }

        private string GenerateRandomDate()
        {
            var random = new Random();
            var day = random.Next(1, 29); // Days from 1 to 28 for simplicity
            var month = random.Next(1, 13); // Months from 1 to 12
            var year = random.Next(1971, 2005); // Years from 1899 to 2004

            // Format the date as dd/MM/yyyy
            var date = $"{month:D2}/{day:D2}/{year}"; // D2 formats the number to 2 digits
            return date;
        }

        private int RandomNuber()
        {
            var random = new Random();
            int randomInt = random.Next(1, 999);
            return randomInt;
        }


        [Test, Order(1)]
        public void UserRegister()
        {
            driver.Navigate().GoToUrl(url);
            driver.FindElement(By.XPath("//span[a][3]//a")).Click();
            driver.FindElement(By.XPath("//span[@class='ui-button-text' and text()='Continue']")).Click();

            // Returns all selections
            ReadOnlyCollection<IWebElement> genderSelection = driver.FindElements(By.XPath("//tr//td[@class='fieldValue']//input[@type='radio']"));
            var male = genderSelection[0];
            male.Click();

            var firstName = driver.FindElement(By.XPath("(//td[@class='fieldValue'])[2]//input"));
            firstName.SendKeys("Barak");

            var lastName = driver.FindElement(By.XPath("//td[@class='fieldValue']//input[@name='lastname']"));
            lastName.SendKeys("Obama");

            var dateOfBirth = driver.FindElement(By.CssSelector("input[name='dob']"));
            dateOfBirth.SendKeys(GenerateRandomDate());

            var email = driver.FindElement(By.XPath("//td[@class='fieldValue']//input[@type='text' and @name='email_address']"));
            var emailValue = $"bara4eto{RandomNuber()}@yahoo.com";
            email.SendKeys(emailValue);

            driver.FindElement(By.CssSelector("#bodyContent > form > div > div:nth-child(6) > table > tbody > tr:nth-child(1) > td.fieldValue > input[type=text]")).SendKeys("street adress value should be here");
            driver.FindElement(By.CssSelector("#bodyContent > form > div > div:nth-child(6) > table > tbody > tr:nth-child(3) > td.fieldValue > input[type=text]")).SendKeys("2300");
            driver.FindElement(By.CssSelector("#bodyContent > form > div > div:nth-child(6) > table > tbody > tr:nth-child(4) > td.fieldValue > input[type=text]")).SendKeys("Seattle");
            driver.FindElement(By.CssSelector("#bodyContent > form > div > div:nth-child(6) > table > tbody > tr:nth-child(5) > td.fieldValue > input[type=text]")).SendKeys("Washington");
            new SelectElement(driver.FindElement(By.CssSelector("#bodyContent > form > div > div:nth-child(6) > table > tbody > tr:nth-child(6) > td.fieldValue > select"))).SelectByText("United States");

            driver.FindElement(By.CssSelector("#bodyContent > form > div > div:nth-child(8) > table > tbody > tr:nth-child(1) > td.fieldValue > input[type=text]")).SendKeys("0883472733");
            driver.FindElement(By.CssSelector("#bodyContent > form > div > div:nth-child(10) > table > tbody > tr:nth-child(1) > td.fieldValue > input[type=password]")).SendKeys("obama23");
            driver.FindElement(By.CssSelector("#bodyContent > form > div > div:nth-child(10) > table > tbody > tr:nth-child(2) > td.fieldValue > input[type=password]")).SendKeys("obama23");

            driver.FindElement(By.Id("tdb4")).Click();

            var h1 = driver.FindElement(By.CssSelector("h1"));
            Assert.That(h1.Text, Is.EqualTo("Your Account Has Been Created!"));
            Assert.That(driver.PageSource.Contains("Your Account Has Been Created!"));

            emailCredential = emailValue;
            passwordCredential = "obama23";
        }

        [Test, Order(2)]
        public void UserLogin()
        {
            driver.Navigate().GoToUrl(url);
            driver.FindElement(By.CssSelector("#tdb3 > span.ui-button-text")).Click();
            Console.WriteLine(emailCredential);
            driver.FindElement(By.CssSelector("#bodyContent > div:nth-child(3) > div > form > table > tbody > tr:nth-child(1) > td.fieldValue > input[type=text]")).SendKeys($"{emailCredential}");
            driver.FindElement(By.CssSelector("#bodyContent > div:nth-child(3) > div > form > table > tbody > tr:nth-child(2) > td.fieldValue > input[type=password]")).SendKeys(passwordCredential + Keys.Enter);
            var h1 = driver.FindElement(By.CssSelector("h1"));
            Assert.That(h1.Text, Is.EqualTo("My Account Information"));
            Assert.That(driver.PageSource.Contains("My Account Information"));
        }

        [Test, Order(3)]    
        public void WorkingWithWebTables()
        {
            driver.Navigate().GoToUrl(url); 
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(5);

            // locate the table
            IWebElement productsTable = driver.FindElement(By.XPath("//div[@class='contentText']//table"));

            ReadOnlyCollection<IWebElement> tableRows = productsTable.FindElements(By.XPath("//tbody//tr"));

            string path = System.IO.Directory.GetCurrentDirectory() + "/productsInfo.txt";

            if (File.Exists(path))
            {
                File.Delete(path);  
            }

            foreach (IWebElement row in tableRows)   
            {
                ReadOnlyCollection<IWebElement> tableData = row.FindElements(By.XPath(".//td"));

                foreach (var tData in tableData)
                {
                    string data = tData.Text;
                    string[] productInfo = data.Split("\n");

                    File.AppendAllText(path, productInfo[0].Trim() + ", " + productInfo[1].Trim() + "\n");
                }
            }

            Assert.IsTrue(File.Exists(path));
            Assert.That(new FileInfo(path).Length, Is.GreaterThan(0));
        }

    }
}
