using OpenQA.Selenium;

namespace StudentsRegistryPOM.Pages
{
    public class AddStudent : BasePage // inheriting the basePage attributes
    {
        //ctor 
        public AddStudent(IWebDriver driver) : base(driver)
        {
            // base(driver) points a refference to the inheritated BasePage driver field.
        }
    }
}
