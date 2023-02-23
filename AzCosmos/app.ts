import { config } from "./config"
import { CosmosClient } from "@azure/cosmos"
import * as dbConnection from "./dbConnection"

const newItem = {
    id: "4",
    brand: "Tesla",
    name: "Model Y",
    desc: "Electronic",
    price: 42000
}

async function doCrud() {
    const client = new CosmosClient(
        {
            endpoint: config.endpoint,
            key: config.key
        }
    );

    const database = client.database(config.databaseId);
    const container = database.container(config.containerId);
    
    await dbConnection.create(client, config.databaseId, config.containerId);

    try {
        const querySpec = {
            query: "SELECT * from c"
        };

        const { resources: items } = await container.items.query(querySpec).fetchAll();

        items.forEach(item => {
            console.log(`${item.id}: ${item.brand} ${item.name}`);
        });

        // const createdItem = await container.items.create(newItem).then(data => {
        //     if (data.resource) {
        //         const item = data.resource;
        //         console.log(`\nCreated new item ${item.id} - ${item.brand} ${item.name}\n`);
        //         return item;
        //     }
        // });

        const updateItem = {
            id: "3",
            brand: "Tesla",
            name: "Model M",
            desc: "M",
            price: 58000
        };

        const updatedItem = await container.item(updateItem.id, updateItem.brand).replace(updateItem).then(data => {
            const item = data.resource;
            return item;
        });

        // await container.item(newItem.id, newItem.brand).delete().then(data => {

        // });
    }
    catch (e: any) {
        console.log(e.message);
    }
};

doCrud();