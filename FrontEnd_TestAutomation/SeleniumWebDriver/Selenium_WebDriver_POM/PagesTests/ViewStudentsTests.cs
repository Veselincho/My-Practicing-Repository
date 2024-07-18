using OpenQA.Selenium;
using StudentsRegistryPOM.Pages;

namespace StudentsRegistryPOM.PagesTests
{
    public class ViewStudentsTests : BaseTests
    {
       [Test]
       public void Test_ViewStudentsTests()
        {
            var page = new ViewStudentsPage(driver);
            page.OpenPage();
            Assert.AreEqual("Students", page.GetPageTitle());
            Assert.AreEqual("Registered Students", page.GetPageHeading());

            var students = page.GetRegisteredStudents();
            foreach (var st in students)
            {
                Assert.IsTrue(st.IndexOf("(") > 0);
                Assert.IsTrue(st.IndexOf(")") == st.Length - 1);
            }
        }

        //test methods in the class: the Test_ViewStudentsPage_Content() method to check page content and the
        //Test_ViewStudentsPage_Links() method to check links to other pages.
    }
}
