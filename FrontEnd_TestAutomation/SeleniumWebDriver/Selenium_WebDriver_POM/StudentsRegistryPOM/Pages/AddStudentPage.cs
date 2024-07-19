using OpenQA.Selenium;

namespace StudentsRegistryPOM.Pages
{
    public class AddStudentPage : BasePage // inheriting the basePage attributes
    {
        //ctor 
        public AddStudentPage(IWebDriver driver) : base(driver)
        {
            // base(driver) points a refference to the inheritated BasePage driver field.
        }

        // override the URL
        public override string PageUrl => "http://softuni-qa-loadbalancer-2137572849.eu-north-1.elb.amazonaws.com:82/add-student";

        public IWebElement ErrorMessage => driver.FindElement(By.XPath("//body//div[text() = 'Cannot add student. Name and email fields are required!']"));
        public IWebElement FieldStudentName => driver.FindElement(By.XPath("//form[@method='POST' and @action='/add-student']//div//input[@id='name']"));
        public IWebElement FieldStudentEmail => driver.FindElement(By.XPath("//form[@method='POST' and @action='/add-student']//div//input[@id='email']"));

        public IWebElement AddButton => driver.FindElement(By.CssSelector("body > form > button"));

        public string GetErrorMessage()
        {
            return ErrorMessage.Text;
        }

        public void AddStudent(string username, string email)
        {
            this.FieldStudentName.SendKeys(username);
            this.FieldStudentEmail.SendKeys(email);
            this.AddButton.Click();
        }
    }
}
