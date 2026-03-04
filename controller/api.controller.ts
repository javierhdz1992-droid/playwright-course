import { APIRequestContext, request } from '@playwright/test';

class APIController{
    private fakerApi!: APIRequestContext;

    async init(){
            this.fakerApi = await request.newContext({
            baseURL: 'https://jsonplaceholder.typicode.com/'
        });
    }

    async getUsers(){
        const response = await this.fakerApi.get('users');
        const responseBody = await response.json();
        return responseBody[1];
    }

    async createUserTodo(){
        const postResponse = await this.fakerApi.post('/users/1/todos', {
            data: {
                "title": "Learn Playwright",
                "completed": "false"
            }
        });

        const postResponseBody = await postResponse.json();
        console.log(postResponseBody);
    }
}
export default new APIController();