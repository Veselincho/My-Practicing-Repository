using StudentsRegistryPOM.Pages;

namespace StudentsRegistryPOM.PagesTests
{
    public class AddStudentTests : BaseTests
    {
        [Test]
        public void Test_AddStudentFieldsAndContent()
        {
            var addStudentPage = new AddStudentPage(driver);
            addStudentPage.OpenPage();
            Assert.That(addStudentPage.GetPageTitle(), Is.EqualTo("Add Student"));
            Assert.That(addStudentPage.GetPageHeading, Is.EqualTo("Register New Student"));
            Assert.That(addStudentPage.FieldStudentName.Text, Is.EqualTo(string.Empty));
            Assert.That(addStudentPage.FieldStudentEmail.Text, Is.EqualTo(string.Empty));
            Assert.That(addStudentPage.AddButton.Text, Is.EqualTo("Add"));
        }

        [Test]
        public void Test_AddStudentPageLinks()
        {
            var addStudentPage = new AddStudentPage(driver);
            addStudentPage.OpenPage();
            Assert.True(addStudentPage.IsPageOpen()); // asserts the driver.Url is this.PageUrl; more of a higher-level assertion that abstracts away the direct comparison and encapsulates the logic within the IsPageOpen method.
            Assert.That(addStudentPage.PageUrl, Is.EqualTo("http://softuni-qa-loadbalancer-2137572849.eu-north-1.elb.amazonaws.com:82/add-student")); // second alternative

            var homePageLink = new HomePage(driver);
            homePageLink.OpenPage();
            Assert.True(homePageLink.IsPageOpen());

            var viewStudentsPage = new ViewStudentsPage(driver);
            viewStudentsPage.OpenPage();
            Assert.True(viewStudentsPage.IsPageOpen());
        }

        [Test]
        public void Test_AddStudentPageAddValidStudent()
        {
            string studentEmail = $"RandomEmail{DateTime.Now.Ticks}@yahoo.com";
            string studentName = $"Random{DateTime.Now.Ticks}Username.com";

            var addStudentPage = new AddStudentPage(driver);
            addStudentPage.OpenPage();
            addStudentPage.FieldStudentEmail.Clear(); //ensures the field is empty
            addStudentPage.FieldStudentName.Clear(); //ensures the field is empty
            addStudentPage.FieldStudentEmail.SendKeys(studentEmail);
            addStudentPage.FieldStudentName.SendKeys(studentName);
            addStudentPage.AddButton.Click();

            var viewStudentsPage = new ViewStudentsPage(driver);
            viewStudentsPage.OpenPage();
            var students = viewStudentsPage.GetRegisteredStudents();

            var newStudentInfo = $"{studentName} ({studentEmail})";

            Assert.That(students.Contains(newStudentInfo));
        }

        [Test]
        public void Test_AddStudentPageAddInvalidStudent()
        {
            var addStudentPage = new AddStudentPage(driver);
            addStudentPage.OpenPage();
            addStudentPage.FieldStudentEmail.Clear(); //ensures the field is empty
            addStudentPage.FieldStudentName.Clear(); //ensures the field is empty
            addStudentPage.AddButton.Click();
            // leaving the fields empty

            Assert.That(addStudentPage.PageUrl, Is.EqualTo(driver.Url), "driver is not on the add student page"); // "Ensure Driver Remains on Add Student Page
            var expectedErrorMessage = addStudentPage.ErrorMessage.Text;
            var actualErrorMessage = addStudentPage.GetErrorMessage();
            Assert.That(actualErrorMessage, Is.EqualTo(expectedErrorMessage), "actualErrorMsg Doest not match the expectedErrorMsg"); // "Verify that the error message displayed on the page is as expected.");
        }
    }
}
