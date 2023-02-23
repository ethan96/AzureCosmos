using Microsoft.Azure.Cosmos;
using AzCosmosCsConsole;

var options = new CosmosClientOptions() { ConnectionMode = ConnectionMode.Gateway };//沒這行執行會報錯 (The request failed because the client was unable to establish connections to 4 endpoints across 1 regions.)

using CosmosClient client = new(
    accountEndpoint: "https://demotestdatabase1.documents.azure.com:443/",
    authKeyOrResourceToken: "RrjxdyOhCn8UbIHdKJpLOPJjKWOVYSoHKHesrjJY3jp7RbETktfJd16xHrN2y9i0rR9LsnognlkCACDbdpTUQA==",
    clientOptions: options
);

//accountEndpoint: Environment.GetEnvironmentVariable("https://demotestdatabase1.documents.azure.com:443/")!,
//authKeyOrResourceToken: Environment.GetEnvironmentVariable("RrjxdyOhCn8UbIHdKJpLOPJjKWOVYSoHKHesrjJY3jp7RbETktfJd16xHrN2y9i0rR9LsnognlkCACDbdpTUQA==")!

Database database = client.GetDatabase(id: "DemoDatabase1");

Console.WriteLine($"New database:\t{database.Id}");

Container container = await database.CreateContainerIfNotExistsAsync(
    id: "Container1",
    partitionKeyPath: "/brand",
    throughput: 400
);

Console.WriteLine($"New container:\t{container.Id}");

#region Create new item
// Product newItem = new(
//     id: "5",
//     brand: "Audi",
//     name: "Q2",
//     desc: "AU ele",
//     price: 56000
// );

// Product createdItem = await container.CreateItemAsync<Product>(
//     item: newItem
// );

//Console.WriteLine($"Created item:\t{createdItem.id}\t[{createdItem.brand}]");
#endregion

#region  Read item as object (ReadItemAsync) 找不到會直接報錯
// Product readItem = await container.ReadItemAsync<Product>(
//     id: "5",
//     partitionKey: new PartitionKey("Audi")
// );

// if (readItem != null)
// {
//     Console.WriteLine($"Find id: {readItem.id}\t brand: {readItem.brand}\t name: {readItem.name}");
// }
// else
// {
//     Console.WriteLine("Not found readItem");
// }
#endregion

#region Read item as stream (ReadItemStreamAsync) 可先檢查狀態，避免掉找不到直接報錯
ResponseMessage responseMessage = await container.ReadItemStreamAsync(id: "5", partitionKey: new PartitionKey("Audi"));
if (responseMessage.StatusCode == System.Net.HttpStatusCode.NotFound)
{
    Console.WriteLine("Not found readItem");
}
else
{
    var reader = new StreamReader(responseMessage.Content);
    var txt = reader.ReadToEnd();
    Product readItem = Newtonsoft.Json.JsonConvert.DeserializeObject<Product>(txt);
    Console.WriteLine($"Find id: {readItem.id}\t brand: {readItem.brand}\t name: {readItem.name}");
}
#endregion

#region 直接用 query 語法查詢
var query = new QueryDefinition(
    query: "SELECT * FROM c"
);

using FeedIterator<Product> feed = container.GetItemQueryIterator<Product>(
    queryDefinition: query
);

while (feed.HasMoreResults)
{
    FeedResponse<Product> response = await feed.ReadNextAsync();
    foreach (Product item in response)
    {
        Console.WriteLine($"Found id:{item.id}\t brand:{item.brand}\t name:{item.name}");
    }
}
#endregion

// See https://aka.ms/new-console-template for more information
//Console.WriteLine("Hello, World!");
