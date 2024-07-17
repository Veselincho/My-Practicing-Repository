using StudentsRegistryPOM.Pages;

namespace StudentsRegistryPOM.PagesTests
{
    public class HomePageTests : BaseTests
    {
        [Test]
        public void TestHomePageContent()
        {
            var page = new HomePage(driver);
            page.OpenPage();

            Assert.AreEqual(driver.Title, page.GetPageTitle());
            
        }
    }
}
