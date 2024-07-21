using SwagLabsAutomationPOM.Pages;

namespace SwagLabsAutomationPOM.Tests
{
    public class CheckoutPageTests : BaseTests
    {
        [SetUp]
        public void LoginAndAddItemToCart()
        {
            var invPage = new InventoryPage(driver);
            Login("standard_user", "secret_sauce");
            invPage.AddToCartByIndex(2);
            invPage.ClickCartLink();

            var cartPage = new CartPage(driver);
            cartPage.ClickCheckout();
        }

        [Test]
        public void Test_CheckoutPageLoaded()
        {
            var checkoutPage = new CheckoutPage(driver);
            Assert.That(checkoutPage.IsPageLoaded(), Is.True, "The checkout page did not load correctly.");
        }

        [Test]
        public void TestContinueToNextStep()
        {
            var checkoutPage = new CheckoutPage(driver);
            checkoutPage.EnterFirstName("Joro");
            checkoutPage.EnterLastName("Ignatow");
            checkoutPage.EnterPostalCode("3333");
            checkoutPage.ClickContinue();

            Assert.That(driver.Url.Contains("checkout-step-two.html"), Is.True, "The user was not redirected to the next step in the checkout process.");
        }

        [Test]
        public void TestCompleteOrder()
        {
            var checkoutPage = new CheckoutPage(driver);
            checkoutPage.EnterFirstName("Miro");
            checkoutPage.EnterLastName("Petrow");
            checkoutPage.EnterPostalCode("12345");
            checkoutPage.ClickContinue();

            checkoutPage.ClickFinish();

            Assert.That(driver.Url.Contains("checkout-complete.html"), Is.True, "The user was not redirected to the checkout complete page.");

            Assert.That(checkoutPage.IsCheckoutComplete(), Is.True, "The order completion message was not displayed.");
        }
    }
}
