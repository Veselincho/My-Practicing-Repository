using RecipeBook;
using Newtonsoft.Json.Linq;
using RestSharp;

namespace RecipeBook_CategoryManagement
{
    [TestFixture]
    public class Lifecycle
    {
        private RestClient client;
        private string token;
        private int randomNum;
        private string lastRandom;
        private string category;

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

        [Test]
        public void Test_CategoryLifecycle()
        {
            //[1]: Create new Category
            var randomName = $"name_{randomNum}";
            var postReq = new RestRequest("/category", Method.Post)
                .AddHeader("Authorization", $"Bearer {token}")
                .AddJsonBody(new
                {
                    name = randomName
                });

            var postResponse = client.Execute(postReq);

            Assert.True(postResponse.IsSuccessful);
        }

    }
}
