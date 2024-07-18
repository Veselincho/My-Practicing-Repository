using StudentsRegistryPOM.Pages;

namespace StudentsRegistryPOM.PagesTests
{
    public class HomePageTests : BaseTests
    {
        // The Test_HomePage_Content() test will open the Home page and assert that it has a correct title, heading and students count. 
        [Test]
        public void TestHomePageContent()
        {
            var page = new HomePage(driver);
            page.OpenPage();

            Assert.AreEqual(driver.Title, page.GetPageTitle());
            Assert.AreEqual("Students Registry", page.GetPageHeading());
            Assert.True(page.IsPageOpen());
            page.StudentsCount();
        }
    }
}
