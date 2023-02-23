import { config } from "./config"
import { CosmosClient} from "@azure/cosmos"

export const create = async (client: CosmosClient, databaseId: string, containerId: string) => {
    const partitionKey = config.partitionKey;

    const databaseRes = await client.databases.createIfNotExists({
        id: databaseId
    });

    const containerRes = await client
    .database(databaseId)
    .containers.createIfNotExists(
        { id: containerId, partitionKey },
        { offerThroughput: 400 }
    );
}