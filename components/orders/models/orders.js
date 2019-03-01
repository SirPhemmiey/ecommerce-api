
"use strict";

const sql = require("../../../config/database");


class Orders {

    async saveOrder(order) {
        const { total_amount, created_on, } = order;
    }

    async deleteOrder(orderId) {
        try {
            const query = `DELETE * FROM orders WHERE order_id = ${orderId}`;
            const result = await sql.query(query);
            return result;
        }
        catch(error) {
            return error;
        }
    }

    async editOrder(order, orderId) {
        const {} = order;
    }
}