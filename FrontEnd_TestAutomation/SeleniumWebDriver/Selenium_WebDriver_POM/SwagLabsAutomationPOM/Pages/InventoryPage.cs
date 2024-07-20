using OpenQA.Selenium;

namespace SwagLabsAutomationPOM.Pages
{
    public class InventoryPage :  BasePage
    {
        public InventoryPage(IWebDriver driver) : base(driver) 
        {

        }

        protected readonly By cartLink = By.CssSelector("#shopping_cart_container > a");
        protected readonly By productsPageTitle = By.CssSelector(".title");
        protected readonly By productItems = By.XPath("//body//div[@id='inventory_container']//div//div//div//div[@class='inventory_item']");

        public void AddToCartByIndex(int itemIndex)
        {
            By itemByIndexButton = By.XPath($"(//body//div[@id='inventory_container']//div//div//div//div[@class='inventory_item']//div[@class='inventory_item_description']//div[@class='pricebar']//button)[{itemIndex}]");
            Click(itemByIndexButton);   
        }

        public void AddToCartByName(string name)
        {
            By elementName = By.XPath($"//div[text() = '{name}']/ancestor::div[@class='inventory_item_description']//button");
            Click(elementName); 
        }

        public void ClickCartLink()
        {
            Click(cartLink);
        }

        public bool IsInventoryPageDisplayed()
        {
            return FindElements(productItems).Any();
        }

        public bool IsInventoryPageLoaded()
        {
            return GetText(productsPageTitle) == "Products" && driver.Url.Contains("inventory.html");    
        }


    }
}
