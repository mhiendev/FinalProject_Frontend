import axios from "axios";
const url = import.meta.env.VITE_APP_API_URL;

class StationeryService {
    constructor() {
        this.baseUrl = `${url}/api/products`;
        this.cusUrl = `${url}/api/customers`
        this.ordUrl = `${url}/api/orders`
        this.api = axios.create({
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });
    }
    async createCus(customer) {  //product
        return (await this.api.post(this.cusUrl, customer)).data;
    }

    async getManyPrd() {
        return (await this.api.get(this.baseUrl)).data;
    }


    async createPrd(product) {  //product
        return (await this.api.post(this.baseUrl, product)).data;
    }

    async updatePrd(id, product) { //product
        return (await this.api.put(`${this.baseUrl}/${id}`, product)).data;
    }

    async delete(id){ //order
        return (await this.api.delete(`${this.ordUrl}/${id}`)).data;
    }

    async get(id) { 
        return (await this.api.get(`${this.baseUrl}/${id}`)).data;
    }
}

export const stationeryService = new  StationeryService();