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
            var getResponse = client.Execute(getRequest);

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

        //[Test, Order(2)]
        //public void Test_GetDestinationByName()
        //{

        //    // Unfin

        //    var destinationName = "Maui Beach";
        //    var getRequest = new RestRequest("/destination/{dName}")
        //        .AddUrlSegment("dName", destinationName) ;  

        //    // Todo... 
        //}


        [Test, Order(3)]
        public void Test_CreateDestination()
        {
            var randomTitle = $"title_{randomNum}";
            var postRequest = new RestRequest("/destination", Method.Post)
                .AddHeader("Authorization", $"Bearer {token}")
                .AddJsonBody(new
                {
                    name = randomTitle,
                    location = "testLocation",
                    description = "testDesc",
                    attractions = new string[]
                    {
                        "I have",
                        "no idea"
                    },
                    category = "67545926c4286316e439e407",
                    bestTimeToVisit = "after salary lol"
                });

            var postResponse = client.Execute(postRequest);

            Assert.Multiple(() =>
            {
                Assert.That(postResponse.IsSuccessful, Is.True, $"Request failed with content: {postResponse.Content}");
                Assert.That(postResponse.Content, Is.Not.Null.Or.Empty, "Content shoudnt be null or empty");
                Assert.That(JObject.Parse(postResponse.Content).Type, Is.EqualTo(JTokenType.Object), "response content isn`t object");
            });

            var responseData = JObject.Parse(postResponse.Content);

            string destinationID;
            Assert.Multiple(() =>
            {
                Assert.That(responseData.ContainsKey("_id"), Is.True);
                destinationID = responseData["_id"].ToString();
            });

            Assert.Multiple(() =>
            {
                Assert.That(responseData["name"].ToString(), Is.EqualTo(randomTitle));
                Assert.That(responseData["location"].ToString(), Is.EqualTo("testLocation"));
                Assert.That(responseData["description"].ToString(), Is.EqualTo("testDesc"));
                Assert.That(responseData["attractions"].ToObject<string[]>(), Is.EqualTo(new string[] { "I have", "no idea" }));  // 
                Assert.That(responseData["bestTimeToVisit"].ToString(), Is.EqualTo("after salary lol"));
                Assert.That(responseData["category"].ToString(), Is.Not.Null.Or.Empty);
                Assert.That(responseData["category"].Type, Is.EqualTo(JTokenType.Object), "category must be an object in the response"); // assure it returns as object this time
            });


        }


        [Test, Order(4)]
        public void Test_UpdateDestination()
        {
            //inc

        }
    }
}
