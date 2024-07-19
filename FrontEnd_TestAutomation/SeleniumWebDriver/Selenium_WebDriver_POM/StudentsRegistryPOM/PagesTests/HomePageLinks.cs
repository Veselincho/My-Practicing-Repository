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
            homePage.HomeLink.Click();
            Assert.IsTrue(homePage.IsPageOpen());

            var addStudentPage = new AddStudentPage(driver);
            addStudentPage.OpenPage();
            addStudentPage.AddStudentLink.Click();
            Assert.IsTrue(addStudentPage.IsPageOpen());

            ViewStudentsPage viewStudentsPage = new ViewStudentsPage(driver);
            viewStudentsPage.OpenPage();
            viewStudentsPage.ViewStudentLink.Click();
            Assert.True(viewStudentsPage.IsPageOpen());
        }
    }
}
