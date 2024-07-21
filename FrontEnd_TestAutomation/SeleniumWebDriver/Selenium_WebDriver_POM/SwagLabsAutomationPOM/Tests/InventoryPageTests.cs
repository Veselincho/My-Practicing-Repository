using SwagLabsAutomationPOM.Pages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwagLabsAutomationPOM.Tests
{
    public class InventoryPageTests : BaseTests
    {
        [Test]
        public void Test_InventoryDisplay()
        {
            Login("standard_user", "secret_sauce");
            var invPage = new InventoryPage(driver);
            var boolRes = invPage.IsInventoryPageDisplayed();
            Assert.IsTrue(boolRes); 
        }

        [Test]  
        public void Test_AddToCartByIndex()
        {
            // login first
            Login("standard_user", "secret_sauce");
            var inventoryPage = new InventoryPage(driver);
            inventoryPage.AddToCartByIndex(5);

            var cartPage = new CartPage(driver);
            cartPage.ClickCartLink();
            Assert.True(cartPage.IsCardItemDisplayed());

            // cartPage.RemoveItemFromCart();  => Not needed as each test starts with a new instance
            // of InventoryPage, ensuring an independent and empty cart :)
        }

        [Test]
        public void Test_AddToCardByName()
        {
            // login first
            Login("standard_user", "secret_sauce");
            var inventoryPage = new InventoryPage(driver);
            inventoryPage.AddToCartByName("Sauce Labs Backpack");

            var cartPage = new CartPage(driver);
            cartPage.ClickCartLink();
            Assert.True(cartPage.IsCardItemDisplayed());

        }
    }
}
