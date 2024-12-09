using RestSharp;
using RecipeBook;

namespace RecipeBook_CRUD
{
    [TestFixture]
    public class CRUD_Tests
    {
        private RestClient client;
        private string token;
        private int randomNum;
        private string lastRandom;

        [SetUp]
        public void SetUp()
        {
            client = new RestClient(GlobalConstants.BaseUrl);
            token = GlobalConstants.AuthenticateUser("john.doe@example.com", "password123");

            var random = new Random();
            randomNum = random.Next(10, 50000);
        }

        [TearDown]
        public void TearDown()
        {
            client.Dispose();
        }


        [Test, Order(1)]
        public void test1()
        {
            var testReq = new RestRequest("/recipe", Method.Get);
            var testResp = client.Execute(testReq);

            Assert.IsTrue(testResp.IsSuccessful);
        }
    }
}
