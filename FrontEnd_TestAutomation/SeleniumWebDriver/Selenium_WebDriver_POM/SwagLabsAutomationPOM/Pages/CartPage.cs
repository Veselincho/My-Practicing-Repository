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

        public bool IsCardDisplayed()
        {
            return FindElement(cartItem).Displayed;
            //Checks if an item is displayed in the cart.
        }

        public void ClickCheckout()
        {
            Click(checkOutButton);  
        }
    }
}
