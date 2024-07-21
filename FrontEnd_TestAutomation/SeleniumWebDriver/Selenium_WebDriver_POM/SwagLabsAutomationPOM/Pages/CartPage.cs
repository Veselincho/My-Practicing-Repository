using OpenQA.Selenium;

namespace SwagLabsAutomationPOM.Pages
{
    public class CartPage : BasePage
    {
        public CartPage(IWebDriver driver) : base(driver) // 
        {
            
        }

        private readonly By cartItem = By.CssSelector(".cart_item");
        private readonly By checkOutButton = By.CssSelector("#checkout");
        private readonly By cartLink = By.CssSelector("#shopping_cart_container > a");
        private readonly By removeButton = By.XPath("//div[@class='item_pricebar']//button[@class='btn btn_secondary btn_small cart_button']");

        public bool IsCardItemDisplayed()
        {
            return FindElement(cartItem).Displayed;
            //Checks if an item is displayed in the cart.
        }

        public void ClickCheckout()
        {
            Click(checkOutButton);  
        }

        public void ClickCartLink()
        {
            Click(cartLink);
        }

        public void RemoveItemFromCart()
        {
            Click(removeButton);
        }
    }
}
