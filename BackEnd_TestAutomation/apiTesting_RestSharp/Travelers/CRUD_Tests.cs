using Newtonsoft.Json.Linq;
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

            var random = new Random();
            randomNum = random.Next(10, 50000);
        }

        [TearDown]
        public void TearDown()
        {
            client.Dispose();
        }

        [Test, Order(1)]
        public void Test_GetAllDestinations()
        {
            var getRequest = new RestRequest("/destination", Method.Get);
            var getResponse = client.Get(getRequest);

            var destinations = JArray.Parse(getResponse.Content);

            Assert.That(getResponse.IsSuccessful, Is.True);
            Assert.That(getResponse.Content, Is.Not.Null.Or.Empty);
            Assert.That(destinations.Type, Is.EqualTo(JTokenType.Array));
            Assert.That(destinations.Count, Is.GreaterThanOrEqualTo(1));

            //assert the type of single property from object in the array =>
            var categoryType = destinations.FirstOrDefault()?["category"]?.Type;
            Assert.That(categoryType, Is.EqualTo(JTokenType.Object));


            foreach (var d in destinations)
            {
                Assert.That(d["_id"].ToString(), Is.Not.Null.Or.Empty);
                Assert.That(d["name"].ToString(), Is.Not.Null.Or.Empty);
                Assert.That(d["location"].ToString(), Is.Not.Null.Or.Empty);
                Assert.That(d["description"].ToString(), Is.Not.Null.Or.Empty);
                Assert.That(d["category"].ToString(), Is.Not.Null.Or.Empty);
                Assert.That(d["attractions"].ToString(), Is.Not.Null.Or.Empty);
                Assert.That(d["bestTimeToVisit"].ToString(), Is.Not.Null.Or.Empty);
            }

            var listOfDestinations = destinations.Select(d => d["name"].ToString()).ToList();
            foreach (var item in listOfDestinations)
            {
                Assert.That(listOfDestinations.Contains("Machu Picchu"));
                Assert.That(listOfDestinations.Contains("Rocky Mountains"));
                Assert.That(listOfDestinations.Contains("Maui Beach"));
                Assert.That(listOfDestinations.Contains("New York City"));
                Assert.That(listOfDestinations.Contains("Yellowstone National Park"));
            }

        }

    }
}
