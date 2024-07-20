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
    }
}
