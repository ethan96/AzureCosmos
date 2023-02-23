import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { EleCar } from "./eleCar";
import * as ecService from "./eleCarService"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    let result = null;
    const method = req.method;
    switch(method) {
        case "GET":
            const id = req.query.id;
            result = await ecService.readEleCar(id);
            break;
        case "POST":
            const newCar = req.body as EleCar;
            await ecService.createEleCar(newCar);
            result = "Create new car Ok"
            break;
        case "PUT":
            const updCar = req.body as EleCar;
            await ecService.updateEleCar(updCar);
            result = "Update car Ok";
            break;
        case "DELETE":
            const delCar = req.body as EleCar;
            await ecService.deleteProduct(delCar);
            result = "Delete car Ok";
            break;
    }

    context.res = {
        body: result
    }
};

export default httpTrigger;