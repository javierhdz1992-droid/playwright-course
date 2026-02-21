import { Page } from '@playwright/test';
import UploadComponent from './component/upload.component';

class CartPage{
    private page: Page;

    constructor(page: Page){
        this.page = page;
    }

    uploadComponment(){
        return new UploadComponent(this.page);
    }
}

export default CartPage;