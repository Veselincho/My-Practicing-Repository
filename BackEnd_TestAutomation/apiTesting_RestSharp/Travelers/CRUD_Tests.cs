using RestSharp;
using Travelers;

namespace Travelers_Tests
{
    [TestFixture]
    public class CRUD_Tests
    {
        private RestClient client;
        private string token;
        private int randomNum;

        [SetUp]
        public void SetUp()
        {
            client = new RestClient(GlobalConstants.baseUrl);
            token = GlobalConstants.AuthenticateUser("john.doe@example.com", "password123");
        }

        [TearDown]
        public void TearDown()
        {
            client.Dispose();
        }


    }
}
