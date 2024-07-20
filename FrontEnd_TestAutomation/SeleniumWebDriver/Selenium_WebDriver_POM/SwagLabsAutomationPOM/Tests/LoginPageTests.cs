using SwagLabsAutomationPOM.Pages;

namespace SwagLabsAutomationPOM.Tests
{
    public class LoginPageTests : BaseTests
    {
        [Test]
        public void Test_LoginWithValidCredentials()
        {
            Login("standard_user", "secret_sauce");

            var inventoryPage = new InventoryPage(driver);

            Assert.That(inventoryPage.IsInventoryPageLoaded(), Is.True, "the inventory page is not loaded after successful login");
        }

        [Test]
        public void Test_LoginWithInvalidCredentials()
        {
            Login("asd", "33");
            var loginPage = new LoginPage(driver);
            string error = loginPage.GetErrorMessage();
            Assert.That(error.Contains("Username and password do not match any user in this service"), "error message is not correct");
        }

        [Test]
        public void Test_LoginWithLockedOutUserCredentials()
        {
            Login("locked_out_user", "secret_sauce");
            var loginPage = new LoginPage(driver);
            string error = loginPage.GetErrorMessage();
            Assert.That(error.Contains("Epic sadface: Sorry, this user has been locked out."), "error message is not correct");
        }
    }

}
