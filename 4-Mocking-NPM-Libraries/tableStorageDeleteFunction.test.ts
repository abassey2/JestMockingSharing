import { BindingDefinition, functionRunner, HttpBinding } from 'stub-azure-function-context';
import httpTrigger from "./tableStorageDeleteFunction";

const mockedDeleteEntity = jest.fn();

jest.mock('@azure/data-tables', () => ({
    // use "function" syntax since they need to be instantiated
    AzureNamedKeyCredential: function () {
      return 'test credential';
    },
    TableClient: function () {
      return {
        deleteEntity: mockedDeleteEntity,
      };
    },
}));

describe('tableStorageDeleteFunction Tests', () => {

    const fnBindingDefinitions: BindingDefinition[] = [
        { type: 'httpTrigger', name: 'req', direction: 'in' },
        { type: 'http', name: 'res', direction: 'out' },
    ];

    // best practice to clear all mocks so that any potential new implementations and call contexts are cleared
    afterEach(()=> {
        jest.clearAllMocks();
    })

    it('httpTrigger calls the delete function', async () => {
        // configure HTTP input binding to delete created alert
        const reqBinding = new HttpBinding({
            method: 'DELETE',
            body: { }
        });

        // invoke function
        const context = await functionRunner(httpTrigger, fnBindingDefinitions, { req: reqBinding });
        const httpResponse = context.res;

        // assert 'alert deleted' http response
        expect(httpResponse).toBeDefined();
        expect(httpResponse.status).toBe(200);
        expect(httpResponse.body).toBe('Deleted entity');
        expect(mockedDeleteEntity).toBeCalled();
    })
})