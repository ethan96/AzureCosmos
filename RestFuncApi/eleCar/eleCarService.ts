import { config } from "./config"
import { EleCar } from "./eleCar";
import { CosmosClient} from "@azure/cosmos"

const client = new CosmosClient (
    {
        endpoint: config.endpoint,
        key: config.key
    }
);

const database = client.database(config.databaseId);
const container = database.container(config.containerId);

export const createEleCar = async (elecar: EleCar):
Promise<any> => {
    return await container.items.create(elecar).then(data => {
        if (data.resource) {
            const item = data.resource;
            console.log(`Created new item ${item.id} - ${item.brand} ${item.name}`);
        }
    });
}

export const readEleCar = async (id: string):
Promise<any> => {
    let queryString = "";

    if (id != null) {
        queryString = `SELECT * FROM c WHERE c.id = '${id}'`;
    }
    else {
        queryString = "SELECT * FROM c";
    }

    const querySpec = {
        query: queryString
    };

    const { resources: items} = await container.items
    .query(querySpec)
    .fetchAll();

    items.forEach(item => {
        console.log(`${item.id}: ${item.brand} ${item.name}`);
    });

    return items;
}

export const updateEleCar = async (eleCar: EleCar):
Promise<any> => {
    return await container.item(eleCar.id, eleCar.brand).replace(eleCar).then(data => {
        if (data.resource) {
            const item = data.resource;
            console.log(`Updated item: ${item.id} - ${item.brand} ${item.name}`);
        }
    });
}

export const deleteProduct = async (eleCar: EleCar):
Promise<any> => {
    return await container.item(eleCar.id, eleCar.brand).delete().then(data => {
        console.log(`Deleted item with id ${eleCar.id} ${eleCar.brand}`);
    });
}