using OpenQA.Selenium;
using StudentsRegistryPOM.Pages;

namespace StudentsRegistryPOM.PagesTests
{
    public class HomePageLinks : BaseTests
    {
        [Test]
        public void TestHomePageLinks()
        {
            var homePage = new HomePage(driver);
            homePage.OpenPage();
            Assert.IsTrue(homePage.IsPageOpen());

            var addStudentPage = new AddStudentPage(driver);
            addStudentPage.OpenPage();
            Assert.IsTrue(addStudentPage.IsPageOpen());  

            ViewStudentsPage viewStudentsPage = new ViewStudentsPage(driver);   
            viewStudentsPage.OpenPage();
            Assert.True(viewStudentsPage.IsPageOpen());
        }

    }
}
