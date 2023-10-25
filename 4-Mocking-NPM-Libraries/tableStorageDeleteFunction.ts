import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { TableClient, AzureNamedKeyCredential } from '@azure/data-tables';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log('JavaScript HTTP trigger function processed a request: ' + JSON.stringify(req.body));

  // any validation can take place here

  const stockSymbol = '' // blank for simplicity but would normally be read from body of request
  const rowKey = '' // blank for simplicity but would normally be constructed via variety of request inputs

  const config = {
    STORAGE_ENDPOINT: '', // blank for simplicity but would normally be read from env
    STORAGE_ACCOUNT_NAME: '', // blank for simplicity but would normally be read from env
    STORAGE_ACCOUNT_KEY: '', // blank for simplicity but would normally be read from env
    STORAGE_TABLE_NAME: '', // blank for simplicity but would normally be read from env
  };

  const tableClient = new TableClient(
    config.STORAGE_ENDPOINT,
    config.STORAGE_TABLE_NAME,
    new AzureNamedKeyCredential(config.STORAGE_ACCOUNT_NAME, config.STORAGE_ACCOUNT_KEY),
  );

  let responseMessage: string;

  try {
    await tableClient.deleteEntity(stockSymbol, rowKey); //stockSymbol is partition key
    responseMessage = `Deleted entity`;
    context.log(responseMessage);
  } catch {
    responseMessage = `Failed to delete entity`;
    context.log(responseMessage);
    context.res = {
      status: 400,
      body: responseMessage,
    };
    return;
  }
  context.res = {
    status: 200,
    body: responseMessage,
  };
};

export default httpTrigger;
