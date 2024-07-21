using SwagLabsAutomationPOM.Pages;

namespace SwagLabsAutomationPOM.Tests
{
    public class CartPageTests : BaseTests
    {
        [SetUp] // login beforeEach() test
        public void SetUp()
        {
            Login("standard_user", "secret_sauce");
        }

        [Test]
        public void Test_CartItemDisplayed()
        {
            var inventoryPage = new InventoryPage(driver);
            inventoryPage.AddToCartByIndex(3);

            var cartPage = new CartPage(driver);
            cartPage.ClickCartLink();
            Assert.True(cartPage.IsCardItemDisplayed());
        }

        [Test]
        public void TestClickCheckout()
        {
            var inventoryPage = new InventoryPage(driver);
            inventoryPage.AddToCartByIndex(3);

            var cartPage = new CartPage(driver);
            cartPage.ClickCartLink();
            cartPage.ClickCheckout();
            Assert.That(driver.Url.Contains("/checkout-step-one.html") ||
                        driver.Url.Contains("/checkout-step-two.html"));
        }
    }
}
